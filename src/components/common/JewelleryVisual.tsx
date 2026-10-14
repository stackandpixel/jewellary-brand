import React, { useState } from 'react';
import { JewelleryCategory, JewelleryStyle } from '../../types';

interface JewelleryVisualProps {
  category: JewelleryCategory;
  style?: JewelleryStyle;
  name: string;
  className?: string;
  imageSrc?: string;
  aspectRatio?: '1:1' | '16:9' | '3:4' | '4:5' | '4:3';
}

export const JewelleryVisual: React.FC<JewelleryVisualProps> = ({
  category,
  name,
  className = '',
  imageSrc,
  aspectRatio = '1:1',
}) => {
  const [imgError, setImgError] = useState(false);

  // Aspect ratio classes
  const aspectClass = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-[16/9]',
    '3:4': 'aspect-[3/4]',
    '4:5': 'aspect-[4/5]',
    '4:3': 'aspect-[4/3]',
  }[aspectRatio];

  // If valid image and hasn't errored
  if (imageSrc && !imgError && !imageSrc.startsWith('/images/products/')) {
    return (
      <div className={`relative overflow-hidden bg-[#0A1D14] ${aspectClass} ${className}`}>
        <img
          src={imageSrc}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
        />
      </div>
    );
  }

  // Domain-authentic luxury SVG artwork
  return (
    <div
      className={`relative overflow-hidden group select-none flex items-center justify-center transition-all duration-500 ${aspectClass} ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #173829 0%, #0C2117 55%, #07150E 100%)',
      }}
    >
      {/* Subtle velvet texture grid lines */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Warm ambient gold glow behind jewellery */}
      <div className="absolute w-48 h-48 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none transform -translate-y-4" />

      {/* Intricate Category Specific Gold Articulation */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-6 text-[#D4AF37] transition-transform duration-700 group-hover:scale-105">
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full max-w-[280px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="25%" stopColor="#E5C365" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="75%" stopColor="#9E7618" />
              <stop offset="100%" stopColor="#F5DF9E" />
            </linearGradient>

            <linearGradient id="rubyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E63946" />
              <stop offset="50%" stopColor="#8A1324" />
              <stop offset="100%" stopColor="#500713" />
            </linearGradient>

            <linearGradient id="emeraldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A9D8F" />
              <stop offset="100%" stopColor="#134E4A" />
            </linearGradient>

            <radialGradient id="pearlShine" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F0EBE1" />
              <stop offset="100%" stopColor="#C9BFA8" />
            </radialGradient>
          </defs>

          {/* Render category-specific artwork */}
          {category === 'necklaces' || category === 'bridal' ? (
            <g transform="translate(0, 10)">
              {/* Outer Choker Arch */}
              <path
                d="M 60 90 C 100 160 220 160 260 90"
                stroke="url(#goldSheen)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 75 110 C 110 185 210 185 245 110"
                stroke="url(#goldSheen)"
                strokeWidth="7"
                strokeDasharray="3 7"
              />
              <path
                d="M 90 135 C 120 205 200 205 230 135"
                stroke="url(#goldSheen)"
                strokeWidth="3"
              />

              {/* Central Grand Lakshmi / Temple Pendant */}
              <g transform="translate(160, 195)">
                <circle cx="0" cy="0" r="32" fill="#0C2117" stroke="url(#goldSheen)" strokeWidth="3" />
                <circle cx="0" cy="0" r="24" stroke="url(#goldSheen)" strokeWidth="1.5" strokeDasharray="2 3" />
                {/* Deity / Floral Motif */}
                <path
                  d="M 0 -16 C -6 -8 -10 -4 0 8 C 10 -4 6 -8 0 -16 Z"
                  fill="url(#goldSheen)"
                />
                <circle cx="0" cy="-2" r="4" fill="url(#rubyGlow)" />
                <circle cx="-10" cy="4" r="3" fill="url(#emeraldGlow)" />
                <circle cx="10" cy="4" r="3" fill="url(#emeraldGlow)" />

                {/* Hanging Pearl Droplets */}
                <g transform="translate(0, 32)">
                  <circle cx="0" cy="8" r="4.5" fill="url(#pearlShine)" />
                  <line x1="0" y1="0" x2="0" y2="8" stroke="url(#goldSheen)" strokeWidth="1.5" />

                  <circle cx="-14" cy="6" r="4" fill="url(#pearlShine)" />
                  <line x1="-14" y1="-2" x2="-14" y2="6" stroke="url(#goldSheen)" strokeWidth="1.5" />

                  <circle cx="14" cy="6" r="4" fill="url(#pearlShine)" />
                  <line x1="14" y1="-2" x2="14" y2="6" stroke="url(#goldSheen)" strokeWidth="1.5" />
                </g>
              </g>

              {/* Side Pendant Beads */}
              {[-50, -25, 25, 50].map((offset, i) => (
                <circle
                  key={i}
                  cx={160 + offset}
                  cy={150 + Math.abs(offset) * 0.4}
                  r="4"
                  fill="url(#goldSheen)"
                />
              ))}
            </g>
          ) : category === 'earrings' ? (
            <g transform="translate(0, 5)">
              {/* Left Jhumka */}
              <g transform="translate(100, 70)">
                {/* Stud Lotus */}
                <circle cx="0" cy="0" r="14" fill="#0C2117" stroke="url(#goldSheen)" strokeWidth="2" />
                <circle cx="0" cy="0" r="6" fill="url(#rubyGlow)" />
                {/* Connector wire */}
                <line x1="0" y1="14" x2="0" y2="28" stroke="url(#goldSheen)" strokeWidth="2" />
                {/* Jhumka Bell Dome */}
                <path
                  d="M -28 65 C -28 32 28 32 28 65 Z"
                  fill="url(#goldSheen)"
                  stroke="#9E7618"
                  strokeWidth="1.5"
                />
                <line x1="-28" y1="65" x2="28" y2="65" stroke="url(#goldSheen)" strokeWidth="4" />
                {/* Filigree ribs on bell */}
                <path d="M -16 63 C -14 42 -8 34 0 32" stroke="#AA820A" strokeWidth="1.5" />
                <path d="M 16 63 C 14 42 8 34 0 32" stroke="#AA820A" strokeWidth="1.5" />
                {/* Hanging pearl drops */}
                {[-20, -10, 0, 10, 20].map((x, idx) => (
                  <g key={idx}>
                    <line x1={x} y1="65" x2={x} y2="78" stroke="url(#goldSheen)" strokeWidth="1.5" />
                    <circle cx={x} cy="82" r="3.5" fill="url(#pearlShine)" />
                  </g>
                ))}
              </g>

              {/* Right Jhumka */}
              <g transform="translate(220, 70)">
                <circle cx="0" cy="0" r="14" fill="#0C2117" stroke="url(#goldSheen)" strokeWidth="2" />
                <circle cx="0" cy="0" r="6" fill="url(#rubyGlow)" />
                <line x1="0" y1="14" x2="0" y2="28" stroke="url(#goldSheen)" strokeWidth="2" />
                <path
                  d="M -28 65 C -28 32 28 32 28 65 Z"
                  fill="url(#goldSheen)"
                  stroke="#9E7618"
                  strokeWidth="1.5"
                />
                <line x1="-28" y1="65" x2="28" y2="65" stroke="url(#goldSheen)" strokeWidth="4" />
                <path d="M -16 63 C -14 42 -8 34 0 32" stroke="#AA820A" strokeWidth="1.5" />
                <path d="M 16 63 C 14 42 8 34 0 32" stroke="#AA820A" strokeWidth="1.5" />
                {[-20, -10, 0, 10, 20].map((x, idx) => (
                  <g key={idx}>
                    <line x1={x} y1="65" x2={x} y2="78" stroke="url(#goldSheen)" strokeWidth="1.5" />
                    <circle cx={x} cy="82" r="3.5" fill="url(#pearlShine)" />
                  </g>
                ))}
              </g>
            </g>
          ) : category === 'bangles' ? (
            <g transform="translate(160, 160)">
              {/* Back Bangle */}
              <ellipse
                cx="-18"
                cy="-20"
                rx="85"
                ry="48"
                stroke="url(#goldSheen)"
                strokeWidth="12"
                fill="none"
                transform="rotate(-18)"
              />
              <ellipse
                cx="-18"
                cy="-20"
                rx="85"
                ry="48"
                stroke="#631C22"
                strokeWidth="3"
                strokeDasharray="4 8"
                fill="none"
                transform="rotate(-18)"
              />

              {/* Front Primary Bangle */}
              <ellipse
                cx="15"
                cy="18"
                rx="85"
                ry="48"
                stroke="url(#goldSheen)"
                strokeWidth="16"
                fill="none"
                transform="rotate(-18)"
              />
              <ellipse
                cx="15"
                cy="18"
                rx="85"
                ry="48"
                stroke="#091811"
                strokeWidth="4"
                fill="none"
                transform="rotate(-18)"
              />
              {/* Gemstones on kada circumference */}
              {[-45, -15, 15, 45].map((angle, idx) => (
                <circle
                  key={idx}
                  cx={15 + Math.cos((angle * Math.PI) / 180) * 78}
                  cy={18 + Math.sin((angle * Math.PI) / 180) * 44}
                  r="4"
                  fill="url(#rubyGlow)"
                  stroke="url(#goldSheen)"
                  strokeWidth="1"
                />
              ))}
            </g>
          ) : category === 'rings' ? (
            <g transform="translate(160, 160)">
              {/* Ring Band */}
              <ellipse
                cx="0"
                cy="25"
                rx="58"
                ry="45"
                stroke="url(#goldSheen)"
                strokeWidth="12"
                fill="none"
              />
              {/* Ring Crown Mount */}
              <path
                d="M -30 -10 L -42 -35 L 42 -35 L 30 -10 Z"
                fill="url(#goldSheen)"
                stroke="#AA820A"
                strokeWidth="2"
              />
              {/* Lotus Petals / Halo */}
              <circle cx="0" cy="-42" r="32" fill="#0C2117" stroke="url(#goldSheen)" strokeWidth="3" />
              {/* Central Kundan / Zircon Gem */}
              <polygon
                points="0,-64 22,-42 0,-20 -22,-42"
                fill="url(#rubyGlow)"
                stroke="url(#goldSheen)"
                strokeWidth="2"
              />
              <circle cx="0" cy="-42" r="6" fill="#FFFFFF" opacity="0.6" />
              {/* Perimeter pearls */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <circle
                  key={i}
                  cx={Math.cos((deg * Math.PI) / 180) * 32}
                  cy={-42 + Math.sin((deg * Math.PI) / 180) * 32}
                  r="3.5"
                  fill="url(#pearlShine)"
                />
              ))}
            </g>
          ) : category === 'mangalsutras' ? (
            <g transform="translate(160, 130)">
              {/* Black bead strands */}
              <path
                d="M -110 -50 C -60 60 -30 90 0 95"
                stroke="#111827"
                strokeWidth="4"
                strokeDasharray="4 6"
              />
              <path
                d="M 110 -50 C 60 60 30 90 0 95"
                stroke="#111827"
                strokeWidth="4"
                strokeDasharray="4 6"
              />
              {/* Gold station beads */}
              {[-70, -35, 35, 70].map((x, idx) => (
                <circle
                  key={idx}
                  cx={x}
                  cy={15 + Math.abs(x) * 0.4}
                  r="3.5"
                  fill="url(#goldSheen)"
                />
              ))}

              {/* Maharashtrian Vati Cups */}
              <g transform="translate(-14, 100)">
                <ellipse cx="0" cy="0" rx="14" ry="16" fill="url(#goldSheen)" />
                <ellipse cx="0" cy="-2" rx="10" ry="12" fill="#0B1F16" stroke="url(#goldSheen)" strokeWidth="1.5" />
                <circle cx="0" cy="18" r="3.5" fill="url(#pearlShine)" />
              </g>

              <g transform="translate(14, 100)">
                <ellipse cx="0" cy="0" rx="14" ry="16" fill="url(#goldSheen)" />
                <ellipse cx="0" cy="-2" rx="10" ry="12" fill="#0B1F16" stroke="url(#goldSheen)" strokeWidth="1.5" />
                <circle cx="0" cy="18" r="3.5" fill="url(#pearlShine)" />
              </g>

              {/* Coral bead in center */}
              <circle cx="0" cy="100" r="4.5" fill="url(#rubyGlow)" />
            </g>
          ) : (
            /* Generic / Jewellery Sets / Festive */
            <g transform="translate(160, 150)">
              <circle cx="0" cy="0" r="75" stroke="url(#goldSheen)" strokeWidth="3" strokeDasharray="6 4" />
              <circle cx="0" cy="0" r="55" stroke="url(#goldSheen)" strokeWidth="1.5" />
              {/* Royal Crest / Paisley */}
              <path
                d="M 0 -45 C 30 -30 35 15 0 45 C -35 15 -30 -30 0 -45 Z"
                fill="url(#goldSheen)"
              />
              <circle cx="0" cy="0" r="14" fill="#0B1F16" stroke="url(#goldSheen)" strokeWidth="2" />
              <circle cx="0" cy="0" r="8" fill="url(#rubyGlow)" />
              <circle cx="0" cy="65" r="5" fill="url(#pearlShine)" />
              <circle cx="-45" cy="45" r="4" fill="url(#pearlShine)" />
              <circle cx="45" cy="45" r="4" fill="url(#pearlShine)" />
            </g>
          )}
        </svg>
      </div>

      {/* Luxury Brand watermark & Category label */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#D4AF37]/80 font-serif tracking-wider uppercase pointer-events-none">
        <span className="truncate max-w-[170px]">{category.replace('-', ' ')}</span>
        <span className="text-[#F1D789]/60 font-mono text-[10px]">1-GM GOLD</span>
      </div>

      {/* Subtle border hairline inside */}
      <div className="absolute inset-0 border border-[#D4AF37]/20 pointer-events-none" />
    </div>
  );
};
