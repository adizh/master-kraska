export type Brands = {
  id: string;
  name: string;
  logo: string;
  isActive: boolean;
  order: number;
};
export type Seller = {
  id: string;
  name: string;
  descriptionRu: string;
  descriptionKg: string;
  image: string;
  certificateImage: string;
  isActive: boolean;
  sellerInfo: string;
};

export type Certificate = {
  id: string;
  descriptionRu: string;
  descriptionKg: string;
  preview: string;
  image: string;
  isActive: boolean;
};
