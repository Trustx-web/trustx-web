import React, { useState } from 'react';
import { MeshBackground } from './components/MeshBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EnterprisePilotModal } from './components/EnterprisePilotModal';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative text-slate-900 flex flex-col">
      <MeshBackground />

      <Header onRequestDemo={() => setIsDemoModalOpen(true)} />

      <main className="flex-1">
        <Hero onRequestDemo={() => setIsDemoModalOpen(true)} />
        <AboutSection />
        <ServicesSection onRequestDemo={() => setIsDemoModalOpen(true)} />
        <CaseStudiesSection onRequestDemo={() => setIsDemoModalOpen(true)} />
        <ContactSection />
      </main>

      <Footer onRequestDemo={() => setIsDemoModalOpen(true)} />

      <EnterprisePilotModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
