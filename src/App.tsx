// React and React Router imports
import React from 'react';
import { Redirect, Route } from 'react-router';

// Ionic imports
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Capacitor imports
import Home from './pages/Home';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
/* import '@ionic/react/css/palettes/dark.system.css'; */
import "./theme/variables.scss";

setupIonicReact({
    mode: 'ios'
});

const App: React.FC =
    () => {


        return (
            <IonApp>
                <IonReactRouter>
                    <IonRouterOutlet>
                        <Route exact path="/home">
                            <Home />
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
