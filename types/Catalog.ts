export type CatalogItem = {
  id: string;
  name: string;
  subcategories: [];
};

export type AllCatalog = {
  id: string;
  name: string;
  subdirectory: SubCatalog[];
};

export type SubCatalog = {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  products: null;
};

export type CatalogCheckbox = {
  name: string;
  id: string;
  values: { id: string; value: boolean }[]
};
