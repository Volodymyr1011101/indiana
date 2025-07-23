'use client';

import {useEffect} from 'react';
import {getPathname, useRouter} from "@/i18n/routing";

export default function AutoLanguageRedirect() {
    const router = useRouter();

    useEffect(() => {
        const cookies = document.cookie.split(';').map(c => c.trim());
        const cookieExists = cookies.some(c => c.startsWith('NEXT_LOCALE='));
        if (cookieExists) return;
        const browserLang = navigator.languages;
        const hasEnglish = browserLang.some(locale => locale.startsWith('fr'));
        console.log(hasEnglish, browserLang);
        const targetLocale = hasEnglish ? 'fr-CA' : 'ne-CA';

        document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;

        // Якщо поточна мова відрізняється — редіректимось
        router.replace(getPathname({href: window.location.href,locale: targetLocale}));
    }, [router]);

    return null;
}
