import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, User, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SEO } from '@/lib/seo';
import { BLOG_POSTS } from '@/data/content';

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Bag Wholesale Business Blog | Tips & Market Insights"
        description="Read the latest insights about the bag wholesale market in Delhi. Tips for retailers, reselling business guides, and product trends."
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

      <section 
        className="relative text-white py-24 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url("https://i.ibb.co/zTZcYY7Y/image.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Wholesale Business Blog</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Insights, guides, and tips to help you dominate the bag retail market.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post) => (
              <Card key={post.slug} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${post.slug}/800/600`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-slate-400 mb-4 space-x-4">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {post.date}</span>
                    <span className="flex items-center"><User className="w-3 h-3 mr-1" /> Admin</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="link" className="p-0 text-blue-600 font-bold hover:text-blue-700">
                      Read Full Guide <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Highlights Gallery */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Market Highlights & Collections</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Real-time glimpses from our warehouse and the latest wholesale collections arriving this week.
            </p>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              "https://i.ibb.co/Jw3cJd4f/image.png",
              "https://i.ibb.co/TBVqs9c5/image.png",
              "https://i.ibb.co/vCCxc9Z2/image.png",
              "https://i.ibb.co/3YRWQWx0/image.png",
              "https://i.ibb.co/WpcNqmh3/image.png",
              "https://i.ibb.co/s9pKZL7H/image.png",
              "https://i.ibb.co/VYvMJkfk/image.png"
            ].map((img, idx) => (
              <div 
                key={idx} 
                className="relative group overflow-hidden rounded-2xl cursor-pointer break-inside-avoid"
                onClick={() => window.open(img, '_blank')}
              >
                <img 
                  src={img} 
                  alt={`Market Highlight ${idx + 1}`} 
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold border-2 border-white px-4 py-2 rounded-full">View Full Size</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Lead Magnet */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Get Weekly Market Updates</h2>
          <p className="text-slate-600 mb-8">
            Join our mailing list to receive the latest wholesale price drops and new collection alerts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow h-12 rounded-md border border-slate-200 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
