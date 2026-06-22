import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, Trash2, ShoppingBag, Eye, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const { 
    wishlist, 
    wishlistOpen, 
    setWishlistOpen, 
    toggleWishlist, 
    clearWishlist,
    addToCart,
    navigateTo,
    openProduct
  } = useApp();

  if (!wishlistOpen) return null;

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    // Optionally remove from wishlist, let's keep it but show visual feedback!
  };

  return (
    <div id="wishlist-drawer-wrapper" className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div 
        id="wishlist-overlay-bg"
        className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setWishlistOpen(false)}
      />

      {/* Drawer Panel */}
      <div 
        id="wishlist-inner-container"
        className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col transition-transform duration-300 ease-out transform"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C9933A]/10 bg-[#FAF7F2]">
          <div className="flex items-center space-x-2">
            <Heart size={21} className="text-[#1B6B5A] fill-[#1B6B5A]" />
            <h2 className="text-[#1A1A1A] text-lg font-bold font-sans font-medium uppercase tracking-wider">
              Saved Items ({wishlist.length})
            </h2>
          </div>
          <button
            id="close-wishlist-drawer-btn"
            onClick={() => setWishlistOpen(false)}
            className="p-1 text-[#1A1A1A] hover:text-[#C9933A] hover:rotate-90 transition-all duration-200 cursor-pointer"
            aria-label="Close wishlist drawer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Wishlist Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div 
              id="wishlist-empty-state-view"
              className="h-full flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-[#1B6B5A]/5 flex items-center justify-center mb-4">
                <Heart size={28} className="text-[#C9933A]" />
              </div>
              <h3 className="text-lg font-serif italic font-semibold text-[#1A1A1A]">Your wishlist is thin!</h3>
              <p className="text-xs text-[#555555] mt-2 max-w-xs leading-relaxed">
                Save your favorite handpicked artificial necklaces, shining kundan chokers, or drop jhumkas here so you don’t lose them.
              </p>
              <button
                id="wishlist-empty-action-btn"
                onClick={() => {
                  setWishlistOpen(false);
                  navigateTo('shop');
                }}
                className="mt-6 bg-[#1B6B5A] text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-[#C9933A] transition-colors shadow-sm cursor-pointer"
              >
                Browse Our Collections
              </button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-[#C9933A]/10">
              {wishlist.map((product, index) => (
                <div 
                  key={product.id} 
                  className={`flex gap-4 pt-4 ${index === 0 ? 'pt-0' : 'border-t border-[#C9933A]/10'}`}
                >
                  {/* Product Image preview */}
                  <div 
                    onClick={() => {
                      setWishlistOpen(false);
                      openProduct(product.id);
                    }}
                    className="w-16 h-16 rounded-sm bg-white border border-[#C9933A]/15 overflow-hidden shrink-0 cursor-pointer group"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 
                          onClick={() => {
                            setWishlistOpen(false);
                            openProduct(product.id);
                          }}
                          className="text-xs font-semibold text-[#1A1A1A] line-clamp-2 hover:text-[#1B6B5A] cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-gray-400 hover:text-red-500 p-0.5"
                          title="Remove from saved items"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[10px] text-[#C9933A] tracking-widest uppercase font-bold mt-0.5">
                        {product.category}
                      </p>
                    </div>

                    {/* Actions and Price */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-[#1B6B5A] font-bold text-xs font-sans">
                        ₹{product.price}
                        {product.originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through ml-1.5 font-normal">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setWishlistOpen(false);
                            openProduct(product.id);
                          }}
                          className="p-1 px-1.5 border border-[#C9933A]/20 bg-white rounded-sm text-gray-600 hover:text-[#1B6B5A] hover:border-[#1B6B5A] transition-colors"
                          title="View Details"
                        >
                          <Eye size={12} />
                        </button>
                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="p-1 px-2.5 bg-[#1B6B5A] text-white rounded-sm text-[10px] uppercase tracking-wider font-bold hover:bg-[#C9933A] transition-colors flex items-center gap-1"
                        >
                          <ShoppingBag size={10} />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {wishlist.length > 0 && (
          <div className="bg-white border-t border-[#C9933A]/10 p-6 space-y-3.5 shrink-0">
            <button
              id="clear-wishlist-all-btn"
              onClick={clearWishlist}
              className="w-full bg-transparent border border-red-200 text-red-700 hover:bg-red-50 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 text-center cursor-pointer"
            >
              Clear All Saved Items
            </button>
            <button
              id="wishlist-back-to-shop-btn"
              onClick={() => {
                setWishlistOpen(false);
                navigateTo('shop');
              }}
              className="w-full bg-[#1B6B5A] hover:bg-[#C9933A] text-white py-3.5 px-4 rounded-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
            >
              <span>Back to Shopping</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
