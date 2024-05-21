<template>
  <UIModal
    :show-modal="isOpen"
    title="Удалить бренд"
    @close-modal="$emit('closeModal')"
  >
    <div class="ui-dropdown col-6">
      <div class="selected-option basic-input" @click="toggleCreateCategory">
        <span>
          {{ brandsTitle }}
        </span>

        <img
          class="arrow"
          :class="{ rotated: openBrand }"
          src="../../assets/icons/icon=components-closed-arrow.svg"
          alt="open-arrow"
        />
      </div>

      <Transition name="slide-fade">
        <div>
          <ul class="ui-options" v-if="openBrand">
            <input
              type="text"
              class="basic-input"
              @input="
                (event: any) => brandsStore.searchBrands(event?.target?.value)
              "
            />
            <li
              v-for="(item, index) in brandsStore.getAllBrands"
              :key="item?.id"
              @click="selectBrand(item)"
            >
              {{ item?.name }}
            </li>
          </ul>
        </div>
      </Transition>
    </div>

    <button type="button" @click="deleteBrands" class="pink-button">
      Удалить
    </button>
  </UIModal>
</template>

<script setup lang="ts">
import Id from "~/pages/news/[id].vue";
import { Brands } from "~/types/Brands";
const openBrand = ref(false);
const isCategoryCreateOpen = ref(false);
const brandsStore = useBrandsStore();
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["closeModal"]);
const selectedBrands = ref([] as Brands[]);
const deleteBrands = () => {
  console.log("sekected brands", selectedBrands?.value);
  selectedBrands.value?.forEach(async (brand) => {
    console.log("id brands", brand?.id);
    try {
      const response = await http.delete(
        `/api/v1/Brand/delete-brand-by-id/${brand?.id}`,
      );
      if (response.status === 200) {
        useNotif("success", "Бренд удален", "Успешно");
        setTimeout(() => {
          openBrand.value = false;
          emit("closeModal");
          brandsStore.fetchAllBrands();
          selectedBrands.value = [];
        }, 800);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

const toggleCreateCategory = () => {
  openBrand.value = !openBrand.value;
};

const brandsTitle = computed(() => {
  if (selectedBrands?.value?.length > 0) {
    return selectedBrands?.value?.map((item) => item?.name)?.join(", ");
  } else {
    return "Выбрать бренд";
  }
});

const selectBrand = (item: Brands) => {
  const index = selectedBrands.value.findIndex(
    (brand) => brand?.id === item?.id,
  );
  console.log("index", index);
  if (index === -1) {
    selectedBrands.value.push(item);
  }else{
    selectedBrands.value.splice(index,1)
  }
  console.log("selectedBrands", selectedBrands);
};

onMounted(() => {
  brandsStore.fetchAllBrands();
  console.log("brandsStore.getAllBrands", brandsStore.getAllBrands);
});
</script>

<style scoped lang="scss">
@import "../../assets/dropdown.scss";
</style>
