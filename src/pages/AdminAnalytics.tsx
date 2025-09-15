import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export default function AdminAnalytics() {
  const [period, setPeriod] = useState('30days');
  const [region, setRegion] = useState('all');
  const [service, setService] = useState('all');

  const metrics: MetricCard[] = [
    {
      title: 'Общий доход',
      value: '2 450 000 ₽',
      change: '+18%',
      changeType: 'positive',
      icon: 'TrendingUp'
    },
    {
      title: 'Количество заказов',
      value: '1 247',
      change: '+12%',
      changeType: 'positive',
      icon: 'Package'
    },
    {
      title: 'Средний чек',
      value: '1 965 ₽',
      change: '+5%',
      changeType: 'positive',
      icon: 'DollarSign'
    },
    {
      title: 'Активные клинеры',
      value: '89',
      change: '+5',
      changeType: 'positive',
      icon: 'Users'
    },
    {
      title: 'Конверсия',
      value: '23.4%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'Target'
    },
    {
      title: 'Средний рейтинг',
      value: '4.7/5',
      change: '+0.2',
      changeType: 'positive',
      icon: 'Star'
    }
  ];

  const topCleaners = [
    { name: 'Иван Петров', orders: 45, rating: 4.9, earnings: '125 000 ₽' },
    { name: 'Анна Смирнова', orders: 42, rating: 4.8, earnings: '118 500 ₽' },
    { name: 'Михаил Козлов', orders: 38, rating: 4.7, earnings: '102 000 ₽' },
    { name: 'Елена Васильева', orders: 35, rating: 4.8, earnings: '98 000 ₽' },
    { name: 'Дмитрий Соколов', orders: 33, rating: 4.6, earnings: '89 500 ₽' }
  ];

  const serviceStats = [
    { name: 'Домашняя уборка', orders: 567, percentage: 45, revenue: '1 120 000 ₽' },
    { name: 'Офисная уборка', orders: 412, percentage: 33, revenue: '986 000 ₽' },
    { name: 'Мойка авто', orders: 268, percentage: 22, revenue: '344 000 ₽' }
  ];

  const recentIssues = [
    { id: 1, type: 'Жалоба', order: 'QC-2024-001234', status: 'В обработке', priority: 'high' },
    { id: 2, type: 'Спор', order: 'QC-2024-001235', status: 'Решен', priority: 'medium' },
    { id: 3, type: 'Отмена', order: 'QC-2024-001236', status: 'Рассмотрено', priority: 'low' },
    { id: 4, type: 'Жалоба', order: 'QC-2024-001237', status: 'Новая', priority: 'high' }
  ];

  const getChangeColor = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Аналитика и отчеты</h1>
            <p className="text-muted-foreground">
              Детальная аналитика работы платформы
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт в Excel
            </Button>
            <Button variant="outline">
              <Icon name="FileText" size={16} className="mr-2" />
              PDF отчет
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Фильтры</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Период</label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Последние 7 дней</SelectItem>
                    <SelectItem value="30days">Последние 30 дней</SelectItem>
                    <SelectItem value="3months">Последние 3 месяца</SelectItem>
                    <SelectItem value="year">Год</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Регион</label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все регионы</SelectItem>
                    <SelectItem value="moscow">Москва</SelectItem>
                    <SelectItem value="spb">Санкт-Петербург</SelectItem>
                    <SelectItem value="other">Другие</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Услуга</label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все услуги</SelectItem>
                    <SelectItem value="home">Домашняя уборка</SelectItem>
                    <SelectItem value="office">Офисная уборка</SelectItem>
                    <SelectItem value="car">Мойка авто</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Применить
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Icon name={metric.icon as any} size={24} className="text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    к прошлому периоду
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Detailed Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="cleaners">Клинеры</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="issues">Проблемы</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Динамика доходов</CardTitle>
                  <CardDescription>
                    Доходы за последние 30 дней
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="TrendingUp" size={48} className="text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">График доходов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Географическое распределение</CardTitle>
                  <CardDescription>
                    Заказы по регионам
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Map" size={48} className="text-green-600 mx-auto mb-2" />
                      <p className="text-muted-foreground">Карта заказов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cleaners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Топ клинеры</CardTitle>
                <CardDescription>
                  Лучшие исполнители за период
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCleaners.map((cleaner, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold">{cleaner.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {cleaner.orders} заказов
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                          <span className="font-medium">{cleaner.rating}</span>
                        </div>
                        <p className="text-sm font-semibold">{cleaner.earnings}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Статистика по услугам</CardTitle>
                <CardDescription>
                  Распределение заказов и доходов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {serviceStats.map((service, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{service.name}</h4>
                        <Badge variant="secondary">{service.orders} заказов</Badge>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{service.percentage}% от общего объема</span>
                        <span>{service.revenue}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${service.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Проблемы и споры</CardTitle>
                <CardDescription>
                  Текущие проблемы, требующие внимания
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIssues.map((issue) => (
                    <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={getPriorityColor(issue.priority)}>
                          {issue.priority === 'high' ? 'Высокий' : 
                           issue.priority === 'medium' ? 'Средний' : 'Низкий'}
                        </Badge>
                        <div>
                          <h4 className="font-semibold">{issue.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            Заказ #{issue.order}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{issue.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}