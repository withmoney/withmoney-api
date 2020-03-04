import nodemailer from 'nodemailer';

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;

if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASSWORD) {
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

export const sendVerifyEmail = ({ firstName, email, hash }: IVerifyEmail) =>
  transport.sendMail({
    from: 'withmoney <no-replay@withmoney.com>',
    to: email,
    subject: '[withmoney] Please verify your email',
    text: `Hello ${firstName}\n
Please you need to verify your email,
using this link https://withmoney.com/verify?hash=${hash}
\natt: withmoney`,
    html: `<p>Hello ${firstName}</p>
<p>Please you need to verify your email. <a href="https://withmoney.com/verify?hash=${hash}" target="_blank">Just click here.</a></p>
<p>or using this link https://withmoney.com/verify?hash=${hash}</p>
<p>att: withmoney</p>`,
  });
