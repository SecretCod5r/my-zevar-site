import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, HelpCircle, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const { navigateTo, setFilters, resetFilters } = useApp();

  const handleQuickCollection = (category: string) => {
    resetFilters();
    setFilters(prev => ({ ...prev, category }));
    navigateTo('shop');
  };

  const handleShopUnderPrice = (maxPrice: number) => {
    resetFilters();
    setFilters(prev => ({ ...prev, priceRange: `under-${maxPrice}` }));
    navigateTo('shop');
  };

  const handleShopByOccasion = (occasion: string) => {
    resetFilters();
    setFilters(prev => ({ ...prev, occasion }));
    navigateTo('shop');
  };

  return (
    <footer id="main-footer" className="bg-[#1B3A2D] text-white mt-16 pt-12 pb-8 border-t-2 border-[#C9933A]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#FAF7F2]/10">
          
          {/* Brand Intro Column */}
          <div className="space-y-4">
            <h3 className="font-serif italic text-2xl font-bold tracking-tight text-[#C9933A]">
              My Zevar
            </h3>
            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed max-w-xs">
              <strong>Jewellery for every occasion.</strong> Curating beautiful, highly polished Indian ethnic sets starting at just <strong>₹299</strong>. Real wear, honest pricing.
            </p>
            <div className="flex flex-col gap-1 pt-1 text-[11px] text-[#C9933A] font-semibold uppercase tracking-widest">
              <span>Free Delivery above ₹499</span>
            </div>
          </div>

          {/* Quick shop filter links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#C9933A] mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/90">
              <li>
                <button 
                  onClick={() => handleQuickCollection('Necklace Sets')} 
                  className="hover:text-[#C9933A] transition-colors cursor-pointer text-left"
                >
                  Necklace Sets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickCollection('Chokers')} 
                  className="hover:text-[#C9933A] transition-colors cursor-pointer text-left"
                >
                  Choker Sets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickCollection('Earrings')} 
                  className="hover:text-[#C9933A] transition-colors cursor-pointer text-left"
                >
                  Earrings & Jhumkas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickCollection('Temple Jewellery')} 
                  className="hover:text-[#C9933A] transition-colors cursor-pointer text-left"
                >
                  Temple Antique Sets
                </button>
              </li>
              <li className="pt-1.5 border-t border-[#FAF7F2]/5">
                <button 
                  onClick={() => handleShopUnderPrice(499)} 
                  className="hover:text-[#C9933A] transition-colors cursor-pointer text-left font-bold text-amber-400"
                >
                  Under ₹499 Selection
                </button>
              </li>
            </ul>
          </div>

          {/* Guidelines Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#C9933A] mb-4">
              Helpful Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/90">
              <li>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="hover:text-[#C9933A] transition-colors cursor-pointer text-left"
                >
                  Our Story & Promise
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="hover:text-[#C9933A] transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions (FAQ)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="hover:text-[#C9933A] transition-colors cursor-pointer text-left"
                >
                  Easy 24-Hour Return & Exchange Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="hover:text-[#C9933A] transition-colors cursor-pointer text-left"
                >
                  Track Dispatch Status
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Directly - WhatsApp visible directly */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#C9933A] mb-4">
              Contact Support
            </h4>
            <div className="space-y-3.5 text-xs text-[#FAF7F2]/80">
              <p>
                Have questions about fit, finish, or delivery? Reach out to me:
              </p>
              
              <div className="space-y-2">
                <a 
                  id="footer-phone-call-btn"
                  href="https://wa.me/919013114748" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-[#1B6B5A] hover:bg-[#C9933A] text-white py-2 px-3 rounded-md transition-colors font-medium border border-white/5 shadow-sm max-w-max"
                >
                  <Phone size={14} className="text-white shrink-0" />
                  <span>WhatsApp: +91 9013114748</span>
                </a>

                <a 
                  id="footer-email-link-btn"
                  href="mailto:support@myzevar.com" 
                  className="flex items-center gap-2 hover:text-[#C9933A] transition-all py-1 max-w-max"
                >
                  <Mail size={14} className="text-[#C9933A]" />
                  <span>support@myzevar.com</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Cohesive baseline footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF7F2]/65 gap-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-[#C9933A]" /> 100% Secure SSL checkout
            </span>
            <span className="flex items-center gap-1">
              <Heart size={13} className="text-red-400" /> Curated inside India
            </span>
          </div>
          
          <div className="text-center sm:text-right">
            <p>© My Zevar 2026. All rights reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
