import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Copy, Gift, Sparkles, Tag } from 'lucide-react';
import { ProductCard } from '../components/common/ProductCard';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const OffersPage: React.FC = () => {
  const { applyPromoCode, showToast } = useCart();

  const handleCopyCode = (code: string) => {
    applyPromoCode(code);
    navigator.clipboard?.writeText(code);
    showToast(`Coupon "${code}" copied & applied!`);
  };

  const budgetGifts = PRODUCTS.filter((p) => p.price <= 999).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <p className="text-xs font-mono uppercase tracking-wider text-[#99730E]">
          Celebration Perks
        </p>
        <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B1F16]">
          Festive Offers & Combinations
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
          Transparent savings for your wedding shopping and festive family gifts. No fake countdown timers, just genuine festive promotions.
        </p>
      </div>

      {/* Coupon Codes Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Coupon 1 */}
        <div className="p-6 bg-white rounded-xl border border-[#D4AF37]/40 shadow-xs flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#99730E] font-bold uppercase tracking-wider">
              Festive Promo
            </span>
            <h3 className="text-xl font-cinzel font-bold text-[#0B1F16]">10% Off Orders</h3>
            <p className="text-xs text-stone-500 font-light">
              Applicable on all 1-gram gold and festive temple jewellery.
            </p>
          </div>
          <button
            onClick={() => handleCopyCode('FESTIVE10')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0B1F16] text-[#F3DC9B] text-xs font-mono font-semibold rounded hover:bg-[#123024] transition-colors shrink-0"
          >
            <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>FESTIVE10</span>
          </button>
        </div>

        {/* Coupon 2 */}
        <div className="p-6 bg-white rounded-xl border border-[#D4AF37]/40 shadow-xs flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#99730E] font-bold uppercase tracking-wider">
              Welcome Gift
            </span>
            <h3 className="text-xl font-cinzel font-bold text-[#0B1F16]">15% First Order</h3>
            <p className="text-xs text-stone-500 font-light">
              Valid for first-time shoppers on GoldenAura.
            </p>
          </div>
          <button
            onClick={() => handleCopyCode('FIRSTGOLD')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0B1F16] text-[#F3DC9B] text-xs font-mono font-semibold rounded hover:bg-[#123024] transition-colors shrink-0"
          >
            <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>FIRSTGOLD</span>
          </button>
        </div>
      </div>

      {/* Featured Gifting Collection */}
      <section className="pt-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#99730E] mb-1">
              Thoughtful & Affordable
            </p>
            <h2 className="text-2xl font-cinzel font-bold text-[#0B1F16]">
              Festive Gifts Under ₹999
            </h2>
          </div>
          <Link
            to="/shop?maxPrice=999"
            className="text-xs font-semibold text-[#99730E] hover:underline flex items-center gap-1"
          >
            <span>View All Under ₹999</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {budgetGifts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
