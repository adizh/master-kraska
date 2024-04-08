import { Product } from "./Product";

export type Order = {
  customerId: string;
  productId: string;
  productName: string;
  price: number;
};

export type OrderItem = {
  createdAt: string;

  id: string;

  isPaid: boolean;

  items: Product[];

  orderNumber: string;

  payDate: null;

  payId: null;

  total: number;

  userId: string;
};
