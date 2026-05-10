export interface Restaurant {
  id: number;
  name: string;
  address: string;
  rating: number;
  imageUrl?: string | null;
  mapImageUrl?: string | null;
  categories?: { id: number; name: string }[] | string[];
}