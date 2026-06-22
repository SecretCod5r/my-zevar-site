import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Menu, X, Phone, Heart } from 'lucide-react';
import { Page } from '../types';

export default function Header() {
  const { navigateTo, activePage, cart, setCartOpen, setFilters, wishlist, setWishlistOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scrolling to make the header sticky with background styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
  };

  const handleShopByCategory = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
    handleNavClick('shop');
  };

  return (
    <header 
      id="header-nav"
      className={`sticky top-0 z-40 transition-all duration-300 w-full ${
        isScrolled 
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#C9933A]/10 py-3' 
          : 'bg-[#FAF7F2] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile Hamburguer Menu */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="text-[#1A1A1A] p-1.5 rounded-md hover:text-[#C9933A] focus:outline-none focus:ring-1 focus:ring-[#C9933A]"
              aria-label="Open primary menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Elegant Logo / Brand Name */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <button 
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')} 
              className="text-left group focus:outline-none"
            >
              <span className="font-serif italic text-2xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight group-hover:text-[#C9933A] transition-colors duration-200">
                My Zevar
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-widest text-[#C9933A] font-medium font-sans">
                Jewellery for every occasion
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              id="desktop-nav-home"
              onClick={() => handleNavClick('home')}
              className={`text-[15px] font-medium transition-all duration-200 cursor-pointer ${
                activePage === 'home' 
                  ? 'text-[#1B6B5A] border-b-2 border-[#C9933A] pb-0.5 font-semibold' 
                  : 'text-[#1A1A1A] hover:text-[#C9933A]'
              }`}
            >
              Home
            </button>
            <button
              id="desktop-nav-shop"
              onClick={() => handleNavClick('shop')}
              className={`text-[15px] font-medium transition-all duration-200 cursor-pointer ${
                activePage === 'shop' 
                  ? 'text-[#1B6B5A] border-b-2 border-[#C9933A] pb-0.5 font-semibold' 
                  : 'text-[#1A1A1A] hover:text-[#C9933A]'
              }`}
            >
              Shop All
            </button>
            <div className="relative group">
              <button
                id="desktop-nav-collections"
                className="text-[15px] font-medium text-[#1A1A1A] hover:text-[#C9933A] flex items-center gap-1 cursor-pointer"
              >
                Collections
              </button>
              {/* Subtle Mega Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-[#FAF7F2] border border-[#C9933A]/20 shadow-lg rounded-sm py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button 
                  onClick={() => handleShopByCategory('Necklace Sets')} 
                  className="w-full text-left px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#1B3A2D]/5 hover:text-[#1B6B5A] font-medium"
                >
                  Necklace Sets
                </button>
                <button 
                  onClick={() => handleShopByCategory('Chokers')} 
                  className="w-full text-left px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#1B3A2D]/5 hover:text-[#1B6B5A] font-medium"
                >
                  Choker Sets
                </button>
                <button 
                  onClick={() => handleShopByCategory('Earrings')} 
                  className="w-full text-left px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#1B3A2D]/5 hover:text-[#1B6B5A] font-medium"
                >
                  Earrings & Jhumkas
                </button>
                <button 
                  onClick={() => handleShopByCategory('Temple Jewellery')} 
                  className="w-full text-left px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#1B3A2D]/5 hover:text-[#1B6B5A] font-medium"
                >
                  Temple Jewellery
                </button>
              </div>
            </div>
            <button
              id="desktop-nav-about"
              onClick={() => handleNavClick('about')}
              className={`text-[15px] font-medium transition-all duration-200 cursor-pointer ${
                activePage === 'about' 
                  ? 'text-[#1B6B5A] border-b-2 border-[#C9933A] pb-0.5 font-semibold' 
                  : 'text-[#1A1A1A] hover:text-[#C9933A]'
              }`}
            >
              Our Story
            </button>
            <button
              id="desktop-nav-contact"
              onClick={() => handleNavClick('contact')}
              className={`text-[15px] font-medium transition-all duration-200 cursor-pointer ${
                activePage === 'contact' 
                  ? 'text-[#1B6B5A] border-b-2 border-[#C9933A] pb-0.5 font-semibold' 
                  : 'text-[#1A1A1A] hover:text-[#C9933A]'
              }`}
            >
              Contact & FAQ
            </button>
          </nav>

          {/* Action Buttons: WhatsApp support, Wishlist & Cart bubble */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Support - Hidden on dynamic mobile widths */}
            <a 
              id="nav-whatsapp-link"
              href="https://wa.me/919013114748?text=Hi%20My%20Zevar!%20I%20have%20a%20question%20about%20your%20jewellery." 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:flex items-center space-x-1 text-xs font-semibold text-[#1B6B5A] hover:text-[#C9933A] transition-colors duration-200 bg-[#1B6B5A]/5 px-3 py-1.5 rounded-full border border-[#1B6B5A]/10"
            >
              <Phone size={13} className="text-[#1B6B5A]" />
              <span>WhatsApp Support</span>
            </a>

            {/* Wishlist Button */}
            <button
              id="wishlist-toggle-nav-btn"
              onClick={() => setWishlistOpen(true)}
              className="relative p-2 text-[#1A1A1A] hover:text-[#1B6B5A] transition-colors duration-200 cursor-pointer"
              aria-label="Open your saved items"
            >
              <Heart size={24} className={`stroke-2 ${wishlist.length > 0 ? 'text-rose-600 fill-rose-600' : 'text-[#1A1A1A] hover:text-[#1B6B5A]'}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/3 bg-rose-600 rounded-full ring-2 ring-[#FAF7F2]">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="cart-toggle-nav-btn"
              onClick={() => setCartOpen(true)}
              className={`relative p-2 hover:text-[#1B6B5A] transition-colors duration-200 cursor-pointer ${shouldPulse ? 'animate-cart-pulse text-[#1B6B5A]' : 'text-[#1A1A1A]'}`}
              aria-label="Open your shopping cart"
            >
              <ShoppingBag size={24} className="stroke-2 text-inherit" />
              {totalCartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/3 bg-[#1B6B5A] rounded-full ring-2 ring-[#FAF7F2]">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation (Slide over) */}
      <div 
        id="mobile-drawer-overlay"
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop overlay */}
        <div 
          id="mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)} 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        />
        
        {/* Drawer container */}
        <div 
          id="mobile-drawer-nav-panel"
          className={`absolute inset-y-0 left-0 w-4/5 max-w-sm bg-[#FAF7F2] shadow-xl p-6 flex flex-col justify-between transition-transform duration-300 transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-[#C9933A]/10">
              <div>
                <span className="font-serif italic text-2xl font-bold text-[#1A1A1A]">My Zevar</span>
                <p className="text-[10px] text-[#C9933A] uppercase tracking-widest mt-0.5">Sets from ₹299</p>
              </div>
              <button
                id="close-mobile-menu-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#1A1A1A] hover:text-[#C9933A] p-1 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mt-8 flex flex-col space-y-5">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-lg font-medium text-left ${
                  activePage === 'home' ? 'text-[#1B6B5A] font-bold border-l-4 border-[#C9933A] pl-3' : 'text-[#1A1A1A] pl-3'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className={`text-lg font-medium text-left ${
                  activePage === 'shop' ? 'text-[#1B6B5A] font-bold border-l-4 border-[#C9933A] pl-3' : 'text-[#1A1A1A] pl-3'
                }`}
              >
                Shop All Sets
              </button>
              
              {/* Categories list in mobile menu */}
              <div className="pl-3 py-2 border-l border-[#C9933A]/20">
                <p className="text-xs uppercase tracking-widest text-[#555555] font-semibold mb-2">Shop by Collection</p>
                <div className="grid grid-cols-1 gap-2.5">
                  <button onClick={() => handleShopByCategory('Necklace Sets')} className="text-left text-sm text-[#1A1A1A] hover:text-[#1B6B5A] py-1 font-medium">Necklace Sets</button>
                  <button onClick={() => handleShopByCategory('Chokers')} className="text-left text-sm text-[#1A1A1A] hover:text-[#1B6B5A] py-1 font-medium">Choker Sets</button>
                  <button onClick={() => handleShopByCategory('Earrings')} className="text-left text-sm text-[#1A1A1A] hover:text-[#1B6B5A] py-1 font-medium">Earrings & Jhumkas</button>
                  <button onClick={() => handleShopByCategory('Temple Jewellery')} className="text-left text-sm text-[#1A1A1A] hover:text-[#1B6B5A] py-1 font-medium">Temple Jewellery</button>
                </div>
              </div>

              <button
                onClick={() => handleNavClick('about')}
                className={`text-lg font-medium text-left ${
                  activePage === 'about' ? 'text-[#1B6B5A] font-bold border-l-4 border-[#C9933A] pl-3' : 'text-[#1A1A1A] pl-3'
                }`}
              >
                Our Story
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`text-lg font-medium text-left ${
                  activePage === 'contact' ? 'text-[#1B6B5A] font-bold border-l-4 border-[#C9933A] pl-3' : 'text-[#1A1A1A] pl-3'
                }`}
              >
                Contact & Help
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-[#C9933A]/10 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setWishlistOpen(true);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-white border border-[#C9933A]/30 text-[#1A1A1A] hover:bg-gray-100 py-3 rounded-md transition-colors font-medium text-xs uppercase tracking-wider cursor-pointer shadow-sm"
            >
              <Heart size={14} className="text-rose-600 fill-rose-600" />
              <span>Saved Items ({wishlist.length})</span>
            </button>

            <a 
              href="https://wa.me/919013114748" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center space-x-2 bg-[#1B6B5A] hover:bg-[#C9933A] text-white py-3 rounded-md transition-colors font-medium"
            >
              <Phone size={18} />
              <span>WhatsApp Chat Support</span>
            </a>
            <p className="text-center text-xs text-[#555555] mt-3">
              Mon to Sat: 10 AM — 7 PM IST
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
