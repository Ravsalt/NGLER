import { useState } from 'react';
import './App.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { Input } from './components/ui/input'
import { useNumberInput } from './hooks/useNumberInput'
import { User, MessageSquare, Hash, Send, Loader2 } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { toast } from 'sonner';
import { Analytics } from "@vercel/analytics/react"
import { Modal } from './components/ui/modal';

interface FormData {
  username: string;
  question: string;
  requests: string;
}

interface FormErrors {
  username?: string;
  question?: string;
  requests?: string;
}

interface ModalContent {
  title: string;
  body: React.ReactNode;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    question: '',
    requests: '1'
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({ title: '', body: null });

  const { showWarning, inputProps } = useNumberInput({
    value: formData.requests,
    onChange: (value) => setFormData(prev => ({ ...prev, requests: value })),
    min: 1,
    max: 100
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.question.trim()) {
      newErrors.question = 'Message is required';
    }
    if (!formData.requests) {
      newErrors.requests = 'Number of messages is required';
    } else if (showWarning) {
      newErrors.requests = 'Please enter a valid number of messages (1-100)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please correct the errors before submitting');
      return;
    }

    const payload = {
      username: formData.username.trim(),
      question: formData.question.trim(),
      requests: parseInt(formData.requests, 10)
    };

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! Status: ${response.status}`
        );
      }

      const responseData = await response.json();
      
      if (responseData.success) {
        toast.success(`Successfully sent ${payload.requests} message(s) to ${payload.username}`);
        setFormData({
          username: '',
          question: '',
          requests: '1'
        });
      } else {
        throw new Error(responseData.message || 'Failed to send messages');
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send messages. Please try again.';
      if (errorMessage === 'User not found') {
        setModalContent({
          title: 'User Not Found',
          body: (
            <p>The user "{payload.username}" could not be found on NGL. Please check the username and try again.</p>
          )
        });
        setIsModalOpen(true);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Analytics/>
      <Navbar />
      <div className="flex h-screen items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-[600px]">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className='text-4xl text-center'>NGLER</CardTitle>
              <CardDescription className='text-center'>
                Send multiple messages to any NGL user.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Target Username" 
                  className={`pl-10 ${errors.username ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Textarea 
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="Enter your message here..." 
                  className={`pl-10 min-h-[100px] ${errors.question ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question}</p>}
              </div>
              <div className="flex gap-4">
                <div className="w-1/2 relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    name="requests"
                    type="text"
                    placeholder="Number of Messages"
                    className={`w-full pl-10 ${errors.requests ? 'border-red-500' : ''}`}
                    max={100}
                    min={1}
                    disabled={isSubmitting}
                    {...inputProps}
                    aria-invalid={showWarning}
                  />
                  {errors.requests && <p className="text-red-500 text-xs mt-1">{errors.requests}</p>}
                </div>
                <Button 
                  type="submit"
                  variant="destructive" 
                  className="w-1/2 hover:scale-105 transition-transform select-none"
                  disabled={isSubmitting || showWarning}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5 mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Messages'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalContent.title}>
        {modalContent.body}
      </Modal>
      <div id="toast" />
    </>  
  )
}

export default App