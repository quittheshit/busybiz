import { useState, useEffect } from 'react';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSuccessMessage, setContactSuccessMessage] = useState(false);
  const [contactErrorMessage, setContactErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const openContactModal = () => {
    setIsContactModalOpen(true);
    document.body.style.overflow = 'hidden';

    // Focus on first input field
    setTimeout(() => {
      const firstInput = document.getElementById('contactName');
      if (firstInput) firstInput.focus();
    }, 300);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    document.body.style.overflow = '';
    setContactSuccessMessage(false);
    setContactErrorMessage(false);

    // Reset form
    const form = document.getElementById('contactForm') as HTMLFormElement;
    if (form) form.reset();
  };

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isContactModalOpen) {
        closeContactModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isContactModalOpen]);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId || '');

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setContactSuccessMessage(false);
    setContactErrorMessage(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      // Send to Supabase Edge Function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setContactSuccessMessage(true);
        form.reset();

        setTimeout(() => {
          setIsContactModalOpen(false);
          setContactSuccessMessage(false);
          document.body.style.overflow = '';

          setTimeout(() => {
            setShowThankYouModal(true);
            document.body.style.overflow = 'hidden';
          }, 200);
        }, 500);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      setContactErrorMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="header-teal py-4 px-10 fade-in-top shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with Mascot */}
          <div className="flex items-center space-x-4">
            <img src="/Busybiz-mascot-transparent-Photoroom copy.png" alt="BusyBiz Logo" className="mascot-logo" />
            <span className="logo-text text-white">BUSYBIZ</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-font desktop-nav flex items-center space-x-8 text-xs" role="navigation" aria-label="Main navigation">
            <a href="#services" onClick={handleNavClick} className="nav-link text-white hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:tracking-wider" aria-label="Hjemmesider & forbedringer">HJEMMESIDER</a>
            <a href="#services" onClick={handleNavClick} className="nav-link text-white hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:tracking-wider" aria-label="Bliv fundet online">SEO</a>
            <a href="#services" onClick={handleNavClick} className="nav-link text-white hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:tracking-wider" aria-label="Marketing, automatisering & indhold">MARKETING</a>
            <button onClick={openContactModal} className="nav-link text-white hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:tracking-wider bg-transparent border-none cursor-pointer" aria-label="Kontakt os">KONTAKT</button>
          </nav>

          {/* Desktop Phone */}
          <a href="tel:+4581260711" className="desktop-phone flex items-center space-x-3 text-white group cursor-pointer no-underline" aria-label="Ring til BusyBiz på +45 81 26 07 11">
            <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-md transition-all duration-300 group-hover:bg-white/40 group-hover:scale-110 group-hover:shadow-lg">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <span className="text-sm font-light tracking-wide transition-all duration-300 group-hover:tracking-wider">+45 81 26 07 11</span>
          </a>

          {/* Mobile Phone Icon */}
          <a href="tel:+4581260711" className="mobile-phone-icon" aria-label="Ring til BusyBiz på +45 81 26 07 11">
            <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-md transition-all duration-300 hover:bg-white/40 hover:scale-110 hover:shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-bg relative">
        <div className="hero-overlay"></div>

        {/* Floating Decorative Shapes */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-teal-300/20 to-teal-400/10 blur-xl animate-pulse" style={{animationDuration: '5s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-orange-300/15 to-orange-400/10 blur-lg animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}}></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen py-24 px-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Overline */}
            <div className="fade-in stagger-1 text-gray-700 uppercase mb-4" style={{fontWeight: 500, letterSpacing: '0.25em', fontSize: '0.875rem'}}>
              DANMARKS BEDSTE
            </div>

            {/* Main Headline */}
            <h1 className="fade-in stagger-2 headline-font text-gray-900 mb-6 px-4 hero-headline" style={{fontSize: '2.5rem', lineHeight: '1.1'}}>
              Hjemmeside-designer
            </h1>

            {/* Sub-headline */}
            <p className="fade-in stagger-3 text-gray-700 font-light px-6 mb-8 hero-subheadline" style={{letterSpacing: '0.08em', lineHeight: '1.4', fontSize: '1rem'}}>
              FOR <span style={{color: '#d4845f', fontWeight: 400}}>LOKALE FIRMAER</span> I DANMARK
            </p>

            {/* CTA Button */}
            <div className="fade-in stagger-4 mb-10">
              <button className="cta-button" onClick={openContactModal} aria-label="Åbn kontakt formular">
                <span>Kontakt os</span>
              </button>
            </div>

            {/* Business Icons */}
            <div className="fade-in stagger-5 flex justify-center items-center gap-5 mb-10 flex-wrap px-4">
              <div className="icon-circle float-gentle" style={{animationDelay: '0.2s'}}>
                <img src="/transparent-hairdresser-icon-Photoroom.png" alt="Hairdresser & Salon Services" />
              </div>
              <div className="icon-circle float-gentle" style={{animationDelay: '0.4s'}}>
                <img src="/transparent-construction-icon-Photoroom.png" alt="Construction & Repair Services" />
              </div>
              <div className="icon-circle float-gentle" style={{animationDelay: '0.5s'}}>
                <img src="/transparent-service-icon-Photoroom.png" alt="Hospitality & Service Industry" />
              </div>
              <div className="icon-circle float-gentle" style={{animationDelay: '0.7s'}}>
                <img src="/transparent-influencer-icon.png" alt="Fitness & Wellness Instructors" />
              </div>
              <div className="icon-circle float-gentle" style={{animationDelay: '0.9s'}}>
                <img src="/transparent-doctor-icon.png" alt="Healthcare & Medical Services" />
              </div>
              <div className="icon-circle float-gentle" style={{animationDelay: '1.1s'}}>
                <img src="/transparent-gardening-icon.png" alt="Garden & Lifestyle Boutiques" />
              </div>
            </div>

            {/* Bottom Text */}
            <p className="fade-in text-gray-900 max-w-4xl mx-auto uppercase px-6 py-4 md:py-0 bottom-text-mobile-bg" style={{letterSpacing: '0.12em', lineHeight: '1.3', fontSize: '0.8rem', fontWeight: 600, animationDelay: '1.3s', backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px'}}>
              FÅ BYENS BEDSTE HJEMMESIDE<br/>
              OG BLIV BYENS GO-TO FIRMA<br/>
              I DIN BRANCHE.
            </p>
          </div>
        </div>

        {/* Mascot */}
        <div className="mascot-container fade-in float-slow" style={{animationDelay: '1.5s'}}>
          <img src="/Busybiz-mascot-transparent-Photoroom.png" alt="BusyBiz Mascot" className="mascot-image" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-bg py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-teal-200/20 to-teal-300/10 blur-2xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-orange-200/15 to-orange-300/10 blur-2xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-green-200/20 to-green-300/10 blur-xl animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="headline-font text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-6 fade-in-up" style={{lineHeight: '1.1'}}>
              Mine services
            </h2>
            <p className="nav-font text-gray-600 text-lg md:text-xl fade-in-up stagger-delay-1" style={{letterSpacing: '0.15em'}}>
              Her er hvad jeg kan hjælpe dig med
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Service Card 1 */}
            <div className="service-card rounded-3xl p-10 fade-in-up stagger-delay-1 scroll-reveal">
              <div className="service-icon mb-7">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="nav-font text-xl text-gray-900 mb-2 tracking-wide">
                Hjemmesider & forbedringer
              </h3>
              <p className="text-sm text-gray-500 mb-6 italic" style={{lineHeight: '1.5'}}>
                (Design, ny hjemmeside, og optimering af eksisterende)
              </p>
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-3" style={{letterSpacing: '0.02em'}}>Hvad jeg laver:</p>
                  <p className="text-sm text-gray-600 leading-relaxed" style={{lineHeight: '1.7'}}>
                    Jeg bygger eller opdaterer din hjemmeside, så den ser moderne ud, loader hurtigt og forklarer klart hvem du er. Jeg forbedrer struktur, tekst, billeder og det tekniske — så siden både føles bedre og performer bedre.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-3" style={{letterSpacing: '0.02em'}}>Hvad du får:</p>
                  <ul className="text-sm text-gray-600 space-y-2" style={{lineHeight: '1.7'}}>
                    <li>• En professionel og moderne hjemmeside</li>
                    <li>• En side hvor kunderne hurtigt forstår dit tilbud</li>
                    <li>• En forbedret version af din nuværende side (hvis du har en)</li>
                    <li>• En side der giver flere henvendelser og virker troværdig</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="service-card rounded-3xl p-10 fade-in-up stagger-delay-2 scroll-reveal">
              <div className="service-icon mb-7">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="nav-font text-xl text-gray-900 mb-2 tracking-wide">
                Bliv fundet online
              </h3>
              <p className="text-sm text-gray-500 mb-6 italic" style={{lineHeight: '1.5'}}>
                (Få flere besøgende uden annoncer)
              </p>
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-3" style={{letterSpacing: '0.02em'}}>Hvad jeg laver:</p>
                  <p className="text-sm text-gray-600 leading-relaxed" style={{lineHeight: '1.7'}}>
                    Jeg optimerer din hjemmeside og din Google Business profil, så du bliver vist højere når folk søger efter dine ydelser — både på Google og Google Maps.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-3" style={{letterSpacing: '0.02em'}}>Hvad du får:</p>
                  <ul className="text-sm text-gray-600 space-y-2" style={{lineHeight: '1.7'}}>
                    <li>• Du bliver vist foran flere konkurrenter</li>
                    <li>• Flere besøgende uden at betale for annoncer</li>
                    <li>• En stærkere synlighed lokalt</li>
                    <li>• Bedre placeringer, bedre trafik, flere henvendelser</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="service-card rounded-3xl p-10 fade-in-up stagger-delay-3 scroll-reveal">
              <div className="service-icon mb-7">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="nav-font text-xl text-gray-900 mb-2 tracking-wide">
                Marketing, automatisering & indhold
              </h3>
              <p className="text-sm text-gray-500 mb-6 italic" style={{lineHeight: '1.5'}}>
                (Annoncer, chatbots, videoer, SoMe og e-mails)
              </p>
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-3" style={{letterSpacing: '0.02em'}}>Hvad jeg laver:</p>
                  <p className="text-sm text-gray-600 leading-relaxed" style={{lineHeight: '1.7'}}>
                    Jeg opsætter annoncer, automatiseringer og chatbots, laver indhold (tekst, billeder, videoer) og hjælper dig med at være synlig på de rigtige platforme. Alt det der får kunder til at se dig, kontakte dig og booke dig.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-3" style={{letterSpacing: '0.02em'}}>Hvad du får:</p>
                  <ul className="text-sm text-gray-600 space-y-2" style={{lineHeight: '1.7'}}>
                    <li>• Flere henvendelser fra både nye og eksisterende kunder</li>
                    <li>• Hurtigere svar og mindre manuelt arbejde</li>
                    <li>• Bedre annoncer og bedre performance på sociale medier</li>
                    <li>• Indhold der ser professionelt ud og tiltrækker kunder</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="fade-in-bottom bg-gradient-to-br from-teal-50/30 via-gray-50 to-orange-50/20 py-16 px-10 mt-0 relative overflow-hidden" style={{boxShadow: 'inset 0 2px 0 rgba(79, 168, 139, 0.12)'}}>
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-teal-200/15 to-teal-300/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-gradient-to-br from-orange-200/10 to-orange-300/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0">
            <div className="flex items-center space-x-4 transition-all duration-300 hover:scale-105">
              <img src="/Busybiz-mascot-transparent-Photoroom copy.png" alt="BusyBiz Logo" className="mascot-logo" />
              <span className="logo-text text-gray-900" style={{fontSize: '1.125rem'}}>BUSYBIZ</span>
            </div>

            <div className="flex flex-col items-center space-y-3 text-gray-700 text-sm">
              <div className="flex items-center space-x-3 transition-all duration-300 hover:text-gray-900 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-200 to-teal-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{boxShadow: '0 4px 12px rgba(79, 168, 139, 0.25), 0 0 0 3px rgba(133, 194, 175, 0.1)'}}>
                  <svg className="w-4 h-4 text-teal-700 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span className="transition-all duration-300 group-hover:tracking-wide">miklhagstroem@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 transition-all duration-300 hover:text-gray-900 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{boxShadow: '0 4px 12px rgba(212, 132, 95, 0.25), 0 0 0 3px rgba(253, 186, 116, 0.1)'}}>
                  <svg className="w-4 h-4 text-orange-700 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <span className="transition-all duration-300 group-hover:tracking-wide">+45 81 26 07 11</span>
              </div>
            </div>

            <nav className="nav-font footer-nav text-xs text-gray-600" role="navigation" aria-label="Footer navigation">
              <a href="#services" onClick={handleNavClick} className="nav-link hover:text-teal-600 transition-all duration-300 hover:translate-y-[-2px]" aria-label="Hjemmesider & forbedringer">HJEMMESIDER</a>
              <a href="#services" onClick={handleNavClick} className="nav-link hover:text-teal-600 transition-all duration-300 hover:translate-y-[-2px]" aria-label="Bliv fundet online">SEO</a>
              <a href="#services" onClick={handleNavClick} className="nav-link hover:text-teal-600 transition-all duration-300 hover:translate-y-[-2px]" aria-label="Marketing, automatisering & indhold">MARKETING</a>
              <button onClick={openContactModal} className="nav-link hover:text-teal-600 transition-all duration-300 hover:translate-y-[-2px] bg-transparent border-none cursor-pointer" style={{fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit'}} aria-label="Kontakt os">KONTAKT</button>
            </nav>
          </div>

          <div className="mt-12 mb-8 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

          <div className="text-center text-xs text-gray-500">
            © 2025 BusyBiz. Alle rettigheder forbeholdes.
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="contact-modal active" id="contactModal" role="dialog" aria-labelledby="contactModalTitle" aria-modal="true" onClick={closeContactModal}>
          <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-header">
              <h2 id="contactModalTitle" className="headline-font text-3xl text-white mb-2" style={{lineHeight: '1.2'}}>Kontakt os</h2>
              <p className="text-white text-sm opacity-90">Vi glæder os til at høre fra dig</p>
              <button className="contact-modal-close" onClick={closeContactModal} aria-label="Luk kontakt formular">×</button>
            </div>

            <div className="contact-modal-body">
              {contactSuccessMessage && (
                <div className="contact-success-message active">
                  <strong>Tak for din besked!</strong><br/>
                  Vi vender tilbage til dig hurtigst muligt.
                </div>
              )}

              {contactErrorMessage && (
                <div className="contact-error-message active">
                  <strong>Fejl!</strong><br/>
                  Der opstod en fejl ved afsendelse. Prøv venligst igen.
                </div>
              )}

              <div className="contact-info-box">
                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Kontakt Information</h3>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <strong>Email:</strong><br/>
                    <a href="mailto:miklhagstroem@gmail.com" className="text-teal-700 hover:underline">miklhagstroem@gmail.com</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <strong>Telefon:</strong><br/>
                    <a href="tel:+4581260711" className="text-teal-700 hover:underline">+45 81 26 07 11</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <strong>Svartid:</strong><br/>
                    Inden for 24 timer
                  </div>
                </div>
              </div>

              <form id="contactForm" onSubmit={handleContactSubmit}>
                <div className="contact-form-group">
                  <label htmlFor="contactName" className="contact-form-label">
                    Navn <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="name"
                    className="contact-form-input"
                    placeholder="Dit fulde navn"
                    required
                    aria-required="true"
                  />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="contactEmail" className="contact-form-label">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    className="contact-form-input"
                    placeholder="din@email.dk"
                    required
                    aria-required="true"
                  />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="contactSubject" className="contact-form-label">
                    Emne
                  </label>
                  <input
                    type="text"
                    id="contactSubject"
                    name="subject"
                    className="contact-form-input"
                    placeholder="Hvad drejer din henvendelse sig om?"
                    aria-label="Emne"
                  />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="contactMessage" className="contact-form-label">
                    Besked <span className="required">*</span>
                  </label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    className="contact-form-input"
                    rows={6}
                    placeholder="Fortæl os om dit projekt eller spørgsmål..."
                    required
                    aria-required="true"
                  ></textarea>
                </div>

                <button type="submit" className="contact-form-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'SENDER...' : 'SEND BESKED'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div
          className="thank-you-modal-overlay"
          onClick={() => {
            setShowThankYouModal(false);
            document.body.style.overflow = '';
          }}
          role="dialog"
          aria-labelledby="thankYouModalTitle"
          aria-modal="true"
        >
          <div
            className="thank-you-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="thank-you-modal-close"
              onClick={() => {
                setShowThankYouModal(false);
                document.body.style.overflow = '';
              }}
              aria-label="Luk tak besked"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="thank-you-icon-wrapper">
              <div className="thank-you-icon-circle">
                <svg className="thank-you-checkmark" viewBox="0 0 52 52" fill="none">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" stroke="#4fa88b" strokeWidth="2" fill="none"/>
                  <path className="checkmark-check" fill="none" stroke="#4fa88b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7.5 7.5L38 18"/>
                </svg>
              </div>
            </div>

            <h2 id="thankYouModalTitle" className="thank-you-title headline-font">
              Tak for din besked!
            </h2>

            <p className="thank-you-message">
              Mange tak for at skrive! Vi svarer dig inden for 24 timer
            </p>

            <button
              className="thank-you-close-button"
              onClick={() => {
                setShowThankYouModal(false);
                document.body.style.overflow = '';
              }}
            >
              Luk
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
