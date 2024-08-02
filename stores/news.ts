import { Slider } from "~/Slider";
import { Brands, Seller } from "~/types/Brands";
import { News } from "~/types/News";

export const useNewsStore = defineStore("newsStore", {
  state: () => ({
    news: [] as News[],
    allNews: [] as News[],
    sliders: [] as Slider[]
  }),
  actions: {
    async fetchAllNews () {
      try {
        const response = await http("/api/v1/News/get-all-news");
        if (response.status === 200) {
          this.news = response.data;
          this.allNews = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    filterNews (value: string) {
      this.news = this.allNews.filter((item) =>
        item?.nameRu?.toLowerCase()?.includes(value?.toLowerCase())
      );
    },

    async fetchSliders () {
      try {
        const response = await http("/api/v1/Slider/get-all-sliders");
        console.log('fetch all sliders',response)
        if (response.status === 200) {
          this.sliders = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  },

  getters: {
    getAllNews (state) {
      return state.news;
    },
    getAllSliders (state) {
      return state.sliders;
    }
  }
});
