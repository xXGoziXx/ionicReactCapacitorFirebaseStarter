import { Timestamp } from 'firebase/firestore';
import { User } from '../models/User';
import { UnifiedEditableData } from '../models/Admin';
import { DistanceFilterEnum, Location } from '../models/Location';
import { PostTypeEnum } from '../models/Post';

export const APP_NAME: string = 'Gontrel';
export const EMAIL: string = 'info@gontrel.com';
export const FIELDS = [
    'place_id',
    'name',
    'types',
    'photos',
    'formatted_address',
    'geometry',
    'opening_hours',
    'international_phone_number',
    'price_level',
    'website',
    'rating',
    'reviews'
];

export const SPLASH_SCREEN_MAX_COUNT: number = 5;

export const OVERSCAN: number = 1;
export const COUNTRY_CODE_RESTRICTIONS: string[] = ['IE'];

export const DEFAULT_TIMESTAMP: Timestamp = Timestamp.fromDate(
    new Date('2023-09-01')
);

export const DEFAULT_USER: User = {
    ID: '',
    aboutMe: '',
    email: '',
    displayName: '',
    phoneNumber: '',
    profileImage: '',
    username: '',
    location: '',
    selectedOptions: [],
    searchHistory: [],
    isVerified: false,
    isAdmin: false,
    createdAt: DEFAULT_TIMESTAMP,
    modifiedAt: DEFAULT_TIMESTAMP,
    blacklist: []
};

export const DEFAULT_GUEST_USER: User = {
    ID: 'guest',
    aboutMe: 'Guest user',
    email: '',
    displayName: 'Guest',
    phoneNumber: '',
    profileImage: '',
    username: 'guest',
    location: '',
    selectedOptions: [],
    searchHistory: [],
    isVerified: true,
    isAdmin: false,
    isGuest: true,
    createdAt: DEFAULT_TIMESTAMP,
    modifiedAt: DEFAULT_TIMESTAMP,
    blacklist: []
};

export const GENERATED_USER: User = {
    ID: 'generatedbygontrel',
    aboutMe: "Gontrel's very own people-to-location matchmaker",
    email: 'hello@gontrel.com',
    displayName: 'Gontrel Generator',
    phoneNumber: '353123456789',
    profileImage:
        'https://firebasestorage.googleapis.com/v0/b/laxlee.appspot.com/o/profilePictures%2Flogo.png?alt=media&token=b6ba8533-023b-4f65-987d-af6f8d56ed79',
    username: 'gontrel',
    location: 'Ireland',
    selectedOptions: ['adrenaline', 'fine-dining', ''],
    isVerified: true,
    searchHistory: [],
    isAdmin: true,
    createdAt: DEFAULT_TIMESTAMP,
    modifiedAt: DEFAULT_TIMESTAMP,
    blacklist: []
};

export const DEFAULT_LOCATION_DATA: Location = {
    ID: '',
    createdAt: DEFAULT_TIMESTAMP,
    modifiedAt: DEFAULT_TIMESTAMP,
    type: PostTypeEnum.RESTAURANT,
    name: '',
    searchName: '',
    lat: 0,
    lng: 0,
    geohash: '',
    distance: 0,
    openingHours: ['', '', '', '', '', '', ''],
    toilets: false,
    phoneNumber: '',
    website: '',
    address: '',
    photos: [],
    rating: 0,
    reviews: [],
    priceLevel: 0,
    menu: '',
    reservation: '',
    labels: [],
    foodTypes: [],
    isVerified: false
};

export const NO_VIDEOS_IMAGE_URL: string = '';
export const DEFAULT_VIDEO_URL: string =
    'https://firebasestorage.googleapis.com/v0/b/laxlee.appspot.com/o/videos%2Fdefault_restaurant_video.mp4?alt=media&token=9beecef0-f60b-45fc-8fda-c93dc0cf8d89';

export const GONTREL_PROFILE_IMAGE: string =
    'https://firebasestorage.googleapis.com/v0/b/laxlee.appspot.com/o/userProfileImages%2Fgeneratedbygontrel%2FprofileImage.png?alt=media&token=7b791256-67a4-4f9c-b202-6a9b6466248c';

export const POSTBOTURLEMULATOR_VIDEO: string =
    'http://127.0.0.1:5001/laxlee/us-central1/postbot_videos';
export const POSTBOTURLEMULATOR_LOCATION: string =
    'http://127.0.0.1:5001/laxlee/us-central1/postbot_location';

export const CLOUD_FUNCTIONS_ROOT_URL: string =
    'https://us-central1-laxlee.cloudfunctions.net/';

export const POSTBOT_LOCATION: string =
    CLOUD_FUNCTIONS_ROOT_URL + 'postbot_location';

export const POSTBOT_VIDEOS: string =
    CLOUD_FUNCTIONS_ROOT_URL + 'postbot_videos';

export const DEFAULT_EDITABLE_LOCATION_DATA: UnifiedEditableData = {
    videoLink: '',
    menu: '',
    reservation: '',
    foodType: [],
    foodType1: '',
    foodType2: ''
};

export const DEFAULT_POSTBOT_RESULTS = {
    menu: '',
    reservation: '',
    videos: [],
    labels: []
};

export const DEFAULT_DISTANCE: DistanceFilterEnum = DistanceFilterEnum.MODERATE;
export const DEFAULT_SEARCH_DISTANCE: DistanceFilterEnum =
    DistanceFilterEnum.CLOSE_BY;
