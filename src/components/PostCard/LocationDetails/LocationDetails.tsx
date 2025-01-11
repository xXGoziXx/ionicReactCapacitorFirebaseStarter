import React, { memo } from 'react';
import { IonAvatar, IonChip, IonLabel } from '@ionic/react';
import { FoodTypeEnum } from '../../../models/Location';
import { Link, useHistory } from 'react-router-dom';
interface LocationNameProps {
    locationName: string;
    locationId: string;
    isVideoVerifier: boolean;
    isVerified: boolean;
    videoVerifierAccuracy: number;
}

const LocationName: React.FC<LocationNameProps> = ({
    locationName,
    locationId,
    isVideoVerifier,
    isVerified,
    videoVerifierAccuracy
}) => (
    <div className="flex gap-3">
        {isVideoVerifier && !isVerified && (
            <IonChip className="font-semibold text-blue-500 bg-white h-min">
                {videoVerifierAccuracy}%
            </IonChip>
        )}
        <Link to={`/location/${locationId}`}>
            <h4 className="text-left location-name">{locationName}</h4>
        </Link>
    </div>
);

interface TagsProps {
    items: string[];
    postId: string;
}

const Tags: React.FC<TagsProps> = ({ items, postId }) => (
    <div className="flex flex-wrap gap-x-2 location-tags grow">
        {items.map(item => (
            <IonChip
                key={`${postId}-${item}`}
                className="h-4 text-xs label-chip"
            >
                {item}
            </IonChip>
        ))}
    </div>
);

interface UserProfileProps {
    username: string;
    userDisplayName: string;
    userProfileImage: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
    username,
    userDisplayName,
    userProfileImage
}) => {
    const history = useHistory();
    return (
        <div className="flex">
            <IonChip
                className="user-chip gap-x-3"
                onClick={() => history.push(`/profile/${username}`)}
            >
                <IonAvatar className="post-user--avatar size-8">
                    <img src={userProfileImage} alt="User Avatar" />
                </IonAvatar>
                <IonLabel className="text-left post-user--name shrink">
                    {userDisplayName}
                </IonLabel>
            </IonChip>
        </div>
    );
};

interface LocationDetailsProps {
    foodTypes?: FoodTypeEnum[];
    postId: string;
    labels?: string[];
    username: string;
    userDisplayName: string;
    userProfileImage: string;
    locationName: string;
    locationId: string;
    isVideoVerifier: boolean;
    videoVerifierAccuracy: number;
    isVerified: boolean;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({
    foodTypes,
    postId,
    labels,
    username,
    userDisplayName,
    userProfileImage,
    locationName,
    locationId,
    isVideoVerifier,
    videoVerifierAccuracy,
    isVerified
}) => {
    const items: string[] = foodTypes?.length ? foodTypes : (labels ?? []);
    return (
        <div className="flex flex-col justify-end location-details gap-y-4 grow">
            <div className="flex flex-col location-details--container gap-y-3">
                {locationName && (
                    <LocationName
                        locationName={locationName}
                        locationId={locationId}
                        isVideoVerifier={isVideoVerifier}
                        isVerified={isVerified}
                        videoVerifierAccuracy={videoVerifierAccuracy}
                    />
                )}
                <Tags items={items} postId={postId} />
                {!isVideoVerifier && (
                    <UserProfile
                        username={username}
                        userDisplayName={userDisplayName}
                        userProfileImage={userProfileImage}
                    />
                )}
            </div>
        </div>
    );
};

export default memo(LocationDetails);
