export function JeebtiBankLogo({ className, size = 96 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 220 260"
      width={size}
      height={(size * 260) / 220}
      className={className}
      role="img"
      aria-label="Jeebti Bank"
    >
      <defs>
        <linearGradient id="jbLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0cf7a" />
          <stop offset="1" stopColor="#c9973c" />
        </linearGradient>
        <linearGradient id="jbNavy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16296b" />
          <stop offset="1" stopColor="#0a1638" />
        </linearGradient>
      </defs>

      {/* Gold leaf accent */}
      <path
        d="M78 18C78 18 40 46 40 92C40 118 58 132 58 132C58 132 44 100 62 66C74 43 78 18 78 18Z"
        fill="url(#jbLeaf)"
      />
      <path
        d="M78 18C78 18 58 52 58 90C58 108 66 120 66 120C66 120 56 96 66 68C73 49 78 18 78 18Z"
        fill="#0a1638"
        opacity="0.12"
      />

      {/* Navy "J" */}
      <path
        d="M138 20H172V130C172 168 148 190 112 190C90 190 72 182 58 168L80 142C89 151 99 156 111 156C126 156 138 147 138 128V20Z"
        fill="url(#jbNavy)"
      />
      <path d="M96 78H130V128C130 138 126 144 118 144C112 144 107 141 103 137L96 145V78Z" fill="#16296b" />

      {/* Wordmark */}
      <text
        x="110"
        y="222"
        textAnchor="middle"
        fontFamily="var(--font-sans, sans-serif)"
        fontWeight="800"
        fontSize="40"
        fill="#0f1f4d"
      >
        Jeebti
      </text>
      <circle cx="177" cy="196" r="4.5" fill="#c9973c" />

      <line x1="58" y1="240" x2="90" y2="240" stroke="#c9973c" strokeWidth="1.5" />
      <text
        x="110"
        y="245"
        textAnchor="middle"
        fontFamily="var(--font-sans, sans-serif)"
        fontWeight="600"
        fontSize="15"
        letterSpacing="4"
        fill="#c9973c"
      >
        BANK
      </text>
      <line x1="130" y1="240" x2="162" y2="240" stroke="#c9973c" strokeWidth="1.5" />
    </svg>
  );
}
