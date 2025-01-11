import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
    IonButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonModal,
    IonTitle,
    IonToolbar,
    useIonToast
} from '@ionic/react';
import {
    BookmarkIcon,
    FlagOutlineIcon,
    MoreCircleIcon,
    ShareIcon,
    VolumeMuteOutlineIcon,
    VolumeOutlineIcon
} from '../../Icons/Icons';
import { alertCircle, closeOutline } from 'ionicons/icons';
import { formatNumber, writeToClipboard } from '../../../lib/utils';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { usePostHog } from 'posthog-js/react';
import { getSaves, toggleLike } from '../../../lib/likes';
import { reportPost } from '../../../lib/posts';
import { FirebaseFirestore } from '@capacitor-firebase/firestore';
import { updateUserBlackList } from '../../../lib/user';


interface SaveButtonProps {
    postID: string;
    locationName: string;
    locationID: string;
    currentUserID: string | undefined;
    isGuest: boolean | undefined;
}

const SaveButton: React.FC<SaveButtonProps> = memo(
    ({
        postID: postId,
        locationName,
        locationID: locationId,
        currentUserID,
        isGuest
    }) => {
        const [isSaved, setIsSaved] = useState<boolean>(false);
        const [saves, setSaves] = useState<number>(0);
        const unsubscribeSavesIdRef = useRef<string | null>(null);
        const posthog = usePostHog();

        const handleSaveClick = async (
            event: React.MouseEvent<HTMLIonButtonElement, globalThis.MouseEvent>
        ) => {
            event.stopPropagation();
            if (!currentUserID) return;

            if (isGuest) {
                // bring out the modal
                // setRegisterModalOpen(true);
                return;
            }

            if (!isSaved) {
                posthog.capture('post_saved', {
                    postId,
                    locationName,
                    locationId
                });
            }
            console.log('Saving post...');
            await toggleLike(postId, currentUserID);
            event.currentTarget?.blur();
            event.currentTarget?.classList.remove('ion-activated');
        };

        useEffect(() => {
            setSaves(0);
            getSaves(
                { postID: postId, setSaves, setIsSaved, currentUserID },
                callbackID => {
                    unsubscribeSavesIdRef.current = callbackID;
                }
            );
            return () => {
                if (unsubscribeSavesIdRef.current) {
                    FirebaseFirestore.removeSnapshotListener({
                        callbackId: unsubscribeSavesIdRef.current
                    });
                }
            };
        }, [postId, currentUserID]);

        if (!(saves >= 0)) {
            return null;
        }

        return (
            <IonButton
                fill="clear"
                onClick={handleSaveClick}
                className="opacity-100 save-button"
            >
                <div className="flex flex-col items-center justify-center">
                    <BookmarkIcon
                        isActive={isSaved}
                        fillColor={{
                            inactive: '#FFFFFF',
                            active: '#BD00FF,#0070F3'
                        }}
                        className="size-8 heart-icon"
                    />
                    {saves > 0 && (
                        <span className="icon-text">{formatNumber(saves)}</span>
                    )}
                </div>
            </IonButton>
        );
    }
);

interface ShareButtonProps {
    locationName: string;
    locationID: string;
}
const ShareButton: React.FC<ShareButtonProps> = memo(
    ({ locationID: locationId, locationName }) => {
        const posthog = usePostHog();
        const sharePost = async (
            event: React.MouseEvent<HTMLIonButtonElement, globalThis.MouseEvent>
        ) => {
            event.stopPropagation();

            posthog.capture('post_shared', {
                locationName,
                locationId,
                platform: Capacitor.getPlatform()
            });
            if (Capacitor.isNativePlatform()) {
                await Share.share({
                    url: `https://app.gontrel.com/location/${locationId}`,
                    dialogTitle: 'Share Restaurant with Friends!',
                    title: 'Share Restaurant with Friends!',
                    text: `Check out this restaurant on Gontrel!`
                });
            } else {
                await writeToClipboard(
                    `${window.location.href}/location/${locationId}`,
                    'Profile URL has been copied to clipboard!'
                );
                console.log('Browser - Copied Profile URL to clipboard');
            }
        };

        return (
            <IonButton
                fill="clear"
                onClick={sharePost}
                className="share-button"
            >
                <div className="flex flex-col items-center justify-center">
                    <ShareIcon
                        fillColor={{
                            inactive: '#FFFFFF',
                            active: '#FFFFFF'
                        }}
                        className="size-8"
                    />
                    <span className="icon-text">Share</span>
                </div>
            </IonButton>
        );
    }
);

interface MoreButtonProps {
    setIsPostMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const MoreButton: React.FC<MoreButtonProps> = memo(({ setIsPostMenuOpen }) => {
    const openMenu = (event: React.MouseEvent<HTMLIonButtonElement>) => {
        event.stopPropagation();
        setIsPostMenuOpen(true);
    };
    return (
        <IonButton fill="clear" onClick={openMenu} className="volume-button">
            <div className="flex flex-col items-center justify-center">
                <MoreCircleIcon
                    fillColor={{
                        active: 'white',
                        inactive: 'white'
                    }}
                />
                <span className="icon-text">More</span>
            </div>
        </IonButton>
    );
});

interface MenuModalProps {
    isOpen: boolean;
    onClose: () => void;
    isMuted: boolean;
    handleMutedToggle: (
        event: React.MouseEvent<HTMLIonItemElement, globalThis.MouseEvent>
    ) => void;
    postID: string;
    currentUserID: string | undefined;
}

const MenuModal: React.FC<MenuModalProps> = memo(
    ({
        isOpen,
        onClose,
        isMuted,
        handleMutedToggle,
        postID,
        currentUserID
    }) => {
        const [isReportedModalOpen, setIsReportedModalOpen] = useState(false);
        const [isReporting, setIsReporting] = useState(false);
        const menuModalRef = useRef<HTMLIonModalElement>(null);
        const [present] = useIonToast();

        const updateBlackList = () => {
            if (currentUserID) updateUserBlackList(postID, currentUserID);
        };

        const handleReportPost = useCallback(
            async (event: React.MouseEvent<HTMLIonItemElement>) => {
                event.stopPropagation();
                setIsReporting(true);
                if (currentUserID && currentUserID === 'guest') {
                    // setRegisterModalOpen(true);
                    setIsReporting(false);
                    return;
                }
                console.log('CurrentUser:', currentUserID);
                const response = await reportPost(postID, currentUserID);
                setIsReporting(false);
                await menuModalRef.current?.dismiss();
                if (response.success) {
                    setIsReportedModalOpen(true);
                } else {
                    present({
                        message:
                            'An error occurred while trying to submit report.',
                        duration: 3000,
                        position: 'top',
                        cssClass: 'error--toast',
                        icon: alertCircle
                    });
                }
            },
            [currentUserID, postID, present]
        );

        return (
            <>
                <IonModal
                    className="auto-height bottom post-more-menu"
                    isOpen={isOpen}
                    onDidDismiss={onClose}
                    initialBreakpoint={1}
                    breakpoints={[0, 1]}
                    ref={menuModalRef}
                >
                    <IonHeader className="bg-white">
                        <IonToolbar>
                            <IonTitle className="text-black">More</IonTitle>
                            <IonButton
                                slot="end"
                                onClick={() => menuModalRef.current?.dismiss()}
                                fill="clear"
                            >
                                <IonIcon
                                    className="text-black"
                                    icon={closeOutline}
                                />
                            </IonButton>
                        </IonToolbar>
                    </IonHeader>
                    <div className="max-h-[30vh]">
                        <IonList className="mb-8 more--list">
                            <IonItem
                                button
                                className="rounded-none"
                                detail={false}
                                onClick={handleMutedToggle}
                            >
                                {isMuted ? (
                                    <VolumeMuteOutlineIcon
                                        slot="start"
                                        aria-label="Mute Volume"
                                    />
                                ) : (
                                    <VolumeOutlineIcon
                                        slot="start"
                                        aria-label="Unmute Volume"
                                    />
                                )}
                                <div>
                                    {isMuted ? 'Unmute post' : 'Mute post'}
                                </div>
                            </IonItem>
                            <IonItem
                                button
                                detail={false}
                                onClick={handleReportPost}
                                className="rounded-none"
                                disabled={isReporting}
                            >
                                <FlagOutlineIcon slot="start" />
                                <div>
                                    {isReporting ? 'Reporting...' : 'Report'}
                                </div>
                            </IonItem>
                        </IonList>
                    </div>
                </IonModal>
                <ReportedModal
                    isReportedModalOpen={isReportedModalOpen}
                    setIsReportedModalOpen={setIsReportedModalOpen}
                    updateBlackList={updateBlackList}
                />
            </>
        );
    }
);

interface ReportedModalProps {
    isReportedModalOpen: boolean;
    setIsReportedModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    updateBlackList: () => void;
}

const ReportedModal: React.FC<ReportedModalProps> = memo(
    ({ isReportedModalOpen, setIsReportedModalOpen, updateBlackList }) => {
        const reportedModalRef = useRef<HTMLIonModalElement>(null);
        // console.log('ReportedModal', isReportedModalOpen);
        return (
            <IonModal
                ref={reportedModalRef}
                isOpen={isReportedModalOpen}
                onDidDismiss={() => {
                    updateBlackList();
                    setIsReportedModalOpen(false);
                }}
                className="px-4 reported--success-modal"
            >
                <div className="flex flex-col items-center justify-between h-full px-4 py-6">
                    <div className="flex items-center justify-center w-20 h-20 px-4 py-3 rounded-full bg-neutral-5">
                        <FlagOutlineIcon
                            outlineColor={{
                                active: '#0070F3',
                                inactive: '#0070F3'
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <div className="text-xl font-bold">Post Reported</div>
                        <div className="text-sm">
                            The post has been reported and will be reviewed by
                            the Gontrel team
                        </div>
                    </div>

                    <IonButton
                        fill="clear"
                        className="w-full"
                        onClick={() => reportedModalRef.current?.dismiss()}
                    >
                        Done
                    </IonButton>
                </div>
            </IonModal>
        );
    }
);

interface PostRightCTAsProps {
    isVideoVerifier: boolean;
    postID: string;
    locationName: string;
    locationID: string;
    currentUserID: string | undefined;
    handleMutedToggle: (
        event: React.MouseEvent<HTMLIonItemElement, globalThis.MouseEvent>
    ) => void;
    isMuted: boolean;
    isGuest: boolean | undefined;
}

const PostRightCTA: React.FC<PostRightCTAsProps> = ({
    isVideoVerifier,
    postID,
    locationName,
    locationID,
    currentUserID,
    handleMutedToggle,
    isMuted,
    isGuest
}) => {
    const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
    return (
        <div className="z-10 flex flex-col post-right-cta--buttons">
            {!isVideoVerifier && (
                <>
                    <SaveButton
                        postID={postID}
                        locationName={locationName}
                        locationID={locationID}
                        currentUserID={currentUserID}
                        isGuest={isGuest}
                    />
                    <ShareButton
                        locationID={locationID}
                        locationName={locationName}
                    />
                </>
            )}
            <MoreButton setIsPostMenuOpen={setIsPostMenuOpen} />
            <MenuModal
                isOpen={isPostMenuOpen}
                onClose={() => setIsPostMenuOpen(false)}
                isMuted={isMuted}
                handleMutedToggle={handleMutedToggle}
                postID={postID}
                currentUserID={currentUserID}
            />
        </div>
    );
};

export default memo(PostRightCTA);
