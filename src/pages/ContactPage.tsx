import React, { useState } from 'react';
import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Bridal Set Enquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    // Build WhatsApp message and open
    const text = `Namaste GoldenAura! ✉️

*Contact Enquiry from Website:*
• Name: ${formData.name}
• Phone: ${formData.phone || 'N/A'}
• Email: ${formData.email || 'N/A'}
• Topic: ${formData.subject}

*Message:*
${formData.message}`;

    window.open(buildWhatsAppLink(text), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <p className="text-xs font-mono uppercase tracking-wider text-[#99730E]">
          Connect With Our Pune Studio
        </p>
        <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B1F16]">
          Contact GoldenAura
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
          Whether you need advice on a wedding trousseau, sizing assistance, or shipping queries, our team is delighted to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E7E0D3] shadow-xs space-y-6">
            <h2 className="text-lg font-cinzel font-semibold text-[#0B1F16]">
              Studio Information
            </h2>

            <div className="space-y-4 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#AA820A] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Visit Our Studio</p>
                  <p className="mt-0.5 leading-relaxed">{BRAND_CONFIG.location.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#AA820A] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Telephone / Mobile</p>
                  <p className="mt-0.5">{BRAND_CONFIG.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#AA820A] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Email Address</p>
                  <p className="mt-0.5">{BRAND_CONFIG.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#AA820A] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Studio Hours</p>
                  <p className="mt-0.5">{BRAND_CONFIG.location.operatingHours}</p>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-4 border-t border-[#E7E0D3] space-y-2.5">
              <a
                href={buildWhatsAppLink('Namaste! I would like to schedule a virtual studio appointment.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BE5B] text-white rounded text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>

              <a
                href={BRAND_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#AA820A]" />
                <span>Follow {BRAND_CONFIG.contact.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E7E0D3] shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-cinzel font-semibold text-[#0B1F16]">
                Send Us a Message
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Submitting this form prepares your message and opens WhatsApp with our Pune concierge team.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-lg border border-emerald-200 space-y-3">
                <Sparkles className="w-8 h-8 text-emerald-700 mx-auto" />
                <h3 className="text-sm font-semibold text-emerald-900 font-cinzel">
                  Enquiry Opened in WhatsApp!
                </h3>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you, {formData.name}. Make sure you tapped &ldquo;Send&rdquo; in WhatsApp to deliver the message to our studio.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-stone-600 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Joshi"
                      className="w-full px-3 py-2 text-xs border rounded bg-[#FAF8F5] focus:outline-none focus:border-[#AA820A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 text-xs border rounded bg-[#FAF8F5] focus:outline-none focus:border-[#AA820A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="radhika@example.com"
                      className="w-full px-3 py-2 text-xs border rounded bg-[#FAF8F5] focus:outline-none focus:border-[#AA820A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Enquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 text-xs border rounded bg-[#FAF8F5] focus:outline-none focus:border-[#AA820A]"
                    >
                      <option value="Bridal Set Enquiry">Bridal Set Consultation</option>
                      <option value="Sizing & Fit Question">Sizing & Bangle Fit</option>
                      <option value="Shipping Timeline">Delivery Timeline Check</option>
                      <option value="Custom Order">Custom Bulk Festive Order</option>
                      <option value="General Query">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Message / Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the design you are seeking, preferred wedding date, or any specific pieces..."
                    className="w-full px-3 py-2 text-xs border rounded bg-[#FAF8F5] focus:outline-none focus:border-[#AA820A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#0B1F16] hover:bg-[#123024] text-[#FAF8F5] text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Transmit Enquiry via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
