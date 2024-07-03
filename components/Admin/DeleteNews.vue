<template>
  <UIModal
    :show-modal="isOpen"
    title="Удалить новость"
    @close-modal="$emit('closeModal')"
  >
    <div class="ui-dropdown col-6 mt-4">
      <div class="selected-option basic-input" @click="toggleCreateCategory">
        <span>
          {{ newsTitle }}
        </span>

        <img
          class="arrow"
          :class="{ rotated: openNews }"
          src="../../assets/icons/icon=components-closed-arrow.svg"
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

    <button type="button" @click="deleteNews" class="pink-button">
      Удалить
    </button>
  </UIModal>
</template>

<script setup lang="ts">
import Id from "~/pages/news/[id].vue";
import { Brands } from "~/types/Brands";
import { News } from "~/types/News";
const openNews = ref(false);
const isCategoryCreateOpen = ref(false);
const brandsStore = useBrandsStore();
const newsStore = useNewsStore();
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["closeModal"]);
const selectedNews = ref([] as News[]);
const deleteNews = () => {
  selectedNews.value?.forEach(async (news) => {
    try {
      const response = await http.delete(
        `/api/v1/News/delete-news-by-id/${news?.id}`,
      );
      if (response.status === 200) {
        useNotif("success", "Новость удалена", "Успешно");
        setTimeout(() => {
          openNews.value = false;
          emit("closeModal");
          newsStore.fetchAllNews();
          selectedNews.value = [];
        }, 800);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

const toggleCreateCategory = () => {
  openNews.value = !openNews.value;
};

const newsTitle = computed(() => {
  if (selectedNews?.value?.length > 0) {
    return selectedNews?.value?.map((item) => item?.nameRu)?.join(". ");
  } else {
    return "Выбрать новость";
  }
});

const selectNews = (item: News) => {
  const index = selectedNews.value.findIndex((brand) => brand?.id === item?.id);
  console.log("index", index);
  if (index === -1) {
    selectedNews.value.push(item);
  } else {
    selectedNews.value.splice(index, 1);
  }
  console.log("selectedBrands", selectedNews);
};

onMounted(() => {
  newsStore.fetchAllNews();
  console.log("brandsStore.getAllBrands", brandsStore.getAllBrands);
});
</script>

<style scoped lang="scss">
@import "../../assets/dropdown.scss";
</style>
