import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');

  const currentOrders = [
    {
      id: '#QC-2024-001234',
      service: 'Стандартная уборка',
      date: '15 января, 12:00-14:00',
      status: 'В процессе',
      statusColor: 'bg-orange-500'
    },
    {
      id: '#QC-2024-001235',
      service: 'Мойка окон',
      date: '16 января, 10:00-11:00',
      status: 'Запланирован',
      statusColor: 'bg-blue-500'
    }
  ];

  const recentOrders = [
    {
      id: '#QC-2024-001233',
      service: 'Генеральная уборка',
      date: '10 января',
      status: 'Завершен',
      statusColor: 'bg-green-500',
      rating: 5,
      price: '3,200 ₽'
    },
    {
      id: '#QC-2024-001232',
      service: 'Детейлинг авто',
      date: '5 января',
      status: 'Завершен',
      statusColor: 'bg-green-500',
      rating: 5,
      price: '4,500 ₽'
    },
    {
      id: '#QC-2024-001231',
      service: 'Офисная уборка',
      date: '28 декабря',
      status: 'Завершен',
      statusColor: 'bg-green-500',
      rating: 4,
      price: '2,800 ₽'
    }
  ];

  const navigationItems = [
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'orders', label: 'Заказы', icon: 'Package' },
    { id: 'addresses', label: 'Адреса', icon: 'MapPin' },
    { id: 'payments', label: 'Платежи', icon: 'CreditCard' },
    { id: 'reviews', label: 'Отзывы', icon: 'Star' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
    { id: 'logout', label: 'Выйти', icon: 'LogOut' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={32} className="text-primary" />
              <span className="text-2xl font-bold text-foreground">QuickClean</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="/#services" className="text-foreground hover:text-primary transition-colors">Услуги</a>
              <a href="/#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Icon name="Bell" size={16} className="mr-2" />
                Уведомления
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>АС</AvatarFallback>
                </Avatar>
                <span className="hidden md:block font-medium">Анна Смирнова</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center pb-4">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="text-2xl">АС</AvatarFallback>
                </Avatar>
                <CardTitle>Анна Смирнова</CardTitle>
                <div className="flex items-center justify-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Icon name="Shield" size={12} className="mr-1" />
                    Верифицирован
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-50 text-gray-700'
                      } ${item.id === 'logout' ? 'text-red-600 hover:bg-red-50' : ''}`}
                    >
                      <Icon name={item.icon as any} size={20} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Добро пожаловать, Анна!</h1>
              <p className="text-muted-foreground">Управляйте своими заказами и настройками профиля</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
                  <Icon name="Package" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2</span> за месяц
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Потрачено</CardTitle>
                  <Icon name="Wallet" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45,000 ₽</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+5,000 ₽</span> за месяц
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Экономия</CardTitle>
                  <Icon name="Percent" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5,000 ₽</div>
                  <p className="text-xs text-muted-foreground">
                    Благодаря скидкам
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Рейтинг</CardTitle>
                  <Icon name="Star" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.9/5</div>
                  <p className="text-xs text-muted-foreground">
                    8 отзывов
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="h-auto p-4 flex-col space-y-2">
                    <Icon name="Plus" size={24} />
                    <span className="text-sm">Заказать уборку</span>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                    <Icon name="RotateCcw" size={24} />
                    <span className="text-sm">Повторить заказ</span>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                    <Icon name="MapPin" size={24} />
                    <span className="text-sm">Добавить адрес</span>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                    <Icon name="MessageCircle" size={24} />
                    <span className="text-sm">Поддержка</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Current Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Текущие заказы</CardTitle>
                  <Button variant="outline" size="sm">
                    Показать все
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{order.id}</span>
                          <Badge className={`${order.statusColor} text-white`}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.service}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">Отследить</Button>
                        {order.status === 'Запланирован' && (
                          <Button size="sm" variant="outline">Отменить</Button>
                        )}
                      </div>
                    </div>
                  ))}

                  {currentOrders.length === 0 && (
                    <div className="text-center py-8">
                      <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Нет активных заказов</p>
                      <Button className="mt-4">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Заказать уборку
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Последние заказы</CardTitle>
                  <Button variant="outline" size="sm">
                    Показать все
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{order.id}</span>
                          <Badge className={`${order.statusColor} text-white`}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.service}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={12}
                                className={`${
                                  i < order.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-primary">{order.price}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Повторить</Button>
                        {order.rating === 0 && (
                          <Button size="sm" variant="outline">Отзыв</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Loyalty Program */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Award" size={20} />
                  <span>Программа лояльности</span>
                </CardTitle>
                <CardDescription>
                  Копите бонусы и получайте скидки на будущие заказы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Текущий уровень: Золотой</span>
                    <span className="text-sm text-muted-foreground">1,200 / 2,000 баллов до Платинового</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="grid sm:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">1,200</div>
                      <div className="text-sm text-muted-foreground">Доступно баллов</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">15%</div>
                      <div className="text-sm text-muted-foreground">Текущая скидка</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">800</div>
                      <div className="text-sm text-muted-foreground">До следующего уровня</div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Icon name="Gift" size={16} className="mr-2" />
                    Потратить баллы
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}