import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import HjemmesiderPage from './pages/HjemmesiderPage';
import SeoPage from './pages/SeoPage';
import MarketingPage from './pages/MarketingPage';
import PricingPage from './pages/PricingPage';
import FaqPage from './pages/FaqPage';
import SuccessPage from './pages/SuccessPage';
import { WeatherOverlay } from './components/weather/WeatherOverlay';
import * as Sentry from '@sentry/react';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSuccessMessage, setContactSuccessMessage] = useState(false);
  const [contactErrorMessage, setContactErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openContactModal = useCallback(() => {
    setIsContactModalOpen(true);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const firstInput = document.getElementById('contactName');
      if (firstInput) firstInput.focus();
    }, 300);
  }, []);

  useEffect(() => {
    const handleOpenContactModal = () => {
      openContactModal();
    };

    window.addEventListener('openContactModal', handleOpenContactModal);
    return () => window.removeEventListener('openContactModal', handleOpenContactModal);
  }, [openContactModal]);

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
      subject: formData.get('subject') || 'Kontakt fra hjemmesiden',
      message: formData.get('message')
    };

    try {
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
        }, 2000);
      } else {
        const responseData = await response.json().catch(() => ({}));
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
    <Router>
      <div className="min-h-screen text-slate-100" style={{ background: 'transparent' }}>
        <WeatherOverlay />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenContact={openContactModal}
                handleContactSubmit={handleContactSubmit}
                isSubmitting={isSubmitting}
                contactSuccessMessage={contactSuccessMessage}
                contactErrorMessage={contactErrorMessage}
              />
            }
          />
          <Route path="/hjemmesider" element={<HjemmesiderPage onOpenContact={openContactModal} />} />
          <Route path="/seo" element={<SeoPage onOpenContact={openContactModal} />} />
          <Route path="/marketing" element={<MarketingPage onOpenContact={openContactModal} />} />
          <Route path="/priser" element={<PricingPage onOpenContact={openContactModal} />} />
          <Route path="/faq" element={<FaqPage onOpenContact={openContactModal} />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>

        {/* Global Contact Modal */}
        {isContactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" onClick={closeContactModal}>
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={closeContactModal} className="absolute top-4 right-5 text-gray-400 hover:text-white text-2xl font-bold cursor-pointer">×</button>
              <h2 className="text-2xl font-bold text-white mb-2">Kontakt Us</h2>
              <p className="text-white/70 text-sm mb-6">Send os en besked – vi svarer inden for 24 timer.</p>

              <form id="contactForm" onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contactName" className="block text-xs font-semibold text-white/80 uppercase mb-1">Navn</label>
                  <input type="text" id="contactName" name="name" required className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-amber-500/30 text-white focus:outline-none focus:border-amber-400 text-sm" />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-xs font-semibold text-white/80 uppercase mb-1">Email</label>
                  <input type="email" id="contactEmail" name="email" required className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-amber-500/30 text-white focus:outline-none focus:border-amber-400 text-sm" />
                </div>
                <div>
                  <label htmlFor="contactMessage" className="block text-xs font-semibold text-white/80 uppercase mb-1">Besked</label>
                  <textarea id="contactMessage" name="message" rows={4} required className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-amber-500/30 text-white focus:outline-none focus:border-amber-400 text-sm resize-none"></textarea>
                </div>

                {contactSuccessMessage && (
                  <div className="p-3 bg-emerald-500/20 border-l-4 border-emerald-500 text-emerald-200 text-xs rounded">
                    Tak for din besked! Vi vender tilbage hurtigst muligt.
                  </div>
                )}
                {contactErrorMessage && (
                  <div className="p-3 bg-red-500/20 border-l-4 border-red-500 text-red-200 text-xs rounded">
                    Der opstod en fejl. Prøv venligst igen.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 text-slate-900 font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'SENDER...' : 'SEND BESKED'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default Sentry.withProfiler(App);