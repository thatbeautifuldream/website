'use client';

import { Maximize, Minimize, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import ButtonGroup from '@/components/ui/button-group';

interface SvgPanZoomInstance {
    destroy: () => void;
    getPan: () => { x: number; y: number };
    getZoom: () => number;
    zoom: (scale: number) => void;
    pan: (point: { x: number; y: number }) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    reset: () => void;
    fit: () => void;
    center: () => void;
    resize: () => void;
    updateBBox: () => void;
}

interface CustomEventHandlerOptions {
    instance: SvgPanZoomInstance;
    svgElement: SVGElement;
}

interface TouchPoint {
    x: number;
    y: number;
}

export function Mermaid({ chart }: { chart: string }) {
    const id = useId();
    const [svg, setSvg] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const currentChartRef = useRef<string>(null);
    const currentThemeRef = useRef<string | undefined>(undefined);
    const panzoomRef = useRef<SvgPanZoomInstance | null>(null);
    const { resolvedTheme } = useTheme();

    // Handle fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isNowFullscreen = !!document.fullscreenElement;

            if (isNowFullscreen !== isFullscreen) {
                setIsTransitioning(true);
                setIsFullscreen(isNowFullscreen);

                // Delay the resize and refit to allow for smooth transition
                setTimeout(() => {
                    if (panzoomRef.current) {
                        panzoomRef.current.resize();
                        // biome-ignore lint/suspicious/noFocusedTests: legitimate svg-pan-zoom API call
                        panzoomRef.current.fit();
                        panzoomRef.current.center();
                    }
                    setIsTransitioning(false);
                }, 150);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () =>
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [isFullscreen]);

    useEffect(() => {
        if (
            (currentChartRef.current === chart &&
                currentThemeRef.current === resolvedTheme) ||
            !containerRef.current
        ) {
            return;
        }

        const container = containerRef.current;
        currentChartRef.current = chart;
        currentThemeRef.current = resolvedTheme;
        setIsLoading(true);

        async function renderChart() {
            const { default: mermaid } = await import('mermaid');

            try {
                // configure mermaid
                mermaid.initialize({
                    startOnLoad: false,
                    securityLevel: 'loose',
                    fontFamily: 'inherit',
                    themeCSS: '',
                    theme: resolvedTheme === 'dark' ? 'dark' : 'default',
                });

                const { svg: renderedSvg, bindFunctions } = await mermaid.render(
                    id,
                    chart.replaceAll('\\n', '\n')
                );

                bindFunctions?.(container);
                setSvg(renderedSvg);

                // Set the rendered SVG directly to the container
                container.innerHTML = renderedSvg;

                // Configure the SVG for proper display
                const svgElement = container.querySelector('svg');
                if (svgElement) {
                    // Remove any existing width/height attributes to prevent conflicts
                    svgElement.removeAttribute('width');
                    svgElement.removeAttribute('height');

                    // Make SVG fill the entire container
                    svgElement.style.width = '100%';
                    svgElement.style.height = '100%';
                    svgElement.style.display = 'block';
                    svgElement.style.cursor = 'grab';
                    svgElement.style.minWidth = '100%';
                    svgElement.style.minHeight = '100%';

                    // Ensure proper aspect ratio preservation
                    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

                    // Add touch-action for better mobile experience
                    svgElement.style.touchAction = 'none';
                }

                setIsLoading(false);
            } catch (error) {
                // biome-ignore lint/suspicious/noConsole: mermaid error tracking
                console.error('Error while rendering mermaid', error);
                setIsLoading(false);
            }
        }

        // biome-ignore lint/complexity/noVoid: renderChart needs to be called
        void renderChart();
    }, [chart, id, resolvedTheme]);

    // Helper functions for touch handling
    const getTouchDistance = useCallback((touches: TouchList): number => {
        if (touches.length < 2) return 0;
        const touch1 = touches[0];
        const touch2 = touches[1];
        return Math.sqrt(
            (touch2.clientX - touch1.clientX) ** 2 +
            (touch2.clientY - touch1.clientY) ** 2
        );
    }, []);

    const getTouchCenter = useCallback((touches: TouchList): TouchPoint => {
        if (touches.length === 1) {
            return { x: touches[0].clientX, y: touches[0].clientY };
        }
        const touch1 = touches[0];
        const touch2 = touches[1];
        return {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2,
        };
    }, []);

    // Touch event handlers
    const createTouchHandlers = useCallback(
        (instance: SvgPanZoomInstance) => {
            let initialDistance = 0;
            let initialScale = 1;
            let lastTouchCenter = { x: 0, y: 0 };

            const handleTouchStart = (evt: TouchEvent) => {
                evt.preventDefault();

                if (evt.touches.length === 2) {
                    // Two finger touch - prepare for pinch zoom
                    initialDistance = getTouchDistance(evt.touches);
                    initialScale = instance.getZoom();
                    lastTouchCenter = getTouchCenter(evt.touches);
                } else if (evt.touches.length === 1) {
                    // Single finger touch - prepare for pan
                    lastTouchCenter = getTouchCenter(evt.touches);
                }
            };

            const handleTouchMove = (evt: TouchEvent) => {
                evt.preventDefault();

                if (evt.touches.length === 2) {
                    // Two finger pinch zoom
                    const currentDistance = getTouchDistance(evt.touches);
                    const currentCenter = getTouchCenter(evt.touches);

                    if (initialDistance > 0) {
                        const scale = (currentDistance / initialDistance) * initialScale;
                        const clampedScale = Math.max(0.1, Math.min(10, scale));
                        instance.zoom(clampedScale);

                        // Pan to keep zoom centered on touch center
                        const panDelta = {
                            x: currentCenter.x - lastTouchCenter.x,
                            y: currentCenter.y - lastTouchCenter.y,
                        };

                        const currentPan = instance.getPan();
                        instance.pan({
                            x: currentPan.x + panDelta.x,
                            y: currentPan.y + panDelta.y,
                        });
                    }
                } else if (evt.touches.length === 1) {
                    // Single finger pan
                    const currentCenter = getTouchCenter(evt.touches);
                    const panDelta = {
                        x: currentCenter.x - lastTouchCenter.x,
                        y: currentCenter.y - lastTouchCenter.y,
                    };

                    const currentPan = instance.getPan();
                    instance.pan({
                        x: currentPan.x + panDelta.x,
                        y: currentPan.y + panDelta.y,
                    });

                    lastTouchCenter = currentCenter;
                }
            };

            const handleTouchEnd = (evt: TouchEvent) => {
                evt.preventDefault();
                initialDistance = 0;
            };

            return {
                handleTouchStart,
                handleTouchMove,
                handleTouchEnd,
            };
        },
        [getTouchDistance, getTouchCenter]
    );

    // Add zoom functionality after SVG is rendered
    useEffect(() => {
        if (!(svg && containerRef.current) || isLoading) {
            return;
        }

        const container = containerRef.current;

        // Wait for the SVG to be rendered in the DOM
        const timer = setTimeout(async () => {
            const svgElement = container.querySelector('svg');
            if (!svgElement) {
                return;
            }

            // Clean up existing zoom instance
            if (panzoomRef.current) {
                panzoomRef.current.destroy();
                panzoomRef.current = null;
            }

            // Initialize svg-pan-zoom
            try {
                const panzoom = (await import('svg-pan-zoom')).default;

                const pz = panzoom(svgElement, {
                    center: true,
                    controlIconsEnabled: false,
                    fit: true,
                    zoomScaleSensitivity: 0.3,
                    minZoom: 0.1,
                    maxZoom: 10,
                    // Enhanced mobile touch support
                    preventMouseEventsDefault: true,
                    // Enable touch events for mobile pinch-to-zoom
                    beforePan() {
                        return true;
                    },
                    beforeZoom() {
                        return true;
                    },
                    // Custom event handlers for better touch support
                    customEventsHandler: {
                        // Handle touch events
                        haltEventListeners: [
                            'touchstart',
                            'touchend',
                            'touchmove',
                            'touchleave',
                            'touchcancel',
                        ],
                        // Init custom events handler
                        init: (options: CustomEventHandlerOptions) => {
                            const { instance, svgElement: svgEl } = options;
                            const touchHandlers = createTouchHandlers(instance);

                            // Add touch event listeners
                            svgEl.addEventListener(
                                'touchstart',
                                touchHandlers.handleTouchStart,
                                { passive: false }
                            );
                            svgEl.addEventListener(
                                'touchmove',
                                touchHandlers.handleTouchMove,
                                { passive: false }
                            );
                            svgEl.addEventListener('touchend', touchHandlers.handleTouchEnd, {
                                passive: false,
                            });
                            svgEl.addEventListener(
                                'touchcancel',
                                touchHandlers.handleTouchEnd,
                                { passive: false }
                            );

                            return {
                                destroy: () => {
                                    svgEl.removeEventListener(
                                        'touchstart',
                                        touchHandlers.handleTouchStart
                                    );
                                    svgEl.removeEventListener(
                                        'touchmove',
                                        touchHandlers.handleTouchMove
                                    );
                                    svgEl.removeEventListener(
                                        'touchend',
                                        touchHandlers.handleTouchEnd
                                    );
                                    svgEl.removeEventListener(
                                        'touchcancel',
                                        touchHandlers.handleTouchEnd
                                    );
                                },
                            };
                        },
                        destroy: (options: { destroy?: () => void }) => {
                            options.destroy?.();
                        },
                    },
                });

                // Force initial fit and center with proper timing
                setTimeout(() => {
                    pz.resize();
                    // biome-ignore lint/suspicious/noFocusedTests: legitimate svg-pan-zoom API call
                    pz.fit();
                    pz.center();
                }, 50);

                panzoomRef.current = pz;
            } catch (error) {
                // biome-ignore lint/suspicious/noConsole: svg-pan-zoom error tracking
                console.error('Error initializing svg-pan-zoom:', error);
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            if (panzoomRef.current) {
                panzoomRef.current.destroy();
                panzoomRef.current = null;
            }
        };
    }, [svg, isLoading, createTouchHandlers]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (panzoomRef.current) {
                panzoomRef.current.destroy();
                panzoomRef.current = null;
            }
        };
    }, []);

    const handleReset = () => {
        if (!panzoomRef.current) {
            return;
        }

        panzoomRef.current.resize();
        // biome-ignore lint/suspicious/noFocusedTests: legitimate svg-pan-zoom API call
        panzoomRef.current.fit();
        panzoomRef.current.center();
    };

    const handleFullscreen = async () => {
        if (!containerRef.current) {
            return;
        }

        try {
            setIsTransitioning(true);
            if (isFullscreen) {
                await document.exitFullscreen();
            } else {
                await containerRef.current.requestFullscreen();
            }
        } catch (error) {
            // biome-ignore lint/suspicious/noConsole: fullscreen error tracking
            console.error('Error toggling fullscreen:', error);
            setIsTransitioning(false);
        }
    };

    const controlItems = [
        {
            label: <ZoomIn className="size-4" />,
            value: 'zoomIn',
            onClick: () => {
                if (!panzoomRef.current) {
                    return;
                }
                panzoomRef.current.zoomIn();
            },
        },
        {
            label: <RotateCcw className="size-4" />,
            value: 'reset',
            onClick: handleReset,
        },
        {
            label: <ZoomOut className="size-4" />,
            value: 'zoomOut',
            onClick: () => {
                if (!panzoomRef.current) {
                    return;
                }
                panzoomRef.current.zoomOut();
            },
        },
        {
            label: isFullscreen ? (
                <Minimize className="size-4" />
            ) : (
                <Maximize className="size-4" />
            ),
            value: 'fullscreen',
            onClick: handleFullscreen,
            variant: (isFullscreen ? 'default' : 'outline') as 'default' | 'outline',
        },
    ];

    return (
        <div
            className={`relative w-full overflow-hidden rounded-lg border transition-all duration-150 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-background' : ''
                }`}
            style={{
                backgroundColor: 'var(--color-secondary)',
                borderColor: 'var(--color-border)',
                minHeight: isFullscreen ? '100vh' : '400px',
                height: isFullscreen ? '100vh' : '500px',
            }}
        >
            {/* Loading overlay */}
            {(isLoading || isTransitioning) && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <div className="size-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                        {isLoading ? 'Loading diagram...' : 'Adjusting view...'}
                    </div>
                </div>
            )}

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-[60]">
                <ButtonGroup
                    className={`border shadow-lg backdrop-blur-sm transition-all duration-150 ${isFullscreen
                            ? 'border-gray-300 bg-white/90 dark:border-gray-600 dark:bg-gray-800/90'
                            : 'border-border/50 bg-background/90'
                        }`}
                    items={controlItems}
                    orientation="vertical"
                    size="default"
                    variant="ghost"
                />
            </div>

            {/* Mermaid Container */}
            <div
                className={`mermaid-container h-full w-full transition-opacity duration-150 ${isLoading || isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
                ref={containerRef}
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    touchAction: 'none', // Prevent default touch behaviors
                }}
            />
        </div>
    );
}
