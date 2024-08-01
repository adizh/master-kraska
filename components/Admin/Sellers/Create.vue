<template>
  <form @submit.prevent="createSeller">
    <div class="mt-3">
      <span class="err-input-msg d-block mb-2">Все поля обязательны</span>
    </div>

    <div class="mb-3 mt-3 images">
      <label for="image">Фото сотрудкника</label>
      <input type="file" id="image" @change="handleImage" />

      <span v-if="image.loading">Загрузка...</span>

      <span class="err-input-msg" v-else-if="!image.loading && image.error">{{
        image?.error
      }}</span>
    </div>

    <div class="mb-5 mt-5 images">
      <label for="image">Фото сертификата</label>
      <input type="file" id="image" @change="handleCertificateImage" />

      <span v-if="certificateImage.loading">Загрузка...</span>

      <span
        class="err-input-msg"
        v-else-if="!certificateImage.loading && certificateImage.error"
        >{{ certificateImage?.error }}</span
      >
    </div>

    <div
      v-for="item in createSellerForm"
      :key="item?.name"
      class="flex flex-column mb-4 gap-1"
    >
      <label v-if="item.type?.length" :for="item?.name">{{
        item?.placeholder
      }}</label>
      <input
        class="basic-input"
        v-if="item.type?.length && item?.type !== 'textarea'"
        v-model="item.value"
        :type="item?.type"
        :id="item?.name"
      />
      <textarea
        class="basic-input"
        v-else-if="item.type?.length && item?.type === 'textarea'"
        v-model="item.value as any"
        :type="item?.type"
        :id="item?.name"
      ></textarea>
    </div>

    <button class="pink-button" type="submit">Добавить</button>
  </form>
</template>

<script setup lang="ts">
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
const targetSizeBytes = 150 * 1024;

const createSellerRequest = async () => {
  try {
    const bodyInput = createSellerForm.value.reduce((acc: any, item) => {
      acc[item?.name] = item.value;
      return acc;
    }, {});

    const body = {
      ...bodyInput,
      image: image.value.value,
      certificateImage: certificateImage.value.value,
    };
    console.log("body", body);
    const response = await http.post("/api/v1/Seller/create-seller", body);
    if (response.status === 200) {
      useNotif("success", "Продавец добавлен", "Успешно");

      setTimeout(() => {
        window.location.reload();
      }, 700);
    }
  } catch (err) {
    console.log(err);
    useNotif("error", "Произошла ошибка", "Ошибка");
  }
};

const createSeller = () => {
  const allValuesNonEmpty = createSellerForm.value.every((item) => {
    if (typeof item.value === "boolean") {
      return true;
    }
    return item.value.length > 0;
  });

  if (
    allValuesNonEmpty &&
    !certificateImage?.value?.error?.length &&
    !image.value.error?.length &&
    certificateImage.value.value?.length &&
    image.value.value?.length
  ) {
    createSellerRequest();
  } else {
    useNotif(
      "error",
      "Убедитесь что нету ошибок и все поля заполнены",
      "Ошибка",
    );
  }
};

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

const handleImage = async (event: any) => {
  image.value.loading = true;
  console.log("loading", image.value.loading);
  const result = await useCompressImage(event);

  if (result?.size > targetSizeBytes) {
    image.value.error = "Размер файла слишком большой";
    image.value.loading = false;
  } else if (result.size < targetSizeBytes && result && result !== undefined) {
    image.value.error = "";
    image.value.loading = false;
    const base64StringNewImage = (await useConvertToBase64(
      result,
    )) as unknown as string;

    image.value.value = base64StringNewImage;
  }
};

const handleCertificateImage = async (event: any) => {
  certificateImage.value.loading = true;

  const result = await useCompressImage(event);

  if (result?.size > targetSizeBytes) {
    certificateImage.value.error = "Размер файла слишком большой";
    certificateImage.value.loading = false;
  } else if (result.size < targetSizeBytes && result && result !== undefined) {
    certificateImage.value.error = "";
    certificateImage.value.loading = false;
    const base64StringNewImage = (await useConvertToBase64(
      result,
    )) as unknown as string;

    certificateImage.value.value = base64StringNewImage;
  }
};
</script>

<style scoped lang="scss">
.images span {
  display: block;
}
</style>
