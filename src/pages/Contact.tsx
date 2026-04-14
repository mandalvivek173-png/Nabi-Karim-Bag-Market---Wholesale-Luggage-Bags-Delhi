import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { SEO } from '@/lib/seo';
import { BUSINESS_DETAILS } from '@/data/content';

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

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const path = 'contacts';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
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
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Message Sent!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for contacting us. We have received your message and will get back to you shortly.
          </p>
          <Button 
            onClick={() => setIsSuccess(false)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Send Another Message
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Contact Us | Nabi Karim Bag Market Paharganj"
        description="Visit our store in Paharganj, Delhi or contact us for wholesale bag inquiries. Phone: 08595551669. Pan India delivery available."
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

      <section className="bg-slate-900 text-white pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Have questions about our products or wholesale process? We're here to help.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <Card className="border-none shadow-lg">
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4 text-blue-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Visit Our Store</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {BUSINESS_DETAILS.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-xl mr-4 text-green-600">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                      <p className="text-slate-600 text-sm">{BUSINESS_DETAILS.phone}</p>
                      <p className="text-slate-400 text-xs mt-1">Available 10 AM - 8 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-xl mr-4 text-purple-600">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                      <p className="text-slate-600 text-sm">{BUSINESS_DETAILS.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-100 p-3 rounded-xl mr-4 text-orange-600">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Business Hours</h3>
                      <p className="text-slate-600 text-sm">{BUSINESS_DETAILS.openingHours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Suggestion */}
              <div className="bg-slate-200 rounded-2xl h-64 flex items-center justify-center text-slate-500 overflow-hidden relative">
                <img 
                  src="https://picsum.photos/seed/delhi-map/600/400" 
                  alt="Map Location" 
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <MapPin className="w-10 h-10 text-red-500 mb-2" />
                  <p className="font-bold text-slate-900">Nabi Karim Bag Market</p>
                  <p className="text-xs text-slate-700 mt-1">Click to open in Google Maps</p>
                  <a 
                    href="https://maps.google.com/?q=Nabi+Karim+Bag+Market+Paharganj" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-block"
                  >
                    <Button size="sm" className="bg-blue-600">Get Directions</Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-lg h-full">
                <CardContent className="p-8 sm:p-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                        <Input 
                          placeholder="Enter your name" 
                          required 
                          className="h-12 border-slate-200"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                        <Input 
                          placeholder="Enter 10-digit mobile number" 
                          required 
                          className="h-12 border-slate-200"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Email Address</label>
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        required 
                        className="h-12 border-slate-200"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Subject</label>
                      <Input 
                        placeholder="What are you looking for?" 
                        className="h-12 border-slate-200"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Message</label>
                      <Textarea 
                        placeholder="Tell us about your requirements..." 
                        className="min-h-[150px] border-slate-200" 
                        required 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 h-14 text-lg"
                    >
                      {isSubmitting ? (
                        <>Sending... <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                      ) : (
                        <>Send Message <Send className="ml-2 w-5 h-5" /></>
                      )}
                    </Button>
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

export default Contact;
