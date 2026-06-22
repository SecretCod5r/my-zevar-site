import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getPlaceholderImage } from '../data/products';
import { Truck, RotateCcw, ShieldCheck, ArrowRight, Star, Heart, CheckCircle } from 'lucide-react';

export default function Home() {
  const { products, openProduct, addToCart, navigateTo, setFilters, resetFilters, toggleWishlist, isInWishlist } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filter bestselling products with smart fallbacks
  const rawBestsellers = products.filter(p => p.isBestseller);
  const bestsellers = rawBestsellers.length > 0 ? rawBestsellers.slice(0, 4) : products.slice(0, 4);

  // Filter new arrivals with smart fallbacks
  const rawNewArrivals = products.filter(p => p.isNewArrival);
  const newArrivals = rawNewArrivals.length > 0 
    ? rawNewArrivals.slice(0, 4) 
    : (products.length > 4 ? products.slice(4, 8) : products.slice(0, 4));

  // Occasion list actions
  const handleOccasionClick = (occasion: 'Festive' | 'Wedding' | 'Daily') => {
    resetFilters();
    setFilters(prev => ({ ...prev, occasion }));
    navigateTo('shop');
  };

  const handlePriceThresholdClick = (maxPrice: number) => {
    resetFilters();
    setFilters(prev => ({ ...prev, priceRange: `under-${maxPrice}` }));
    navigateTo('shop');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      const email = newsletterEmail.trim();
      const text = `✨ *New Newsletter Subscription!* ✨\n\n📧 *Email:* ${email}\n\n_Please send me discount codes, exclusive drops, and early deals on My Zevar hand-selected ethnic jewelry sets!_`;
      const waUrl = `https://wa.me/919013114748?text=${encodeURIComponent(text)}`;
      
      // Open in new tab
      window.open(waUrl, '_blank');
      
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  // Lifestyle image for hero: stunning real premium Indian gold jewelry photography
  const heroImage = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop';

  // Small mock background UGC photo elements
  const ugcSubImages = [
    { handle: '@nehal_24', title: 'Lovely Kundan Set', grad: 'bg-gradient-to-tr from-[#1B3A2D] to-[#C9933A]' },
    { handle: '@shreya.mehta', title: 'Daily wear stud look', grad: 'bg-gradient-to-tr from-[#213327] to-[#FAF7F2]/30' },
    { handle: '@tanya_sharma', title: 'Wedding guest temple set', grad: 'bg-gradient-to-tr from-[#413327] to-[#C9933A]' },
    { handle: '@kavya_rao', title: 'Stunning choker fit', grad: 'bg-gradient-to-tr from-[#C9933A] to-[#1B3A2D]' },
    { handle: '@ananya_patel', title: 'Festive Jhumka glow', grad: 'bg-gradient-to-tr from-[#1B6B5A] to-[#2D433A]' },
    { handle: '@priya.singh', title: 'Golden flower choker', grad: 'bg-gradient-to-tr from-[#11261E] to-[#FAF7F2]' }
  ];

  return (
    <div id="home-page-container" className="animate-fade-in space-y-16">
      
      {/* 1. HERO SECTION */}
      <section id="hero-banner-section" className="relative bg-[#FAF7F2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Descriptive Text & CTAs Left */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-6">
              <span className="inline-block bg-[#1B6B5A]/10 text-[#1B6B5A] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#1B6B5A]/15 font-accent-label">
                100% HYPOALLERGENIC & TARNISH-RESISTANT
              </span>
              
              <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-tight">
                Premium Indian Ethnic Jewellery
              </h1>
              
              <p className="text-sm sm:text-base text-[#555555] max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans font-medium">
                Explore hand-selected micro gold-plated Kundan chokers, matte-finish antique temple sets, and lightweight daily-wear earrings. Curated for authentic weight, hypoallergenic comfort, and direct-from-polishing-center pricing.
              </p>

              <div className="text-amber-700 font-bold text-sm bg-amber-500/10 inline-block px-4 py-2 rounded-md border border-amber-600/15">
                Traditional Sets Starting from <span className="text-[#1B6B5A] font-extrabold text-lg">₹299</span>
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  id="hero-cta-shop-now"
                  onClick={() => {
                    resetFilters();
                    navigateTo('shop');
                  }}
                  className="bg-[#1B6B5A] hover:bg-[#C9933A] text-white font-bold py-3.5 px-8 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C9933A] text-center cursor-pointer font-sans text-sm uppercase tracking-wider"
                >
                  Shop All Sets
                </button>
                <button
                  id="hero-cta-view-cols"
                  onClick={() => {
                    resetFilters();
                    setFilters(prev => ({ ...prev, sort: 'Featured' }));
                    navigateTo('shop');
                  }}
                  className="border border-[#1B3A2D]/35 text-[#1B3A2D] hover:bg-[#1B3A2D]/5 font-bold py-3.5 px-8 rounded-sm transition-all duration-200 text-center cursor-pointer font-sans text-sm uppercase tracking-wider"
                >
                  View Collections
                </button>
              </div>
            </div>

            {/* Premium Lifestyle Image Placeholder Right */}
            <div className="lg:col-span-7">
              <div className="relative rounded-lg overflow-hidden border border-[#C9933A]/25 shadow-xl aspect-[16/10] bg-[#1B3A2D]/10">
                <img 
                  src={heroImage} 
                  alt="Gold Plated Indian Kundan Choker Necklace Set styled on a model" 
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white text-xs sm:text-sm font-sans flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span>Live Showcase: Real-toned gold-plated sets are active now</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* TRUST STRIP BAR */}
        <div className="bg-[#1B3A2D] text-white py-4 border-y border-[#C9933A]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              
              <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-3.5 pt-4 sm:pt-0">
                <Truck className="text-[#C9933A] shrink-0" size={24} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9933A] font-sans">Free Express Delivery</h4>
                  <p className="text-[10px] text-[#FAF7F2]/80 mt-0.5">Dispatched in 24 hrs via Bluedart/Delhivery (Free over ₹499)</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-3.5 pt-4 sm:pt-0">
                <RotateCcw className="text-[#C9933A] shrink-0" size={22} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9933A] font-sans">24-Hour Return Guarantee</h4>
                  <p className="text-[10px] text-[#FAF7F2]/80 mt-0.5">Hassle-free exchange options directly via WhatsApp support</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-3.5 pt-4 sm:pt-0">
                <ShieldCheck className="text-[#C9933A] shrink-0" size={23} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9933A] font-sans">Prepaid & Secure UPI</h4>
                  <p className="text-[10px] text-[#FAF7F2]/80 mt-0.5">100% secure checkout and instant digital payment options</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. OCCASION COLLECTIONS GRID */}
      <section id="occasion-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center space-y-2 mb-10">
          <h2 className="font-serif italic text-3xl font-bold text-[#1A1A1A]">Shop by Occasion</h2>
          <p className="text-sm text-[#555555] max-w-md mx-auto">
            Choose carefully curated pieces made to shine under specific celebrations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Festive */}
          <div 
            onClick={() => handleOccasionClick('Festive')}
            className="group relative h-48 sm:h-64 rounded-md overflow-hidden border border-[#C9933A]/10 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#C9933A]/20 group-hover:bg-[#C9933A]/10 transition-all duration-300 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop" 
              alt="Festive Collection" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-4 z-20">
              <h3 className="font-serif italic text-lg sm:text-xl font-bold text-white group-hover:text-[#C9933A] transition-colors">Festive Special</h3>
              <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-wider">Pooja & Diwali Ready</p>
            </div>
          </div>

          {/* Wedding Guest */}
          <div 
            onClick={() => handleOccasionClick('Wedding')}
            className="group relative h-48 sm:h-64 rounded-md overflow-hidden border border-[#C9933A]/10 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#1B3A2D]/15 group-hover:bg-[#1B3A2D]/5 transition-all duration-300 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop" 
              alt="Wedding Guest collection" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-4 z-20">
              <h3 className="font-serif italic text-lg sm:text-xl font-bold text-white group-hover:text-[#C9933A] transition-colors">Wedding Guest</h3>
              <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-wider">Elegant & Heavy Looks</p>
            </div>
          </div>

          {/* Daily Wear */}
          <div 
            onClick={() => handleOccasionClick('Daily')}
            className="group relative h-48 sm:h-64 rounded-md overflow-hidden border border-[#C9933A]/10 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#1B3A2D]/5 group-hover:bg-transparent transition-all duration-300 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" 
              alt="Daily Wear Collection" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-4 z-20">
              <h3 className="font-serif italic text-lg sm:text-xl font-bold text-white group-hover:text-[#C9933A] transition-colors">Daily Wear</h3>
              <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-wider">Office & Kurta Friendly</p>
            </div>
          </div>

          {/* Under Rs 499 */}
          <div 
            onClick={() => handlePriceThresholdClick(499)}
            className="group relative h-48 sm:h-64 rounded-md overflow-hidden border-2 border-dashed border-[#C9933A]/50 bg-[#1B3A2D] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1B3A2D] to-transparent group-hover:bg-black/10 transition-all duration-300 z-15" />
            <div className="absolute right-3 top-3 bg-[#C9933A] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide z-20">
              SALE TAG
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-between p-5 z-20">
              <div />
              <div>
                <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-white">Under ₹499</h3>
                <p className="text-[11px] text-[#C9933A] font-medium leading-relaxed mt-1">
                  Budget ethnic gems. No compromise on quality. Buy now!
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. OUR BESTSELLERS SECTION */}
      <section id="bestsellers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-[#FAF7F2]">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4 border-b border-[#C9933A]/10 pb-4">
          <div>
            <span className="text-[#1B6B5A] text-xs font-bold uppercase tracking-wider">TOP FAVORITES</span>
            <h2 className="font-serif italic text-3xl font-bold text-[#1A1A1A] mt-1">Our Bestsellers</h2>
          </div>
          <button 
            id="view-all-bestsellers-btn"
            onClick={() => {
              resetFilters();
              setFilters(prev => ({ ...prev, sort: 'Featured' }));
              navigateTo('shop');
            }}
            className="text-xs font-bold text-[#1B6B5A] hover:text-[#C9933A] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All Bestsellers</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4 Cards Grid / Mobile Sideways Horizontal Scroll */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth">
          {bestsellers.map(product => {
            const hasSale = !!product.originalPrice;
            const discountPct = hasSale ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;
            
            return (
              <div 
                key={product.id}
                className="group flex flex-col justify-between bg-white border border-[#C9933A]/10 hover:border-[#C9933A] rounded-sm p-3.5 transition-all duration-300 relative hover:shadow-lg"
              >
                {/* Badges */}
                <div className="absolute top-3.5 left-3.5 z-20 flex flex-col gap-1">
                  {product.badge && (
                    <span className="bg-[#C9933A] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  {hasSale && (
                    <span className="bg-[#1B6B5A] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-sm">
                      {discountPct}% OFF
                    </span>
                  )}
                </div>

                {/* Rating overlay badge */}
                <div className="absolute top-3.5 right-3.5 z-20 bg-[#FAF7F2]/90 backdrop-blur-xs rounded-full px-1.5 py-0.5 text-[9px] font-bold text-[#1A1A1A] flex items-center gap-0.5 shadow-xs">
                  <Star size={9.5} className="fill-[#C9933A] stroke-[#C9933A]" />
                  <span>{product.rating}</span>
                </div>

                {/* Product Image Wrapper */}
                <div 
                  onClick={() => openProduct(product.id)}
                  className="aspect-square w-full rounded-sm overflow-hidden bg-[#FAF7F2] relative cursor-pointer"
                >
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
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
                      className={isInWishlist(product.id) ? "fill-rose-600 text-rose-600 animate-pulse" : "text-gray-500 hover:text-rose-600 transition-colors"} 
                    />
                  </button>
                  {/* Quick look gradient hover */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="bg-white/95 backdrop-blur-sm text-xs font-semibold text-[#1A1A1A] px-3.5 py-2.5 rounded-sm shadow-sm hover:bg-[#1B6B5A] hover:text-white transition-colors duration-200">
                      Quick Details
                    </span>
                  </div>
                </div>

                {/* Product Info below image */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#C9933A] uppercase tracking-wider font-semibold font-sans">
                      {product.category}
                    </span>
                    <h3 
                      onClick={() => openProduct(product.id)}
                      className="text-xs sm:text-sm font-medium text-[#1A1A1A] line-clamp-1 hover:text-[#1B6B5A] cursor-pointer mt-0.5"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#C9933A]/10">
                    <div className="flex items-baseline justify-between">
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
                      <span className="text-[10px] text-gray-400 font-medium">({product.reviewCount} Reviews)</span>
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
      </section>

      {/* 4. VALUE PROPOSITION & BRAND PROMISE SECTION -(Forest Green Background) */}
      <section id="value-prop-section" className="bg-[#1B3A2D] text-white py-16 border-y border-[#C9933A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-[#C9933A] text-xs font-bold uppercase tracking-widest block font-accent-label">
              CRAFTSMANSHIP & METALLURGY
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl font-extrabold text-[#FAF7F2] leading-tight">
              Guaranteed Material Integrity
            </h2>
            <p className="text-sm text-[#FAF7F2]/80 max-w-xl mx-auto font-sans font-medium">
              We focus on premium durability and tarnish-free plating, offering micro gold-plated sets you can wear with absolute confidence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left bg-white/5 border border-white/10 rounded-lg p-8">
            <div className="space-y-1">
              <h4 className="font-bold text-[#C9933A] uppercase tracking-wider text-[10px]">Real-Weight Base Alloy</h4>
              <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-medium">We use a premium copper-brass metal base. This gives our chokers and jhumkas the satisfying, substantial weight of real gold jewellery, instead of light, cheap plastic alternatives.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[#C9933A] uppercase tracking-wider text-[10px]">18k Micro-Gold Plating</h4>
              <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-medium">Our pieces are micro-plated with a warm 18k gold tone and treated with an anti-tarnish protective lacquer to ensure long-lasting lustre and resistance to oxidation.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[#C9933A] uppercase tracking-wider text-[10px]">100% Skin Safe & Hypoallergenic</h4>
              <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-medium">Free from harmful Lead, Nickel, or Cadmium. Our jewellery is certified safe for long Indian wedding events and sensitive skin types.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[#C9933A] uppercase tracking-wider text-[10px]">Premium Protective Packaging</h4>
              <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-medium">Every set is packaged in bubble wrap inside a rigid cardboard container and includes a custom soft suede storage pouch to prevent scratch friction.</p>
            </div>
          </div>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/10">
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider font-sans">6-Month Polish Warranty Standard</span>
            <button
              id="value-prop-action-btn"
              onClick={() => {
                resetFilters();
                navigateTo('shop');
              }}
              className="bg-[#C9933A] hover:bg-[#FAF7F2] hover:text-[#1B3A2D] text-white font-bold py-3.5 px-8 rounded-sm transition-all duration-300 text-[10px] uppercase tracking-wider cursor-pointer btn-gold font-sans"
            >
              Shop the Collection
            </button>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS ("Just In") SECTION */}
      <section id="new-arrivals-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4 border-b border-[#C9933A]/10 pb-4">
          <div>
            <span className="text-[#1B6B5A] text-xs font-bold uppercase tracking-wider">FRESH LAUNCHES</span>
            <h2 className="font-serif italic text-3xl font-bold text-[#1A1A1A] mt-1">Just In</h2>
          </div>
          <button 
            id="view-all-new-arrivals-btn"
            onClick={() => {
              resetFilters();
              setFilters(prev => ({ ...prev, sort: 'New Arrivals' }));
              navigateTo('shop');
            }}
            className="text-xs font-bold text-[#1B6B5A] hover:text-[#C9933A] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All New Arrivals</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4 Cards Grid / Mobile Sideways Horizontal Scroll */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth">
          {newArrivals.map(product => {
            const hasSale = !!product.originalPrice;
            const discountPct = hasSale ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;
            
            return (
              <div 
                key={product.id}
                className="group flex flex-col justify-between bg-white border border-[#C9933A]/10 hover:border-[#C9933A] rounded-sm p-3.5 transition-all duration-300 relative hover:shadow-lg"
              >
                {/* Badges */}
                <div className="absolute top-3.5 left-3.5 z-20 flex flex-col gap-1">
                  <span className="bg-[#1B6B5A] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-sm">
                    Just In
                  </span>
                  {hasSale && (
                    <span className="bg-[#C9933A] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-sm">
                      {discountPct}% OFF
                    </span>
                  )}
                </div>

                {/* Rating overlay badge */}
                <div className="absolute top-3.5 right-3.5 z-20 bg-[#FAF7F2]/90 backdrop-blur-xs rounded-full px-1.5 py-0.5 text-[9px] font-bold text-[#1A1A1A] flex items-center gap-0.5 shadow-xs">
                  <Star size={9.5} className="fill-[#C9933A] stroke-[#C9933A]" />
                  <span>{product.rating}</span>
                </div>

                {/* Product Image Wrapper */}
                <div 
                  onClick={() => openProduct(product.id)}
                  className="aspect-square w-full rounded-sm overflow-hidden bg-[#FAF7F2] relative cursor-pointer"
                >
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
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
                      className={isInWishlist(product.id) ? "fill-rose-600 text-rose-600 animate-pulse" : "text-gray-500 hover:text-rose-600 transition-colors"} 
                    />
                  </button>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="bg-white/95 backdrop-blur-sm text-xs font-semibold text-[#1A1A1A] px-3.5 py-2.5 rounded-sm shadow-sm hover:bg-[#1B6B5A] hover:text-white transition-colors duration-200">
                      Quick Details
                    </span>
                  </div>
                </div>

                {/* Product Info below image */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#C9933A] uppercase tracking-wider font-semibold font-sans">
                      {product.category}
                    </span>
                    <h3 
                      onClick={() => openProduct(product.id)}
                      className="text-xs sm:text-sm font-medium text-[#1A1A1A] line-clamp-1 hover:text-[#1B6B5A] cursor-pointer mt-0.5"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#C9933A]/10">
                    <div className="flex items-baseline justify-between">
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
                      <span className="text-[10px] text-gray-400 font-medium">({product.reviewCount} Reviews)</span>
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
      </section>

      {/* 5.5 CUSTOMER REVIEWS & TESTIMONIALS SECTION */}
      <section id="homepage-testimonials-section" className="bg-[#FAF7F2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[#1B6B5A] text-xs font-bold uppercase tracking-widest block font-accent-label">WHAT OUR CUSTOMERS SAY</span>
          <h2 className="font-serif italic text-3xl font-bold text-[#1A1A1A]">Loved by 15,000+ Happy Customers</h2>
          <p className="text-sm text-[#555555] max-w-md mx-auto">
            See why women across India choose My Zevar for weddings, office wear, and family celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#C9933A]/10 p-6 rounded-md shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#1A1A1A]">Anjali Sharma, Pune</span>
              <span className="bg-emerald-50 text-emerald-800 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">Verified Buyer</span>
            </div>
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={13} className="fill-[#C9933A] stroke-[#C9933A]" />
              ))}
            </div>
            <p className="text-xs text-[#555555] leading-relaxed italic">
              "Absolutely brilliant piece! It looks extremely rich and premium. The gold polish is perfect, not too bright, and the adjustable thread is so useful because I have a slightly thicker neck. Wore it to a cousin’s pre-wedding function and got 10+ compliments!"
            </p>
            <p className="text-[10px] text-[#C9933A] font-bold uppercase tracking-wider">Purchased: Kundan Choker Set</p>
          </div>

          <div className="bg-white border border-[#C9933A]/10 p-6 rounded-md shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#1A1A1A]">Kavitha S., Chennai</span>
              <span className="bg-emerald-50 text-emerald-800 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">Verified Buyer</span>
            </div>
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={13} className="fill-[#C9933A] stroke-[#C9933A]" />
              ))}
            </div>
            <p className="text-xs text-[#555555] leading-relaxed italic">
              "Stunning antique finish. It has that matte, dark red-gold temple jewellery vibe that I’ve been searching for. Looks just like the real gold set my mother has. Weight is solid but non-pinching."
            </p>
            <p className="text-[10px] text-[#C9933A] font-bold uppercase tracking-wider">Purchased: Temple Lakshmi Antique Set</p>
          </div>

          <div className="bg-white border border-[#C9933A]/10 p-6 rounded-md shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#1A1A1A]">Roshni Singh, Bangalore</span>
              <span className="bg-emerald-50 text-emerald-800 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">Verified Buyer</span>
            </div>
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={13} className="fill-[#C9933A] stroke-[#C9933A]" />
              ))}
            </div>
            <p className="text-xs text-[#555555] leading-relaxed italic">
              "I wear these jhumkas to office almost daily now. They are so lightweight I literally forget I’m wearing them. The packaging is high-class and would make a great gift. Buy them without thinking twice!"
            </p>
            <p className="text-[10px] text-[#C9933A] font-bold uppercase tracking-wider">Purchased: Floral Jhumka Earrings</p>
          </div>
        </div>
      </section>


      {/* 7. EMAIL CAPTURE SECTION */}
      <section id="email-form-section" className="max-w-4xl mx-auto px-4 py-12 rounded-lg bg-[#1B3A2D]/5 border border-[#C9933A]/20">
        <div className="text-center max-w-lg mx-auto space-y-4">
          <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Get first access to new arrivals
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            No spam. Just early drops, exclusive deals on festive collections, and secret ₹299 coupon alerts.
          </p>

          {newsletterSubscribed ? (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-md p-4 text-xs font-semibold flex items-center justify-center gap-2 animate-slide-up">
              <CheckCircle className="text-emerald-700 shrink-0" size={18} />
              <span>You're on the list! Check your inbox for early access.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5 mt-4">
              <input
                id="newsletter-email-input"
                type="email"
                required
                placeholder="Enter your email (e.g. aditi@gmail.com)"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#C9933A]/30 rounded-sm px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1B6B5A]"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="bg-[#1B6B5A] hover:bg-[#C9933A] text-white font-bold py-3 px-6 rounded-sm text-sm shrink-0 uppercase tracking-wider transition-colors duration-200 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-[10px] text-gray-400">Join 15,000+ Indian women who shop clever.</p>
        </div>
      </section>

    </div>
  );
}
