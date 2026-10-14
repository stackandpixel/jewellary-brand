import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { formatINR } from '../../config/brandConfig';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';
import { JewelleryVisual } from './JewelleryVisual';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();
  const wishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col bg-white rounded-lg border border-[#EBE5DA] overflow-hidden hover:border-[#D4AF37]/50 hover:shadow-md transition-all duration-300">
      {/* Visual media container (70% height with image or luxury vector artwork) */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#0A1D14]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <JewelleryVisual
            category={product.category}
            style={product.style}
            name={product.name}
            imageSrc={product.images[0]}
            aspectRatio="1:1"
          />
        </Link>

        {/* Top-left: Single quiet editorial text tag (NO heavy pill capsules) */}
        {product.isBestseller ? (
          <div className="absolute top-3 left-3 text-[11px] font-mono tracking-wider uppercase text-[#F3DC9B] bg-[#0B1F16]/90 px-2 py-0.5 rounded-xs backdrop-blur-xs">
            Bestseller
          </div>
        ) : product.isNew ? (
          <div className="absolute top-3 left-3 text-[11px] font-mono tracking-wider uppercase text-emerald-200 bg-[#0B1F16]/90 px-2 py-0.5 rounded-xs backdrop-blur-xs">
            New Arrival
          </div>
        ) : null}

        {/* Top-right: Wishlist Action Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            wishlisted
              ? 'bg-[#78281F] text-white'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-[#78281F]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 text-[#0B1F16] text-xs font-semibold rounded shadow-md hover:bg-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Unboxed Metadata with · separator */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium">
            <span className="text-[#99730E] uppercase tracking-wider text-[11px]">
              {product.style}
            </span>
            <span aria-hidden="true" className="text-stone-300">
              ·
            </span>
            <span className="truncate">{product.finish}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            className="block text-sm font-semibold text-stone-900 group-hover:text-[#0B1F16] transition-colors line-clamp-1 mb-2 font-serif"
          >
            {product.name}
          </Link>
        </div>

        {/* Price Baseline and Add to Cart */}
        <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#0B1F16] tabular-nums font-mono">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums font-mono">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-[11px] font-semibold text-emerald-700">
                {discountPercent}% off
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="p-2 text-[#0B1F16] hover:bg-[#FAF8F5] hover:text-[#AA820A] rounded border border-[#E7E0D3] transition-colors shrink-0"
            title="Add to Shopping Bag"
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
