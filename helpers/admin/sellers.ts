const isEdit = ref(false);
const localSellerName = ref("");
const localSellerDescriptionKg = ref("");
const localSellerDescriptionRu = ref("");
const isSellerActive = ref(false);
const isDeleteSellerOpen=ref(false)
const isCreateModalOpen = ref(false);
const createSellerForm = ref([
    { name: "name", placeholder: "ФИО", value: "", error: "", type: "text" },
    {
      name: "descriptionRu",
      placeholder: "Описание",
      value: "",
      error: "",
      type: "textarea",
    },
    {
      name: "descriptionKg",
      placeholder: "Описание (кырг)",
      value: "",
      error: "",
      type: "textarea",
    },
    {
      name: "imageExtension",
      placeholder: "",
      value: "png",
      error: "",
      type: "",
    },
    {
      name: "certificateImageExtension",
      placeholder: "",
      value: "png",
      error: "",
      type: "",
    },
    {
      name: "isActive",
      placeholder: "Активный",
      value: false,
      error: "",
      type: "checkbox",
    },
  ]);

  const image = ref({
    value: "",
    error: "",
    loading: false,
  });
  
  const certificateImage = ref({
    value: "",
    error: "",
    loading: false,
  });
export {
  isEdit,
  localSellerName,
  localSellerDescriptionKg,
  localSellerDescriptionRu,
  isSellerActive,
  isCreateModalOpen,isDeleteSellerOpen,createSellerForm,image,certificateImage
};
