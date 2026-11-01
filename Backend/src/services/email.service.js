const nodemailer = require("nodemailer");

/**
 * Sends an email using Nodemailer.
 * All credentials are read from environment variables — never hardcoded.
 *
 * @param {object} options
 * @param {string} options.to      - Recipient email address
 * @param {string} options.subject - Email subject line
 * @param {string} options.html    - HTML body
 * @param {string} [options.text]  - Plain-text fallback (improves spam score)
 */
async function sendEmail({ to, subject, html, text }) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: Number(process.env.EMAIL_PORT) === 465,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    await transporter.sendMail({
        from: `"TeleVital" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
    });
}

module.exports = { sendEmail };
