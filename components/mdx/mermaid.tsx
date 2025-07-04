'use client';

import { useTheme } from 'next-themes';
import { useEffect, useId, useRef, useState } from 'react';
import { SvgToolbelt } from 'svg-toolbelt';
import 'svg-toolbelt/dist/svg-toolbelt.css';

export function Mermaid({ chart }: { chart: string }) {
    const id = useId();
    const [svg, setSvg] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const currentChartRef = useRef<string>(null);
    const currentThemeRef = useRef<string | undefined>(undefined);
    const svgToolbeltRef = useRef<SvgToolbelt | null>(null);
    const { resolvedTheme } = useTheme();

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
                    themeCSS: 'margin: 1.5rem auto 0;',
                    theme: resolvedTheme === 'dark' ? 'dark' : 'default',
                });

                const { svg: renderedSvg, bindFunctions } = await mermaid.render(
                    id,
                    chart.replaceAll('\\n', '\n')
                );

                bindFunctions?.(container);
                setSvg(renderedSvg);
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
        const timer = setTimeout(() => {
            const svgElement = container.querySelector('svg');
            if (!svgElement) {
                return;
            }

            // Clean up existing zoom instance
            if (svgToolbeltRef.current) {
                svgToolbeltRef.current.destroy();
                svgToolbeltRef.current = null;
            }

            // Initialize svg-toolbelt zoom
            try {
                const svgToolbelt = new SvgToolbelt(container, {
                    minScale: 0.1,
                    maxScale: 5,
                    controlsPosition: 'bottom-right',
                    enableKeyboard: true,
                    enableTouch: true,
                    zoomStep: 0.2,
                });

                svgToolbelt.init();
                svgToolbeltRef.current = svgToolbelt;
            } catch (error) {
                // biome-ignore lint/suspicious/noConsole: svg-toolbelt error tracking
                console.error('Error initializing svg-toolbelt zoom:', error);
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            if (svgToolbeltRef.current) {
                svgToolbeltRef.current.destroy();
                svgToolbeltRef.current = null;
            }
        };
    }, [svg]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (svgToolbeltRef.current) {
                svgToolbeltRef.current.destroy();
                svgToolbeltRef.current = null;
            }
        };
    }, []);

    return (
        <div
            className="mermaid-container w-full"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: mermaid is safe
            dangerouslySetInnerHTML={{ __html: svg }}
            ref={containerRef}
            style={{ minHeight: '400px' }}
        />
    );
}
