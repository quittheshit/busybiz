import React from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { NavigationHeader } from '../components/NavigationHeader';
import { FooterComponent } from '../components/FooterComponent';

interface PageProps {
  onOpenContact: () => void;
}

const MarketingPage: React.FC<PageProps> = ({ onOpenContact }) => {
  usePageMeta({
    title: 'Digital Marketing & Automatisering til Lokale Virksomheder',
    description: 'Automatiser din kundeservice og markedsføring. Få flere leads, automatisk booking og spar 5-10 timer om ugen med BusyBiz.',
    canonicalPath: '/marketing',
    keywords: 'digital marketing, automatisering, automatisk kundeservice, leads generering, marketing til håndværkere'
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      <div>
        <NavigationHeader onOpenContact={onOpenContact} />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase">
              Marketing & Smart Automatisering
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Tiltræk Flere Kunder & <span className="text-gradient">Automatiser Dit Salg</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Slip for at spilde tid på manuelle svar, manglende opfølgninger og ineffektiv markedsføring. Vi opbygger automatiserede systemer, der arbejder for dig 24/7.
            </p>
            <button
              onClick={onOpenContact}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 text-slate-900 font-bold py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              TAL MED OS OM AUTOMATISERING
            </button>
          </div>
        </section>

        {/* Value Proposition Steps */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 p-8 rounded-2xl border border-teal-500/30 shadow-lg text-center">
              <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-teal-400 text-2xl font-bold">
                🧲
              </div>
              <h3 className="text-xl font-bold mb-3">Flere Kunder Online</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Målrettet lokal tilstedeværelse på sociale medier, Google og AI-værktøjer skaber en konstant strøm af relevante henvendelser.
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-amber-500/30 shadow-lg text-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-400 text-2xl font-bold">
                📈
              </div>
              <h3 className="text-xl font-bold mb-3">Højere Konvertering</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Klare budskaber og professionelle tilbudsskabeloner overbeviser potentielle kunder om at vælge netop din virksomhed.
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-blue-500/30 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400 text-2xl font-bold">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-3">Automatiseret Kundeservice</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Automatisk besvarelse af mails, bookingpåmindelser og SMS-opfølgning sparer dig for op til 10 timer om ugen.
              </p>
            </div>
          </div>
        </section>
      </div>

      <FooterComponent onOpenContact={onOpenContact} />
    </div>
  );
};

export default MarketingPage;
