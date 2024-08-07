<template>
  <UIModal
    :show-modal="isOpen"
    title="Добавить подкатегорию"
    @close-modal="$emit('closeModal')"
  >
    <form
      class="mt-4 flex flex-column align-items-center"
      @submit.prevent="addSubcategory"
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
      <div class="form-block mt-5">
        <label for="category">Подкатегория</label>
        <input
          type="text"
          placeholder="Добавить подкатегорию"
          v-model="subCategory"
          class="basic-input"
          required
          id="category"
        />
      </div>

      <div class="mt-5 form-block">
        <label for="categoryKg">Подкатегория (кырг)</label>
        <input
          type="text"
          placeholder="Добавить подкатегорию"
          v-model="subCategoryKg"
          class="basic-input"
          required
          id="categoryKg"
        />
      </div>
      <button type="submit" class="pink-button">Добавить</button>
    </form>
  </UIModal>
</template>

<script setup lang="ts">
import {
  isSubcategoryOpen,
  subCategory,
  subCategoryKg,
  selectedCategoryId,
  selectCategory,
  defaultText,
} from "@/helpers/admin/subcategory";
const emit = defineEmits(["closeModal"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
});

const catalogStore = useCatalogStore();

const addSubcategory = async () => {
  if (
    subCategory?.value?.length &&
    subCategoryKg?.value?.length &&
    selectedCategoryId?.value?.id
  ) {
    try {
      const body = {
        nameRu: subCategory.value,
        nameKg: subCategoryKg.value,
        categoryId: selectedCategoryId?.value?.id,
      };
      const response = await http.post(
        "/api/v1/Helpers/create-subdirectory",
        body,
      );
      if (response.status === 200) {
        useNotif("success", "Подкатегория добавлена", "Успешно");
        emit("closeModal");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    useNotif("error", "Заполните все поля", "Ошибка");
  }
};

const filterCategories = (event: Event) => {
  const target = event.target as HTMLInputElement;
  catalogStore.filterTopCategories(target.value);
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
</style>
