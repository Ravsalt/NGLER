import { useState, useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationMenuLink, NavigationMenuList, NavigationMenuItem, NavigationMenu } from "../ui/navigation-menu"
import { navigationMenuTriggerStyle } from "../ui/navigation-menu-styles"
import { Button } from '../ui/button';
import { Moon, Sun, Home, Info, Mail, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Navbar = memo(() => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') !== 'light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navLinks = [
    { href: '/', text: 'Home', icon: <Home className="h-5 w-5" /> },
    { href: '/about', text: 'About', icon: <Info className="h-5 w-5" /> },
    { href: '/contact', text: 'Contact', icon: <Mail className="h-5 w-5" /> },
  ];

  return (
    <div className="flex justify-between items-center py-4 px-8">
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  href={link.href}
                  draggable="false"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "transition-transform hover:scale-105 hover:shadow-lg select-none",
                    location.pathname === link.href && "bg-muted"
                  )}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="md:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background z-50">
            <NavigationMenu>
              <NavigationMenuList className="flex-col items-start p-4 gap-2">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      href={link.href}
                      draggable="false"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start",
                        location.pathname === link.href && "bg-muted"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.text}</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>

      <Button 
        onClick={() => setIsDarkMode(!isDarkMode)} 
        variant="outline" 
        size="icon" 
        draggable="false"
        className="transition-transform hover:scale-110 hover:shadow-lg select-none"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </div>
  );
});
