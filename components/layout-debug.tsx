'use client';

import { useEffect } from 'react';
import { useLayoutDebugStore } from '@/stores/use-layout-debug-store';

export function LayoutDebug() {
    const { isDebugMode, toggleDebugMode } = useLayoutDebugStore();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Toggle debug mode with L key
            if (event.key === 'l') {
                event.preventDefault();
                toggleDebugMode();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [toggleDebugMode]);

    useEffect(() => {
        // Apply or remove the debug class to the body
        if (isDebugMode) {
            document.body.classList.add('debug-layout');
        } else {
            document.body.classList.remove('debug-layout');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('debug-layout');
        };
    }, [isDebugMode]);

    return null;
}
