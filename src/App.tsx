import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';

// Import our modular pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function MainLayout() {
  const { activePage } = useApp();

  React.useEffect(() => {
    switch (activePage) {
      case 'home':
        document.title = 'My Zevar | Premium Kundan & Temple Jewellery Online India';
        break;
      case 'shop':
        document.title = 'Shop Indian Ethnic Jewellery Sets & Chokers | My Zevar';
        break;
      case 'about':
        document.title = 'Our Story & Founder\'s Promise | My Zevar';
        break;
      case 'contact':
        document.title = 'Contact Support & Frequently Asked Questions (FAQ) | My Zevar';
        break;
      default:
        break;
    }
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2] font-sans antialiased text-[#1A1A1A]">
      
      {/* Sticky Top Navigation */}
      <Header />

      {/* Main Page Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-1 sm:px-2 md:px-0 scroll-mt-24">
        {activePage === 'home' && <Home />}
        {activePage === 'shop' && <Shop />}
        {activePage === 'product' && <ProductDetail />}
        {activePage === 'about' && <About />}
        {activePage === 'contact' && <Contact />}
      </main>

      {/* Persistent slide Drawer overlay */}
      <CartDrawer />
      <WishlistDrawer />

      {/* Global standard Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
