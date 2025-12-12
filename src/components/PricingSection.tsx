import { useState } from 'react';
import { Check } from 'lucide-react';
import { stripeProducts } from '../stripe-config';

const PricingSection = () => {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    if (priceId === 'price_1SdN0o22WWIq95RMeiPWG3CJ') {
      // Custom pricing - open contact modal instead
      const contactButton = document.querySelector('[data-contact-trigger]') as HTMLButtonElement;
      if (contactButton) {
        contactButton.click();
      }
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
          cancelUrl: window.location.href,
        }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoadingPriceId(null);
    }
  };

  const productFeatures: Record<string, string[]> = {
    'prod_TaY7yhzKC1nLmD': [
      'Skræddersyet løsning til dine behov',
      'Fleksibel pris baseret på omfang',
      'Personlig konsultation'
    ],
    'prod_TaY4maI2H9O4om': [
      'Google Maps integration',
      'Avanceret SEO optimering',
      'Lokal søgeord targeting',
      'Google Virksomhedsprofil setup',
      'Citation opbygning'
    ],
    'prod_TaXm2PawSXhMmc': [
      'Professionel hjemmeside',
      'Mobil-venlig design',
      'Basis SEO optimering',
      'Hurtig indlæsning',
      'Kontaktformular'
    ]
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ backgroundColor: '#1e293b' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 font-light tracking-tight">
            Vælg din pakke
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
            Engangsbetaling. Ingen skjulte omkostninger. Inklusiv hosting og support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stripeProducts.map((product, index) => {
            const isPopular = index === 1;
            return (
              <div
                key={product.id}
                className="relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: '#0f172a',
                  border: isPopular ? '2px solid #f59e0b' : '1px solid rgba(148, 163, 184, 0.2)'
                }}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="px-6 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: '#f59e0b', color: '#0f172a' }}>
                      MEST POPULÆR
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8 pt-4">
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {product.name}
                  </h3>
                  {product.id === 'prod_TaY4maI2H9O4om' && (
                    <p className="text-white/60 text-sm mb-6">
                      Mest populær til voksende virksomheder
                    </p>
                  )}
                  {product.id === 'prod_TaY7yhzKC1nLmD' && (
                    <p className="text-white/60 text-sm mb-6">
                      Få et uforpligtende tilbud
                    </p>
                  )}
                  {product.id === 'prod_TaXm2PawSXhMmc' && (
                    <p className="text-white/60 text-sm mb-6">
                      Komplet hjemmeside til din virksomhed
                    </p>
                  )}
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-white">
                      {product.price_per_unit ? product.price_per_unit.toLocaleString('da-DK').replace('.', '.') : '0'}
                    </span>
                    <span className="text-2xl text-white/80 ml-2">kr</span>
                  </div>
                  <p className="text-white/60 text-sm">Engangsbetaling</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {productFeatures[product.id]?.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="w-5 h-5 flex-shrink-0 mr-3 mt-0.5" style={{ color: '#f59e0b' }} />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleCheckout(product.priceId)}
                  disabled={loadingPriceId === product.priceId}
                  className="w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: isPopular ? '#f59e0b' : 'transparent',
                    border: isPopular ? 'none' : '2px solid #f59e0b',
                    color: isPopular ? '#0f172a' : '#f59e0b'
                  }}
                  onMouseEnter={(e) => {
                    if (!isPopular) {
                      e.currentTarget.style.backgroundColor = '#f59e0b';
                      e.currentTarget.style.color = '#0f172a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isPopular) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#f59e0b';
                    }
                  }}
                >
                  {loadingPriceId === product.priceId ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin mr-2"></div>
                      Indlæser...
                    </div>
                  ) : product.price_per_unit ? (
                    'Køb nu'
                  ) : (
                    'Få tilbud'
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-white/70 mb-6">
            Har du spørgsmål eller brug for en skræddersyet løsning?
          </p>
          <button
            data-contact-trigger
            onClick={() => {
              const event = new CustomEvent('openContactModal');
              window.dispatchEvent(event);
            }}
            className="px-8 py-3 rounded-lg font-bold transition-all duration-300"
            style={{
              backgroundColor: 'transparent',
              border: '2px solid #f59e0b',
              color: '#f59e0b'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f59e0b';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#f59e0b';
            }}
          >
            Kontakt os
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;