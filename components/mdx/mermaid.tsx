'use client';

import { Maximize, Minimize, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useId, useRef, useState } from 'react';
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

export function Mermaid({ chart }: { chart: string }) {
    const id = useId();
    const [svg, setSvg] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const currentChartRef = useRef<string>(null);
    const currentThemeRef = useRef<string | undefined>(undefined);
    const panzoomRef = useRef<SvgPanZoomInstance | null>(null);
    const { resolvedTheme } = useTheme();

    // Handle fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            // Resize and refit when fullscreen changes
            if (panzoomRef.current) {
                setTimeout(() => {
                    panzoomRef.current?.resize();
                    // biome-ignore lint/suspicious/noFocusedTests: legitimate svg-pan-zoom API call
                    panzoomRef.current?.fit();
                    panzoomRef.current?.center();
                }, 100);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () =>
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

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
                }
            } catch (error) {
                // biome-ignore lint/suspicious/noConsole: mermaid error tracking
                console.error('Error while rendering mermaid', error);
            }
        }

        // biome-ignore lint/complexity/noVoid: renderChart
        void renderChart();
    }, [chart, id, resolvedTheme]);

    // Add zoom functionality after SVG is rendered
    useEffect(() => {
        if (!(svg && containerRef.current)) {
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
                    // Ensure the entire container is draggable
                    preventMouseEventsDefault: true,
                });

                // Force initial fit and center to ensure proper sizing
                pz.resize();
                // biome-ignore lint/suspicious/noFocusedTests: legitimate svg-pan-zoom API call
                pz.fit();
                pz.center();

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
    }, [svg]);

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

        // Use the proper methods from svg-pan-zoom
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
            if (isFullscreen) {
                await document.exitFullscreen();
            } else {
                await containerRef.current.requestFullscreen();
            }
        } catch (error) {
            // biome-ignore lint/suspicious/noConsole: fullscreen error tracking
            console.error('Error toggling fullscreen:', error);
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
            className={`relative w-full overflow-hidden rounded-lg border ${isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-background' : ''}`}
            style={{
                backgroundColor: 'var(--color-secondary)',
                borderColor: 'var(--color-border)',
                minHeight: isFullscreen ? '100vh' : '400px',
                height: isFullscreen ? '100vh' : '500px',
            }}
        >
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-[60]">
                <ButtonGroup
                    className={`border shadow-lg backdrop-blur-sm ${isFullscreen
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
                className="mermaid-container h-full w-full"
                ref={containerRef}
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                }}
            />
        </div>
    );
}
