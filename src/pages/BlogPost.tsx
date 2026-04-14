import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/lib/seo';
import { BLOG_POSTS, BUSINESS_DETAILS } from '@/data/content';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={post.title}
        description={post.excerpt}
        ogType="article"
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
      <div className="relative h-[400px] sm:h-[500px] w-full">
        <img
          src={`https://picsum.photos/seed/${post.slug}/1920/1080`}
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="max-w-4xl px-4 text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center text-slate-200 text-sm space-x-6">
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {post.date}</span>
              <span className="flex items-center"><User className="w-4 h-4 mr-2" /> By Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link to="/blog" className="inline-flex items-center text-blue-600 font-semibold mb-12 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
        </Link>

        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-8">
          <p className="text-xl text-slate-900 font-medium italic border-l-4 border-blue-600 pl-6 py-2">
            {post.excerpt}
          </p>
          
          <h2 className="text-3xl font-bold text-slate-900 mt-12">The State of Bag Wholesale in Delhi</h2>
          <p>
            Delhi has long been the epicenter of wholesale trade in India, and when it comes to bags and luggage, the Nabi Karim area in Paharganj stands unrivaled. For decades, retailers from every corner of the country—from the bustling streets of Mumbai to the remote towns of Assam—have looked towards this market for their inventory.
          </p>

          <h3 className="text-2xl font-bold text-slate-900">Why Nabi Karim is the King of Bag Markets</h3>
          <p>
            While Sadar Bazar is famous for general merchandise, Nabi Karim is specialized. This specialization means you get a depth of variety that is impossible to find elsewhere. Whether you are looking for high-end polycarbonate trolley bags or budget-friendly school backpacks, the range here is staggering.
          </p>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 my-12">
            <h4 className="text-xl font-bold text-slate-900 mb-4">Key Advantages for Retailers:</h4>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Direct Factory Access:</strong> Most wholesalers here either have their own manufacturing units or direct tie-ups with factories in Bawana and Narela.</li>
              <li><strong>Logistics Hub:</strong> Being near New Delhi Railway Station, transport to any part of India is seamless and cost-effective.</li>
              <li><strong>Trend Setting:</strong> New designs hit the shelves of Nabi Karim months before they reach other regional markets.</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-slate-900">How to Source Effectively</h2>
          <p>
            Sourcing effectively requires more than just showing up. It requires building relationships. At Nabi Karim Bag Market, we pride ourselves on being more than just suppliers; we are partners in our clients' growth.
          </p>
          <p>
            When buying in bulk, always check for:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Stitching quality and thread strength.</li>
            <li>Zipper durability (look for YKK or high-quality local alternatives).</li>
            <li>Wheel smoothness in trolley bags.</li>
            <li>Padding thickness in laptop and school bags.</li>
          </ol>

          <h2 className="text-3xl font-bold text-slate-900">Conclusion</h2>
          <p>
            The bag business in India is booming, driven by increased travel and a growing student population. By sourcing from the right wholesale partner in Delhi, you can ensure your retail business stays ahead of the competition with the best products and margins.
          </p>
        </div>

        {/* Share & CTA */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Share this guide:</span>
            <Button variant="outline" size="icon" className="rounded-full"><Share2 className="w-4 h-4" /></Button>
            <Button variant="outline" size="icon" className="rounded-full"><MessageSquare className="w-4 h-4" /></Button>
          </div>
          <Link to="/inquiry">
            <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8">Get Wholesale Price List</Button>
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">More Business Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3).map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="h-40 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${p.slug}/600/400`} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">{p.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
