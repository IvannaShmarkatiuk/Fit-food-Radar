export interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  rating: number;
  imageUrl: string;
  categories: string[];
  tags: string[];
  imageColor: string;
  likes: number;
}