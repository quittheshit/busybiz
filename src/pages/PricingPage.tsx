import React from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { NavigationHeader } from '../components/NavigationHeader';
import { FooterComponent } from '../components/FooterComponent';
import PricingSection from '../components/PricingSection';

interface PageProps {
  onOpenContact: () => void;
}

const PricingPage: React.FC<PageProps> = ({ onOpenContact }) => {
  usePageMeta({
    title: 'Gennemskuelige Priser & Pakker | Webdesign, SEO & Marketing',
    description: 'Se vores faste og gennemskuelige priser på hjemmesider, SEO og marketing til lokale virksomheder i Danmark. Ingen bindinger eller skjulte gebyrer.',
    canonicalPath: '/priser',
    keywords: 'hjemmeside pris, SEO pris, marketing priser, billig hjemmeside til firma, webdesign pakker Danmark'
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      <div>
        <NavigationHeader onOpenContact={onOpenContact} />

        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-widest uppercase">
              Priser & Pakkeoversigt
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Gennemskuelige Priser <span className="text-gradient">Uden Skjulte Bindinger</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Vælg den løsning der passer bedst til din virksomhed. Vi tilbyder både fuld oprettelse og løbende optimering med fuldt ejerskab.
            </p>
          </div>
        </section>

        {/* Pricing Component */}
        <div className="pb-16">
          <PricingSection />
        </div>
      </div>

      <FooterComponent onOpenContact={onOpenContact} />
    </div>
  );
};

export default PricingPage;
