import { Category } from './Category';

export interface Ingredient {
  _id?: string;
  name: string;
  icon: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number,
  ingredients: Ingredient[];
  category: Category,
}
