import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import QuickMedicineOrder from './components/QuickMedicineOrder';
import QuickCategoryGrid from './components/QuickCategoryGrid';
import PrescriptionSection from './components/PrescriptionSection';
import ServicesSection from './components/ServicesSection';
import HowItWorks from './components/HowItWorks';
import FounderSection from './components/FounderSection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen relative flex flex-col bg-surface-light selection:bg-flora-100 selection:text-flora-800">
      
      {/* High-Tech Branded Loading Screen */}
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      {/* 
        CLEAN, SHARP, UNBLURRED BACKGROUND
        Zero blur filters, crisp rendering
      */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-[0.05]"
        style={{
          backgroundImage: "url('/images/flora-banner.jpg')",
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col flex-grow">
        
        {/* 1. Sticky Header */}
        <Header />

        <main className="flex-grow">
          {/* 2. Hero Section: 100% Crisp Official Banner */}
          <Hero />

          {/* 3. Trust Strip */}
          <TrustStrip />

          {/* 4. Instant Medicine Order by Name / Quick Pills */}
          <QuickMedicineOrder />

          {/* 5. Popular Chemist Categories with Direct WhatsApp Enquiries */}
          <QuickCategoryGrid />

          {/* 6. Prescription Section: Direct Upload & WhatsApp Delivery */}
          <PrescriptionSection />

          {/* 7. Services Section */}
          <ServicesSection />

          {/* 8. How It Works (3 Steps) */}
          <HowItWorks />

          {/* 9. Meet Founder & Chief Pharmacist (Premprakash Sirvi, D.Pharm) */}
          <FounderSection />

          {/* 10. Reviews Section with Borivali Localities */}
          <ReviewsSection />

          {/* 11. Contact and Location with Storefront Photo & Google Maps */}
          <ContactSection />
        </main>

        {/* 12. Footer */}
        <Footer />

        {/* 13. Floating Actions: Pulsing WhatsApp Button & Mobile Sticky Bottom Bar */}
        <FloatingActions />

      </div>
    </div>
  );
}