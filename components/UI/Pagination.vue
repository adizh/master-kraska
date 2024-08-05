<template>
  <div class="pagination">
    <nav class="pagination-container">
      <ul class="list-pagination">
        <div class="buttons-pgn">
          <button
            class="pagination-arrow prev"
            :disabled="currentPage === 1"
            @click="previousPage"
          ></button>
          <span
            v-if="ellipseShowFirst"
            class="last-page"
            @click="changePage(1)"
            >{{ 1 }}</span
          >
          <span v-if="ellipseShowFirst" class="ellipse">...</span>

          <ul v-for="page in visiblePages" :key="page">
            <li
              class="each-button-pag"
              :class="`${currentPage === page ? 'current-page' : ''}`"
              @click="changePage(page)"
            >
              <a href="#">{{ page }}</a>
            </li>
          </ul>

          <!-- <ul  v-else v-for="(page,index) in visiblePages" :key="index">
                        <li class="each-button-pag" :class="`${currentPage === page ? 'current-page' : ''}`"
                            @click="changePage(page)">
                            <a href="#">{{ page }}</a>
                        </li>
                    </ul> -->

          <span v-if="ellipseShow" class="ellipse1">...</span>
          <span
            v-if="ellipseShow"
            class="last-page"
            @click="changePage(totalPages.length)"
            >{{ totalPages.length }}</span
          >

          <button
            class="pagination-arrow next"
            :disabled="currentPage === totalPages.length"
            @click="nextPage"
          ></button>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["changePage"]);
interface PaginationProps {
  total: number;
  currentActive: number;
}

const props = defineProps<PaginationProps>();

const currentPage = ref(props.currentActive);
const buttonsToShow = ref<number>(3);

watch(
  () => props?.currentActive,
  () => {
    currentPage.value = props.currentActive;
  },
);
const totalPages = computed(() => {
  let result: number[] = [];
  for (let i = 1; i <= props.total; i++) {
    result.push(i);
  }
  return result;
});

const ellipseShowFirst = computed(() => {
  return currentPage.value > 2;
});
const visiblePages = computed(() => {
  const currentPageIndex = totalPages.value.indexOf(currentPage.value);
  let start = currentPageIndex - Math.floor(buttonsToShow.value / 2);
  start = Math.max(start, 0);
  const end = start + buttonsToShow.value;
  return totalPages.value.slice(start, end);
});

const ellipseShow = computed(() => {
  return (
    visiblePages.value[visiblePages.value.length - 1] < totalPages.value.length
  );
});

const changePage = (newPage: number) => {
  currentPage.value = newPage;
  emit("changePage", newPage);
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit("changePage", currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value.length) {
    currentPage.value++;
    emit("changePage", currentPage.value);
  }
};
</script>

<style scoped lang="scss">
.list-pagination {
  @include flex(row, center, center);
}

.buttons-pgn {
  @include flex(row, start, center, 4px);
}

.ellipse1 {
  margin-right: 10px;
}

.ellipse {
  margin-left: 10px;
}

.prev {
  background-image: url(../../assets/icons/arrow-right.svg) !important;

  &:hover {
    background-image: url(../../assets/icons/white-arrow-right.svg) !important;
  }
}

.pagination-arrow {
  color: black !important;
  border: 1px solid $slider-border-color !important;
  padding: 10px;
  border-radius: 100%;
  width: 36px;
  height: 36px;
  margin: 0 10px 0 10px;
  top: 44%;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  @include flex(row, center, center);
  background: white;

  &:hover {
    background: $main-blue;
    cursor: pointer;
    border: none !important;
  }
}

.last-page {
  border: 1px solid white;
  padding: 4px 10px;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    border-color: $main-pink;
  }
}

.next {
  background-image: url(../../assets/icons/arrow-left.svg) !important;

  &:hover {
    background-image: url(../../assets/icons/arrow-left-white.svg) !important;
  }
}

.each-button-pag {
  border: 1px solid white;
  border-radius: 4px;
  padding: 4px 10px;

  &:hover {
    cursor: pointer;
    border-color: $main-pink;
  }

  a {
    @include textFormat(16px, 24px, 400, #000);
  }
}

.current-page {
  border-color: $main-pink;
}
</style>
