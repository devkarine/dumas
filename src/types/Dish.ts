import { Category } from './Category';
import { Chef } from './Chef';
import { Rating } from './Rating';

export interface Dish {
  id?: string;
  chef_id: string;
  name: string;
  description: string;
  available: boolean;
  active: boolean;
  unit_price: number;
  categories: Category[];
  images: string[];
  ratings: Rating[];
  chef: Chef;
  liked_by_me: boolean;
  disliked_by_me: boolean;
  distance?: number;
}
