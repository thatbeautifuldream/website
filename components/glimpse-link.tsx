'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import {
    Glimpse,
    GlimpseContent,
    GlimpseDescription,
    GlimpseImage,
    GlimpseTitle,
    GlimpseTrigger,
} from '@/components/glimpse';

export type TGlimpseData = {
    title: string | null;
    description: string | null;
    image: string | null;
};

export type TGlimpseLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    glimpseData?: TGlimpseData;
    closeDelay?: number;
    openDelay?: number;
    contentClassName?: string;
} & Omit<ComponentProps<typeof Link>, 'href' | 'children'>;

export const GlimpseLink = ({
    href,
    children,
    className,
    glimpseData,
    closeDelay = 0,
    openDelay = 0,
    contentClassName = 'w-80',
    ...linkProps
}: TGlimpseLinkProps) => {
    if (!glimpseData) {
        return (
            <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...linkProps}>
                {children}
            </a>
        );
    }

    return (
        <Glimpse closeDelay={closeDelay} openDelay={openDelay}>
            <GlimpseTrigger asChild>
                <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...linkProps}>
                    {children}
                </a>
            </GlimpseTrigger>
            <GlimpseContent className={contentClassName}>
                {glimpseData.image && (
                    <GlimpseImage src={glimpseData.image} alt={glimpseData.title || 'Preview image'} />
                )}
                {glimpseData.title && <GlimpseTitle>{glimpseData.title}</GlimpseTitle>}
                {glimpseData.description && (
                    <GlimpseDescription>{glimpseData.description}</GlimpseDescription>
                )}
            </GlimpseContent>
        </Glimpse>
    );
}; 