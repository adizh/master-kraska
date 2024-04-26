import { Product } from "./Product";

export type Order = {
  customerId: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
};

export type UserOrder = {
  customerAddress: string;
  customerEmail: string;
  customerFullName: string;
  customerId: string;
  id: string;
  orderId: string;
  phoneNumber: string;
  price: number;
  productId: string;
  productName: string;
  quantity: number;
};
export type OrderItem = {
  createdAt: string;
  id: string;
  isPaid: boolean;
  items: UserOrder[];
  orderNumber: string;
  payDate: null;
  payId: null;
  total: number;
  userId: string;
};
