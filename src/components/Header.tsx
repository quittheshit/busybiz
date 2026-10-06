import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 no-underline">
            <img src="/Busybiz-mascot-transparent-Photoroom.png" alt="BusyBiz Logo" className="w-9 h-9 object-contain" />
            <span className="text-white font-bold tracking-wider text-lg">BUSYBIZ</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-semibold uppercase">
            <Link to="/hjemmesider" className="text-white hover:text-amber-400 transition-colors">Hjemmesider</Link>
            <Link to="/seo" className="text-white hover:text-amber-400 transition-colors">SEO</Link>
            <Link to="/marketing" className="text-white hover:text-amber-400 transition-colors">Marketing</Link>
            <Link to="/priser" className="text-white hover:text-amber-400 transition-colors">Priser</Link>
            <Link to="/faq" className="text-white hover:text-amber-400 transition-colors">FAQ</Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-2">
            <Link to="/hjemmesider" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-white hover:text-amber-400">Hjemmesider</Link>
            <Link to="/seo" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-white hover:text-amber-400">SEO</Link>
            <Link to="/marketing" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-white hover:text-amber-400">Marketing</Link>
            <Link to="/priser" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-white hover:text-amber-400">Priser</Link>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-white hover:text-amber-400">FAQ</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;