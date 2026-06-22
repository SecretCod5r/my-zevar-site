import React, { useState } from 'react';
import { Phone, Mail, Clock, Send, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // FAQ Accordion Toggle States
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName.trim() && formEmail.trim() && formMsg.trim()) {
      // Compose WhatsApp Notification Text
      const text = `✨ *New Enquiry on My Zevar Store!*\n\n👤 *Customer:* ${formName.trim()}\n📧 *Email:* ${formEmail.trim()}\n📞 *WhatsApp:* ${formPhone.trim() || 'Not provided'}\n💬 *Message:* ${formMsg.trim()}\n\n_Sent viz My Zevar Online Contact Form_`;
      const waUrl = `https://wa.me/919013114748?text=${encodeURIComponent(text)}`;
      
      // Redirect to WhatsApp in new tab
      window.open(waUrl, '_blank');

      setFormSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMsg('');
      setTimeout(() => {
        setFormSuccess(false);
      }, 5500);
    }
  };

  const faqs: FAQItem[] = [
    {
      question: 'How long does delivery take and is shipping free?',
      answer: 'We dispatch all in-stock orders within 24 hours of confirmation. Delivery takes 3–5 business days to major metros (Mumbai, Delhi, Bangalore, Chennai) and up to 7 business days for other regions. Shipping is completely FREE on all orders above ₹499. For orders below ₹499, a flat shipping fee of ₹50 is charged.'
    },
    {
      question: 'What is your return and exchange policy?',
      answer: 'We offer a tarnish-free, damage-free guarantee. If your piece arrives damaged or has polish errors, we provide a hassle-free 24-hour return and replacement window. Simply message our team on WhatsApp (+91-9013114748) with your Order ID and an unboxing video/photo, and we will arrange a free exchange pickup.'
    },
    {
      question: 'Will the gold plating lose its lustre or turn black?',
      answer: 'All My Zevar sets are micro-plated with genuine 18k gold tone and sealed with a high-grade tarnish-resistant protective lacquer. With proper care (wiping dry after use, storing in a dry suede box, and keeping away from perfumes, sanitizers, and pool chlorine), the gold shine will remain brilliant for years.'
    },
    {
      question: 'Is this real gold, and what metals are used?',
      answer: 'No, our collections are premium imitation/artificial jewellery. We construct the core bases from high-density copper and brass alloys to ensure a realistic weight and sturdy build (no cheap plastic cores). The sets are then micro-plated in gold, detailed with glass Kundan stones, and finished with synthetic shell pearls.'
    },
    {
      question: 'Are your jewellery sets safe for sensitive skin?',
      answer: 'Yes, absolutely. We enforce a 100% Lead-free, Cadmium-free, and Nickel-free standard on all our supplier polishing. Our pieces are certified hypoallergenic and completely safe for sensitive skin types, meaning they will not cause itching or leave green marks on your neck.'
    },
    {
      question: 'What payment methods do you accept, and do you offer COD?',
      answer: 'We support all major payment types. You can pay securely online via Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), and Net Banking through our Razorpay checkout gateway. We also offer Cash on Delivery (COD) for all pin codes across India at no additional surcharge.'
    }
  ];

  return (
    <div id="contact-page-wrapper" className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* 1. HEADER SECTION */}
      <section className="text-center space-y-2.5 max-w-lg mx-auto">
        <span className="text-[#1B6B5A] text-xs font-bold uppercase tracking-widest block font-accent-label">💬 SUPPORT & HELP CENTER</span>
        <h1 className="font-serif italic text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">Contact Customer Support</h1>
        <p className="text-sm text-[#555555]">
          Whether it is about an order dispatch, returns, or product weight, reach out—we are here to help.
        </p>
      </section>

      {/* 2. CONTACT LAYOUT CORES */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Direct info nodes and WhatsApp big green CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#C9933A]/15 p-6 rounded-md space-y-6 shadow-sm">
            <h3 className="font-serif italic text-xl font-bold text-[#1D3A31] border-b border-[#C9933A]/10 pb-2">
              Reach Out Directly
            </h3>
            
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              We respond fastest on WhatsApp! Feel free to ask us questions regarding fit, finish, or order statuses.
            </p>

            {/* Direct large WhatsApp Green action bar: MUST be visible and clickable */}
            <a 
              id="contact-whatsapp-direct-btn"
              href="https://wa.me/919013114748?text=Hi!%20I%20have%20a%20question%20about%20your%20jewellery%20on%20My%20Zevar." 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-md shadow-md text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              <Phone size={18} className="fill-white" />
              <span>Chat with us on WhatsApp</span>
            </a>

            {/* Other direct data nodes */}
            <div className="space-y-4 pt-4 border-t border-gray-100 text-xs text-left font-medium leading-relaxed">
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1B6B5A]/5 flex items-center justify-center shrink-0">
                  <Mail className="text-[#1B6B5A]" size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px]">Direct Support Email</h4>
                  <a href="mailto:support@myzevar.com" className="text-sm font-semibold text-[#1B6B5A] hover:underline block mt-0.5">
                    support@myzevar.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-[#1B6B5A]/5 flex items-center justify-center shrink-0">
                  <Clock className="text-[#1B6B5A]" size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px]">Support Hours</h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Monday to Saturday: 10:00 AM — 07:00 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-[#1B6B5A]/5 flex items-center justify-center shrink-0">
                  <span className="text-xs text-[#1B6B5A] font-bold">🏢</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px]">Registered Corporate Office</h4>
                  <p className="text-xs text-gray-600 mt-0.5 leading-normal">
                    Malik Enterprises (My Zevar)<br />
                    102, Sona Villa, Hill Road, Bandra West,<br />
                    Mumbai, Maharashtra — 400050<br />
                    <span className="text-[9px] uppercase font-bold text-[#C9933A] block mt-1">GSTIN: 27AABCM8473R1ZM</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Custom Message Form */}
        <div className="lg:col-span-7 bg-white border border-[#C9933A]/15 p-6 rounded-md shadow-sm">
          <h3 className="font-serif italic text-xl font-bold text-[#1D3A31] border-b border-[#C9933A]/10 pb-2 mb-6">
            Leave Us a Message
          </h3>

          {formSuccess ? (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-md p-6 space-y-2 animate-slide-up">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-emerald-700 shrink-0" size={24} />
                <h4 className="text-sm font-bold uppercase tracking-wider">Message sent successfully!</h4>
              </div>
              <p className="text-xs leading-relaxed pl-8">
                Thank you! We have received your message. We will compile your queries and reply to your email address within 24 business hours. Thank you for shopping with us!
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1A1A1A]/80 uppercase tracking-widest text-[10px] mb-1">Your Full Name *</label>
                  <input
                    id="con-name"
                    type="text"
                    required
                    placeholder="e.g. Shalini Roy"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#C9933A]/25 rounded-md p-3 text-sm focus:outline-none focus:border-[#1B6B5A]"
                  />
                </div>
                <div>
                  <label className="block text-[#1A1A1A]/80 uppercase tracking-widest text-[10px] mb-1">Your Best Email Address *</label>
                  <input
                    id="con-email"
                    type="email"
                    required
                    placeholder="e.g. shalini@gmail.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#C9933A]/25 rounded-md p-3 text-sm focus:outline-none focus:border-[#1B6B5A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#1A1A1A]/80 uppercase tracking-widest text-[10px] mb-1">Your WhatsApp Mobile (Optional)</label>
                <input
                  id="con-phone"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#C9933A]/25 rounded-md p-3 text-sm focus:outline-none focus:border-[#1B6B5A]"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A]/80 uppercase tracking-widest text-[10px] mb-1">Your message or feedback details *</label>
                <textarea
                  id="con-msg"
                  required
                  rows={5}
                  placeholder="Ask questions regarding jewelry polish lifetime, custom gift options, order details etc..."
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#C9933A]/25 rounded-md p-3 text-sm focus:outline-none focus:border-[#1B6B5A] font-sans font-medium"
                />
              </div>

              <button
                id="submit-contact-msg-btn"
                type="submit"
                className="bg-[#1B6B5A] hover:bg-[#C9933A] hover:text-white text-white font-bold py-3.5 px-6 rounded-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>Send Message</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </div>

      </section>

      {/* 3. FAQ SECTION ACCORDIONS */}
      <section id="faq-section" className="max-w-4xl mx-auto space-y-6 pt-4 border-t border-gray-100">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[#C9933A] text-xs font-bold uppercase tracking-widest block">🙋 FREQUENT QUESTIONS</span>
          <h2 className="font-serif italic text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">Frequently Asked Questions</h2>
          <p className="text-sm text-[#555555] max-w-sm mx-auto">
            Everything you need to know about purchasing, shipping, and caring.
          </p>
        </div>

        {/* Accordions listing */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isFaqOpen = openFaqIdx === idx;
            
            return (
              <div 
                key={idx} 
                className="bg-white border border-[#C9933A]/15 rounded-md overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-sans font-semibold text-xs sm:text-sm text-[#1A1A1A] hover:bg-[#C9933A]/5 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle size={15} className="text-[#C9933A] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isFaqOpen ? (
                    <ChevronUp size={16} className="text-[#C9933A]" />
                  ) : (
                    <ChevronDown size={16} className="text-[#C9933A]" />
                  )}
                </button>

                {/* Animated Answer card */}
                {isFaqOpen && (
                  <div className="px-5 py-4 text-xs sm:text-sm text-[#555555] leading-relaxed border-t border-gray-100 bg-[#FAF7F2]/40 animate-slide-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
