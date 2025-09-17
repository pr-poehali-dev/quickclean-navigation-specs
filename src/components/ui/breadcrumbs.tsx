import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Главная',
  '/services': 'Услуги',
  '/orders': 'Заказы',
  '/profile': 'Профиль',
  '/profile/settings': 'Настройки',
  '/notifications': 'Уведомления',
  '/cleaner/dashboard': 'Dashboard',
  '/cleaner/schedule': 'Расписание',
  '/cleaner/earnings': 'Заработок',
  '/admin/dashboard': 'Админ панель',
  '/admin/analytics': 'Аналитика',
  '/about': 'О нас',
  '/contacts': 'Контакты',
  '/how-it-works': 'Как работает',
  '/help': 'Помощь',
  '/faq': 'FAQ'
};

const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', href: '/', icon: 'Home' }
  ];

  let currentPath = '';
  
  for (const path of paths) {
    currentPath += `/${path}`;
    
    // Handle dynamic routes
    if (path.match(/^[A-Z0-9-]+$/i) && paths.length > 1) {
      // This looks like an ID, use parent route label + "Детали"
      const parentPath = currentPath.split('/').slice(0, -1).join('/');
      const parentLabel = routeLabels[parentPath] || 'Страница';
      breadcrumbs.push({
        label: `${parentLabel} - Детали`,
        href: currentPath
      });
    } else {
      const label = routeLabels[currentPath] || path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbs.push({
        label,
        href: currentPath
      });
    }
  }

  return breadcrumbs;
};

const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => {
  const location = useLocation();
  const breadcrumbItems = items || generateBreadcrumbs(location.pathname);

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-1">
            {index > 0 && (
              <Icon name="ChevronRight" size={16} className="text-muted-foreground/50" />
            )}
            
            {item.href && index < breadcrumbItems.length - 1 ? (
              <Link
                to={item.href}
                className="flex items-center space-x-1 hover:text-foreground transition-colors"
              >
                {item.icon && index === 0 && (
                  <Icon name={item.icon as any} size={16} />
                )}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className="flex items-center space-x-1 text-foreground font-medium">
                {item.icon && index === 0 && (
                  <Icon name={item.icon as any} size={16} />
                )}
                <span>{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;