import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNavigation from './BottomNavigation';
import Breadcrumbs from '@/components/ui/breadcrumbs';

interface LayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
  showBottomNav?: boolean;
  userRole?: 'client' | 'cleaner' | 'admin';
  notifications?: number;
  className?: string;
}

const Layout = ({ 
  children, 
  showBreadcrumbs = true, 
  showBottomNav = true,
  userRole = 'client',
  notifications = 0,
  className = ''
}: LayoutProps) => {
  const location = useLocation();

  // Don't show navigation on auth pages
  const isAuthPage = location.pathname.startsWith('/auth');
  
  // Don't show breadcrumbs on homepage
  const shouldShowBreadcrumbs = showBreadcrumbs && location.pathname !== '/' && !isAuthPage;
  
  // Don't show bottom navigation on desktop or auth pages
  const shouldShowBottomNav = showBottomNav && !isAuthPage;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {!isAuthPage && <Header />}
      
      {/* Main Content Area */}
      <main className={`flex-1 ${shouldShowBottomNav ? 'pb-16 md:pb-0' : ''} ${className}`}>
        {/* Breadcrumbs */}
        {shouldShowBreadcrumbs && (
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container py-3">
              <Breadcrumbs />
            </div>
          </div>
        )}
        
        {/* Page Content */}
        {children}
      </main>
      
      {/* Footer */}
      {!isAuthPage && <Footer />}
      
      {/* Bottom Navigation (Mobile Only) */}
      {shouldShowBottomNav && (
        <BottomNavigation userRole={userRole} notifications={notifications} />
      )}
    </div>
  );
};

export default Layout;