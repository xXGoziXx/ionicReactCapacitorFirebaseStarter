import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { FirestorePost } from '../models/Post';
import { User } from '@capacitor-firebase/authentication';
import ExploreContainer from '../components/ExploreContainer';
import MediaGallery from '../components/MediaGallery';
import { fetchRecommendedPosts } from "../lib/posts";
import { chevronUpOutline, chevronDownOutline } from 'ionicons/icons';
import './Home.css';

const Home: React.FC<{ user: User | null }> = ({ user }) => {
    const [recommendedPosts, setRecommendedPosts] = useState<FirestorePost[]>([]);
    const [isTopSection, setIsTopSection] = useState(true);
    const contentRef = useRef<HTMLIonContentElement>(null);

    const handleFetchPosts = useCallback(async (signal: AbortSignal) => {
        try {
            const userID = user?.uid;
            if (!userID) {
                console.log("No user ID found");
                return;
            }

            const posts = await fetchRecommendedPosts({ userID, signal });

            if (signal.aborted) return;

            console.log("Fetched all posts:", posts.length);
            setRecommendedPosts(posts);

        } catch (error) {
            if (error instanceof Error) {
                if (error.name === "AbortError" || error.message === "Operation cancelled") {
                    console.log("Request was cancelled");
                } else {
                    console.error("Error fetching recommended posts:", error);
                }
            }
        }
    }, [user]);

    useEffect(() => {
        const abortController = new AbortController();

        if (user) {
            handleFetchPosts(abortController.signal);
        }

        return () => {
            abortController.abort();
        };
    }, [handleFetchPosts, user]);

    const handleSectionChange = () => {
        if (!contentRef.current) return;

        const newPosition = isTopSection ? window.innerHeight : 0;
        contentRef.current.scrollToPoint(0, newPosition, 500); // 500ms animation
        setIsTopSection(!isTopSection);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent ref={contentRef} fullscreen scrollY={false}>
                <div className="flex flex-col w-full">
                    <section className="relative flex-shrink-0 w-full h-screen">
                        <div className="absolute inset-0 overflow-y-auto">
                            <ExploreContainer user={user} />
                        </div>
                    </section>
                    {user && recommendedPosts.length > 0 && (
                        <section className="relative flex-shrink-0 w-full h-screen">
                            <div className="absolute inset-0 px-4 overflow-y-auto">
                                <MediaGallery posts={recommendedPosts} />
                            </div>
                        </section>
                    )}
                </div>

                {/* Floating Navigation Button */}
                {user && recommendedPosts.length > 0 && (
                    <button
                        onClick={handleSectionChange}
                        className="fixed z-50 flex items-center justify-center w-12 h-12 text-white rounded-full shadow-lg bottom-6 right-6 bg-primary"
                        aria-label={isTopSection ? "Scroll to gallery" : "Scroll to explore"}
                    >
                        <IonIcon
                            icon={isTopSection ? chevronDownOutline : chevronUpOutline}
                            className="w-6 h-6"
                        />
                    </button>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Home;
