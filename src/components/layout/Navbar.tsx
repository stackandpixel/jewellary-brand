import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Heart,
  Menu,
  PhoneCall,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { useCart } from '../../context/CartContext';
import { buildWhatsAppLink } from '../../utils/whatsapp';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, wishlist, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { label: 'Shop All', href: '/shop' },
    { label: '1-Gram Gold', href: '/shop?style=1-Gram+Gold' },
    { label: 'Gold-Plated', href: '/shop?style=Gold-Plated' },
    { label: 'Bridal Collection', href: '/shop?category=bridal' },
    { label: 'Festive', href: '/shop?occasion=Festive' },
  ];

  const isActive = (path: string) => {
    if (path === '/shop' && location.pathname === '/shop' && !location.search) return true;
    if (path.includes('?') && location.pathname + location.search === path) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E0D3] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element in luxury display serif) */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-stone-700 hover:text-[#0B1F16] focus-visible:outline-none"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              to="/"
              className="text-2xl sm:text-3xl font-cinzel font-semibold tracking-wider text-[#0B1F16] whitespace-nowrap shrink-0 hover:text-[#8D6E16] transition-colors flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rotate-45 bg-[#D4AF37] inline-block" />
              <span>GoldenAura</span>
            </Link>
          </div>

          {/* Zone 2: 4–5 single-line clean navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-[#0B1F16] ${
                    active ? 'text-[#0B1F16] font-semibold' : 'text-stone-600'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-stone-700 hover:text-[#0B1F16] hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Search jewellery catalogue"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-2.5 text-stone-700 hover:text-[#0B1F16] hover:bg-stone-100 rounded-full transition-colors relative"
              aria-label={`View wishlist (${wishlist.length} saved)`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#78281F] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Bag Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-[#0B1F16] text-[#FAF8F5] rounded-md hover:bg-[#123024] transition-colors shadow-sm"
              aria-label={`Open shopping bag with ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-wide hidden sm:inline">Bag</span>
              <span className="px-1.5 py-0.2 text-xs font-mono font-bold bg-[#D4AF37] text-[#0B1F16] rounded">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#FAF8F5] shadow-2xl flex flex-col justify-between p-6 z-10 border-r border-[#E7E0D3]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E0D3]">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-cinzel font-semibold text-[#0B1F16] tracking-wider"
                >
                  GoldenAura
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-600 hover:text-black rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-1">
                <p className="text-[11px] font-mono tracking-wider text-stone-600 uppercase mb-3 px-2">
                  Collections
                </p>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-base font-medium text-stone-800 hover:bg-stone-100 rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-4 mt-4 border-t border-[#E7E0D3] space-y-1">
                  <p className="text-[11px] font-mono tracking-wider text-stone-600 uppercase mb-3 px-2">
                    Information
                  </p>
                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-stone-600 hover:text-stone-900"
                  >
                    About Brand
                  </Link>
                  <Link
                    to="/care-guide"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-stone-600 hover:text-stone-900"
                  >
                    Jewellery Care Guide
                  </Link>
                  <Link
                    to="/faqs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-stone-600 hover:text-stone-900"
                  >
                    FAQs & Shipping
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-stone-600 hover:text-stone-900"
                  >
                    Contact Pune Studio
                  </Link>
                  <Link
                    to="/manifest"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-[#AA820A] font-medium"
                  >
                    Asset & Dev Specs
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Contact card in mobile drawer */}
            <div className="pt-6 border-t border-[#E7E0D3] space-y-3">
              <a
                href={buildWhatsAppLink('Hello GoldenAura, I need assistance with jewellery selection.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] text-white rounded-md font-medium text-sm shadow-xs hover:bg-[#20BE5B] transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>
              <p className="text-center text-[11px] text-stone-600 font-mono">
                {BRAND_CONFIG.location.city}, {BRAND_CONFIG.location.state}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
