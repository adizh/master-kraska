<template>
  <div class="carousel-slider">

    <Swiper
    :slides-per-view="1"
    :modules="[SwiperNavigation,SwiperEffectCreative,SwiperController]"
    :navigation="true"
    :creative="true"
    
    :creative-effect="{
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"
 
    :style="{ '--swiper-navigation-size': '23px' }"
  >
    <SwiperSlide>
      <div class="slider-wrapper">
        <div class="main-page-header"  ref="targetElement">
          <div class="left">
            <h1>Мастер Краска</h1>
            <div class="sub-header">{{ $t("officialRepres") }}</div>
            <button class="pink-button" @click="navigateTo('/parameters')">
              {{ $t("searchByParams") }}
            </button>
          </div>
          <div class="right">
            <img src="../public/main-page.png" class="large-image" format="webp" />
            <img src="../public/vertical-main.png" format="webp" class="small-image" />
          </div>
        </div>
      </div>
    
    </SwiperSlide>
    <SwiperSlide>
      <div class="banner-block slider-wrapper">
        <img src="../assets/images/1180x520.png" format="webp" id="'banner-image" ref="bannerImage" @load="updateHeight"/>
      </div>    
    </SwiperSlide>


    <SwiperSlide>
      <div class="banner-block">
        <img src="../assets/images/image001.png" format="webp" />
      </div>    
    </SwiperSlide>


    <SwiperSlide>
      <div class="banner-block">
        <img src="../assets/images/Oikos_Banner_Kraska_1180x520.gif" format="webp" />
      </div>    
    </SwiperSlide>

    <SwiperSlide>
      <div class="banner-block">
        <img   src="../assets/images/Oikos_Banner_Kraska_1180x520_Encanto.jpg" format="webp" />
      </div>    
    </SwiperSlide>

    <SwiperSlide>
      <div class="banner-block">
        <img  src="../assets/images/Oikos_Banner_Kraska_1180x520_MultidecorSkin.jpg" format="webp" />
      </div>    
    </SwiperSlide>

    <SwiperSlide>
      <div class="banner-block">
        <img src="../assets/images/Oikos_Banner_Kraska_1180x520_Ottocento.jpg" format="webp" />
      </div>    
    </SwiperSlide>

    
  </Swiper>

  
  </div>
</template>

<script lang="ts" setup>
import { Discount } from "@/types/Discout";
const discounts = ref([] as Discount[]);
const discountsFirst = ref({} as Discount);
const discountsSecond = ref({} as Discount);

const isLoading = ref(false);
const authStore = useAuthStore();

const getDiscounts = async () => {
  isLoading.value = true;
  try {
    const response = await http("/api/v1/Banner/get-all-banners");
    if (response.status === 200) {

      discounts.value = response.data.map((item: Discount) => {
        if (authStore?.getSelectedLang === "kg") {
          return {
            ...item,
            title: item?.titleKg,
            buttonText: item?.buttonTextKg,
            description: item?.descriptionKg,
          };
        } else {
          return {
            ...item,
            title: item?.titleRu,
            buttonText: item?.buttonTextRu,
            description: item?.descriptionRu,
          };
        }
      });
      discountsFirst.value = discounts.value[0];
      discountsSecond.value = discounts.value[1];
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};
const bannerImage = ref<HTMLImageElement | null>(null);
const targetElement = ref<HTMLElement | null>(null);

const updateHeight = () => {

  if (bannerImage.value && targetElement.value) {

    const imageHeight = bannerImage.value.clientHeight;

    targetElement.value.style.height = `${imageHeight}px`;
    
  }
};
watch(
  () => bannerImage.value?.clientHeight,
  (newHeight) => {
    if (newHeight) {
      updateHeight();
    }
  }
);
onMounted(() => {
  getDiscounts();
  window.addEventListener('resize', updateHeight);
});


onBeforeUnmount(() => {
  window.removeEventListener('resize', updateHeight);
});

import "animate.css";
const currentIndex = ref(0);
const direction = ref("");
const nextSlide = () => {
  if (currentIndex.value < 6) {
    currentIndex.value++;
    direction.value = "next";
  }
};

const changeSlide = (index: number) => {
  direction.value = currentIndex.value < index ? "next" : "prev";
  currentIndex.value = index;
};
const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    direction.value = "prev";
  }
};
</script>

<style scoped lang="scss">
.carousel-slider{
  margin-left:-2rem !important;
  margin-right:-2rem !important;
}


.banner-block {
  width: 100%;
  img {
    width: 100%;
    height:573px;
    border-radius: 20px;
  }
}
.slider-wrapper {
  position: relative;
}

.slider-wrapper .controls-circle span.active-control {
  background: $blue-color;
}

.main-page-header {
  margin-bottom: 40px;
  padding: 4.5rem 0 4.5rem 50px;
  @include flex(row, space-between, center);
  background: $main-white;
  height:573px;
  border-radius: 20px;
}

.right {
  width: 50%;

  img {
    width: 100%;

  }
}

.left {
  @include flex(column, center, start, 1px);
}

h1 {
  color: $main-pink;
  line-height: 92px !important;
  font-weight: 600;
  font-size: 74px !important;
  margin-bottom: 20px;
}

.sub-header {
  color: $main-black;
  font-size: 28px;
  font-weight: 500;
  max-width: 500px;
  line-height: 38px;
}

:deep(.swiper-button-next) {
  color: #fff;
  background: #00000020;
  padding:18px;
  &:hover{
    background: #00000040;
  }
}

:deep(.swiper-button-prev) {
  background: #00000020;
  padding:18px;
  color: #fff;
  &:hover{
    background: #00000040;
  }
}

:deep(
    .swiper-pagination,
    .swiper-pagination-custom,
    .swiper-horizontal > .swiper-pagination-bullets,
    .swiper-pagination-bullets.swiper-pagination-horizontal
  ) {
  display: flex !important;
  width: 90% !important;
  justify-content: flex-end !important;
}

.small-image {
  display: none;
}


@media (min-width:1400px){
  .carousel-slider{
      margin-top: -4.6rem !important;
      margin-left: -10rem !important;
      margin-right: -10rem !important;
    }
  }
  @media (max-width:1100px){
    .carousel-slider{
      margin-top:-4rem;
    }
  }

@media (max-width: 786px) {
  .banner-block {
    img {
      height:auto;
    }
  }
  .sub-header {
    font-size: 18px !important;
    max-width: 340px !important;
  }

  h1 {
    font-size: 48px !important;
    line-height: 49px !important;
  }

  .main-page-header {
    padding: 40px 20px;
  }

  .pink-button {
    font-size: 18px;
    padding: 10px 20px;
  }
  .right {
   display: none;
  }
  
}

@media (max-width: 700px){
  h1 {
    font-size: 36px !important;
    margin-bottom: 0;
  }
  .pink-button {
    font-size: 16px;
  }

  .sub-header {
    font-size: 16px;
    max-width: 440px;
  }
}

@media (max-width: 790px) {
  .main-page-header {
    padding:10px 10px 20px 10px;
  }
  .pink-button{
    margin-top: 40px;
  }
}

@media (max-width:576px){
  .pink-button{
    margin-top: 5px;
  }
  h1 {
    font-size: 26px !important;
    margin-bottom: 0;
  }
 
  .main-page-header{
    padding-top: 30px !important;
  }
  .sub-header {
    font-size: 16px !important;
    max-width: 440px  !important;
  }
  .sub-header{
    line-height: 33px !important;
  }
}


@media (max-width: 480px) {
  .carousel-slider{
    margin-top: -7.3rem !important;
  }
  .sub-header{
    line-height: 28px !important;
  }
  .main-page-header {
    flex-direction: column;
    gap: 28px;
  }
 
  .pink-button {
    font-size: 16px !important;
    padding: 8px 20px;
  }

  .large-image {
    display: none;
  }

  .small-image {
    display: block;
  }


}
@media (max-width: 468px){
  .carousel-slider{
    margin-top: -0.3rem !important;
  }
}
@media (max-width: 430px){
 h1{
  font-size: 20px !important;
 }
 .sub-header{
  font-size: 14px !important;
  line-height: 20px !important;
 }
 .pink-button{
  font-size: 13px !important;
        padding: 6px 14px;
        margin-top: 15px;
      
    
 }
 .main-page-header{
  padding-top: 20px !important;
}
}

@media (max-width:360px){
  .main-page-header {
    padding-top: 5px !important;
  }
  .left{
    align-items: center;
  }
  .sub-header{
    line-height: 18px;
  }
}
</style>
