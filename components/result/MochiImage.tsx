"use client";

import Image from "next/image";
import { useState } from "react";

interface MochiImageProps {
  src: string;
  name: string;
  emoji: string;
  size?: "small" | "large";
}

export function MochiImage({
  src,
  name,
  emoji,
  size = "large",
}: MochiImageProps) {
  const [imageError, setImageError] = useState(false);

  const dimensions =
    size === "large"
      ? "h-56 w-56 sm:h-72 sm:w-72"
      : "h-24 w-24 sm:h-28 sm:w-28";

  return (
    <div
      className={`
        relative flex shrink-0 items-center justify-center
        overflow-hidden rounded-full bg-card/70
        ${dimensions}
      `}
    >
      {!imageError ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={size === "large" ? "288px" : "112px"}
          className="object-contain p-3"
          onError={() => setImageError(true)}
        />
      ) : (
        <span
          className={
            size === "large"
              ? "text-8xl sm:text-9xl"
              : "text-5xl"
          }
          role="img"
          aria-label={name}
        >
          {emoji}
        </span>
      )}
    </div>
  );
}