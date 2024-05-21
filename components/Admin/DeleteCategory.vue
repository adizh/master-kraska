<template>
  <UIModal
    :show-modal="isOpen"
    title="Удалить категорию"
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
          src="../../assets/icons/icon=components-closed-arrow.svg"
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

    <button type="button" @click="deleteCategories" class="pink-button">
      Удалить
    </button>
  </UIModal>
</template>

<script setup lang="ts">
import { CategorySys } from "~/types/Category";
const openCategory = ref(false);

const catalogStore = useCatalogStore();
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["closeModal"]);
const selectedCategories = ref([] as CategorySys[]);
const deleteCategories = () => {
  console.log("selectedCategories brands", selectedCategories?.value);
  selectedCategories.value?.forEach(async (category) => {
    console.log("id brands", category?.id);
    try {
      const response = await http.delete(
        `/api/v1/Category/delete-category-by-id/${category?.id}`,
      );
      if (response.status === 200) {
        useNotif("success", "Категория удалена", "Успешно");
        setTimeout(() => {
          openCategory.value = false;
          emit("closeModal");
          catalogStore.fetchAllCategoriesLinked();
          selectedCategories.value = [];
        }, 800);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

const toggleCreateCategory = () => {
  openCategory.value = !openCategory.value;
};

const categoryTitle = computed(() => {
  if (selectedCategories?.value?.length > 0) {
    return selectedCategories?.value
      ?.map((item) => item?.nameRu[0]?.toUpperCase() + item?.nameRu?.slice(1))
      ?.join(". ");
  } else {
    return "Выбрать категорию";
  }
});

const selectCategory = (item: CategorySys) => {
  const index = selectedCategories.value.findIndex(
    (category) => category?.id === item?.id,
  );

  if (index === -1) {
    selectedCategories.value.push(item);
  }
};

onMounted(() => {
  catalogStore.fetchAllCategoriesLinked();
});
</script>

<style scoped lang="scss">
@import "../../assets/dropdown.scss";
</style>
