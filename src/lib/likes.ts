import {
    Timestamp,
    serverTimestamp
} from 'firebase/firestore';
import { Like } from '../models/Like';
import { FirebaseFirestore } from '@capacitor-firebase/firestore';

interface GetSavesProps {
    postID: string,
    setSaves: React.Dispatch<React.SetStateAction<number>>,
    setIsSaved?: React.Dispatch<React.SetStateAction<boolean>>,
    currentUserID?: string
}

// Get likes of post from postLikes collection
export const getSaves = async (
    { postID, setSaves, setIsSaved, currentUserID }: GetSavesProps,
    callback?: (callbackID: string) => void
): Promise<string> => {
    const callbackID =
        await FirebaseFirestore.addCollectionSnapshotListener<Like>(
            {
                reference: 'postLikes',
                compositeFilter: {
                    type: 'and',
                    queryConstraints: [
                        {
                            type: 'where',
                            fieldPath: 'postID',
                            opStr: '==',
                            value: postID
                        }
                    ]
                }
            },
            savedDoc => {
                if (!savedDoc?.snapshots) return;

                const isSaved = savedDoc.snapshots.find(
                    snapshot => snapshot.data?.userID === currentUserID
                );
                const saves = savedDoc.snapshots.length;
                // console.log('Saved do c', savedDoc.snapshots, isSaved);
                setSaves(saves);
                if (setIsSaved && isSaved) {
                    setIsSaved(true);
                } else if (setIsSaved) {
                    setIsSaved(false);
                }
            }
        );
    callback?.(callbackID);
    return callbackID;
};

// Toggles a users liked status of a post
export const toggleLike = async (
    postID: string,
    userID: string
): Promise<void> => {
    // Get the document reference
    const docID = `${postID}_${userID}`;

    // Check if document exists
    const { snapshot: postLikeSnapshot } =
        await FirebaseFirestore.getDocument<Like>({
            reference: `postLikes/${docID}`
        });

    if (postLikeSnapshot.data) {
        // User has already liked the post, so unlike it
        await FirebaseFirestore.deleteDocument({
            reference: `postLikes/${docID}`
        });
    } else {
        // User has not liked the post, so like it
        await FirebaseFirestore.setDocument({
            reference: `postLikes/${docID}`,
            data: {
                ID: docID,
                postID,
                userID,
                createdAt: serverTimestamp() as Timestamp
            }
        });
    }
};
