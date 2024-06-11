<template>
  <div class="backdrop" :class="{ show: isCatalogOpen }"></div>
  <div
    class="catalog-options"
    :class="{ open: isCatalogOpen }"
    @mouseleave="closeCatalogOptions"
  >
    <h5 class="each-section-header">{{ $t("productsCatalog") }}</h5>
    <div class="options-list">
      <ul class="first-col" ref="listContainer" @scroll="handleScroll">
        <li
          v-for="item in getAllCategories"
          :key="item?.category?.id"
          @mouseover="selectCategory(item, $event)"
          :class="{
            active: activeCategory.category?.id === item?.category?.id,
          }"
          @click.stop.capture="() => goToCatalog(item)"
        >
          <span> {{ formatName(item?.category?.name) }}</span>
          <span class="arrow-right">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0913 11.5L9 6.44422L10.4544 5L17 11.5L10.4544 18L9 16.5558L14.0913 11.5Z"
                fill="#DDDDDD"
              /></svg
          ></span>
        </li>

        <li :style="{ opacity: '0' }"></li>
        <li :style="{ opacity: '0' }"></li>
      </ul>

      <ul
        class="second-col"
        v-if="subCategories?.length > 0 && subCategories[0]?.subcategories"
      >
        <li
          v-for="subItem in subCategories[0]?.subcategories"
          :key="subItem?.id"
          @click.stop="goToCatalogSub(subItem)"
        >
          <span> {{ formatName(subItem?.nameRu) }}</span>
        </li>
      </ul>

      <div
        class="second-col"
        v-else-if="!subCategories?.length"
        ref="secondCol"
      >
        {{ $t("noData") }}
      </div>

      <div class="close-catalog" @click="$emit('closeCatalog')">{{ $t('closeBlock') }} X</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Category, CategorySys } from "@/types/Category";
const authStore = useAuthStore();
const catalogStore = useCatalogStore();
const router = useRouter();
const { getAllCategories } = storeToRefs(catalogStore);
const activeCategory = ref({} as Category);
const subCategories = ref([] as Category[]);
const formatName = (name: string) => {
  return name?.slice(0, 1).toUpperCase() + name?.slice(1).toLowerCase();
};

const props = defineProps<{
  isCatalogOpen: boolean;
}>();

const emit = defineEmits<{
  closeCatalog: [];
}>();
const goToCatalog = (item: Category) => {
  console.log("goToCatalog item", item);
  router.push({
    path: `/catalog`,
    query: { category: item?.category?.id },
  });
  emit("closeCatalog");
  activeCategory.value = item;
  closeCatalogOptions();
  setTimeout(() => {
    window.location.reload();
  }, 200);
};
const goToCatalogSub = (subItem: CategorySys) => {
  router.push({
    path: `/catalog`,
    query: {
      subCategory: subItem?.id,
      category: activeCategory.value?.category?.id,
    },
  });
  emit("closeCatalog");
  closeCatalogOptions();
  setTimeout(() => {
    window.location.reload();
  }, 200);
};

const fromtTop = ref("0");

const selectCategory = (item: Category, event: any) => {
  activeCategory.value = item;
  getSubs();
  handleScroll(event);
};

const getSubs = async () => {
  subCategories.value = await getAllCategories?.value.filter(
    (item: Category) => {
      return item?.category?.id === activeCategory.value?.category?.id;
    },
  );
};

const closeCatalogOptions = () => {
  emit("closeCatalog");
};

const listContainer = ref<HTMLUListElement | null>(null);

const handleScroll = (event: any) => {
  let currectItemTop: any;
  if (listContainer.value) {
    const listItems = listContainer.value.getElementsByTagName("li");
    Array.from(listItems).forEach((item, index) => {
      const itemPosition =
        item.offsetTop -
        (listContainer.value ? listContainer.value.offsetTop : 0);
    
      const firstVisibleItem = Array.from(listItems).find((item) => {
        return item.getBoundingClientRect().top >= 50;
      });

      if (firstVisibleItem?.textContent === item.textContent) {
        currectItemTop = itemPosition;
      }

      if (firstVisibleItem && currectItemTop) {
        const secondCol = document.querySelector(".second-col") as HTMLElement;
        secondCol.style.marginTop = currectItemTop + "px";
      }
    });
  }
};

onMounted(async () => {
  await catalogStore.fetchAllCategories();
  if (getAllCategories.value?.length) {
    activeCategory.value = getAllCategories?.value[0];
    getSubs();
  }
  window.addEventListener("scroll", (event) => {
    handleScroll(event);
  });
});
onUnmounted(() => {
  window.removeEventListener("scroll", (event) => {
    handleScroll(event);
  });
});
watch(
  () => authStore.getSelectedLang,
  () => {
    catalogStore.fetchAllCategories();
    window.addEventListener("scroll", (event) => {});
  },
);
</script>

<style scoped lang="scss">
.each-section-header {
  font-size: 30px;
}

.close-catalog {
  border-radius: 10px;
  background: #F5F5F5;
  padding:8px;
  position: absolute;
  right: 3rem;
  color: $main-black;
}

.second-col {
  padding-left: 40px;
}

.first-col {
  border-right: 1px solid $slider-border-color;
  padding-right: 20px;
}

ul li {
  list-style: none;
  margin: 10px 0;
  word-break: break-all;
  @include flex(row, space-between, center);
}

.backdrop {
  position: fixed;
  top: 7rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: none;
  pointer-events: none;
  transition: 17s ease;
}

.backdrop.show {
  display: block;
  transition: 17s ease;
}

.active {
  cursor: pointer;
  background: #f5f5f5;
}

li {
  @include footerSpan(32px, 18px);
  color: $main-black;
  padding: 6px 10px 4px 10px;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background: #f5f5f5;
  }
}

.catalog-options {
  @include openedOptionsHeader(100%, 20px 4rem, 4rem);
}

.catalog-options.open {
  opacity: 1;
  visibility: visible;
  transition: 0.3s ease all;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 4rem;

  &::after {
    content: "";
    flex-shrink: 0;
  }
}

.options-list {
  position: relative;
  @include flex(row, start, start);
}

@media (max-width: 768px) {
  .second-col {
    padding: 0;
  }

  .catalog-options {
    padding: 20px;
  }

  .catalog-options.open {
    padding-bottom: 5rem !important;
  }
}

@media (max-width: 576px) {
  .backdrop {
    top: 23rem;
  }

  .catalog-options {
    top: 18rem;
  }

  .second-col {
    display: none;
  }

  .arrow-right {
    display: none;
  }

  .catalog-options.open {
    padding-bottom: 22rem !important;
  }
}

@media (max-width: 480px) {
  .catalog-options.open {
    padding-bottom: 24rem !important;
  }
}
</style>
