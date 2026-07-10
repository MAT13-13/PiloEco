export default function TreeBranch() {
  return (
    <svg
      viewBox="0 0 900 360"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="branchGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3a1f0f" />
          <stop offset="45%" stopColor="#7a451d" />
          <stop offset="100%" stopColor="#2f6b28" />
        </linearGradient>

        <filter id="branchShadow">
          <feDropShadow dx="0" dy="14" stdDeviation="10" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Branche principale */}
      <path
        d="M80 285 C210 260, 300 210, 430 185 C560 160, 650 110, 800 75"
        fill="none"
        stroke="url(#branchGradient)"
        strokeWidth="22"
        strokeLinecap="round"
        filter="url(#branchShadow)"
      />

      {/* Reflet bois */}
      <path
        d="M105 276 C230 250, 320 205, 440 180 C560 155, 650 108, 780 82"
        fill="none"
        stroke="#d8a05a"
        strokeOpacity="0.35"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Petites branches */}
      <path
        d="M330 215 C310 165, 275 135, 235 105"
        fill="none"
        stroke="url(#branchGradient)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M505 170 C500 120, 470 80, 430 45"
        fill="none"
        stroke="url(#branchGradient)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M610 135 C650 170, 700 190, 760 205"
        fill="none"
        stroke="url(#branchGradient)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Feuilles provisoires */}
      <text x="220" y="120" fontSize="54">🍃</text>
      <text x="420" y="60" fontSize="54">🍃</text>
      <text x="735" y="210" fontSize="54">🍃</text>
      <text x="570" y="125" fontSize="48">🍃</text>
    </svg>
  );
}