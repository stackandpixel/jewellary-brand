import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, RotateCcw, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { JewelleryFinish, JewelleryOccasion, JewelleryStyle } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Mobile filters drawer open/close
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Read initial filter values from URL params
  const activeCategory = searchParams.get('category') || 'all';
  const activeStyle = searchParams.get('style') || 'all';
  const activeOccasion = searchParams.get('occasion') || 'all';
  const activeFinish = searchParams.get('finish') || 'all';
  const activeSort = searchParams.get('sort') || 'featured';
  const activePriceRange = searchParams.get('priceRange') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const stylesList: JewelleryStyle[] = [
    '1-Gram Gold',
    'Gold-Plated',
    'Temple Jewellery',
    'Kundan & Polki',
    'Antique Brass',
    'Meenakari',
  ];

  const occasionsList: JewelleryOccasion[] = [
    'Wedding',
    'Festive',
    'Daily Wear',
    'Party',
    'Gifting',
  ];

  const finishesList: JewelleryFinish[] = [
    '24K Matt Gold',
    'Antique Gold',
    'Yellow Gold Gloss',
    'Rose Gold',
  ];

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'bridal' && product.category !== 'bridal') return false;
        if (activeCategory !== 'bridal' && product.category !== activeCategory) return false;
      }

      // Style filter
      if (activeStyle !== 'all' && product.style !== activeStyle) return false;

      // Occasion filter
      if (
        activeOccasion !== 'all' &&
        !product.occasion.includes(activeOccasion as JewelleryOccasion)
      ) {
        return false;
      }

      // Finish filter
      if (activeFinish !== 'all' && product.finish !== activeFinish) return false;

      // Price range filter
      if (activePriceRange === 'under-999' && product.price > 999) return false;
      if (
        activePriceRange === '1000-2499' &&
        (product.price < 1000 || product.price > 2499)
      ) {
        return false;
      }
      if (
        activePriceRange === '2500-4999' &&
        (product.price < 2500 || product.price > 4999)
      ) {
        return false;
      }
      if (activePriceRange === '5000-plus' && product.price < 5000) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (activeSort === 'price_asc') return a.price - b.price;
      if (activeSort === 'price_desc') return b.price - a.price;
      if (activeSort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (activeSort === 'rating') return b.rating - a.rating;
      // Default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    activeCategory,
    activeStyle,
    activeOccasion,
    activeFinish,
    activePriceRange,
    activeSort,
    searchQuery,
  ]);

  const hasActiveFilters =
    activeCategory !== 'all' ||
    activeStyle !== 'all' ||
    activeOccasion !== 'all' ||
    activeFinish !== 'all' ||
    activePriceRange !== 'all' ||
    Boolean(searchQuery);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Breadcrumb */}
      <div className="mb-8 border-b border-[#E7E0D3] pb-6">
        <p className="text-xs font-mono uppercase tracking-wider text-[#99730E] mb-1">
          Indian Jewellery Catalogue
        </p>
        <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B1F16]">
          {activeCategory !== 'all'
            ? CATEGORIES.find((c) => c.id === activeCategory)?.name || 'Collection'
            : activeStyle !== 'all'
            ? `${activeStyle} Collection`
            : activeOccasion !== 'all'
            ? `${activeOccasion} Jewellery`
            : 'Explore All Jewellery'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-2xl font-light">
          Browse our exquisite 1-gram gold ornaments, bridal temple sets, and gold-plated daily staples crafted for festive occasions and personal gifting.
        </p>
      </div>

      {/* Toolbar: Filter toggle + Sort dropdown + Count */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-3 sm:p-4 rounded-lg border border-[#E7E0D3]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-[#FAF8F5] border border-stone-300 rounded text-xs font-semibold text-stone-800"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#AA820A]" />
            <span>Filters</span>
          </button>

          <span className="text-xs font-mono text-stone-500">
            Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} pieces
          </span>
        </div>

        {/* Sorting selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-stone-500 hidden sm:inline">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={activeSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="text-xs border border-stone-300 rounded px-2.5 py-1.5 bg-[#FAF8F5] text-stone-800 focus:outline-none focus:border-[#AA820A]"
          >
            <option value="featured">Featured Collection</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">New Arrivals</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Active Filter Indicators */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          <span className="text-stone-500 font-mono text-[11px]">Active Filters:</span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => updateParam('category', 'all')}
              className="flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700"
            >
              <span>Category: {activeCategory}</span>
              <X className="w-3 h-3" />
            </button>
          )}
          {activeStyle !== 'all' && (
            <button
              onClick={() => updateParam('style', 'all')}
              className="flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700"
            >
              <span>Style: {activeStyle}</span>
              <X className="w-3 h-3" />
            </button>
          )}
          {activeOccasion !== 'all' && (
            <button
              onClick={() => updateParam('occasion', 'all')}
              className="flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700"
            >
              <span>Occasion: {activeOccasion}</span>
              <X className="w-3 h-3" />
            </button>
          )}
          {activeFinish !== 'all' && (
            <button
              onClick={() => updateParam('finish', 'all')}
              className="flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700"
            >
              <span>Finish: {activeFinish}</span>
              <X className="w-3 h-3" />
            </button>
          )}
          {activePriceRange !== 'all' && (
            <button
              onClick={() => updateParam('priceRange', 'all')}
              className="flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700"
            >
              <span>Price: {activePriceRange}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-[#AA820A] hover:underline font-semibold ml-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Main Layout: Desktop Sidebar Filters (3 cols) + Product Grid (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Sidebar Filter Panel */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white p-5 rounded-lg border border-[#E7E0D3] space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#99730E] font-semibold flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter By</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-stone-500 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter 1: Category */}
            <div>
              <h4 className="text-xs font-semibold text-stone-800 mb-2">Category</h4>
              <div className="space-y-1">
                <button
                  onClick={() => updateParam('category', 'all')}
                  className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-[#0B1F16] text-[#F3DC9B] font-semibold'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  All Categories
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => updateParam('category', cat.id)}
                    className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-[#0B1F16] text-[#F3DC9B] font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Jewellery Style */}
            <div className="border-t pt-4">
              <h4 className="text-xs font-semibold text-stone-800 mb-2">Jewellery Style</h4>
              <div className="space-y-1">
                <button
                  onClick={() => updateParam('style', 'all')}
                  className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                    activeStyle === 'all'
                      ? 'bg-[#0B1F16] text-[#F3DC9B] font-semibold'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  All Styles
                </button>
                {stylesList.map((style) => (
                  <button
                    key={style}
                    onClick={() => updateParam('style', style)}
                    className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                      activeStyle === style
                        ? 'bg-[#0B1F16] text-[#F3DC9B] font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: Price Range */}
            <div className="border-t pt-4">
              <h4 className="text-xs font-semibold text-stone-800 mb-2">Price Range</h4>
              <div className="space-y-1">
                {[
                  { label: 'All Prices', val: 'all' },
                  { label: 'Under ₹999', val: 'under-999' },
                  { label: '₹1,000 - ₹2,499', val: '1000-2499' },
                  { label: '₹2,500 - ₹4,999', val: '2500-4999' },
                  { label: '₹5,000 and Above', val: '5000-plus' },
                ].map((tier) => (
                  <button
                    key={tier.val}
                    onClick={() => updateParam('priceRange', tier.val)}
                    className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                      activePriceRange === tier.val
                        ? 'bg-[#0B1F16] text-[#F3DC9B] font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 4: Occasion */}
            <div className="border-t pt-4">
              <h4 className="text-xs font-semibold text-stone-800 mb-2">Occasion</h4>
              <div className="space-y-1">
                <button
                  onClick={() => updateParam('occasion', 'all')}
                  className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                    activeOccasion === 'all'
                      ? 'bg-[#0B1F16] text-[#F3DC9B] font-semibold'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  All Occasions
                </button>
                {occasionsList.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => updateParam('occasion', occ)}
                    className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                      activeOccasion === occ
                        ? 'bg-[#0B1F16] text-[#F3DC9B] font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 5: Finish */}
            <div className="border-t pt-4">
              <h4 className="text-xs font-semibold text-stone-800 mb-2">Gold Finish</h4>
              <div className="space-y-1">
                <button
                  onClick={() => updateParam('finish', 'all')}
                  className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                    activeFinish === 'all'
                      ? 'bg-[#0B1F16] text-[#F3DC9B] font-semibold'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  All Finishes
                </button>
                {finishesList.map((f) => (
                  <button
                    key={f}
                    onClick={() => updateParam('finish', f)}
                    className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                      activeFinish === f
                        ? 'bg-[#0B1F16] text-[#F3DC9B] font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid (9 cols) */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-lg border border-[#E7E0D3] space-y-4">
              <p className="text-base font-cinzel font-semibold text-stone-800">
                No matching jewellery found
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try loosening your filters or price ranges to view more pieces from our catalogue.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-[#0B1F16] text-[#FAF8F5] text-xs font-semibold rounded hover:bg-[#123024]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Slide-Over Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-sm font-semibold text-stone-900 font-cinzel">
                  Filter Products
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-stone-400 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div>
                <h4 className="text-xs font-semibold text-stone-700 mb-2">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      updateParam('category', 'all');
                      setMobileFilterOpen(false);
                    }}
                    className="block w-full text-left py-1 text-xs text-stone-600"
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        updateParam('category', cat.id);
                        setMobileFilterOpen(false);
                      }}
                      className="block w-full text-left py-1 text-xs text-stone-600"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="border-t pt-4">
                <h4 className="text-xs font-semibold text-stone-700 mb-2">Price Range</h4>
                <div className="space-y-1">
                  {[
                    { label: 'All Prices', val: 'all' },
                    { label: 'Under ₹999', val: 'under-999' },
                    { label: '₹1,000 - ₹2,499', val: '1000-2499' },
                    { label: '₹2,500 - ₹4,999', val: '2500-4999' },
                    { label: '₹5,000 and Above', val: '5000-plus' },
                  ].map((tier) => (
                    <button
                      key={tier.val}
                      onClick={() => {
                        updateParam('priceRange', tier.val);
                        setMobileFilterOpen(false);
                      }}
                      className="block w-full text-left py-1 text-xs text-stone-600"
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t mt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-[#0B1F16] text-[#FAF8F5] text-xs font-semibold rounded"
              >
                Apply & View ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
