import type {Metadata} from "next";
import '../../reset.css';
import "../../globals.css";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import AutoLanguageRedirect from "@/app/AutoRedirector";
import { Poppins } from 'next/font/google';

export const metadata: Metadata = {
    title: "Step into Dreamplay!",
    description: "Step into Dreamplay! 500% Welcome Bonus",
};

// Налаштування шрифту
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // обери потрібні ваги
});

export default async function LocaleLayout({children, params}: {
    children: React.ReactNode;
    params: { locale: 'en' | 'de' }
}) {
    // @ts-ignore
    const {locale}: 'en' | 'de' = await params;
    const messages = await getMessages();

    setRequestLocale(locale);

    return (
        <html lang={locale}>
        <body className={poppins.className}>
        <NextIntlClientProvider messages={messages}>
        <AutoLanguageRedirect/>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
