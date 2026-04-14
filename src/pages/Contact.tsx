import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Loader2, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contacts'), { ...formData, createdAt: serverTimestamp(), status: 'new' });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) return <div className="text-center p-20"><CheckCircle2 className="mx-auto w-16 h-16 text-green-500" /><h2>Message Sent!</h2></div>;

  return (
    <div className="max-w-2xl mx-auto p-10">
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Name" required onChange={e => setFormData({...formData, name: e.target.value})} />
          <Input placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} />
          <Input placeholder="Phone" required onChange={e => setFormData({...formData, phone: e.target.value})} />
          <Input placeholder="Subject" required onChange={e => setFormData({...formData, subject: e.target.value})} />
          <Textarea placeholder="Message" required onChange={e => setFormData({...formData, message: e.target.value})} />
          <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Send Message"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Contact;