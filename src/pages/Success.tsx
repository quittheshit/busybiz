import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, StripeOrder } from '../lib/supabase';

export function Success() {
  const [order, setOrder] = useState<StripeOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestOrder();
  }, []);

  const fetchLatestOrder = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('stripe_orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Fejl ved hentning af ordre:', error);
        return;
      }

      setOrder(data);
    } catch (error) {
      console.error('Fejl ved hentning af ordre:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Betaling gennemført!
          </h1>
          <p className="text-gray-600">
            Tak for dit køb. Du vil modtage en bekræftelse på email.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Indlæser ordredetaljer...</span>
          </div>
        ) : order ? (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Ordredetaljer</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Produkt:</strong> {order.product_name}</p>
              <p><strong>Beløb:</strong> {new Intl.NumberFormat('da-DK', {
                style: 'currency',
                currency: order.currency.toUpperCase(),
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              }).format(order.amount / 100)}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          </div>
        ) : null}

        <Link
          to="/"
          className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til forsiden
        </Link>
      </div>
    </div>
  );
}