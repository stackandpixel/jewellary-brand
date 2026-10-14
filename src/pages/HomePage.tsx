import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  ChevronRight,
  Clock,
  Heart,
  Instagram,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { ProductCard } from '../components/common/ProductCard';
import { BRAND_CONFIG, formatINR } from '../config/brandConfig';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | '1-gram' | 'bridal' | 'festive'>('all');

  // Featured products filtered by tab
  const featuredProducts = PRODUCTS.filter((p) => {
    if (activeTab === '1-gram') return p.style === '1-Gram Gold';
    if (activeTab === 'bridal') return p.category === 'bridal' || p.occasion.includes('Wedding');
    if (activeTab === 'festive') return p.occasion.includes('Festive');
    return p.isFeatured;
  }).slice(0, 8);

  // Dedicated bestsellers list
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  // Instagram sample gallery posts
  const instaPosts = [
    {
      id: 1,
      title: 'Royal Temple Kasu Mala layered with brocade Kanjeevaram.',
      tag: '#BridalHeritage',
      likes: '412',
      category: 'necklaces' as const,
    },
    {
      id: 2,
      title: 'Lotus Golden Bloom Jhumkas chiming softly in candlelight.',
      tag: '#JhumkaLove',
      likes: '890',
      category: 'earrings' as const,
    },
    {
      id: 3,
      title: 'Handcrafted floral embossed kadas styled for a festive Diwali puja.',
      tag: '#BanglesForever',
      likes: '344',
      category: 'bangles' as const,
    },
    {
      id: 4,
      title: 'Sacred Maharashtrian Vati Mangalsutra with consecrated black beads.',
      tag: '#AuspiciousMoments',
      likes: '516',
      category: 'mangalsutras' as const,
    },
    {
      id: 5,
      title: 'Luxury emerald velvet packaging prepared for express Pune courier delivery.',
      tag: '#GoldenAuraGifts',
      likes: '622',
      category: 'jewellery-sets' as const,
    },
    {
      id: 6,
      title: 'Pastel Kundan choker set shining under wedding sangeet chandeliers.',
      tag: '#FestiveVibes',
      likes: '741',
      category: 'bridal' as const,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden bg-[#0B1F16] text-[#FAF8F5] border-b border-[#D4AF37]/30">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Headline & CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#123024] border border-[#D4AF37]/40 rounded-full text-xs text-[#F3DC9B] font-medium tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Heirloom Indian Jewellery Reimagined</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-white leading-tight tracking-tight text-balance">
                Elegance That Shines With You.
              </h1>

              <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed font-light">
                Discover beautiful gold-look jewellery for everyday elegance, celebrations, and unforgettable occasions. Handcrafted 1-gram gold and bridal ornaments designed in Pune.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#C59B27] text-[#0B1F16] text-sm font-semibold rounded-md shadow-lg flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/shop?category=bridal"
                  className="px-6 py-3.5 bg-transparent hover:bg-[#123024] text-[#FAF8F5] border border-stone-600 hover:border-[#D4AF37] text-sm font-semibold rounded-md transition-all"
                >
                  Explore Bridal Jewellery
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-8 border-t border-stone-800 grid grid-cols-3 gap-4 text-xs text-stone-300">
                <div>
                  <p className="font-bold text-white text-sm font-mono">1-Gram Gold</p>
                  <p className="text-[11px] text-stone-400">Micro-Plated Finish</p>
                </div>
                <div>
                  <p className="font-bold text-white text-sm font-mono">Free Delivery</p>
                  <p className="text-[11px] text-stone-400">On orders ₹1,499+</p>
                </div>
                <div>
                  <p className="font-bold text-white text-sm font-mono">WhatsApp Support</p>
                  <p className="text-[11px] text-stone-400">Live Pune Studio Team</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden p-2 bg-gradient-to-b from-[#D4AF37]/30 via-stone-800/20 to-transparent shadow-2xl">
                <div className="relative rounded-xl overflow-hidden bg-[#0A1D14] aspect-[4/5] flex items-center justify-center">
                  <JewelleryVisual
                    category="bridal"
                    style="Temple Jewellery"
                    name="Royal Bridal Haar & Choker Set"
                    aspectRatio="4:5"
                    className="w-full h-full"
                  />

                  {/* Floating Accent Card on Hero */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0B1F16]/95 backdrop-blur-md rounded-lg border border-[#D4AF37]/30 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#F3DC9B] font-serif">
                        Royal Temple Bridal Suite
                      </p>
                      <p className="text-[11px] text-stone-400">24K Matt Antique Finish</p>
                    </div>
                    <Link
                      to="/product/prod-13"
                      className="px-3 py-1.5 bg-[#D4AF37] text-[#0B1F16] text-xs font-bold rounded hover:bg-[#C59B27] transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category (9 Tiles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#99730E] mb-1">
              Curated Catalogue
            </p>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#0B1F16]">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#99730E] hover:text-[#0B1F16] flex items-center gap-1 group"
          >
            <span>View All ({PRODUCTS.length} Items)</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === 'bridal' ? '/shop?category=bridal' : cat.id === 'daily-wear' ? '/shop?occasion=Daily+Wear' : cat.id === 'festive' ? '/shop?occasion=Festive' : `/shop?category=${cat.id}`}
              className="group relative flex flex-col rounded-xl overflow-hidden bg-white border border-[#E7E0D3] hover:border-[#D4AF37] hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-[#0A1D14] overflow-hidden relative">
                <JewelleryVisual
                  category={cat.id}
                  name={cat.name}
                  aspectRatio="4:3"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-sm sm:text-base font-cinzel font-semibold text-[#F3DC9B] group-hover:text-white transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-[11px] text-stone-300 line-clamp-1 font-light">
                    {cat.tagline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Collection with Segmented Tab Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#E7E0D3] pb-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#99730E] mb-1">
              Handpicked Pieces
            </p>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#0B1F16]">
              Featured Collection
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Featured
            </button>
            <button
              onClick={() => setActiveTab('1-gram')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === '1-gram'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              1-Gram Gold
            </button>
            <button
              onClick={() => setActiveTab('bridal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'bridal'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Bridal & Trousseau
            </button>
            <button
              onClick={() => setActiveTab('festive')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'festive'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Festive Highlights
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Occasion-based Shopping Campaign Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-[#99730E] mb-1">
            Curated For Life&apos;s Milestones
          </p>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#0B1F16]">
            Shop by Occasion
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Wedding Season */}
          <div className="relative rounded-xl overflow-hidden bg-[#0A1D14] p-8 text-white flex flex-col justify-between min-h-[260px] border border-[#D4AF37]/30">
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#F3DC9B]">
                Campaign 01
              </span>
              <h3 className="text-2xl font-cinzel font-semibold mt-1 mb-2">
                Wedding Season
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed max-w-xs font-light">
                Grand chokers, layered haars, and matching jhumkas to elevate every bridal ritual.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/shop?occasion=Wedding"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#F3DC9B] hover:text-white"
              >
                <span>Explore Wedding Suites</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Festive Favourites */}
          <div className="relative rounded-xl overflow-hidden bg-[#1B3026] p-8 text-white flex flex-col justify-between min-h-[260px] border border-emerald-700/50">
            <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-300">
                Campaign 02
              </span>
              <h3 className="text-2xl font-cinzel font-semibold mt-1 mb-2">
                Festive Favourites
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed max-w-xs font-light">
                Kundan and meenakari sets curated for Diwali, Navratri garba, and festive pujas.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/shop?occasion=Festive"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200 hover:text-white"
              >
                <span>Discover Festive Glow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Gifts Under ₹999 */}
          <div className="relative rounded-xl overflow-hidden bg-[#241C16] p-8 text-white flex flex-col justify-between min-h-[260px] border border-[#AA820A]/40">
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#AA820A]/15 rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#F3DC9B]">
                Curated Gifting
              </span>
              <h3 className="text-2xl font-cinzel font-semibold mt-1 mb-2">
                Gifts Under ₹999
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed max-w-xs font-light">
                Thoughtful finger rings, delicate daily hoops, and lightweight pendants in velvet boxes.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/shop?maxPrice=999"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#F3DC9B] hover:text-white"
              >
                <span>Shop Budget Gifting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bestsellers Showcase (Dedicated Section with Sample Data Notice) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs font-mono uppercase tracking-wider text-[#99730E]">
                Customer Favourites
              </p>
              <span className="text-stone-300">·</span>
              <span className="text-[11px] text-stone-500 font-mono">Sample Catalogue Data</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#0B1F16]">
              Timeless Bestsellers
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#99730E] hover:text-[#0B1F16] flex items-center gap-1 group"
          >
            <span>Browse All Bestsellers</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Why Shop With Us? (4 Pillars) */}
      <section className="bg-[#FAF7F2] border-y border-[#E7E0D3] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-mono uppercase tracking-wider text-[#99730E] mb-1">
              The GoldenAura Promise
            </p>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#0B1F16]">
              Why Indian Shoppers Trust Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-xl border border-[#E7E0D3] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B1F16] text-[#D4AF37] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#0B1F16]">
                Material Transparency
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Clear specification of copper-brass alloy bases and 1-gram gold electro-plating. No misleading gold claims.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E7E0D3] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B1F16] text-[#D4AF37] flex items-center justify-center">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#0B1F16]">
                Velvet Keepsake Packaging
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Every piece ships in a rigid jewel box with cushioned velvet and airtight zip storage to preserve luster.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E7E0D3] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B1F16] text-[#D4AF37] flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#0B1F16]">
                Live WhatsApp Concierge
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Connect with our Pune stylists for video previews, custom sizing, and bridal trousseau guidance.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E7E0D3] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B1F16] text-[#D4AF37] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#0B1F16]">
                Tracked Pan-India Dispatch
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Insured courier shipping with live tracking SMS. Free standard delivery on orders over ₹1,499.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Instagram-Inspired Brand Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Instagram className="w-4 h-4 text-[#AA820A]" />
              <p className="text-xs font-mono uppercase tracking-wider text-[#99730E]">
                {BRAND_CONFIG.contact.instagramHandle}
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#0B1F16]">
              Styled on Instagram
            </h2>
          </div>
          <a
            href={BRAND_CONFIG.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#0B1F16] rounded text-xs font-semibold text-[#0B1F16] hover:bg-[#0B1F16] hover:text-[#FAF8F5] transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {instaPosts.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-lg overflow-hidden bg-[#0A1D14] aspect-square border border-[#E7E0D3]"
            >
              <JewelleryVisual
                category={post.category}
                name={post.title}
                aspectRatio="1:1"
                className="w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                <p className="text-[11px] font-semibold text-[#F3DC9B] mb-1">{post.tag}</p>
                <p className="text-[10px] text-stone-200 line-clamp-2 leading-tight">
                  {post.title}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-stone-400 mt-2 font-mono">
                  <Heart className="w-3 h-3 text-[#D4AF37] fill-current" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
