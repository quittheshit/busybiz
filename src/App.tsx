import { useState, useEffect, lazy, Suspense, useCallback, useMemo } from 'react';

const RankSearchSection = lazy(() => import('./components/RankSearchSection'));

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSuccessMessage, setContactSuccessMessage] = useState(false);
  const [contactErrorMessage, setContactErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const openContactModal = useCallback(() => {
    setIsContactModalOpen(true);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const firstInput = document.getElementById('contactName');
      if (firstInput) firstInput.focus();
    }, 300);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsContactModalOpen(false);
    document.body.style.overflow = '';
    setContactSuccessMessage(false);
    setContactErrorMessage(false);

    const form = document.getElementById('contactForm') as HTMLFormElement;
    if (form) form.reset();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isContactModalOpen) {
        closeContactModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isContactModalOpen, closeContactModal]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
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
  }, []);

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
      console.log('Submitting form with data:', data);
      console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);

      // Send to Supabase Edge Function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

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
        console.error('Server error:', responseData);
        throw new Error(responseData.error || 'Failed to send message');
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
      <header className="premium-header py-4 px-4 sm:px-6 md:px-10 fade-in-top">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with Icon */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="/Busybiz-mascot-transparent-Photoroom.png"
                alt="BusyBiz Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="logo-text text-white font-bold tracking-wider">BUSYBIZ</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="premium-nav desktop-nav flex items-center space-x-8 text-xs" role="navigation" aria-label="Main navigation">
            <a href="#hjemmesider" onClick={handleNavClick} className="nav-link text-white hover:text-amber-300 transition-all duration-300" aria-label="Hjemmesider & forbedringer">HJEMMESIDER</a>
            <a href="#seo" onClick={handleNavClick} className="nav-link text-white hover:text-amber-300 transition-all duration-300" aria-label="Bliv fundet online">SEO</a>
            <a href="#marketing" onClick={handleNavClick} className="nav-link text-white hover:text-amber-300 transition-all duration-300" aria-label="Marketing, automatisering & indhold">MARKETING</a>
            <button onClick={openContactModal} className="nav-link text-white hover:text-amber-300 transition-all duration-300 bg-transparent border-none cursor-pointer" aria-label="Kontakt os">KONTAKT</button>
          </nav>

          {/* Desktop Phone */}
          <a href="tel:+4581260711" className="desktop-phone flex items-center space-x-3 text-white group cursor-pointer no-underline" aria-label="Ring til BusyBiz på +45 81 26 07 11">
            <div className="premium-phone-icon w-10 h-10 rounded-full bg-gradient-to-br from-amber-400/30 to-yellow-600/30 backdrop-blur-sm flex items-center justify-center shadow-lg border border-amber-400/40 transition-all duration-300 group-hover:shadow-amber-400/50 group-hover:scale-110">
              <svg className="w-5 h-5 text-amber-300 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <span className="text-sm font-light tracking-wide transition-all duration-300 group-hover:text-amber-300">+45 81 26 07 11</span>
          </a>

          {/* Mobile Phone Icon */}
          <a href="tel:+4581260711" className="mobile-phone-icon" aria-label="Ring til BusyBiz på +45 81 26 07 11">
            <div className="premium-phone-icon w-10 h-10 rounded-full bg-gradient-to-br from-amber-400/30 to-yellow-600/30 backdrop-blur-sm flex items-center justify-center shadow-lg border border-amber-400/40">
              <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hjemmesider" className="premium-hero-bg relative overflow-hidden">
        {/* Optimized Hero Background Image */}
        <img
          src="/localbiz-background-smaller.png"
          alt=""
          className="hero-bg-image"
          fetchPriority="high"
          decoding="async"
          aria-hidden="true"
        />
        <div className="premium-hero-overlay"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-[10%] opacity-80 animate-float-icon" style={{animationDelay: '0s'}}>
          <div className="premium-float-icon">
            <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="absolute top-32 left-[20%] opacity-70 animate-float-icon" style={{animationDelay: '1s'}}>
          <div className="premium-float-icon-small">
            <svg className="w-10 h-10 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </div>
        </div>

        <div className="absolute top-40 right-[15%] opacity-75 animate-float-icon" style={{animationDelay: '0.5s'}}>
          <div className="premium-float-icon">
            <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
        </div>

        <div className="absolute top-28 right-[25%] opacity-70 animate-float-icon" style={{animationDelay: '1.5s'}}>
          <div className="premium-float-icon-small">
            <svg className="w-10 h-10 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen py-24 px-4 sm:px-6 md:px-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Overline */}
            <div className="fade-in stagger-1 text-white/90 uppercase mb-4 tracking-widest text-sm font-light">
              DANMARKS BEDSTE
            </div>

            {/* Main Headline */}
            <h1 className="fade-in stagger-2 text-white mb-6 px-4">
              <span className="premium-headline-top">
                Web Design, SEO, Marketing<br/>
                & <span className="text-gradient">Automatisering</span>
              </span>
              <span className="premium-headline-bottom block mt-4">
                til Lokale Firmaer i Danmark
              </span>
            </h1>

            {/* Subtext */}
            <p className="fade-in stagger-4 text-white/90 px-6 mb-10 max-w-3xl mx-auto" style={{fontSize: '1rem', lineHeight: '1.6'}}>
              Bliv byens GO-TO firma i din branche med en top-position i søgeresultaterne, byens bedste hjemmeside, professionel markedsføring og automatiseret kundeservice mm.
            </p>

            {/* CTA Button */}
            <div className="fade-in stagger-5 mb-10">
              <button className="premium-cta-button" onClick={openContactModal} aria-label="Åbn kontakt formular">
                <span>FÅ MERE SUCCES NU</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mascot Placeholder */}
        <div className="mascot-placeholder fade-in" style={{animationDelay: '1.5s'}}>
          {/* Reserved for future 3D mascot */}
        </div>
      </section>

      {/* Rank Search Animation Section */}
      <div id="seo">
        <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
          <RankSearchSection />
        </Suspense>
      </div>


      {/* Premium Contact Section */}
      <section id="marketing" className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-24 md:py-32">
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-yellow-600/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-br from-amber-500/15 to-orange-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/5 rounded-full blur-3xl animate-float-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Area */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block mb-6 animate-bounce-subtle">
              <img
                src="/Busybiz-mascot-transparent-Photoroom.png"
                alt="BusyBiz Mascot"
                className="w-20 h-20 md:w-24 md:h-24 drop-shadow-lg"
              />
            </div>
            <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Vil du have flere kunder<br />ind ad døren?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Hvis du føler at konkurrenterne løber med kunderne, eller omvendt hvis du får flere mails end du kan nå at svare på, så skriv til mig.
            </p>
          </div>

          {/* Value Proposition Steps - Animated Infographic */}
          <div className="relative mb-16 max-w-6xl mx-auto">
            {/* Symbolic Background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-10 pointer-events-none">
              {/* Growth Lines (More Customers) */}
              <svg className="absolute left-0 top-1/4 w-1/3 h-1/2 text-teal-500" viewBox="0 0 200 200" fill="none">
                <path d="M20 180 L50 140 L80 120 L110 80 L140 60 L170 20" stroke="currentColor" strokeWidth="3" className="animate-pulse" />
                <path d="M20 180 L50 150 L80 130 L110 100 L140 80 L170 50" stroke="currentColor" strokeWidth="2" opacity="0.5" />
              </svg>

              {/* Money Coins (More Revenue) */}
              <svg className="absolute left-1/2 -translate-x-1/2 top-10 w-1/4 h-1/4 text-amber-500" viewBox="0 0 100 100">
                <circle cx="30" cy="30" r="15" stroke="currentColor" strokeWidth="2" fill="none" className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
                <circle cx="50" cy="20" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2s' }} />
                <circle cx="70" cy="35" r="10" stroke="currentColor" strokeWidth="2" fill="none" className="animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2s' }} />
              </svg>

              {/* Zen Circles (Relaxation) */}
              <svg className="absolute right-0 bottom-1/4 w-1/3 h-1/2 text-emerald-500" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                <circle cx="100" cy="100" r="25" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
              </svg>
            </div>

            {/* Main Content Grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1: More Customers - Magnet with Users */}
              <div className="group bg-gradient-to-br from-slate-700 to-slate-800 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-teal-500/30 relative overflow-hidden">
                <div className="flex flex-col items-center text-center space-y-5">
                  <div className="relative w-20 h-20">
                    {/* Animated Magnet Icon */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-teal-400/50 transition-all duration-500 group-hover:rotate-12">
                      <svg className="w-12 h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    {/* Orbiting Users */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDuration: '1.5s' }}>
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.3s' }}>
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-white leading-relaxed font-semibold text-lg">Mange flere kunder der finder dig på internettet (Google, Maps, Sociale Medier & ChatGPT)</p>
                </div>
              </div>

              {/* Step 2: More Money - Growing Trophy/Money */}
              <div className="group bg-gradient-to-br from-slate-700 to-slate-800 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-amber-500/30 relative overflow-hidden">
                <div className="flex flex-col items-center text-center space-y-5">
                  <div className="relative w-20 h-20">
                    {/* Animated Trophy with Money */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-amber-400/50 transition-all duration-500 group-hover:scale-110">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    {/* Floating Money Symbol */}
                    <div className="absolute -top-2 -right-2 text-3xl animate-bounce" style={{ animationDuration: '2s' }}>💰</div>
                  </div>
                  <p className="text-white leading-relaxed font-semibold text-lg">Professionel hjemmeside der overbeviser alle kunder om at vælge dig. HVER gang.</p>
                </div>
              </div>

              {/* Step 3: Relaxation - Clock */}
              <div className="group bg-gradient-to-br from-slate-700 to-slate-800 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-blue-400/30 relative overflow-hidden">
                <div className="flex flex-col items-center text-center space-y-5">
                  <div className="relative w-20 h-20">
                    {/* Animated Clock Icon */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-blue-400/50 transition-all duration-500">
                      <svg className="w-12 h-12 text-white group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    {/* Floating Sparkles (Time Saved) */}
                    <div className="absolute -top-1 -right-1 text-xl animate-ping" style={{ animationDuration: '1.5s' }}>✨</div>
                    <div className="absolute -bottom-1 -left-1 text-xl animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>⚡</div>
                  </div>
                  <p className="text-white leading-relaxed font-semibold text-lg">Hjælp dig selv og dine kunder hurtigt og effektiv med automatisk kundeservice, booking-systemer og meget mere </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reassurance */}
          <div className="text-center mb-16">
            <p className="text-xl md:text-2xl text-white/90 font-light italic max-w-3xl mx-auto leading-relaxed">
              Du behøver ikke vide præcis, hvad du har brug for, bare skriv, så finder vi ud af det sammen. Vi giver gerne et <strong className="text-amber-300">gratis</strong> tip eller 2.
            </p>
          </div>

          {/* Main Content Grid */}
          <div id="contact" className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-amber-500/20">
              <h3 className="headline-font text-2xl md:text-3xl text-white mb-6">Send din besked</h3>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="group">
                  <label htmlFor="premiumContactName" className="block text-sm font-medium text-white/90 mb-2">
                    Navn
                  </label>
                  <input
                    type="text"
                    id="premiumContactName"
                    name="name"
                    placeholder="Dit fulde navn"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-500/30 bg-slate-700/50 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-200 outline-none text-white placeholder-gray-400"
                  />
                </div>

                <div className="group">
                  <label htmlFor="premiumContactEmail" className="block text-sm font-medium text-white/90 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="premiumContactEmail"
                    name="email"
                    placeholder="din@email.dk"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-500/30 bg-slate-700/50 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-200 outline-none text-white placeholder-gray-400"
                  />
                </div>

                <div className="group">
                  <label htmlFor="premiumContactMessage" className="block text-sm font-medium text-white/90 mb-2">
                    Hvad vil du gerne have hjælp til?
                  </label>
                  <textarea
                    id="premiumContactMessage"
                    name="message"
                    placeholder="Fortæl mig om din situation..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-500/30 bg-slate-700/50 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-200 outline-none text-white placeholder-gray-400 resize-none"
                  ></textarea>
                </div>

                {contactSuccessMessage && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-4 rounded-lg">
                    <p className="text-emerald-800 text-sm">Tak for din besked! Vi vender tilbage til dig hurtigst muligt.</p>
                  </div>
                )}

                {contactErrorMessage && (
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <p className="text-red-800 text-sm">Der opstod en fejl. Prøv venligst igen.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'SENDER...' : 'SEND MIN BESKED'}
                </button>
              </form>
            </div>

            {/* Right Side: Chatbot & Contact Info */}
            <div className="space-y-8">
              {/* Chatbot CTA */}
              <div className="bg-gradient-to-br from-amber-400 to-yellow-600 rounded-3xl p-8 md:p-10 shadow-2xl text-slate-900 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-900/20 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden">
                      <img
                        src="/Busybiz-mascot-transparent-Photoroom.png"
                        alt="BusyBiz Logo"
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <h3 className="text-2xl font-bold">Chat med vores assistent</h3>
                  </div>

                  <p className="text-slate-900/90 mb-6 leading-relaxed font-medium">
                    Assistenten kan svare på spørgsmål, booke et møde og sende dig mere info med det samme.
                  </p>

                  <button
                    onClick={() => {
                      if (window.voiceflow && window.voiceflow.chat) {
                        window.voiceflow.chat.open();
                      }
                    }}
                    className="w-full bg-slate-900 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
                  >
                    Start en samtale
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-amber-500/20">
                <h4 className="text-xl font-bold text-white mb-6">Eller kontakt mig direkte</h4>

                <div className="space-y-5">
                  <a
                    href="mailto:miklhagstroem@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-700 transition-colors duration-200 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/60 uppercase tracking-wide">Email</p>
                      <p className="text-white font-medium">miklhagstroem@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:+4581260711"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-700 transition-colors duration-200 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/60 uppercase tracking-wide">Telefon</p>
                      <p className="text-white font-medium">+45 81 26 07 11</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-700/50">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/60 uppercase tracking-wide">Svartid</p>
                      <p className="text-white font-medium">Inden for 24 timer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="fade-in-bottom bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4 sm:px-6 md:px-10 mt-0 relative overflow-hidden border-t border-amber-500/20" style={{boxShadow: 'inset 0 2px 0 rgba(251, 191, 36, 0.15)'}}>
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-amber-400/10 to-yellow-500/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-gradient-to-br from-orange-400/10 to-amber-500/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0">
            <div className="flex items-center space-x-4 transition-all duration-300 hover:scale-105">
              <img src="/Busybiz-mascot-transparent-Photoroom.png" alt="BusyBiz Logo" className="mascot-logo" loading="lazy" decoding="async" />
              <span className="logo-text text-white" style={{fontSize: '1.125rem'}}>BUSYBIZ</span>
            </div>

            <div className="flex flex-col items-center space-y-3 text-white text-sm">
              <div className="flex items-center space-x-3 transition-all duration-300 hover:text-amber-300 group cursor-pointer" onClick={openContactModal}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4), 0 0 0 3px rgba(251, 191, 36, 0.1)'}}>
                  <svg className="w-4 h-4 text-slate-900 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span className="transition-all duration-300 group-hover:tracking-wide">miklhagstroem@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 transition-all duration-300 hover:text-amber-300 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4), 0 0 0 3px rgba(251, 191, 36, 0.1)'}}>
                  <svg className="w-4 h-4 text-slate-900 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <span className="transition-all duration-300 group-hover:tracking-wide">+45 81 26 07 11</span>
              </div>
            </div>

            <nav className="nav-font footer-nav text-xs text-white/80" role="navigation" aria-label="Footer navigation">
              <a href="#hjemmesider" onClick={handleNavClick} className="nav-link hover:text-amber-300 transition-all duration-300 hover:translate-y-[-2px]" aria-label="Hjemmesider & forbedringer">HJEMMESIDER</a>
              <a href="#seo" onClick={handleNavClick} className="nav-link hover:text-amber-300 transition-all duration-300 hover:translate-y-[-2px]" aria-label="Bliv fundet online">SEO</a>
              <a href="#marketing" onClick={handleNavClick} className="nav-link hover:text-amber-300 transition-all duration-300 hover:translate-y-[-2px]" aria-label="Marketing, automatisering & indhold">MARKETING</a>
              <button onClick={openContactModal} className="nav-link hover:text-amber-300 transition-all duration-300 hover:translate-y-[-2px] bg-transparent border-none cursor-pointer" style={{fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit'}} aria-label="Kontakt os">KONTAKT</button>
            </nav>
          </div>

          <div className="mt-12 mb-8 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

          <div className="text-center text-xs text-white/60">
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
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">Kontakt Information</h3>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <strong className="text-white">Email:</strong><br/>
                    <a href="mailto:miklhagstroem@gmail.com" className="text-amber-300 hover:underline">miklhagstroem@gmail.com</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <strong className="text-white">Telefon:</strong><br/>
                    <a href="tel:+4581260711" className="text-amber-300 hover:underline">+45 81 26 07 11</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <strong className="text-white">Svartid:</strong><br/>
                    <span className="text-white/90">Inden for 24 timer</span>
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

            {/* Mascot with animated success badge */}
            <div className="thank-you-mascot-wrapper">
              <img
                src="/Busybiz-mascot-transparent-Photoroom.png"
                alt="BusyBiz Mascot"
                className="thank-you-mascot"
              />
              <div className="thank-you-success-badge">
                <svg className="thank-you-checkmark-small" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <h2 id="thankYouModalTitle" className="thank-you-title headline-font">
              Tak for din besked!
            </h2>

            <p className="thank-you-message">
              Perfekt! Vi er allerede på sagen og vender tilbage inden for <strong>24 timer</strong>.
            </p>

            <p className="thank-you-submessage">
              Vi glæder os til at hjælpe dig! 🚀
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
