import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Icon from '@/components/ui/icon';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'Анна',
    lastName: 'Смирнова',
    middleName: 'Ивановна',
    email: 'anna@example.com',
    phone: '+7 (999) 123-45-67',
    birthDate: '1990-03-15',
    gender: 'female',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=150&h=150&fit=crop&crop=face'
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [paymentMethods] = useState([
    { id: '1', type: 'visa', last4: '1234', isDefault: true, expiryDate: '12/25' },
    { id: '2', type: 'mastercard', last4: '5678', isDefault: false, expiryDate: '08/26' }
  ]);

  const [sessions] = useState([
    { id: '1', device: 'Chrome на Windows', location: 'Москва, Россия', lastActive: '2 минуты назад', isCurrent: true },
    { id: '2', device: 'Safari на iPhone', location: 'Москва, Россия', lastActive: '1 час назад', isCurrent: false },
    { id: '3', device: 'Chrome на Android', location: 'Санкт-Петербург, Россия', lastActive: '2 дня назад', isCurrent: false }
  ]);

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // В реальном приложении здесь был бы API вызов
    console.log('Profile updated:', profile);
  };

  const handleSecurityUpdate = (field: string, value: boolean) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
    // В реальном приложении здесь был бы API вызов
    console.log('Security updated:', { [field]: value });
  };

  const terminateSession = (sessionId: string) => {
    console.log('Terminating session:', sessionId);
  };

  const terminateAllSessions = () => {
    console.log('Terminating all sessions');
  };

  const deleteAccount = () => {
    console.log('Account deletion requested');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Настройки профиля</h1>
          <p className="text-muted-foreground">
            Управляйте своими персональными данными и настройками безопасности
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Личные данные</TabsTrigger>
            <TabsTrigger value="security">Безопасность</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="payments">Платежи</TabsTrigger>
            <TabsTrigger value="privacy">Конфиденциальность</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Личная информация</CardTitle>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Icon name="Edit2" size={16} className="mr-2" />
                    {isEditing ? 'Отменить' : 'Редактировать'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                    <AvatarFallback>
                      {profile.firstName[0]}{profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{profile.firstName} {profile.lastName}</h3>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                    {isEditing && (
                      <Button variant="outline" size="sm" className="mt-2">
                        <Icon name="Upload" size={16} className="mr-2" />
                        Загрузить фото
                      </Button>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Verification Status */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-green-600" />
                    <div>
                      <h4 className="font-semibold">Профиль верифицирован</h4>
                      <p className="text-sm text-muted-foreground">
                        Ваши документы проверены и подтверждены
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Верифицирован
                  </Badge>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Отчество</Label>
                    <Input
                      id="middleName"
                      value={profile.middleName}
                      onChange={(e) => setProfile(prev => ({ ...prev, middleName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Пол</Label>
                    <Select 
                      value={profile.gender} 
                      onValueChange={(value) => setProfile(prev => ({ ...prev, gender: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Мужской</SelectItem>
                        <SelectItem value="female">Женский</SelectItem>
                        <SelectItem value="other">Другой</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="birthDate">Дата рождения</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={profile.birthDate}
                      onChange={(e) => setProfile(prev => ({ ...prev, birthDate: e.target.value }))}
                      disabled={!isEditing}
                      className="w-fit"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button onClick={handleProfileUpdate}>
                      Сохранить изменения
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Отменить
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Безопасность аккаунта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Пароль</h4>
                    <p className="text-sm text-muted-foreground">
                      Последнее изменение: 30 дней назад
                    </p>
                  </div>
                  <Button variant="outline">
                    Изменить пароль
                  </Button>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Двухфакторная аутентификация</h4>
                    <p className="text-sm text-muted-foreground">
                      Дополнительная защита вашего аккаунта
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={security.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {security.twoFactorEnabled ? 'Включена' : 'Отключена'}
                    </Badge>
                    <Switch
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) => handleSecurityUpdate('twoFactorEnabled', checked)}
                    />
                  </div>
                </div>

                <Separator />

                {/* Active Sessions */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Активные сессии</h4>
                    <Button variant="outline" size="sm" onClick={terminateAllSessions}>
                      Завершить все сессии
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="Monitor" size={20} className="text-muted-foreground" />
                          <div>
                            <p className="font-medium">{session.device}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.location} • {session.lastActive}
                            </p>
                          </div>
                          {session.isCurrent && (
                            <Badge variant="outline" className="text-xs">
                              Текущая
                            </Badge>
                          )}
                        </div>
                        {!session.isCurrent && (
                          <Button variant="ghost" size="sm" onClick={() => terminateSession(session.id)}>
                            Завершить
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Способы оплаты</CardTitle>
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить карту
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="CreditCard" size={24} className="text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {method.type === 'visa' ? 'Visa' : 'Mastercard'} ••••{method.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Истекает {method.expiryDate}
                        </p>
                      </div>
                      {method.isDefault && (
                        <Badge variant="outline">Основная</Badge>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm">
                          Сделать основной
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Настройки платежей</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label>Автоматическая оплата</Label>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Уведомления о платежах</Label>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Лимит на заказ</Label>
                    <Input type="number" placeholder="10000" className="w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Конфиденциальность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Показывать профиль в поиске</Label>
                      <p className="text-sm text-muted-foreground">
                        Разрешить другим пользователям находить ваш профиль
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Аналитика и статистика</Label>
                      <p className="text-sm text-muted-foreground">
                        Помочь улучшить сервис, предоставляя анонимную статистику
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Персонализированная реклама</Label>
                      <p className="text-sm text-muted-foreground">
                        Показывать релевантные предложения на основе ваших интересов
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold text-red-600">Опасная зона</h4>
                  
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h5 className="font-semibold mb-2">Удаление аккаунта</h5>
                    <p className="text-sm text-muted-foreground mb-4">
                      После удаления аккаунта все ваши данные будут безвозвратно удалены. 
                      Это действие нельзя отменить.
                    </p>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          Удалить аккаунт
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Это действие нельзя отменить. Ваш аккаунт будет удален навсегда, 
                            включая все заказы, сообщения и персональные данные.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отменить</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={deleteAccount}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Да, удалить аккаунт
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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