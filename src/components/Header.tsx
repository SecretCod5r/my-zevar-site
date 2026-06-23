import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Menu, X, Phone, Heart, ChevronDown } from 'lucide-react';
import { Page } from '../types';

export default function Header() {
  const { navigateTo, activePage, cart, setCartOpen, setFilters, wishlist, setWishlistOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [shouldPulse, setShouldPulse] = useState(false);
  const prevCartCountRef = React.useRef(totalCartItems);

  useEffect(() => {
    if (totalCartItems > prevCartCountRef.current) {
      setShouldPulse(true);
      const timer = setTimeout(() => setShouldPulse(false), 450);
      prevCartCountRef.current = totalCartItems;
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = totalCartItems;
  }, [totalCartItems]);

  const handleNavClick = (page: Page) => {
    navigateTo(page);
    setMobileMenuOpen(false);
    setCollectionsOpen(false);
  };

  const handleShopByCategory = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
    handleNavClick('shop');
  };

  const navLinkClass = (page: Page) =>
    `text-[13px] font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap ${
      activePage === page
        ? 'text-[#1B6B5A] border-b-2 border-[#C9933A] pb-0.5'
        : 'text-[#1A1A1A] hover:text-[#C9933A]'
    }`;

  return (
    <header
      id="header-nav"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/96 backdrop-blur-md shadow-sm border-b border-[#C9933A]/10 py-2'
          : 'bg-[#FAF7F2] py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden shrink-0">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="text-[#1A1A1A] p-1.5 rounded-md hover:text-[#C9933A] focus:outline-none"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none group"
            >
              <span className="font-serif italic text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight group-hover:text-[#C9933A] transition-colors">
                My Zevar
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-[#C9933A] font-semibold">
                Jewellery for every occasion
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <button id="desktop-nav-home" onClick={() => handleNavClick('home')} className={navLinkClass('home')}>Home</button>
            <button id="desktop-nav-shop" onClick={() => handleNavClick('shop')} className={navLinkClass('shop')}>Shop All</button>

            {/* Collections dropdown */}
            <div className="relative group">
              <button
                id="desktop-nav-collections"
                className="text-[13px] font-semibold text-[#1A1A1A] hover:text-[#C9933A] flex items-center gap-1 cursor-pointer transition-colors"
              >
                Collections <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-[#C9933A]/20 shadow-lg rounded-md py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {['Necklace Sets', 'Chokers', 'Earrings', 'Temple Jewellery'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleShopByCategory(cat)}
                    className="w-full text-left px-4 py-2 text-xs text-[#1A1A1A] hover:bg-[#1B3A2D]/5 hover:text-[#1B6B5A] font-medium transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button id="desktop-nav-about" onClick={() => handleNavClick('about')} className={navLinkClass('about')}>Our Story</button>
            <button id="desktop-nav-contact" onClick={() => handleNavClick('contact')} className={navLinkClass('contact')}>Contact</button>
          </nav>

          {/* Action icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* WhatsApp - desktop only */}
            <a
              id="nav-whatsapp-link"
              href="https://wa.me/919013114748?text=Hi%20My%20Zevar!%20I%20have%20a%20question."
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 text-[11px] font-bold text-[#1B6B5A] hover:text-[#C9933A] transition-colors bg-[#1B6B5A]/8 px-3 py-1.5 rounded-full border border-[#1B6B5A]/15 whitespace-nowrap"
            >
              <Phone size={12} />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            {/* Wishlist */}
            <button
              id="wishlist-toggle-nav-btn"
              onClick={() => setWishlistOpen(true)}
              className="relative p-2 text-[#1A1A1A] hover:text-[#1B6B5A] transition-colors cursor-pointer"
              aria-label="Saved items"
            >
              <Heart size={21} className={wishlist.length > 0 ? 'text-rose-600 fill-rose-600' : 'stroke-2'} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#FAF7F2]">
                  {wishlist.length > 9 ? '9+' : wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              id="cart-toggle-nav-btn"
              onClick={() => setCartOpen(true)}
              className={`relative p-2 transition-colors cursor-pointer ${shouldPulse ? 'text-[#1B6B5A] scale-110' : 'text-[#1A1A1A] hover:text-[#1B6B5A]'} transition-all duration-200`}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={22} className="stroke-2" />
              {totalCartItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1B6B5A] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#FAF7F2]">
                  {totalCartItems > 9 ? '9+' : totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-drawer-overlay" className="fixed inset-0 z-50 lg:hidden">
          <div
            id="mobile-drawer-backdrop"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            id="mobile-drawer-nav-panel"
            className="absolute inset-y-0 left-0 w-[280px] bg-[#FAF7F2] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#C9933A]/15">
              <div>
                <span className="font-serif italic text-xl font-bold text-[#1A1A1A]">My Zevar</span>
                <p className="text-[9px] text-[#C9933A] uppercase tracking-widest mt-0.5 font-semibold">Sets from ₹299</p>
              </div>
              <button
                id="close-mobile-menu-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#1A1A1A] hover:text-[#C9933A] p-1"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
              {[
                { label: 'Home', page: 'home' as Page },
                { label: 'Shop All Sets', page: 'shop' as Page },
                { label: 'Our Story', page: 'about' as Page },
                { label: 'Contact & Help', page: 'contact' as Page },
              ].map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => handleNavClick(page)}
                  className={`w-full text-left py-2.5 px-3 rounded-md text-sm font-semibold transition-colors ${
                    activePage === page
                      ? 'text-[#1B6B5A] bg-[#1B6B5A]/8 font-bold'
                      : 'text-[#1A1A1A] hover:bg-[#1B3A2D]/5'
                  }`}
                >
                  {label}
                </button>
              ))}

              {/* Collections accordion */}
              <div>
                <button
                  onClick={() => setCollectionsOpen(!collectionsOpen)}
                  className="w-full flex items-center justify-between py-2.5 px-3 text-sm font-semibold text-[#1A1A1A] hover:bg-[#1B3A2D]/5 rounded-md"
                >
                  <span>Shop by Collection</span>
                  <ChevronDown size={14} className={`transition-transform ${collectionsOpen ? 'rotate-180' : ''}`} />
                </button>
                {collectionsOpen && (
                  <div className="pl-3 pt-1 space-y-0.5">
                    {['Necklace Sets', 'Choker Sets', 'Earrings & Jhumkas', 'Temple Jewellery'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleShopByCategory(cat.replace(' & Jhumkas', '').replace(' Sets', 's'))}
                        className="w-full text-left py-2 px-3 text-sm text-[#555555] hover:text-[#1B6B5A] font-medium rounded-md transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Bottom CTA */}
            <div className="px-5 py-4 border-t border-[#C9933A]/15 space-y-2.5">
              <button
                onClick={() => { setMobileMenuOpen(false); setWishlistOpen(true); }}
                className="w-full flex items-center justify-center gap-2 border border-[#C9933A]/30 text-[#1A1A1A] py-2.5 rounded-md text-xs font-semibold hover:bg-gray-50 transition-colors"
              >
                <Heart size={14} className="text-rose-600 fill-rose-600" />
                Saved Items ({wishlist.length})
              </button>
              <a
                href="https://wa.me/919013114748"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#1B6B5A] hover:bg-[#C9933A] text-white py-3 rounded-md text-sm font-bold transition-colors"
              >
                <Phone size={16} />
                Chat Support
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
