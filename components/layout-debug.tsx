'use client';

import { useEffect, useState } from 'react';
import { useLayoutDebugStore } from '@/stores/use-layout-debug-store';

interface ElementInfo {
    classNames: string[];
    tagName: string;
    position: { x: number; y: number };
}

export function LayoutDebug() {
    const { isDebugMode, toggleDebugMode, setDebugMode } = useLayoutDebugStore();
    const [hoveredElement, setHoveredElement] = useState<ElementInfo | null>(
        null
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // use cmd + shift + o to toggle debug mode
            if (event.metaKey && event.shiftKey && event.key === 'o') {
                event.preventDefault();
                toggleDebugMode();
            }
            // on pressing esc exit debug mode (only deactivate, don't toggle)
            if (event.key === 'Escape') {
                event.preventDefault();
                setDebugMode(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [toggleDebugMode, setDebugMode]);

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

    useEffect(() => {
        if (!isDebugMode) {
            setHoveredElement(null);
            return;
        }

        const handleMouseMove = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target || target === document.body) {
                return;
            }

            // Skip if hovering over the tooltip itself
            if (target.closest('[data-debug-tooltip]')) {
                return;
            }

            const classNames = target.className
                ? target.className.split(' ').filter(Boolean)
                : [];

            setHoveredElement({
                classNames,
                tagName: target.tagName.toLowerCase(),
                position: { x: event.clientX, y: event.clientY },
            });
        };

        const handleMouseLeave = (event: MouseEvent) => {
            const relatedTarget = event.relatedTarget as HTMLElement;
            // Don't hide if moving to the tooltip
            if (relatedTarget?.closest('[data-debug-tooltip]')) {
                return;
            }
            setHoveredElement(null);
        };

        // Use mousemove for better tracking and mouseleave for cleanup
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isDebugMode]);

    if (!(isDebugMode && hoveredElement)) {
        return null;
    }

    return (
        <div
            className='pointer-events-none fixed z-[9999] max-w-sm rounded-lg border border-border bg-background p-3 shadow-lg'
            data-debug-tooltip
            style={{
                left: Math.min(hoveredElement.position.x + 10, window.innerWidth - 300),
                top: Math.min(hoveredElement.position.y + 20, window.innerHeight - 100),
                fontSize: '12px',
                lineHeight: '1.4',
            }}
        >
            <div className="mb-2 font-medium text-foreground">
                &lt;{hoveredElement.tagName}&gt;
            </div>

            {hoveredElement.classNames.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                    {hoveredElement.classNames.map((className) => (
                        <span
                            className="rounded bg-secondary px-1 py-0.5 text-foreground-lighter text-xs"
                            key={className}
                        >
                            {className}
                        </span>
                    ))}
                </div>
            ) : (
                <div className="text-foreground-lighter text-xs">No classes</div>
            )}
        </div>
    );
}
