import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Heart,
  HelpCircle,
  MessageCircle,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { ProductCard } from '../components/common/ProductCard';
import { formatINR } from '../config/brandConfig';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { buildWhatsAppLink, createProductEnquiryMessage } from '../utils/whatsapp';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const { addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen } = useCart();
  const wishlisted = isInWishlist(product.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.dimensions.sizeAvailable ? product.dimensions.sizeAvailable[0] : undefined
  );

  // Accordion tabs
  const [openSection, setOpenSection] = useState<'specs' | 'care' | 'shipping'>('specs');

  // Pincode checker demo
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeInput || pincodeInput.length !== 6) {
      setPincodeResult('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    if (pincodeInput.startsWith('411')) {
      setPincodeResult('Express Delivery available: 2 - 3 business days (Pune Hub)');
    } else {
      setPincodeResult('Standard Courier Delivery: 4 - 6 business days across India');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    setIsCheckoutOpen(true);
  };

  // Related products from same category or style
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.style === product.style)
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back Link & Breadcrumb */}
      <div className="mb-6 flex items-center justify-between text-xs text-stone-500">
        <Link
          to="/shop"
          className="flex items-center gap-1.5 text-stone-700 hover:text-[#0B1F16] font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalogue</span>
        </Link>
        <span className="font-mono text-[11px]">SKU: {product.sku}</span>
      </div>

      {/* Main PDP Grid: Gallery Left (6 cols), Sticky Purchase Module Right (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Visual Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0A1D14] shadow-md border border-[#E7E0D3]">
            <JewelleryVisual
              category={product.category}
              style={product.style}
              name={product.name}
              imageSrc={product.images[0]}
              aspectRatio="1:1"
              className="w-full h-full"
            />

            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors ${
                wishlisted
                  ? 'bg-[#78281F] text-white'
                  : 'bg-white/80 text-stone-700 hover:bg-white hover:text-[#78281F]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Micro features strip */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-stone-600">
            <div className="p-3 bg-white rounded-lg border border-[#E7E0D3] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#AA820A] shrink-0" />
              <span className="font-medium text-[11px]">Anti-Tarnish Lacquer</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#E7E0D3] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#AA820A] shrink-0" />
              <span className="font-medium text-[11px]">24K Gold Look Shimmer</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {/* Unboxed Metadata Header */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 font-medium">
              <span className="text-[#99730E] uppercase tracking-wider text-[11px]">
                {product.categoryLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>{product.style}</span>
              <span aria-hidden="true">·</span>
              <span>{product.finish}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#0B1F16] leading-snug">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="mt-4 flex items-baseline gap-4">
              <span className="text-3xl font-bold font-mono text-[#0B1F16]">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-stone-400 line-through font-mono">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Save {formatINR(product.originalPrice - product.price)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-500 mt-1 font-mono">
              Inclusive of all taxes · Free delivery on orders ₹1,499+
            </p>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Size Selector if available */}
          {product.dimensions.sizeAvailable && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-stone-800">
                  Select Size ({product.category === 'bangles' ? 'Indian Bangle Size' : 'Ring Size'}):
                </span>
                <span className="text-stone-500 text-[11px]">Standard fit</span>
              </div>
              <div className="flex gap-2">
                {product.dimensions.sizeAvailable.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-medium rounded border transition-colors ${
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

          {/* Purchase Actions: Quantity + Add to Bag + Buy Now */}
          <div className="space-y-3 pt-4 border-t border-[#E7E0D3]">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-stone-300 rounded bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-stone-600 hover:text-black"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-mono font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-stone-600 hover:text-black"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={() => addToCart(product, quantity, selectedSize)}
                className="flex-1 py-3.5 px-6 bg-[#0B1F16] hover:bg-[#123024] text-[#FAF8F5] text-sm font-semibold rounded-md shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Add to Bag ({formatINR(product.price * quantity)})</span>
              </button>
            </div>

            {/* Buy Now & WhatsApp Direct Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleBuyNow}
                className="py-3 px-4 bg-[#D4AF37] hover:bg-[#C59B27] text-[#0B1F16] text-xs font-bold rounded-md shadow-sm transition-colors text-center"
              >
                Proceed to Checkout
              </button>

              <a
                href={buildWhatsAppLink(createProductEnquiryMessage(product))}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#25D366] hover:bg-[#20BE5B] text-white text-xs font-semibold rounded-md shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

          {/* Indian Delivery Pincode Checker */}
          <div className="p-4 bg-white rounded-lg border border-[#E7E0D3] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
              <Truck className="w-4 h-4 text-[#AA820A]" />
              <span>Check Delivery Timeline to Your Indian Pincode</span>
            </div>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit PIN code (e.g. 411005)"
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#AA820A]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-stone-800 text-white text-xs font-medium rounded hover:bg-black transition-colors"
              >
                Check
              </button>
            </form>
            {pincodeResult && (
              <p className="text-xs text-stone-700 font-medium pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{pincodeResult}</span>
              </p>
            )}
          </div>

          {/* Product Specs, Materials Transparency & Care Accordion */}
          <div className="border border-[#E7E0D3] rounded-lg divide-y divide-[#E7E0D3] bg-white overflow-hidden text-xs">
            {/* Accordion 1: Material Details & Disclaimer */}
            <div>
              <button
                onClick={() => setOpenSection(openSection === 'specs' ? ('' as any) : 'specs')}
                className="w-full p-4 flex items-center justify-between text-left font-semibold text-stone-800 hover:bg-[#FAF8F5]"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#AA820A]" />
                  <span>Material Details & Transparency</span>
                </span>
                {openSection === 'specs' ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openSection === 'specs' && (
                <div className="p-4 pt-0 text-stone-600 space-y-2 leading-relaxed bg-[#FAF8F5]/50">
                  <p>
                    <strong>Base Metal:</strong> {product.materialDetails.baseMetal}
                  </p>
                  <p>
                    <strong>Plating / Polish:</strong> {product.materialDetails.plating}
                  </p>
                  {product.materialDetails.stones && (
                    <p>
                      <strong>Embellishments:</strong> {product.materialDetails.stones}
                    </p>
                  )}
                  <p>
                    <strong>Weight:</strong> {product.dimensions.weight}
                  </p>
                  <div className="p-2.5 bg-amber-50/80 border border-amber-200/80 rounded text-[11px] text-amber-900 mt-2">
                    <strong>Purity Notice:</strong> {product.materialDetails.purityDisclaimer}
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Care Guide */}
            <div>
              <button
                onClick={() => setOpenSection(openSection === 'care' ? ('' as any) : 'care')}
                className="w-full p-4 flex items-center justify-between text-left font-semibold text-stone-800 hover:bg-[#FAF8F5]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#AA820A]" />
                  <span>Jewellery Care Guidance</span>
                </span>
                {openSection === 'care' ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openSection === 'care' && (
                <div className="p-4 pt-0 text-stone-600 space-y-1.5 leading-relaxed bg-[#FAF8F5]/50">
                  {product.careTips.map((tip, idx) => (
                    <p key={idx}>• {tip}</p>
                  ))}
                  <p className="text-[11px] text-stone-500 pt-1">
                    Store individually in an airtight pouch inside the provided velvet box to prevent surface friction and oxidation.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 3: Shipping & Returns */}
            <div>
              <button
                onClick={() =>
                  setOpenSection(openSection === 'shipping' ? ('' as any) : 'shipping')
                }
                className="w-full p-4 flex items-center justify-between text-left font-semibold text-stone-800 hover:bg-[#FAF8F5]"
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#AA820A]" />
                  <span>Shipping & Exchange Policies</span>
                </span>
                {openSection === 'shipping' ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openSection === 'shipping' && (
                <div className="p-4 pt-0 text-stone-600 space-y-1.5 leading-relaxed bg-[#FAF8F5]/50">
                  <p>• Dispatched from our Pune Studio within 24–48 business hours.</p>
                  <p>• Free shipping across India on cart subtotals of ₹1,499 and above.</p>
                  <p>• 48-hour transit damage replacement policy upon unboxing video proof.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[#E7E0D3]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#99730E] mb-1">
                You May Also Admire
              </p>
              <h2 className="text-2xl font-cinzel font-bold text-[#0B1F16]">
                Related Jewellery
              </h2>
            </div>
            <Link
              to={`/shop?category=${product.category}`}
              className="text-xs font-semibold text-[#99730E] hover:underline"
            >
              View More in {product.categoryLabel}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
