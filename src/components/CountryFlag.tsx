import React from "react";

// Drapeaux en SVG (rendus identiquement sur toutes les plateformes, contrairement
// aux emojis drapeaux que Windows affiche en lettres « FR / BE / CH »).

interface CountryFlagProps {
  iso: string;
  className?: string;
}

export function CountryFlag({ iso, className = "" }: CountryFlagProps) {
  return (
    <span
      className={`inline-block rounded-[3px] overflow-hidden shrink-0 ring-1 ring-white/15 ${className}`}
      style={{ width: 20, height: 14, lineHeight: 0 }}
      aria-hidden="true"
    >
      {iso === "FR" && (
        <svg viewBox="0 0 3 2" width="20" height="14" preserveAspectRatio="none">
          <rect width="1" height="2" x="0" fill="#0055A4" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#EF4135" />
        </svg>
      )}
      {iso === "BE" && (
        <svg viewBox="0 0 3 2" width="20" height="14" preserveAspectRatio="none">
          <rect width="1" height="2" x="0" fill="#000000" />
          <rect width="1" height="2" x="1" fill="#FDDA24" />
          <rect width="1" height="2" x="2" fill="#EF3340" />
        </svg>
      )}
      {iso === "CH" && (
        <svg viewBox="0 0 20 14" width="20" height="14" preserveAspectRatio="none">
          <rect width="20" height="14" fill="#D52B1E" />
          <rect x="8.5" y="3" width="3" height="8" fill="#FFFFFF" />
          <rect x="6" y="5.5" width="8" height="3" fill="#FFFFFF" />
        </svg>
      )}
    </span>
  );
}
