"use client";

import { Dithering } from "@paper-design/shaders-react";
import { useState } from "react";

const STATIC_CONFIG = {
  colorBack: "#00000000",
  colorFront: "#FFFFFF",
  frame: 241887.69999997615,
  baseClassName: "rounded-lg w-full aspect-[3/1]",
};

const BG_COLORS = [
  "#2445CA",
  "#CA2445",
  "#45CA24",
  "#CA8F24",
  "#8F24CA",
  "#24CAA5",
  "#A524CA",
];

const CYCLING_VARIANTS = [
  { speed: 1, shape: "warp" as const, type: "4x4" as const, scale: 1 },
  { speed: 1.3, shape: "simplex" as const, type: "8x8" as const, scale: 1.1 },
  { speed: 0.8, shape: "dots" as const, type: "4x4" as const, scale: 0.9 },
  { speed: 1.2, shape: "wave" as const, type: "2x2" as const, scale: 1.05 },
  { speed: 0.9, shape: "ripple" as const, type: "8x8" as const, scale: 1 },
  { speed: 1.4, shape: "swirl" as const, type: "4x4" as const, scale: 1.15 },
  { speed: 1.1, shape: "sphere" as const, type: "2x2" as const, scale: 0.95 },
];

export function Banner() {
  const [variantIndex, setVariantIndex] = useState(0);
  const [colorStartIndex, setColorStartIndex] = useState(0);

  const handleClick = () => {
    setVariantIndex((prev) => {
      const nextIndex = (prev + 1) % CYCLING_VARIANTS.length;
      // After completing a full cycle, shift the color start position
      if (nextIndex === 0) {
        setColorStartIndex((prevStart) => (prevStart + 1) % BG_COLORS.length);
      }
      return nextIndex;
    });
  };

  const currentVariant = CYCLING_VARIANTS[variantIndex];
  const currentColorIndex = (colorStartIndex + variantIndex) % BG_COLORS.length;
  const currentBgColor = BG_COLORS[currentColorIndex];

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className="cursor-pointer rounded-lg"
      aria-label="Cycle through banner variants"
    >
      <Dithering
        colorBack={STATIC_CONFIG.colorBack}
        colorFront={STATIC_CONFIG.colorFront}
        speed={currentVariant.speed}
        shape={currentVariant.shape}
        type={currentVariant.type}
        scale={currentVariant.scale}
        frame={STATIC_CONFIG.frame}
        className={STATIC_CONFIG.baseClassName}
        style={{ backgroundColor: currentBgColor }}
      />
    </button>
  );
}
