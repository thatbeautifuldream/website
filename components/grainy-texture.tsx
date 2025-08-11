export function GrainyTexture() {
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
                <filter id="grainTileFilter" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse">
                    <feTurbulence
                        type="turbulence"
                        baseFrequency="0.82"
                        numOctaves="1"
                        seed="42"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                    <feComponentTransfer>
                        <feFuncA type="discrete" tableValues="0 .01 .02 .03 .04 .05" />
                    </feComponentTransfer>
                </filter>
                <pattern id="grainPattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <rect width="32" height="32" filter="url(#grainTileFilter)" />
                </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grainPattern)" opacity=".02" />
        </svg>
    );
}


