export default function NotFoundCraneIllustration() {
  return (
    <svg
      viewBox="0 0 860 620"
      className="h-[320px] w-full md:h-[460px]"
      role="img"
      aria-label="Illustration of a KRANTAS crane truck fixing a 404 website error"
    >
      <defs>
        <linearGradient id="nf-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f6f1e6" />
          <stop offset="100%" stopColor="#e8dfcf" />
        </linearGradient>
        <linearGradient id="nf-ground" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d8c7a3" />
          <stop offset="100%" stopColor="#c5a059" />
        </linearGradient>
        <linearGradient id="nf-arm" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fdc15e" />
          <stop offset="100%" stopColor="#c99632" />
        </linearGradient>
        <linearGradient id="nf-panel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#264f88" />
          <stop offset="100%" stopColor="#19365f" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="860" height="620" fill="url(#nf-bg)" />
      <circle cx="690" cy="120" r="88" fill="#244d85" opacity="0.08" />
      <circle cx="170" cy="110" r="62" fill="#c5a059" opacity="0.12" />
      <rect x="0" y="500" width="860" height="120" fill="url(#nf-ground)" />
      <rect x="0" y="490" width="860" height="12" fill="#0B0C0E" opacity="0.12" />

      <rect x="88" y="520" width="520" height="10" rx="5" fill="#0B0C0E" opacity="0.12" />

      <g transform="translate(115 345)">
        <rect x="0" y="84" width="286" height="68" rx="20" fill="#244d85" />
        <rect x="34" y="36" width="108" height="62" rx="18" fill="#244d85" />
        <rect x="48" y="46" width="78" height="30" rx="10" fill="#dbe7f7" />
        <rect x="152" y="64" width="84" height="18" rx="9" fill="#fdc15e" />
        <rect x="186" y="26" width="24" height="66" rx="12" fill="#1a1f29" />
        <rect x="205" y="-92" width="18" height="164" rx="9" fill="url(#nf-arm)" />
        <rect x="213" y="-148" width="150" height="18" rx="9" transform="rotate(-26 213 -148)" fill="url(#nf-arm)" />
        <rect x="340" y="-228" width="112" height="14" rx="7" transform="rotate(28 340 -228)" fill="url(#nf-arm)" />
        <line x1="441" y1="-170" x2="474" y2="-24" stroke="#1a1f29" strokeWidth="4" />
        <line x1="454" y1="-160" x2="474" y2="-24" stroke="#1a1f29" strokeWidth="4" />
        <rect x="462" y="-22" width="24" height="32" rx="8" fill="#1a1f29" />
        <rect x="458" y="4" width="32" height="12" rx="6" fill="#fdc15e" />

        <circle cx="74" cy="164" r="34" fill="#1a1f29" />
        <circle cx="74" cy="164" r="15" fill="#d6d9de" />
        <circle cx="230" cy="164" r="34" fill="#1a1f29" />
        <circle cx="230" cy="164" r="15" fill="#d6d9de" />
        <circle cx="304" cy="164" r="28" fill="#1a1f29" />
        <circle cx="304" cy="164" r="12" fill="#d6d9de" />

        <rect x="10" y="100" width="70" height="16" rx="8" fill="#0B0C0E" opacity="0.26" />
        <text x="38" y="126" fontSize="20" fontWeight="700" fill="#fdc15e" fontFamily="system-ui, sans-serif">
          KRANTAS
        </text>
      </g>

      <g transform="translate(505 118) rotate(-7)">
        <rect x="0" y="0" width="220" height="166" rx="26" fill="url(#nf-panel)" />
        <rect x="14" y="14" width="192" height="138" rx="18" fill="#0f2039" opacity="0.45" />
        <text x="42" y="98" fontSize="78" fontWeight="800" fill="#fdc15e" fontFamily="system-ui, sans-serif">
          404
        </text>
        <rect x="44" y="114" width="126" height="12" rx="6" fill="#ffffff" opacity="0.22" />
      </g>

      <g transform="translate(650 352)">
        <rect x="0" y="0" width="116" height="66" rx="18" fill="#ffffff" opacity="0.96" />
        <path d="M22 36h26l12-14 14 30 10-18h14" fill="none" stroke="#244d85" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="36" r="4" fill="#fdc15e" />
        <circle cx="84" cy="34" r="4" fill="#fdc15e" />
      </g>

      <g opacity="0.9">
        <rect x="564" y="438" width="64" height="18" rx="9" fill="#0B0C0E" opacity="0.12" />
        <rect x="640" y="434" width="48" height="18" rx="9" fill="#0B0C0E" opacity="0.08" />
      </g>

      <g transform="translate(508 425)">
        <rect x="0" y="0" width="184" height="52" rx="18" fill="#0B0C0E" opacity="0.92" />
        <text x="22" y="22" fontSize="11" fontWeight="700" fill="#fdc15e" letterSpacing="2" fontFamily="system-ui, sans-serif">
          SYSTEM RECOVERY
        </text>
        <text x="22" y="39" fontSize="16" fontWeight="600" fill="#ffffff" fontFamily="system-ui, sans-serif">
          Crane unit repairing the route.
        </text>
      </g>
    </svg>
  );
}
