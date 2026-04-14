import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Send, Phone, Loader2, ArrowLeft } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { SEO } from '@/lib/seo';
import { BUSINESS_DETAILS, PRODUCT_CATEGORIES } from '@/data/content';

const Inquiry: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    phone: '',
    city: '',
    requirement: 'Less than 100 bags',
    message: '',
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategories(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        categories: selectedCategories,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      setIsSuccess(true);
    } catch (error: any) {
      console.error('Submission error:', error);
      setSubmitError(`Submission failed: ${error.message || 'Unknown error'}. Please check your internet and Firebase rules.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center p-8 border-none shadow-2xl">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Inquiry Received!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for reaching out. Our wholesale manager will contact you on WhatsApp or call within 24 hours.
          </p>
          <Button onClick={() => setIsSuccess(false)} className="w-full bg-blue-600 hover:bg-blue-700">
            Submit Another Inquiry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO title="Wholesale Inquiry | Get Bulk Bag Rates Delhi" description="Looking for bulk bags? Fill out our wholesale inquiry form to get the latest price list and catalog." />
      <div className="bg-slate-900 pt-6 px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-300 hover:text-white transition-colors font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
      </div>
      <section className="py-20 bg-blue-600 text-white pt-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">Wholesale Inquiry Form</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">Get exclusive bulk pricing and customized solutions.</p>
      </section>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Why Partner With Us?</h2>
            <div className="space-y-6">
              {["Factory Direct Pricing", "Custom Branding", "Pan India Logistics", "Latest Designs"].map((benefit) => (
                <div key={benefit} className="flex items-center text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <Card className="border-none shadow-2xl p-8 sm:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input placeholder="Shop Name" required value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
                  <Input placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input placeholder="Phone (WhatsApp)" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  <Input placeholder="City" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Categories</label>
                  <div className="grid grid-cols-2 gap-3">
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <div key={cat.id} className="flex items-center space-x-2">
                        <input type="checkbox" id={cat.id} checked={selectedCategories.includes(cat.id)} onChange={() => handleCategoryChange(cat.id)} />
                        <label htmlFor={cat.id} className="text-sm text-slate-600">{cat.title}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <Textarea placeholder="Additional Requirements" className="min-h-[120px]" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                {submitError && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{submitError}</div>}
                <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white h-14 text-lg font-bold">
                  {isSubmitting ? <>Processing... <Loader2 className="ml-2 w-5 h-5 animate-spin" /></> : <>Request Price List <Send className="ml-2 w-5 h-5" /></>}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inquiry;