import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Download, ShoppingBag, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEO } from '@/lib/seo';
import { PRODUCT_CATEGORIES, BRANDS, WHOLESALE_PRODUCTS, BUSINESS_DETAILS } from '@/data/content';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(WHOLESALE_PRODUCTS.map(p => p.category))];
  
  const filteredProducts = activeCategory === "All" 
    ? WHOLESALE_PRODUCTS 
    : WHOLESALE_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Wholesale Bag Catalog | Bulk Trolley, School & Laptop Bags Delhi"
        description="Browse our complete wholesale bag catalog. 20+ categories of premium bags at direct factory rates from Paharganj, Delhi. Best for retailers & resellers."
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

      {/* Header */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://picsum.photos/seed/catalog/1920/1080" alt="Catalog Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="mb-4 bg-blue-600 hover:bg-blue-600 text-white border-none px-3 py-1">
            2024 Wholesale Collection
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight">Our Wholesale <span className="text-blue-500">Catalog</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Direct factory rates for retailers, shop owners, and bulk buyers. Pan India delivery available.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/inquiry">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-10 text-lg">
                Request Full Price List
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 h-14 px-10 text-lg">
              <Download className="w-5 h-5 mr-2" /> Download PDF Catalog
            </Button>
          </div>
        </div>
      </section>

      {/* Wholesale Catalog Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Wholesale Item Listings</h2>
              <p className="text-slate-600">Browse by category to find the best stock for your shop.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat)}
                  className={activeCategory === cat ? "bg-blue-600" : "border-slate-200"}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col overflow-hidden border-none shadow-md hover:shadow-xl transition-all group">
                  <Link to={`/product/${product.id}`} className="relative h-56 overflow-hidden bg-slate-200 cursor-pointer block">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-slate-900/80 backdrop-blur-sm text-white border-none">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-blue-600 text-white border-none font-bold">
                        MOQ: {product.moq}
                      </Badge>
                    </div>
                  </Link>
                  
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <Link to={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="text-blue-600 font-extrabold text-xl mb-4">
                      {product.priceRange} <span className="text-xs text-slate-400 font-normal">/ wholesale</span>
                    </div>
                    
                    <div className="space-y-3 mb-6 flex-grow">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Features:</div>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((f) => (
                          <span key={f} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                            {f}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-slate-500">
                        <span className="font-bold">Best For:</span> {product.target}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <a 
                        href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Hi, I am interested in ${product.name} (MOQ: ${product.moq}). Please share wholesale details.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white text-xs">
                          <MessageSquare className="w-3 h-3 mr-1" /> WhatsApp
                        </Button>
                      </a>
                      <a href={`tel:${BUSINESS_DETAILS.phone}`} className="w-full">
                        <Button size="sm" variant="outline" className="w-full border-slate-200 text-xs">
                          <Phone className="w-3 h-3 mr-1" /> Call Now
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Inquiry Banner */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Need a Custom Wholesale Quote?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            If you are looking for container-load orders or specific branding requirements, our wholesale managers are ready to assist you.
          </p>
          <Link to="/inquiry">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 font-bold px-10 h-14">
              Send Bulk Inquiry Form
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Detail Section (Original) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Specializations</h2>
            <p className="text-slate-600">Detailed breakdown of our manufacturing and supply capabilities.</p>
          </div>
          <div className="space-y-24">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <div key={category.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-auto"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">
                    Wholesale Category
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{category.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.features.map((feature) => (
                      <div key={feature} className="flex items-center text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <Link to="/inquiry" className="flex-1">
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12">
                        Get Bulk Quote
                      </Button>
                    </Link>
                    <Link to="/contact" className="flex-1">
                      <Button variant="outline" className="w-full border-slate-300 h-12">
                        Check Availability
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-white text-xl font-bold mb-8">Authorized Wholesale Partner for Top Brands</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {BRANDS.map((brand) => (
              <Badge key={brand} className="bg-white/10 text-white border-white/20 px-4 py-2 text-sm">
                {brand}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale Benefits */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why Buy Bulk From Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Tiered Pricing", desc: "The more you buy, the less you pay. Special rates for container loads." },
              { title: "Custom Branding", desc: "Add your own logo for corporate gifting or school uniforms." },
              { title: "Priority Support", desc: "Dedicated account manager for all your bulk ordering needs." },
            ].map((benefit) => (
              <Card key={benefit.title} className="border-slate-100 shadow-sm">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
