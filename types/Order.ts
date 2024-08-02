export type Order = {
  customerId: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  colorationCode:string,
  promocode?:string |null
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
  status: string;
  productId: string;
  productName: string;
  productNameKg: string;
  productNameRu: string;
  productDescriptionRu: string;
  productDescriptionKg: string;
  productDescription: string;
  quantity: number;
  image: string;
};
export type OrderItem = {
  createdAt: string;
  id: string;
  isPaid: boolean;
  items: UserOrder[];
  orderNumber: string;
  payDate: null;
  status: string;
  payId: null;
  total: number;
  userId: string;
};
