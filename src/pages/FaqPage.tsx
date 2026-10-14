import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Search } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const FaqPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What exactly is 1-Gram Gold jewellery? Is it real solid gold?',
      a: 'No, 1-Gram Gold jewellery is NOT solid 22K/24K hallmarked bullion gold. It is premium fashion jewellery crafted from high-density brass or copper alloy and plated with a genuine micron layer of 1-gram gold formulation with a protective lacquer seal. It replicates the weight, texture, and regal warmth of solid gold at an accessible fraction of the price.',
      category: 'Materials',
    },
    {
      q: 'How long will the gold polish last on my jewellery?',
      a: 'With mindful usage (keeping away from water, perfumes, and body sweat, and storing in airtight pouches), our 1-gram gold plating typically retains its original luster for 1 to 2 years with periodic festive wear. Daily wear bangles and rings will naturally experience gradual wear over 6 to 12 months.',
      category: 'Care & Durability',
    },
    {
      q: 'How does WhatsApp ordering work?',
      a: 'When you select "WhatsApp Enquiry" or "Send Order Enquiry on WhatsApp", our system generates a prefilled message with your selected item names, SKUs, quantities, and delivery address. You simply click "Send" in WhatsApp to chat with our Pune studio team, who will confirm stock and share secure UPI payment details.',
      category: 'Ordering',
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes, Cash on Delivery is available for most serviceable Indian pincodes. COD orders are verified by our team over phone or WhatsApp prior to dispatch to prevent fake orders.',
      category: 'Payments',
    },
    {
      q: 'What are the delivery timelines to Pune and across India?',
      a: `Orders within Pune and surrounding Maharashtra regions are typically delivered in 2 to 3 business days via local express logistics. Orders to other states across India arrive in 4 to 6 business days with tracked courier services.`,
      category: 'Shipping',
    },
    {
      q: 'Can I exchange or return an item if the size does not fit?',
      a: 'Yes, we provide a 48-hour transit damage and size exchange policy upon receipt. We request customers to share a brief unboxing video if any stone is loose or damaged upon arrival, and our team arranges a replacement or exchange.',
      category: 'Returns',
    },
    {
      q: 'Are your jewellery pieces hypoallergenic?',
      a: 'All our base metals are lead-free and nickel-compliant copper-brass alloys. Most customers wear them comfortably for long weddings without any skin irritation. If you have extreme sensitivity to non-precious metals, we recommend avoiding prolonged sweating while wearing them.',
      category: 'Materials',
    },
  ];

  const filteredFaqs = search.trim()
    ? faqs.filter(
        (f) =>
          f.q.toLowerCase().includes(search.toLowerCase()) ||
          f.a.toLowerCase().includes(search.toLowerCase()) ||
          f.category.toLowerCase().includes(search.toLowerCase())
      )
    : faqs;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <p className="text-xs font-mono uppercase tracking-wider text-[#99730E]">
          Got Questions? We Have Answers
        </p>
        <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B1F16]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-light leading-relaxed">
          Learn about our materials, 1-gram gold care, shipping timelines from Pune, and WhatsApp concierge ordering.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search questions (e.g. 1-gram gold, COD, shipping)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#E7E0D3] rounded-lg shadow-2xs focus:outline-none focus:border-[#AA820A]"
        />
      </div>

      {/* FAQs List Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg border border-[#E7E0D3] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-[#FAF8F5] transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#99730E] block mb-1">
                    {faq.category}
                  </span>
                  <h3 className="text-sm font-semibold text-stone-900 font-cinzel">
                    {faq.q}
                  </h3>
                </div>
                <div className="p-1 rounded-full bg-stone-100 text-stone-600 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed font-light border-t border-[#F2ECE1] pt-3 bg-[#FAF8F5]/30">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help CTA */}
      <div className="p-8 bg-[#FAF7F2] rounded-xl border border-[#E7E0D3] text-center space-y-4">
        <h3 className="text-base font-cinzel font-semibold text-[#0B1F16]">
          Didn&apos;t find what you were looking for?
        </h3>
        <p className="text-xs text-stone-600 max-w-md mx-auto">
          Our Pune studio jewellery specialists are available on WhatsApp to answer questions about specific pieces, weights, or bridal custom combinations.
        </p>
        <a
          href={buildWhatsAppLink('Namaste GoldenAura! I have a question not listed in the FAQs.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20BE5B] text-white text-xs font-semibold rounded-md shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask on WhatsApp Concierge</span>
        </a>
      </div>
    </div>
  );
};
