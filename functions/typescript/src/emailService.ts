import { getAuth } from 'firebase-admin/auth';
import { createTransport } from 'nodemailer';
import * as path from 'path';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { logger } from 'firebase-functions';

const gmailEmail = process.env.GMAIL_EMAIL;
const gmailPassword = process.env.GMAIL_PASSWORD;

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

export const sendEmailVerificationEmail = async (
    email: string,
    username?: string
) => {
    try {
        logger.info('now running verification function ');

        // generate verification link
        const verificationLink =
            await getAuth().generateEmailVerificationLink(email);

        const templatePath = path.resolve(
            'src/templates/verificationEmail.hbs'
        );

        const textTemplatePath = path.resolve(
            'src/templates/verificationEmail.txt'
        );

        // create templates for both HTML and text version of the email
        const emailTemplate = readFileSync(templatePath, 'utf8');
        const textTemplateSource = readFileSync(textTemplatePath, 'utf8');

        const textTemplate = compile(textTemplateSource);
        const template = compile(emailTemplate);

        const completeTemplate = template({ verificationLink });
        const textContent = textTemplate({ verificationLink, username });

        // construct the email and send
        const mailOptions = {
            from: '"Gontrel" <info@gontrel.com>',
            to: email,
            subject: 'Gontrel Email Verification',
            html: completeTemplate,
            text: textContent
        };

        await transporter.sendMail(mailOptions);

        logger.info('Verification email sent to: ', email);
    } catch (error) {
        logger.error('Error sending verification email: ', error);
        throw error;
    }
};
