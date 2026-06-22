import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { REVIEWS, getPlaceholderImage } from '../data/products';
import { Star, Truck, RotateCcw, ShieldCheck, ChevronDown, ChevronUp, Plus, Minus, Check, Heart } from 'lucide-react';
import { Review, Product } from '../types';

export default function ProductDetail() {
  const { productId: urlProductId } = useParams<{ productId: string }>();
  const { products, selectedProductId, addToCart, buyNow, openProduct, toggleWishlist, isInWishlist } = useApp();
  
  // Prefer URL param, fall back to context selectedProductId
  const resolvedId = urlProductId || selectedProductId;
  const product = products.find((p) => p.id === resolvedId) || products[0];
  
  // State for current image in gallery
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  
  // State for caret details accordion
  const [careOpen, setCareOpen] = useState(false);
  
  // Local state to manage reviews dynamically for this session
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  
  // Review form state
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [formOccasion, setFormOccasion] = useState('Festive Wear');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Sync / load reviews for current selected product
  useEffect(() => {
    const originalReviews = REVIEWS[product.id] || [];
    setLocalReviews(originalReviews);
    setActiveImageIdx(0); // Reset image index on product shift
    setCareOpen(false); // Reset accordion
    if (product) {
      document.title = `${product.name} | Buy Indian Jewellery Online | My Zevar`;
    }
  }, [product]);

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Simple local storage history tracker for Recently Viewed Items
  useEffect(() => {
    if (!product || !product.id) return;
    
    // Read history
    const saved = localStorage.getItem('my_zevar_recently_viewed');
    let list: string[] = saved ? JSON.parse(saved) : [];
    
    // Filter out current so we can put it first (most recent)
    list = list.filter(id => id !== product.id);
    
    // Unshift to the front
    list.unshift(product.id);
    
    // Slice to 7 items max so we can display up to 6 others
    list = list.slice(0, 7);
    
    // Save to local storage
    localStorage.setItem('my_zevar_recently_viewed', JSON.stringify(list));
    
    // Resolve Product info (excluding current product)
    const items = list
      .filter(id => id !== product.id)
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => !!p);
      
    setRecentlyViewed(items);
  }, [product.id]);

  // Compute rating average
  const totalReviewsCount = localReviews.length;
  const averageRating = totalReviewsCount > 0 
    ? Number((localReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount).toFixed(1))
    : product.rating;

  const handleThumbnailClick = (idx: number) => {
    setActiveImageIdx(idx);
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: formName,
      rating: formRating,
      date: new Date().toISOString().split('T')[0],
      comment: formComment,
      occasion: formOccasion
    };

    setLocalReviews(prev => [newReview, ...prev]);
    
    // Reset form fields
    setFormName('');
    setFormRating(5);
    setFormComment('');
    setShowSuccessMsg(true);

    setTimeout(() => {
      setShowSuccessMsg(false);
    }, 4500);
  };

  // Get 4 related products (shares same category, ignores current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // If not enough related in same category, pad with other favorites
  const finalRelated = relatedProducts.length >= 4 
    ? relatedProducts 
    : [...relatedProducts, ...products.filter(p => p.id !== product.id && p.category !== product.category)].slice(0, 4);

  const hasOriginalPrice = !!product.originalPrice;
  const discountAmount = hasOriginalPrice ? product.originalPrice! - product.price : 0;

  return (
    <div id="product-detail-page-wrapper" className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Product Primary showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT COLUMN: Gallery & Main Image */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Active Big Image Container */}
          <div className="relative rounded-lg overflow-hidden bg-white border border-[#C9933A]/10 shadow-sm aspect-square max-w-2xl mx-auto lg:max-w-none">
            <img 
              src={product.images[activeImageIdx] || product.images[0]} 
              alt={`${product.name} main showcase`} 
              className="w-full h-full object-cover transition-all"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#C9933A] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                {product.badge}
              </span>
            )}
            
            <div className="absolute bottom-4 right-4 bg-black/55 backdrop-blur-sm text-white text-[11px] font-sans px-2.5 py-1 rounded-sm">
              View {activeImageIdx + 1} of {product.images.length}
            </div>
          </div>

          {/* Thumbnail Gallery Row */}
          <div className="flex gap-2.5 justify-center overflow-x-auto py-1 no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                style={{ contentVisibility: 'auto' }}
                className={`w-20 h-20 rounded-md border-2 overflow-hidden bg-white shrink-0 transition-all duration-300 ${
                  activeImageIdx === idx 
                    ? 'border-[#1B6B5A] scale-105 shadow-sm ring-1 ring-[#1B6B5A]/25' 
                    : 'border-[#C9933A]/15 opacity-70 hover:opacity-100 hover:scale-102 hover:border-[#C9933A]/50'
                }`}
                aria-label={`Show illustration view ${idx + 1}`}
              >
                <img 
                  src={img} 
                  alt={`${product.name} thumbnail ${idx}`} 
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Details details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Breadcrumb / Category info */}
          <div className="flex items-center space-x-1 text-xs text-[#555555] font-semibold tracking-wider uppercase font-sans">
            <span className="hover:text-[#1B6B5A] cursor-pointer">Zevar Catalogue</span>
            <span>/</span>
            <span className="hover:text-[#1B6B5A] cursor-pointer">{product.category}</span>
          </div>

          {/* Title and Ratings Header */}
          <div className="space-y-2">
            <h1 className="font-serif italic text-3xl font-extrabold text-[#1A1A1A] leading-tight">
              {product.name}
            </h1>
            
            {/* Core Reviews summary bar */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={15} 
                    className={star <= Math.round(averageRating) ? 'fill-[#C9933A] stroke-[#C9933A]' : 'text-gray-200'} 
                  />
                ))}
                <span className="text-xs font-bold text-[#1A1A1A] ml-1.5 pt-0.5">{averageRating} stars</span>
              </div>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <button 
                onClick={() => {
                  const el = document.getElementById('reviews-divider');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-[#1B6B5A] hover:text-[#C9933A] font-semibold underline"
              >
                {totalReviewsCount} Verified Reviews
              </button>
            </div>
          </div>

          {/* Big Pricing panel */}
          <div className="bg-white border border-[#C9933A]/15 p-4 rounded-sm space-y-1">
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-extrabold text-[#1B6B5A] font-sans">
                ₹{product.price}
              </span>
              {hasOriginalPrice && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs text-emerald-800 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-sm">
                    Save ₹{discountAmount}! (Free shipping)
                  </span>
                </>
              )}
            </div>
            <p className="text-[10px] text-[#555555] font-semibold uppercase tracking-wider">
              Free Express Shipping Included
            </p>
          </div>

          {/* Description Block */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9933A]">Aesthetic Design Note</h4>
            <p className="text-sm text-[#1A1A1A]/95 leading-relaxed font-sans font-medium">
              {product.description}
            </p>
          </div>

          {/* Included checklist box */}
          <div className="bg-[#1B3A2D]/5 rounded-md border border-[#1B3A2D]/10 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B3A2D] mb-1.5 flex items-center gap-1.5">
              <span>🎁</span>
              <span>What's included inside the box</span>
            </h4>
            <div className="text-xs font-semibold text-[#1B3A2D]/90 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C9933A] rounded-full" />
              <span>{product.included}</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 font-sans">
              Each delivery includes a premium protective bubble wrap casing inside a rigid cardboard box to prevent transport friction.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <div className="flex gap-2">
              <button
                id="pdp-add-to-cart-btn"
                onClick={() => addToCart(product)}
                className="flex-1 bg-[#1B6B5A] hover:bg-[#C9933A] hover:scale-[1.01] active:scale-[0.99] text-white py-4 px-6 rounded-sm font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer uppercase flex items-center justify-center gap-2 text-center transform"
              >
                <span>Add to Shopping Bag</span>
              </button>
              
              <button
                id="pdp-wishlist-btn"
                onClick={() => toggleWishlist(product)}
                className="bg-white hover:bg-[#FAF7F2] hover:scale-[1.03] active:scale-[0.97] border border-[#C9933A]/30 text-[#C9933A] px-4 py-4 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:border-[#C9933A] transform"
                title={isInWishlist(product.id) ? "Remove from saved items" : "Save item"}
              >
                <Heart size={18} className={isInWishlist(product.id) ? "text-rose-600 fill-rose-600" : "text-gray-400 hover:text-rose-600"} />
              </button>
            </div>
            
            <button
              id="pdp-buy-now-btn"
              onClick={() => buyNow(product)}
              className="w-full bg-[#C9933A] hover:bg-[#1B3A2D] hover:scale-[1.01] active:scale-[0.99] text-white py-4 px-6 rounded-sm font-bold text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer uppercase text-center transform"
            >
              Buy Now — Secure Checkout
            </button>
          </div>

          {/* Badges strip below buttons */}
          <div className="grid grid-cols-3 gap-2 text-center border-t border-b border-[#C9933A]/10 py-3 text-[10px] text-[#555555] font-semibold uppercase tracking-wider">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={16} className="text-[#C9933A]" />
              <span>Genuine Quality</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw size={16} className="text-[#C9933A]" />
              <span>Easy 24h Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck size={16} className="text-[#C9933A]" />
              <span>Fast Free Dispatch</span>
            </div>
          </div>

          {/* Care Accordion */}
          <div className="border border-[#C9933A]/15 rounded-md overflow-hidden bg-white">
            <button
              onClick={() => setCareOpen(!careOpen)}
              className="w-full flex justify-between items-center px-4 py-3.5 bg-[#FAF7F2]/50 text-left cursor-pointer focus:outline-none"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                Care & Maintenance Instructions
              </span>
              {careOpen ? <ChevronUp size={16} className="text-[#C9933A]" /> : <ChevronDown size={16} className="text-[#C9933A]" />}
            </button>

            {careOpen && (
              <div className="px-4 py-3.5 text-xs text-[#555555] leading-relaxed border-t border-[#C9933A]/10 space-y-2 animate-slide-up bg-white">
                <p><strong>How to protect the gold polish?</strong></p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Avoid direct contact with perfumes, hand sanitizers, hair sprays, or body lotions.</li>
                  <li>Shed your jewellery before bathing, swimming, or getting physical training.</li>
                  <li>Wipe dry with a soft dry lint-free cotton cloth immediately after wearing to remove skin sweat.</li>
                  <li>Store separately inside our bubble wrap pouch to avoid surface rub scratch with other heavier pieces.</li>
                </ul>
              </div>
            )}
          </div>

        </div>

      </div>

      <hr id="reviews-divider" className="border-t border-[#C9933A]/15" />

      {/* REVIEWS LISTING & DYNAMIC SUBMIT FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Review Cards Column Left */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="font-serif italic text-2xl font-bold text-[#1A1A1A]">
            Customer Testimonials ({totalReviewsCount})
          </h3>

          {localReviews.length === 0 ? (
            <div className="bg-white border border-[#C9933A]/10 rounded-lg p-10 text-center">
              <p className="text-sm text-gray-500 font-medium">Be the first to review this stunning set! Let other women know about your experience.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {localReviews.map((rev) => (
                <div key={rev.id} className="bg-white border border-[#C9933A]/10 p-5 rounded-md space-y-2.5 shadow-xs">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">{rev.author}</h4>
                      {rev.occasion && (
                        <span className="text-[10px] text-[#C9933A] bg-[#C9933A]/5 px-2 py-0.5 rounded-full inline-block mt-0.5 font-medium">
                          Purchased for: {rev.occasion}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star 
                            key={s} 
                            size={11} 
                            className={s <= rev.rating ? 'fill-[#C9933A] stroke-[#C9933A]' : 'text-gray-200'} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    "{rev.comment}"
                  </p>
                  <p className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1 pl-0.5">
                    <Check size={11} /> Verified Buyer
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic add review form Column Right */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#C9933A]/15 p-6 rounded-md space-y-4 shadow-sm sticky top-28">
            <h4 className="font-serif italic text-lg font-bold text-[#1A1A1A] border-b border-[#C9933A]/10 pb-2">
              Write a Review
            </h4>

            {showSuccessMsg ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-md p-4 space-y-1 animate-slide-up">
                <p className="font-bold flex items-center gap-1">Thank you for your review!</p>
                <p>Your review is saved and applied. You can see it instantly rendering on your screen.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReviewSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#1A1A1A] uppercase tracking-wider mb-1 text-[11px]">Your Display Name</label>
                  <input
                    id="rev-author"
                    type="text"
                    required
                    placeholder="e.g. Aditi Deshpande"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#C9933A]/25 rounded-md p-2 focus:outline-none focus:border-[#1B6B5A]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] uppercase tracking-wider mb-1 text-[11px]">Select Star Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive = hoverRating !== null ? star <= hoverRating : star <= formRating;
                      return (
                        <button
                          key={star}
                          id={`star-btn-${star}`}
                          type="button"
                          onClick={() => setFormRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="text-amber-500 hover:scale-120 transition-all duration-150 cursor-pointer focus:outline-none p-0.5"
                        >
                          <Star 
                            size={20} 
                            className={`${isActive ? 'fill-[#C9933A] stroke-[#C9933A]' : 'text-gray-200'} transition-colors duration-150`} 
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] uppercase tracking-wider mb-1 text-[11px]">What Occasion did you wear it for?</label>
                  <select
                    id="rev-occ"
                    value={formOccasion}
                    onChange={(e) => setFormOccasion(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#C9933A]/25 rounded-md p-2 focus:outline-none focus:border-[#1B6B5A]"
                  >
                    <option value="Festive Pooja">Festive Pooja</option>
                    <option value="Wedding Guest Night">Wedding Guest Night</option>
                    <option value="Daily College/Office">Daily College/Office</option>
                    <option value="Family Get Together">Family Get Together</option>
                    <option value="Gifting my Friend">Gifting a Friend</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] uppercase tracking-wider mb-1 text-[11px]">Your Honest Review Details</label>
                  <textarea
                    id="rev-comment"
                    required
                    rows={4}
                    placeholder="Wore it for 8 hours, super lightweight or got too many compliments..."
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#C9933A]/25 rounded-md p-2 focus:outline-none focus:border-[#1B6B5A] text-xs font-sans font-medium"
                  />
                </div>

                <button
                  id="submit-review-form-btn"
                  type="submit"
                  className="w-full bg-[#1B6B5A] hover:bg-[#C9933A] hover:text-white text-white font-bold py-2.5 rounded-sm transition-colors text-xs uppercase tracking-wider cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* RELATED RECOMMENDATIONS ROW */}
      <div className="space-y-6 pt-6 border-t border-gray-100">
        <div className="text-center md:text-left">
          <span className="text-[#1B6B5A] text-xs font-bold uppercase tracking-wider">YOU MIGHT ALSO LIKE</span>
          <h3 className="font-serif italic text-2xl font-bold text-[#1A1A1A] mt-1">Related Picks</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {finalRelated.map((p) => (
            <div 
              key={p.id}
              className="group flex flex-col justify-between bg-white border border-[#C9933A]/10 hover:border-[#C9933A] rounded-sm p-3.5 transition-all duration-300 relative cursor-pointer"
              onClick={() => openProduct(p.id)}
            >
              <div className="aspect-square w-full rounded-sm overflow-hidden bg-[#FAF7F2] mb-3">
                <img 
                  src={p.images[0]} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <span className="text-[9px] text-[#C9933A] uppercase tracking-wider font-semibold block">{p.category}</span>
                <h4 className="text-xs font-medium text-[#1A1A1A] line-clamp-1 mt-0.5">{p.name}</h4>
                <p className="text-xs font-bold text-[#1B6B5A] mt-2">₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENTLY VIEWED SECTION */}
      {recentlyViewed.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-gray-100">
          <div className="text-center md:text-left">
            <span className="text-[#C9933A] text-xs font-bold uppercase tracking-wider">RECENTLY VIEWED</span>
            <h3 className="font-serif italic text-2xl font-bold text-[#1A1A1A] mt-1">Recently Viewed Items</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
            {recentlyViewed.map((p) => (
              <div 
                key={p.id}
                className="group flex flex-col justify-between bg-white border border-[#C9933A]/10 hover:border-[#C9933A] rounded-sm p-3 transition-all duration-300 relative cursor-pointer"
                onClick={() => openProduct(p.id)}
              >
                <div className="aspect-square w-full rounded-sm overflow-hidden bg-[#FAF7F2] mb-2">
                  <img 
                    src={p.images[0]} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <span className="text-[8px] text-[#C9933A] uppercase tracking-wider font-semibold block">{p.category}</span>
                  <h4 className="text-[11px] font-medium text-[#1A1A1A] line-clamp-1 mt-0.5">{p.name}</h4>
                  <p className="text-[11px] font-bold text-[#1B6B5A] mt-1">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
