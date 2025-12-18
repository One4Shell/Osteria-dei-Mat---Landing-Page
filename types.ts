
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'meat' | 'antipasti' | 'traditional' | 'dessert';
  image: string;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}
