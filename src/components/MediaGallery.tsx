import { useCallback, useEffect, useState, useRef } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { FirestorePost, Tag } from '../models/Post';
import { chunk, fetchTags, fetchVideoUrls, cleanupVideoElements, VideoRef } from '../lib/posts';

interface MediaGalleryProps {
    posts: FirestorePost[];
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ posts }) => {
    const [videoUrls, setVideoUrls] = useState<string[]>([]);
    const [postTags, setPostTags] = useState<Record<string, Tag>>({});
    const videoElementRefs = useRef<(VideoRef | null)[]>([]);

    useEffect(() => {
        const abortController = new AbortController();
        let isSubscribed = true;

        const loadVideos = async () => {
            const postIDs = posts.map(post => post.ID);
            const urlMap = await fetchVideoUrls({ postIDs, signal: abortController.signal });

            if (isSubscribed) {
                const orderedUrls = posts.map(post => urlMap.get(post.ID)).filter((url): url is string => url !== null);
                setVideoUrls(orderedUrls);
            }
        };

        loadVideos();

        return () => {
            isSubscribed = false;
            abortController.abort();
            cleanupVideoElements(videoElementRefs.current);
        };
    }, [posts]);

    useEffect(() => {
        const abortController = new AbortController();
        let isSubscribed = true;

        const loadTags = async () => {
            const allTagIds = posts.flatMap(post => post.tags || []);
            const uniqueTagIds = [...new Set(allTagIds)];
            const tags = await fetchTags(uniqueTagIds, abortController.signal);

            if (isSubscribed) {
                setPostTags(tags);
            }
        };

        loadTags();

        return () => {
            isSubscribed = false;
            abortController.abort();
        };
    }, [posts]);

    if (!posts.length) return null;

    return (
        <div className="w-full py-8">
            <h2 className="px-4 mb-6 text-2xl font-bold">Media Gallery</h2>
            <div className="">
                {posts.map((post, index) => (
                    <IonCard key={post.ID} className="m-0">
                        <IonCardHeader>
                            <IonCardTitle>{post.ID} - {post.locationID}</IonCardTitle>
                            <IonCardSubtitle>{post.createdAt.toDate().toLocaleString()}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            {videoUrls[index] && (
                                <div className="aspect-[3/4] bg-gray-100 rounded mb-3">
                                    <video
                                        ref={el => {
                                            if (el) {
                                                videoElementRefs.current[index] = el;
                                            }
                                        }}
                                        src={videoUrls[index]}
                                        controls
                                        className="object-cover w-full h-full rounded"
                                        playsInline
                                    />
                                </div>
                            )}
                            <div className="text-sm">
                                <p className="text-gray-600">Username: {post.username}</p>
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {post.tags.map(tagId => (
                                            <span
                                                key={tagId}
                                                className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
                                            >
                                                {postTags[tagId]?.name || tagId}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </IonCardContent>
                    </IonCard>
                ))}
            </div>
        </div>
    );
};

export default MediaGallery;
