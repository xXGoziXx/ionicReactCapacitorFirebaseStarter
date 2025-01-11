import { Clipboard } from '@capacitor/clipboard';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import {
    AndroidAnimation,
    AndroidViewStyle,
    DismissStyle,
    InAppBrowser,
    iOSAnimation,
    iOSViewStyle
} from '@capacitor/inappbrowser';
import { Location, OpeningHours } from '../models/Location';
import { Timestamp } from 'firebase/firestore';
import { checkmarkCircle } from 'ionicons/icons';
import { useIonToast } from '@ionic/react';
export const sentenceArrayJoin = (itemList: string[]) =>
    itemList
        .map((item, index) =>
            index === itemList.length - 1 ? `and ${item}` : item
        )
        .join(', ');

export const writeToClipboard = async (
    text: string,
    presentToastText?: string
) => {
    const [present] = useIonToast();
    try {
        await Clipboard.write({
            string: text
        });

        present({
            message: presentToastText,
            duration: 3000,
            position: 'bottom',
            cssClass: 'success--toast',
            icon: checkmarkCircle
        });
    } catch (error) {
        console.error('Failed to write to clipboard', error);
    }
};

export const openInAppBrowser = async (
    url: string | undefined,
    browserOpenCallback?: () => void,
    browserClosedCallback?: () => void
) => {
    if (url === undefined) return;

    if (Capacitor.getPlatform() === 'web') {
        await Browser.open({
            url: url
        });
    } else {
        const listener = await InAppBrowser.addListener(
            'browserPageLoaded',
            () => {
                if (browserOpenCallback) {
                    browserOpenCallback();
                }
                // Remove the listener after it has been called
                listener.remove();
            }
        );

        const closeListener = await InAppBrowser.addListener(
            'browserClosed',
            () => {
                if (browserClosedCallback) {
                    browserClosedCallback();
                }
                // Remove the close listener
                closeListener.remove();
            }
        );

        await InAppBrowser.openInSystemBrowser({
            url,
            options: {
                iOS: {
                    viewStyle: iOSViewStyle.PAGE_SHEET,
                    enableBarsCollapsing: false,
                    enableReadersMode: false,
                    closeButtonText: DismissStyle.CLOSE,
                    animationEffect: iOSAnimation.COVER_VERTICAL
                },
                android: {
                    hideToolbarOnScroll: false,
                    showTitle: true,
                    startAnimation: AndroidAnimation.FADE_IN,
                    exitAnimation: AndroidAnimation.FADE_OUT,
                    viewStyle: AndroidViewStyle.FULL_SCREEN
                }
            }
        });
    }
};

export const checkClipboard = async () => {
    const { type, value } = await Clipboard.read();

    console.log(`Got ${type} from clipboard: ${value}`);
    return { type, value };
};

export const addTimeSuffix = (time: string): string => {
    const customTime = time.trim().toLowerCase();
    if (customTime === 'closed' || customTime === 'open 24 hours')
        return capitalize(customTime);

    const [start, close] = customTime.split('–').map(time => time.trim());

    if (start && close) {
        const startSuffix = start.slice(-2);
        let newStart = start.slice(0, -2);

        if (startSuffix !== 'am' && startSuffix !== 'pm') {
            newStart = start + ' pm';
        } else {
            newStart = start;
        }
        return newStart + ' – ' + close;
    }
    return start + ' – ' + close;
};

export const removeTimeSuffix = (time: string): string => {
    const customTime = time.trim().toLowerCase();
    if (customTime === 'closed' || customTime === 'open 24 hours')
        return capitalize(customTime);

    const [start, close] = customTime
        .split(/\s*[-–—]\s*/)
        .map(time => time.trim());

    const removeSuffix = (time: string) => {
        if (time.endsWith('am') || time.endsWith('pm')) {
            return time.slice(0, -2).trim();
        }
        return time;
    };

    if (start && close) {
        const startSuffix = start.slice(-2);
        const closeSuffix = close.slice(-2);

        if (startSuffix === closeSuffix) {
            const newStart = removeSuffix(start);
            return newStart + ' – ' + close;
        }
    }

    return start + ' – ' + close;
};

export const kmToMiles = (distance: number) => {
    return distance * 0.621371;
};

export const milesToKm = (miles: number) => {
    return miles * 1.60934;
};

// assuming the distance is in Kilometres, and units are value that should be returned
export const getConvertedDistance = (distance: number, units: 'km' | 'mi') => {
    const value: number = units === 'km' ? distance : milesToKm(distance);

    // if its less than 1 km / mile, convert to metres or yards respectively
    if (units === 'km') {
        return value < 1
            ? `${(value * 1000).toFixed(0)}m`
            : `${value.toFixed(2)}km`;
    } else {
        return value < 1
            ? `${(value * 1760).toFixed(0)}yds`
            : `${value.toFixed(2)}mi`;
    }
};

export const getCurrentOpeningHours = (openingHours: OpeningHours) => {
    const today = new Date().getDay() - 1 < 0 ? 6 : new Date().getDay() - 1;
    const openingHoursToday = openingHours[today];
    return openingHoursToday ?? '';
};

export const formatCurrentTime = (openingTime: string) => {
    const openingTimes = openingTime.split(',');
    return openingTimes
        .map((time: string) =>
            addTimeSuffix(time.trim()).replace(/\s/g, '').replace('–', ' - ')
        )
        .join(', ');
};

type TimePeriod = 'am' | 'pm';

interface ParsedTime {
    hour: number;
    minute: number;
    period: TimePeriod;
}

/**
 * Checks if a location is currently open based on the provided opening hours string.
 * @param openingHour - The opening hours string.
 * @returns True if the location is currently open, false otherwise.
 */
export const isOpen = (openingHour: string): boolean => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Handle special cases
    if (openingHour.toLowerCase() === 'closed') {
        return false;
    } else if (
        openingHour.toLowerCase() === 'open 24 hours' ||
        openingHour.toLowerCase() === 'open24hours'
    ) {
        return true;
    }

    const timeRanges = openingHour.split(',').map(range => range.trim());

    // Check each time range
    for (const range of timeRanges) {
        const [start, end] = range.split('-').map(time => time.trim());

        // console.log(start, end);
        const startTime = parseTime(start);
        const endTime = parseTime(end);

        const start24 = convertTo24Hour(startTime.hour, startTime.period);
        const end24 = convertTo24Hour(endTime.hour, endTime.period);

        if (
            isTimeInRange(
                currentHour,
                currentMinute,
                start24,
                startTime.minute,
                end24,
                endTime.minute
            )
        ) {
            return true;
        }
    }

    return false;
};

/**
 * Parses a time string into an object containing hour, minute, and period (AM/PM).
 * @param timeStr - The time string to parse.
 * @returns An object containing the parsed hour, minute, and period.
 */
export const parseTime = (timeStr: string): ParsedTime => {
    const [time, period] = timeStr.split(/(am|pm)/).map(part => part.trim());
    const [hour, minute = '00'] = time.split(':').map(Number);
    return { hour, minute: Number(minute), period: period as TimePeriod };
};

/**
 * Converts a 12-hour time to a 24-hour time.
 * @param hour - The hour in 12-hour format.
 * @param period - The period (AM/PM).
 * @returns The hour in 24-hour format.
 */
export const convertTo24Hour = (hour: number, period: TimePeriod): number => {
    if (period === 'pm' && hour !== 12) {
        hour += 12;
    }
    if (period === 'am' && hour === 12) {
        hour = 0;
    }
    return hour;
};

/**
 * Checks if the current time falls within a specified time range.
 * @param currentHour - The current hour in 24-hour format.
 * @param currentMinute - The current minute.
 * @param startHour - The start hour of the time range in 24-hour format.
 * @param startMinute - The start minute of the time range.
 * @param endHour - The end hour of the time range in 24-hour format.
 * @param endMinute - The end minute of the time range.
 * @returns True if the current time is within the time range, false otherwise.
 */
export const isTimeInRange = (
    currentHour: number,
    currentMinute: number,
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
): boolean => {
    if (endHour < startHour) {
        // Handling overnight hours
        return (
            currentHour > startHour ||
            (currentHour === startHour && currentMinute >= startMinute) ||
            currentHour < endHour ||
            (currentHour === endHour && currentMinute <= endMinute)
        );
    } else {
        return (
            (currentHour > startHour ||
                (currentHour === startHour && currentMinute >= startMinute)) &&
            (currentHour < endHour ||
                (currentHour === endHour && currentMinute <= endMinute))
        );
    }
};

export const formatNumber = (value: number): string => {
    // Define the thresholds for formatting
    const thresholds = [
        { value: 1e9, symbol: 'B' }, // Billion
        { value: 1e6, symbol: 'M' }, // Million
        { value: 1e3, symbol: 'K' } // Thousand
    ];

    // Iterate through the thresholds
    for (const threshold of thresholds) {
        if (Math.abs(value) >= threshold.value) {
            // Divide the value by the threshold to get the formatted number
            const formattedValue = value / threshold.value;

            // Use toFixed to limit the number of decimal places
            return `${formattedValue.toFixed(1)}${threshold.symbol}`;
        }
    }

    // If the value is below the first threshold, return the original number
    return value.toString();
};

export const sortWithRandomness = (a: Location, b: Location) => {
    // Calculate random value for each location
    const randomA = Math.random();
    const randomB = Math.random();
    // Sort by weighted sum of rating level and distance plus randomness
    const weightedSumA = (a.rating ?? 0) + randomA * 10;
    const weightedSumB = (b.rating ?? 0) + randomB * 10;
    // console.log(
    //     'Weighted Sum A:',
    //     weightedSumA,
    //     'Weighted Sum B:',
    //     weightedSumB
    // );
    // Sort by the weighted sum in descending order
    return weightedSumB - weightedSumA;
    // return randomB - randomA;
};

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const validateUsername = (username: string) => {
    const re = /^[a-zA-Z0-9]{3,16}$/;
    return re.test(username);
};
// regex to validate email
export const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const validatePassword = (password: string) => {
    const re = /^.{8,}$/;
    return re.test(password);
};

export const calculateMinutesAgo = (createdAt: Timestamp): string => {
    const now = new Date();
    const created = createdAt.toDate();
    const diff = Math.round((now.getTime() - created.getTime()) / (1000 * 60));
    if (diff < 1) {
        return `${diff * 60}s`;
    } else if (diff < 60) {
        return `${diff}m`;
    } else if (diff < 1440) {
        const hours = Math.floor(diff / 60);
        return hours > 1 ? `${hours}hrs` : `${hours}hr`;
    } else {
        const days = Math.floor(diff / 1440);
        return `${days}d`;
    }
};

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const generatePreview = (
    videoRef: HTMLVideoElement,
    time: number
): string => {
    if (!videoRef) return '';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });

    if (context) {
        canvas.width = videoRef.videoWidth;
        canvas.height = videoRef.videoHeight;

        // Set the video time to the scrubbed value
        videoRef.currentTime = time;

        // Draw the current frame of the video onto the canvas
        context.drawImage(videoRef, 0, 0, canvas.width, canvas.height);

        // Generate a preview URL
        return canvas.toDataURL('image/jpeg');
    }

    return '';
};

export const shuffleArray = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
