import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Rating {
  overall: number;
  quality: number;
  punctuality: number;
  politeness: number;
  requirements: number;
}

export default function ReviewOrder() {
  const { orderId } = useParams();
  const [rating, setRating] = useState<Rating>({
    overall: 0,
    quality: 0,
    punctuality: 0,
    politeness: 0,
    requirements: 0
  });
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [allowResponse, setAllowResponse] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const order = {
    id: orderId,
    number: 'QC-2024-001234',
    completedDate: '15 января 2024',
    cleaner: {
      name: 'Иван Петров',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  };

  const ratingLabels = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];
  
  const ratingDescriptions = {
    quality: 'Насколько качественно выполнена уборка',
    punctuality: 'Прибыл ли клинер вовремя',
    politeness: 'Насколько вежлив и общителен',
    requirements: 'Выполнил ли все ваши требования'
  };

  const handleRatingClick = (category: keyof Rating, value: number) => {
    setRating(prev => ({ ...prev, [category]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length <= 5) {
      setPhotos(prev => [...prev, ...files]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const renderStars = (category: keyof Rating, label: string, description?: string) => (
    <div className="space-y-2">
      <div>
        <Label className="text-sm font-medium">{label}</Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingClick(category, star)}
            className="p-1 hover:scale-110 transition-transform"
          >
            <Icon 
              name="Star" 
              size={24}
              className={`${
                star <= rating[category] 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {rating[category] > 0 ? ratingLabels[rating[category] - 1] : 'Не оценено'}
        </span>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="CheckCircle" size={32} className="text-green-600" />
            </div>
            <CardTitle>Спасибо за отзыв!</CardTitle>
            <CardDescription>
              Ваш отзыв поможет другим клиентам и улучшит качество наших услуг
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/orders">Перейти к заказам</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/booking">Заказать еще раз</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <Link to={`/orders/${orderId}`}>
            <Button variant="ghost" size="sm">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад к заказу
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Оцените качество услуги</CardTitle>
            <CardDescription>
              Заказ #{order.number} • {order.completedDate}
            </CardDescription>
            
            <div className="flex items-center space-x-3 pt-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={order.cleaner.avatar} alt={order.cleaner.name} />
                <AvatarFallback>ИП</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{order.cleaner.name}</h3>
                <Badge variant="secondary">Клинер</Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Overall Rating */}
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Общая оценка</h3>
              <div className="flex justify-center items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingClick('overall', star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Icon 
                      name="Star" 
                      size={36}
                      className={`${
                        star <= rating.overall 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-lg font-medium text-primary">
                {rating.overall > 0 ? ratingLabels[rating.overall - 1] : 'Выберите оценку'}
              </p>
            </div>

            <Separator />

            {/* Detailed Ratings */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Детальная оценка</h3>
              
              {renderStars('quality', 'Качество уборки', ratingDescriptions.quality)}
              {renderStars('punctuality', 'Пунктуальность', ratingDescriptions.punctuality)}
              {renderStars('politeness', 'Вежливость', ratingDescriptions.politeness)}
              {renderStars('requirements', 'Соблюдение требований', ratingDescriptions.requirements)}
            </div>

            <Separator />

            {/* Text Review */}
            <div className="space-y-4">
              <div>
                <Label className="text-lg font-semibold">Поделитесь впечатлениями</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Что понравилось? Что можно улучшить?
                </p>
              </div>
              
              <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Расскажите о качестве услуги..."
                className="min-h-[120px]"
                maxLength={500}
              />
              
              <div className="text-right text-sm text-muted-foreground">
                {reviewText.length}/500
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">
                Добавьте фото (необязательно)
              </Label>
              
              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Фото ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {photos.length < 5 && (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-primary">
                    <div className="text-center">
                      <Icon name="Plus" size={20} className="mx-auto mb-1" />
                      <span className="text-xs">Добавить</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                Максимум 5 фотографий, до 10MB каждая
              </p>
            </div>

            <Separator />

            {/* Review Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Опубликовать анонимно
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="allow-response"
                  checked={allowResponse}
                  onCheckedChange={setAllowResponse}
                />
                <Label htmlFor="allow-response" className="text-sm">
                  Разрешить ответ клинера
                </Label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <Button 
                className="flex-1"
                onClick={handleSubmit}
                disabled={rating.overall === 0}
              >
                Опубликовать отзыв
              </Button>
              <Button variant="outline" className="flex-1">
                Сохранить черновик
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}