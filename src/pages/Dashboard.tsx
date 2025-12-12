import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';
import { User, CreditCard, Package, LogOut, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserSubscription {
  customer_id: string;
  subscription_id: string;
  subscription_status: string;
  price_id: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  payment_method_brand: string;
  payment_method_last4: string;
}

interface UserOrder {
  customer_id: string;
  order_id: number;
  checkout_session_id: string;
  payment_intent_id: string;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  order_status: string;
  order_date: string;
}

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch subscriptions
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('stripe_user_subscriptions')
        .select('*');

      if (subscriptionError) {
        console.error('Error fetching subscriptions:', subscriptionError);
      } else {
        setSubscriptions(subscriptionData || []);
      }

      // Fetch orders
      const { data: orderData, error: orderError } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (orderError) {
        console.error('Error fetching orders:', orderError);
      } else {
        setOrders(orderData || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number | string) => {
    const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : new Date(timestamp);
    return date.toLocaleDateString('da-DK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${(amount / 100).toLocaleString('da-DK')} ${currency.toUpperCase()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
        return 'text-green-400 bg-green-400/10';
      case 'pending':
      case 'trialing':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'canceled':
      case 'cancelled':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'Aktiv';
      case 'completed': return 'Gennemført';
      case 'pending': return 'Afventer';
      case 'trialing': return 'Prøveperiode';
      case 'canceled': return 'Annulleret';
      case 'cancelled': return 'Annulleret';
      default: return status;
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Indlæser dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Tilbage til forsiden</span>
            </Link>
            <div className="flex items-center space-x-3">
              <img
                src="/Busybiz-mascot-transparent-Photoroom.png"
                alt="BusyBiz Logo"
                className="w-8 h-8"
              />
              <span className="text-white font-bold">BUSYBIZ</span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Log ud</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Velkommen, {user.email}
          </h1>
          <p className="text-white/80 text-lg">
            Her kan du se dine køb og abonnementer
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
            <div className="flex items-center space-x-3 mb-2">
              <Package className="w-6 h-6 text-amber-400" />
              <h3 className="text-white font-semibold">Aktive Abonnementer</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {subscriptions.filter(sub => sub.subscription_status === 'active').length}
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
            <div className="flex items-center space-x-3 mb-2">
              <CreditCard className="w-6 h-6 text-amber-400" />
              <h3 className="text-white font-semibold">Gennemførte Køb</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {orders.filter(order => order.order_status === 'completed').length}
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
            <div className="flex items-center space-x-3 mb-2">
              <User className="w-6 h-6 text-amber-400" />
              <h3 className="text-white font-semibold">Konto Status</h3>
            </div>
            <p className="text-lg font-semibold text-green-400">Aktiv</p>
          </div>
        </div>

        {/* Active Subscriptions */}
        {subscriptions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Dine Abonnementer</h2>
            <div className="space-y-4">
              {subscriptions.map((subscription, index) => {
                const product = getProductByPriceId(subscription.price_id);
                return (
                  <div
                    key={index}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {product?.name || 'Ukendt produkt'}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span>Status: <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(subscription.subscription_status)}`}>
                            {getStatusText(subscription.subscription_status)}
                          </span></span>
                          {subscription.current_period_end && (
                            <span>Næste fakturering: {formatDate(subscription.current_period_end)}</span>
                          )}
                        </div>
                      </div>
                      {subscription.payment_method_brand && subscription.payment_method_last4 && (
                        <div className="text-white/70 text-sm">
                          {subscription.payment_method_brand} ****{subscription.payment_method_last4}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Order History */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Købshistorik</h2>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => {
                // Try to find product by checking if amount matches any product price
                const matchingProduct = getProductByPriceId('') || 
                  (() => {
                    const amountInKr = order.amount_total / 100;
                    if (amountInKr === 2999) return getProductByPriceId('price_1SdMy222WWIq95RMiCN3TYcQ');
                    if (amountInKr === 3999) return getProductByPriceId('price_1SdMh722WWIq95RMSqAR9ABz');
                    return null;
                  })();

                return (
                  <div
                    key={order.order_id}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {matchingProduct?.name || 'Køb'}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span>Ordre #{order.order_id}</span>
                          <span>{formatDate(order.order_date)}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.order_status)}`}>
                            {getStatusText(order.order_status)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-white">
                          {formatAmount(order.amount_total, order.currency)}
                        </div>
                        <div className="text-sm text-white/70">
                          Betaling: {getStatusText(order.payment_status)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 text-center">
              <Package className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Ingen køb endnu</h3>
              <p className="text-white/70 mb-6">Du har ikke foretaget nogen køb endnu.</p>
              <Link
                to="/checkout"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Se vores løsninger
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};