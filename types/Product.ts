import { Review } from "./Review";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  subcategoryId: string;
  brandId: string;
  expenditure: string;
  packing: string;
  brandName: string;
  surfacePreparations: string;
  numberOfLayers: number;
  size: string;
  material: string;
  color: string;
  createdAt: string;
  images: string[];
  reviews: Review[];
  rating: number;
  isPopular:boolean;
  isBeneficial:boolean;
  isFeatured:boolean;
};

export interface ExtendedProduct extends Product {
  count: number;
  totalProdSum: number;
}
