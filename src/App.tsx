// React and React Router imports
import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router';

// Ionic imports
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Capacitor imports
import { App as CapacitorApp } from '@capacitor/app';
import { initializeFirebase } from './lib/firebase';
import { useAuthStateChangedEffect } from './hooks/useAuthStateChangedEffect';
import Home from './pages/Home';
import { useAuth } from './hooks/useAuth';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import "./theme/variables.scss";

setupIonicReact({
    mode: 'ios'
});

const App: React.FC =
    () => {
        const user = useAuth();
        const history = useHistory();
        useAuthStateChangedEffect((result) => {
            console.log('Auth state changed:', result);
        })

        useEffect(() => {
            const setup = async (): Promise<void> => {
                try {
                    console.log('Initializing Firebase');
                    await initializeFirebase();
                } catch (error) {
                    console.error("Application initialization failed:", error);
                }
            };

            void setup();
        }, []);



        useEffect(() => {
            CapacitorApp.addListener('appUrlOpen', (data: any) => {
                const url = new URL(data.url);
                const path = url.pathname;
                history.push(path);
            });
        }, [history]);



        return (
            <IonApp>
                <IonReactRouter>
                    <IonRouterOutlet>
                        <Route exact path="/home">
                            <Home user={user} />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/home" />
                        </Route>
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonApp>
        );
    };

export default App;
