type CategorySys = {
  id: string;
  name: string;
  isActive: boolean;
  nameRu: string;
  helpersCategories: [];
  nameKg: string;
  url: string;
  parentId: null;
  products: [];
};

export type Category = {
  category: CategorySys;
  subcategories: CategorySys[];
};

export type SubDirectory = {
  categoryId: string;

  description: null;

  id: string;

  name: string;

  products: null;
};
