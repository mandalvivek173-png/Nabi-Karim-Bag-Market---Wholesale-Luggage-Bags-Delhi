import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Send, Phone, Loader2, ArrowLeft } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Yahan maine @ hata kar .. lagaya hai
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { SEO } from '../lib/seo';
import { BUSINESS_DETAILS, PRODUCT_CATEGORIES } from '../data/content';

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
      console.error('Error:', error);
      setSubmitError(`Failed: ${error.message}`);
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
          <p className="text-slate-600 mb-8">We will contact you soon.</p>
          <Button onClick={() => setIsSuccess(false)} className="w-full bg-blue-600 hover:bg-blue-700">Submit Another</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO title="Wholesale Inquiry" description="Get bulk bag rates." />
      <div className="bg-slate-900 p-4"><button onClick={() => navigate(-1)} className="text-white flex items-center"><ArrowLeft className="mr-2"/> Back</button></div>
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Shop Name" required value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
            <Input placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <Input placeholder="Phone" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <Input placeholder="City" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
            <Textarea placeholder="Message" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
            {submitError && <p className="text-red-500">{submitError}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white h-12">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Inquiry"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Inquiry;