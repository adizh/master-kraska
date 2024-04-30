import { Review } from "./Review";

export type Product = {
  id: string;
  name: string;
  nameKg: string;
  nameRu: string;

  description: string;
  descriptionKg: string;
  descriptionRu: string;
  shortDescriptionKg: string;
  shortDescriptionRu: string;
  shortDescription: string;
  categoryId: string;
  subcategoryId: string;
  brandId: string;
  expenditure: string;
  packing: string;
  brandName: string;
  surfacePreparations: string;
  numberOfLayers: number;
  rating: number;
  isPopular: boolean;
  isFeatured: boolean;
  isBeneficial: boolean;
  washableCoating: boolean;
  withoutSmell: boolean;
  weatherResistantCoating: boolean;
  wearResistantCoating: boolean;
  approvedByThePaintQualityAssociation: boolean;
  fastDrying: boolean;
  dirtAndWaterRepellentCoating: boolean;
  createdAt: string;
  subdirectoryId: string[];
  images: string[];
  reviews: Review[];
  price: number;
  helpersMain: {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    products: [];
    category: null;
  }[];
  products: [];
  category: null;
  variants?: { id: string; size: string; price: number }[];
};

export interface ExtendedProduct extends Product {
  count: number;
  totalProdSum: number;
  initPrice: number;
  image?:string
  productName?:string
  productDescription?:string
}
