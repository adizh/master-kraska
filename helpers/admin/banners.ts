const isCreateBannerOpen = ref(false);
const isDeleteSliderOpen = ref(false);
const targetSizeBytes = 150 * 1024;
const updateImage = ref({
  value: "",
  error: "",
  loading: false,
});

const handleImageUpdate = async (event: any) => {
  updateImage.value.loading = true;

  const result = await useCompressImage(event);

  if (result?.size > targetSizeBytes) {
    updateImage.value.error = "Размер файла слишком большой";
    updateImage.value.loading = false;
  } else if (result.size < targetSizeBytes && result && result !== undefined) {
    updateImage.value.error = "";
    updateImage.value.loading = false;
    const base64StringNewImage = (await useConvertToBase64(
      result,
    )) as unknown as string;

    updateImage.value.value = base64StringNewImage;
  }
};
export {
  isCreateBannerOpen,
  handleImageUpdate,
  updateImage,
  isDeleteSliderOpen,
};
