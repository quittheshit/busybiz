import { useState } from 'react';
import { Phone, Zap, TrendingUp, Users, X } from 'lucide-react';
import PricingSection from '../components/PricingSection';
import RankSearchSection from '../components/RankSearchSection';

export function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const openContactModal = () => {
    const modal = document.getElementById('contactModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="premium-header premium-header-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img
                src="/Busybiz-mascot-transparent-Photoroom.png"
                alt="BusyBiz Mascot"
                className="mascot-logo"
              />
              <span className="logo-text text-white uppercase">BUSYBIZ</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 premium-nav desktop-nav">
              <button onClick={() => scrollToSection('hjemmesider')} className="text-white/90 hover:text-white transition-colors">
                HJEMMESIDER
              </button>
              <button onClick={() => scrollToSection('seo')} className="text-white/90 hover:text-white transition-colors">
                SEO
              </button>
              <button onClick={() => scrollToSection('marketing')} className="text-white/90 hover:text-white transition-colors">
                PRISER
              </button>
              <button onClick={openContactModal} className="text-white/90 hover:text-white transition-colors">
                KONTAKT
              </button>
              <a
                href="tel:+4531317450"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-6 py-2.5 rounded-full font-bold hover:shadow-lg transition-all hover:scale-105 desktop-phone"
              >
                <Phone className="w-4 h-4" />
                <span>31 31 74 50</span>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <div className="space-y-1.5"><div className="w-6 h-0.5 bg-white"></div><div className="w-6 h-0.5 bg-white"></div><div className="w-6 h-0.5 bg-white"></div></div>}
            </button>

            {/* Mobile Phone Icon */}
            <a
              href="tel:+4531317450"
              className="mobile-phone-icon md:hidden"
              aria-label="Ring til os"
            >
              <div className="flex items-center justify-center bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 p-3 rounded-full shadow-lg premium-phone-icon">
                <Phone className="w-5 h-5" />
              </div>
            </a>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <nav className="flex flex-col space-y-3">
                <button onClick={() => scrollToSection('hjemmesider')} className="text-white/90 hover:text-white transition-colors text-left px-2">
                  HJEMMESIDER
                </button>
                <button onClick={() => scrollToSection('seo')} className="text-white/90 hover:text-white transition-colors text-left px-2">
                  SEO
                </button>
                <button onClick={() => scrollToSection('marketing')} className="text-white/90 hover:text-white transition-colors text-left px-2">
                  PRISER
                </button>
                <button onClick={openContactModal} className="text-white/90 hover:text-white transition-colors text-left px-2">
                  KONTAKT
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="premium-hero-bg relative">
        <img
          src="/Busybiz-hero-background.png"
          alt="Hero Background"
          className="hero-bg-image"
          loading="eager"
        />
        <div className="premium-hero-overlay"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-10 premium-float-icon animate-float">
          <Zap className="w-10 h-10 text-amber-400" />
        </div>
        <div className="absolute top-40 right-20 premium-float-icon-small animate-float-delayed">
          <TrendingUp className="w-6 h-6 text-amber-400" />
        </div>
        <div className="absolute bottom-40 left-20 premium-float-icon-small animate-float-slow">
          <Users className="w-6 h-6 text-amber-400" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-screen py-20">
          <div className="max-w-4xl">
            <div className="fade-in stagger-1 text-white/90 uppercase tracking-widest text-sm mb-6 font-semibold">
              Din digitale partner
            </div>

            <h1 className="premium-headline text-white mb-8">
              <span className="premium-headline-top block mb-4">
                Skab dit online univers
              </span>
              <span className="premium-headline-bottom block text-gradient">
                Hjemmesider • SEO • Lokal Markedsføring
              </span>
            </h1>

            <p className="fade-in stagger-3 text-white/90 text-lg md:text-xl mb-6 max-w-2xl leading-relaxed">
              Vi hjælper lokale virksomheder med at vokse online gennem professionelle hjemmesider,
              kraftfuld SEO og målrettet digital markedsføring.
            </p>

            <p className="fade-in stagger-4 text-white/80 text-base md:text-lg mb-10 max-w-2xl">
              Fra idé til online succes – vi leverer løsninger der får din virksomhed til at skinne.
            </p>

            <button
              onClick={openContactModal}
              className="premium-cta-button fade-in stagger-5"
            >
              <span>KOM I GANG NU</span>
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hjemmesider" className="services-bg py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="headline-font text-4xl md:text-5xl text-slate-900 mb-6">
              Hvad vi laver
            </h2>
            <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
              Vi specialiserer os i at skabe digitale løsninger der giver resultater
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {/* Service Card 1 */}
            <div className="service-card rounded-3xl p-8 scroll-reveal">
              <div className="service-icon mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Professionelle Hjemmesider
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Skræddersyede websites der konverterer besøgende til kunder. Moderne design, lynhurtig performance og mobil-optimeret.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>✓ Moderne & responsivt design</li>
                <li>✓ SEO optimeret fra start</li>
                <li>✓ Hurtig indlæsningstid</li>
                <li>✓ Nem at opdatere</li>
              </ul>
            </div>

            {/* Service Card 2 */}
            <div className="service-card rounded-3xl p-8 scroll-reveal">
              <div className="service-icon mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Lokal SEO Optimering
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Bliv fundet på Google når kunder søger efter dine ydelser. Vi optimerer din synlighed lokalt.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>✓ Google Maps optimering</li>
                <li>✓ Lokal søgeordsoptimering</li>
                <li>✓ Konkurrenceanalyse</li>
                <li>✓ Månedlig rapportering</li>
              </ul>
            </div>

            {/* Service Card 3 */}
            <div className="service-card rounded-3xl p-8 scroll-reveal">
              <div className="service-icon mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Digital Markedsføring
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Nå de rette kunder med målrettet markedsføring der skaber resultater og vækst for din virksomhed.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>✓ Social media strategi</li>
                <li>✓ Content marketing</li>
                <li>✓ Google Ads kampagner</li>
                <li>✓ Performance tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Rank Search Section */}
      <section id="seo">
        <RankSearchSection />
      </section>

      {/* Pricing Section */}
      <section id="marketing">
        <PricingSection />
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img
                src="/Busybiz-mascot-transparent-Photoroom.png"
                alt="BusyBiz Mascot"
                className="w-12 h-12"
              />
              <span className="logo-text text-2xl">BUSYBIZ</span>
            </div>

            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Vi hjælper lokale virksomheder med at vokse online gennem professionelle digitale løsninger.
            </p>

            <nav className="footer-nav mb-8">
              <button onClick={() => scrollToSection('hjemmesider')} className="text-white/70 hover:text-white transition-colors">
                Hjemmesider
              </button>
              <button onClick={() => scrollToSection('seo')} className="text-white/70 hover:text-white transition-colors">
                SEO
              </button>
              <button onClick={() => scrollToSection('marketing')} className="text-white/70 hover:text-white transition-colors">
                Priser
              </button>
              <button onClick={openContactModal} className="text-white/70 hover:text-white transition-colors">
                Kontakt
              </button>
            </nav>

            <div className="border-t border-white/10 pt-8">
              <p className="text-white/60 text-sm">
                © 2024 BusyBiz. Alle rettigheder forbeholdes.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <div id="contactModal" className="contact-modal">
        <div className="contact-modal-content">
          <div className="contact-modal-header">
            <h2 className="text-2xl font-bold text-white mb-2">Kontakt os</h2>
            <p className="text-white/80">Vi er klar til at hjælpe dig</p>
            <button
              className="contact-modal-close"
              onClick={() => {
                const modal = document.getElementById('contactModal');
                if (modal) {
                  modal.classList.remove('active');
                  document.body.style.overflow = '';
                }
              }}
            >
              ×
            </button>
          </div>

          <div className="contact-modal-body">
            <div className="contact-info-box">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white mb-1">Telefon</strong>
                  <a href="tel:+4531317450" className="text-amber-400 hover:text-amber-300">
                    +45 31 31 74 50
                  </a>
                </div>
              </div>
            </div>

            <p className="text-white/70 text-center text-sm">
              Ring os i dag for en uforpligtende snak om dine behov
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
