import { cn } from "@/lib/utils";

/**
 * Compact square brand mark — navy rounded square with a gold-accented "J",
 * derived from the full Jeebti Bank logo (see auth/jeebti-bank-logo.tsx) for
 * use anywhere the full wordmark lockup doesn't fit: sidebars, favicons, the
 * PWA icon, small avatar-style placements.
 */
export function JeebtiMark({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Jeebti"
    >
      <defs>
        <linearGradient id="jmNavy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16296b" />
          <stop offset="1" stopColor="#0a1638" />
        </linearGradient>
        <linearGradient id="jmGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0cf7a" />
          <stop offset="1" stopColor="#c9973c" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#jmNavy)" />
      <path
        d="M13.5 9h5v11.4c0 3.3-2 5.1-5 5.1-2 0-3.6-.8-4.7-2.1l2.3-2.4c.6.7 1.3 1.1 2.1 1.1 1.1 0 1.8-.6 1.8-2V9Z"
        fill="white"
      />
      <circle cx="22" cy="9.5" r="2.1" fill="url(#jmGold)" />
    </svg>
  );
}
