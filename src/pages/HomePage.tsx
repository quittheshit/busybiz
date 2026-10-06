import React from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { getGlobalBusinessSchema, getFaqPageSchema } from '../lib/schemaGraph';
import { NavigationHeader } from '../components/NavigationHeader';
import { FooterComponent } from '../components/FooterComponent';
import RankSearchSection from '../components/RankSearchSection';
import PricingSection from '../components/PricingSection';
import { FaqSection } from '../components/FaqSection';

interface HomePageProps {
  onOpenContact: () => void;
  handleContactSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  contactSuccessMessage: boolean;
  contactErrorMessage: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenContact,
  handleContactSubmit,
  isSubmitting,
  contactSuccessMessage,
  contactErrorMessage
}) => {
  usePageMeta({
    title: 'Hjemmeside, SEO & Marketing til Lokale Firmaer i Danmark',
    description: 'Få flere kunder med en professionel hjemmeside, SEO optimering og automatisering til lokale firmaer i Danmark. Bliv fundet på Google før dine konkurrenter.',
    canonicalPath: '/',
    keywords: 'hjemmeside, webdesign, SEO, søgemaskineoptimering, marketing, automatisering, lokale firmaer, Danmark'
  });

  // Inject Global Business & FAQ Schemas
  useJsonLd(getGlobalBusinessSchema(), 'global-business-schema');
  useJsonLd(getFaqPageSchema(), 'faq-page-schema');

  return (
    <div>
      <NavigationHeader onOpenContact={onOpenContact} />

      {/* Hero Section */}
      <section id="hjemmesider" className="premium-hero-bg relative overflow-hidden">
        <img
          src="/localbiz-background-smaller.png"
          alt=""
          className="hero-bg-image"
          fetchPriority="high"
          decoding="async"
          aria-hidden="true"
        />
        <div className="premium-hero-overlay"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-[10%] opacity-80 animate-float-icon" style={{animationDelay: '0s'}}>
          <div className="premium-float-icon">
            <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[85vh] py-20 px-4 sm:px-6 md:px-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="fade-in stagger-1 text-white/90 uppercase mb-4 tracking-widest text-sm font-light">
              DANMARKS BEDSTE
            </div>
            <h1 className="fade-in stagger-2 text-white mb-6 px-4">
              <span className="premium-headline-top">
                Web Design, SEO, Marketing<br/>
                & <span className="text-gradient">Automatisering</span>
              </span>
              <span className="premium-headline-bottom block mt-4">
                til Lokale Firmaer i Danmark
              </span>
            </h1>
            <p className="fade-in stagger-4 text-white/90 px-6 mb-10 max-w-3xl mx-auto" style={{fontSize: '1rem', lineHeight: '1.6'}}>
              Bliv byens GO-TO firma i din branche med en top-position i søgeresultaterne, byens bedste hjemmeside, professionel markedsføring og automatiseret kundeservice mm.
            </p>
            <div className="fade-in stagger-5 mb-10">
              <button className="premium-cta-button" onClick={onOpenContact} aria-label="Åbn kontakt formular">
                <span>FÅ MERE SUCCES NU</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rank Search Section */}
      <div id="seo">
        <RankSearchSection />
      </div>

      {/* Marketing / Contact Section */}
      <section id="marketing" className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <img
                src="/Busybiz-mascot-transparent-Photoroom.png"
                alt="BusyBiz Mascot"
                className="w-20 h-20 md:w-24 md:h-24 drop-shadow-lg"
              />
            </div>
            <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Vil du have flere kunder<br />ind ad døren?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Hvis du føler at konkurrenterne løber med kunderne, eller omvendt hvis du får flere mails end du kan nå at svare på, så skriv til mig.
            </p>
          </div>

          <div id="contact" className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-amber-500/20">
              <h3 className="headline-font text-2xl md:text-3xl text-white mb-6">Send din besked</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="homeName" className="block text-sm font-medium text-white/90 mb-2">Navn</label>
                  <input
                    type="text"
                    id="homeName"
                    name="name"
                    placeholder="Dit fulde navn"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-500/30 bg-slate-700/50 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="homeEmail" className="block text-sm font-medium text-white/90 mb-2">Email</label>
                  <input
                    type="email"
                    id="homeEmail"
                    name="email"
                    placeholder="din@email.dk"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-500/30 bg-slate-700/50 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="homeMessage" className="block text-sm font-medium text-white/90 mb-2">Hvad vil du gerne have hjælp til?</label>
                  <textarea
                    id="homeMessage"
                    name="message"
                    placeholder="Fortæl mig om din situation..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-500/30 bg-slate-700/50 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all outline-none text-white placeholder-gray-400 resize-none"
                  ></textarea>
                </div>
                {contactSuccessMessage && (
                  <div className="bg-emerald-500/20 border-l-4 border-emerald-500 p-4 rounded-lg text-emerald-200 text-sm">
                    Tak for din besked! Vi vender tilbage hurtigst muligt.
                  </div>
                )}
                {contactErrorMessage && (
                  <div className="bg-red-500/20 border-l-4 border-red-500 p-4 rounded-lg text-red-200 text-sm">
                    Der opstod en fejl. Prøv venligst igen.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-yellow-500 text-slate-900 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'SENDER...' : 'SEND MIN BESKED'}
                </button>
              </form>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-8 flex flex-col justify-center">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-amber-500/20">
                <h4 className="text-xl font-bold text-white mb-6">Eller kontakt mig direkte</h4>
                <div className="space-y-5">
                  <a href="mailto:miklhagstroem@gmail.com" className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-700/50 transition-colors group text-white no-underline">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
                      ✉️
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/60 uppercase">Email</p>
                      <p className="text-white font-medium">miklhagstroem@gmail.com</p>
                    </div>
                  </a>
                  <a href="tel:+4581260711" className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-700/50 transition-colors group text-white no-underline">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
                      📞
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/60 uppercase">Telefon</p>
                      <p className="text-white font-medium">+45 81 26 07 11</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id="priser">
        <PricingSection />
      </div>

      {/* FAQ Section with JSON-LD Schema */}
      <div id="faq">
        <FaqSection />
      </div>

      <FooterComponent onOpenContact={onOpenContact} />
    </div>
  );
};
