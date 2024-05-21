import { Brands, Seller } from "~/types/Brands";
import { News } from "~/types/News";

export const useNewsStore = defineStore("newsStore", {
  state: () => ({
    news: [] as News[],
    allNews: [] as News[],
  
  }),
actions:{
    async fetchAllNews(){
        try{
const response = await http('/api/v1/News/get-all-news');
if(response.status===200){
    this.news=response.data;
    this.allNews=response.data
}
        }catch(err){
            console.log(err)
        }
    },
    filterNews(value:string){
        this.news=this.allNews.filter((item)=>item?.nameRu?.toLowerCase()?.includes(value?.toLowerCase()))
    }

},
  
  getters: {
    getAllNews (state) {
      return state.news;
    },
   
  }
});
