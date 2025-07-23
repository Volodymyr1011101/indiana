'use client'
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export default function Modal({ children, show, elementClass, activeClass }: { children: React.ReactNode, show: boolean, elementClass: string, activeClass: string}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!show || !mounted) return null;

    return createPortal(
                <div className={`${elementClass} ${show ? activeClass : ''}`}>
                    {children}
                </div>,
        document.body
    );
}