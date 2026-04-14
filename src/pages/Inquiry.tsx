import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Send, Phone, Loader2, ArrowLeft } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { SEO } from '@/lib/seo';
import { BUSINESS_DETAILS, PRODUCT_CATEGORIES } from '@/data/content';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const Inquiry: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

    const path = 'inquiries';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        categories: selectedCategories,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      setIsSuccess(true);
      setFormData({
        businessName: '',
        name: '',
        phone: '',
        city: '',
        requirement: 'Less than 100 bags',
        message: '',
      });
      setSelectedCategories([]);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
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
          <Button 
            onClick={() => setIsSuccess(false)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Submit Another Inquiry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Wholesale Inquiry | Get Bulk Bag Rates Delhi"
        description="Looking for bulk bags? Fill out our wholesale inquiry form to get the latest price list and catalog for trolley, school, and laptop bags."
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

      <section className="py-20 bg-blue-600 text-white pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Wholesale Inquiry Form</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Get exclusive bulk pricing and customized solutions for your business.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Benefits */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-bold text-slate-900">Why Partner With Us?</h2>
              <div className="space-y-6">
                {[
                  "Factory Direct Pricing (No Middlemen)",
                  "Custom Branding & Logo Printing",
                  "Pan India Logistics Support",
                  "Flexible Payment Terms for Regular Clients",
                  "Latest Designs & Trendy Collections",
                  "Dedicated Account Manager"
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center text-slate-700">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 shrink-0" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Card className="bg-slate-900 text-white border-none p-8 mt-12">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 p-3 rounded-full mr-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Direct Wholesale Line</p>
                    <p className="text-xl font-bold">{BUSINESS_DETAILS.phone}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 italic">
                  "Our goal is to help your retail business grow by providing the best quality bags at prices that beat any market in India."
                </p>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <Card className="border-none shadow-2xl">
                <CardContent className="p-8 sm:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Business Name</label>
                        <Input 
                          placeholder="Your Shop/Company Name" 
                          required 
                          className="h-12 border-slate-200"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Contact Person</label>
                        <Input 
                          placeholder="Your Full Name" 
                          required 
                          className="h-12 border-slate-200"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Phone Number (WhatsApp)</label>
                        <Input 
                          placeholder="10-digit mobile number" 
                          required 
                          className="h-12 border-slate-200"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">City / State</label>
                        <Input 
                          placeholder="e.g. Jaipur, Rajasthan" 
                          required 
                          className="h-12 border-slate-200"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Interested Categories</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <div key={cat.id} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              id={cat.id} 
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              checked={selectedCategories.includes(cat.id)}
                              onChange={() => handleCategoryChange(cat.id)}
                            />
                            <label htmlFor={cat.id} className="text-sm text-slate-600">{cat.title}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Estimated Monthly Requirement</label>
                      <select 
                        className="w-full h-12 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.requirement}
                        onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                      >
                        <option>Less than 100 bags</option>
                        <option>100 - 500 bags</option>
                        <option>500 - 1000 bags</option>
                        <option>More than 1000 bags</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Additional Requirements</label>
                      <Textarea 
                        placeholder="Any specific brands, sizes, or customization needs?" 
                        className="min-h-[120px] border-slate-200"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-bold"
                    >
                      {isSubmitting ? (
                        <>Processing... <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                      ) : (
                        <>Request Wholesale Price List <Send className="ml-2 w-5 h-5" /></>
                      )}
                    </Button>

                    <p className="text-center text-xs text-slate-400">
                      By submitting, you agree to receive wholesale updates on WhatsApp.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inquiry;
