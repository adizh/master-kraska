import { SubDirHelper } from "./Catalog";
import { Category, CategorySys } from "./Category";
import { Review } from "./Review";
import { Variant } from "./Variant";

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

  brandName: string;

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
  categories: CategorySys[];
  helpersMain: SubDirHelper[];
  size: string;
  colorType: number;
  products: [];
  category: null;
  variants?: Variant[];
  dryingTime: string;
  consumption: string;
};

export interface ExtendedProduct extends Product {
  count: number;
  totalProdSum: number;
  initPrice: number;
  image?: string;
  productName?: string;
  productDescription?: string;
}
