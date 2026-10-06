import React from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { NavigationHeader } from '../components/NavigationHeader';
import { FooterComponent } from '../components/FooterComponent';
import { Link } from 'react-router-dom';

interface PageProps {
  onOpenContact: () => void;
}

const HjemmesiderPage: React.FC<PageProps> = ({ onOpenContact }) => {
  usePageMeta({
    title: 'Skræddersyede Hjemmesider til Lokale Firmaer',
    description: 'Få en moderne, lynhurtig og mobiloptimeret hjemmeside til dit lokale firma i Danmark. Skabt til at skaffe flere kunder og øge din omsætning.',
    canonicalPath: '/hjemmesider',
    keywords: 'hjemmeside, webdesign, professionel hjemmeside, mobilvenlig hjemmeside, firma hjemmeside Danmark'
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      <div>
        <NavigationHeader onOpenContact={onOpenContact} />

        {/* Hero Banner */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-widest uppercase">
              Webdesign & Hjemmeside-udvikling
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Professionelle Hjemmesider der <span className="text-gradient">Forvandler Besøgende til Kunder</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Din hjemmeside er dit vigtigste digitale udstillingsvindue. Vi bygger moderne, mobiloptimerede og lynhurtige hjemmesider, der skaber tillid fra første sekund og leverer konkrete henvendelser.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onOpenContact}
                className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-orange-500 text-slate-900 font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                FÅ ET UFORPLIGTENDE TILBUD
              </button>
              <Link
                to="/priser"
                className="bg-slate-800 hover:bg-slate-700 border border-amber-400/30 text-amber-300 font-bold py-3.5 px-8 rounded-full transition-all duration-300 no-underline"
              >
                SE PRISER & PAKKER
              </Link>
            </div>
          </div>
        </section>

        {/* Key Benefits Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Hvad gør en BusyBiz hjemmeside unik?</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Vi designer ikke bare pæne sider – vi bygger salgsmaskiner skræddersyet til danske håndværkere, klinikker og lokale servicevirksomheder.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 p-8 rounded-2xl border border-amber-500/20 shadow-xl hover:border-amber-400/40 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">100% Mobiloptimeret</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Over 70% af dine kunder søger fra mobilen. Vores hjemmesider indlæser øjeblikkeligt og tilpasser sig perfekt til enhver skærm.
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-amber-500/20 shadow-xl hover:border-amber-400/40 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-teal-400/10 border border-teal-400/30 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Lynhurtig Indlæsning</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Langsomme sider mister kunder og straffes af Google. Vi optimerer billeder, kode og hosting for maksimal hastighed.
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-amber-500/20 shadow-xl hover:border-amber-400/40 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">SEO & GEO Klar fra Dag 1</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Strukturerede JSON-LD data og søgeoptimerede overskrifter gør din nye side nem at finde for både Google og AI-tjenester som ChatGPT.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-4 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-yellow-500/10 border-y border-amber-500/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Klar til at opgradere din virksomheds udstillingsvindue?</h2>
            <p className="text-white/80 mb-8">Kontakt os i dag for en uforpligtende samtale om din nye hjemmeside.</p>
            <button
              onClick={onOpenContact}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 text-slate-900 font-bold py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              START DIT PROJEKT NU
            </button>
          </div>
        </section>
      </div>

      <FooterComponent onOpenContact={onOpenContact} />
    </div>
  );
};

export default HjemmesiderPage;
