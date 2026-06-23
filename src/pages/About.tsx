import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Coins, Sparkles, MapPin } from 'lucide-react';

export default function About() {
  const { navigateTo } = useApp();

  // Wide banner image
  const aboutHeroImage = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500" width="100%" height="100%">
    <defs>
      <linearGradient id="aboutgrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23C9933A" />
        <stop offset="50%" stop-color="%231E3D31" />
        <stop offset="100%" stop-color="%231B3A2D" />
      </linearGradient>
    </defs>
    <rect width="1200" height="500" fill="url(%23aboutgrad)" />
    <!-- Fine luxury lines in vector background -->
    <rect x="50" y="50" width="1100" height="400" fill="none" stroke="%23FAF7F2" stroke-opacity="0.1" stroke-width="2" />
    <circle cx="950" cy="250" r="180" fill="none" stroke="%23C9933A" stroke-opacity="0.15" stroke-width="1" />
    
    <text x="100" y="200" fill="%23FAF7F2" font-family="Georgia, serif" font-weight="bold" font-size="38" font-style="italic">Neha Malik</text>
    <text x="100" y="245" fill="%23C9933A" font-family="'DM Sans', sans-serif" font-weight="700" font-size="14" letter-spacing="3">FOUNDER OF MY ZEVAR</text>
    <text x="100" y="295" fill="%23FAF7F2" fill-opacity="0.8" font-family="'DM Sans', sans-serif" font-size="16">"Elegant, tarnish-free ethnic sets shouldn't cost a fortune."</text>
  </svg>`.replace(/[\r\n\t]/g, ' ');

  return (
    <div id="about-page-container" className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-14">
      
      {/* 1. HERO HEADER INTRO */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-[#1B6B5A] text-xs font-bold uppercase tracking-widest block">INSIDE STORY</span>
        <h1 className="font-serif italic text-4xl sm:text-5xl font-extrabold text-[#1A1A1A] leading-tight">
          Hi, I am Neha. I started My Zevar for women like me.
        </h1>
        <div className="w-16 h-0.5 bg-[#C9933A] mx-auto mt-4" />
      </section>

      {/* 2. BODY STORY CONTENT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Story details left */}
        <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#555555] leading-relaxed">
          <p className="font-semibold text-[#1A1A1A]">
            Like most 25-to-30-year-old women in India, I absolutely love ethnic wear. There is nothing like a gorgeous dupatta, a clean cotton saree, or an elegant kurta set to make you feel completely beautiful on a festive occasion or wedding.
          </p>

          <p>
            But every time a wedding guest opportunity came, or a simple house pooja was scheduled, I faced the exact same problem: 
            <strong> Finding beautiful, complete jewellery sets that didn't cost a fortune.</strong>
          </p>

          <p>
            The fancy gold-plated designers in upmarket malls charge anywhere from ₹3,000 to ₹7,000 for a simple choker. And the cheap roadside catalog products often turn black within a single wear, looking plasticky or irritating your neck skin. My local jeweller didn’t have lightweight collections curated for modern occasions.
          </p>

          <p className="border-l-4 border-[#C9933A] pl-4 font-serif italic text-base text-[#1A1A1A] bg-[#FAF7F2] py-2.5">
            "I couldn't find a brand that offered rich, traditional looking sets with high polish finishing at honest prices. So, I spent six months meeting suppliers directly, rejecting high middleman markups, and curated My Zevar."
          </p>

          <p>
            My Zevar is designed for real women who shop clever. We do not claim to operate a large "team of grand artisans" in ancient villages. Our brand is an honest, warm resale business that sources high-grade micro gold-plated Kundan and copper-brass-based artificial temple jewellery directly from trusted, established suppliers who handle bulk polishing. 
          </p>

          <p>
            Because we do not run expensive marble showrooms or hire celebrity brand ambassadors, we can keep our margins extremely thin. We pass those savings directly on to you so that every complete necklace set starts at just <strong>₹299</strong>.
          </p>
        </div>

        {/* Founder Portrait Badge card */}
        <div className="lg:col-span-5 bg-white border border-[#C9933A]/20 rounded-md p-6 shadow-sm space-y-6">
          <div className="bg-[#FAF7F2] p-4 text-center rounded-sm space-y-2 border border-[#C9933A]/10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B6B5A]">A Personal Message</span>
            <h3 className="font-serif italic text-lg font-bold text-[#1A1A1A]">From Our Founder</h3>
            <p className="text-xs text-[#555555] leading-relaxed font-sans font-medium">
              "Every necklace and earring you see on My Zevar has been checked by me personally for weight, finish, and skin comfort. I wear them myself first. If it isn't beautiful enough for my cousin's festive evening, it doesn't enter our catalog."
            </p>
            <p className="text-xs text-[#1B6B5A] font-bold">— Neha Malik, Founder</p>
          </div>
          <div className="space-y-3.5 border-t border-[#C9933A]/10 pt-4 text-xs text-[#555555] font-medium leading-relaxed text-left">
            <h4 className="font-serif italic text-sm font-bold text-[#1A1A1A]">Our Quality Checklist:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#C9933A] text-xs mt-0.5">—</span>
                <span><strong>Micro-Gold Finish:</strong> Hand-polished 18k gold plating for a warm, real gold color tone.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9933A] text-xs">✨</span>
                <span><strong>Copper-Brass Alloy Base:</strong> Selected for structural strength and a realistic, substantial weight.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9933A] text-xs">✨</span>
                <span><strong>Nickel & Lead Free:</strong> 100% hypoallergenic materials certified to prevent green skin staining or itching.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9933A] text-xs">✨</span>
                <span><strong>Secure Indian Transit Box:</strong> Reinforced heavy casing with bubble compartments to safeguard delicate kundan and pearl work.</span>
              </li>
            </ul>
          </div>
        </div>

      </section>

      {/* 3. WIDE LIFESTYLE BANNER PHOTO */}
      <section className="relative rounded-lg overflow-hidden border border-[#C9933A]/20 shadow-lg aspect-[21/9]">
        <img 
          src={aboutHeroImage} 
          alt="Neha Malik founder's quote background" 
          className="w-full h-full object-cover select-none"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* 4. THE 3 CORE PROMISES */}
      <section className="space-y-8 bg-[#1B3A2D] text-white p-10 rounded-lg border border-[#C9933A]/25 shadow-md">
        <div className="text-center max-w-sm mx-auto">
          <span className="text-[#C9933A] text-xs font-bold uppercase tracking-widest block">OUR PROMISE</span>
          <h2 className="font-serif italic text-2xl sm:text-3xl font-bold mt-1 text-[#FAF7F2]">Our promise to you</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          {/* Column 1: Honest Pricing */}
          <div className="space-y-3 p-4 bg-white/5 rounded-md border border-white/5 transition-transform duration-200 hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#C9933A]/10 border border-[#C9933A]/20 rounded-full flex items-center justify-center mx-auto">
              <Coins className="text-[#C9933A]" size={22} />
            </div>
            <h3 className="font-serif italic text-lg font-bold text-[#C9933A]">Honest Pricing</h3>
            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-sans">
              No exorbitant mall markups or expensive distributor margins. We source directly from the most trusted bulk polishing suppliers in India to save you money.
            </p>
          </div>

          {/* Column 2: Curated Selection */}
          <div className="space-y-3 p-4 bg-white/5 rounded-md border border-white/5 transition-transform duration-200 hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#C9933A]/10 border border-[#C9933A]/20 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="text-[#C9933A]" size={21} />
            </div>
            <h3 className="font-serif italic text-lg font-bold text-[#C9933A]">Curated Selection</h3>
            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-sans">
              Our products are never randomized. We carefully handpick specific kundan jewelry, temple sets, and pearl necklaces to ensure they are on-trend for Indian wear.
            </p>
          </div>

          {/* Column 3: Real Occasions */}
          <div className="space-y-3 p-4 bg-white/5 rounded-md border border-white/5 transition-transform duration-200 hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#C9933A]/10 border border-[#C9933A]/20 rounded-full flex items-center justify-center mx-auto">
              <Heart className="text-[#C9933A]" size={22} />
            </div>
            <h3 className="font-serif italic text-lg font-bold text-[#C9933A]">Real Occasions</h3>
            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-sans">
              Designed to sit comfortably and securely throughout long weddings, office hours, or family gatherings. Lightweight, skin-friendly material standard.
            </p>
          </div>

        </div>

        {/* CTA link to shop */}
        <div className="text-center pt-4">
          <button
            id="about-cta-shopall-btn"
            onClick={() => navigateTo('shop')}
            className="bg-[#C9933A] hover:bg-white hover:text-[#1B3A2D] text-white font-bold py-3 px-8 rounded-sm text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Browse the Collection
          </button>
        </div>
      </section>

    </div>
  );
}
