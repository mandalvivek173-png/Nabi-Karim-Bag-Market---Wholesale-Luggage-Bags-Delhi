import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { BUSINESS_DETAILS, PRODUCT_CATEGORIES } from '@/data/content';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <ShoppingBag className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold">Nabi Karim Bags</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Leading luggage and bag wholesaler in Delhi. Serving retailers and bulk buyers across India with premium quality and unbeatable wholesale rates since 2010.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-pink-500 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Our Products</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Business Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/inquiry" className="hover:text-white transition-colors">Wholesale Inquiry</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-6">Product Categories</h3>
          <ul className="space-y-4 text-sm">
            {PRODUCT_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link to="/products" className="hover:text-white transition-colors">{cat.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
              <span>{BUSINESS_DETAILS.location}</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
              <a href={`tel:${BUSINESS_DETAILS.phone}`} className="hover:text-white">{BUSINESS_DETAILS.phone}</a>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
              <a href={`mailto:${BUSINESS_DETAILS.email}`} className="hover:text-white">{BUSINESS_DETAILS.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Nabi Karim Bag Market. All rights reserved. Designed for Local SEO Domination.</p>
        <div className="mt-2 space-x-4">
          <Link to="/location/delhi" className="hover:text-white">Wholesale Bags Delhi</Link>
          <Link to="/location/paharganj" className="hover:text-white">Bag Market Paharganj</Link>
          <Link to="/location/sadar-bazar" className="hover:text-white">Sadar Bazar Bags</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
