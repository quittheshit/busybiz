import { useState } from 'react';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { Check, Shield, CreditCard, Lock } from 'lucide-react';

const PricingSection = () => {
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
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#1e293b] to-slate-950 py-24 md:py-32">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-yellow-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-br from-amber-400/10 to-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

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
                className={`relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 hover:transform hover:-translate-y-2 group ${
                  popular
                    ? 'border-2 border-transparent bg-gradient-to-br from-amber-500/20 via-slate-800 to-slate-900'
                    : 'border border-slate-700/50'
                }`}
                style={popular ? {
                  boxShadow: '0 0 40px rgba(251, 191, 36, 0.15), inset 0 0 20px rgba(251, 191, 36, 0.05)'
                } : {}}
              >
                {/* Golden border effect for popular card */}
                {popular && (
                  <div className="absolute inset-0 rounded-3xl border-2 border-amber-500/60 pointer-events-none"></div>
                )}

                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  popular ? 'bg-gradient-to-br from-amber-500/10 to-transparent' : 'bg-gradient-to-br from-amber-500/5 to-transparent'
                }`}></div>

                {popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-900 px-6 py-2 rounded-full text-sm font-bold uppercase shadow-lg">
                      Mest populær
                    </span>
                  </div>
                )}

                <div className="relative z-10">
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
                      <span className="text-5xl font-bold bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
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
                        <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleCheckout(product.priceId)}
                    disabled={loadingPriceId === product.priceId}
                    className={`w-full font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg ${
                      popular
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-900 shadow-amber-500/30 hover:shadow-amber-500/50 hover:shadow-xl'
                        : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white shadow-slate-900/50'
                    } disabled:opacity-50 disabled:cursor-not-allowed hover:transform hover:-translate-y-1`}
                  >
                    {loadingPriceId === product.priceId ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin mr-2"></div>
                        Indlæser...
                      </div>
                    ) : (
                      'VÆLG PAKKE'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stripe Security */}
        <div className="text-center">
          <p className="text-white/70 mb-6">Sikker betaling med Stripe</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">SSL Sikret</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <CreditCard className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Alle betalingskort accepteret</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Lock className="w-5 h-5 text-amber-400" />
              <span className="text-sm">30 dages pengene tilbage garanti</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;