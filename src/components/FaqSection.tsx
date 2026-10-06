import React, { useState } from 'react';
import { FAQ_DATA } from '../pages/FaqPage';
import { Link } from 'react-router-dom';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 border-t border-amber-500/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            AEO & GEO Spørgsmål
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ofte Stillede Spørgsmål <span className="text-gradient">& Direkte Svar</span>
          </h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto">
            Her er svar på de mest stillede spørgsmål fra danske virksomhedsejere om webdesign, SEO og automatisering.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-800/80 border border-amber-500/20 rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:border-amber-400/40"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-white pr-4">{faq.question}</span>
                  <span className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0 text-amber-300 font-semibold">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-700/50 text-white/80 space-y-3 animate-fadeIn">
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-amber-100 text-sm font-medium leading-relaxed">
                      <strong>Kort svar:</strong> {faq.directAnswer}
                    </div>
                    <p className="text-sm leading-relaxed text-white/90">
                      {faq.fullAnswer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm no-underline hover:underline"
          >
            <span>Se alle spørgsmål & fuld FAQ guide</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
