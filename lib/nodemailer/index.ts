import nodemailer from "nodemailer";
import {
    WELCOME_EMAIL_TEMPLATE,
    NEWS_SUMMARY_EMAIL_TEMPLATE,
    STOCK_NEWS_EMAIL_TEMPLATE,
} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    },
});


// ===============================
// Welcome Email
// ===============================

export const sendWelcomeEmail = async ({
    email,
    name,
    intro,
}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace("{{name}}", name)
        .replace("{{intro}}", intro);

    const mailOptions = {
        from: `"Signalist" <signalist@jsmastery.pro>`,
        to: email,
        subject: `Добро пожаловать в Signalist`,
        text: "Спасибо за регистрацию в Signalist",
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};


// ===============================
// Daily News Summary Email
// ===============================

export const sendNewsSummaryEmail = async ({
    email,
    date,
    newsContent,
}: {
    email: string;
    date: string;
    newsContent: string;
}): Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace("{{date}}", date)
        .replace("{{newsContent}}", newsContent);

    const mailOptions = {
        from: `"Новости Signalist" <signalist@jsmastery.pro>`,
        to: email,
        subject: `📊 Сводка новостей рынка — ${date}`,
        text: "Сегодняшняя сводка новостей фондового рынка",
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};


// ===============================
// Stock News Email (Send News button)
// ===============================

export const sendSingleStockNewsEmail = async ({
    email,
    symbol,
    company,
    date,
    newsContent,
}: {
    email: string;
    symbol: string;
    company: string;
    date: string;
    newsContent: string;
}): Promise<void> => {
    const htmlTemplate = STOCK_NEWS_EMAIL_TEMPLATE
        .replace(/{{symbol}}/g, symbol)
        .replace(/{{company}}/g, company)
        .replace("{{date}}", date)
        .replace("{{newsContent}}", newsContent);

    const mailOptions = {
        from: `"Signalist" <signalist@jsmastery.pro>`,
        to: email,
        subject: `📰 Новости по акции ${company} (${symbol})`,
        text: `Последние новости по акции ${company}`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};