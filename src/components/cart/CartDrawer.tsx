import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { BRAND_CONFIG, formatINR } from '../../config/brandConfig';
import { useCart } from '../../context/CartContext';
import { buildWhatsAppLink, createCartOrderEnquiryMessage } from '../../utils/whatsapp';
import { JewelleryVisual } from '../common/JewelleryVisual';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    discount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    total,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ msg: string; isError: boolean } | null>(
    null
  );

  if (!isCartOpen) return null;

  const freeShippingThreshold = BRAND_CONFIG.shipping.freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback({ msg: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  const handleWhatsAppEnquiry = () => {
    const message = createCartOrderEnquiryMessage(cart, subtotal, shippingFee, total);
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E7E0D3]">
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 bg-white border-b border-[#E7E0D3] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#0B1F16]" />
              <h2 className="text-base font-cinzel font-semibold text-[#0B1F16]">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-mono text-stone-500">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-black rounded-lg transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          {cart.length > 0 && (
            <div className="bg-[#FAF7F0] px-6 py-3 border-b border-[#E7E0D3] text-xs">
              <div className="flex items-center justify-between font-medium text-stone-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#AA820A]" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">
                      Congratulations! You unlocked FREE Delivery!
                    </span>
                  ) : (
                    <span>
                      Add <strong>{formatINR(amountNeededForFreeShipping)}</strong> more for FREE
                      delivery
                    </span>
                  )}
                </span>
                <span className="font-mono text-[11px] text-stone-500">
                  {freeShippingProgress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#E6DFD3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#AA820A] rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE9DE] flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-cinzel font-semibold text-stone-800">
                    Your bag is currently empty
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Explore our 1-gram gold ornaments, bridal chokers, and festive sets.
                  </p>
                </div>
                <Link
                  to="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-[#0B1F16] text-[#FAF8F5] text-xs font-semibold rounded hover:bg-[#123024] transition-colors"
                >
                  Explore Jewellery Collections
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded-lg border border-[#E7E0D3] shadow-2xs"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded overflow-hidden bg-[#0A1D14] shrink-0">
                    <JewelleryVisual
                      category={item.product.category}
                      style={item.product.style}
                      name={item.product.name}
                      imageSrc={item.product.images[0]}
                      aspectRatio="1:1"
                      className="w-full h-full"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-semibold text-stone-900 hover:text-[#AA820A] transition-colors line-clamp-1 font-serif"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-[#78281F] p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-500 font-medium">
                        {item.product.style} {item.selectedSize ? `· Size ${item.selectedSize}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-200 rounded bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-black"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-black"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold font-mono text-[#0B1F16]">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-[#E7E0D3] space-y-4">
              {/* Promo code box */}
              <div className="space-y-1.5">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Promo code <strong>{appliedPromo}</strong> active ({discount > 0 ? `-${formatINR(discount)}` : ''})
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-stone-500 hover:text-red-700 text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. FESTIVE10)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs border border-stone-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#AA820A] uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded text-xs font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && !appliedPromo && (
                  <p
                    className={`text-[11px] ${
                      promoFeedback.isError ? 'text-red-600' : 'text-emerald-700'
                    }`}
                  >
                    {promoFeedback.msg}
                  </p>
                )}
              </div>

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-[#F0ECE1] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-stone-900">
                    {formatINR(subtotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="font-mono">-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Delivery (India)</span>
                  <span className="font-mono font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 uppercase font-semibold">FREE</span>
                    ) : (
                      formatINR(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0B1F16] pt-2 border-t border-stone-200">
                  <span>Total Payable</span>
                  <span className="font-mono text-base">{formatINR(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* 1. Primary Checkout button */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3 px-4 bg-[#0B1F16] hover:bg-[#123024] text-[#FAF8F5] font-semibold text-xs rounded-md shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                {/* 2. Direct WhatsApp Order Enquiry button */}
                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BE5B] text-white font-semibold text-xs rounded-md flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order Enquiry on WhatsApp</span>
                </button>
              </div>

              <div className="text-[11px] text-stone-500 text-center font-mono">
                Safe & Secure Indian Packaging · Handcrafted in Pune
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
