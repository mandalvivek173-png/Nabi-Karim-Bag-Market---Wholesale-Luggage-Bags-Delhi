import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Users, History, Target, Award, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { SEO } from '@/lib/seo';
import { BUSINESS_DETAILS } from '@/data/content';

const TrustCarousel = () => {
  const images = [
    "https://i.ibb.co/V0CvrjTq/image.png",
    "https://i.ibb.co/mVqzzVLS/image.png"
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-100 aspect-[4/3]">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <img
          src={images[currentIndex]}
          alt={`Trust in Paharganj ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={prev}
          className="p-2 rounded-full bg-white/80 text-slate-900 hover:bg-white transition-colors shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={next}
          className="p-2 rounded-full bg-white/80 text-slate-900 hover:bg-white transition-colors shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-blue-600 w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <SEO
        title="About Us | Vivek Mandal Bags"
        description="Learn more about Vivek Mandal Bags, the leading luggage wholesaler in Delhi. Our history, mission, and commitment to quality."
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
      <section 
        className="relative text-white py-24 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url("https://i.ibb.co/P035vXp/image.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Story & Mission</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Empowering retailers across India with high-quality bags at factory-direct wholesale prices.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">15+ Years of Trust in Paharganj</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Founded in 2010, Vivek Mandal Bags started with a small shop in the heart of Delhi's bag market. Today, we are one of the most trusted names in the wholesale industry, supplying to over 10,000 retailers, resellers, and corporate clients.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our philosophy is simple: <span className="text-blue-600 font-semibold">Quality at the Right Price.</span> We understand that for a retailer to succeed, they need products that are both durable and affordable. That's why we source directly from the best manufacturers in India and abroad.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">Direct Sourcing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">Quality Control</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">Fast Shipping</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">Bulk Discounts</span>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <TrustCarousel />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-slate-100 mb-24">
            {[
              { icon: <History className="w-8 h-8 text-blue-600" />, label: "Years Experience", value: "15+" },
              { icon: <Users className="w-8 h-8 text-blue-600" />, label: "Happy Clients", value: "10k+" },
              { icon: <Award className="w-8 h-8 text-blue-600" />, label: "Product Varieties", value: "500+" },
              { icon: <Target className="w-8 h-8 text-blue-600" />, label: "Cities Served", value: "200+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Integrity",
                  desc: "We believe in honest pricing and transparent business dealings with all our partners."
                },
                {
                  title: "Innovation",
                  desc: "Constantly updating our catalog with the latest trends and ergonomic designs."
                },
                {
                  title: "Customer Success",
                  desc: "Our success is measured by the growth and profitability of our retail partners."
                }
              ].map((value) => (
                <div key={value.title} className="p-8 bg-slate-50 rounded-2xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                  <p className="text-slate-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
