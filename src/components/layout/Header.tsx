import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BUSINESS_DETAILS } from '@/data/content';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href={`tel:${BUSINESS_DETAILS.phone}`} className="flex items-center hover:text-blue-400 transition-colors">
              <Phone className="w-3 h-3 mr-1" /> {BUSINESS_DETAILS.phone}
            </a>
            <span className="hidden sm:flex items-center">
              <MapPin className="w-3 h-3 mr-1" /> Paharganj, Delhi
            </span>
          </div>
          <div className="font-medium">
            <span className="hidden sm:inline">Wholesale Only - </span> Best Rates in India
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Vivek Mandal <span className="text-blue-600">Bags</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive(item.href) ? 'text-blue-600' : 'text-slate-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/inquiry">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Bulk Inquiry
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.href)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4">
            <Link to="/inquiry" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Bulk Inquiry
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
