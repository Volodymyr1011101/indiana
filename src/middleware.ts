import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from "next/server";

export default createMiddleware({
    ...routing,
    localeDetection: true // ✅ ця опція записує локаль у куку
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/((?!api|_next|.*\\..*).*)']
};