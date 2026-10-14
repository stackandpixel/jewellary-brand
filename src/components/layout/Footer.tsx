import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { buildWhatsAppLink } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1F16] text-[#FAF8F5] pt-16 pb-12 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-stone-800">
          {/* Column 1: Brand & Craftsmanship */}
          <div className="space-y-4">
            <Link
              to="/"
              className="text-2xl font-cinzel font-semibold tracking-wider text-[#F3DC9B] inline-block"
            >
              GoldenAura
            </Link>
            <p className="text-sm text-stone-300 leading-relaxed font-light">
              {BRAND_CONFIG.shortBio}
            </p>
            <div className="pt-2 text-xs text-[#D4AF37] flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Studio located in {BRAND_CONFIG.location.city}, {BRAND_CONFIG.location.state}</span>
            </div>
            {/* Social channels */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={buildWhatsAppLink('Hello GoldenAura Jewellery! I would like to connect.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#123024] hover:bg-[#25D366] text-white flex items-center justify-center transition-colors border border-stone-700"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#123024] hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors border border-stone-700"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#D4AF37] font-mono">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <Link to="/shop?style=1-Gram+Gold" className="hover:text-[#F3DC9B] transition-colors">
                  1-Gram Gold Ornaments
                </Link>
              </li>
              <li>
                <Link to="/shop?style=Temple+Jewellery" className="hover:text-[#F3DC9B] transition-colors">
                  Heritage Temple Jewellery
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bridal" className="hover:text-[#F3DC9B] transition-colors">
                  Bridal Suites & Trousseaus
                </Link>
              </li>
              <li>
                <Link to="/shop?category=mangalsutras" className="hover:text-[#F3DC9B] transition-colors">
                  Sacred Mangalsutras
                </Link>
              </li>
              <li>
                <Link to="/shop?category=earrings" className="hover:text-[#F3DC9B] transition-colors">
                  Jhumkas & Chandbalis
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bangles" className="hover:text-[#F3DC9B] transition-colors">
                  Bangles & Kadas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Guides */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#D4AF37] font-mono">
              Care & Help
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <Link to="/care-guide" className="hover:text-[#F3DC9B] transition-colors">
                  Jewellery Care Guide
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-[#F3DC9B] transition-colors">
                  FAQs & Shipping Timelines
                </Link>
              </li>
              <li>
                <Link to="/policies/shipping" className="hover:text-[#F3DC9B] transition-colors">
                  Shipping & Delivery Terms
                </Link>
              </li>
              <li>
                <Link to="/policies/returns" className="hover:text-[#F3DC9B] transition-colors">
                  Returns & Exchange Policy
                </Link>
              </li>
              <li>
                <Link to="/policies/privacy" className="hover:text-[#F3DC9B] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/manifest" className="hover:text-[#F3DC9B] transition-colors text-[#F1D789]">
                  Asset Manifest & Specs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio & Enquiries */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#D4AF37] font-mono">
              Studio & Enquiries
            </h4>
            <div className="space-y-3 text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.location.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{BRAND_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{BRAND_CONFIG.contact.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-400">
                <Compass className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{BRAND_CONFIG.location.operatingHours}</span>
              </div>
            </div>

            {/* Direct WhatsApp Concierge button */}
            <div className="pt-2">
              <a
                href={buildWhatsAppLink('Namaste GoldenAura! I have a question regarding an order enquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B4533] text-[#F3DC9B] border border-[#D4AF37]/40 rounded text-xs font-semibold hover:bg-[#235842] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Material Transparency & Anti-Slop Clarification */}
        <div className="py-6 border-b border-stone-800 text-xs text-stone-400 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-stone-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Material Transparency Statement</span>
          </div>
          <p>
            {BRAND_CONFIG.disclaimer.materials} {BRAND_CONFIG.disclaimer.sampleNotice}
          </p>
        </div>

        {/* Bottom bar with payment badges and copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} GoldenAura Jewellery. Crafted for celebrations across India.</p>

          <div className="flex items-center gap-3 text-stone-400 text-[11px] font-mono">
            <span>UPI</span>
            <span>·</span>
            <span>RuPay</span>
            <span>·</span>
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
