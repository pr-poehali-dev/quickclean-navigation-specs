import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'processing' | 'completed' | 'rejected' | 'blocked';
  method: string;
  card: string;
}

interface EarningsBreakdown {
  completedOrders: { count: number; amount: number; avgCheck: number };
  bonuses: { reviews: number; rating: number; quantity: number };
  penalties: { cancellations: number; lateness: number; complaints: number };
  commission: { amount: number; percentage: number };
}

export default function CleanerEarnings() {
  const [period, setPeriod] = useState('month');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);

  const balance = {
    current: 15750,
    available: 12500,
    processing: 3250,
    blocked: 0
  };

  const thisMonth = {
    amount: 25400,
    lastMonth: 22100,
    change: 15
  };

  const breakdown: EarningsBreakdown = {
    completedOrders: { count: 23, amount: 22100, avgCheck: 962 },
    bonuses: { reviews: 1200, rating: 800, quantity: 500 },
    penalties: { cancellations: -200, lateness: -150, complaints: -300 },
    commission: { amount: -2210, percentage: 10 }
  };

  const payments: Payment[] = [
    { id: '1', date: '2024-01-15', amount: 12500, status: 'completed', method: 'card', card: '**** 1234' },
    { id: '2', date: '2024-01-08', amount: 8900, status: 'completed', method: 'card', card: '**** 1234' },
    { id: '3', date: '2024-01-01', amount: 15600, status: 'completed', method: 'card', card: '**** 1234' },
    { id: '4', date: '2023-12-25', amount: 11200, status: 'processing', method: 'card', card: '**** 1234' },
    { id: '5', date: '2023-12-18', amount: 9800, status: 'completed', method: 'card', card: '**** 1234' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'blocked': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing': return 'Обрабатывается';
      case 'completed': return 'Выплачено';
      case 'rejected': return 'Отклонено';
      case 'blocked': return 'Заблокировано';
      default: return 'Неизвестно';
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount >= 1000 && amount <= balance.available) {
      console.log('Withdrawal requested:', amount);
      setShowWithdrawDialog(false);
      setWithdrawAmount('');
    }
  };

  const exportData = (format: 'excel' | 'pdf') => {
    console.log('Exporting data in format:', format);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Заработок</h1>
            <p className="text-muted-foreground">
              Управляйте своими доходами и выводом средств
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Эта неделя</SelectItem>
                <SelectItem value="month">Этот месяц</SelectItem>
                <SelectItem value="quarter">Этот квартал</SelectItem>
                <SelectItem value="year">Этот год</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => exportData('excel')}>
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт
            </Button>
          </div>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Текущий баланс</p>
                  <p className="text-2xl font-bold">{formatCurrency(balance.current)}</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Icon name="Wallet" size={24} className="text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Доступно к выводу</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(balance.available)}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <Icon name="ArrowDownToLine" size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">В обработке</p>
                  <p className="text-2xl font-bold text-yellow-600">{formatCurrency(balance.processing)}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Icon name="Clock" size={24} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Заблокировано</p>
                  <p className="text-2xl font-bold text-gray-600">{formatCurrency(balance.blocked)}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Icon name="Lock" size={24} className="text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Доходы за месяц</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{formatCurrency(thisMonth.amount)}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="TrendingUp" size={16} className="text-green-600" />
                  <span className="text-green-600 font-medium">+{thisMonth.change}%</span>
                  <span className="text-muted-foreground">к прошлому месяцу</span>
                </div>
              </div>
              <div className="h-24 w-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={32} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tabs */}
        <Tabs defaultValue="breakdown" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="breakdown">Разбивка доходов</TabsTrigger>
            <TabsTrigger value="history">История выплат</TabsTrigger>
            <TabsTrigger value="withdraw">Вывод средств</TabsTrigger>
          </TabsList>

          {/* Earnings Breakdown */}
          <TabsContent value="breakdown" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Completed Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Package" size={20} />
                    <span>Выполненные заказы</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Количество заказов</span>
                    <span className="font-semibold">{breakdown.completedOrders.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Общая сумма</span>
                    <span className="font-semibold">{formatCurrency(breakdown.completedOrders.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Средний чек</span>
                    <span className="font-semibold">{formatCurrency(breakdown.completedOrders.avgCheck)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Bonuses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Gift" size={20} />
                    <span>Бонусы</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>За отзывы</span>
                    <span className="font-semibold text-green-600">+{formatCurrency(breakdown.bonuses.reviews)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>За рейтинг</span>
                    <span className="font-semibold text-green-600">+{formatCurrency(breakdown.bonuses.rating)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>За количество</span>
                    <span className="font-semibold text-green-600">+{formatCurrency(breakdown.bonuses.quantity)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Penalties */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={20} />
                    <span>Штрафы</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>За отмены</span>
                    <span className="font-semibold text-red-600">{formatCurrency(breakdown.penalties.cancellations)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>За опоздания</span>
                    <span className="font-semibold text-red-600">{formatCurrency(breakdown.penalties.lateness)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>За жалобы</span>
                    <span className="font-semibold text-red-600">{formatCurrency(breakdown.penalties.complaints)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Commission */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Percent" size={20} />
                    <span>Комиссия платформы</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Удержано</span>
                    <span className="font-semibold text-red-600">{formatCurrency(breakdown.commission.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Процент</span>
                    <span className="font-semibold">{breakdown.commission.percentage}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment History */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>История выплат</CardTitle>
                  <Button variant="outline" onClick={() => exportData('excel')}>
                    <Icon name="Download" size={16} className="mr-2" />
                    Экспорт в Excel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Icon name="CreditCard" size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(payment.date).toLocaleDateString('ru-RU')} • {payment.method} {payment.card}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(payment.status)}>
                        {getStatusText(payment.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Withdrawal */}
          <TabsContent value="withdraw" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Вывод средств</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h4 className="font-semibold mb-2">Доступно к выводу</h4>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(balance.available)}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Способ вывода:</span>
                        <span className="font-medium">Банковская карта **** 1234</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Комиссия:</span>
                        <span className="font-medium">0 ₽</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Минимальная сумма:</span>
                        <span className="font-medium">1,000 ₽</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Максимальная сумма:</span>
                        <span className="font-medium">50,000 ₽</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="withdraw-amount">Сумма вывода</Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        placeholder="0"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setWithdrawAmount('5000')}
                        className="flex-1"
                      >
                        5,000 ₽
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setWithdrawAmount('10000')}
                        className="flex-1"
                      >
                        10,000 ₽
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setWithdrawAmount(balance.available.toString())}
                        className="flex-1"
                      >
                        Все
                      </Button>
                    </div>
                    
                    <AlertDialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
                      <AlertDialogTrigger asChild>
                        <Button 
                          className="w-full"
                          disabled={!withdrawAmount || parseFloat(withdrawAmount) < 1000 || parseFloat(withdrawAmount) > balance.available}
                        >
                          Вывести средства
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Подтвердите вывод средств</AlertDialogTitle>
                          <AlertDialogDescription>
                            Вы хотите вывести {formatCurrency(parseFloat(withdrawAmount || '0'))} на карту **** 1234?
                            Средства поступят в течение 1-3 рабочих дней.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отменить</AlertDialogCancel>
                          <AlertDialogAction onClick={handleWithdraw}>
                            Подтвердить вывод
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Ограничения</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">Минимум</p>
                      <p className="text-muted-foreground">1,000 ₽</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">Максимум</p>
                      <p className="text-muted-foreground">50,000 ₽</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">Частота</p>
                      <p className="text-muted-foreground">1 раз в день</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}