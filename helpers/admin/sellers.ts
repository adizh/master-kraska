const isEdit = ref(false);
const localSellerName = ref("");
const localSellerDescriptionKg = ref("");
const localSellerDescriptionRu = ref("");
const isSellerActive = ref(false);
const isDeleteSellerOpen = ref(false);
const isCreateModalOpen = ref(false);
const targetSizeBytes = 150 * 1024;
const createSellerForm = ref([
  { name: "name", placeholder: "ФИО", value: "", error: "", type: "text" },
  {
    name: "descriptionRu",
    placeholder: "Описание",
    value: "",
    error: "",
    type: "textarea"
  },
  {
    name: "descriptionKg",
    placeholder: "Описание (кырг)",
    value: "",
    error: "",
    type: "textarea"
  },
  {
    name: "imageExtension",
    placeholder: "",
    value: "png",
    error: "",
    type: ""
  },
  {
    name: "certificateImageExtension",
    placeholder: "",
    value: "png",
    error: "",
    type: ""
  },
  {
    name: "isActive",
    placeholder: "Активный",
    value: false,
    error: "",
    type: "checkbox"
  }
]);

const image = ref({
  value: "",
  error: "",
  loading: false
});

const certificateImage = ref({
  value: "",
  error: "",
  loading: false
});

const updateImage = ref({
  value: "",
  error: "",
  loading: false
});
const updateCertificateImage = ref({
  value: "",
  error: "",
  loading: false
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
      result
    )) as unknown as string;

    updateImage.value.value = base64StringNewImage;
  }
};

const handleCertificateImageUpdate = async (event: any) => {
  updateCertificateImage.value.loading = true;

  const result = await useCompressImage(event);

  if (result?.size > targetSizeBytes) {
    updateCertificateImage.value.error = "Размер файла слишком большой";
    updateCertificateImage.value.loading = false;
  } else if (result.size < targetSizeBytes && result && result !== undefined) {
    updateCertificateImage.value.error = "";
    updateCertificateImage.value.loading = false;
    const base64StringNewImage = (await useConvertToBase64(
      result
    )) as unknown as string;

    updateCertificateImage.value.value = base64StringNewImage;
  }
};

export {
  isEdit,
  localSellerName,
  localSellerDescriptionKg,
  localSellerDescriptionRu,
  isSellerActive,
  updateImage,
  updateCertificateImage,
  isCreateModalOpen,
  isDeleteSellerOpen,
  createSellerForm,
  image,
  certificateImage,
  handleCertificateImageUpdate,
  handleImageUpdate
};
