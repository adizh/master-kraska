<template>
  <form @submit.prevent="checkInputs">
    <div class="mt-3 mb-4">
      <span class="err-input-msg d-block">*Обязательные поля</span>
    </div>

    <div class="flex flex-column gap-1 mb-4">
      <label for="title">*Картинка</label>
      <input type="file" id="title" class="basic-input" @change="handleImage" />
      <span v-if="image.loading">Загрузка...</span>
      <span class="err-input-msg" v-else-if="!image.loading && image.error">{{
        image?.error
      }}</span>

      <img
        v-if="image.value && !image?.error?.length"
        :src="image.value"
        alt="banner"
        class="banner"
      />
    </div>

    <div class="flex flex-column gap-1 mb-4">
      <label for="title">Заголовок</label>
      <input type="text" id="title" class="basic-input" v-model="titleRu" />
    </div>

    <div class="flex flex-column gap-1 mb-4">
      <label for="titleKg">Заголовок (кырг)</label>
      <input type="text" id="titleKg" class="basic-input" v-model="titleKg" />
    </div>

    <div class="flex flex-column gap-1 mb-4">
      <label for="descriptionRu">Описание</label>
      <input
        type="text"
        id="descriptionRu"
        class="basic-input"
        v-model="descriptionRu"
      />
    </div>

    <div class="flex flex-column gap-1 mb-4">
      <label for="descriptionKg">Описание (кырг)</label>
      <input
        type="text"
        id="descriptionKg"
        class="basic-input"
        v-model="descriptionKg"
      />
    </div>

    <button class="pink-button" type="submit">Создать</button>
  </form>
</template>

<script setup lang="ts">
const titleRu = ref("");
const titleKg = ref("");
const descriptionRu = ref("");
const descriptionKg = ref("");
const image = ref({ loading: false, value: "", error: "" });
const newStore=useNewsStore()
const targetSizeBytes = 150 * 1024;

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

const emits = defineEmits<{
  closeCreateModal: [];
}>();

const creaseSlider = async () => {
  try {
    const body = {
      titleRu: titleRu.value,
      titleKg: titleKg.value,
      descriptionRu: descriptionRu.value,
      descriptionKg: descriptionKg.value,
      image: image.value.value,
      imageExtension: "png",
    };

    const response = await http.post("/api/v1/Slider/create-slider", body);

    if (response.status === 200) {
      useNotif("success", "Баннер создан!", "Успешно");
      emits("closeCreateModal");
      newStore.fetchSliders()
    }
  } catch (err) {
    console.log(err);
    useNotif("error", "Произошла ошибка", "Ошибка");
  }
};

const checkInputs = () => {
  if (
    image.value.value &&
    !image.value?.error?.length &&
    !image.value.loading
  ) {
    creaseSlider();
  } else {
    useNotif("error", "Убедитесь что заполнили поля без ошибок", "Ошибка");
  }
};


</script>

<style scoped>
.banner {
  width: 150px;
}
</style>
