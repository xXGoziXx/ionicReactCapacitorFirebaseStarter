import { Timestamp } from 'firebase/firestore';

export interface Like {
    ID: string;
    postID: string;
    userID: string;
    createdAt: Timestamp;
}
