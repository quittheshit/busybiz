import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { Check, Shield, CreditCard, Lock } from 'lucide-react';

const PricingSection = () => {
  const { user } = useAuth();
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoadingPriceId(priceId);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/?payment=success`,
          cancelUrl: `${window.location.origin}/?payment=cancelled`,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Der opstod en fejl. Prøv venligst igen.');
    } finally {
      setLoadingPriceId(null);
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return '0';
    return price.toLocaleString('da-DK');
  };

  const productFeatures: Record<string, string[]> = {
    'Brugerdefineret': [
      'Skræddersyet løsning til dine behov',
      'Fleksibel pris baseret på omfang',
      'Personlig konsultation',
      'Alle funktioner tilgængelige',
      'Kontakt os for et uforpligtende tilbud'
    ],
    'Lokal SEO – Første side / Top 3 på Google': [
      'Google Maps integration',
      'Avanceret SEO optimering',
      'Top 3 placering på Google',
      'Lokal synlighed',
      'Øget kundetilgang',
      '6 måneders support'
    ],
    'Ny Hjemmeside': [
      'Professionel hjemmeside',
      'Mobil-venlig design',
      'Basis SEO optimering',
      'Kontakt formular',
      'Hosting inkluderet',
      '3 måneders support'
    ]
  };

  const isPopular = (name: string) => name === 'Lokal SEO – Første side / Top 3 på Google';

  return (
    <section className="relative overflow-hidden bg-[#1e293b] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="headline-font text-4xl md:text-5xl text-white mb-4 leading-tight">
            Vælg din pakke
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Engangsbetaling. Ingen skjulte omkostninger. Inklusiv hosting og support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {STRIPE_PRODUCTS.map((product) => {
            const popular = isPopular(product.name);
            const features = productFeatures[product.name] || [];

            return (
              <div
                key={product.id}
                className={`relative bg-[#334155] rounded-2xl p-8 ${
                  popular
                    ? 'border-2 border-amber-500'
                    : 'border border-slate-600'
                }`}
              >
                {popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-amber-500 text-slate-900 px-6 py-2 rounded-full text-sm font-bold uppercase">
                      Mest populær
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {product.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-6 min-h-[60px]">
                    {product.name === 'Brugerdefineret'
                      ? 'Få et uforpligtende tilbud'
                      : product.name === 'Lokal SEO – Første side / Top 3 på Google'
                      ? 'Mest populær til voksende virksomheder'
                      : 'Komplet hjemmeside til din virksomhed'
                    }
                  </p>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-white">
                      {formatPrice(product.price_per_unit)}
                    </span>
                    <span className="text-2xl text-white/80 ml-2">kr</span>
                  </div>
                  <p className="text-white/60 text-sm">Engangsbetaling</p>
                </div>

                {/* Features */}
                <div className="mb-8 space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleCheckout(product.priceId)}
                  disabled={loadingPriceId === product.priceId}
                  className={`w-full font-bold py-4 px-6 rounded-full transition-all duration-300 ${
                    popular
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-900'
                      : 'bg-slate-600 hover:bg-slate-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loadingPriceId === product.priceId ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Indlæser...
                    </div>
                  ) : (
                    'VÆLG PAKKE'
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Stripe Security */}
        <div className="text-center">
          <p className="text-white/70 mb-6">Sikker betaling med Stripe</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-white/70">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm">SSL Sikret</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <span className="text-sm">Alle betalingskort accepteret</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Lock className="w-5 h-5 text-amber-500" />
              <span className="text-sm">30 dages pengene tilbage garanti</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;