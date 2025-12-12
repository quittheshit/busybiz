import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch order details from Supabase
        const { data: orders, error } = await supabase
          .from('stripe_orders')
          .select('*')
          .eq('checkout_session_id', sessionId)
          .single();

        if (error) {
          console.error('Error fetching order:', error);
        } else if (orders) {
          setOrderDetails(orders);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-white">Indlæser...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tak for dit køb!
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Din betaling er gennemført, og vi går i gang med dit projekt med det samme.
          </p>
        </div>

        {orderDetails && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-amber-500/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Ordredetaljer</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-700">
                <span className="text-white/90">Ordre ID:</span>
                <span className="text-white font-mono">#{orderDetails.id}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-700">
                <span className="text-white/90">Beløb:</span>
                <span className="text-white font-bold">
                  {(orderDetails.amount_total / 100).toLocaleString('da-DK')} {orderDetails.currency.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-700">
                <span className="text-white/90">Status:</span>
                <span className="text-green-400 font-semibold">Betalt</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-amber-500/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Hvad sker der nu?</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Vi kontakter dig inden for 24 timer</h3>
                <p className="text-white/90">Du vil modtage en e-mail med næste skridt og eventuelle spørgsmål til dit projekt.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Projektstart</h3>
                <p className="text-white/90">Vi går i gang med dit projekt og holder dig opdateret undervejs.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Levering</h3>
                <p className="text-white/90">Du modtager dit færdige projekt og support til at komme i gang.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Tilbage til forsiden</span>
          </Link>
        </div>
      </div>
    </div>
  );
}