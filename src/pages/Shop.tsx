import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Filter, Search, RotateCcw, ArrowUpDown, Star, Grid, Heart } from 'lucide-react';
import { Product } from '../types';

export default function Shop() {
  const { products, openProduct, addToCart, filters, setFilters, resetFilters, toggleWishlist, isInWishlist } = useApp();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Parse filters
  const handleCategoryFilter = (cat: string) => {
    setFilters(prev => ({ ...prev, category: cat }));
  };

  const handlePriceFilter = (range: string) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const handleOccasionFilter = (occ: string) => {
    setFilters(prev => ({ ...prev, occasion: occ }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, sort: e.target.value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  // 1. Apply Filtering Logic
  let filteredProducts = products.filter((product) => {
    // Search match
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!product.name.toLowerCase().includes(q) && !product.category.toLowerCase().includes(q)) {
        return false;
      }
    }

    // Category filter matching
    if (filters.category !== 'All') {
      if (product.category !== filters.category) return false;
    }

    // Occasion filter matching
    if (filters.occasion !== 'All' && filters.occasion !== '') {
      if (product.occasion.toLowerCase() !== filters.occasion.toLowerCase()) return false;
    }

    // Price range filter matching
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

  // 2. Apply Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sort === 'Price Low to High') {
      return a.price - b.price;
    }
    if (filters.sort === 'Price High to Low') {
      return b.price - a.price;
    }
    if (filters.sort === 'New Arrivals') {
      // Sort items marked as isNewArrival first, or sort by id fallback
      if (a.isNewArrival && !b.isNewArrival) return -1;
      if (!a.isNewArrival && b.isNewArrival) return 1;
    }
    // 'Featured' / Default
    return 0; 
  });

  // Unique categories for the filter sidebar list
  const categoriesList = ['All', 'Necklace Sets', 'Chokers', 'Earrings', 'Temple Jewellery'];
  const priceRangesList = [
    { label: 'All Pyar Prices', value: 'All' },
    { label: 'Under ₹399', value: 'under-399' },
    { label: '₹399 to ₹599', value: '399-599' },
    { label: '₹599 to ₹799', value: '599-799' }
  ];
  const occasionsList = ['All', 'Festive', 'Wedding', 'Daily'];

  return (
    <div id="shop-page-wrapper" className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Decorative Branding Header */}
      <div className="text-center space-y-2 mb-10">
        <span className="text-[#C9933A] text-xs font-bold uppercase tracking-widest block font-medium">✨ MY ZEVAR ETHNIC CATALOGUE ✨</span>
        <h1 className="font-serif italic text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">Every Occasion Curated Sets</h1>
        <p className="text-sm text-[#555555] max-w-md mx-auto">
          Warm copper-gold finish, real-world weights, and custom designs under direct expert curation.
        </p>
      </div>

      {/* Top Search and Sort Bar */}
      <div className="bg-white border border-[#C9933A]/10 p-4 rounded-md mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        
        {/* Search Bar Input */}
        <div className="relative w-full md:max-w-md">
          <input
            id="search-input-field"
            type="text"
            placeholder="Search kundan, jhumka, choker sets..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full bg-[#FAF7F2] border border-[#C9933A]/20 rounded-md py-2.5 pl-10 pr-4 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#1B6B5A]"
          />
          <Search size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
        </div>

        {/* Filters Button (Mobile) & Sort select */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 shrink-0">
          <button
            id="mobile-filters-trigger-btn"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center gap-2 bg-[#1B6B5A]/10 text-[#1B6B5A] px-4 py-2.5 rounded-md text-xs font-bold cursor-pointer transition-colors hover:bg-[#1B6B5A]/20"
          >
            <Filter size={14} />
            <span>Filters ({
              (filters.category !== 'All' ? 1 : 0) + 
              (filters.priceRange !== 'All' ? 1 : 0) + 
              (filters.occasion !== 'All' ? 1 : 0)
            })</span>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#555555] font-semibold invisible md:visible">Sort by:</span>
            <select
              id="sorting-select-dropdown"
              value={filters.sort}
              onChange={handleSortChange}
              className="bg-[#FAF7F2] border border-[#C9933A]/25 rounded-md text-xs font-semibold py-2.5 px-3 focus:outline-none focus:border-[#1B6B5A] cursor-pointer"
            >
              <option value="Featured">Featured Sets</option>
              <option value="Price Low to High">Price: Low to High</option>
              <option value="Price High to Low">Price: High to Low</option>
              <option value="New Arrivals">What's New</option>
            </select>
          </div>
        </div>

      </div>

      {/* Main Container: Column components */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP SIDEBAR FILTERS (Visible on LG sizes) */}
        <div id="desktop-filters-panel" className="hidden lg:block space-y-6">
          <div className="bg-white border border-[#C9933A]/15 p-6 rounded-md space-y-6 shadow-sm sticky top-28">
            
            {/* Header reset button */}
            <div className="flex justify-between items-center pb-3 border-b border-[#C9933A]/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1">
                <Filter size={14} className="text-[#C9933A]" />
                <span>Filters</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-red-600 hover:text-[#C9933A] flex items-center gap-1 cursor-pointer transition-colors"
                aria-label="Clear all parameters"
              >
                <RotateCcw size={11} />
                <span>Clear All</span>
              </button>
            </div>

            {/* Category Filter Group */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9933A]">Category</h4>
              <div className="flex flex-col space-y-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryFilter(cat)}
                    className={`text-left text-xs py-1.5 px-2.5 rounded-sm font-medium transition-all duration-150 ${
                      filters.category === cat 
                        ? 'bg-[#1B6B5A] text-white font-bold' 
                        : 'text-[#1A1A1A] hover:bg-[#1B3A2D]/5 hover:text-[#1B6B5A]'
                    }`}
                  >
                    {cat === 'All' ? '✨ All Collections' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter Group */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9933A]">Price Range</h4>
              <div className="flex flex-col space-y-1.5">
                {priceRangesList.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => handlePriceFilter(range.value)}
                    className={`text-left text-xs py-1.5 px-2.5 rounded-sm font-medium transition-all duration-150 ${
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

            {/* Occasion Filter Group */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9933A]">Occasion</h4>
              <div className="flex flex-col space-y-1.5">
                {occasionsList.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => handleOccasionFilter(occ)}
                    className={`text-left text-xs py-1.5 px-2.5 rounded-sm font-medium transition-all duration-150 ${
                      filters.occasion === occ || (occ === 'All' && filters.occasion === '')
                        ? 'bg-[#1B6B5A] text-white font-bold' 
                        : 'text-[#1A1A1A] hover:bg-[#1B3A2D]/5 hover:text-[#1B6B5A]'
                    }`}
                  >
                    {occ === 'All' ? '🌟 All Occasions' : occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Callout in sidebar */}
            <div className="p-4 rounded-md bg-[#1B3A2D] text-white text-center space-y-2.5 border border-[#C9933A]/20">
              <p className="text-[11px] leading-relaxed text-[#FAF7F2]/80">
                Can't find a matching set? We can search other catalog files live.
              </p>
              <a 
                href="https://wa.me/919013114748?text=Hi!%20I%20am%20looking%20for%20a%20specific%20jewellery%20on%20My%20Zevar."
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#C9933A] hover:bg-white hover:text-[#1B3A2D] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all"
              >
                Chat on WhatsApp 📲
              </a>
            </div>

          </div>
        </div>

        {/* MOBILE COLLAPSIBLE FILTERS PANEL (Collapsible Card Overlay) */}
        {mobileFiltersOpen && (
          <div id="mobile-filters-drawer" className="lg:hidden bg-white border border-[#C9933A]/30 p-5 rounded-md mb-6 space-y-5 shadow-inner">
            <div className="flex justify-between items-center pb-2.5 border-b border-gray-100">
              <span className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-widest pl-2">Modify Filters</span>
              <button 
                onClick={resetFilters} 
                className="text-[10px] text-red-600 font-bold flex items-center gap-1"
              >
                <RotateCcw size={10} /> Clear Filters
              </button>
            </div>

            {/* Categories Mobile Toggle Grid */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#C9933A] mb-2">Category</p>
              <div className="flex flex-wrap gap-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryFilter(cat)}
                    className={`text-xs px-3 py-1.5 rounded-sm font-medium transition-colors ${
                      filters.category === cat 
                        ? 'bg-[#1B6B5A] text-white font-bold' 
                        : 'bg-[#FAF7F2] border border-[#C9933A]/15 text-[#1A1A1A]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Mobile Toggle Grid */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#C9933A] mb-2">Price Ranges</p>
              <div className="flex flex-wrap gap-1.5">
                {priceRangesList.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => handlePriceFilter(range.value)}
                    className={`text-xs px-3 py-1.5 rounded-sm font-medium transition-colors ${
                      filters.priceRange === range.value 
                        ? 'bg-[#1B6B5A] text-white font-bold' 
                        : 'bg-[#FAF7F2] border border-[#C9933A]/15 text-[#1A1A1A]'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasions Mobile Toggle Grid */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#C9933A] mb-2">Occasions</p>
              <div className="flex flex-wrap gap-1.5">
                {occasionsList.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => handleOccasionFilter(occ)}
                    className={`text-xs px-3 py-1.5 rounded-sm font-medium transition-colors ${
                      filters.occasion === occ || (occ === 'All' && filters.occasion === '')
                        ? 'bg-[#1B6B5A] text-white font-bold' 
                        : 'bg-[#FAF7F2] border border-[#C9933A]/15 text-[#1A1A1A]'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full bg-[#1B3A2D] hover:bg-[#C9933A] text-white py-2 text-xs font-bold rounded-sm uppercase tracking-wide"
            >
              Apply Applied Filters
            </button>
          </div>
        )}

        {/* 3. PRODUCT CATALOG GRID */}
        <div className="lg:col-span-3">
          
          {/* Result Counts banner information */}
          <div className="flex justify-between items-center text-xs text-[#555555] mb-5 border-b border-[#C9933A]/10 pb-2 pl-1">
            <span className="font-semibold">{sortedProducts.length} items found</span>
            <span>Showing curated selections</span>
          </div>

          {/* Empty state view */}
          {sortedProducts.length === 0 ? (
            <div 
              id="shop-empty-state-view" 
              className="bg-white border border-[#C9933A]/15 rounded-md p-12 text-center max-w-lg mx-auto my-6 shadow-sm"
            >
              <span className="text-4xl block mb-4">✨</span>
              <h3 className="font-serif italic text-xl font-bold text-[#1A1A1A]">No matches found</h3>
              <p className="text-sm text-[#555555] mt-2 leading-relaxed">
                We couldn't find any jewellery sets matching your current filters. Tap the button below to view our entire catalogue.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 bg-[#1B6B5A] text-white px-6 py-2.5 rounded-md text-xs font-bold hover:bg-[#C9933A] transition-colors uppercase tracking-wider cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Layout Grid of cards */
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {sortedProducts.map((product) => {
                const hasSale = !!product.originalPrice;
                const discountPct = hasSale ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;
                
                return (
                  <div 
                    key={product.id}
                    className="group flex flex-col justify-between bg-white border border-[#C9933A]/10 hover:border-[#C9933A] rounded-sm p-3.5 transition-all duration-300 relative hover:shadow-lg"
                  >
                    {/* Badge */}
                    <div className="absolute top-3.5 left-3.5 z-20 flex flex-col gap-1">
                      {product.badge && (
                        <span className="bg-[#C9933A] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-sm">
                          {product.badge}
                        </span>
                      )}
                      {hasSale && (
                        <span className="bg-[#1B6B5A] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-sm">
                          {discountPct}% OFF
                        </span>
                      )}
                    </div>

                    {/* Rating overlay badge */}
                    <div className="absolute top-3.5 right-3.5 z-20 bg-[#FAF7F2]/90 backdrop-blur-xs rounded-full px-1.5 py-0.5 text-[9px] font-bold text-[#1A1A1A] flex items-center gap-0.5 shadow-xs">
                      <Star size={9.5} className="fill-[#C9933A] stroke-[#C9933A]" />
                      <span>{product.rating}</span>
                    </div>

                    {/* Product Image */}
                    <div 
                      onClick={() => openProduct(product.id)}
                      className="aspect-square w-full rounded-sm overflow-hidden bg-[#FAF7F2] relative cursor-pointer"
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {/* Secondary image hover angle trigger if present */}
                      {product.images[1] && (
                        <img 
                          src={product.images[1]} 
                          alt={`${product.name} secondary angle`} 
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 select-none"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      
                      {/* Heart Wishlist Overlay button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className="absolute top-2.5 right-2.5 z-30 w-7.5 h-7.5 rounded-full bg-white/95 backdrop-blur-xs shadow-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-[#C9933A] border border-[#C9933A]/10"
                        title={isInWishlist(product.id) ? "Remove from saved items" : "Save item"}
                      >
                        <Heart 
                          size={13} 
                          className={isInWishlist(product.id) ? "fill-rose-600 text-rose-600" : "text-gray-500 hover:text-rose-600 transition-colors"} 
                        />
                      </button>
                      
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <span className="bg-white/95 backdrop-blur-sm text-xs font-semibold text-[#1A1A1A] px-3.5 py-2.5 rounded-sm shadow-sm hover:bg-[#1B6B5A] hover:text-white transition-colors duration-200">
                          View details
                        </span>
                      </div>
                    </div>

                    {/* Information panel */}
                    <div className="mt-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-[#C9933A] uppercase tracking-wider font-semibold font-sans">
                          {product.category}
                        </span>
                        <h3 
                          onClick={() => openProduct(product.id)}
                          className="text-xs sm:text-sm font-medium text-[#1A1A1A] line-clamp-2 hover:text-[#1B6B5A] cursor-pointer mt-0.5"
                        >
                          {product.name}
                        </h3>
                        <p className="text-[10px] text-[#555555] line-clamp-1 italic mt-1 font-sans">
                          🎉 Perfect for: {product.occasion} occasions
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#C9933A]/10">
                        <div className="flex items-baseline justify-between gap-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm sm:text-base font-bold text-[#1B6B5A]">
                              ₹{product.price}
                            </span>
                            {hasSale && (
                              <span className="text-xs text-gray-400 line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium">({product.reviewCount})</span>
                        </div>

                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full mt-3 bg-[#1B6B5A] hover:bg-[#C9933A] hover:text-white text-white text-xs font-bold py-2 px-3 rounded-sm transition-all duration-300 cursor-pointer"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* Simple Mock Pagination details */}
          {sortedProducts.length > 0 && (
            <div className="mt-12 text-center space-y-3">
              <p className="text-[11px] text-gray-600">Showing all premium {sortedProducts.length} curated jewellery items.</p>
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-2.5 h-1 px-3 bg-[#1B6B5A] rounded-sm" />
                <span className="text-xs font-bold text-[#1B6B5A]">Loaded All In-Stock Sets</span>
                <span className="w-2.5 h-1 px-3 bg-[#1B6B5A] rounded-sm" />
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
