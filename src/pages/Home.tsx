import { IonContent, IonPage } from '@ionic/react';
import EmblaCarousel from '../components/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import '../theme/embla.css';
import SwiperCarousel from '../components/SwiperCarousel';
const OPTIONS: EmblaOptionsType = { axis: 'y' }
const SLIDE_COUNT = 5000
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Home: React.FC = () => {


    return (
        <IonPage>
            <IonContent>
                <div className='bg-blue-500 text-white h-[50vh]'>
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </div>
                <div className="flex bg-red-500 text-white h-[50vh]">
                    <SwiperCarousel slides={SLIDES} />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
