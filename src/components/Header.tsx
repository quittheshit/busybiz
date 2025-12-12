@@ .. @@
 import React, { useState } from 'react';
-import { Menu, X, Zap } from 'lucide-react';
+import { Menu, X, Zap, User } from 'lucide-react';
+import { Link } from 'react-router-dom';
+import { useAuth } from '../lib/auth';
 
 export function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
+  const { user } = useAuth();
 
   return (
     <header className="bg-white shadow-sm sticky top-0 z-50">
@@ .. @@
           </div>
           
           {/* Desktop Navigation */}
           <nav className="hidden md:flex space-x-8">
             <a href="#services" className="text-gray-700 hover:text-amber-600 transition-colors">Ydelser</a>
             <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors">Om os</a>
             <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors">Kontakt</a>
+            {user ? (
+              <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-amber-600 transition-colors">
+                <User className="h-4 w-4 mr-1" />
+                Dashboard
+              </Link>
+            ) : (
+              <Link to="/login" className="text-gray-700 hover:text-amber-600 transition-colors">Log ind</Link>
+            )}
           </nav>
 
           {/* Mobile menu button */}
@@ .. @@
             <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-amber-600">Ydelser</a>
             <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-amber-600">Om os</a>
             <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-amber-600">Kontakt</a>
+            {user ? (
+              <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-amber-600">Dashboard</Link>
+            ) : (
+              <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-amber-600">Log ind</Link>
+            )}
           </div>
         )}
       </div>