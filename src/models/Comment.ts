import {
    Timestamp
} from 'firebase/firestore';

export interface FirestoreReply {
    ID: string;
    commentID: string;
    userID: string;
    createdAt: Timestamp;
    content: string;
}
export interface Reply {
    ID: string;
    commentID: string;
    userID: string;
    createdAt: Timestamp;
    username: string;
    userDisplayName: string;
    userProfileImage: string;
    content: string;
}

export interface FirestoreComment {
    ID: string;
    postID: string;
    userID: string;
    createdAt: Timestamp;
    content: string;
    replies?: Reply[];
}

export interface Comment {
    ID: string;
    postID: string;
    userID: string;
    createdAt: Timestamp;
    username: string;
    userDisplayName: string;
    userProfileImage: string;
    content: string;
    replies?: Reply[];
}
