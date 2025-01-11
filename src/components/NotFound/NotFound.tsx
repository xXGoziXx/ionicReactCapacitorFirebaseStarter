import React, { memo } from 'react';
import { VideoSlashIcon } from '../Icons/Icons';
import { NotFoundEnum } from '../../models/Post';
import './NotFound.scss';
import { PageTypeEnum } from '../../models/Location';

interface NotFoundProps {
    mode: NotFoundEnum;
    pageType?: PageTypeEnum;
}

const NotFound: React.FC<NotFoundProps> = memo(({ mode, pageType }) => {

    const renderPageText = () => {
        switch (pageType) {
            // could ask the user to increase the search radius here as that is most likely why no videos are found
            case PageTypeEnum.HOME:
                return "No videos found nearby. Try expanding the distance range in the filter. We're constantly working hard to bring more content to your area - stay tuned! ";
            case PageTypeEnum.SEARCH:
                return 'Search a different location to find videos';
            // could add similar search results here instead of text
            case PageTypeEnum.RESTAURANT:
                return 'No videos for this restaurant at the moment. You could explore similar restaurants or try again later.';
        }
    };

    return (
        <div
            id="NotFoundMessage"
            className="flex flex-col items-center justify-center h-full text-white bg-black gap-y-4"
        >
            <VideoSlashIcon />
            <div className="space-y-2 text-center">
                {mode === NotFoundEnum.PAGE ? (
                    <p className="text-xl font-semibold">
                        No videos found here
                    </p>
                ) : (
                    <p className="text-xl font-semibold">
                        No videos found based on filter
                    </p>
                )}

                {mode === NotFoundEnum.PAGE ? (
                    <p className="mx-4 text-sm font-normal">
                        {renderPageText()}
                    </p>
                ) : (
                    <p className="text-sm font-normal">
                        Change or reset filter to find videos
                    </p>
                )}
            </div>
        </div>
    );
});

export default NotFound;
