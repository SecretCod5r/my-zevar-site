import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Filter, Search, RotateCcw, Star, Heart, X, ChevronDown } from 'lucide-react';
import { Product } from '../types';

export default function Shop() {
  const { products, openProduct, addToCart, filters, setFilters, resetFilters, toggleWishlist, isInWishlist } = useApp();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleCategoryFilter = (cat: string) => setFilters(prev => ({ ...prev, category: cat }));
  const handlePriceFilter = (range: string) => setFilters(prev => ({ ...prev, priceRange: range }));
  const handleOccasionFilter = (occ: string) => setFilters(prev => ({ ...prev, occasion: occ }));
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => setFilters(prev => ({ ...prev, sort: e.target.value }));
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({ ...prev, search: e.target.value }));

  // Filtering
  let filteredProducts = products.filter((product) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!product.name.toLowerCase().includes(q) && !product.category.toLowerCase().includes(q)) return false;
    }
    if (filters.category !== 'All' && product.category !== filters.category) return false;
    if (filters.occasion !== 'All' && filters.occasion !== '') {
      if (product.occasion.toLowerCase() !== filters.occasion.toLowerCase()) return false;
    }
    if (filters.priceRange !== 'All' && filters.priceRange !== '') {
      const price = product.price;
      if (filters.priceRange === 'under-399' || filters.priceRange === 'Under ₹399') {
        if (price >= 399) return false;
      } else if (filters.priceRange === 'under-499') {
        if (price >= 499) return false;
      } else if (filters.priceRange === '399-599' || filters.priceRange === '₹399 to ₹599') {
        if (price < 399 || price > 599) return false;
      } else if (filters.priceRange === '599-799' || filters.priceRange === '₹599 to ₹799') {
        if (price < 599 || price > 799) return false;
      } else if (filters.priceRange === 'above-599') {
        if (price < 599) return false;
      }
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sort === 'Price Low to High') return a.price - b.price;
    if (filters.sort === 'Price High to Low') return b.price - a.price;
    if (filters.sort === 'New Arrivals') {
      if (a.isNewArrival && !b.isNewArrival) return -1;
      if (!a.isNewArrival && b.isNewArrival) return 1;
    }
    return 0;
  });

  const categoriesList = ['All', 'Necklace Sets', 'Chokers', 'Earrings', 'Temple Jewellery'];
  const priceRangesList = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹399', value: 'under-399' },
    { label: '₹399 – ₹599', value: '399-599' },
    { label: '₹599 – ₹799', value: '599-799' },
  ];
  const occasionsList = ['All', 'Festive', 'Wedding', 'Daily'];

  const activeFilterCount =
    (filters.category !== 'All' ? 1 : 0) +
    (filters.priceRange !== 'All' ? 1 : 0) +
    (filters.occasion !== 'All' ? 1 : 0);

  const FilterBlock = () => (
    <div className="space-y-5">
      {/* Category */}
      <div className="space-y-1.5">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C9933A]">Category</h4>
        <div className="flex flex-col gap-1">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              className={`text-left text-xs py-1.5 px-2.5 rounded-sm font-medium transition-all ${
                filters.category === cat
                  ? 'bg-[#1B6B5A] text-white font-bold'
                  : 'text-[#1A1A1A] hover:bg-[#1B3A2D]/5 hover:text-[#1B6B5A]'
              }`}
            >
              {cat === 'All' ? 'All Collections' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-1.5">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C9933A]">Price Range</h4>
        <div className="flex flex-col gap-1">
          {priceRangesList.map((range) => (
            <button
              key={range.value}
              onClick={() => handlePriceFilter(range.value)}
              className={`text-left text-xs py-1.5 px-2.5 rounded-sm font-medium transition-all ${
                filters.priceRange === range.value
                  ? 'bg-[#1B6B5A] text-white font-bold'
                  : 'text-[#1A1A1A] hover:bg-[#1B3A2D]/5 hover:text-[#1B6B5A]'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div className="space-y-1.5">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C9933A]">Occasion</h4>
        <div className="flex flex-col gap-1">
          {occasionsList.map((occ) => (
            <button
              key={occ}
              onClick={() => handleOccasionFilter(occ)}
              className={`text-left text-xs py-1.5 px-2.5 rounded-sm font-medium transition-all ${
                filters.occasion === occ || (occ === 'All' && filters.occasion === '')
                  ? 'bg-[#1B6B5A] text-white font-bold'
                  : 'text-[#1A1A1A] hover:bg-[#1B3A2D]/5 hover:text-[#1B6B5A]'
              }`}
            >
              {occ === 'All' ? 'All Occasions' : occ}
            </button>
          ))}
        </div>
      </div>

      {/* WhatsApp help */}
      <div className="p-4 rounded-md bg-[#1B3A2D] text-white text-center space-y-2 border border-[#C9933A]/20">
        <p className="text-[10px] text-white/75 leading-relaxed">Can't find a matching set? We'll search our live catalogue.</p>
        <a
          href="https://wa.me/919013114748?text=Hi!%20I%20am%20looking%20for%20a%20specific%20jewellery%20on%20My%20Zevar."
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-[#C9933A] hover:bg-white hover:text-[#1B3A2D] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );

  return (
    <div id="shop-page-wrapper" className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Page Header */}
      <div className="mb-6">
        <span className="text-[#C9933A] text-[10px] font-bold uppercase tracking-widest block">My Zevar Ethnic Catalogue</span>
        <h1 className="font-serif italic text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] mt-0.5">All Jewellery Sets</h1>
        <p className="text-xs text-[#555555] mt-1 max-w-md">
          Warm copper-gold finish, real-world weights, direct from curation.
        </p>
      </div>

      {/* Search + Sort + Mobile filter button */}
      <div className="flex flex-col sm:flex-row gap-2 mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <input
            id="search-input-field"
            type="text"
            placeholder="Search kundan, jhumka, choker…"
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full bg-white border border-[#C9933A]/20 rounded-md py-2.5 pl-9 pr-4 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#1B6B5A]"
          />
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          {filters.search && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
              className="absolute right-3 top-3 text-gray-400 hover:text-[#C9933A]"
            >
              <X size={14} />
            </button>
          )}
        </div>
        {/* Sort */}
        <select
          id="sorting-select-dropdown"
          value={filters.sort}
          onChange={handleSortChange}
          className="bg-white border border-[#C9933A]/25 rounded-md text-xs font-semibold py-2.5 px-3 focus:outline-none focus:border-[#1B6B5A] cursor-pointer sm:w-44"
        >
          <option value="Featured">Featured Sets</option>
          <option value="Price Low to High">Price: Low → High</option>
          <option value="Price High to Low">Price: High → Low</option>
          <option value="New Arrivals">What's New</option>
        </select>
        {/* Mobile Filter Trigger */}
        <button
          id="mobile-filters-trigger-btn"
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 bg-[#1B6B5A] text-white px-4 py-2.5 rounded-md text-xs font-bold cursor-pointer"
        >
          <Filter size={14} />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>

      {/* Active Filter Pills (mobile UX) */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.category !== 'All' && (
            <span className="flex items-center gap-1 bg-[#1B6B5A]/10 text-[#1B6B5A] text-[10px] font-bold px-2.5 py-1 rounded-full">
              {filters.category}
              <button onClick={() => handleCategoryFilter('All')} className="hover:text-red-600"><X size={10} /></button>
            </span>
          )}
          {filters.priceRange !== 'All' && (
            <span className="flex items-center gap-1 bg-[#1B6B5A]/10 text-[#1B6B5A] text-[10px] font-bold px-2.5 py-1 rounded-full">
              {priceRangesList.find(p => p.value === filters.priceRange)?.label}
              <button onClick={() => handlePriceFilter('All')} className="hover:text-red-600"><X size={10} /></button>
            </span>
          )}
          {filters.occasion !== 'All' && filters.occasion !== '' && (
            <span className="flex items-center gap-1 bg-[#1B6B5A]/10 text-[#1B6B5A] text-[10px] font-bold px-2.5 py-1 rounded-full">
              {filters.occasion}
              <button onClick={() => handleOccasionFilter('All')} className="hover:text-red-600"><X size={10} /></button>
            </span>
          )}
          <button onClick={resetFilters} className="flex items-center gap-1 text-[10px] text-red-600 font-bold hover:underline">
            <RotateCcw size={10} /> Clear All
          </button>
        </div>
      )}

      <div className="flex gap-6">

        {/* Desktop Sidebar */}
        <aside id="desktop-filters-panel" className="hidden lg:block w-52 shrink-0">
          <div className="bg-white border border-[#C9933A]/15 p-5 rounded-md shadow-sm sticky top-24">
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-[#C9933A]/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                <Filter size={13} className="text-[#C9933A]" /> Filters
              </h3>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="text-[10px] font-bold text-red-600 hover:text-[#C9933A] flex items-center gap-0.5 cursor-pointer">
                  <RotateCcw size={10} /> Clear
                </button>
              )}
            </div>
            <FilterBlock />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center text-xs text-[#555555] mb-4 pb-2 border-b border-[#C9933A]/10">
            <span className="font-semibold">{sortedProducts.length} items found</span>
            <span className="text-[10px] text-gray-400">Curated selections</span>
          </div>

          {sortedProducts.length === 0 ? (
            <div id="shop-empty-state-view" className="bg-white border border-[#C9933A]/15 rounded-md p-10 text-center max-w-md mx-auto my-4 shadow-sm">
              <h3 className="font-serif italic text-lg font-bold text-[#1A1A1A]">No matches found</h3>
              <p className="text-sm text-[#555555] mt-2 leading-relaxed">
                We couldn't find any sets matching your filters. Try adjusting or clearing them.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 bg-[#1B6B5A] text-white px-6 py-2.5 rounded-md text-xs font-bold hover:bg-[#C9933A] transition-colors uppercase tracking-wider cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {sortedProducts.map((product) => {
                const hasSale = !!product.originalPrice;
                const discountPct = hasSale ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;
                return (
                  <div
                    key={product.id}
                    className="group flex flex-col bg-white border border-[#C9933A]/10 hover:border-[#C9933A]/40 rounded-sm transition-all duration-200 hover:shadow-md relative"
                  >
                    {/* Image */}
                    <div onClick={() => openProduct(product.id)} className="relative aspect-square overflow-hidden bg-[#FAF7F2] cursor-pointer rounded-t-sm">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {product.images[1] && (
                        <img
                          src={product.images[1]}
                          alt={`${product.name} view 2`}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-400 select-none"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      {/* Top badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
                        {product.badge && (
                          <span className="bg-[#C9933A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide shadow-sm">
                            {product.badge}
                          </span>
                        )}
                        {hasSale && (
                          <span className="bg-[#1B6B5A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide shadow-sm">
                            -{discountPct}%
                          </span>
                        )}
                      </div>
                      {/* Rating */}
                      <div className="absolute top-2 right-2 z-20 bg-white/90 rounded-full px-1.5 py-0.5 flex items-center gap-0.5 shadow-sm">
                        <Star size={9} className="fill-[#C9933A] stroke-[#C9933A]" />
                        <span className="text-[9px] font-bold text-[#1A1A1A]">{product.rating}</span>
                      </div>
                      {/* Wishlist */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                        className="absolute bottom-2 right-2 z-20 w-7 h-7 rounded-full bg-white/95 shadow flex items-center justify-center active:scale-95 transition-transform"
                        title={isInWishlist(product.id) ? 'Remove from saved' : 'Save item'}
                      >
                        <Heart size={12} className={isInWishlist(product.id) ? 'fill-rose-600 text-rose-600' : 'text-gray-400'} />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-2.5 flex flex-col gap-1.5 flex-1">
                      <span className="text-[9px] text-[#C9933A] uppercase tracking-wider font-semibold leading-none">{product.category}</span>
                      <h3
                        onClick={() => openProduct(product.id)}
                        className="text-[11px] sm:text-xs font-medium text-[#1A1A1A] line-clamp-2 cursor-pointer leading-tight hover:text-[#1B6B5A] transition-colors"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[9px] text-[#555555] italic leading-tight line-clamp-1">For: {product.occasion}</p>
                      <div className="flex items-baseline gap-1.5 mt-auto">
                        <span className="text-sm font-extrabold text-[#1B6B5A]">₹{product.price}</span>
                        {hasSale && <span className="text-[10px] text-gray-400 line-through">₹{product.originalPrice}</span>}
                        <span className="text-[9px] text-gray-400 ml-auto">({product.reviewCount})</span>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-[#1B6B5A] active:bg-[#C9933A] hover:bg-[#C9933A] text-white text-[10px] sm:text-xs font-bold py-2 rounded-sm transition-colors cursor-pointer uppercase tracking-wide"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {sortedProducts.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-[10px] text-gray-500">Showing all {sortedProducts.length} in-stock sets.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative w-72 bg-white h-full overflow-y-auto flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#C9933A]/10 bg-[#FAF7F2]">
              <span className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-[#1A1A1A] hover:text-[#C9933A] p-1">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 flex-1">
              <FilterBlock />
            </div>
            <div className="p-4 border-t border-[#C9933A]/10 flex gap-2">
              <button onClick={() => { resetFilters(); setMobileFiltersOpen(false); }} className="flex-1 border border-[#1B6B5A] text-[#1B6B5A] py-2 text-xs font-bold rounded-sm uppercase tracking-wide">
                Clear
              </button>
              <button onClick={() => setMobileFiltersOpen(false)} className="flex-1 bg-[#1B6B5A] text-white py-2 text-xs font-bold rounded-sm uppercase tracking-wide">
                View {sortedProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
