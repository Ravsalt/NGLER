import './App.css'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { Input } from './components/ui/input'
import { useNumberInput } from './hooks/useNumberInput'
import { User, MessageSquare, Hash, Send } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';

function App() {
  const { showWarning, inputProps } = useNumberInput();

  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center pb-32">
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle className='text-4xl text-center'>Ngler</CardTitle>
            <CardDescription className='text-center'>
              A powerful tool for spamming NGL users with messages.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Target Username" className="pl-10" />
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Textarea placeholder="Enter your message here..." className="pl-10" />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2 relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Number of Messages"
                  className="w-full pl-10"
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
              <Button variant="destructive" className="w-1/2 hover:scale-105 transition-transform">
                <Send className="h-5 w-5 mr-2" />
                Destroy
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-500">
            <p>
              <strong>Disclaimer:</strong> This tool is for <strong>Testing purposes only</strong>. 
              Please don't abuse it.
              <br />
              I'm not responsible for any damage caused by this tool.
            </p>
          </CardFooter>
        </Card>
      </div>
      
    </>
  )
}

export default App