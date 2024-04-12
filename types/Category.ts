export type Category = {
  id: string;
  name: string;
  subcategories: [];
};

export type SubDirectory = {
  categoryId: string;

  description: null;

  id: string;

  name: string;

  products: null;
};
