import { Check } from 'lucide-react';
import { stripeProducts } from '../stripe-config';

const PricingSection = () => {
  const handleCheckout = (checkoutUrl: string) => {
    window.location.href = checkoutUrl;
  };

  const productFeatures: Record<string, string[]> = {
    'prod_TaY7yhzKC1nLmD': [
      'Skræddersyet løsning til dine behov',
      'Fleksibel pris baseret på omfang',
      'Personlig konsultation',
      'Alle funktioner tilgængelige',
      'Kontakt os for et uforpligtende tilbud'
    ],
    'prod_TaY4maI2H9O4om': [
      'Top 5 placering på Google garanteret',
      'Mange flere lokale ser din side',
      'Optimering af Google Profil',
      'Optimering af din hjemmeside',
      'Flere citations (andre sider der godkender dit firma)'
    ],
    'prod_TaXm2PawSXhMmc': [
      'Professionel hjemmeside',
      'Basis SEO og tekst optimering',
      'Basis automatisering (email, kundeformular mm.)',
      '3 Måneders support (vedvarende support kan arrangeres)',
      'Mulighed for tilkøb af udvidet hjemmeside med extra funktioner'
    ]
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ backgroundColor: '#1e293b' }}>
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 font-light tracking-tight">
            Vil du have en fast pris?
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
            Her får du et par muligheder. Kontakt os gerne først og så tilpasser vi meget gerne pris og tjenester til dit behov.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stripeProducts.map((product, index) => {
            const isPopular = index === 1;
            const isRecommended = index === 0;
            return (
              <div
                key={product.id}
                className="relative group"
              >
                {/* Golden Gradient Border for Popular Card */}
                {isPopular && (
                  <div
                    className="absolute inset-0 rounded-3xl transition-all duration-500 group-hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)',
                      padding: '2px',
                      filter: 'blur(0px)'
                    }}
                  >
                    <div className="w-full h-full rounded-3xl" style={{ backgroundColor: '#0f172a' }}></div>
                  </div>
                )}

                <div
                  className="relative rounded-3xl p-8 transition-all duration-500 group-hover:-translate-y-2"
                  style={{
                    backgroundColor: '#0f172a',
                    border: isPopular ? 'none' : '1px solid rgba(148, 163, 184, 0.2)',
                    boxShadow: isPopular
                      ? '0 20px 60px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(251, 191, 36, 0.1)'
                      : '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div
                        className="px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                          color: '#0f172a'
                        }}
                      >
                        MEST POPULÆR
                      </div>
                    </div>
                  )}

                  {/* Recommended Badge */}
                  {isRecommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div
                        className="px-6 py-2 rounded-full text-sm font-medium shadow-md"
                        style={{
                          backgroundColor: 'rgba(148, 163, 184, 0.2)',
                          border: '1px solid rgba(226, 232, 240, 0.3)',
                          color: '#e2e8f0'
                        }}
                      >
                        ANBEFALET
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
                        <Check className="w-5 h-5 flex-shrink-0 mr-3 mt-0.5" style={{ color: '#fbbf24' }} />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleCheckout(product.checkoutUrl)}
                    className="w-full font-bold py-4 px-6 rounded-full transition-all duration-300 text-base uppercase tracking-wider"
                    style={{
                      background: isPopular
                        ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
                        : 'rgba(51, 65, 85, 0.6)',
                      border: isPopular ? 'none' : '2px solid rgba(148, 163, 184, 0.3)',
                      color: isPopular ? '#0f172a' : '#e2e8f0',
                      boxShadow: isPopular
                        ? '0 10px 30px rgba(245, 158, 11, 0.4)'
                        : '0 5px 15px rgba(0, 0, 0, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.5)';
                      } else {
                        e.currentTarget.style.background = 'rgba(71, 85, 105, 0.8)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.4)';
                      } else {
                        e.currentTarget.style.background = 'rgba(51, 65, 85, 0.6)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    VÆLG PAKKE
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="text-center mt-20">
          <p className="text-white/70 mb-8 text-sm">
            Sikker betaling med Stripe
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                <Check className="w-4 h-4" style={{ color: '#22c55e' }} />
              </div>
              <span>SSL Sikret</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
                <Check className="w-4 h-4" style={{ color: '#3b82f6' }} />
              </div>
              <span>Alle betalingskort accepteret</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}>
                <Check className="w-4 h-4" style={{ color: '#f59e0b' }} />
              </div>
              <span>30 dages pengene tilbage garanti</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;