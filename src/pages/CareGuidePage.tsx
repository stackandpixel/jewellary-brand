import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Package,
  ShieldAlert,
  Sparkles,
  Sun,
  Wind,
} from 'lucide-react';

export const CareGuidePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <p className="text-xs font-mono uppercase tracking-wider text-[#99730E]">
          Maintenance & Longevity
        </p>
        <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B1F16]">
          1-Gram Gold & Jewellery Care Guide
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-light leading-relaxed">
          How to keep your 1-gram gold, gold-plated, and Kundan ornaments glowing with their original radiance for years to come.
        </p>
      </div>

      {/* Core Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rule 1 */}
        <div className="p-6 bg-white rounded-xl border border-[#E7E0D3] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-stone-900 font-cinzel">
            1. The &ldquo;Last On, First Off&rdquo; Rule
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Always apply your perfumes, deodorants, lotions, and makeup first. Allow them to dry completely before wearing your jewellery. Perfume mists and chemical alcohol solvents are the #1 cause of micro-plating discoloration.
          </p>
        </div>

        {/* Rule 2 */}
        <div className="p-6 bg-white rounded-xl border border-[#E7E0D3] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-stone-900 font-cinzel">
            2. Avoid Water, Sweating & Chemicals
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Remove all jewellery prior to bathing, swimming in chlorinated pools, household dishwashing, or intense exercise. Chlorine, salty sweat, and soap residues break down protective lacquer coatings over time.
          </p>
        </div>

        {/* Rule 3 */}
        <div className="p-6 bg-white rounded-xl border border-[#E7E0D3] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Wind className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-stone-900 font-cinzel">
            3. Post-Wear Wipe Down
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            After a long wedding or festive evening, gently wipe each piece with a dry, clean microfibre or soft flannel cloth. This gently lifts body oils and moisture before placing the jewellery into storage.
          </p>
        </div>

        {/* Rule 4 */}
        <div className="p-6 bg-white rounded-xl border border-[#E7E0D3] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-stone-900 font-cinzel">
            4. Individual Airtight Storage
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Never toss multiple pieces together in an open drawer where metals rub and scratch against one another. Store each piece in a separate ziplock pouch inside your GoldenAura velvet-lined keepsake box.
          </p>
        </div>
      </div>

      {/* What to avoid alert */}
      <div className="p-6 bg-[#FAF7F2] rounded-xl border border-[#E7E0D3] space-y-4">
        <h3 className="text-sm font-semibold text-[#0B1F16] flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#AA820A]" />
          <span>Cleaning Methods to Strictly Avoid</span>
        </h3>
        <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">✕</span>
            <span>
              <strong>Do NOT use ultrasonic jewellery cleaners:</strong> The ultrasonic vibration can dislodge hand-set kundan stones and delicate pearl fringes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">✕</span>
            <span>
              <strong>Do NOT use liquid gold cleaners, toothpastes, or baking soda:</strong> Abrasive pastes strip off the micro-micron gold plating layer.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">✕</span>
            <span>
              <strong>Do NOT expose to direct sunlight:</strong> Prolonged UV rays and heat can fade meenakari enamel pigments and dry stone resins.
            </span>
          </li>
        </ul>
      </div>

      {/* Need assistance */}
      <div className="text-center pt-4">
        <p className="text-xs text-stone-500 mb-3">
          Have a specific query about an antique temple choker or Kada hinge?
        </p>
        <Link
          to="/contact"
          className="text-xs font-semibold text-[#0B1F16] hover:text-[#AA820A] underline"
        >
          Contact our Pune Care Team
        </Link>
      </div>
    </div>
  );
};
