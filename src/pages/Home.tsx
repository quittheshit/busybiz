import React from 'react';
import { Zap, Shield, Headphones } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { STRIPE_PRODUCTS } from '../stripe-config';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Digital Services</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Professionelle digitale løsninger
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Vi hjælper din virksomhed med at vokse online gennem skræddersyede hjemmesider, 
            effektiv SEO og målrettede digitale strategier.
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              <span>Hurtig levering</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>Sikker betaling</span>
            </div>
            <div className="flex items-center">
              <Headphones className="w-5 h-5 mr-2" />
              <span>Dedikeret support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Vælg den rigtige løsning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fra skræddersyede løsninger til færdige pakker - vi har det rigtige tilbud til din virksomhed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STRIPE_PRODUCTS.map((product) => (
              <ProductCard key={product.priceId} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Klar til at komme i gang?</h3>
          <p className="text-gray-300 mb-6">
            Kontakt os i dag for en uforpligtende snak om dine behov
          </p>
          <div className="text-sm text-gray-400">
            © 2024 Digital Services. Alle rettigheder forbeholdes.
          </div>
        </div>
      </footer>
    </div>
  );
}