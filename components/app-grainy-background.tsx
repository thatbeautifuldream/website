export function AppGrainyBackground() {
    return (
        <svg
            viewBox="0 0 250 250"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-[100dvw] select-none"
            aria-hidden="true"
        >
            <title>Background noise texture</title>
            <defs>
                <filter id="grainTileFilter" x="0" y="0" width="124" height="124" filterUnits="userSpaceOnUse">
                    <feTurbulence type="fractalNoise" baseFrequency="5" numOctaves="25" seed="3" stitchTiles="stitch" />
                </filter>
                <pattern id="grainPattern" x="0" y="0" width="124" height="124" patternUnits="userSpaceOnUse">
                    <rect width="124" height="124" filter="url(#grainTileFilter)" />
                </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grainPattern)" opacity=".05" />
        </svg>
    );
}

