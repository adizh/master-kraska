<template>
  <UIModal
    :show-modal="isOpen"
    title="Обновить новость"
    @close-modal="$emit('closeModal')"
  >
    <div class="ui-dropdown col-6">
      <div class="selected-option basic-input" @click="toggleCreateCategory">
        <span>
          {{ newsTitle }}
        </span>

        <img
          class="arrow"
          :class="{ rotated: openNews }"
          src="../../../assets/icons/icon=components-closed-arrow.svg"
          alt="open-arrow"
        />
      </div>

      <Transition name="slide-fade">
        <div>
          <ul class="ui-options" v-if="openNews">
            <input
              type="text"
              class="basic-input"
              @input="
                (event: any) => newsStore.filterNews(event?.target?.value)
              "
            />
            <li
              v-for="(item, index) in newsStore.getAllNews"
              :key="item?.id"
              @click="selectNews(item)"
            >
              {{ item?.nameRu }}
            </li>
          </ul>
        </div>
      </Transition>
    </div>

    <form v-if="isFormOpen" class="admin-edit-form" @submit.prevent="editBrand">
      <div>
        <label for="name">Название</label>
        <input
          type="text"
          v-model="newsInputs.nameRu.value"
          class="basic-input"
          @input="validate('nameRu', 'string')"
        />
        <span class="err-input-msg" v-if="newsInputs.nameRu.error">{{
          newsInputs.nameRu.error
        }}</span>
      </div>
      <div>
        <label for="name">Название (кырг)</label>
        <input
          type="text"
          v-model="newsInputs.nameKg.value"
          class="basic-input"
          @input="validate('nameKg', 'string')"
        />
        <span class="err-input-msg" v-if="newsInputs.nameKg.error">{{
          newsInputs.nameKg.error
        }}</span>
      </div>

      <div>
        <label for="name">Описание</label>
        <input
          type="text"
          v-model="newsInputs.descriptionRu.value"
          class="basic-input"
          @input="validate('descriptionRu', 'string')"
        />
        <span class="err-input-msg" v-if="newsInputs.descriptionRu.error">{{
          newsInputs.descriptionRu.error
        }}</span>
      </div>

      <div>
        <label for="name">Описание (кырг)</label>
        <input
          type="text"
          v-model="newsInputs.descriptionKg.value"
          class="basic-input"
          @input="validate('descriptionKg', 'string')"
        />
        <span class="err-input-msg" v-if="newsInputs.descriptionKg.error">{{
          newsInputs.descriptionKg.error
        }}</span>
      </div>

      <div>
        <label for="name">Текст</label>
        <textarea
          type="text"
          v-model="newsInputs.textRu.value"
          class="basic-input"
          @input="validate('textRu', 'string')"
        ></textarea>
        <span class="err-input-msg" v-if="newsInputs.textRu.error">{{
          newsInputs.textRu.error
        }}</span>
      </div>

      <div>
        <label for="name">Текст (кырг)</label>
        <textarea
          type="text"
          v-model="newsInputs.textKg.value"
          class="basic-input"
          @input="validate('textKg', 'string')"
        ></textarea>
        <span class="err-input-msg" v-if="newsInputs.textKg.error">{{
          newsInputs.textKg.error
        }}</span>
      </div>

      <div>
        <label for="name">Активный</label>
        <input
          type="checkbox"
          v-model="newsInputs.isActive.value"
          class="basic-input"
        />
      </div>

      <div>
        <img
          :src="newsInputs.image.value"
          alt="variant"
          style="cursor: pointer"
          @click="openFileInput"
          class="admin-image"
        />
        <input
          id="fileInput"
          ref="fileInput"
          type="file"
          style="display: none"
          @change="(event) => handleNewVarImage(event)"
        />
        <span class="err-input-msg" v-if="newsInputs.image.loading"
          >Загрузка</span
        >
        <span
          class="err-input-msg"
          v-if="!newsInputs.image.loading && newsInputs.image.error"
          >{{ newsInputs.image.error }}</span
        >
      </div>
      <div>
        <button class="pink-button" type="submit">Обновить</button>
      </div>
    </form>
  </UIModal>
</template>

<script setup lang="ts">
import Id from "~/pages/news/[id].vue";
import { Brands } from "~/types/Brands";
import { News } from "~/types/News";
const { handleValues } = useInputValidation();
const newsStore = useNewsStore();
const openNews = ref(false);
const isCategoryCreateOpen = ref(false);
const brandsStore = useBrandsStore();
const props = defineProps({
  isOpen: Boolean,
});
const isFormOpen = ref(false);
const emit = defineEmits(["closeModal"]);
const selectedNews = ref({} as News);

const newsInputs = ref({
  nameKg: { value: "", type: "string", error: "" },
  nameRu: { value: "", type: "string", error: "" },
  descriptionKg: { value: "", type: "string", error: "" },
  descriptionRu: { value: "", type: "string", error: "" },
  textKg: { value: "", type: "string", error: "" },
  textRu: { value: "", type: "string", error: "" },
  image: { value: "", type: "string", error: "", loading: false },
  isActive: { value: false, type: "string", error: "" },
});
const toggleCreateCategory = () => {
  openNews.value = !openNews.value;
};

const openFileInput = () => {
  const fileInput = document.getElementById("fileInput") as HTMLElement;
  fileInput.click();
};
const handleNewVarImage = async (event: any) => {
  const targetSizeBytes = 150 * 1024;
  newsInputs.value.image.loading = true;

  newsInputs.value.image.error = "";
  const result = await useCompressImage(event);
  if (result?.size > targetSizeBytes) {
    const bigOne = (await useConvertToBase64(
      event?.target?.files[0],
    )) as unknown as string;
    newsInputs.value.image.value = bigOne;
    newsInputs.value.image.error = "Размер файла слишком большой";
    newsInputs.value.image.loading = false;
  } else if (result.size < targetSizeBytes && result && result !== undefined) {
    newsInputs.value.image.loading = false;

    newsInputs.value.image.error = "";
    const base64StringNewImage = (await useConvertToBase64(
      result,
    )) as unknown as string;
    newsInputs.value.image.value = base64StringNewImage as unknown as string;
  }
};

const newsTitle = computed(() => {
  if (selectedNews?.value?.id) {
    return selectedNews?.value?.nameRu;
  } else {
    return "Выбрать новость";
  }
});

const selectNews = (item: News) => {
  console.log(item);
  selectedNews.value = item;
  for (const key in newsInputs.value) {
    newsInputs.value[key as keyof typeof newsInputs.value].value =
      item[key as keyof typeof item];
  }

  console.log("newsInputs", newsInputs);
  isFormOpen.value = true;
  openNews.value = false;
};

const validate = (field: string, type: string) => {
  handleValues(newsInputs.value, field, type);
};

const submitEdit = async () => {
  let body = {} as any;
  for (const key in newsInputs.value) {
    body[key as keyof typeof body] =
      newsInputs.value[key as keyof typeof newsInputs.value]?.value;
  }

  if (body?.image?.startsWith("http")) {
    body = { ...body, image: null, extension: "png" };
  } else {
    body = { ...body, extension: "png" };
  }
  console.log("body", body);
  try {
    const response = await http.put(
      `/api/v1/News/update-news/${selectedNews?.value?.id}`,
      body,
    );
    console.log("response", response);
    if (response.status === 200) {
      useNotif("success", "Новость обновлена!", "Успешно");

      setTimeout(() => {
        emit("closeModal");
        for (const key in newsInputs.value) {
          newsInputs.value[key as keyof typeof newsInputs.value].value = "";
          newsInputs.value[key as keyof typeof newsInputs.value].error = "";
          newsInputs.value[key as keyof typeof newsInputs.value].type = "";
          selectedNews.value = {} as News;
          newsStore.fetchAllNews();
          isFormOpen.value = false;
        }
      }, 700);
    }
  } catch (err) {
    console.log(err);
  }
};
const editBrand = () => {
  for (const fieldName in newsInputs.value) {
    if (fieldName !== "image" && fieldName !== "isActive") {
      const fieldType =
        newsInputs.value[fieldName as keyof typeof newsInputs.value]?.type;
      handleValues(newsInputs.value, fieldName, fieldType);
    }
  }
  const hasError = Object.values(newsInputs.value).some(
    (input) => input.error !== "",
  );

  if (
    !hasError &&
    newsInputs.value.image?.value?.length &&
    !newsInputs.value?.image?.error?.length
  ) {
    console.log("NO ERROR!");
    submitEdit();
  } else {
    console.log("there is some erro");
  }
};

onMounted(() => {
  newsStore.fetchAllNews();
});
</script>

<style scoped lang="scss">
@import "../../../assets/dropdown.scss";

.admin-image {
  width: 50%;
}

.admin-edit-form {
  @include flex(column, start, start);
  padding-left: 0.5rem;
  padding-bottom: 30px;
  margin-top: 25px;
  div {
    width: 100%;
    @include flex(column, start, start, 5px);
  }
  input,
  textarea {
    width: 100%;
  }
}
</style>
