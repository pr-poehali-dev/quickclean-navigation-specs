import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Notification {
  id: string;
  type: 'order' | 'payment' | 'system' | 'promotion';
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
  actionText?: string;
}

export default function Notifications() {
  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Заказ подтвержден',
      description: 'Ваш заказ #QC-2024-001234 подтвержден и назначен клинер',
      timestamp: new Date(Date.now() - 300000),
      isRead: false,
      priority: 'high',
      actionUrl: '/orders/001234',
      actionText: 'Посмотреть заказ'
    },
    {
      id: '2',
      type: 'order',
      title: 'Клинер в пути',
      description: 'Иван Петров направляется к вам. Ожидаемое время прибытия: 15 минут',
      timestamp: new Date(Date.now() - 600000),
      isRead: false,
      priority: 'high',
      actionUrl: '/orders/001234/chat',
      actionText: 'Написать клинеру'
    },
    {
      id: '3',
      type: 'payment',
      title: 'Платеж успешно проведен',
      description: 'Оплата за заказ #QC-2024-001233 в размере 2,500 ₽ успешно списана',
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'promotion',
      title: 'Скидка 20% на первую уборку',
      description: 'Специальное предложение для новых клиентов действует до конца месяца',
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
      priority: 'low',
      actionUrl: '/booking',
      actionText: 'Заказать'
    },
    {
      id: '5',
      type: 'system',
      title: 'Обновление приложения',
      description: 'Доступна новая версия с улучшенным чатом и уведомлениями',
      timestamp: new Date(Date.now() - 86400000),
      isRead: true,
      priority: 'medium'
    },
    {
      id: '6',
      type: 'order',
      title: 'Работа завершена',
      description: 'Клинер завершил уборку. Пожалуйста, оцените качество услуги',
      timestamp: new Date(Date.now() - 172800000),
      isRead: true,
      priority: 'medium',
      actionUrl: '/orders/001232/review',
      actionText: 'Оставить отзыв'
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orders: 'all',
    payments: 'important',
    system: 'important',
    promotions: 'all',
    timeRange: 'all'
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'week') return Date.now() - notification.timestamp.getTime() <= 7 * 24 * 60 * 60 * 1000;
    if (filter === 'month') return Date.now() - notification.timestamp.getTime() <= 30 * 24 * 60 * 60 * 1000;
    if (filter !== 'all') return notification.type === filter;
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order': return 'Package';
      case 'payment': return 'CreditCard';
      case 'system': return 'Settings';
      case 'promotion': return 'Gift';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-600';
      case 'payment': return 'bg-green-100 text-green-600';
      case 'system': return 'bg-gray-100 text-gray-600';
      case 'promotion': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTime = (date: Date) => {
    const now = Date.now();
    const diff = now - date.getTime();
    
    if (diff < 60000) return 'Только что';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} мин назад`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} ч назад`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)} дн назад`;
    
    return date.toLocaleDateString('ru-RU');
  };

  const markAllAsRead = () => {
    // В реальном приложении здесь был бы API вызов
    console.log('Marking all notifications as read');
  };

  if (showSettings) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setShowSettings(false)}>
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад к уведомлениям
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Способы уведомлений */}
              <div className="space-y-4">
                <h3 className="font-semibold">Способы уведомлений</h3>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="email">Email уведомления</Label>
                  <Switch 
                    id="email"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="push">Push уведомления</Label>
                  <Switch 
                    id="push"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms">SMS уведомления</Label>
                  <Switch 
                    id="sms"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smsNotifications: checked }))}
                  />
                </div>
              </div>

              <Separator />

              {/* Категории уведомлений */}
              <div className="space-y-4">
                <h3 className="font-semibold">Категории уведомлений</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Заказы</Label>
                    <Select value={settings.orders} onValueChange={(value) => setSettings(prev => ({ ...prev, orders: value }))}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="important">Важные</SelectItem>
                        <SelectItem value="off">Отключить</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Платежи</Label>
                    <Select value={settings.payments} onValueChange={(value) => setSettings(prev => ({ ...prev, payments: value }))}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="important">Важные</SelectItem>
                        <SelectItem value="off">Отключить</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Системные</Label>
                    <Select value={settings.system} onValueChange={(value) => setSettings(prev => ({ ...prev, system: value }))}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="important">Важные</SelectItem>
                        <SelectItem value="off">Отключить</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Акции</Label>
                    <Select value={settings.promotions} onValueChange={(value) => setSettings(prev => ({ ...prev, promotions: value }))}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="off">Отключить</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Время уведомлений */}
              <div className="space-y-4">
                <h3 className="font-semibold">Время уведомлений</h3>
                <Select value={settings.timeRange} onValueChange={(value) => setSettings(prev => ({ ...prev, timeRange: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Без ограничений</SelectItem>
                    <SelectItem value="working">Только в рабочие дни</SelectItem>
                    <SelectItem value="hours">С 9:00 до 21:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                Сохранить настройки
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Уведомления</h1>
            {unreadCount > 0 && (
              <p className="text-muted-foreground">
                {unreadCount} непрочитанных уведомлений
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={markAllAsRead}>
              Отметить все как прочитанные
            </Button>
            <Button variant="outline" onClick={() => setShowSettings(true)}>
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">
              Все
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Непрочитанные
              {unreadCount > 0 && (
                <Badge className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="order">Заказы</TabsTrigger>
            <TabsTrigger value="payment">Платежи</TabsTrigger>
            <TabsTrigger value="system">Системные</TabsTrigger>
            <TabsTrigger value="promotion">Акции</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Time Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <Label>Период:</Label>
          <Select value={filter.startsWith('week') || filter.startsWith('month') ? filter : 'all'} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все уведомления</SelectItem>
              <SelectItem value="week">За последние 7 дней</SelectItem>
              <SelectItem value="month">За последний месяц</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="Bell" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Нет уведомлений</h3>
                <p className="text-muted-foreground">
                  {filter === 'unread' 
                    ? 'Все уведомления прочитаны' 
                    : 'Уведомлений для выбранного фильтра не найдено'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.isRead ? 'border-primary/50 bg-primary/5' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                      <Icon name={getNotificationIcon(notification.type) as any} size={20} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      {notification.actionUrl && (
                        <div className="mt-3">
                          <Button asChild variant="outline" size="sm">
                            <Link to={notification.actionUrl}>
                              {notification.actionText}
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}