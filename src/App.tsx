import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
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
  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      document.title = 'My Zevar | Premium Kundan & Temple Jewellery Online India';
    } else if (path === '/shop') {
      document.title = 'Shop Indian Ethnic Jewellery Sets & Chokers | My Zevar';
    } else if (path === '/about') {
      document.title = "Our Story & Founder's Promise | My Zevar";
    } else if (path === '/contact') {
      document.title = 'Contact Support & Frequently Asked Questions | My Zevar';
    } else if (path.startsWith('/product/')) {
      // Product detail pages set their own title via useEffect in ProductDetail
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2] font-sans antialiased text-[#1A1A1A]">

      {/* Sticky Top Navigation */}
      <Header />

      {/* Main Page Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-1 sm:px-2 md:px-0 scroll-mt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback: redirect unknown routes to home */}
          <Route path="*" element={<Home />} />
        </Routes>
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
    <Router>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </Router>
  );
}
