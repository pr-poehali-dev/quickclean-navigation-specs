import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface TimeSlot {
  time: string;
  status: 'available' | 'booked' | 'unavailable';
  order?: {
    id: string;
    client: string;
    address: string;
    service: string;
  };
}

interface DaySchedule {
  date: string;
  dayName: string;
  isToday: boolean;
  slots: TimeSlot[];
}

export default function CleanerSchedule() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [workingHours, setWorkingHours] = useState({ start: '09:00', end: '18:00' });
  const [workingDays, setWorkingDays] = useState(['mon', 'tue', 'wed', 'thu', 'fri']);
  const [showVacationDialog, setShowVacationDialog] = useState(false);
  const [vacationData, setVacationData] = useState({ start: '', end: '', reason: 'vacation' });

  const generateWeekSchedule = (): DaySchedule[] => {
    const today = new Date();
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay() + 1 + (currentWeek * 7));

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      
      const dayNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
      const isToday = date.toDateString() === today.toDateString();
      
      const slots: TimeSlot[] = [];
      for (let hour = 6; hour <= 24; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        let status: 'available' | 'booked' | 'unavailable' = 'available';
        let order = undefined;

        // Логика для определения статуса слота
        if (hour < 9 || hour > 18) {
          status = 'unavailable';
        } else if (isToday && hour === 14) {
          status = 'booked';
          order = {
            id: 'QC-001234',
            client: 'Анна С.',
            address: 'ул. Примерная, 123',
            service: 'Стандартная уборка'
          };
        } else if (isToday && hour === 16) {
          status = 'booked';
          order = {
            id: 'QC-001235',
            client: 'Михаил П.',
            address: 'пр. Невский, 45',
            service: 'Генеральная уборка'
          };
        }

        slots.push({ time, status, order });
      }

      days.push({
        date: date.toISOString().split('T')[0],
        dayName: dayNames[date.getDay()],
        isToday,
        slots
      });
    }

    return days;
  };

  const weekSchedule = generateWeekSchedule();
  const weekStart = weekSchedule[1].date;
  const weekEnd = weekSchedule[6].date;

  const vacations = [
    { id: '1', start: '2024-02-15', end: '2024-02-20', reason: 'Отпуск', status: 'approved' },
    { id: '2', start: '2024-03-05', end: '2024-03-07', reason: 'Болезнь', status: 'approved' }
  ];

  const getSlotColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 hover:bg-green-200 border-green-300';
      case 'booked': return 'bg-blue-100 border-blue-300';
      case 'unavailable': return 'bg-gray-100 border-gray-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const toggleSlotAvailability = (dayIndex: number, slotIndex: number) => {
    // В реальном приложении здесь был бы API вызов
    console.log('Toggle slot availability:', { dayIndex, slotIndex });
  };

  const setQuickAvailability = (type: 'all-day' | 'unavailable' | 'repeat-last' | 'clear') => {
    console.log('Quick availability set:', type);
  };

  const handleVacationSubmit = () => {
    console.log('Vacation requested:', vacationData);
    setShowVacationDialog(false);
    setVacationData({ start: '', end: '', reason: 'vacation' });
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })} - ${endDate.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Расписание</h1>
            <p className="text-muted-foreground">
              {formatDateRange(weekStart, weekEnd)}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Label>Доступен для заказов</Label>
              <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
            </div>
            <Button variant="outline">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
          </div>
        </div>

        {/* Week Navigation */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentWeek(prev => prev - 1)}
              >
                <Icon name="ChevronLeft" size={16} className="mr-2" />
                Предыдущая неделя
              </Button>
              
              <div className="flex space-x-2">
                <Button 
                  variant={currentWeek === 0 ? "default" : "outline"}
                  onClick={() => setCurrentWeek(0)}
                >
                  Текущая неделя
                </Button>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => setCurrentWeek(prev => prev + 1)}
              >
                Следующая неделя
                <Icon name="ChevronRight" size={16} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                onClick={() => setQuickAvailability('all-day')}
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <Icon name="Check" size={20} />
                <span className="text-sm">Доступен весь день</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setQuickAvailability('unavailable')}
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <Icon name="X" size={20} />
                <span className="text-sm">Недоступен весь день</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setQuickAvailability('repeat-last')}
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <Icon name="Copy" size={20} />
                <span className="text-sm">Повторить прошлую неделю</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setQuickAvailability('clear')}
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <Icon name="Trash2" size={20} />
                <span className="text-sm">Очистить расписание</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Grid */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Расписание на неделю</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-8 gap-2 min-w-[800px]">
                {/* Time Header */}
                <div className="font-semibold text-center p-2">Время</div>
                {weekSchedule.slice(1).map((day) => (
                  <div key={day.date} className="text-center p-2">
                    <div className="font-semibold">{day.dayName}</div>
                    <div className={`text-sm ${day.isToday ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                      {new Date(day.date).getDate()}
                    </div>
                  </div>
                ))}

                {/* Schedule Slots */}
                {Array.from({ length: 19 }, (_, hourIndex) => {
                  const hour = hourIndex + 6;
                  const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
                  
                  return (
                    <div key={hour} className="contents">
                      {/* Time Label */}
                      <div className="text-sm text-muted-foreground text-center p-2 border-r">
                        {timeSlot}
                      </div>
                      
                      {/* Day Slots */}
                      {weekSchedule.slice(1).map((day, dayIndex) => {
                        const slot = day.slots.find(s => s.time === timeSlot);
                        if (!slot) return <div key={dayIndex} className="p-1" />;
                        
                        return (
                          <div key={dayIndex} className="p-1">
                            <button
                              onClick={() => toggleSlotAvailability(dayIndex, hourIndex)}
                              className={`w-full h-12 text-xs rounded border-2 transition-colors ${getSlotColor(slot.status)}`}
                              disabled={slot.status === 'booked'}
                            >
                              {slot.status === 'booked' && slot.order ? (
                                <div className="p-1">
                                  <div className="font-semibold">{slot.order.client}</div>
                                  <div className="text-xs">{slot.order.service}</div>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  {slot.status === 'available' && <Icon name="Check" size={16} />}
                                  {slot.status === 'unavailable' && <Icon name="X" size={16} />}
                                </div>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
                <span className="text-sm">Доступен</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded" />
                <span className="text-sm">Занят</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded" />
                <span className="text-sm">Недоступен</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vacation Planning */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Планирование отпуска</CardTitle>
              <AlertDialog open={showVacationDialog} onOpenChange={setShowVacationDialog}>
                <AlertDialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Запланировать отпуск
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Запланировать отпуск</AlertDialogTitle>
                    <AlertDialogDescription>
                      Укажите даты и причину отсутствия
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Начало</Label>
                        <Input
                          type="date"
                          value={vacationData.start}
                          onChange={(e) => setVacationData(prev => ({ ...prev, start: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Конец</Label>
                        <Input
                          type="date"
                          value={vacationData.end}
                          onChange={(e) => setVacationData(prev => ({ ...prev, end: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Причина</Label>
                      <Select value={vacationData.reason} onValueChange={(value) => setVacationData(prev => ({ ...prev, reason: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacation">Отпуск</SelectItem>
                          <SelectItem value="sick">Болезнь</SelectItem>
                          <SelectItem value="personal">Личные дела</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отменить</AlertDialogCancel>
                    <AlertDialogAction onClick={handleVacationSubmit}>
                      Запланировать
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vacations.map((vacation) => (
                <div key={vacation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{vacation.reason}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDateRange(vacation.start, vacation.end)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Подтвержден
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit2" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              
              {vacations.length === 0 && (
                <div className="text-center py-8">
                  <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Запланированных отпусков нет</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}