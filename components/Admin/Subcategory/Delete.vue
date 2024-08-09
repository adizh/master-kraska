<template>
  <UIModal
  
    :show-modal="isOpen"

    title="Удалить подкатегорию"

    @close-modal="$emit('closeModal')"
  >
    <form
      class="mt-4 flex flex-column align-items-center"

      @submit.prevent="deleteSubcategory"
    >
      <div class="ui-dropdown">
        <div
          class="selected-option basic-input"

          @click="isSubcategoryOpen = !isSubcategoryOpen"
        >
          <span>
            {{
              !selectedCategoryId?.nameRu
                ? defaultText
                : selectedCategoryId?.nameRu
            }}
          </span>
          <img
            class="arrow"
            :class="{ rotated: isSubcategoryOpen }"
            src="../../../assets/icons/icon=components-closed-arrow.svg"
            alt="open-arrow"
          />
        </div>

        <Transition name="slide-fade">
          <div>
            <ul class="ui-options" v-if="isSubcategoryOpen">
              <input
                type="text"
                class="basic-input"
                @input="filterCategories"
              />
              <li
                v-for="(item, index) in catalogStore.getTopCategories"
                :key="item?.id"
                @click="selectCategory(item)"
              >
                {{ item?.nameRu }}
              </li>
            </ul>
          </div>
        </Transition>
      </div>

      <div class="ui-dropdown mt-4" v-if="openSubCategories">
        <div
          class="selected-option basic-input"
          @click="isDeleteSubcategoryOpen = !isDeleteSubcategoryOpen"
        >
          <span>
            {{
              !selectedSubcategory?.nameRu
                ? defaultTextSubcategory
                : selectedSubcategory?.nameRu
            }}
          </span>
          <img
            class="arrow"
            :class="{ rotated: isDeleteSubcategoryOpen }"
            src="../../../assets/icons/icon=components-closed-arrow.svg"
            alt="open-arrow"
          />
        </div>

        <Transition name="slide-fade">
          <div>
            <ul class="ui-options" v-if="isDeleteSubcategoryOpen">
              <input

                type="text"

                class="basic-input"

                @input="filterSubcategories"
                
              />
              <li
                v-if="catalogStore.getFilteredSubcategories?.length > 0"
                v-for="(item, index) in catalogStore.getFilteredSubcategories"
                :key="item?.id"
                @click="selectSubCategory(item)"
              >
                {{ item?.nameRu }}
              </li>
              <li v-else>Нет данных</li>
            </ul>
          </div>
        </Transition>
      </div>

      <button
        type="submit"
        class="pink-button"
        :disabled="disabledForm"
        :class="{ 'diabled-btn': disabledForm }"
      >
        Удалить
      </button>
    </form>
  </UIModal>
</template>

<script setup lang="ts">
import {
  isSubcategoryOpen,
  selectedCategoryId,
  defaultText,
  isDeleteSubcategoryOpen,
  selectedSubcategory,
  openSubCategories,
  defaultTextSubcategory,
  selectSubCategory,
} from "@/helpers/admin/subcategory";

import { CategorySys } from "~/types/Category";

const emit = defineEmits(["closeModal"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
});

const catalogStore = useCatalogStore();

const filterSubcategories = (event: Event) => {
  const target = event.target as HTMLInputElement;
  catalogStore.filterSubcategoriesByCategory(target.value);
};

const disabledForm = computed(() => {
  if (
    catalogStore.getFilteredSubcategories?.length > 0 &&
    selectedSubcategory?.value?.id
  ) {
    return false;
  } else {
    return true;
  }
});

const selectCategory = async (category: CategorySys) => {
  selectedCategoryId.value = category;
  isSubcategoryOpen.value = false;
  catalogStore.filterTopCategories("");
  await catalogStore.fetchCategoryById(category?.id);
  openSubCategories.value = true;
  selectedSubcategory.value = {} as CategorySys;
};

const filterCategories = (event: Event) => {
  const target = event.target as HTMLInputElement;
  catalogStore.filterTopCategories(target.value);
};

const deleteSubcategory = async () => {
  if (selectedSubcategory?.value?.id && selectedCategoryId?.value?.id) {
    try {
      const response = await http.delete(
        `/api/v1/Helpers/delete-subdirectory-by-id/${selectedSubcategory?.value?.id}`,
      );
      if (response.status === 200) {
        useNotif("success", "Подкатегория удалена!", "Успешно");
        emit("closeModal");
        isDeleteSubcategoryOpen.value = false;
        isSubcategoryOpen.value = false;
      }
    } catch (err) {
      console.log(err);
      useNotif("error", "Ошибка при удалении подкатегории", "Ошибка");
    }
  }
};

onMounted(() => {
  catalogStore.fetchAllCategories();
});
</script>

<style scoped lang="scss">
@import "../../../assets/dropdown.scss";
@import "../../../assets/dropdown.scss";

form {
  input {
    width: 100%;
    margin-top: 7px;
  }
}

.form-block {
  width: 100%;
}

.diabled-btn {
  cursor: not-allowed;
}
</style>
