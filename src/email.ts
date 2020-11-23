import nodemailer from 'nodemailer';

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  WEBSITE_DOMAIN = 'https://withmoney.me',
  EMAIL_FROM = 'withmoney <support@withmoney.me>'
} = process.env;
console.log({ EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD })
if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASSWORD) {
  /* istanbul ignore next */
  throw new Error('Email envs are not defined');
}

const transport = nodemailer.createTransport({
  // @ts-ignore
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

interface IVerifyEmail {
  firstName: string;
  email: string;
  hash: string;
}

interface IWelcomeMessage {
  firstName: string;
  email: string;
}

export const sendVerifyEmail = ({ firstName, email, hash }: IVerifyEmail) =>
  transport.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: '[withmoney] Please verify your email',
    text: `Hello ${firstName}\n
Please you need to verify your email,
using this link ${WEBSITE_DOMAIN}/verify?hash=${hash}
\natt: withmoney team`,
    html: `<p>Hello ${firstName}</p>
<p>Please you need to verify your email. <a href="${WEBSITE_DOMAIN}/verify?hash=${hash}" target="_blank">Just click here.</a></p>
<p>or using this link ${WEBSITE_DOMAIN}/verify?hash=${hash}</p>
<p>att: withmoney team</p>`,
  });

export const sendWelcomeMessage = ({ firstName, email }: IWelcomeMessage) =>
  transport.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Welcome to withmoney',
    text: `Hello ${firstName}
Thank you for complete your registration, We hope you like to use the withmoney project.
Att: withmoney team`,
    html: `<p>Hello ${firstName}</p>
<p>Thank you for complete your registration, We hope you like to use the withmoney project.</p>
<p>att: withmoney team</p>`,
  });

export const sendChangePasswordRequest = ({ firstName, email, hash }: IVerifyEmail) =>
  transport.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: '[withmoney] Change Password',
    text: `Hello ${firstName}\n
We received a request to change your password. Please use this link ${WEBSITE_DOMAIN}/reset-password?hash=${hash} to create another password.
If you don't made this request, please disregard this email.
\natt: withmoney team`,
    html: `<p>Hello ${firstName}</p>
<p>We received a request to change your password. Please <a href="${WEBSITE_DOMAIN}/reset-password?hash=${hash}" target="_blank">click here.</a> or use this link ${WEBSITE_DOMAIN}/change-password?hash=${hash} to create another password.</p>
<p>If you don't made this request, please disregard this email.</p>
<p>att: withmoney team</p>`,
  });
