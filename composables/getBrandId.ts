export const getBrandId = async (brandId: string) => {
  const brandsStore = useBrandsStore();
  const response = await brandsStore.fetchAllBrandId(brandId);
  console.log("response in getBrandId composabel", response);
  return await response?.name;
};
