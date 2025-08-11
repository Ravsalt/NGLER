import { useState, useEffect, memo } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { Button } from '../ui/button';
import { Moon, Sun, Home, Info, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Navbar = memo(() => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="flex justify-between items-center py-4 px-8">
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink 
              href="/" 
              draggable="false"
              className={cn(navigationMenuTriggerStyle(), "transition-transform hover:scale-105 hover:shadow-lg select-none")}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink 
              href="/about" 
              draggable="false"
              className={cn(navigationMenuTriggerStyle(), "transition-transform hover:scale-105 hover:shadow-lg select-none")}
            >
              <Info className="h-5 w-5" />
              <span>About</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink 
              href="/contact" 
              draggable="false"
              className={cn(navigationMenuTriggerStyle(), "transition-transform hover:scale-105 hover:shadow-lg select-none")}
            >
              <Mail className="h-5 w-5" />
              <span>Contact</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
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
