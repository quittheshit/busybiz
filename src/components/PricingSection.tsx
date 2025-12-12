import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { STRIPE_PRODUCTS } from '../stripe-config';

const PricingSection = () => {
  const { user } = useAuth();
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

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
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/checkout`,
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

  const formatPrice = (price?: number, currency: string = 'kr') => {
    if (!price) return 'Kontakt for pris';
    return `${price.toLocaleString('da-DK')} ${currency}`;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-yellow-600/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-br from-amber-500/15 to-orange-400/10 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Vælg din løsning
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Professionelle løsninger til at få din virksomhed til at vokse online
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {STRIPE_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                    {product.name}
                  </h3>
                  <div className="text-3xl font-bold text-amber-400 mb-2">
                    {formatPrice(product.price_per_unit, product.currency_symbol)}
                  </div>
                  {product.price_per_unit && (
                    <p className="text-white/60 text-sm">Engangsbetaling</p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-white/80 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleCheckout(product.priceId)}
                  disabled={loadingPriceId === product.priceId}
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loadingPriceId === product.priceId ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin mr-2"></div>
                      Indlæser...
                    </div>
                  ) : product.price_per_unit ? (
                    'Køb nu'
                  ) : (
                    'Kontakt os'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-white/80 mb-6">
            Har du spørgsmål eller brug for en skræddersyet løsning?
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById('marketing');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center px-8 py-3 border-2 border-amber-400 text-amber-400 font-semibold rounded-full hover:bg-amber-400 hover:text-slate-900 transition-all duration-300"
          >
            Kontakt os
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;