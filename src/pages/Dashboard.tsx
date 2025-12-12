import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { stripeProducts, getProductByPriceId } from '../stripe-config';
import { Alert } from '../components/ui/Alert';
import { Loader2 } from 'lucide-react';

interface UserSubscription {
  subscription_status: string;
  price_id: string | null;
}

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('subscription_status, price_id')
        .maybeSingle();

      if (error) {
        setError('Kunne ikke hente abonnement information');
        console.error('Error fetching subscription:', error);
      } else {
        setSubscription(data);
      }
    } catch (err) {
      setError('Der opstod en fejl');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionDisplay = () => {
    if (!subscription || !subscription.price_id) {
      return 'Ingen aktiv plan';
    }

    const product = getProductByPriceId(subscription.price_id);
    return product ? product.name : 'Ukendt plan';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <button
                onClick={signOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Log ud
              </button>
            </div>

            {error && (
              <Alert type="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Konto Information</h2>
              <div className="space-y-2">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Aktuel plan:</strong> {getSubscriptionDisplay()}</p>
                {subscription?.subscription_status && (
                  <p><strong>Status:</strong> {subscription.subscription_status}</p>
                )}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tilgængelige Produkter</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stripeProducts.map((product) => (
                  <div key={product.priceId} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    {product.price && (
                      <p className="text-xl font-bold text-amber-600 mb-4">
                        {product.price.toLocaleString('da-DK')} {product.currency}
                      </p>
                    )}
                    <button
                      onClick={() => window.location.href = `/checkout?priceId=${product.priceId}`}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Køb nu
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}