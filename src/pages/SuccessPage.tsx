import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProductByPriceId } from '../stripe-config';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // In a real implementation, you would fetch order details from your backend
      // For now, we'll simulate this with the session_id
      setTimeout(() => {
        setOrderDetails({
          sessionId,
          status: 'completed'
        });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Bekræfter din betaling...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="py-4 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="/Busybiz-mascot-transparent-Photoroom.png"
                alt="BusyBiz Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-bold tracking-wider">BUSYBIZ</span>
          </Link>
        </div>
      </header>

      {/* Success Content */}
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <img
              src="/Busybiz-mascot-transparent-Photoroom.png"
              alt="BusyBiz Mascot"
              className="w-20 h-20 mx-auto opacity-80"
            />
          </div>

          {/* Success Message */}
          <h1 className="headline-font text-4xl md:text-5xl text-white mb-6">
            Tak for dit køb!
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Din betaling er gennemført succesfuldt. Vi er allerede gået i gang med dit projekt og vender tilbage til dig inden for 24 timer.
          </p>

          {/* Order Details */}
          {orderDetails && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 mb-8 border border-amber-500/20">
              <h3 className="text-lg font-semibold text-white mb-4">Ordredetaljer</h3>
              <div className="text-left space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Session ID:</span>
                  <span className="text-white font-mono text-sm">{orderDetails.sessionId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Status:</span>
                  <span className="text-emerald-400 font-semibold">Bekræftet</span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-amber-400/10 to-yellow-600/5 rounded-2xl p-6 mb-8 border border-amber-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Hvad sker der nu?</h3>
            <div className="text-left space-y-3 text-white/90">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-slate-900 font-bold text-sm">1</span>
                </div>
                <p>Du modtager en bekræftelsesmail inden for få minutter</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-slate-900 font-bold text-sm">2</span>
                </div>
                <p>Vi kontakter dig inden for 24 timer for at starte projektet</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-slate-900 font-bold text-sm">3</span>
                </div>
                <p>Vi holder dig opdateret gennem hele processen</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-bold py-3 px-8 rounded-full transition-all duration-300 hover:-translate-y-1"
            >
              Tilbage til forsiden
            </Link>
            <button
              onClick={() => {
                const event = new CustomEvent('openContactModal');
                window.dispatchEvent(event);
              }}
              className="bg-transparent border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              Kontakt os
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;