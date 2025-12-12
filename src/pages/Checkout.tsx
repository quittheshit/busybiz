import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Checkout = () => {
  const { user } = useAuth();
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Tilbage til forsiden</span>
            </Link>
            <div className="flex items-center space-x-3">
              <img
                src="/Busybiz-mascot-transparent-Photoroom.png"
                alt="BusyBiz Logo"
                className="w-8 h-8"
              />
              <span className="text-white font-bold">BUSYBIZ</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Vælg din løsning
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Professionelle løsninger til at få din virksomhed til at vokse online
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STRIPE_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">
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

              {/* Features (if any specific features need to be highlighted) */}
              {product.name === 'Ny Hjemmeside' && (
                <div className="mb-6">
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      Skræddersyet moderne design
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      Mobilvenlig og hurtig indlæsning
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      Grundlæggende SEO opsætning
                    </li>
                  </ul>
                </div>
              )}

              {product.name === 'Lokal SEO – Første side / Top 3 på Google' && (
                <div className="mb-6">
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      On-page SEO optimering
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      Google Virksomhedsprofil
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      Lokale citations opbygning
                    </li>
                  </ul>
                </div>
              )}

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
          ))}
        </div>

        {/* Security Notice */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            🔒 Sikker betaling via Stripe. Dine betalingsoplysninger er beskyttet med bank-niveau kryptering.
          </p>
        </div>
      </main>
    </div>
  );
};