import React, { useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { NavigationHeader } from '../components/NavigationHeader';
import { FooterComponent } from '../components/FooterComponent';

interface PageProps {
  onOpenContact: () => void;
}

export interface FaqItem {
  id: number;
  question: string;
  directAnswer: string;
  fullAnswer: string;
  category: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    question: "Hvorfor har min lokale virksomhed brug for en professionel hjemmeside?",
    directAnswer: "En professionel hjemmeside fungerer som dit digitale udstillingsvindue døgnet rundt, der opbygger troværdighed, skaffer nye kunder og adskiller dig fra lokale konkurrenter.",
    fullAnswer: "Uden en mobiloptimeret og hurtig hjemmeside mister du kunder til konkurrenter med bedre online synlighed. En moderne hjemmeside fra BusyBiz er bygget til at konvertere besøgende til konkrete henvendelser via telefon og kontaktformularer.",
    category: "Hjemmesider"
  },
  {
    id: 2,
    question: "Hvor hurtigt kan min virksomhed se resultater af SEO-optimering?",
    directAnswer: "Lokal SEO og teknisk optimering viser typisk de første målbare resultater på Google inden for 4 til 12 uger.",
    fullAnswer: "Hvor hurtigt det går afhænger af konkurrencen i din branche og din virksomheds placering i Danmark. Lokal SEO på Google Maps giver ofte hurtige placeringer, mens større søgeord bygger organisk styrke over tid.",
    category: "SEO"
  },
  {
    id: 3,
    question: "Hvad koster en ny hjemmeside eller SEO-optimering hos BusyBiz?",
    directAnswer: "Hos BusyBiz tilbyder vi gennemskuelige løsninger skræddersyet til mindre og mellemstore danske virksomheder med faste priser uden skjulte gebyrer.",
    fullAnswer: "Vores pakker dækker alt fra hurtig oprettelse af hjemmeside til komplet lokal SEO og automatisering. Du finder en fuld oversigt på vores prisside, og du ejer altid 100% af dit domæne og dit indhold.",
    category: "Priser"
  },
  {
    id: 4,
    question: "Hvordan hjælper automatisering min virksomhed med at spare tid?",
    directAnswer: "Automatisering frakobler manuelle opgaver som besvarelse af hyppige spørgsmål, booking af aftaler og opfølgning på tilbud.",
    fullAnswer: "Det sparer dig typisk for 5-10 timers administrativt arbejde om ugen, så du kan fokusere på dine kunder og dit håndværk frem for skrivebordsarbejde.",
    category: "Marketing"
  },
  {
    id: 5,
    question: "Kan BusyBiz hjælpe min eksisterende hjemmeside med at få flere kunder?",
    directAnswer: "Ja, vi udfører en grundig teknisk SEO-analyse og design-optimering af din nuværende hjemmeside.",
    fullAnswer: "Vi identificerer hastighedsproblemer, manglende søgeord og svage konverteringselementer for at hjælpe dig med at rykke op på Google og omdanne besøgende til betalende kunder.",
    category: "SEO"
  },
  {
    id: 6,
    question: "Hvad er forskellen på Google SEO og Google Ads (PPC)?",
    directAnswer: "Google SEO skaber permanent, organisk synlighed på søgeresultaterne uden at betale pr. klik, mens Google Ads er betalte annoncer.",
    fullAnswer: "Google Ads giver øjeblikkelige betalte placeringer, men stopper så snart budgettet er brugt. Organisk SEO opbygger langvarig værdi og autoritet, som fortsætter med at levere gratis kunder måned efter måned.",
    category: "SEO"
  },
  {
    id: 7,
    question: "Hvorfor er lokal SEO særlig vigtig for håndværkere, frisører og klinikker?",
    directAnswer: "Kunder søger efter lokale fagfolk i deres nærområde (f.eks. 'tømrer i Aarhus' eller 'frisør i Odense').",
    fullAnswer: "Lokal SEO sikrer, at din virksomhed dominerer kortvisningen (Google Maps) og de øverste søgeresultater i netop dit lokalområde, hvor købeintentionen er højest.",
    category: "SEO"
  },
  {
    id: 8,
    question: "Hvordan sikrer BusyBiz, at min virksomhed anbefales i ChatGPT og Perplexity (GEO)?",
    directAnswer: "Vi opbygger din hjemmeside med strukturerede JSON-LD data, klare FAQ-blokke og autoritativt dansk indhold.",
    fullAnswer: "AI-søgemaskiner (som ChatGPT, Claude og Google Gemini) scanner og bruger netop disse strukturerede kilder til at generere direkte svar og anbefale lokale serviceudbydere til brugerne.",
    category: "GEO / AI"
  },
  {
    id: 9,
    question: "Er der langvarig binding på aftaler hos BusyBiz?",
    directAnswer: "Nej, hos BusyBiz tror vi på gennemskuelige aftaler og tilfredse kunder frem for lange bindinger.",
    fullAnswer: "Du ejer altid din hjemmeside, dit domæne og dine data 100%. Vi arbejder løbende på at skabe resultater for dig, ikke på at låse dig fast i uigennemskuelige kontrakter.",
    category: "Generelt"
  },
  {
    id: 10,
    question: "Hvordan kommer jeg i gang, og hvor lang tid tager det at bygge en ny hjemmeside?",
    directAnswer: "Du kontakter os blot via vores kontaktformular eller på tlf. +45 81 26 07 11 til en uforpligtende snak.",
    fullAnswer: "En ny professionel hjemmeside klar til lancering tager typisk mellem 1 og 3 uger fra første møde til den er live på nettet.",
    category: "Generelt"
  }
];

const FaqPage: React.FC<PageProps> = ({ onOpenContact }) => {
  usePageMeta({
    title: 'Ofte Stillede Spørgsmål (FAQ) | Webdesign, SEO & Marketing',
    description: 'Få svar på de mest almindelige spørgsmål om hjemmesider, Google SEO optimering, priser og automatisering for danske virksomheder.',
    canonicalPath: '/faq',
    keywords: 'FAQ hjemmeside, spørgsmål om SEO, hvor hurtigt virker SEO, BusyBiz FAQ, webdesign spørgsmål'
  });

  const [openId, setOpenId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_DATA.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.directAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.fullAnswer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      <div>
        <NavigationHeader onOpenContact={onOpenContact} />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-widest uppercase">
              Viden & Ofte Stillede Spørgsmål
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Alt Du Skal Vide Om <span className="text-gradient">Hjemmesider & SEO</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Find hurtige svar på de mest almindelige spørgsmål om priser, Google-optimering, AI-synlighed og automatisering.
            </p>

            {/* Search Input */}
            <div className="max-w-md mx-auto relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Søg i spørgsmål (f.eks. SEO, priser, hastighed)..."
                className="w-full py-3.5 px-5 pl-12 rounded-full bg-slate-800/90 border border-amber-400/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm shadow-xl"
              />
              <svg className="w-5 h-5 text-amber-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </section>

        {/* FAQ Accordion List */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-slate-800/80 border border-amber-500/20 rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:border-amber-400/40"
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="w-full py-5 px-6 text-left flex items-center justify-between focus:outline-none cursor-pointer"
                    >
                      <span className="font-bold text-lg text-white pr-4">{faq.question}</span>
                      <span className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0 text-amber-300">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 border-t border-slate-700/50 text-white/80 space-y-3 animate-fadeIn">
                        {/* AEO Direct Answer Highlight Box */}
                        <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-amber-100 text-sm font-medium leading-relaxed">
                          <strong>Kort svar (AEO Summary):</strong> {faq.directAnswer}
                        </div>
                        <p className="text-sm leading-relaxed text-white/90">
                          {faq.fullAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-white/60">
                Ingen spørgsmål matchede din søgning. Prøv et andet ord eller skriv direkte til os.
              </div>
            )}
          </div>
        </section>

        {/* Still have questions CTA */}
        <section className="py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-amber-500/20 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">Har du et spørgsmål, du ikke fandt svar på?</h3>
            <p className="text-white/70 text-sm mb-6">Vi sidder klar til at hjælpe dig. Ring eller skriv til os for en uforpligtende snak.</p>
            <button
              onClick={onOpenContact}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              SPØRG OS DIREKTE
            </button>
          </div>
        </section>
      </div>

      <FooterComponent onOpenContact={onOpenContact} />
    </div>
  );
};

export default FaqPage;
