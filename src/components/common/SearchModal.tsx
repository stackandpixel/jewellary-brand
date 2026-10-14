import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { formatINR } from '../../config/brandConfig';
import { PRODUCTS } from '../../data/products';
import { JewelleryVisual } from './JewelleryVisual';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.style.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : PRODUCTS.slice(0, 4); // show quick suggestions if empty

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 pt-16 sm:pt-24 z-10">
        <div className="w-full max-w-2xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden">
          {/* Search Input Bar */}
          <div className="p-4 bg-white border-b border-[#E7E0D3] flex items-center gap-3">
            <Search className="w-5 h-5 text-stone-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search temple necklaces, jhumkas, mangalsutras, 1-gram gold..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-sm bg-transparent focus:outline-none text-stone-900 placeholder:text-stone-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-stone-400 hover:text-stone-600 text-xs px-2"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-black rounded"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results list */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-2 px-2">
              {query.trim() ? `Search Results (${filtered.length})` : 'Popular Searches'}
            </p>

            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-500">
                No jewellery found matching &ldquo;{query}&rdquo;. Try &ldquo;Temple&rdquo;, &ldquo;Jhumka&rdquo;, or &ldquo;Kundan&rdquo;.
              </div>
            ) : (
              filtered.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-[#E7E0D3] group"
                >
                  <div className="w-12 h-12 rounded overflow-hidden bg-[#0A1D14] shrink-0">
                    <JewelleryVisual
                      category={product.category}
                      style={product.style}
                      name={product.name}
                      imageSrc={product.images[0]}
                      aspectRatio="1:1"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-stone-900 group-hover:text-[#AA820A] truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">
                      {product.categoryLabel} · {product.style}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0B1F16] shrink-0">
                    {formatINR(product.price)}
                  </span>
                </Link>
              ))
            )}
          </div>

          {/* Quick Category tags footer */}
          <div className="p-3 bg-[#F2ECE1] border-t border-[#E7E0D3] flex items-center justify-between text-xs text-stone-600">
            <span>Quick filters:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setQuery('Temple')}
                className="hover:text-[#0B1F16] underline"
              >
                Temple
              </button>
              <span>·</span>
              <button
                onClick={() => setQuery('Kundan')}
                className="hover:text-[#0B1F16] underline"
              >
                Kundan
              </button>
              <span>·</span>
              <button
                onClick={() => setQuery('Mangalsutra')}
                className="hover:text-[#0B1F16] underline"
              >
                Mangalsutra
              </button>
              <span>·</span>
              <button
                onClick={() => setQuery('Bangles')}
                className="hover:text-[#0B1F16] underline"
              >
                Bangles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
