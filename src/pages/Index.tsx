import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function Index() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const services = [
    {
      id: 'home',
      title: 'Домашняя уборка',
      description: 'Стандартная, генеральная, после ремонта',
      price: 'от 1,500 ₽',
      icon: 'Home',
      features: ['Влажная уборка', 'Пылесос', 'Мытье полов', 'Уборка ванной']
    },
    {
      id: 'office',
      title: 'Офисная уборка',
      description: 'Ежедневная, генеральная, поддерживающая',
      price: 'от 2,000 ₽',
      icon: 'Building',
      features: ['Уборка рабочих мест', 'Мойка окон', 'Дезинфекция', 'Вынос мусора']
    },
    {
      id: 'car',
      title: 'Детейлинг авто',
      description: 'Мойка, химчистка, полировка',
      price: 'от 3,000 ₽',
      icon: 'Car',
      features: ['Внешняя мойка', 'Химчистка салона', 'Полировка', 'Защитное покрытие']
    }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const testimonials = [
    {
      name: 'Анна Петрова',
      company: 'ООО "Технологии"',
      text: 'Отличный сервис! Клинеры всегда приходят вовремя, работают качественно.',
      rating: 5
    },
    {
      name: 'Михаил Сидоров',
      company: 'Частный клиент',
      text: 'Пользуюсь услугами уже год. Всё всегда на высшем уровне.',
      rating: 5
    },
    {
      name: 'Ольга Иванова',
      company: 'Бизнес-центр "Премиум"',
      text: 'Профессиональный подход, современное оборудование, честные цены.',
      rating: 5
    }
  ];

  const faqItems = [
    {
      question: 'Как происходит оплата услуг?',
      answer: 'Оплата производится безналичным расчетом по договору. Мы работаем с НДС и предоставляем все необходимые документы.'
    },
    {
      question: 'Можно ли заказать уборку на выходные?',
      answer: 'Да, мы работаем 7 дней в неделю. Стоимость услуг в выходные дни остается неизменной.'
    },
    {
      question: 'Есть ли гарантия на выполненные работы?',
      answer: 'Мы предоставляем гарантию качества. Если вы не удовлетворены результатом, мы бесплатно переделаем работу.'
    },
    {
      question: 'Предоставляете ли вы расходные материалы?',
      answer: 'Да, все необходимые моющие средства и расходные материалы включены в стоимость услуги.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={32} className="text-primary" />
              <span className="text-2xl font-bold text-foreground">QuickClean</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-foreground hover:text-primary transition-colors">Услуги</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">О компании</a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Цены</a>
              <a href="#reviews" className="text-foreground hover:text-primary transition-colors">Отзывы</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
              <a href="#careers" className="text-foreground hover:text-primary transition-colors">Вакансии</a>
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/profile">
                <Button variant="outline">
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль
                </Button>
              </Link>
              <Link to="/orders">
                <Button variant="outline">
                  <Icon name="Package" size={16} className="mr-2" />
                  Заказы
                </Button>
              </Link>
              <Link to="/cleaner/dashboard">
                <Button variant="outline">
                  <Icon name="Briefcase" size={16} className="mr-2" />
                  Для клинеров
                </Button>
              </Link>
            </div>
            
            <Button variant="outline" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="business-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Профессиональная уборка для вашего бизнеса
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Качественные клининговые услуги с гарантией результата. 
                Работаем с юридическими лицами по договору.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Заказать уборку
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Получить консультацию
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-sm opacity-80">Довольных клиентов</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">4.9</div>
                  <div className="text-sm opacity-80">Рейтинг сервиса</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm opacity-80">Поддержка</div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="hero-shadow rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-semibold mb-6">Быстрое бронирование</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Тип услуги</Label>
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger className="bg-white/20 border-white/30 text-white">
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map(service => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-white">Дата</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30">
                            <Icon name="Calendar" size={16} className="mr-2" />
                            {selectedDate ? format(selectedDate, 'PPP', { locale: ru }) : 'Выберите дату'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            locale={ru}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label className="text-white">Время</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger className="bg-white/20 border-white/30 text-white">
                          <SelectValue placeholder="Выберите время" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map(time => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full bg-white text-primary hover:bg-gray-100">
                      Забронировать
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground">Полный спектр профессиональных клининговых услуг</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="service-card border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-lg">{service.description}</CardDescription>
                  <div className="text-2xl font-bold text-primary">{service.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Icon name="Check" size={16} className="text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">
                    Заказать услугу
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">О компании QuickClean</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Мы — ведущая клининговая компания с 10-летним опытом работы на рынке. 
                Специализируемся на обслуживании офисов, торговых центров, 
                медицинских учреждений и частных объектов.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Сертифицированы</h4>
                    <p className="text-sm text-muted-foreground">Все лицензии и сертификаты</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="Users" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Опытная команда</h4>
                    <p className="text-sm text-muted-foreground">Более 100 специалистов</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="Clock" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Работаем 24/7</h4>
                    <p className="text-sm text-muted-foreground">В любое удобное время</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="Award" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Гарантия качества</h4>
                    <p className="text-sm text-muted-foreground">100% гарантия результата</p>
                  </div>
                </div>
              </div>
              
              <Button size="lg">
                <Icon name="FileText" size={20} className="mr-2" />
                Скачать презентацию
              </Button>
            </div>
            
            <div className="lg:order-first">
              <div className="bg-gray-100 rounded-2xl p-8 text-center">
                <Icon name="Building2" size={120} className="mx-auto text-primary mb-4" />
                <p className="text-muted-foreground">
                  Современное оборудование и экологически чистые средства
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Прозрачные цены</h2>
            <p className="text-xl text-muted-foreground">Честное ценообразование без скрытых доплат</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Офисная уборка</CardTitle>
                <CardDescription>за м²/день</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">от 15 ₽</div>
                <ul className="space-y-2 text-sm">
                  <li>• Влажная уборка</li>
                  <li>• Вынос мусора</li>
                  <li>• Уборка санузлов</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Генеральная уборка</CardTitle>
                <CardDescription>за м²</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">от 50 ₽</div>
                <ul className="space-y-2 text-sm">
                  <li>• Полная дезинфекция</li>
                  <li>• Мойка окон</li>
                  <li>• Чистка мебели</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Уборка после ремонта</CardTitle>
                <CardDescription>за м²</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">от 80 ₽</div>
                <ul className="space-y-2 text-sm">
                  <li>• Удаление пыли</li>
                  <li>• Мойка всех поверхностей</li>
                  <li>• Финишная полировка</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Поддерживающая</CardTitle>
                <CardDescription>за м²/месяц</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">от 300 ₽</div>
                <ul className="space-y-2 text-sm">
                  <li>• Регулярная уборка</li>
                  <li>• Скидка до 20%</li>
                  <li>• Приоритетная поддержка</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Button size="lg">
              <Icon name="Calculator" size={20} className="mr-2" />
              Рассчитать стоимость
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground">Более 1000 довольных клиентов по всей России</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Средний рейтинг</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Рекомендуют нас</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Отзывов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
            <p className="text-xl text-muted-foreground">Ответы на популярные вопросы о наших услугах</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Контакты</h2>
            <p className="text-xl text-muted-foreground">Свяжитесь с нами любым удобным способом</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Icon name="Phone" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Телефон</h4>
                    <p className="text-lg">+7 (800) 123-45-67</p>
                    <p className="text-sm text-muted-foreground">Звонок по России бесплатный</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Icon name="Mail" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-lg">info@quickclean.ru</p>
                    <p className="text-sm text-muted-foreground">Ответим в течение часа</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Icon name="MapPin" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Адрес</h4>
                    <p className="text-lg">Москва, ул. Деловая, 1</p>
                    <p className="text-sm text-muted-foreground">БЦ "Премиум", офис 501</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Icon name="Clock" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Режим работы</h4>
                    <p className="text-lg">Пн-Вс: 24/7</p>
                    <p className="text-sm text-muted-foreground">Офис: Пн-Пт 9:00-18:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Оставьте заявку</CardTitle>
                <CardDescription>Мы свяжемся с вами в течение 15 минут</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 (___) ___-__-__" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="example@company.ru" />
                </div>
                
                <div>
                  <Label htmlFor="service">Услуга</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea id="message" placeholder="Расскажите о ваших потребностях..." />
                </div>
                
                <Button className="w-full">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить заявку
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Вакансии</h2>
            <p className="text-xl text-muted-foreground">Присоединяйтесь к нашей профессиональной команде</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Клинер-универсал
                  <Badge variant="secondary">Полная занятость</Badge>
                </CardTitle>
                <CardDescription>Москва и МО</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary mb-4">от 50,000 ₽</p>
                <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                  <li>• Опыт работы от 1 года</li>
                  <li>• Знание технологий уборки</li>
                  <li>• Ответственность и пунктуальность</li>
                </ul>
                <Button className="w-full">Откликнуться</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Менеджер по продажам
                  <Badge variant="secondary">Полная занятость</Badge>
                </CardTitle>
                <CardDescription>Москва</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary mb-4">от 80,000 ₽</p>
                <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                  <li>• Опыт продаж B2B</li>
                  <li>• Знание CRM систем</li>
                  <li>• Коммуникабельность</li>
                </ul>
                <Button className="w-full">Откликнуться</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Супервайзер
                  <Badge variant="secondary">Полная занятость</Badge>
                </CardTitle>
                <CardDescription>Москва</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary mb-4">от 70,000 ₽</p>
                <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                  <li>• Опыт руководства командой</li>
                  <li>• Знание стандартов качества</li>
                  <li>• Организаторские способности</li>
                </ul>
                <Button className="w-full">Откликнуться</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Не нашли подходящую вакансию? Отправьте нам свое резюме
            </p>
            <Button variant="outline">
              <Icon name="Upload" size={16} className="mr-2" />
              Отправить резюме
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Sparkles" size={24} className="text-primary" />
                <span className="text-xl font-bold">QuickClean</span>
              </div>
              <p className="text-gray-400 mb-4">
                Профессиональные клининговые услуги для бизнеса и частных лиц
              </p>
              <div className="flex space-x-4">
                <Icon name="Facebook" size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                <Icon name="Instagram" size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                <Icon name="Linkedin" size={20} className="text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Офисная уборка</a></li>
                <li><a href="#" className="hover:text-white">Домашняя уборка</a></li>
                <li><a href="#" className="hover:text-white">Детейлинг авто</a></li>
                <li><a href="#" className="hover:text-white">Генеральная уборка</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">О нас</a></li>
                <li><a href="#" className="hover:text-white">Вакансии</a></li>
                <li><a href="#" className="hover:text-white">Новости</a></li>
                <li><a href="#" className="hover:text-white">Сертификаты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (800) 123-45-67</li>
                <li>info@quickclean.ru</li>
                <li>Москва, ул. Деловая, 1</li>
                <li>Пн-Вс: 24/7</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 QuickClean. Все права защищены.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Политика конфиденциальности</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}