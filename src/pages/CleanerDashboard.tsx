import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

export default function CleanerDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [notifications] = useState(3);

  const currentOrder = {
    id: '#QC-2024-001234',
    service: 'Стандартная уборка',
    address: 'ул. Примерная, 123, кв. 25',
    time: '12:00-14:00',
    client: 'Анна С.',
    phone: '+7 (999) 123-45-67',
    status: 'В пути',
    price: '2,450 ₽',
    duration: '2 часа'
  };

  const availableOrders = [
    {
      id: '#QC-2024-001236',
      service: 'Генеральная уборка',
      address: 'ул. Деловая, 456, кв. 78',
      time: '16:00-20:00',
      distance: '1.2 км',
      price: '3,500 ₽',
      client: 'Михаил К.',
      rating: 4.8
    },
    {
      id: '#QC-2024-001237',
      service: 'Офисная уборка',
      address: 'БЦ "Премиум", офис 301',
      time: '18:00-20:00',
      distance: '2.1 км',
      price: '2,800 ₽',
      client: 'ООО "Технологии"',
      rating: 4.9
    },
    {
      id: '#QC-2024-001238',
      service: 'Мойка окон',
      address: 'ул. Новая, 789, кв. 12',
      time: '14:00-15:00',
      distance: '0.8 км',
      price: '1,200 ₽',
      client: 'Елена Р.',
      rating: 5.0
    }
  ];

  const recentNotifications = [
    {
      type: 'new-order',
      title: 'Новый заказ доступен',
      message: 'Генеральная уборка в 2 км от вас',
      time: '5 мин назад',
      icon: 'Package'
    },
    {
      type: 'reminder',
      title: 'Напоминание о начале работы',
      message: 'Заказ #001234 начинается через 30 минут',
      time: '25 мин назад',
      icon: 'Clock'
    },
    {
      type: 'cancelled',
      title: 'Заказ отменен',
      message: 'Клиент отменил заказ #001235',
      time: '1 час назад',
      icon: 'X'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Online Status */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isOnline}
                  onCheckedChange={setIsOnline}
                  className="data-[state=checked]:bg-green-500"
                />
                <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                  {isOnline ? 'Онлайн' : 'Офлайн'}
                </span>
              </div>
            </div>

            {/* Notifications and Profile */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-cleaner.jpg" />
                  <AvatarFallback>ИП</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">Иван П.</p>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                    <span className="text-xs text-muted-foreground">4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Daily Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Icon name="Package" size={24} className="mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-muted-foreground">Заказов сегодня</div>
              <div className="text-xs text-green-600">+1 к вчера</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Icon name="Wallet" size={24} className="mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold">2,500 ₽</div>
              <div className="text-xs text-muted-foreground">Заработано</div>
              <div className="text-xs text-green-600">+500 ₽ к вчера</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Icon name="Star" size={24} className="mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-xs text-muted-foreground">Рейтинг</div>
              <div className="text-xs text-green-600">+0.1 за неделю</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex-col space-y-2">
                <Icon name="Search" size={24} />
                <span className="text-sm">Доступные заказы</span>
                <Badge className="bg-orange-500 text-white">5</Badge>
              </Button>

              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Icon name="List" size={24} />
                <span className="text-sm">Мои заказы</span>
              </Button>

              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Icon name="Calendar" size={24} />
                <span className="text-sm">Расписание</span>
              </Button>

              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Icon name="DollarSign" size={24} />
                <span className="text-sm">Заработок</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Order */}
        {currentOrder && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-primary" />
                <span>Текущий заказ</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary">{currentOrder.id}</span>
                <Badge className="bg-orange-500 text-white">{currentOrder.status}</Badge>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">{currentOrder.service}</h3>
                <p className="text-sm text-muted-foreground">{currentOrder.time} • {currentOrder.duration}</p>
              </div>
              
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm">{currentOrder.address}</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Icon name="Navigation" size={16} className="mr-2" />
                    Навигация
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{currentOrder.client.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{currentOrder.client}</p>
                    <p className="text-xs text-muted-foreground">{currentOrder.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Icon name="Phone" size={16} />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Icon name="MessageCircle" size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-lg font-medium">
                <span>Стоимость:</span>
                <span className="text-primary">{currentOrder.price}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button className="w-full">
                  <Icon name="Play" size={16} className="mr-2" />
                  Начать работу
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Связаться
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Доступные заказы</CardTitle>
            <Badge className="bg-green-500 text-white">{availableOrders.length} рядом</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Home" size={16} className="text-primary" />
                    <span className="font-medium">{order.service}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{order.distance}</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm">{order.address}</p>
                  <p className="text-sm text-muted-foreground">{order.time}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{order.client}</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                      <span className="text-xs">{order.rating}</span>
                    </div>
                  </div>
                  <span className="text-lg font-medium text-primary">{order.price}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm">Принять</Button>
                  <Button size="sm" variant="outline">Отклонить</Button>
                  <Button size="sm" variant="outline">Подробнее</Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Обновить список
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Уведомления</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentNotifications.map((notification, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Icon 
                  name={notification.icon as any} 
                  size={20} 
                  className={`flex-shrink-0 mt-1 ${
                    notification.type === 'new-order' ? 'text-green-500' :
                    notification.type === 'reminder' ? 'text-orange-500' :
                    'text-red-500'
                  }`} 
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Прогресс недели</CardTitle>
            <CardDescription>Ваши достижения за текущую неделю</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Выполнено заказов</span>
                <span>12 из 15</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Цель по доходу</span>
                <span>18,500 ₽ из 25,000 ₽</span>
              </div>
              <Progress value={74} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Рейтинг</span>
                <span>4.8 / 5.0</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-5 gap-1 p-2">
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2">
            <Icon name="Home" size={20} className="text-primary" />
            <span className="text-xs text-primary">Главная</span>
          </Button>
          
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2">
            <Icon name="Search" size={20} />
            <span className="text-xs">Заказы</span>
            <Badge className="absolute top-1 right-4 h-4 w-4 rounded-full bg-red-500 text-white text-xs">
              5
            </Badge>
          </Button>
          
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2">
            <Icon name="Calendar" size={20} />
            <span className="text-xs">Расписание</span>
          </Button>
          
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2">
            <Icon name="DollarSign" size={20} />
            <span className="text-xs">Заработок</span>
          </Button>
          
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2">
            <Icon name="User" size={20} />
            <span className="text-xs">Профиль</span>
          </Button>
        </div>
      </nav>

      {/* Spacing for bottom navigation */}
      <div className="h-20"></div>
    </div>
  );
}