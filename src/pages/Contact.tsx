import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Navbar } from '../components/layout/Navbar';
import { Github, Mail, Facebook, Instagram } from 'lucide-react';

function Contact() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center pb-32">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className='text-4xl text-center font-bold'>Contact Me</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 select-none">
            <img 
              src="https://github.com/ravsalt.png" 
              alt="Raven's profile" 
              className="w-40 h-40 rounded-full select-none" 
              loading="lazy" 
              draggable="false"
            />
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-bold">Raven</h2>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/ravsalt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 select-none"
                  draggable="false"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-8 w-8" />
                </a>
                <a 
                  href="mailto:ravsalt@gmail.com" 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 select-none"
                  draggable="false"
                  aria-label="Send Email"
                >
                  <Mail className="h-8 w-8" />
                </a>
                <a 
                  href="https://www.facebook.com/duero.10" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 select-none"
                  draggable="false"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="h-8 w-8" />
                </a>
                <a 
                  href="https://www.instagram.com/ravdevv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 select-none"
                  draggable="false"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="h-8 w-8" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Contact;