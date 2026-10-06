import React from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { getServiceSchema, getBreadcrumbSchema } from '../lib/schemaGraph';
import { NavigationHeader } from '../components/NavigationHeader';
import { FooterComponent } from '../components/FooterComponent';
import RankSearchSection from '../components/RankSearchSection';

interface PageProps {
  onOpenContact: () => void;
}

const SeoPage: React.FC<PageProps> = ({ onOpenContact }) => {
  usePageMeta({
    title: 'Lokal SEO & Google Optimering til Danske Virksomheder',
    description: 'Bliv fundet øverst på Google og Google Maps. Lokal SEO optimering skræddersyet til danske firmaer. Få flere kunder i dit lokalområde.',
    canonicalPath: '/seo',
    keywords: 'SEO optimering, lokal SEO, Google optimering, Google Maps SEO, søgemaskineoptimering Danmark'
  });

  useJsonLd(
    getServiceSchema(
      'Lokal SEO & Google Optimering',
      'Top-placeringer på Google og Google Maps i dit lokalområde.',
      '/seo'
    ),
    'seo-service-schema'
  );
  useJsonLd(getBreadcrumbSchema('SEO', '/seo'), 'seo-breadcrumb-schema');

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      <div>
        <NavigationHeader onOpenContact={onOpenContact} />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-widest uppercase">
              Søgemaskineoptimering (SEO & GEO)
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Bliv Fundet <span className="text-gradient">Øverst på Google & Google Maps</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Når kunder i dit nærområde søger efter dine ydelser, skal din virksomhed være det første valg. Vi optimerer din synlighed på Google, Google Maps og AI-søgemaskiner som ChatGPT.
            </p>
            <button
              onClick={onOpenContact}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 text-slate-900 font-bold py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              FÅ EN GRATIS SEO-ANALYSE
            </button>
          </div>
        </section>

        {/* Interactive Rank Search Visualizer */}
        <div className="py-8 bg-slate-900/90">
          <RankSearchSection />
        </div>

        {/* SEO Strategy Pillars */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Tre Søjler i Vores SEO-Optimering</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Vi kombinerer teknisk excellence, lokalt søgefokus og fremtidssikret GEO (Generative Engine Optimization).</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 p-8 rounded-2xl border border-amber-500/20 shadow-xl">
              <div className="text-amber-400 text-3xl font-bold mb-4">01</div>
              <h3 className="text-xl font-bold mb-3">Lokal Google Maps SEO</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Dominér "Map Pack" når kunder i din by søger efter lokale fagfolk. Vi optimerer din Google Business Profil og geografiske søgeord.
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-amber-500/20 shadow-xl">
              <div className="text-teal-400 text-3xl font-bold mb-4">02</div>
              <h3 className="text-xl font-bold mb-3">Teknisk & On-Page SEO</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Strukturerede overskrifter (H1/H2), lynhurtig kodeload og mobiloptimering sikrer, at Google belønner din side med topplaceringer.
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-amber-500/20 shadow-xl">
              <div className="text-cyan-400 text-3xl font-bold mb-4">03</div>
              <h3 className="text-xl font-bold mb-3">AEO & AI Search (GEO)</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Kunder spørger i dag ChatGPT og Perplexity. Vi implementerer JSON-LD structured data og AEO-formaterede svar, så AI-modeller fremhæver dig.
              </p>
            </div>
          </div>
        </section>
      </div>

      <FooterComponent onOpenContact={onOpenContact} />
    </div>
  );
};

export default SeoPage;
