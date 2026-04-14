import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, CheckCircle2, Phone, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SEO } from '@/lib/seo';
import { BUSINESS_DETAILS, PRODUCT_CATEGORIES, LOCATION_PAGES } from '@/data/content';

const Location: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();
  
  const data = LOCATION_PAGES.find(p => p.city === city) || LOCATION_PAGES[0];

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={data.title}
        description={data.desc}
        keywords={data.keywords}
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

      {/* Hero */}
      <section className="bg-slate-900 text-white pb-24 pt-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://picsum.photos/seed/delhi-streets/1920/1080" alt="Delhi Market" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-blue-500/30">
            <MapPin className="w-4 h-4 mr-2" /> Local Wholesale Hub: {city?.toUpperCase()}
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-8 leading-tight">
            {data.title}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            {data.desc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/inquiry">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-10 text-lg">
                Get Wholesale Rates
              </Button>
            </Link>
            <a href={`tel:${BUSINESS_DETAILS.phone}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 h-14 px-10 text-lg">
                Call: {BUSINESS_DETAILS.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Local SEO Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="prose prose-lg max-w-none text-slate-600">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Sourcing from {city?.toUpperCase()} is Profitable?</h2>
              <p>
                If you are a retail shop owner or an e-commerce seller in India, sourcing from the <strong>{data.title}</strong> is the most strategic move you can make. The Nabi Karim area in Paharganj is globally recognized as a manufacturing and wholesale hub for all types of bags.
              </p>
              <p>
                By buying directly from us at Nabi Karim Bag Market, you bypass multiple layers of distributors and wholesalers, saving up to 30-40% on your procurement costs. This allows you to offer more competitive prices to your customers while maintaining healthy profit margins.
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Logistics Advantage</h3>
              <p>
                Paharganj is uniquely positioned near the New Delhi Railway Station and major transport hubs. This means we can dispatch your bulk orders to any city in India—be it Mumbai, Kolkata, Chennai, or small towns in Bihar and UP—with minimal transit time and cost.
              </p>

              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 mt-10">
                <h4 className="text-xl font-bold text-slate-900 mb-4">What We Offer:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-1" /> <span>Widest range of <strong>Trolley Bags</strong> in Delhi.</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-1" /> <span>Bulk supply of <strong>School Bags</strong> for institutions.</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-1" /> <span>Professional <strong>Laptop Bags</strong> at factory rates.</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-1" /> <span>Customized corporate gifting solutions.</span></li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Top Selling Categories in {city?.toUpperCase()}</h2>
              <div className="grid grid-cols-1 gap-6">
                {PRODUCT_CATEGORIES.slice(0, 3).map((cat) => (
                  <Card key={cat.id} className="overflow-hidden border-none shadow-lg group">
                    <div className="flex h-40">
                      <div className="w-1/3 overflow-hidden">
                        <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <CardContent className="w-2/3 p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{cat.description}</p>
                        <Link to="/products" className="text-blue-600 font-bold text-sm flex items-center hover:underline">
                          View Wholesale Rates <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="bg-slate-900 text-white p-10 rounded-3xl border-none shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShoppingBag className="w-32 h-32" />
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Visit Our Store Today</h3>
                <p className="text-slate-400 mb-8 relative z-10">
                  Experience the quality and variety firsthand. We are located at:
                </p>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-500 mr-4 shrink-0" />
                    <span className="text-sm">{BUSINESS_DETAILS.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-500 mr-4 shrink-0" />
                    <span className="text-sm">{BUSINESS_DETAILS.phone}</span>
                  </div>
                </div>
                <Link to="/contact" className="mt-10 block">
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold h-12">
                    Get Directions
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Local Testimonial */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Trusted by {city?.toUpperCase()} Retailers</h2>
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 italic text-xl text-slate-600 leading-relaxed relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white p-3 rounded-full">
              <ShoppingBag className="w-6 h-6" />
            </div>
            "Nabi Karim Bag Market has been our primary supplier for over 5 years. Their understanding of the Delhi wholesale market is unmatched. The quality of trolley bags we get here is better than what we find in Sadar Bazar at even lower rates."
            <div className="mt-8 not-italic">
              <p className="font-bold text-slate-900">Amit Malhotra</p>
              <p className="text-sm text-slate-500">Retailer, Karol Bagh, Delhi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;
