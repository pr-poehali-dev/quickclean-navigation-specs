import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: 'Компания',
      links: [
        { name: 'О нас', href: '/about' },
        { name: 'Карьера', href: '/careers' },
        { name: 'Пресса', href: '/press' },
        { name: 'Партнерство', href: '/partnership' }
      ]
    },
    services: {
      title: 'Услуги',
      links: [
        { name: 'Генеральная уборка', href: '/services/general-cleaning' },
        { name: 'Регулярная уборка', href: '/services/regular-cleaning' },
        { name: 'После ремонта', href: '/services/post-renovation' },
        { name: 'Мойка окон', href: '/services/window-cleaning' }
      ]
    },
    support: {
      title: 'Поддержка',
      links: [
        { name: 'Центр помощи', href: '/help' },
        { name: 'Как это работает', href: '/how-it-works' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Контакты', href: '/contacts' }
      ]
    },
    legal: {
      title: 'Правовая информация',
      links: [
        { name: 'Пользовательское соглашение', href: '/terms' },
        { name: 'Политика конфиденциальности', href: '/privacy' },
        { name: 'Политика возврата', href: '/refund-policy' },
        { name: 'Условия клинеров', href: '/cleaner-terms' }
      ]
    }
  };

  const socialLinks = [
    { name: 'Telegram', href: 'https://t.me/quickclean', icon: 'MessageCircle' },
    { name: 'WhatsApp', href: 'https://wa.me/79991234567', icon: 'Phone' },
    { name: 'Instagram', href: 'https://instagram.com/quickclean', icon: 'Instagram' },
    { name: 'VK', href: 'https://vk.com/quickclean', icon: 'MessageSquare' }
  ];

  const contactInfo = {
    phone: '+7 (999) 123-45-67',
    email: 'hello@quickclean.ru',
    address: 'Москва, ул. Примерная, д. 123'
  };

  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">QuickClean</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Профессиональная уборка домов и квартир в Москве. Быстро, качественно, недорого.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-primary transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">{contactInfo.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                  <a 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <Icon name={social.icon as any} size={18} />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} QuickClean. Все права защищены.
          </div>
          
          {/* Additional Info */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <span>ИП Иванов И.И.</span>
            <span>ИНН: 123456789012</span>
            <span>ОГРНИП: 123456789012345</span>
          </div>
        </div>

        {/* Mobile App Promotion */}
        <div className="mt-8 p-4 bg-accent/50 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h4 className="font-semibold mb-1">Скачайте мобильное приложение</h4>
              <p className="text-sm text-muted-foreground">
                Заказывайте уборку еще быстрее с мобильного приложения
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" asChild>
                <a href="#" className="flex items-center space-x-2">
                  <Icon name="Smartphone" size={16} />
                  <span>App Store</span>
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="#" className="flex items-center space-x-2">
                  <Icon name="Smartphone" size={16} />
                  <span>Google Play</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;