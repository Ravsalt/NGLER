import { useState } from 'react';
import './App.css'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { Input } from './components/ui/input'
import { useNumberInput } from './hooks/useNumberInput'
import { User, MessageSquare, Hash, Send, Loader2 } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { toast } from 'sonner';
import { Analytics } from "@vercel/analytics/react"

interface FormData {
  username: string;
  question: string;
  requests: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    question: '',
    requests: '1'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username.trim() || !formData.question.trim() || !formData.requests) {
      toast.error('Please fill in all fields');
      return;
    }

    if (showWarning) {
      toast.error('Please enter a valid number of messages');
      return;
    }

    const payload = {
      username: formData.username.trim(),
      question: formData.question.trim(),
      requests: parseInt(formData.requests, 10)
    };

    try {
      setIsSubmitting(true);
      // Using relative URL which will be proxied by Vite
      const response = await fetch('https://ngler-api.vercel.app/api/submit', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const responseData = await response.json();
      
      if (responseData.success) {
        toast.success(`Successfully sent ${payload.requests} message(s) to ${payload.username}`);
      } else {
        throw new Error(responseData.message || 'Failed to send messages');
      }
      
      // Reset form
      setFormData({
        username: '',
        question: '',
        requests: '1'
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send messages. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>

      <Analytics/>
      <Navbar />
      <div className="flex h-screen items-center justify-center pb-32">
        <form onSubmit={handleSubmit} className="w-full max-w-[600px] px-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className='text-4xl text-center'>Ngler</CardTitle>
              <CardDescription className='text-center'>
                A powerful tool for spamming NGL users with messages.
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
                  className="pl-10" 
                  disabled={isSubmitting}
                />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Textarea 
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="Enter your message here..." 
                  className="pl-10 min-h-[100px]"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2 relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    name="requests"
                    type="text"
                    placeholder="Number of Messages"
                    className="w-full pl-10"
                    max={100}
                    min={1}
                    disabled={isSubmitting}
                    {...inputProps}
                    aria-invalid={showWarning}
                  />
                  {showWarning && (
                    <p className={`text-red-500 text-xs mt-1 flex items-center ${showWarning ? 'shake' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 13a1 1 0 112 0v-4a1 1 0 11-2 0v4zm2-8a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
                      </svg>
                      Only numbers are allowed.
                    </p>
                  )}
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
                  {isSubmitting ? 'Sending...' : 'Destroy'}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => setFormData({ username: '', question: '', requests: '1' })}
                disabled={isSubmitting}
              >
                Reset
              </Button>
              <div className="text-sm text-muted-foreground">
                <p>
                  Click 'Destroy' to start sending messages</p>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
      <div id="toast" />
    </>  
  )
}

export default App