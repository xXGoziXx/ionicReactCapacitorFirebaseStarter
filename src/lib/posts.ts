import { FirebaseFirestore } from "@capacitor-firebase/firestore";
import { FirebaseStorage } from "@capacitor-firebase/storage";
import { FirestorePost, Tag } from "../models/Post";
import { UserExplore } from "../models/User";

/**
 * Interface for the function parameters to maintain type safety
 */
interface FetchRecommendedPostsParams {
    userID: string;
    signal: AbortSignal;
}

/**
 * Interface for video URL fetching parameters
 */
interface FetchVideoUrlsParams {
    postIDs: string[];
    signal?: AbortSignal;
}

/**
 * Interface for video element cleanup
 */
export interface VideoRef {
    pause: () => void;
    src: string;
    load: () => void;
}

/**
 * Interface for video URL fetching results
 */
interface VideoUrlResult {
    postID: string;
    url: string | null;
}

/**
 * Fetches recommended posts for a user from Firestore
 * @param params - Object containing userID and AbortSignal
 * @returns Promise resolving to an array of FirestorePost objects
 * @throws Error if the operation is cancelled or if there's a Firestore error
 */
export async function fetchRecommendedPosts({
    userID,
    signal
}: FetchRecommendedPostsParams): Promise<FirestorePost[]> {
    if (!userID) {
        throw new Error("User ID is required");
    }

    if (signal.aborted) {
        throw new Error("Operation cancelled");
    }

    const { snapshot: userRecommendations } = await FirebaseFirestore.getDocument<UserExplore>({
        reference: `userExplorePosts/${userID}`
    });

    if (signal.aborted) {
        throw new Error("Operation cancelled");
    }

    const recommendationData = userRecommendations.data;
    if (!recommendationData?.posts?.length) {
        return [];
    }

    // Chunk the post IDs into groups of 10 for batch processing
    const CHUNK_SIZE = 10;
    const postIDChunks = chunk(recommendationData.posts.slice(0, CHUNK_SIZE), CHUNK_SIZE);

    // Process all chunks in parallel using Promise.all
    const postsPromises = postIDChunks.map(async (postIDChunk: string[]) => {
        if (signal.aborted) {
            throw new Error("Operation cancelled");
        }

        const { snapshots } = await FirebaseFirestore.getCollection<FirestorePost>({
            reference: "posts",
            compositeFilter: {
                type: "and",
                queryConstraints: [
                    {
                        type: "where",
                        fieldPath: "__name__",
                        opStr: "in",
                        value: postIDChunk
                    }
                ]
            }
        });

        return snapshots
            .map(snapshot => {
                const data = snapshot.data;
                if (!data) return undefined;
                return data;
            })
            .filter((post): post is FirestorePost => post !== undefined);
    });

    if (signal.aborted) {
        throw new Error("Operation cancelled");
    }

    // Wait for all chunks to be processed
    const chunkedResults = await Promise.all(postsPromises);

    // Flatten the results into a single array
    return chunkedResults.flat();
}

/**
 * Splits an array into smaller arrays of specified size
 * @param array - The array to be chunked
 * @param size - The size of each chunk
 * @returns An array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Fetches tag data for a list of tag IDs
 * @param tagIds - Array of tag IDs to fetch
 * @param signal - Optional AbortSignal for cancellation
 * @returns Record mapping tag IDs to Tag objects
 */
export async function fetchTags(tagIds: string[], signal?: AbortSignal): Promise<Record<string, Tag>> {
    try {
        const CHUNK_SIZE = 10; // Process 10 tags at a time
        const tagIdChunks = chunk(tagIds, CHUNK_SIZE);

        const tagChunks = await Promise.all(
            tagIdChunks.map(async (chunk) => {
                if (signal?.aborted) {
                    throw new Error("Operation cancelled");
                }

                const { snapshots } = await FirebaseFirestore.getCollection<Tag>({
                    reference: "tags",
                    compositeFilter: {
                        type: "and",
                        queryConstraints: [
                            {
                                type: "where",
                                fieldPath: "__name__",
                                opStr: "in",
                                value: chunk
                            }
                        ]
                    }
                });

                return snapshots.map(snapshot => ({
                    id: snapshot.id,
                    data: snapshot.data
                }));
            })
        );

        const tagMap: Record<string, Tag> = {};
        tagChunks.flat().forEach(({ id, data }) => {
            if (data) {
                tagMap[id] = data;
            }
        });

        return tagMap;
    } catch (error) {
        console.error("Error fetching tags:", error);
        return {};
    }
}

/**
 * Fetches video URLs for a list of post IDs
 * @param params - Object containing postIDs and optional AbortSignal
 * @returns Promise resolving to a Map of post IDs to video URLs
 */
export async function fetchVideoUrls({
    postIDs,
    signal
}: FetchVideoUrlsParams): Promise<Map<string, string>> {
    try {
        const CHUNK_SIZE = 5; // Process 5 videos at a time
        const postIDChunks = chunk(postIDs, CHUNK_SIZE);

        const urlChunks = await Promise.all(
            postIDChunks.map(async (chunk) => {
                if (signal?.aborted) {
                    throw new Error("Operation cancelled");
                }

                const chunkUrls = await Promise.all(
                    chunk.map(async (postID) => {
                        try {
                            const { downloadUrl } = await FirebaseStorage.getDownloadUrl({
                                path: `tiktokVideos/${postID}.mp4`
                            });
                            return { postID, url: downloadUrl } as VideoUrlResult;
                        } catch (error) {
                            console.error(`Error loading video ${postID}:`, error);
                            return { postID, url: null } as VideoUrlResult;
                        }
                    })
                );
                return chunkUrls;
            })
        );

        // Create a map of postID to URL
        const validUrls = urlChunks
            .flat()
            .filter((result): result is VideoUrlResult & { url: string } => result.url !== null)
            .map(({ postID, url }) => [postID, url] as [string, string]);

        return new Map(validUrls);
    } catch (error) {
        console.error("Error fetching video URLs:", error);
        return new Map();
    }
}

/**
 * Cleans up video elements by pausing and clearing their sources
 * @param videoRefs - Array of video element references
 */
export function cleanupVideoElements(videoRefs: (VideoRef | null)[]): void {
    videoRefs.forEach((videoRef) => {
        if (videoRef) {
            try {
                videoRef.pause();
                videoRef.src = "";
                videoRef.load();
            } catch (error) {
                console.error("Error cleaning up video element:", error);
            }
        }
    });
}
