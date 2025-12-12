import React, { useEffect, useState } from 'react';
import { Crown, Loader2 } from 'lucide-react';
import { supabase, StripeSubscription } from '../lib/supabase';

export function UserSubscription() {
  const [subscription, setSubscription] = useState<StripeSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('stripe_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Fejl ved hentning af abonnement:', error);
        return;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Fejl ved hentning af abonnement:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center text-sm text-gray-600">
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Indlæser...
      </div>
    );
  }

  if (!subscription) {
    return null;
  }

  return (
    <div className="flex items-center bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg px-4 py-2">
      <Crown className="w-5 h-5 text-yellow-600 mr-2" />
      <span className="text-sm font-medium text-yellow-800">
        {subscription.product_name}
      </span>
    </div>
  );
}