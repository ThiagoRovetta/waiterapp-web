export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'WAITER';
  createdAt: string;
}
