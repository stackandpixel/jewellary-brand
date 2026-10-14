import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { formatINR } from '../config/brandConfig';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-10 text-center max-w-xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-wider text-[#99730E] mb-1">
          Your Saved Treasures
        </p>
        <h1 className="text-3xl font-cinzel font-bold text-[#0B1F16]">
          My Wishlist
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-2 font-light">
          Review pieces you have saved for weddings, upcoming festivals, or upcoming celebrations.
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-[#E7E0D3] max-w-md mx-auto p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-stone-400 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-cinzel font-semibold text-stone-800">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Tap the heart icon on any necklace, jhumka, or kada to save it here.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-block px-5 py-2.5 bg-[#0B1F16] text-[#FAF8F5] text-xs font-semibold rounded hover:bg-[#123024] transition-colors"
          >
            Explore Jewellery Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-[#E7E0D3] overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-square bg-[#0A1D14]">
                <JewelleryVisual
                  category={product.category}
                  style={product.style}
                  name={product.name}
                  imageSrc={product.images[0]}
                  aspectRatio="1:1"
                  className="w-full h-full"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-[#78281F] rounded-full transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                <div>
                  <p className="text-[11px] text-[#99730E] uppercase tracking-wider font-medium">
                    {product.categoryLabel}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-xs font-semibold text-stone-900 hover:text-[#AA820A] line-clamp-1 font-serif"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm font-mono font-bold text-[#0B1F16] mt-1">
                    {formatINR(product.price)}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F2ECE1] flex gap-2">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="flex-1 py-2 px-3 bg-[#0B1F16] hover:bg-[#123024] text-[#FAF8F5] text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
