import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, MessageSquare, ArrowLeft, CheckCircle2, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEO } from '@/lib/seo';
import { WHOLESALE_PRODUCTS, BUSINESS_DETAILS } from '@/data/content';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = WHOLESALE_PRODUCTS.find((p) => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(product?.image || '');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
          <Link to="/products">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <SEO
        title={`${product.name} Wholesale | Nabi Karim Bag Market Delhi`}
        description={`Get wholesale rates for ${product.name}. MOQ: ${product.moq}. Direct factory supply from Paharganj, Delhi.`}
      />

      {/* Back Button */}
      <div className="bg-slate-900 pt-6 px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-300 hover:text-white transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl overflow-hidden bg-white shadow-lg border border-slate-100"
            >
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.gallery?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-blue-600 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-3 py-1">
                {product.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-black text-blue-600">{product.priceRange}</div>
                <div className="text-slate-400 text-sm">Wholesale Rate</div>
              </div>
              <Badge variant="outline" className="text-lg py-2 px-4 border-blue-200 text-blue-700 bg-blue-50">
                Minimum Order: {product.moq}
              </Badge>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Product Details</h3>
              <p className="text-slate-600 leading-relaxed">
                {product.detailedDescription}
              </p>
            </div>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Hi, I am interested in ${product.name} (ID: ${product.id}). Please share more details and final wholesale price.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg font-bold shadow-lg shadow-green-200">
                  <MessageSquare className="w-5 h-5 mr-2" /> WhatsApp for Bulk Deal
                </Button>
              </a>
              <a href={`tel:${BUSINESS_DETAILS.phone}`} className="w-full">
                <Button variant="outline" className="w-full border-slate-300 h-14 text-lg font-bold text-slate-700">
                  <Phone className="w-5 h-5 mr-2" /> Call Now
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200">
              <div className="text-center">
                <div className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Pan India Delivery</p>
              </div>
              <div className="text-center">
                <div className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Quality Checked</p>
              </div>
              <div className="text-center">
                <div className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Direct Factory Rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
