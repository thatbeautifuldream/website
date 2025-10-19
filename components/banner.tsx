"use client";

import { Dithering } from "@paper-design/shaders-react";
import { useState } from "react";

const BANNER_VARIANTS = [
  {
    colorBack: "#00000000",
    colorFront: "#FFFFFF",
    speed: 1,
    shape: "warp" as const,
    type: "4x4" as const,
    scale: 1,
    frame: 241887.69999997615,
    className: "bg-[#2445CA] rounded-lg w-full aspect-[3/1]",
  },
  {
    colorBack: "#00000000",
    colorFront: "#FFFFFF",
    speed: 1.3,
    shape: "simplex" as const,
    type: "8x8" as const,
    scale: 1.1,
    frame: 241887.69999997615,
    className: "bg-[#CA2445] rounded-lg w-full aspect-[3/1]",
  },
  {
    colorBack: "#00000000",
    colorFront: "#FFFFFF",
    speed: 0.8,
    shape: "dots" as const,
    type: "4x4" as const,
    scale: 0.9,
    frame: 241887.69999997615,
    className: "bg-[#45CA24] rounded-lg w-full aspect-[3/1]",
  },
  {
    colorBack: "#00000000",
    colorFront: "#FFFFFF",
    speed: 1.2,
    shape: "wave" as const,
    type: "2x2" as const,
    scale: 1.05,
    frame: 241887.69999997615,
    className: "bg-[#CA8F24] rounded-lg w-full aspect-[3/1]",
  },
  {
    colorBack: "#00000000",
    colorFront: "#FFFFFF",
    speed: 0.9,
    shape: "ripple" as const,
    type: "8x8" as const,
    scale: 1,
    frame: 241887.69999997615,
    className: "bg-[#8F24CA] rounded-lg w-full aspect-[3/1]",
  },
  {
    colorBack: "#00000000",
    colorFront: "#FFFFFF",
    speed: 1.4,
    shape: "swirl" as const,
    type: "4x4" as const,
    scale: 1.15,
    frame: 241887.69999997615,
    className: "bg-[#24CAA5] rounded-lg w-full aspect-[3/1]",
  },
  {
    colorBack: "#00000000",
    colorFront: "#FFFFFF",
    speed: 1.1,
    shape: "sphere" as const,
    type: "2x2" as const,
    scale: 0.95,
    frame: 241887.69999997615,
    className: "bg-[#A524CA] rounded-lg w-full aspect-[3/1]",
  },
];

export function Banner() {
  const [variantIndex, setVariantIndex] = useState(0);

  const handleClick = () => {
    setVariantIndex((prev) => (prev + 1) % BANNER_VARIANTS.length);
  };

  const currentVariant = BANNER_VARIANTS[variantIndex];

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
        colorBack={currentVariant.colorBack}
        colorFront={currentVariant.colorFront}
        speed={currentVariant.speed}
        shape={currentVariant.shape}
        type={currentVariant.type}
        scale={currentVariant.scale}
        frame={currentVariant.frame}
        className={currentVariant.className}
      />
    </button>
  );
}
