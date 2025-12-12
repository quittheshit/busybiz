import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';
import { Alert } from '../components/ui/Alert';
import { Loader2 } from 'lucide-react';

export function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priceId = searchParams.get('priceId');
  const product = priceId ? getProductByPriceId(priceId) : null;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!priceId || !product) {
      navigate('/dashboard');
      return;
    }
  }, [user, priceId, product, navigate]);

  const handleCheckout = async () => {
    if (!user || !priceId || !product) return;

    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setError('Du skal være logget ind for at fortsætte');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/checkout?priceId=${priceId}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Der opstod en fejl');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message || 'Der opstod en fejl under checkout');
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produkt ikke fundet</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md"
          >
            Tilbage til Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
          
          {error && (
            <Alert type="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <div className="border rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            {product.price && (
              <p className="text-xl font-bold text-amber-600">
                {product.price.toLocaleString('da-DK')} {product.currency}
              </p>
            )}
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Behandler...
              </>
            ) : (
              'Fortsæt til betaling'
            )}
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
          >
            Annuller
          </button>
        </div>
      </div>
    </div>
  );
}