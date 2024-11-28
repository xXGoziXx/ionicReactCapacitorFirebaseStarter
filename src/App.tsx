// Third-party imports
import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
    IonApp,
    IonRouterOutlet,
    setupIonicReact
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

// Local imports
import Home from "./pages/Home";
import { initializeFirebase } from "./lib/firebase";
import { useAuth } from "./hooks/useAuth";

// CSS imports
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
// import "@ionic/react/css/palettes/dark.always.css";
import "./theme/variables.css";

setupIonicReact({
    mode: "ios"
});

/**
 * Main application component that handles routing and Firebase initialization
 * @returns The main application component with routing setup
 */
const App: React.FC = () => {
    const user = useAuth();

    useEffect(() => {
        const setup = async (): Promise<void> => {
            try {
                await initializeFirebase();
            } catch (error) {
                console.error("Application initialization failed:", error);
            }
        };

        void setup();
    }, []);

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
