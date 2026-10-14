import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BRAND_CONFIG } from '../config/brandConfig';

export const PoliciesPage: React.FC = () => {
  const { policyType } = useParams<{ policyType?: string }>();
  const [activeTab, setActiveTab] = useState<'privacy' | 'shipping' | 'returns' | 'terms'>(
    (policyType as any) || 'shipping'
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <p className="text-xs font-mono uppercase tracking-wider text-[#99730E]">
          Store Terms & Consumer Rights
        </p>
        <h1 className="text-3xl font-cinzel font-bold text-[#0B1F16]">
          Store Policies
        </h1>
        <p className="text-xs text-stone-500 font-light">
          Editable policy templates for GoldenAura Jewellery.
        </p>
      </div>

      {/* Segmented policy tabs */}
      <div className="flex border-b border-[#E7E0D3] overflow-x-auto text-xs font-medium">
        {[
          { id: 'shipping', label: 'Shipping & Delivery' },
          { id: 'returns', label: 'Returns & Exchanges' },
          { id: 'privacy', label: 'Privacy Policy' },
          { id: 'terms', label: 'Terms & Conditions' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-5 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#0B1F16] text-[#0B1F16] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Policy Content Body */}
      <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E7E0D3] shadow-xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h2 className="text-lg font-cinzel font-semibold text-[#0B1F16]">
              Shipping & Delivery Policy
            </h2>
            <p>
              GoldenAura ships orders across India through insured logistics partners (Bluedart, Delhivery, and India Post Speed Post).
            </p>
            <h3 className="font-semibold text-stone-900 pt-2">1. Processing Time</h3>
            <p>
              All orders are hand-inspected, packed in rigid jewel boxes, and dispatched from our Pune studio within 24 to 48 business hours (excluding Sundays and national holidays).
            </p>
            <h3 className="font-semibold text-stone-900 pt-2">2. Delivery Estimates</h3>
            <p>
              • <strong>Pune & Maharashtra:</strong> 2 to 3 business days.<br />
              • <strong>Rest of India:</strong> 4 to 6 business days.
            </p>
            <h3 className="font-semibold text-stone-900 pt-2">3. Shipping Charges</h3>
            <p>
              Standard courier delivery is completely <strong>FREE</strong> on cart subtotals of ₹1,499 and above. For orders below ₹1,499, a flat shipping charge of ₹99 is applied.
            </p>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-4">
            <h2 className="text-lg font-cinzel font-semibold text-[#0B1F16]">
              Returns & Exchange Policy
            </h2>
            <p>
              Due to hygiene and the delicate handcrafted nature of festive jewellery, we do not accept general returns once worn. However, we offer full replacements in cases of transit defect or sizing mismatch.
            </p>
            <h3 className="font-semibold text-stone-900 pt-2">1. 48-Hour Damage Window</h3>
            <p>
              If your jewellery arrives with a dislodged stone, broken clasp, or transit defect, please notify our WhatsApp concierge team within 48 hours of delivery.
            </p>
            <h3 className="font-semibold text-stone-900 pt-2">2. Unboxing Video Requirement</h3>
            <p>
              To process transit claims smoothly, a continuous unboxing video of the sealed parcel is required as standard practice across Indian jewellery merchants.
            </p>
            <h3 className="font-semibold text-stone-900 pt-2">3. Bangle & Ring Size Exchanges</h3>
            <p>
              If an ordered bangle size (e.g. 2.4 vs 2.6) does not fit, contact us for an exchange within 3 days. Return postage for sizing exchanges is borne by the customer.
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-lg font-cinzel font-semibold text-[#0B1F16]">
              Privacy & Data Policy
            </h2>
            <p>
              GoldenAura Jewellery values your privacy. We collect customer names, phone numbers, delivery addresses, and email addresses strictly for processing order deliveries and providing WhatsApp customer service.
            </p>
            <h3 className="font-semibold text-stone-900 pt-2">1. Information We Collect</h3>
            <p>
              Contact data provided during order enquiry is never sold or rented to third-party telemarketing agencies.
            </p>
            <h3 className="font-semibold text-stone-900 pt-2">2. Local Storage</h3>
            <p>
              Your shopping bag and wishlist are preserved locally in your browser&apos;s localStorage for your convenience.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-lg font-cinzel font-semibold text-[#0B1F16]">
              Terms & Conditions
            </h2>
            <p>
              By browsing and placing enquiries on GoldenAura, you agree to our standard operating guidelines.
            </p>
            <h3 className="font-semibold text-stone-900 pt-2">1. Product Descriptions & Colours</h3>
            <p>
              Every effort is made to accurately represent jewellery colours and dimensions. Because gemstones and antique coatings have subtle natural variations, slight differences under different room lightings are customary.
            </p>
            <h3 className="font-semibold text-stone-900 pt-2">2. Fashion Jewellery Acknowledgment</h3>
            <p>
              The customer acknowledges that GoldenAura produces imitation and 1-gram gold plated jewellery and not solid 22K bullion investment gold.
            </p>
          </div>
        )}

        <div className="pt-6 border-t border-[#E7E0D3] text-[11px] text-stone-400 font-mono">
          Disclaimer: This policy document is a sample operating template for demonstration. Real merchants should review these with a legal advisor prior to commercial deployment.
        </div>
      </div>
    </div>
  );
};
