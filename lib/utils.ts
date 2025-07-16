import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

type TDeviceType = 'mobile' | 'desktop' | 'unknown';

export function getDeviceType(): TDeviceType {
    if (typeof window === 'undefined') return 'unknown';

    const userAgent = window.navigator.userAgent;

    switch (true) {
        case /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent):
            return 'mobile';
        case /Windows|Macintosh|Linux/i.test(userAgent):
            return 'desktop';
    }

    return 'unknown';
}