import React, { useState } from 'react';
import { ChevronRight, HelpCircle, MessageCircle, Package, Sparkles, X } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { buildWhatsAppLink } from '../../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickPrompts = [
    {
      title: 'Order Enquiry',
      desc: 'Confirm stock & order via WhatsApp',
      icon: Package,
      msg: 'Namaste GoldenAura! I would like to place an order enquiry. Please guide me.',
    },
    {
      title: 'Sizing & Bangles Guide',
      desc: 'Ask about bangle sizes (2.4, 2.6, 2.8)',
      icon: HelpCircle,
      msg: 'Hello! I need assistance choosing the right bangle size for my wrist.',
    },
    {
      title: 'Bridal & Festive Sets',
      desc: 'Custom bridal trousseau styling',
      icon: Sparkles,
      msg: 'Namaste! I am planning my wedding jewellery and would love recommendations.',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover panel */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-[#0B1F16] text-[#FAF8F5] p-4 flex items-center justify-between border-b border-[#D4AF37]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F3DC9B] font-cinzel">
                  GoldenAura Concierge
                </h4>
                <p className="text-[11px] text-stone-300">
                  Pune Studio · Typically replies in 15 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1"
              aria-label="Close WhatsApp options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-[#FAF8F5] space-y-2.5">
            <p className="text-xs text-stone-600 mb-2">
              Select an option below to start a direct WhatsApp chat with our jewellery specialist:
            </p>

            {quickPrompts.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={buildWhatsAppLink(item.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#E7E0D3] hover:border-[#D4AF37] hover:bg-[#FDFBF7] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1B4533]/10 text-[#0B1F16] flex items-center justify-center group-hover:bg-[#0B1F16] group-hover:text-[#D4AF37] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-800">{item.title}</p>
                      <p className="text-[11px] text-stone-500">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#0B1F16] group-hover:translate-x-0.5 transition-all" />
                </a>
              );
            })}

            <div className="pt-2">
              <a
                href={buildWhatsAppLink('Namaste GoldenAura! I have a question regarding your jewellery.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BE5B] text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open Custom WhatsApp Chat</span>
              </a>
            </div>
          </div>

          <div className="bg-[#F0EBE1] px-4 py-2 text-[10px] text-stone-500 text-center font-mono">
            {BRAND_CONFIG.contact.displayWhatsapp} · WhatsApp Click-to-Chat
          </div>
        </div>
      )}

      {/* Trigger floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20BE5B] text-white rounded-full shadow-lg transition-transform active:scale-95 group focus-visible:outline-none"
        aria-label="Open WhatsApp live support"
      >
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">WhatsApp Help</span>
      </button>
    </div>
  );
};
