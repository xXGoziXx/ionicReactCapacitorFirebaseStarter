/// <reference types="@capacitor-firebase/authentication" />
/// <reference types="@capacitor-firebase/firestore" />
/// <reference types="@capacitor-firebase/storage" />
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.gontrel.gontrel',
    appName: 'Gontrel',
    webDir: 'dist',
    server: {},
    backgroundColor: '#0070f3',
    plugins: {
        FirebaseAuthentication: {
            skipNativeAuth: false,
            providers: ["apple.com", "google.com"],
        },
        FirebaseFirestore: {

        },
        FirebaseStorage: {

        },
        SplashScreen: {
            launchShowDuration: 0,
            launchAutoHide: true,
            backgroundColor: '#0070f3',
            androidScaleType: 'CENTER_CROP',
            showSpinner: true,
            androidSpinnerStyle: 'large',
            iosSpinnerStyle: 'large',
            spinnerColor: '#000000',
            splashFullScreen: true,
            splashImmersive: true,
            layoutName: 'splash',
            useDialog: false,
            webDir: 'dist',
            splashHtml: 'index.html',
            androidLaunchTheme: 'splash'
        }
    },
    android: {
        buildOptions: {
            keystorePath: 'undefined',
            keystoreAlias: 'undefined'
        }
    }
};

export default config;
