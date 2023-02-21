export interface Order {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: {
    _id: string;
    quantity: number;
    product: {
      name: string;
      imagePath: string;
      price: number;
      category: {
        _id: string;
        name: string;
        icon: string;
      }
    }
  }[]
  archived: boolean;
  createdAt: string;
}
