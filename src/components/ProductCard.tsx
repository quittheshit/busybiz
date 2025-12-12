import React, { useState } from 'react';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { StripeProduct, formatPrice } from '../stripe-config';

interface ProductCardProps {
  product: StripeProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setLoading(true);

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`;
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          priceId: product.priceId,
          mode: product.mode,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: window.location.href,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Ingen checkout URL modtaget');
      }
    } catch (error) {
      console.error('Fejl ved oprettelse af checkout:', error);
      alert('Der opstod en fejl. Prøv igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h3>
        <div className="text-4xl font-bold text-blue-600 mb-4">
          {formatPrice(product.price, product.currency)}
        </div>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center text-sm text-gray-700">
          <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
          <span>Professionel service</span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
          <span>Hurtig levering</span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
          <span>Support inkluderet</span>
        </div>
      </div>

      <button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center group"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Behandler...
          </>
        ) : (
          <>
            {product.price === null ? 'Kontakt os' : 'Køb nu'}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </>
        )}
      </button>
    </div>
  );
}