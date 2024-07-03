<template>
  <UIModal
    :show-modal="isOpen"
    title="Обновить категорию"
    @close-modal="$emit('closeModal')"
  >
    <div class="ui-dropdown col-6">
      <div class="selected-option basic-input" @click="toggleCreateCategory">
        <span>
          {{ categoryTitle }}
        </span>

        <img
          class="arrow"
          :class="{ rotated: openCategory }"
          src="../../../assets/icons/icon=components-closed-arrow.svg"
          alt="open-arrow"
        />
      </div>

      <Transition name="slide-fade">
        <div>
          <ul class="ui-options" v-if="openCategory">
            <input
              type="text"
              class="basic-input"
              @input="
                (event: any) =>
                  catalogStore.filterLinkedCategories(event?.target?.value)
              "
            />
            <li
              v-for="(item, index) in catalogStore.getLinkedCategories"
              :key="item?.id"
              @click="selectCategory(item)"
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
          v-model="categoryInputs.nameRu.value"
          class="basic-input"
          @input="validate('nameRu', 'string')"
        />
        <span class="err-input-msg" v-if="categoryInputs.nameRu.error">{{
          categoryInputs.nameRu.error
        }}</span>
      </div>
      <div>
        <label for="name">Название (кырг)</label>
        <input
          type="text"
          v-model="categoryInputs.nameKg.value"
          class="basic-input"
          @input="validate('nameKg', 'string')"
        />
        <span class="err-input-msg" v-if="categoryInputs.nameKg.error">{{
          categoryInputs.nameKg.error
        }}</span>
      </div>

      <div>
        <label for="name">URL</label>
        <input
          type="text"
          v-model="categoryInputs.url.value"
          class="basic-input"
          @input="validate('url', 'string')"
        />
        <span class="err-input-msg" v-if="categoryInputs.url.error">{{
          categoryInputs.url.error
        }}</span>
      </div>

      <div>
        <div
          class="ui-dropdown col-6"
          v-if="categoryInputs?.parentId?.value !== null"
        >
          <label for="name">Категория родителя</label>
          <div
            class="selected-option basic-input"
            @click="isTopCategoryOpen = !isTopCategoryOpen"
          >
            <span>
              {{ parentTitle?.nameRu }}
            </span>

            <img
              class="arrow"
              :class="{ rotated: isTopCategoryOpen }"
              src="../../../assets/icons/icon=components-closed-arrow.svg"
              alt="open-arrow"
            />
          </div>

          <Transition name="slide-fade">
            <div>
              <ul class="ui-options" v-if="isTopCategoryOpen">
                <input
                  type="text"
                  class="basic-input"
                  @input="
                    (event: any) =>
                      catalogStore.filterTopCategories(event?.target?.value)
                  "
                />
                <li
                  v-for="(item, index) in catalogStore.getTopCategories"
                  :key="item?.id"
                  @click="selectTopCategory(item)"
                >
                  {{ item?.nameRu }}
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>

      <div>
        <label for="name">Активный</label>
        <input
          type="checkbox"
          v-model="categoryInputs.isActive.value"
          class="basic-input"
        />
      </div>

      <div>
        <button class="pink-button" type="submit">Обновить</button>
      </div>
    </form>
  </UIModal>
</template>

<script setup lang="ts">
import { CategorySys } from "~/types/Category";

const { handleValues } = useInputValidation();
const newsStore = useNewsStore();
const openCategory = ref(false);
const isTopCategoryOpen = ref(false);
const catalogStore = useCatalogStore();

const props = defineProps({
  isOpen: Boolean,
});
const isFormOpen = ref(false);
const emit = defineEmits(["closeModal"]);
const selectedCategory = ref({} as CategorySys);

const categoryInputs = ref({
  nameKg: { value: "", type: "string", error: "" },
  nameRu: { value: "", type: "string", error: "" },
  url: { value: "", type: "string", error: "" },
  parentId: { value: "", type: "string", error: "" },
  isActive: { value: false, type: "string", error: "" },
});
const toggleCreateCategory = () => {
  openCategory.value = !openCategory.value;
};

const categoryTitle = computed(() => {
  if (selectedCategory?.value?.id) {
    return selectedCategory?.value?.nameRu;
  } else {
    return "Выбрать категорию";
  }
});
const parentTitle = ref({} as CategorySys);

const selectTopCategory = (item: CategorySys) => {
  parentTitle.value = item;
  isTopCategoryOpen.value = false;
};
const selectCategory = async (item: CategorySys) => {
  console.log(item);
  selectedCategory.value = item;
  if (item?.parentId) {
    await catalogStore.fetchLinkedCategoryById(item?.parentId);
    parentTitle.value = catalogStore.getLinkedCategory;
    console.log(
      "catalogStore.getLinkedCategory",
      catalogStore.getLinkedCategory,
    );
  }
  for (const key in categoryInputs.value) {
    const inputValue = item[key as keyof typeof categoryInputs.value];
    if (inputValue !== null && inputValue !== undefined) {
      categoryInputs.value[key as keyof typeof categoryInputs.value].value =
        inputValue;
    }
  }

  isFormOpen.value = true;
  openCategory.value = false;
};

const validate = (field: string, type: string) => {
  handleValues(categoryInputs.value, field, type);
};

const submitEdit = async () => {
  let body = {} as any;
  for (const key in categoryInputs.value) {
    if (key !== "parentId") {
      body[key as keyof typeof body] =
        categoryInputs.value[key as keyof typeof categoryInputs.value]?.value;
    }
  }

  body = { ...body, parentId: parentTitle?.value?.id };
  console.log("body", body);
  try {
    const response = await http.put(
      `/api/v1/Category/update-category/${selectedCategory?.value?.id}`,
      body,
    );
    console.log("response", response);
    if (response.status === 200) {
      useNotif("success", "Категория обновлена!", "Успешно");

      setTimeout(() => {
        emit("closeModal");
        for (const key in categoryInputs.value) {
          categoryInputs.value[key as keyof typeof categoryInputs.value].value =
            "";
          categoryInputs.value[key as keyof typeof categoryInputs.value].error =
            "";
          categoryInputs.value[key as keyof typeof categoryInputs.value].type =
            "";
          selectedCategory.value = {} as CategorySys;
          catalogStore.fetchAllCategoriesLinked();
          emit("closeModal");
          isFormOpen.value = false;
        }
      }, 700);
    }
  } catch (err) {
    console.log(err);
  }
};
const editBrand = () => {
  for (const fieldName in categoryInputs.value) {
    if (fieldName === "isActive" || fieldName === "parentId") {
      const fieldType =
        categoryInputs.value[fieldName as keyof typeof categoryInputs.value]
          ?.type;
      handleValues(categoryInputs.value, fieldName, fieldType);
    }
  }
  const hasError = Object.values(categoryInputs.value).some(
    (input) => input.error !== "",
  );

  if (!hasError && parentTitle?.value?.id) {
    console.log("NO ERROR!");
    submitEdit();
  } else {
    console.log("there is some erro");
  }
};

onMounted(() => {
  catalogStore.fetchAllCategoriesLinked();

  catalogStore.fetchAllCategories();
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
