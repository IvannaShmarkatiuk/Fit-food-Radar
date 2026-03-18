export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  tags: string[];
  imageColor: string;
  address: string;
  likes: number;
  imageUrl?: string;
}

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Хлібна Кава',
    rating: 2.2,
    tags: ['Кава', 'Випічка'],
    imageColor: 'from-amber-900 to-orange-800',
    address: 'вул. Коперника, 2',
    likes: 45
  },
  {
    id: '2',
    name: 'Буфет',
    rating: 4.0,
    tags: ['Кава', 'Випічка', 'Перекус'],
    imageColor: 'from-stone-700 to-stone-500',
    address: 'вул. Богдана Гаврилишина, 24 (1 поверх)',
    likes: 312
  },
  {
    id: '3',
    name: 'KFC',
    rating: 4.4,
    tags: ['Фастфуд', 'Курка'],
    imageColor: 'from-red-800 to-red-600',
    address: 'Берестейський проспект, 24 (Smart Plaza)',
    likes: 890
  },
  {
    id: '4',
    name: 'На-децу-до-газди',
    rating: 4.5,
    tags: ['Українська кухня', 'Домашні страви'],
    imageColor: 'from-emerald-800 to-green-700',
    address: 'вул. Богдана Гаврилишина, 12/16',
    likes: 215
  },
  {
    id: '5',
    name: 'Greek House',
    rating: 4.3,
    tags: ['Швидке харчування', 'Шаурма'],
    imageColor: 'from-blue-800 to-cyan-700',
    address: 'Берестейський проспект, 20',
    likes: 180
  },
  {
    id: '6',
    name: 'Kenya Musashi',
    rating: 4.6,
    tags: ['Японська кухня', 'Роли'],
    imageColor: 'from-zinc-900 to-red-950',
    address: 'вул. Богдана Гаврилишина, 7',
    likes: 124
  },
  {
    id: '7',
    name: 'Пузата Хата',
    rating: 4.5,
    tags: ['Українська кухня', 'Обід'],
    imageColor: 'from-orange-800 to-red-900',
    address: 'вул. Політехнічна (Смарт Плаза)',
    likes: 1100
  },
  {
    id: '8',
    name: 'Сушія',
    rating: 4.2,
    tags: ['Японська кухня', 'Суші'],
    imageColor: 'from-rose-900 to-red-950',
    address: 'Берестейський проспект, 24',
    likes: 290
  },
  {
    id: '9',
    name: 'Юджин Бургер',
    rating: 4.4,
    tags: ['Бургери', 'Фастфуд'],
    imageColor: 'from-yellow-900 to-orange-950',
    address: 'вул. Довженка, 1',
    likes: 156
  },
  {
    id: '10',
    name: 'Львівські Круасани',
    rating: 4.8,
    tags: ['Випічка', 'Кава'],
    imageColor: 'from-yellow-700 to-amber-900',
    address: 'ст. м. Політехнічний інститут',
    likes: 740
  },
  {
    id: '11',
    name: 'Hop Hey',
    rating: 4.1,
    tags: ['Напої', 'Закуски'],
    imageColor: 'from-yellow-800 to-yellow-600',
    address: 'вул. Кирило-Мефодіївська, 2',
    likes: 95
  }
];