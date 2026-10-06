import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onOpenContact: () => void;
}

export const FooterComponent: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4 sm:px-6 md:px-10 mt-0 relative overflow-hidden border-t border-amber-500/20" style={{boxShadow: 'inset 0 2px 0 rgba(251, 191, 36, 0.15)'}}>
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-amber-400/10 to-yellow-500/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-gradient-to-br from-orange-400/10 to-amber-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0">
          <Link to="/" className="flex items-center space-x-4 transition-all duration-300 hover:scale-105 no-underline">
            <img src="/Busybiz-mascot-transparent-Photoroom.png" alt="BusyBiz Logo" className="mascot-logo w-10 h-10 object-contain" />
            <span className="logo-text text-white font-bold tracking-wider" style={{fontSize: '1.125rem'}}>BUSYBIZ</span>
          </Link>

          <div className="flex flex-col items-center space-y-3 text-white text-sm">
            <div className="flex items-center space-x-3 transition-all duration-300 hover:text-amber-300 group cursor-pointer" onClick={onOpenContact}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                <svg className="w-4 h-4 text-slate-900 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span className="transition-all duration-300 group-hover:tracking-wide">miklhagstroem@gmail.com</span>
            </div>
            <a href="tel:+4581260711" className="flex items-center space-x-3 transition-all duration-300 hover:text-amber-300 group cursor-pointer no-underline text-white">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                <svg className="w-4 h-4 text-slate-900 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <span className="transition-all duration-300 group-hover:tracking-wide">+45 81 26 07 11</span>
            </a>
          </div>

          <nav className="nav-font flex flex-wrap justify-center gap-6 text-xs text-white/80 uppercase font-semibold" role="navigation" aria-label="Footer navigation">
            <Link to="/hjemmesider" className="hover:text-amber-300 transition-all duration-300 text-white/80 no-underline">HJEMMESIDER</Link>
            <Link to="/seo" className="hover:text-amber-300 transition-all duration-300 text-white/80 no-underline">SEO</Link>
            <Link to="/marketing" className="hover:text-amber-300 transition-all duration-300 text-white/80 no-underline">MARKETING</Link>
            <Link to="/priser" className="hover:text-amber-300 transition-all duration-300 text-white/80 no-underline">PRISER</Link>
            <Link to="/faq" className="hover:text-amber-300 transition-all duration-300 text-white/80 no-underline">FAQ</Link>
            <button onClick={onOpenContact} className="hover:text-amber-300 transition-all duration-300 bg-transparent border-none cursor-pointer text-amber-300 font-bold">KONTAKT</button>
          </nav>
        </div>

        <div className="mt-12 mb-8 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

        <div className="text-center text-xs text-white/60">
          © {new Date().getFullYear()} BusyBiz. Alle rettigheder forbeholdes. | Professionel Webdesign, SEO & Marketing i Danmark
        </div>
      </div>
    </footer>
  );
};
