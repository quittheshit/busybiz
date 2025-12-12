import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { Check, ArrowRight, Mail, Phone } from 'lucide-react';

export const Success = () => {
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    // Get session_id from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      // You could fetch order details here if needed
      // For now, we'll just show a success message
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Indlæser...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-8 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-12 h-12 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tak for dit køb!
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Din betaling er gennemført succesfuldt. Vi har modtaget din ordre og vil kontakte dig inden for 24 timer for at komme i gang med dit projekt.
          </p>

          {/* What happens next */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-amber-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Hvad sker der nu?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Bekræftelse</h3>
                  <p className="text-white/70 text-sm">Du modtager en bekræftelsesmail med ordredetaljer inden for få minutter.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Kontakt</h3>
                  <p className="text-white/70 text-sm">Vi kontakter dig inden for 24 timer for at planlægge dit projekt.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Igangsætning</h3>
                  <p className="text-white/70 text-sm">Vi går i gang med at levere den løsning, du har bestilt.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-amber-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Har du spørgsmål?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="mailto:miklhagstroem@gmail.com"
                className="flex items-center justify-center space-x-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors"
              >
                <Mail className="w-5 h-5 text-amber-400" />
                <span className="text-white">miklhagstroem@gmail.com</span>
              </a>
              <a
                href="tel:+4581260711"
                className="flex items-center justify-center space-x-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span className="text-white">+45 81 26 07 11</span>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Gå til dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-amber-400 text-amber-400 font-semibold rounded-full hover:bg-amber-400 hover:text-slate-900 transition-all duration-300"
            >
              Tilbage til forsiden
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};