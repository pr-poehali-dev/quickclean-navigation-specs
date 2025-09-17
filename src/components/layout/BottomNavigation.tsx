import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface BottomNavItem {
  name: string;
  href: string;
  icon: string;
  badge?: number;
}

interface BottomNavigationProps {
  userRole?: 'client' | 'cleaner' | 'admin';
  notifications?: number;
}

const BottomNavigation = ({ userRole = 'client', notifications = 0 }: BottomNavigationProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navigationByRole: Record<string, BottomNavItem[]> = {
    client: [
      { name: 'Главная', href: '/', icon: 'Home' },
      { name: 'Услуги', href: '/services', icon: 'Sparkles' },
      { name: 'Заказы', href: '/orders', icon: 'ClipboardList' },
      { name: 'Уведомления', href: '/notifications', icon: 'Bell', badge: notifications },
      { name: 'Профиль', href: '/profile', icon: 'User' }
    ],
    cleaner: [
      { name: 'Dashboard', href: '/cleaner/dashboard', icon: 'LayoutDashboard' },
      { name: 'Заказы', href: '/cleaner/orders', icon: 'ClipboardCheck' },
      { name: 'Расписание', href: '/cleaner/schedule', icon: 'Calendar' },
      { name: 'Уведомления', href: '/notifications', icon: 'Bell', badge: notifications },
      { name: 'Заработок', href: '/cleaner/earnings', icon: 'Wallet' }
    ],
    admin: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
      { name: 'Заказы', href: '/admin/orders', icon: 'ClipboardList' },
      { name: 'Аналитика', href: '/admin/analytics', icon: 'BarChart3' },
      { name: 'Уведомления', href: '/notifications', icon: 'Bell', badge: notifications },
      { name: 'Настройки', href: '/admin/settings', icon: 'Settings' }
    ]
  };

  const navItems = navigationByRole[userRole] || navigationByRole.client;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex flex-col items-center justify-center space-y-1 px-2 py-1 rounded-lg transition-colors min-w-0 flex-1 ${
              isActive(item.href)
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <div className="relative">
              <Icon 
                name={item.icon as any} 
                size={20} 
                className={isActive(item.href) ? 'text-primary' : undefined}
              />
              {item.badge && item.badge > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  {item.badge > 9 ? '9+' : item.badge}
                </Badge>
              )}
            </div>
            <span className={`text-xs font-medium truncate ${
              isActive(item.href) ? 'text-primary' : undefined
            }`}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;