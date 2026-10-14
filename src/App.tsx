import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartDrawer } from './components/cart/CartDrawer';
import { DemoCheckoutModal } from './components/cart/DemoCheckoutModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SearchModal } from './components/common/SearchModal';
import { Toast } from './components/common/Toast';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { CartProvider } from './context/CartContext';
import { AboutPage } from './pages/AboutPage';
import { AssetManifestPage } from './pages/AssetManifestPage';
import { CareGuidePage } from './pages/CareGuidePage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { HomePage } from './pages/HomePage';
import { OffersPage } from './pages/OffersPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ShopPage } from './pages/ShopPage';
import { WishlistPage } from './pages/WishlistPage';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] selection:bg-[#D4AF37]/20 selection:text-[#0B1F16]">
          {/* Top Announcement Bar */}
          <AnnouncementBar />

          {/* Luxury Navigation Bar */}
          <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

          {/* Main Routing Area */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/care-guide" element={<CareGuidePage />} />
              <Route path="/faqs" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route path="/policies/:policyType" element={<PoliciesPage />} />
              <Route path="/manifest" element={<AssetManifestPage />} />
              {/* Fallback to home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>

          {/* Luxury Editorial Footer */}
          <Footer />

          {/* Global Interactive Overlays */}
          <CartDrawer />
          <DemoCheckoutModal />
          <QuickViewModal />
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          <Toast />
          <FloatingWhatsApp />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
