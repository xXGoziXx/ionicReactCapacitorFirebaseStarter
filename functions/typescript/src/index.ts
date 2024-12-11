import { initializeApp } from 'firebase-admin/app';
import { https, logger } from 'firebase-functions';
import { auth } from 'firebase-functions/v1';
import { sendEmailVerificationEmail } from './emailService';
import { getAuth } from 'firebase-admin/auth';

initializeApp();

export const sendEmailVerificationOnUserCreate = auth
    .user()
    .onCreate(async (user: auth.UserRecord) => {
        const email = user.email;
        const username = user.displayName ?? '';

        const isEmailPasswordAuth = user.providerData.some(
            provider => provider.providerId === 'password'
        );

        if (email && isEmailPasswordAuth) {
            try {
                await sendEmailVerificationEmail(email, username);
            } catch (error) {
                console.error('Error sending email verification: ', error);
                logger.error('Error in sending email verification:', error);
            }
        } else {
            logger.warn('No email found for user: ', user.uid);
        }
    });

export const resendVerificationEmail = https.onCall(async context => {
    // Check if the user is authenticated
    if (!context.auth) {
        throw new https.HttpsError(
            'unauthenticated',
            'User must be authenticated'
        );
    }

    try {
        const uid = context.auth.uid;

        // Get user details from Firebase Authentication
        const userRecord = await getAuth().getUser(uid);
        const email = userRecord.email;
        const userName = userRecord.displayName ?? '';

        if (!email) {
            throw new https.HttpsError(
                'failed-precondition',
                'User does not have an email'
            );
        }

        // Send the verification email
        await sendEmailVerificationEmail(email, userName);

        return { message: 'Verification email sent successfully' };
    } catch (error) {
        logger.error('Error in resendVerificationEmail:', error);
        throw new https.HttpsError(
            'unknown',
            'Failed to send verification email'
        );
    }
});
