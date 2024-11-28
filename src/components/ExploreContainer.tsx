import { IonButton } from '@ionic/react';
import { useCallback } from 'react';
import { FirebaseAuthentication, User } from '@capacitor-firebase/authentication';
import './ExploreContainer.css';

interface ContainerProps {
    user: User | null;
}

const ExploreContainer: React.FC<ContainerProps> = ({ user }) => {
    const signInWithGoogle = useCallback(async () => {
        await FirebaseAuthentication.signInWithGoogle();
    }, []);

    const signInWithApple = useCallback(async () => {
        await FirebaseAuthentication.signInWithApple();
    }, []);

    const signOut = useCallback(async () => {
        await FirebaseAuthentication.signOut();
    }, []);

    return (
        <div id="container">
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                {user && <h1 className="text-3xl font-bold text-blue-600"><b>Welcome back,</b> <br /> <span className='text-blue-500'>{user.displayName}</span></h1>}
                <strong>Ready to create an app?</strong>
                <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
                {user ? <IonButton onClick={signOut}>Sign out</IonButton> : <div className='flex flex-row gap-2'>
                    <IonButton onClick={signInWithGoogle}>Sign in with Google</IonButton>
                    <IonButton onClick={signInWithApple}>Sign in with Apple</IonButton>
                </div>}
            </div>
        </div>
    );
};

export default ExploreContainer;
