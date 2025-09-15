import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  type: 'text' | 'image' | 'voice' | 'system';
  content: string;
  sender: 'customer' | 'cleaner' | 'system';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  duration?: number;
  imageUrl?: string;
}

export default function Chat() {
  const { orderId } = useParams();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Клинер назначен на ваш заказ',
      sender: 'system',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
    {
      id: '2',
      type: 'text',
      content: 'Здравствуйте! Я Иван, ваш клинер. Буду у вас через 30 минут.',
      sender: 'cleaner',
      timestamp: new Date(Date.now() - 1800000),
      status: 'read'
    },
    {
      id: '3',
      type: 'text',
      content: 'Здравствуйте! Хорошо, буду ждать. Подъезд 2, домофон 25.',
      sender: 'customer',
      timestamp: new Date(Date.now() - 1700000),
      status: 'read'
    },
    {
      id: '4',
      type: 'image',
      content: 'Это фото подъезда',
      sender: 'customer',
      timestamp: new Date(Date.now() - 1650000),
      status: 'read',
      imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=300&h=200&fit=crop'
    },
    {
      id: '5',
      type: 'voice',
      content: 'Голосовое сообщение',
      sender: 'cleaner',
      timestamp: new Date(Date.now() - 900000),
      status: 'read',
      duration: 15
    },
    {
      id: '6',
      type: 'system',
      content: 'Клинер в пути',
      sender: 'system',
      timestamp: new Date(Date.now() - 600000),
      status: 'read'
    },
    {
      id: '7',
      type: 'text',
      content: 'Я уже у подъезда, поднимаюсь',
      sender: 'cleaner',
      timestamp: new Date(Date.now() - 300000),
      status: 'delivered'
    }
  ]);

  const cleaner = {
    name: 'Иван Петров',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'В пути',
    lastSeen: '2 минуты назад'
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRecordVoice = () => {
    setIsRecording(!isRecording);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Chat Header */}
      <Card className="rounded-none border-l-0 border-r-0 border-t-0">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to={`/orders/${orderId}`}>
                <Button variant="ghost" size="sm">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
              </Link>
              
              <Avatar className="h-12 w-12">
                <AvatarImage src={cleaner.avatar} alt={cleaner.name} />
                <AvatarFallback>ИП</AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-semibold">{cleaner.name}</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                    {cleaner.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {cleaner.lastSeen}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Phone" size={16} className="mr-1" />
                Позвонить
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Video" size={16} className="mr-1" />
                Видео
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.type === 'system' ? (
              <div className="text-center">
                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {msg.content}
                </span>
              </div>
            ) : (
              <div className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${
                  msg.sender === 'customer' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                } rounded-lg p-3 space-y-2`}>
                  
                  {msg.type === 'text' && (
                    <p className="text-sm">{msg.content}</p>
                  )}
                  
                  {msg.type === 'image' && (
                    <div className="space-y-2">
                      <img 
                        src={msg.imageUrl} 
                        alt="Сообщение" 
                        className="rounded-lg max-w-full h-auto cursor-pointer"
                      />
                      {msg.content && <p className="text-sm">{msg.content}</p>}
                    </div>
                  )}
                  
                  {msg.type === 'voice' && (
                    <div className="flex items-center space-x-3">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Icon name="Play" size={16} />
                      </Button>
                      <div className="flex-1 h-2 bg-background/20 rounded-full">
                        <div className="h-full w-1/3 bg-background/40 rounded-full" />
                      </div>
                      <span className="text-xs">{formatDuration(msg.duration || 0)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-70">
                      {formatTime(msg.timestamp)}
                    </span>
                    {msg.sender === 'customer' && (
                      <div className="flex">
                        {msg.status === 'sent' && <Icon name="Check" size={12} className="opacity-70" />}
                        {msg.status === 'delivered' && <Icon name="CheckCheck" size={12} className="opacity-70" />}
                        {msg.status === 'read' && <Icon name="CheckCheck" size={12} className="text-blue-400" />}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <Card className="rounded-none border-l-0 border-r-0 border-b-0">
        <CardContent className="p-4">
          <div className="flex items-end space-x-2">
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleFileUpload}
                >
                  <Icon name="Paperclip" size={16} />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                  multiple
                />
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleRecordVoice}
                  className={isRecording ? 'bg-red-100 text-red-600' : ''}
                >
                  <Icon name="Mic" size={16} />
                </Button>
              </div>
              
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="min-h-[40px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
          
          {isRecording && (
            <div className="mt-2 p-3 bg-red-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-red-600">Запись голосового сообщения...</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setIsRecording(false)}>
                  Отменить
                </Button>
                <Button size="sm" onClick={() => setIsRecording(false)}>
                  Отправить
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}