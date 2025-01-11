import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import PostCard from '../PostCard/PostCard';
import { NotFoundEnum, Post } from '../../models/Post';
import NotFound from '../NotFound/NotFound';
import { Coordinates, PageTypeEnum } from '../../models/Location';
import { OVERSCAN } from '../../constants/constants';
import { debounce } from 'lodash';
import './VirtualizedCarousel.scss';

interface VirtualizedCarouselProps {
    posts: Post[];
    filteredPosts: Post[];
    currentPostIndex?: number;
    enableFilter: boolean;
    handleCurrentPostIndex?: (index: number) => void;
    currentLocation: Coordinates;
    pageType?: PageTypeEnum;
    notFound?: boolean;
    accuracy?: number;
    isVerified?: boolean;
    loadMore?: () => Promise<void>;
}

const VirtualizedCarousel: React.FC<VirtualizedCarouselProps> = ({
    posts = [],
    filteredPosts = [],
    currentPostIndex = 0,
    enableFilter = false,
    handleCurrentPostIndex,
    currentLocation,
    pageType,
    notFound = false,
    accuracy = 0,
    isVerified,
    loadMore
}) => {
    const [loadingExplorePosts] = useState<boolean>(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        axis: 'y',
        align: 'start',
        skipSnaps: true,
        containScroll: 'keepSnaps',
        startIndex: 0,
        watchSlides: (embla: EmblaCarouselType, _: MutationRecord[]) => {
            if (embla.canScrollNext()) {
                return false;
            } else {
                return true;
            }
        }
    });
    // const [visibleSlides, setVisibleSlides] = useState<number[]>([]);
    const [virtualCurrentPostIndex, setVirtualCurrentPostIndex] =
        useState<number>(0);
    const virtualPosts = enableFilter ? filteredPosts : posts;

    const visibleSlides = useMemo(() => {
        // Update the visible slides based on the current post index
        const tempVisibleSlides = [];
        for (
            let i = Math.max(0, virtualCurrentPostIndex - OVERSCAN);
            i <=
            Math.min(
                virtualPosts.length - 1,
                virtualCurrentPostIndex + OVERSCAN
            );
            i++
        ) {
            tempVisibleSlides.push(i);
        }
        return tempVisibleSlides;
    }, [virtualPosts.length, virtualCurrentPostIndex]);

    // Track scroll progress and loop counter
    const trackScrollProgress = useCallback(
        async (embla: EmblaCarouselType) => {
            // Get current scroll progress and snap points
            const scrollProgress = embla.scrollProgress();
            const snapList = embla.scrollSnapList();

            // Find closest snap point using binary search
            const closestIndex = snapList.reduce((prevIndex, curr, index) => {
                const prevDistance = Math.abs(scrollProgress - snapList[prevIndex]);
                const currDistance = Math.abs(scrollProgress - curr);
                return currDistance < prevDistance ? index : prevIndex;
            }, 0);

            // Update current index within bounds
            const boundedIndex = Math.min(closestIndex, virtualPosts.length - 1);
            setVirtualCurrentPostIndex(boundedIndex);

            // Check if we need to load more posts
            if (!embla.canScrollNext() && boundedIndex >= posts.length - 1) {
                loadMore?.();
            }
        },
        [loadMore, posts.length, virtualPosts.length]
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedTrackScrollProgress = useCallback(
        debounce(trackScrollProgress, 8),
        [trackScrollProgress]
    );

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on('select', trackScrollProgress);
        emblaApi.on('scroll', debouncedTrackScrollProgress);

        return () => {
            emblaApi.off('select', trackScrollProgress);
            emblaApi.off('scroll', debouncedTrackScrollProgress);
        };
    }, [emblaApi, trackScrollProgress, debouncedTrackScrollProgress]);

    // Scroll to the current post index initially
    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.scrollTo(currentPostIndex, true);
        trackScrollProgress(emblaApi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emblaApi, trackScrollProgress]);

    useEffect(() => {
        if (!emblaApi) return;
        handleCurrentPostIndex &&
            handleCurrentPostIndex(virtualCurrentPostIndex);
    }, [emblaApi, handleCurrentPostIndex, virtualCurrentPostIndex]);

    // Virtualize the slides based on the visible slides and loop counter
    const getVirtualizedContent = useCallback(
        (index: number, showLoader: boolean) => {
            // console.table(toJS(virtualPosts));
            const virtualIndex = index % virtualPosts.length;
            const post = virtualPosts[virtualIndex];
            return post ? (
                <PostCard
                    index={index}
                    currentPostIndex={virtualCurrentPostIndex}
                    post={post}
                    currentLocation={currentLocation}
                    isVideoVerifier={pageType === PageTypeEnum.VERIFIER}
                    videoVerifierAccuracy={accuracy}
                    isVerified={isVerified}
                    showNextPostLoader={showLoader}
                />
            ) : null;
        },
        [
            accuracy,
            currentLocation,
            isVerified,
            pageType,
            virtualCurrentPostIndex,
            virtualPosts
        ]
    );

    return notFound ? (
        <div className="embla__viewport">
            <div className="embla__container">
                <div className="embla__slide">
                    <NotFound
                        mode={
                            enableFilter
                                ? NotFoundEnum.FILTER
                                : NotFoundEnum.PAGE
                        }
                        pageType={pageType}
                    />
                </div>
            </div>
        </div>
    ) : (
        <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
                {virtualPosts.map((_, index) => (
                    <div
                        className="embla__slide"
                        key={virtualPosts[index].ID}
                    >
                        {visibleSlides.includes(index)
                            ? getVirtualizedContent(
                                index,
                                index === virtualPosts.length - 1 &&
                                loadingExplorePosts
                            )
                            : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VirtualizedCarousel;
