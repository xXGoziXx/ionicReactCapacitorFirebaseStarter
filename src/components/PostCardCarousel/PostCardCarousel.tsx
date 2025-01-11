import React, { useEffect, useMemo, useState } from 'react';
import { Post } from '../../models/Post';
import PostCardSkeleton from '../PostCard/PostCardSkeleton';
import VirtualizedCarousel from '../VirtualizedCarousel/VirtualizedCarousel';
import { Coordinates, PageTypeEnum } from '../../models/Location';
import './PostCardCarousel.scss';

interface PostCardCarouselProps {
    posts?: Post[];
    filteredPosts?: Post[];
    currentPostIndex?: number;
    enableFilter?: boolean;
    handleCurrentPostIndex?: (index: number) => void;
    currentLocation?: Coordinates | undefined;
    notFound?: boolean;
    pageType?: PageTypeEnum;
    accuracy?: number;
    isVerified?: boolean;
    loadMore?: () => Promise<void>;
    blacklistedPosts?: string[];
}

export const PostCardCarousel: React.FC<PostCardCarouselProps> =
    () => {

        const [posts, setPosts] = useState<Post[]>([]);
        const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
        const [enableFilter,] = useState<boolean>(false);
        const [currentLocation] = useState<Coordinates | undefined>({
            lat: 53.32431899999999,
            lng: -6.253127
        });
        const [notFound] = useState<boolean>(false);
        const [pageType] = useState<PageTypeEnum | undefined>(PageTypeEnum.HOME);
        const [accuracy] = useState<number>(0);
        const [isVerified] = useState<boolean>(true);
        const [blacklistedPosts] = useState<string[]>([]);
        const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);

        const { lat, lng } = currentLocation || {};
        // Memoized filtered and updated posts
        const updatedFilteredPosts = useMemo(
            () => filteredPosts.filter(post => !blacklistedPosts?.includes(post.ID)),
            [filteredPosts, blacklistedPosts]
        );

        const updatedPosts = useMemo(
            () => posts.filter(post => !blacklistedPosts?.includes(post.ID)),
            [posts, blacklistedPosts]
        );

        // Derived states
        const noPosts = useMemo(
            () => (enableFilter ? updatedFilteredPosts.length === 0 : updatedPosts.length === 0),
            [enableFilter, updatedFilteredPosts, updatedPosts]
        );

        const isLoading = useMemo(
            () => !(lat && lng) || (noPosts && !notFound),
            [lat, lng, noPosts, notFound]
        );

        const handleCurrentPostIndex = (index: number) => {
            setCurrentPostIndex(index);
        };

        useEffect(() => {
            const fetchPosts = async () => {
                const { data } = await import('../../mock/posts.json');
                console.log(data);
                setPosts(data as Post[]);
                setFilteredPosts(data as Post[]);
            };
            fetchPosts();
        }, [posts]);

        return (
            <div className="relative top-0 left-0 w-full text-white bg-black embla">
                {isLoading || !currentLocation ? (
                    <PostCardSkeleton isDarkMode={true} />
                ) : (
                    <VirtualizedCarousel
                        notFound={notFound || noPosts}
                        enableFilter={enableFilter}
                        filteredPosts={updatedFilteredPosts}
                        posts={updatedPosts}
                        currentLocation={currentLocation}
                        currentPostIndex={currentPostIndex}
                        pageType={pageType}
                        handleCurrentPostIndex={handleCurrentPostIndex}
                        accuracy={accuracy}
                        isVerified={isVerified}
                    />
                )}
            </div>
        );
    };
