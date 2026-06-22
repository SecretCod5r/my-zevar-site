import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Page, Product, CartItem, FilterState } from '../types';
import { PRODUCTS, getPlaceholderImage, getDetailPlaceholderImage } from '../data/products';

// Map URL pathname -> Page enum value
function pathnameToPage(pathname: string): Page {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/shop')) return 'shop';
  if (pathname.startsWith('/product')) return 'product';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'home';
}

// Map Page enum value -> URL pathname
function pageToPathname(page: Page): string {
  switch (page) {
    case 'shop': return '/shop';
    case 'product': return '/shop'; // openProduct uses /product/:id directly
    case 'about': return '/about';
    case 'contact': return '/contact';
    default: return '/';
  }
}

interface AppContextType {
  activePage: Page;
  selectedProductId: string;
  cart: CartItem[];
  cartOpen: boolean;
  filters: FilterState;
  products: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  buyNow: (product: Product) => void;
  updateCartQty: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  navigateTo: (page: Page) => void;
  openProduct: (productId: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  wishlist: Product[];
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'> & { id?: string }) => void;
  editProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetProducts: () => void;
  overrideProducts: (products: Product[]) => void;
}

const defaultFilters: FilterState = {
  category: 'All',
  priceRange: 'All',
  occasion: 'All',
  sort: 'Featured',
  search: ''
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage: Page = pathnameToPage(location.pathname);
  const [selectedProductId, setSelectedProductId] = useState<string>(() => {
    // Try to read product id from URL on first load
    const parts = location.pathname.split('/');
    if (parts[1] === 'product' && parts[2]) return parts[2];
    return 'zevar-001';
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('my_zevar_custom_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('my_zevar_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('my_zevar_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Synchronize product list to localStorage
  useEffect(() => {
    localStorage.setItem('my_zevar_custom_products', JSON.stringify(products));
  }, [products]);

  // Synchronize cart to localStorage for real-world persistence
  useEffect(() => {
    localStorage.setItem('my_zevar_cart', JSON.stringify(cart));
  }, [cart]);

  // Synchronize wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('my_zevar_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Auto-sync products from Odoo ERP cloud on boot-up and refresh every 30 mins
  useEffect(() => {
    const fetchCloudProducts = () => {
      console.log("Fetching live catalog from Odoo ERP cache...");
      fetch('/api/odoo/products')
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data: any) => {
          if (data.success && Array.isArray(data.products) && data.products.length > 0) {
            console.log(`Auto-synchronized ${data.products.length} products successfully from Odoo ERP Cache!`);
            setProducts(data.products);
          }
        })
        .catch(err => {
          console.warn("Silent background Odoo refresh from cache bypassed, keeping latest saved data", err);
        });
    };

    // Pull immediately on startup
    fetchCloudProducts();

    // Setup permanent client-side updater loop every 30 minutes (30 * 60 * 1000)
    const intervalId = setInterval(fetchCloudProducts, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    setCartOpen(true);
  };

  const buyNow = (product: Product) => {
    // Add to cart and immediately open checkout or cart drawer
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.max(item.quantity, 1) }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const navigateTo = (page: Page) => {
    navigate(pageToPathname(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Auto collapse cart when visiting other sections
    setCartOpen(false);
  };

  const openProduct = (productId: string) => {
    setSelectedProductId(productId);
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCartOpen(false);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const addProduct = (newProdData: Omit<Product, 'id' | 'rating' | 'reviewCount'> & { id?: string }) => {
    const id = newProdData.id || `zevar-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id,
      rating: 5.0,
      reviewCount: 0,
      images: newProdData.images && newProdData.images.length > 0 && newProdData.images[0] !== ''
        ? newProdData.images 
        : [
            getPlaceholderImage(id, newProdData.name),
            getDetailPlaceholderImage(id, newProdData.name, 'Front Angle'),
            getDetailPlaceholderImage(id, newProdData.name, 'Closeup Detail')
          ]
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const editProduct = (updatedProd: Product) => {
    setProducts((prev) => prev.map((p) => p.id === updatedProd.id ? updatedProd : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const resetProducts = () => {
    localStorage.removeItem('my_zevar_custom_products');
    setProducts(PRODUCTS);
  };

  const overrideProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        selectedProductId,
        cart,
        cartOpen,
        filters,
        products,
        addToCart,
        buyNow,
        updateCartQty,
        removeFromCart,
        clearCart,
        setCartOpen,
        navigateTo,
        openProduct,
        setFilters,
        resetFilters,
        wishlist,
        wishlistOpen,
        setWishlistOpen,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        addProduct,
        editProduct,
        deleteProduct,
        resetProducts,
        overrideProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
