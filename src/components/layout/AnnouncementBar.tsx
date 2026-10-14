import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !BRAND_CONFIG.announcement.enabled) return null;

  return (
    <div className="bg-[#0B1F16] text-[#F3DC9B] text-xs py-2 px-4 border-b border-[#D4AF37]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center flex items-center justify-center gap-2 font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="truncate">{BRAND_CONFIG.announcement.text}</span>
          <span className="hidden md:inline text-[#D4AF37]/60">·</span>
          <span className="hidden md:inline text-stone-300">Free delivery on orders above ₹1,499</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#F3DC9B]/70 hover:text-white p-1 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
