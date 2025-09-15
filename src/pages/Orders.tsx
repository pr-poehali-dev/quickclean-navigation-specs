import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function Orders() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const orders = [
    {
      id: '#QC-2024-001234',
      service: 'Стандартная уборка',
      date: '15.01.2024',
      time: '12:00-14:00',
      address: 'ул. Примерная, 123, кв. 25',
      status: 'В процессе',
      statusColor: 'bg-orange-500',
      price: '2,450 ₽',
      cleaner: 'Иван Петров',
      rating: 0,
      photos: []
    },
    {
      id: '#QC-2024-001233',
      service: 'Генеральная уборка',
      date: '10.01.2024',
      time: '09:00-15:00',
      address: 'ул. Деловая, 456, офис 15',
      status: 'Завершен',
      statusColor: 'bg-green-500',
      price: '3,200 ₽',
      cleaner: 'Мария Сидорова',
      rating: 5,
      photos: ['before.jpg', 'after.jpg']
    },
    {
      id: '#QC-2024-001232',
      service: 'Детейлинг авто',
      date: '05.01.2024',
      time: '14:00-18:00',
      address: 'Автомойка "Премиум"',
      status: 'Завершен',
      statusColor: 'bg-green-500',
      price: '4,500 ₽',
      cleaner: 'Алексей Николаев',
      rating: 5,
      photos: ['car-before.jpg', 'car-after.jpg']
    },
    {
      id: '#QC-2024-001231',
      service: 'Офисная уборка',
      date: '28.12.2023',
      time: '18:00-20:00',
      address: 'БЦ "Сити", этаж 12',
      status: 'Завершен',
      statusColor: 'bg-green-500',
      price: '2,800 ₽',
      cleaner: 'Ольга Иванова',
      rating: 4,
      photos: []
    },
    {
      id: '#QC-2024-001230',
      service: 'Уборка после ремонта',
      date: '20.12.2023',
      time: '10:00-16:00',
      address: 'ул. Новая, 789, кв. 45',
      status: 'Отменен',
      statusColor: 'bg-red-500',
      price: '5,200 ₽',
      cleaner: null,
      rating: 0,
      photos: []
    }
  ];

  const getStatusBadge = (status: string, statusColor: string) => {
    return (
      <Badge className={`${statusColor} text-white`}>
        {status}
      </Badge>
    );
  };

  const getActionButtons = (order: any) => {
    if (order.status === 'В процессе') {
      return (
        <div className="flex space-x-2">
          <Button size="sm">Отследить</Button>
          <Button size="sm" variant="outline">Отменить</Button>
        </div>
      );
    }
    
    if (order.status === 'Завершен') {
      return (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">Повторить</Button>
          {order.rating === 0 && (
            <Button size="sm" variant="outline">Отзыв</Button>
          )}
        </div>
      );
    }
    
    if (order.status === 'Отменен') {
      return (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">Повторить</Button>
          <Button size="sm" variant="outline">Поддержка</Button>
        </div>
      );
    }
    
    return null;
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && (order.status === 'В процессе' || order.status === 'Запланирован')) ||
      (filterStatus === 'completed' && order.status === 'Завершен') ||
      (filterStatus === 'cancelled' && order.status === 'Отменен');
    
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

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
              <a href="/profile" className="text-foreground hover:text-primary transition-colors">Профиль</a>
              <a href="/#services" className="text-foreground hover:text-primary transition-colors">Услуги</a>
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">История заказов</h1>
          <p className="text-muted-foreground">Общее количество: {orders.length} заказов</p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Filter" size={20} />
              <span>Фильтры и поиск</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Поиск</label>
                <Input
                  placeholder="Поиск по номеру заказа"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Статус</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="active">Активные</SelectItem>
                    <SelectItem value="completed">Завершенные</SelectItem>
                    <SelectItem value="cancelled">Отмененные</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Период</label>
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все время</SelectItem>
                    <SelectItem value="month">Месяц</SelectItem>
                    <SelectItem value="quarter">3 месяца</SelectItem>
                    <SelectItem value="year">Год</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Сортировка</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">По дате</SelectItem>
                    <SelectItem value="status">По статусу</SelectItem>
                    <SelectItem value="price">По сумме</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-4">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт в Excel
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Printer" size={16} className="mr-2" />
                Печать
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>Найдено {filteredOrders.length} заказов</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Заказ</TableHead>
                    <TableHead>Услуга</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="text-primary hover:underline">
                              {order.id}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Заказ {order.id}</DialogTitle>
                              <DialogDescription>
                                Подробная информация о заказе
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Детали заказа</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="font-medium">Услуга:</span> {order.service}</p>
                                    <p><span className="font-medium">Дата:</span> {order.date}</p>
                                    <p><span className="font-medium">Время:</span> {order.time}</p>
                                    <p><span className="font-medium">Адрес:</span> {order.address}</p>
                                    <p><span className="font-medium">Стоимость:</span> {order.price}</p>
                                  </div>
                                </div>
                                
                                {order.cleaner && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Исполнитель</h4>
                                    <div className="flex items-center space-x-3">
                                      <Avatar>
                                        <AvatarFallback>{order.cleaner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{order.cleaner}</p>
                                        {order.rating > 0 && (
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
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              {order.photos.length > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-2">Фото до/после</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    {order.photos.map((photo, index) => (
                                      <div key={index} className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                                        <Icon name="Image" size={32} className="text-gray-400" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex space-x-4">
                                {getActionButtons(order)}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>{order.service}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{getStatusBadge(order.status, order.statusColor)}</TableCell>
                      <TableCell className="font-medium">{order.price}</TableCell>
                      <TableCell>{getActionButtons(order)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-primary">{order.id}</span>
                      {getStatusBadge(order.status, order.statusColor)}
                    </div>
                    <h3 className="font-medium mb-1">{order.service}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{order.date}, {order.time}</p>
                    <p className="text-sm text-muted-foreground mb-3">{order.address}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{order.price}</span>
                      {getActionButtons(order)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Заказы не найдены</h3>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить фильтры или создать новый заказ
                </p>
                <Button>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Заказать уборку
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics Summary */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
              <Icon name="Package" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">
                За все время
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Завершено</CardTitle>
              <Icon name="CheckCircle" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'Завершен').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((orders.filter(o => o.status === 'Завершен').length / orders.length) * 100)}% от общего
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Потрачено</CardTitle>
              <Icon name="Wallet" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders
                  .filter(o => o.status === 'Завершен')
                  .reduce((sum, o) => sum + parseInt(o.price.replace(/[^\d]/g, '')), 0)
                  .toLocaleString()} ₽
              </div>
              <p className="text-xs text-muted-foreground">
                За завершенные заказы
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Средний рейтинг</CardTitle>
              <Icon name="Star" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(orders
                  .filter(o => o.rating > 0)
                  .reduce((sum, o) => sum + o.rating, 0) / 
                  orders.filter(o => o.rating > 0).length
                ).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                По оцененным заказам
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}