import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, HeartHandshake, MapPin, Shield, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#123024]/10 rounded-full text-xs font-semibold text-[#123024]">
          <Sparkles className="w-3.5 h-3.5 text-[#AA820A]" />
          <span>Our Artisanal Heritage</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-[#0B1F16]">
          The Story of GoldenAura
        </h1>
        <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
          {BRAND_CONFIG.tagline} — Designed in Pune, Maharashtra for celebrations that deserve heirloom grandeur without compromise.
        </p>
      </section>

      {/* Brand narrative block */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E7E0D3] shadow-xs space-y-8 text-stone-700 leading-relaxed text-sm sm:text-base font-light">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-cinzel font-bold text-[#0B1F16]">
                Rooted in Pune&apos;s Rich Cultural Tapestry
              </h2>
              <p>
                Founded in Pune, Maharashtra, GoldenAura Jewellery was born out of a simple observation: while the cultural reverence for traditional Indian gold jewellery remains eternal, wearing solid gold sets to destination weddings, sangeets, and crowded festivities comes with growing anxiety and prohibitive costs.
              </p>
              <p>
                We set out to craft high-grade 1-gram gold and micro-plated ornaments that mirror the weight, intricate filigree, and warm 24K sheen of heritage pieces, allowing women to celebrate freely with joy and confidence.
              </p>
            </div>
            <div className="p-6 bg-[#FAF7F2] rounded-xl border border-[#E7E0D3] space-y-4">
              <div className="flex items-center gap-2 text-[#0B1F16] font-semibold text-sm">
                <MapPin className="w-4 h-4 text-[#AA820A]" />
                <span>Our Pune Studio</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {BRAND_CONFIG.location.address}
              </p>
              <p className="text-xs text-stone-500">
                Operating Hours: {BRAND_CONFIG.location.operatingHours}
              </p>
              <div className="pt-2 text-xs font-mono text-[#AA820A]">
                Personal studio consultations available by prior appointment on WhatsApp.
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E7E0D3] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-[#0B1F16] text-[#D4AF37] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-stone-900 font-cinzel">Artisanal Detailing</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Each temple coin, jhumka bell, and kundan claw setting is hand-assembled by traditional artisans with care.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-[#0B1F16] text-[#D4AF37] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-stone-900 font-cinzel">Material Honesty</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                We clearly disclose our brass alloy base and 1-gram electro-plated micron finishes. No false hallmarking claims.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-[#0B1F16] text-[#D4AF37] flex items-center justify-center">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-stone-900 font-cinzel">Personal Concierge</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Direct WhatsApp styling assistance ensures you select coordinated jewellery that matches your ethnic attire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-10 bg-[#0B1F16] text-white rounded-2xl border border-[#D4AF37]/30 space-y-4">
          <h2 className="text-2xl font-cinzel font-semibold text-[#F3DC9B]">
            Find Your Signature Piece Today
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto font-light">
            Explore our curated 1-gram gold temple necklaces, kundan chokers, and festive daily staples.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#C59B27] text-[#0B1F16] font-semibold text-xs rounded-md shadow-md"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
