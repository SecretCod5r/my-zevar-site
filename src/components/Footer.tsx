import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const { navigateTo, setFilters, resetFilters } = useApp();

  const goTo = (category: string) => {
    resetFilters();
    setFilters(prev => ({ ...prev, category }));
    navigateTo('shop');
  };

  const goUnder = (maxPrice: number) => {
    resetFilters();
    setFilters(prev => ({ ...prev, priceRange: `under-${maxPrice}` }));
    navigateTo('shop');
  };

  const linkClass = 'hover:text-[#C9933A] transition-colors cursor-pointer text-left text-xs text-white/80 hover:text-[#C9933A]';

  return (
    <footer id="main-footer" className="bg-[#1B3A2D] text-white border-t-2 border-[#C9933A]/25 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-white/10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-3">
            <h3 className="font-serif italic text-xl font-bold text-[#C9933A]">My Zevar</h3>
            <p className="text-xs text-white/75 leading-relaxed max-w-xs">
              <strong>Jewellery for every occasion.</strong> Hand-curated Indian ethnic sets starting at <strong>₹299</strong>. Real wear, honest pricing.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://wa.me/919013114748"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-bold text-[#C9933A] bg-[#C9933A]/10 border border-[#C9933A]/25 px-3 py-1.5 rounded-full hover:bg-[#C9933A]/20 transition-colors"
              >
                <Phone size={11} />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Shop Collections */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C9933A]">Shop</h4>
            <ul className="space-y-2">
              {[
                { label: 'Necklace Sets', cat: 'Necklace Sets' },
                { label: 'Choker Sets', cat: 'Chokers' },
                { label: 'Earrings & Jhumkas', cat: 'Earrings' },
                { label: 'Temple Antique Sets', cat: 'Temple Jewellery' },
              ].map(({ label, cat }) => (
                <li key={cat}>
                  <button onClick={() => goTo(cat)} className={linkClass}>{label}</button>
                </li>
              ))}
              <li className="pt-1 border-t border-white/5">
                <button onClick={() => goUnder(499)} className="text-xs text-amber-400 font-bold hover:text-[#C9933A] transition-colors cursor-pointer">
                  Under ₹499 Selection
                </button>
              </li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C9933A]">Help</h4>
            <ul className="space-y-2">
              {[
                { label: 'Our Story & Promise', page: 'about' as const },
                { label: 'FAQ & Returns', page: 'contact' as const },
                { label: 'Track Your Order', page: 'contact' as const },
                { label: 'Exchange Policy', page: 'contact' as const },
              ].map(({ label, page }) => (
                <li key={label}>
                  <button onClick={() => navigateTo(page)} className={linkClass}>{label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C9933A]">Contact</h4>
            <p className="text-xs text-white/70 leading-relaxed">Questions about fit, finish, or delivery? Reach out directly.</p>
            <div className="space-y-2">
              <a
                id="footer-phone-call-btn"
                href="https://wa.me/919013114748"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#1B6B5A] hover:bg-[#C9933A] text-white py-2 px-3 rounded-md text-xs transition-colors font-semibold max-w-max"
              >
                <Phone size={13} />
                +91 90131 14748
              </a>
              <a
                id="footer-email-link-btn"
                href="mailto:support@myzevar.com"
                className="flex items-center gap-2 text-xs text-white/75 hover:text-[#C9933A] transition-colors"
              >
                <Mail size={13} className="text-[#C9933A]" />
                support@myzevar.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-white/50">
          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            <span className="flex items-center gap-1"><ShieldCheck size={11} className="text-[#C9933A]" /> 100% Secure SSL</span>
            <span className="flex items-center gap-1"><Heart size={11} className="text-rose-400" /> Curated in India</span>
          </div>
          <p className="text-center sm:text-right">© My Zevar 2026. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
