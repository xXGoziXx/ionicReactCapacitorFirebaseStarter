import { FirebaseFirestore } from '@capacitor-firebase/firestore';
import { Post } from '../models/Post';
import {
    SearchResultTypeEnum,
    SearchResultTypes,
    User
} from '../models/User';
import {
    AppTrackingTransparency,
    AppTrackingStatusResponse
} from 'capacitor-plugin-app-tracking-transparency';

/**
 * Fetches all posts liked by a specific user
 * @param username - The username to fetch liked posts for
 * @returns Promise containing array of liked posts
 */
export const fetchUserPostLikes = async (username: string): Promise<Post[]> => {
    const { snapshots } = await FirebaseFirestore.getCollection<Post>({
        reference: 'postLikes',
        compositeFilter: {
            type: 'and',
            queryConstraints: [
                {
                    type: 'where',
                    fieldPath: 'username',
                    opStr: '==',
                    value: username
                }
            ]
        }
    });

    return snapshots.map(doc => doc.data).filter(post => post !== null);
};

export const getHistoryID = (historyListItem: SearchResultTypes) => {
    switch (historyListItem.type) {
        case SearchResultTypeEnum.GEOLOCATION:
            return historyListItem.placeID;
        case SearchResultTypeEnum.ALGOLIA_KEYWORD:
            return historyListItem.objectID;
        case SearchResultTypeEnum.LOCATION:
            return historyListItem.locationID;
        default:
            return '';
    }
};

export const getStatus = async (): Promise<AppTrackingStatusResponse> => {
    const response = await AppTrackingTransparency.getStatus();

    console.log(response);
    // { status: 'authorized' } for example

    return response;
};

export const requestPermission =
    async (): Promise<AppTrackingStatusResponse> => {
        const response = await AppTrackingTransparency.requestPermission();

        console.log(response);
        // { status: 'authorized' } for example

        return response;
    };

export const updateUserBlackList = async (
    postId: string,
    userId: string
): Promise<void> => {
    try {
        // Get current user document
        const { snapshot } = await FirebaseFirestore.getDocument<User>({
            reference: `Users/${userId}`
        });

        // Get current blacklist or empty array if none exists
        const blacklist: string[] = snapshot?.data?.blacklist || [];

        // Add new postId to blacklist
        const updatedBlackList = [...blacklist, postId];

        console.log('Updated blacklist:', updatedBlackList);

        // Update document with new blacklist
        await FirebaseFirestore.updateDocument({
            reference: `Users/${userId}`,
            data: {
                blacklist: updatedBlackList
            }
        });
    } catch (error) {
        console.error('Error updating blacklist:', error);
    }
};
