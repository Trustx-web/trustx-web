import React from 'react';

export const MeshBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden mesh-canvas">
      {/* Subtle architectural grid */}
      <div className="absolute inset-0 mesh-grid-lines opacity-70" />

      {/* Precision SVG connectivity mesh lines symbolizing cross-merchant signal intelligence */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.42]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mesh-blue-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.24" />
          </linearGradient>
          <linearGradient id="mesh-green-blue" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.16" />
          </linearGradient>
        </defs>

        {/* Primary connectivity triangulated mesh */}
        <g stroke="url(#mesh-blue-green)" strokeWidth="1" fill="none">
          <path d="M-40 160 L210 95 L430 240 L690 120 L980 230 L1240 110 L1490 210" />
          <path d="M-40 380 L190 290 L430 240 L610 410 L920 360 L1180 430 L1490 320" />
          <path d="M210 95 L190 290 L460 510 L610 410 L690 120" />
          <path d="M980 230 L920 360 L1120 600 L1180 430 L1240 110" />
          <path d="M430 240 L920 360" />
          <path d="M690 120 L1180 430" />
        </g>

        <g stroke="url(#mesh-green-blue)" strokeWidth="0.9" fill="none">
          <path d="M-20 620 L240 530 L460 510 L760 660 L1120 600 L1480 680" />
          <path d="M190 290 L240 530 L140 820 L480 790 L760 660 L1020 840 L1480 680" />
          <path d="M610 410 L760 660 L920 360" />
          <path d="M460 510 L480 790" />
        </g>

        {/* Mesh node intersections */}
        <g>
          <circle cx="210" cy="95" r="3" fill="#1D4ED8" fillOpacity="0.32" />
          <circle cx="430" cy="240" r="3.5" fill="#059669" fillOpacity="0.35" />
          <circle cx="690" cy="120" r="3" fill="#1D4ED8" fillOpacity="0.30" />
          <circle cx="980" cy="230" r="3.5" fill="#059669" fillOpacity="0.35" />
          <circle cx="1240" cy="110" r="3" fill="#1D4ED8" fillOpacity="0.28" />
          <circle cx="190" cy="290" r="3" fill="#059669" fillOpacity="0.30" />
          <circle cx="610" cy="410" r="4" fill="#1D4ED8" fillOpacity="0.32" />
          <circle cx="920" cy="360" r="3.5" fill="#059669" fillOpacity="0.34" />
          <circle cx="1180" cy="430" r="3" fill="#1D4ED8" fillOpacity="0.30" />
          <circle cx="240" cy="530" r="3" fill="#1D4ED8" fillOpacity="0.28" />
          <circle cx="460" cy="510" r="3.5" fill="#059669" fillOpacity="0.32" />
          <circle cx="760" cy="660" r="3.5" fill="#1D4ED8" fillOpacity="0.28" />
          <circle cx="1120" cy="600" r="3.5" fill="#059669" fillOpacity="0.34" />
        </g>
      </svg>
    </div>
  );
};
