import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@capacitor-firebase/authentication';
import { PostCardCarousel } from '../components/PostCardCarousel/PostCardCarousel';
import './Home.scss';

const Home: React.FC<{ user: User | null }> = ({ user }) => {


    return (
        <IonPage>
            <IonContent>
                <PostCardCarousel />
            </IonContent>
        </IonPage>
    );
};

export default Home;
