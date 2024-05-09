<template>
  <div class="single-news-section">
    <div class="single-news">
      <h1>{{ singleNew?.name }}</h1>
      <img :src="singleNew?.image" :alt="singleNew?.text" />
      <div class="text">{{ singleNew?.description }}</div>
      <div class="description">{{ singleNew?.text }}</div>
    </div>

    <h2 class="other-title margin-bottom-40">{{ $t("otherNews") }}</h2>

    <div class="active-section">
      <div
        class="active-news"
        v-for="item in activeNews"
        :key="item?.id"
        @click="navigateTo(`/news/${item?.id}`)"
      >
        <div class="image">
          <img :src="item?.image" :alt="item?.name" />
        </div>
        <div class="info">
          <div class="news-header">{{ item?.name }}</div>
          <span class="date">
            {{ formatDate(item?.createdDate) }}
          </span>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { News } from "@/types/News";
const route = useRoute();
const singleNew = ref({} as News);
const activeNews = ref([] as News[]);
const authStore = useAuthStore();

const fetchNew = async () => {
  try {
    const response = await http(`/api/v1/News/get-news/${route?.params?.id}`);

    if (response.status === 200) {
      if (authStore?.getSelectedLang === "kg") {
        singleNew.value = {
          ...response.data,
          name: response.data?.nameKg,
          text: response.data?.textKg,
          description: response.data?.descriptionKg,
        };
      } else {
        singleNew.value = {
          ...response.data,
          name: response.data?.nameRu,
          text: response.data?.textRu,
          description: response.data?.descriptionRu,
        };
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchActiveNews = async () => {
  try {
    const response = await http("/api/v1/News/get-active-news");
    if (response.status === 200) {
      activeNews.value = response.data?.map((news: News) => {
        if (authStore.getSelectedLang === "kg") {
          return {
            ...news,
            name: news?.nameKg,
            description: news?.descriptionKg,
            text: news?.textKg,
          };
        } else {
          return {
            ...news,
            name: news?.nameRu,
            description: news?.descriptionRu,
            text: news?.textRu,
          };
        }
      });
      console.log("response acfive", response);
    }
  } catch (err) {
    console.log(err);
  }
};
onMounted(async () => {
  await fetchNew();
  fetchActiveNews();
  window.scrollTo(0, 0);
});
</script>

<style scoped lang="scss">
$text-max-width: 600px;

h1 {
  max-width: 640px;
}
.single-news {
  @include flex(column, start, start, 40px);
  margin-bottom: 60px;
}
.active-section {
  @include flex(row, start, center);
  margin-left: -60px;
}
.text {
  font-size: 20px;
  line-height: 32px;
  font-weight: 500;
  max-width: $text-max-width;
}
.active-news {
  width: 30%;
  @include flex(column, start, center, 20px);
}

.description {
  font-size: 16px;
  line-height: 26px;
  font-weight: 500;
  color: $main-black;
  max-width: $text-max-width;
  font-weight: 400;
}

.image {
  width: 280px;
  border-radius: 10px;
  img {
    width: 100%;
    object-fit: contain;
  }
}

.info {
  width: 70%;

  span.date {
    color: #666666;

    font-size: 20px;
    line-height: 32px;
    font-weight: 400;
  }
  h2 {
    margin: 0 0 40px 0 !important;
    font-size: 24px !important;
    line-height: 24px;
    word-wrap: break-word;
  }

  p {
    @include footerSpan(24px, 16px);
    color: $main-black !important;
  }
}

@media (max-width: 1100px) {
  .active-section {
    margin-left: 0;
  }
  .active-news {
    width: 45%;
  }
}
@media (max-width: 768px) {
  .active-section {
    flex-direction: column;
  }
  .active-news {
    align-items: center;
    width: 100%;
  }
  .info {
    text-align: center;
  }
}
</style>
