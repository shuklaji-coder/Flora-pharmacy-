import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import LoadingScreen from './components/LoadingScreen';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import WellnessBanners from './components/WellnessBanners';
import WellnessCategories from './components/WellnessCategories';
import FeaturedBrands from './components/FeaturedBrands';
import WellnessProductSection from './components/WellnessProductSection';
import TrustStrip from './components/TrustStrip';
import ServicesSection from './components/ServicesSection';
import HowItWorks from './components/HowItWorks';
import FounderSection from './components/FounderSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import HomeMascotGreeting from './components/HomeMascotGreeting';

// Modals
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import CustomerAuthModal from './components/CustomerAuthModal';
import AdminPortal from './components/AdminPortal';
import InvoiceModal from './components/InvoiceModal';
import ErrorBoundary from './components/ErrorBoundary';

function checkIsAdminRoute() {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return path === '/admin' || path.startsWith('/admin/') || hash === '#admin' || hash.startsWith('#admin');
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdminRoute);
  const { currentUser, isGuestMode } = useStore();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminRoute(checkIsAdminRoute());
    };
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    // Keyboard shortcut for owner (Ctrl + Shift + A) to toggle admin view
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        const currentIsAdmin = checkIsAdminRoute();
        if (currentIsAdmin) {
          window.location.hash = '';
          if (window.location.pathname.includes('/admin')) {
            window.history.pushState(null, '', '/');
          }
        } else {
          window.location.hash = '#admin';
        }
        setIsAdminRoute(!currentIsAdmin);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 1. ISOLATED STANDALONE ADMIN PORTAL VIEW (Zero interference with customer shopping app)
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <AdminPortal onExit={() => {
          if (window.location.hash.includes('admin')) {
            window.location.hash = '';
          }
          if (window.location.pathname.includes('/admin')) {
            window.history.pushState(null, '', '/');
          }
          setIsAdminRoute(false);
        }} />
        <InvoiceModal />
      </div>
    );
  }

  // 2. If customer is not logged in and not in guest mode, redirect / gate directly to LoginPage
  if (!currentUser && !isGuestMode) {
    return (
      <div className="min-h-screen relative flex flex-col bg-gradient-to-tr from-[#022317] via-[#043E2B] to-[#085239] selection:bg-[#EED9C4] selection:text-[#043E2B]">
        {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}
        <LoginPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col bg-surface-light selection:bg-flora-100 selection:text-flora-800">
      
      {/* High-Tech Branded Loading Screen */}
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      {/* Ambient Subtle Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-[0.03] will-change-transform"
        style={{
          backgroundImage: "url('/images/flora-banner.jpg')",
        }}
      />

      {/* Main Application Container */}
      <div className="relative z-10 flex flex-col flex-grow">
        
        {/* 1. Wellness Forever Style Navbar with Live Search, Location Pill, Cart & Auth */}
        <Navbar />

        <main className="flex-grow">
          {/* 2. Auto-Rotating Promotional Hero Banners */}
          <WellnessBanners />

          {/* 3. Top Healthcare & Pharma Brands Auto-Slider */}
          <FeaturedBrands />

          {/* 4. Rounded Quick Category Explorer */}
          <WellnessCategories />

          {/* 5. Complete Wellness Store Catalog: Trending Borivali, Health Devices, All Categories & Filter */}
          <WellnessProductSection />

          {/* 5. Trust Badges & Clinical Guarantees */}
          <TrustStrip />

          {/* 6. Pharmacy Services (Express Delivery, Chronic Care, BP & Sugar Checks) */}
          <ServicesSection />

          {/* 7. How It Works (3 Steps to Order & Receive) */}
          <HowItWorks />

          {/* 8. Meet Chief Pharmacist (Premprakash Sirvi, D.Pharm) */}
          <FounderSection />

          {/* 9. Verified Local Customer Reviews */}
          <ReviewsSection />

          {/* 10. Frequently Asked Questions */}
          <FAQSection />

          {/* 11. Store Location & Google Maps */}
          <ContactSection />
        </main>

        {/* 12. Complete Footer */}
        <Footer />

        {/* 13. Floating Actions (WhatsApp & Mobile Quick-Bar) */}
        <FloatingActions />

        {/* 14. Animated Welcome Mascot: Slides from Left and Stops in Center */}
        <HomeMascotGreeting />

        {/* 15. E-Commerce Modals & Slide-out Drawers */}
        <CartDrawer />
        <CheckoutModal />
        <OrderSuccessModal />
        <CustomerAuthModal />
        <InvoiceModal />

      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </ErrorBoundary>
  );
}
