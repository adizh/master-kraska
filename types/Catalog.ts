export type CatalogItem = {
  id: string;
  name: string;
  subcategories: [];
};

export type AllCatalog = {
  id: string;
  nameRu: string;
  nameKg: string;
  subdirectory: SubCatalog[];
  isActive: boolean;
  name: string;
};

export type SubCatalog = {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  products: null;
  nameRu: string;
  nameKg: string;
};

export type CatalogCheckbox = {
  name: string;
  id: string;
  values: { id: string; value: boolean }[];
};
