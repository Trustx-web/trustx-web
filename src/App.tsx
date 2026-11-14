import React, { useState, useCallback } from 'react';
import { MeshBackground } from './components/MeshBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ContactSection, InquiryType } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedInquiryType, setSelectedInquiryType] = useState<InquiryType | ''>('');
  const [focusTrigger, setFocusTrigger] = useState(0);

  const scrollToContact = useCallback((inquiryType: InquiryType = 'Request a Product Demo') => {
    setSelectedInquiryType(inquiryType);
    setFocusTrigger((prev) => prev + 1);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen relative text-slate-900 flex flex-col">
      <MeshBackground />

      <Header onRequestDemo={() => scrollToContact('Request a Product Demo')} />

      <main className="flex-1">
        <Hero onRequestDemo={() => scrollToContact('Request a Product Demo')} />
        <AboutSection />
        <ServicesSection onRequestDemo={() => scrollToContact('Technical Integration')} />
        <CaseStudiesSection onRequestDemo={() => scrollToContact('Request a Product Demo')} />
        <ContactSection
          preselectedInquiryType={selectedInquiryType}
          focusTrigger={focusTrigger}
        />
      </main>

      <Footer onRequestDemo={() => scrollToContact('Request a Product Demo')} />
    </div>
  );
}
