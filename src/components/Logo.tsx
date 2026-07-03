import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "w-12 h-12", showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        className={className}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="axioscript-logo-svg"
      >
        {/* Top Sphere with horizontal stripes */}
        <defs>
          <linearGradient id="sphereGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#d1d5db" />
            <stop offset="70%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          <clipPath id="sphereClip">
            <circle cx="200" cy="50" r="22" />
          </clipPath>
        </defs>
        
        {/* Spherical Gradient Accent */}
        <g clipPath="url(#sphereClip)">
          <rect x="170" y="20" width="60" height="60" fill="url(#sphereGrad)" />
          {/* Subtle horizontal digital lines */}
          <line x1="170" y1="35" x2="230" y2="35" stroke="#070a13" strokeWidth="2" />
          <line x1="170" y1="42" x2="230" y2="42" stroke="#070a13" strokeWidth="2" />
          <line x1="170" y1="49" x2="230" y2="49" stroke="#070a13" strokeWidth="2" />
          <line x1="170" y1="56" x2="230" y2="56" stroke="#070a13" strokeWidth="2" />
          <line x1="170" y1="63" x2="230" y2="63" stroke="#070a13" strokeWidth="2" />
        </g>
        
        {/* Glow effect backings */}
        <circle cx="200" cy="200" r="120" fill="#22d3ee" opacity="0.03" filter="blur(40px)" />
        <circle cx="200" cy="300" r="50" fill="#a78bfa" opacity="0.04" filter="blur(30px)" />

        {/* Upper Triangle Peak (The 'A' frames) */}
        <path
          d="M200 80 L260 210 L230 210 L200 130 L170 210 L140 210 Z"
          fill="#ffffff"
          stroke="#070a13"
          strokeWidth="1"
        />
        
        {/* Shadow panels for 3D depth inside the peak */}
        <path
          d="M200 80 L200 130 L170 210 L140 210 Z"
          fill="#e5e7eb"
          opacity="0.8"
        />

        {/* Supporting Chevron Base (Bottom part of the 'A') */}
        <path
          d="M135 270 L170 215 L230 215 L265 270 L215 270 L200 240 L185 270 Z"
          fill="#ffffff"
          stroke="#070a13"
          strokeWidth="1"
        />
        {/* Chevron left half shaded for 3D depth */}
        <path
          d="M135 270 L170 215 L200 215 L200 240 L185 270 Z"
          fill="#d1d5db"
          opacity="0.9"
        />

        {/* Extra Bottom Wings/Accents (As visible in the image) */}
        <path
          d="M120 310 L160 250 L185 250 L160 310 Z"
          fill="#ffffff"
        />
        <path
          d="M120 310 L145 280 L160 310 Z"
          fill="#9ca3af"
        />
        <path
          d="M280 310 L240 250 L215 250 L240 310 Z"
          fill="#ffffff"
        />
        <path
          d="M280 310 L255 280 L240 310 Z"
          fill="#e5e7eb"
        />

        {/* Central Rectangular BLOCK: "Script" banner */}
        <rect
          x="110"
          y="190"
          width="180"
          height="55"
          fill="#1e293b"
          stroke="#ffffff"
          strokeWidth="4"
          rx="4"
        />
        
        {/* Stylized "Script" stencil typography centered in the banner */}
        <text
          x="200"
          y="228"
          fill="#ffffff"
          fontSize="36"
          fontWeight="900"
          fontFamily="Impact, Arial Black, sans-serif"
          textAnchor="middle"
          letterSpacing="2"
        >
          Script
        </text>
        
        {/* Tech line overlays on banner */}
        <line x1="114" y1="195" x2="114" y2="240" stroke="#22d3ee" strokeWidth="2" />
        <line x1="286" y1="195" x2="286" y2="240" stroke="#22d3ee" strokeWidth="2" />

        {/* Bottom Gear Icon */}
        <g transform="translate(200, 300)">
          {/* Outer circle of gear */}
          <circle cx="0" cy="0" r="30" fill="#111827" stroke="#ffffff" strokeWidth="4" />
          
          {/* Gear Teeth */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect
              key={angle}
              x="-6"
              y="-38"
              width="12"
              height="12"
              fill="#ffffff"
              rx="2"
              transform={`rotate(${angle})`}
            />
          ))}

          {/* Inner circle of gear */}
          <circle cx="0" cy="0" r="22" fill="#070a13" />

          {/* Code symbol '</>' in the gear core */}
          <text
            x="0"
            y="5"
            fill="#22d3ee"
            fontSize="15"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
          >
            &lt;/&gt;
          </text>
        </g>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="font-display font-bold text-2xl tracking-widest text-white">
            AXIO<span className="text-cyber-cyan text-glow-cyan">SCRIPT</span>
          </span>
          <span className="text-[9px] font-mono tracking-[0.25em] text-slate-400 uppercase leading-none">
            Digital Architecture
          </span>
        </div>
      )}
    </div>
  );
}
