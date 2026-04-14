import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, MessageSquare, MapPin, ShieldCheck, Zap, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SEO } from '@/lib/seo';
import { BUSINESS_DETAILS, PRODUCT_CATEGORIES, BRANDS, FAQS, LOCAL_BUSINESS_SCHEMA, WHOLESALE_PRODUCTS } from '@/data/content';

const Home: React.FC = () => {
  const heroImages = [
    "https://i.ibb.co/nqdPCsd6/image.png",
    "https://i.ibb.co/ZRNDS3vk/image.png",
    "https://i.ibb.co/p6DqX7HH/image.png",
    "https://i.ibb.co/rRsLpTZn/image.png"
  ];
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      <SEO
        title="Delhi’s No.1 Wholesale Bag Market – Direct Factory Rates"
        description="Nabi Karim Bag Market is the #1 wholesale luggage and bag supplier in Paharganj, Delhi. Bulk trolley bags, school bags, and laptop bags at factory rates."
        keywords="wholesale luggage market Delhi, bag wholesale market Paharganj, trolley bags wholesale Delhi, school bags wholesale supplier India"
        schema={LOCAL_BUSINESS_SCHEMA}
      />

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentHeroIdx}
              src={heroImages[currentHeroIdx]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              alt="Wholesale Bag Market Background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-blue-600 hover:bg-blue-600 text-white border-none px-3 py-1">
                #1 Wholesale Bag Market in Delhi
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                Vivek Mandal Bags – <span className="text-blue-500">Direct Factory Rates</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed">
                Bulk mein trolley bags, school bags, laptop bags aur travel luggage – <span className="text-white font-semibold">best price guaranteed from Paharganj, Delhi.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`tel:${BUSINESS_DETAILS.phone}`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-14 px-8 shadow-lg">
                    <Phone className="mr-2 w-5 h-5" /> Call Now
                  </Button>
                </a>
                <a 
                  href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Hi, I need wholesale price list for bulk bags.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white border-none text-lg h-14 px-8 shadow-lg">
                    <MessageSquare className="mr-2 w-5 h-5" /> WhatsApp for Bulk Price
                  </Button>
                </a>
                <Link to="/location/paharganj" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full text-lg h-14 px-8 shadow-lg">
                    <MapPin className="mr-2 w-5 h-5" /> Visit Store
                  </Button>
                </Link>
              </div>
              <div className="mt-12 flex items-center space-x-6 text-sm text-slate-200 font-medium">
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" /> Pan India Delivery
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" /> 10,000+ Happy Clients
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Wholesale Products */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Our Wholesale Products</h2>
              <p className="text-slate-600 max-w-xl">
                We deal in all types of wholesale bags at direct factory rates. Bulk orders ke liye direct contact karein.
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                View All 20+ Categories <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHOLESALE_PRODUCTS.slice(0, 4).map((product) => (
              <Card key={product.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group">
                <Link to={`/product/${product.id}`} className="relative h-48 overflow-hidden block cursor-pointer">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" loading="lazy" />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-blue-600 text-white border-none text-[10px]">{product.category}</Badge>
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
                    <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{product.name}</h3>
                  </Link>
                  <p className="text-blue-600 font-bold text-sm mb-3">{product.priceRange}</p>
                  <div className="text-[10px] text-slate-500 mb-4">MOQ: {product.moq}</div>
                  <a 
                    href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Hi, I want to know more about ${product.name}.`}
                    className="block"
                  >
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                      WhatsApp Now
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Wholesale Bag Categories</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We deal in all types of wholesale bags: Trolley Luggage, School Bags, Laptop Bags, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {category.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center text-xs text-slate-500">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/products">
                      <Button variant="link" className="p-0 text-blue-600 font-semibold hover:text-blue-700">
                        View Wholesale Rates <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-none">Trusted Wholesaler</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                About Vivek Mandal Bags
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Vivek Mandal Bags, Paharganj Delhi ka ek trusted wholesale luggage supplier hai. Hum retailers, shop owners aur resellers ko lowest price pe bulk bags supply karte hain.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <p className="text-2xl font-bold text-blue-600">10+ Years</p>
                  <p className="text-sm text-slate-500">Experience</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <p className="text-2xl font-bold text-blue-600">100+</p>
                  <p className="text-sm text-slate-500">Bag Varieties</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <p className="text-2xl font-bold text-blue-600">Direct</p>
                  <p className="text-sm text-slate-500">Wholesale Rates</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <p className="text-2xl font-bold text-blue-600">Delhi's Big</p>
                  <p className="text-sm text-slate-500">Bag Hub Location</p>
                </div>
              </div>
              <Link to="/about">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white">Learn More About Us</Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://picsum.photos/seed/market-store/800/800"
                  alt="Nabi Karim Bag Market Storefront"
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-10">
            Top Brands Available in Bulk
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
            {BRANDS.map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
            <p className="text-slate-600">Trusted by resellers across India for the best wholesale experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-yellow-500" />,
                title: "Cheapest Wholesale Rates",
                desc: "Direct factory sourcing ensures you get the lowest prices in Delhi's bag market."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
                title: "Huge Variety",
                desc: "From trolley bags to school bags, we have all categories available under one roof."
              },
              {
                icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
                title: "Ready Stock",
                desc: "We maintain huge inventory for bulk buyers to ensure immediate dispatch."
              },
              {
                icon: <MapPin className="w-6 h-6 text-red-500" />,
                title: "Easy Location",
                desc: "Located near Paharganj market, making it easy for logistics and transport."
              },
              {
                icon: <Star className="w-6 h-6 text-orange-500" />,
                title: "Trusted by Resellers",
                desc: "We are the preferred partner for Amazon, Flipkart, and Meesho sellers across India."
              },
              {
                icon: <MessageSquare className="w-6 h-6 text-indigo-500" />,
                title: "Excellent Support",
                desc: "Our team is available on WhatsApp and Phone to assist you with every order."
              }
            ].map((item) => (
              <Card key={item.title} className="border-slate-100 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-8">
                  <div className="bg-slate-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Customer Reviews</h2>
            <div className="flex justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Rajesh Kumar",
                role: "Shop Owner, Jaipur",
                text: "Good quality bags at best wholesale rates. Best place for bulk bag buying in Delhi."
              },
              {
                name: "Vikram Singh",
                role: "Bulk Supplier, Punjab",
                text: "Reliable and honest people. Paharganj me inse sasta aur accha bag market aur koi nahi hai. Highly recommended!"
              }
            ].map((t, i) => (
              <Card key={i} className="bg-slate-800 border-none p-8">
                <MessageSquare className="w-8 h-8 text-blue-500 mb-6" />
                <p className="text-slate-300 italic mb-6 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">FAQ (SEO Booster)</h2>
            <p className="text-slate-600">Common questions about wholesale bag market in Delhi.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Visit Our Warehouse</h2>
            <p className="text-slate-600">Nabi Karim Bag Market, Paharganj, Delhi - The hub of wholesale bags.</p>
          </div>
          
          <div className="p-4 sm:p-10 rounded-[32px] bg-gradient-to-br from-white to-slate-100 shadow-xl border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-2xl">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Exact Location</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      7251, Qutab Rd, near Tikona Park, Aram Nagar, Paharganj, Delhi, 110055
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-2xl">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Contact for Guidance</h3>
                    <p className="text-sm text-slate-600">{BUSINESS_DETAILS.phone}</p>
                  </div>
                </div>
                <a 
                  href="https://maps.google.com/?q=Nabi+Karim+Bag+Market+Paharganj+Delhi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12">
                    Open in Google Maps
                  </Button>
                </a>
              </div>
              
              <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-inner border border-slate-200 h-[400px]">
                <iframe 
                  src="https://www.google.com/maps?q=Nabi+Karim+Bag+Market+Paharganj+Delhi&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Nabi Karim Bag Market Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8">
            Get Best Wholesale Price Today
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Bulk orders ke liye direct contact karein. Best price guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/inquiry">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 font-bold px-10 h-14 shadow-xl">
                Send Bulk Inquiry
              </Button>
            </Link>
            <a 
              href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Hi, I need wholesale price list.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white border-none font-bold px-10 h-14 shadow-xl">
                <MessageSquare className="mr-2 w-5 h-5" /> WhatsApp Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
