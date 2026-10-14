import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  Shield,
  ShoppingBag,
  X,
} from 'lucide-react';
import { formatINR } from '../../config/brandConfig';
import { useCart } from '../../context/CartContext';
import { buildWhatsAppLink, createProductEnquiryMessage } from '../../utils/whatsapp';
import { JewelleryVisual } from './JewelleryVisual';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isInWishlist(product.id);

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
    setSelectedSize(undefined);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-black bg-white/80 rounded-full backdrop-blur-xs transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Left */}
          <div className="bg-[#0A1D14] p-4 flex items-center justify-center relative min-h-[320px]">
            <JewelleryVisual
              category={product.category}
              style={product.style}
              name={product.name}
              imageSrc={product.images[0]}
              aspectRatio="1:1"
              className="w-full max-w-[320px] rounded"
            />
          </div>

          {/* Details Right */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Style */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <span className="text-[#99730E] font-medium uppercase tracking-wider text-[11px]">
                  {product.categoryLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>{product.style}</span>
              </div>

              <h2 className="text-xl font-cinzel font-semibold text-[#0B1F16] mb-2">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold font-mono text-[#0B1F16]">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through font-mono">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-medium">In Stock</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Size Selector if available */}
              {product.dimensions.sizeAvailable && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Select Bangle / Ring Size:
                  </label>
                  <div className="flex gap-2">
                    {product.dimensions.sizeAvailable.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 text-xs rounded border transition-colors ${
                          selectedSize === size
                            ? 'bg-[#0B1F16] text-[#F3DC9B] border-[#0B1F16]'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Material Disclosure */}
              <div className="p-2.5 bg-[#F2ECE1] rounded text-[11px] text-stone-700 flex items-start gap-2 mb-4">
                <Shield className="w-3.5 h-3.5 text-[#99730E] shrink-0 mt-0.5" />
                <span>
                  <strong>Specification:</strong> {product.materialDetails.plating} on{' '}
                  {product.materialDetails.baseMetal}.
                </span>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart */}
            <div className="space-y-3 pt-2 border-t border-[#E7E0D3]">
              <div className="flex items-center gap-4">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-stone-300 rounded bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-stone-600 hover:text-black"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-stone-600 hover:text-black"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 px-4 bg-[#0B1F16] hover:bg-[#123024] text-[#FAF8F5] text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add to Bag ({formatINR(product.price * quantity)})</span>
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded border transition-colors ${
                    wishlisted
                      ? 'bg-[#78281F] text-white border-[#78281F]'
                      : 'bg-white text-stone-700 border-stone-300 hover:text-[#78281F]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Second row: WhatsApp & Full Detail link */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <a
                  href={buildWhatsAppLink(createProductEnquiryMessage(product))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#25D366] hover:text-[#20BE5B] font-semibold flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Ask on WhatsApp</span>
                </a>

                <Link
                  to={`/product/${product.id}`}
                  onClick={handleClose}
                  className="text-xs text-stone-600 hover:text-[#0B1F16] flex items-center gap-1 font-medium"
                >
                  <span>View Full Details</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
