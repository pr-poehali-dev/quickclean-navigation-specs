import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock user data - replace with actual auth state
  const user = {
    name: 'Анна Иванова',
    email: 'anna@example.com',
    avatar: '',
    role: 'client', // client | cleaner | admin
    notifications: 3
  };

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: 'Услуги', href: '/services', icon: 'Sparkles' },
    { name: 'Как работает', href: '/how-it-works', icon: 'HelpCircle' },
    { name: 'О нас', href: '/about', icon: 'Info' },
    { name: 'Контакты', href: '/contacts', icon: 'Phone' }
  ];

  const roleBasedNavigation = {
    client: [
      { name: 'Заказы', href: '/orders', icon: 'ClipboardList' },
      { name: 'Профиль', href: '/profile', icon: 'User' }
    ],
    cleaner: [
      { name: 'Dashboard', href: '/cleaner/dashboard', icon: 'LayoutDashboard' },
      { name: 'Расписание', href: '/cleaner/schedule', icon: 'Calendar' },
      { name: 'Заработок', href: '/cleaner/earnings', icon: 'Wallet' }
    ],
    admin: [
      { name: 'Админ панель', href: '/admin/dashboard', icon: 'Settings' },
      { name: 'Аналитика', href: '/admin/analytics', icon: 'BarChart3' }
    ]
  };

  const MobileMenu = () => (
    <div className="flex flex-col space-y-4 p-4">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
            isActive(item.href)
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent hover:text-accent-foreground'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Icon name={item.icon as any} size={20} />
          <span>{item.name}</span>
        </Link>
      ))}
      
      {user && (
        <>
          <div className="border-t border-border my-4" />
          {roleBasedNavigation[user.role as keyof typeof roleBasedNavigation]?.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Icon name={item.icon as any} size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={20} className="text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">QuickClean</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          {user && (
            <Link to="/notifications" className="relative">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
                {user.notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                  >
                    {user.notifications}
                  </Badge>
                )}
              </Button>
            </Link>
          )}

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                
                {/* Role-based menu items */}
                {roleBasedNavigation[user.role as keyof typeof roleBasedNavigation]?.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.href} className="flex items-center space-x-2">
                      <Icon name={item.icon as any} size={16} />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile/settings" className="flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Настройки</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 text-destructive">
                  <Icon name="LogOut" size={16} />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/auth/login">Войти</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/register">Регистрация</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Icon name="Menu" size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-2 pb-4 border-b">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Sparkles" size={20} className="text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold">QuickClean</span>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <MobileMenu />
                </div>
                
                {!user && (
                  <div className="border-t pt-4 space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/auth/login">Войти</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link to="/auth/register">Регистрация</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;