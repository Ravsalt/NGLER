import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center pb-32">
        <Card className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex flex-col justify-center">
              <CardHeader>
                <CardTitle className='text-4xl font-bold'>About Ngler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  Tired of NGL links flooding your social media? So was I.
                </p>
                <p className="text-lg mt-4">
                  That's why I created Ngler, a tool to playfully spam NGL users and reclaim your feed.
                </p>
                <p className="text-lg mt-4">
                  Have questions or ideas for new features? I'd love to hear from you!
                </p>
                <Link to="/contact" draggable="false" className="select-none">
                  <Button 
                    className="mt-6 select-none" 
                    draggable="false"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </CardContent>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="https://github.com/ravsalt.png" 
                alt="ravsalt pfp" 
                className="w-64 h-64 rounded-full select-none" 
                loading="lazy" 
                draggable="false"
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default About;