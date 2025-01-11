import { IonAvatar, IonChip, IonLabel, IonSkeletonText } from '@ionic/react';
import GontrelLogoLoader from '../GontrelLogoLoader/GontrelLogoLoader';
import './PostCard.scss';

interface PostCardSkeletonProps {
    isDarkMode?: boolean;
}
const PostCardSkeleton: React.FC<PostCardSkeletonProps> = ({ isDarkMode }) => {
    return (
        <div className="relative h-full bg-black post--card active-post-card skeleton">
            {/* Background Video */}
            <div className="relative flex items-center justify-center h-full max-h-screen">
                <GontrelLogoLoader />
            </div>
            {/* Post Content */}
            <div
                className={`absolute bottom-0 flex flex-col w-full post-content--container opacity-100 `}
            >
                <div className="relative flex ms-4 post-content">
                    <div className="flex flex-col justify-end location-details gap-y-4 grow">
                        <div className="flex flex-col location-details--container gap-y-1">
                            <h4>
                                <IonSkeletonText
                                    animated={true}
                                    className={`skeleton-text-large ${isDarkMode ? 'dark' : ''}`}
                                ></IonSkeletonText>
                            </h4>

                            <div className="flex flex-wrap h-6 gap-x-2 location-tags grow">
                                {/* Labels */}

                                {Array.from({ length: 2 }).map((_, index) => (
                                    <IonLabel key={index}>
                                        <IonSkeletonText
                                            animated={true}
                                            className={`skeleton-text-small ${isDarkMode ? 'dark' : ''}`}
                                        ></IonSkeletonText>
                                    </IonLabel>
                                ))}
                            </div>
                        </div>
                        <div className="flex">
                            <IonChip className="user-chip gap-x-3">
                                <IonAvatar className="post-user--avatar size-8">
                                    <IonSkeletonText
                                        animated={true}
                                    ></IonSkeletonText>
                                </IonAvatar>
                                <IonLabel className="text-left post-user--name shrink">
                                    <IonSkeletonText
                                        animated={true}
                                        className={`skeleton-text-avatar ${isDarkMode ? 'dark' : ''}`}
                                    ></IonSkeletonText>
                                </IonLabel>
                            </IonChip>
                        </div>
                    </div>
                </div>
                {/* CTA Button Footer */}
                <div className="flex p-4 overflow-x-auto location-cta--footer gap-x-2">
                    {/* Opening Hours */}
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index}>
                            <IonSkeletonText
                                animated={true}
                                className={`skeleton-text-cta ${isDarkMode ? 'dark' : ''}`}
                            ></IonSkeletonText>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostCardSkeleton;
