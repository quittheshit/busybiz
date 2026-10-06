import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationHeaderProps {
  onOpenContact: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({ onOpenContact }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HJEMMESIDER', path: '/hjemmesider' },
    { label: 'SEO', path: '/seo' },
    { label: 'MARKETING', path: '/marketing' },
    { label: 'PRISER', path: '/priser' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="premium-header py-4 px-4 sm:px-6 md:px-10 sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 no-underline group">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            <img
              src="/Busybiz-mascot-transparent-Photoroom.png"
              alt="BusyBiz Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="logo-text text-white font-bold tracking-wider text-lg">BUSYBIZ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="premium-nav hidden md:flex items-center space-x-6 text-xs font-semibold tracking-wider uppercase" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link text-white hover:text-amber-300 transition-all duration-300 ${location.pathname === item.path ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-1' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={onOpenContact}
            className="nav-link text-amber-300 hover:text-amber-200 transition-all duration-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 px-3 py-1.5 rounded-full cursor-pointer"
          >
            KONTAKT
          </button>
        </nav>

        {/* Right side: Phone & Mobile Menu Toggle */}
        <div className="flex items-center space-x-3">
          <a
            href="tel:+4581260711"
            className="hidden sm:flex items-center space-x-3 text-white group cursor-pointer no-underline"
            aria-label="Ring til BusyBiz"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400/30 to-yellow-600/30 backdrop-blur-sm flex items-center justify-center shadow-lg border border-amber-400/40 transition-all duration-300 group-hover:scale-110">
              <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="text-xs font-medium tracking-wide group-hover:text-amber-300 transition-colors">+45 81 26 07 11</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-amber-300 focus:outline-none"
            aria-label="Åbn menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 py-4 px-6 bg-slate-900/95 border-t border-amber-500/20 rounded-2xl space-y-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-amber-300"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
            className="w-full text-center bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold py-2 px-4 rounded-xl"
          >
            KONTAKT OS
          </button>
        </div>
      )}
    </header>
  );
};
