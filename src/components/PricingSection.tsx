import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  priceId: string;
  features: string[];
  popular?: boolean;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Starter',
    description: 'Perfekt til små virksomheder',
    price: '2.999',
    priceId: 'price_STARTER_ID',
    features: [
      'Professionel hjemmeside',
      'Mobil-venlig design',
      'Basis SEO optimering',
      'Kontakt formular',
      '3 måneders support'
    ]
  },
  {
    id: '2',
    name: 'Professional',
    description: 'Mest populær til voksende virksomheder',
    price: '5.999',
    priceId: 'price_PROFESSIONAL_ID',
    features: [
      'Alt fra Starter pakken',
      'Avanceret SEO optimering',
      'Google Maps integration',
      'AI chatbot assistent',
      'Marketing automatisering',
      '6 måneders support'
    ],
    popular: true
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'Komplet løsning til etablerede virksomheder',
    price: '9.999',
    priceId: 'price_ENTERPRISE_ID',
    features: [
      'Alt fra Professional pakken',
      'Booking & betalingssystem',
      'Kundeportal',
      'Social media integration',
      'Månedlige analyser & optimering',
      '12 måneders premium support'
    ]
  }
];

export default function PricingSection() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, productName: string) => {
    setIsLoading(priceId);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}#pricing`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Der opstod en fejl. Prøv venligst igen eller kontakt os direkte.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <section id="pricing" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 md:py-32">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-yellow-600/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-br from-amber-500/15 to-orange-400/10 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Vælg din pakke
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Engangsbetaling. Ingen skjulte omkostninger. Inklusiv hosting og support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                product.popular ? 'border-2 border-amber-500/50 scale-105' : 'border border-slate-700'
              }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  MEST POPULÆR
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-white/70 text-sm mb-6">{product.description}</p>

                <div className="flex items-end justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-white">{product.price}</span>
                  <span className="text-2xl text-white/70 mb-2">kr</span>
                </div>
                <p className="text-white/60 text-sm">Engangsbetaling</p>
              </div>

              <ul className="space-y-4 mb-8">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/90 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(product.priceId, product.name)}
                disabled={isLoading === product.priceId}
                className={`w-full py-4 px-8 rounded-full font-bold transition-all duration-300 ${
                  product.popular
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-yellow-500 hover:to-orange-600 text-slate-900 shadow-lg hover:shadow-xl'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading === product.priceId ? 'ÅBNER BETALING...' : 'VÆLG PAKKE'}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <p className="text-white/60 text-sm mb-4">Sikker betaling med Stripe</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-white/70">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">SSL Sikret</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-sm">Alle betalingskort accepteret</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">30 dages pengene tilbage garanti</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
