import React, {
    memo,
    MouseEvent,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import { Post } from '../../models/Post';
import { generatePreview } from '../../lib/utils';
import { useLocation } from 'react-router-dom';
import { Coordinates } from '../../models/Location';
import { PlayIcon, PauseIcon, VideoSlashIcon } from '../Icons/Icons';
import GontrelLogoLoader from '../GontrelLogoLoader/GontrelLogoLoader';
import { usePostHog } from 'posthog-js/react';
import { HomePageModeEnum } from '../../models/User';
import LocationDetails from './LocationDetails/LocationDetails';
import PostRightCTA from './PostRightCTA/PostRightCTA';
// import CTAFooter from '../CTAFooter/CTAFooter';
import WhiteGontrelLoader from '../../assets/icons/WhiteGontrelLoader.png';
import { VideoSeekSlider } from 'react-video-seek-slider';
import './PostCard.scss';


interface PostCardProps {
    post: Post;
    currentLocation: Coordinates | undefined;
    index?: number;
    currentPostIndex?: number;
    isVideoVerifier?: boolean;
    isVerified?: boolean;
    videoVerifierAccuracy?: number;
    showNextPostLoader?: boolean;
}

const PostCard: React.FC<PostCardProps> = memo(
    ({
        post,
        currentLocation,
        index = 0,
        currentPostIndex = 0,
        isVideoVerifier = false,
        isVerified = false,
        videoVerifierAccuracy = 0,
        showNextPostLoader = false
    }) => {
        const [isMuted, setIsMuted] = useState<boolean>(true);
        const [startTime,] = useState<number | null>(null);
        const [isSeeking, setIsSeeking] = useState<boolean>(false);
        const [currentSegment] = useState<HomePageModeEnum | undefined>(HomePageModeEnum.EXPLORE);
        const [setShowSplashScreen] = useState<() => void>(() => { });

        const isActive = currentPostIndex === index;
        const [isPlaying, setIsPlaying] = useState<boolean>(isActive);

        const [loading, setLoading] = useState<boolean>(true);
        const [showIcon, setShowIcon] = useState<boolean>(false);
        const [videoStartTime, setVideoStartTime] = useState<number | null>(
            null
        );
        const [progress, setProgress] = useState<number>(0);
        const [bufferedTime, setBufferedTime] = useState<number>(0);
        const [maxTime, setMaxTime] = useState(0);
        const [isViewTracked, setIsViewTracked] = useState(false);
        const [hasError, setHasError] = useState(false);

        const posthog = usePostHog();

        const videoRef = useRef<HTMLVideoElement>(null);
        const seekVideoRef = useRef<HTMLVideoElement>(null);
        const ID = `video-${post.ID}`;
        const location = useLocation();
        const currentPath = location.pathname;

        const isHomeActive = currentPath === '/home';

        const getPreviewScreenUrl = (hoverTimeValue: number) => {
            const roundedTime = Math.floor(hoverTimeValue / 1000);

            if (!seekVideoRef.current) return '';
            return generatePreview(seekVideoRef.current, roundedTime) || '';
        };

        const handleMutedToggle = useCallback(
            (event: MouseEvent<HTMLIonItemElement, globalThis.MouseEvent>) => {
                event?.stopPropagation();
                setIsMuted(!isMuted);
            },
            [isMuted, setIsMuted]
        );

        const playVideo = useCallback(async () => {
            try {
                if (!videoRef.current) return;
                const isPlaying =
                    videoRef.current.currentTime > 0 &&
                    !videoRef.current.paused &&
                    !videoRef.current.ended &&
                    videoRef.current.readyState >
                    videoRef.current.HAVE_CURRENT_DATA;

                if (!isPlaying) {
                    await videoRef.current.play();
                }
            } catch (error) {
                console.log('Error playing video:', error);
                videoRef.current?.load();
                console.log('Video Ref:', videoRef.current?.src);
            }
        }, []);

        const pauseVideo = useCallback(() => {
            try {
                if (!videoRef.current) return;
                videoRef.current.pause();
            } catch (error) {
                console.log('Error pausing video:', error);
                videoRef.current?.load();
            }
        }, []);

        const stopVideo = useCallback(() => {
            pauseVideo();
            setTimeout(() => {
                if (!videoRef.current) return;
                videoRef.current.currentTime = 0;
                videoRef.current.load();
            }, 1000);
        }, [pauseVideo]);

        const handleVideoError = () => {
            if (isActive) {
                videoRef.current?.load();
                const error = videoRef.current?.error;

                if (error) {
                    console.error('Video Error:', error.code, error.message);
                } else {
                    console.error('Unknown video error occurred');
                }

                setHasError(true);
                setLoading(false);
            }
        };

        const handleIsPlayingToggle = useCallback(async () => {
            // console.log('is playing', isPlaying);
            if (!isPlaying && isActive) {
                await playVideo();
            } else {
                pauseVideo();
            }
            setIsPlaying(!isPlaying && isActive);
            setShowIcon(true);

            const timer = setTimeout(() => {
                setShowIcon(false);
            }, 1000);

            return () => clearTimeout(timer);
        }, [isPlaying, isActive, playVideo]);

        const handlePlay = () => {
            setVideoStartTime(Date.now());
            setIsViewTracked(false);
        };

        const handleSeekChange = (timeMs: number) => {
            const video = videoRef.current;
            if (video) {
                video.currentTime = timeMs / 1000;
                setProgress(timeMs);
            }
        };
        const handleDataLoaded = () => {
            if (videoRef.current) {
                const durationMs = videoRef.current.duration * 1000;
                setMaxTime(durationMs);
            }
        };

        const updateBufferedTime = () => {
            const video = videoRef.current;
            if (video?.buffered.length) {
                const bufferedEndMs =
                    video.buffered.end(video.buffered.length - 1) * 1000; // Convert seconds to ms
                setBufferedTime(bufferedEndMs);
            }
        };

        const handleSeekStart = () => {
            setIsSeeking(true);
            // Hide other UI elements if necessary
        };

        const handleSeekEnd = () => {
            setIsSeeking(false);
            // Show other UI elements if necessary
        };

        useEffect(() => {
            const handleActive = async () => {
                if (!videoRef.current) return;
                setHasError(false);

                if (isActive) {
                    await playVideo();
                    setIsPlaying(true);
                } else {
                    stopVideo();
                }
            };

            handleActive();
        }, [isActive, stopVideo, playVideo]);

        // Capture video progress on PostHog
        useEffect(() => {
            const handleLoadStart = () => setLoading(true);
            const handleCanPlayThrough = () => {
                if (index === 0 && startTime) {
                    // setShowSplashScreen(false);
                }
                if (isActive) {
                    playVideo();
                }
                setLoading(false);
            };

            const handlePause = () => {
                if (videoStartTime !== null) {
                    const timeSpent = (Date.now() - videoStartTime) / 1000;
                    trackVideoDuration(timeSpent);
                    setVideoStartTime(null);
                }
            };

            const trackVideoDuration = (timeSpent: number) => {
                if (isHomeActive && currentSegment === HomePageModeEnum.NEAR_YOU)
                    posthog.capture('video_watch_duration', {
                        video_id: post.ID,
                        locationName: post.locationName,
                        videoURL: post.src.videoURL,
                        duration: timeSpent
                    });

                if (
                    isHomeActive &&
                    currentSegment === HomePageModeEnum.EXPLORE
                ) {
                    posthog.capture('video_watch_duration_2', {
                        video_id: post.ID,
                        locationName: post.locationName,
                        videoURL: post.src.videoURL,
                        duration: timeSpent
                    });
                }
            };

            const handleTimeUpdate = () => {
                if (
                    !isViewTracked &&
                    videoRef?.current &&
                    videoRef.current.currentTime >= 5
                ) {
                    posthog.capture('video_viewed', {
                        video_id: post.ID,
                        locationName: post.locationName
                    });
                    setIsViewTracked(true);
                }

                if (videoRef?.current && !isSeeking) {
                    const currentTimeMs = videoRef.current.currentTime * 1000;
                    setProgress(currentTimeMs);
                }
            };

            const video = videoRef.current;
            if (video) {
                video.addEventListener('loadstart', handleLoadStart);
                video.addEventListener('canplaythrough', handleCanPlayThrough);
                video.addEventListener('play', handlePlay);
                video.addEventListener('pause', handlePause);
                video.addEventListener('timeupdate', handleTimeUpdate);
                video.addEventListener('ended', handlePause);
                video.addEventListener('progress', updateBufferedTime);
                video.addEventListener('loadeddata', handleDataLoaded);

                return () => {
                    video.removeEventListener('loadstart', handleLoadStart);
                    video.removeEventListener(
                        'canplaythrough',
                        handleCanPlayThrough
                    );
                    video.removeEventListener(
                        'canplaythrough',
                        handleCanPlayThrough
                    );
                    video.removeEventListener('play', handlePlay);
                    video.removeEventListener('pause', handlePause);
                    video.removeEventListener('timeupdate', handleTimeUpdate);
                    video.removeEventListener('ended', handlePause);
                    video.removeEventListener('progress', updateBufferedTime);
                    video.removeEventListener('loadeddata', handleDataLoaded);
                };
            }
        }, [currentSegment, index, isActive, isHomeActive, isSeeking, isViewTracked, playVideo, post.ID, post.locationName, post.src.videoURL, posthog, setShowSplashScreen, startTime, videoRef, videoStartTime]);

        return (
            <div className="flex flex-col justify-center w-full h-full">
                <div className="flex justify-center w-full h-full">
                    <button
                        id={ID}
                        className={`relative w-full h-full bg-black post--card ${isActive ? 'active-post-card' : ''
                            } `}
                        key={`${post.ID}-post-card`}
                        onClick={handleIsPlayingToggle}
                    >
                        {/* Background Video */}
                        <div className="relative video-container">
                            {loading && (
                                <GontrelLogoLoader className="flex items-center justify-center h-screen max-h-full" />
                            )}
                            {showIcon && (
                                <div className="absolute z-10 flex items-center justify-center w-full h-full pointer-events-none play-pause--container">
                                    {isPlaying ? <PlayIcon /> : <PauseIcon />}
                                </div>
                            )}
                            {hasError && (
                                <div className="flex flex-col items-center justify-center h-screen max-h-full gap-2">
                                    <VideoSlashIcon />
                                    <p>
                                        Failed to load video. Please try again
                                        later
                                    </p>
                                </div>
                            )}
                            <video
                                loop
                                muted={isMuted ?? true}
                                playsInline
                                ref={videoRef}
                                src={`${post.src.videoURL}#t=0.1`}
                                crossOrigin="anonymous"
                                preload="auto"
                                onError={handleVideoError}
                            />
                            <div className="hidden">
                                <video
                                    muted={true}
                                    playsInline
                                    ref={seekVideoRef}
                                    crossOrigin="anonymous"
                                    src={`${post.src.videoURL}#t=0.1`}
                                    preload="auto"
                                    onError={handleVideoError}
                                />
                            </div>
                        </div>
                        {/* Post Content */}
                        <div
                            className={`absolute bottom-0 flex flex-col w-full post-content--container ${isActive ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {!isSeeking && (
                                <>
                                    <div className="relative flex ms-4 post-content">
                                        {/* Location Details */}
                                        <LocationDetails
                                            postId={post.ID}
                                            isVideoVerifier={isVideoVerifier}
                                            isVerified={isVerified}
                                            videoVerifierAccuracy={
                                                videoVerifierAccuracy
                                            }
                                            username={post.username}
                                            userDisplayName={
                                                post.userDisplayName
                                            }
                                            userProfileImage={
                                                post.userProfileImage
                                            }
                                            locationName={post.locationName}
                                            locationId={post.locationID}
                                            foodTypes={post.metadata.foodTypes}
                                            labels={post.metadata.labels}
                                        />
                                        {/* Post Right CTA Buttons */}
                                        <PostRightCTA
                                            isVideoVerifier={false}
                                            postID={post.ID}
                                            locationName={post.locationName}
                                            locationID={post.locationID}
                                            currentUserID={'1'}
                                            handleMutedToggle={
                                                handleMutedToggle
                                            }
                                            isMuted={isMuted}
                                            isGuest={false}
                                        />
                                    </div>
                                    {/* CTA Button Footer */}
                                    {/* <CTAFooter
                                        postId={post.ID}
                                        locationName={`${post.locationName}, ${post.address}`}
                                        locationId={post.locationID}
                                        destinationLat={post.location.latitude}
                                        destinationLng={post.location.longitude}
                                        currentLocation={currentLocation}
                                        openingHours={post.openingHours}
                                        menu={post.metadata.menu}
                                        reservation={post.metadata.reservation}
                                        website={post.metadata.website}
                                    /> */}
                                </>
                            )}
                            <div
                                className="h-3 video--progress-container"
                                onMouseDown={handleSeekStart}
                                onMouseUp={handleSeekEnd}
                                onTouchStart={handleSeekStart}
                                onTouchEnd={handleSeekEnd}
                            >
                                <VideoSeekSlider
                                    max={maxTime}
                                    currentTime={progress}
                                    bufferTime={bufferedTime}
                                    onChange={handleSeekChange}
                                    secondsPrefix="00:"
                                    minutesPrefix=""
                                    getPreviewScreenUrl={getPreviewScreenUrl}
                                />
                            </div>
                        </div>
                    </button>
                </div>
                <div
                    className={`flex content-start justify-center w-full ${showNextPostLoader ? 'opacity-100 h-auto pb-5' : 'opacity-0 h-0 pb-0 transition-all'}`}
                >
                    <img
                        src={WhiteGontrelLoader}
                        alt="loading"
                        className="w-auto h-auto mt-5 loader animate-spin-reverse"
                    />
                </div>
            </div>
        );
    }
);

export default PostCard;
