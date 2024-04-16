export type Category = {
  id: string;
  name: string;
  subcategories: [];
  isActive: boolean;
  nameRu: string;
  nameKg: string;
  url: string;
};

export type SubDirectory = {
  categoryId: string;

  description: null;

  id: string;

  name: string;

  products: null;
};
