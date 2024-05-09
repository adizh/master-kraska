<template>
  <div
    class="news-list-block"
    v-for="item in news"
    :key="item?.id"
    v-if="!isLoading && news?.length"
    @click="router.push(`/news/${item?.id}`)"
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
  <div v-else-if="isLoading && !news?.length" class="text-center">
    <ProgressSpinner />
  </div>

  <div v-else>{{ $t("noData") }}</div>
</template>

<script setup lang="ts">
import moment from "moment";
import { News } from "@/types/News";
const news = ref([] as News[]);
const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(false);
const getNews = async () => {
  isLoading.value = true;
  try {
    const response = await http("/api/v1/News/get-all-news");
    if (response.status === 200) {
      console.log("response get news", response);
      news.value = response.data?.map((news: News) => {
        if (authStore?.getSelectedLang === "kg") {
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
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (date: string) => {
  return moment(date).format("YYYY-MM-DD");
};
onMounted(() => {
  getNews();
});
</script>

<style scoped lang="scss">
.news-list-block {
  @include flex(column, start, start, 20px);
  margin-bottom: 40px;
  width: 35%;

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
}

@media (max-width: 768px) {
  .news-list-block {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;

    .image {
      width: 70%;
    }

    .info {
      width: 100%;
    }
    .news-list-block .info h2 {
      font-size: 24px !important;
      line-height: 24px !important;
    }
  }
}

@media (max-width: 480px) {
  .news-list-block {
    width: 100%;
  }
  .news-list-block .info h2 {
    font-size: 20px !important;
  }
  .image {
    width: 80% !important;
  }
}
</style>
