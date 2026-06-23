import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getPlaceholderImage } from '../data/products';
import { Truck, RotateCcw, ShieldCheck, ArrowRight, Star, Heart, CheckCircle, Zap, Phone } from 'lucide-react';

// Reusable compact product card for mobile
function ProductCard({ product, onOpen, onAdd, onWishlist, isWished, badge }: {
  product: any;
  onOpen: () => void;
  onAdd: () => void;
  onWishlist: () => void;
  isWished: boolean;
  badge?: string;
}) {
  const hasSale = !!product.originalPrice;
  const discountPct = hasSale ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="group flex flex-col bg-white border border-[#C9933A]/10 hover:border-[#C9933A]/40 rounded-sm transition-all duration-200 hover:shadow-md relative">
      {/* Image */}
      <div onClick={onOpen} className="relative aspect-square overflow-hidden bg-[#FAF7F2] cursor-pointer rounded-t-sm">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Badges top-left */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
          {(badge || product.badge) && (
            <span className="bg-[#C9933A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide shadow-sm">
              {badge || product.badge}
            </span>
          )}
          {hasSale && (
            <span className="bg-[#1B6B5A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide shadow-sm">
              -{discountPct}%
            </span>
          )}
        </div>
        {/* Rating top-right */}
        <div className="absolute top-2 right-2 z-20 bg-white/90 rounded-full px-1.5 py-0.5 flex items-center gap-0.5 shadow-sm">
          <Star size={9} className="fill-[#C9933A] stroke-[#C9933A]" />
          <span className="text-[9px] font-bold text-[#1A1A1A]">{product.rating}</span>
        </div>
        {/* Wishlist btn */}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(); }}
          className="absolute bottom-2 right-2 z-20 w-7 h-7 rounded-full bg-white/95 shadow flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Save to wishlist"
        >
          <Heart size={12} className={isWished ? 'fill-rose-600 text-rose-600' : 'text-gray-400'} />
        </button>
      </div>
      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1.5 flex-1">
        <span className="text-[9px] text-[#C9933A] uppercase tracking-wider font-semibold leading-none">{product.category}</span>
        <h3 onClick={onOpen} className="text-[11px] sm:text-xs font-medium text-[#1A1A1A] line-clamp-2 cursor-pointer leading-tight hover:text-[#1B6B5A] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-1.5 mt-auto">
          <span className="text-sm font-extrabold text-[#1B6B5A]">₹{product.price}</span>
          {hasSale && <span className="text-[10px] text-gray-400 line-through">₹{product.originalPrice}</span>}
          <span className="text-[9px] text-gray-400 ml-auto">({product.reviewCount})</span>
        </div>
        <button
          onClick={onAdd}
          className="w-full bg-[#1B6B5A] active:bg-[#C9933A] hover:bg-[#C9933A] text-white text-[10px] sm:text-xs font-bold py-2 rounded-sm transition-colors duration-200 cursor-pointer uppercase tracking-wide"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const { products, openProduct, addToCart, navigateTo, setFilters, resetFilters, toggleWishlist, isInWishlist } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const rawBestsellers = products.filter(p => p.isBestseller);
  const bestsellers = rawBestsellers.length > 0 ? rawBestsellers.slice(0, 4) : products.slice(0, 4);

  const rawNewArrivals = products.filter(p => p.isNewArrival);
  const newArrivals = rawNewArrivals.length > 0
    ? rawNewArrivals.slice(0, 4)
    : (products.length > 4 ? products.slice(4, 8) : products.slice(0, 4));

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
      const text = `New Newsletter Signup!\n\nEmail: ${email}\n\nPlease add to early access list for new drops and discount codes on My Zevar jewellery.`;
      window.open(`https://wa.me/919013114748?text=${encodeURIComponent(text)}`, '_blank');
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const heroImage = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop';

  return (
    <div id="home-page-container" className="animate-fade-in">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section id="hero-banner-section" className="relative bg-[#FAF7F2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0 lg:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

            {/* Text + CTAs */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-4">
              <span className="inline-block bg-[#1B6B5A]/10 text-[#1B6B5A] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#1B6B5A]/20">
                100% Hypoallergenic · Tarnish-Resistant
              </span>
              <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-[1.15]">
                Premium Indian<br />Ethnic Jewellery
              </h1>
              <p className="text-sm text-[#555555] max-w-md mx-auto lg:mx-0 leading-relaxed">
                Hand-selected micro gold-plated Kundan chokers, temple sets, and earrings. Authentic weight, hypoallergenic — priced direct from the polishing centre.
              </p>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-md px-4 py-2.5">
                <Zap size={14} className="text-amber-600 shrink-0" />
                <span className="text-sm font-semibold text-amber-800">Sets from <span className="text-[#1B6B5A] font-extrabold text-base">₹299</span> · Free delivery above ₹499</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-1">
                <button
                  id="hero-cta-shop-now"
                  onClick={() => { resetFilters(); navigateTo('shop'); }}
                  className="bg-[#1B6B5A] hover:bg-[#C9933A] active:bg-[#C9933A] text-white font-bold py-3.5 px-7 rounded-sm transition-colors shadow-md text-sm uppercase tracking-wider cursor-pointer"
                >
                  Shop All Sets
                </button>
                <button
                  id="hero-cta-view-cols"
                  onClick={() => { resetFilters(); setFilters(prev => ({ ...prev, sort: 'Featured' })); navigateTo('shop'); }}
                  className="border-2 border-[#1B3A2D]/30 text-[#1B3A2D] hover:bg-[#1B3A2D]/5 font-bold py-3.5 px-7 rounded-sm transition-colors text-sm uppercase tracking-wider cursor-pointer"
                >
                  View Collections
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-7">
              <div className="relative rounded-lg overflow-hidden border border-[#C9933A]/25 shadow-xl aspect-[4/3] sm:aspect-[16/10] bg-[#1B3A2D]/10">
                <img
                  src={heroImage}
                  alt="Gold Plated Indian Kundan Choker Necklace Set"
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-xs font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
                    <span>Live Catalogue · Real gold-toned sets active now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip — horizontal scroll on mobile */}
        <div className="bg-[#1B3A2D] text-white mt-6 py-3 border-y border-[#C9933A]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 sm:gap-0 sm:grid sm:grid-cols-3 overflow-x-auto no-scrollbar">
              {[
                { icon: <Truck size={18} className="text-[#C9933A] shrink-0" />, title: 'Free Express Delivery', desc: 'Dispatched in 24 hrs (Free above ₹499)' },
                { icon: <RotateCcw size={18} className="text-[#C9933A] shrink-0" />, title: '24-Hour Returns', desc: 'Easy exchange via WhatsApp' },
                { icon: <ShieldCheck size={18} className="text-[#C9933A] shrink-0" />, title: 'Secure UPI Checkout', desc: '100% safe payment processing' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 min-w-[200px] sm:min-w-0 sm:justify-center px-2 sm:px-4 sm:py-1 shrink-0">
                  {item.icon}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#C9933A] whitespace-nowrap">{item.title}</p>
                    <p className="text-[9px] text-white/70 mt-0.5 whitespace-nowrap">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOP BY OCCASION ─────────────────────────────── */}
      <section id="occasion-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="text-[#1B6B5A] text-[10px] font-bold uppercase tracking-widest block">Browse by occasion</span>
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-0.5">Shop by Occasion</h2>
          </div>
          <button onClick={() => { resetFilters(); navigateTo('shop'); }} className="text-xs font-bold text-[#1B6B5A] hover:text-[#C9933A] flex items-center gap-1 transition-colors cursor-pointer shrink-0">
            All <ArrowRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Festive Special', sub: 'Pooja & Diwali', img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop', occ: 'Festive' as const },
            { label: 'Wedding Guest', sub: 'Elegant & Heavy', img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop', occ: 'Wedding' as const },
            { label: 'Daily Wear', sub: 'Office & Kurta', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop', occ: 'Daily' as const },
          ].map((item) => (
            <div
              key={item.occ}
              onClick={() => handleOccasionClick(item.occ)}
              className="group relative h-40 sm:h-56 rounded-md overflow-hidden border border-[#C9933A]/10 hover:border-[#C9933A]/40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3 z-10">
                <h3 className="font-serif italic text-base sm:text-lg font-bold text-white group-hover:text-[#C9933A] transition-colors leading-tight">{item.label}</h3>
                <p className="text-[9px] sm:text-[10px] text-white/70 mt-0.5 uppercase tracking-wider">{item.sub}</p>
              </div>
            </div>
          ))}
          {/* Under ₹499 card */}
          <div
            onClick={() => handlePriceThresholdClick(499)}
            className="group relative h-40 sm:h-56 rounded-md overflow-hidden border-2 border-dashed border-[#C9933A]/50 bg-[#1B3A2D] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-end p-4"
          >
            <div className="absolute top-3 right-3 bg-[#C9933A] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide z-20">SALE</div>
            <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-white z-10 relative">Under ₹499</h3>
            <p className="text-[10px] text-[#C9933A] font-semibold mt-1 leading-snug z-10 relative">Budget ethnic gems. No compromise on quality.</p>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ─────────────────────────────── */}
      <div className="bg-[#1B6B5A]/8 border-y border-[#1B6B5A]/15 py-3 my-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:gap-8 flex-wrap text-center">
            {[
              { val: '15,000+', label: 'Happy Customers' },
              { val: '4.8★', label: 'Average Rating' },
              { val: '24 hrs', label: 'Fast Dispatch' },
              { val: '₹299', label: 'Sets Start From' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold text-[#1B6B5A]">{s.val}</span>
                <span className="text-[9px] text-[#555555] uppercase tracking-wider font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BESTSELLERS ──────────────────────────────────── */}
      <section id="bestsellers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex items-end justify-between mb-4 pb-3 border-b border-[#C9933A]/10">
          <div>
            <span className="text-[#1B6B5A] text-[10px] font-bold uppercase tracking-widest block">Top Favorites</span>
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-0.5">Our Bestsellers</h2>
          </div>
          <button
            id="view-all-bestsellers-btn"
            onClick={() => { resetFilters(); setFilters(prev => ({ ...prev, sort: 'Featured' })); navigateTo('shop'); }}
            className="text-xs font-bold text-[#1B6B5A] hover:text-[#C9933A] flex items-center gap-1 cursor-pointer transition-colors shrink-0"
          >
            View All <ArrowRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {bestsellers.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => openProduct(product.id)}
              onAdd={() => addToCart(product)}
              onWishlist={() => toggleWishlist(product)}
              isWished={isInWishlist(product.id)}
            />
          ))}
        </div>
      </section>

      {/* ── VALUE PROPOSITION ────────────────────────────── */}
      <section id="value-prop-section" className="bg-[#1B3A2D] text-white py-12 border-y border-[#C9933A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-[#C9933A] text-[10px] font-bold uppercase tracking-widest block">Craftsmanship & Metallurgy</span>
            <h2 className="font-serif italic text-2xl sm:text-3xl font-extrabold text-[#FAF7F2] leading-tight">
              Guaranteed Material Integrity
            </h2>
            <p className="text-xs sm:text-sm text-white/75 max-w-lg mx-auto leading-relaxed">
              Micro gold-plated sets you can wear with absolute confidence — tarnish-free, skin-safe, and priced honestly.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left bg-white/5 border border-white/10 rounded-lg p-5 sm:p-8">
            {[
              { title: 'Real-Weight Brass Alloy', desc: 'Copper-brass base gives our sets the satisfying weight of real gold — not cheap plastic alternatives.' },
              { title: '18k Micro-Gold Plating', desc: 'Warm 18k gold tone with anti-tarnish lacquer for long-lasting lustre and oxidation resistance.' },
              { title: '100% Skin Safe', desc: 'Free from Lead, Nickel, and Cadmium. Certified for sensitive skin and long wedding events.' },
              { title: 'Premium Packaging', desc: 'Bubble wrap + rigid cardboard + soft suede pouch to protect every piece during transit.' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <h4 className="text-[10px] font-bold text-[#C9933A] uppercase tracking-wider">{item.title}</h4>
                <p className="text-xs text-white/75 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">6-Month Polish Warranty · Included Standard</span>
            <button
              id="value-prop-action-btn"
              onClick={() => { resetFilters(); navigateTo('shop'); }}
              className="bg-[#C9933A] hover:bg-white hover:text-[#1B3A2D] text-white font-bold py-3 px-7 rounded-sm transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              Shop the Collection
            </button>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────── */}
      <section id="new-arrivals-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex items-end justify-between mb-4 pb-3 border-b border-[#C9933A]/10">
          <div>
            <span className="text-[#1B6B5A] text-[10px] font-bold uppercase tracking-widest block">Fresh Launches</span>
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-0.5">Just In</h2>
          </div>
          <button
            id="view-all-new-arrivals-btn"
            onClick={() => { resetFilters(); setFilters(prev => ({ ...prev, sort: 'New Arrivals' })); navigateTo('shop'); }}
            className="text-xs font-bold text-[#1B6B5A] hover:text-[#C9933A] flex items-center gap-1 cursor-pointer transition-colors shrink-0"
          >
            View All <ArrowRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {newArrivals.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => openProduct(product.id)}
              onAdd={() => addToCart(product)}
              onWishlist={() => toggleWishlist(product)}
              isWished={isInWishlist(product.id)}
              badge="Just In"
            />
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section id="homepage-testimonials-section" className="bg-[#FAF7F2] py-10 border-t border-[#C9933A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <span className="text-[#1B6B5A] text-[10px] font-bold uppercase tracking-widest block">What Our Customers Say</span>
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-1">Loved by 15,000+ Customers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'Anjali Sharma, Pune', item: 'Kundan Choker Set', review: '"Absolutely brilliant piece! Looks extremely rich and premium. The gold polish is perfect, adjustable thread is useful. Got 10+ compliments at a pre-wedding function!"' },
              { name: 'Kavitha S., Chennai', item: 'Temple Lakshmi Antique Set', review: '"Stunning antique finish. Matte, dark red-gold temple jewellery vibe I\'ve been searching for. Looks just like the real gold set my mother has. Weight is solid but non-pinching."' },
              { name: 'Roshni Singh, Bangalore', item: 'Floral Jhumka Earrings', review: '"I wear these jhumkas to office almost daily now. So lightweight I forget I\'m wearing them. Packaging is high-class and would make a great gift!"' },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[#C9933A]/10 p-5 rounded-md space-y-3 shadow-sm">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-bold text-[#1A1A1A]">{t.name}</span>
                  <span className="bg-emerald-50 text-emerald-800 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide shrink-0">Verified</span>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-[#C9933A] stroke-[#C9933A]" />)}
                </div>
                <p className="text-xs text-[#555555] leading-relaxed italic">{t.review}</p>
                <p className="text-[9px] text-[#C9933A] font-bold uppercase tracking-wider">Purchased: {t.item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP STRIP ───────────────────────────────── */}
      <div className="bg-[#1B6B5A] py-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-white font-bold text-sm sm:text-base">Need help choosing the right set?</p>
            <p className="text-white/80 text-xs">Our team responds within minutes on WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/919013114748?text=Hi!%20I%20need%20help%20choosing%20a%20jewellery%20set%20from%20My%20Zevar."
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-white text-[#1B6B5A] font-bold py-2.5 px-5 rounded-sm text-sm uppercase tracking-wider transition-all hover:bg-[#C9933A] hover:text-white shrink-0 cursor-pointer shadow-sm"
          >
            <Phone size={15} />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* ── NEWSLETTER ───────────────────────────────────── */}
      <section id="email-form-section" className="py-10 bg-[#FAF7F2] border-t border-[#C9933A]/10">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <h2 className="font-serif italic text-xl sm:text-2xl font-bold text-[#1A1A1A]">Get Early Access to New Drops</h2>
          <p className="text-xs text-[#555555]">No spam. Exclusive deals, festive alerts, and secret ₹299 coupons only.</p>
          {newsletterSubscribed ? (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-md p-4 text-xs font-semibold flex items-center justify-center gap-2 animate-slide-up">
              <CheckCircle className="text-emerald-700 shrink-0" size={16} />
              <span>You're on the list! Check your inbox for early access.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 mt-2">
              <input
                id="newsletter-email-input"
                type="email"
                required
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white border border-[#C9933A]/30 rounded-sm px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1B6B5A]"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="bg-[#1B6B5A] hover:bg-[#C9933A] text-white font-bold py-2.5 px-5 rounded-sm text-sm uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-[9px] text-gray-400">Join 15,000+ Indian women who shop clever.</p>
        </div>
      </section>

    </div>
  );
}
