export const getBrandId = async (brandId: string) => {
  const brandsStore = useBrandsStore();
  const response = await brandsStore.fetchAllBrandId(brandId);
  return await response
};
