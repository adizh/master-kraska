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
        <div class="main-page-header">
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
        <img src="../assets/images/1180x520.png" format="webp" />
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

    <!-- <div class="slider-wrapper">
      <div
        class="main-page-header animate__animated"
        v-if="currentIndex === 0"
        :class="{
          animate__slideInRight: currentIndex === 0 && direction === 'next',
          animate__slideInLeft: currentIndex === 0 && direction === 'prev',
        }"
      >
        <div class="left">
          <h1>Мастер Краска</h1>
          <div class="sub-header">{{ $t("officialRepres") }}</div>
          <button class="pink-button" @click="navigateTo('/parameters')">
            {{ $t("searchByParams") }}
          </button>
        </div>
        <div class="right">
          <img src="/main-page.png" class="large-image" format="webp" />
          <img src="/vertical-main.png" format="webp" class="small-image" />
        </div>
      </div>

      <div
        class="animate__animated"
        v-else-if="currentIndex === 1"
        :class="{
          animate__fadeInRight: currentIndex === 1 && direction === 'next',
          animate__fadeInLeft: currentIndex === 1 && direction === 'prev',
        }"
      >
        <div class="banner-block">
          <img src="../assets/images/1180x520.png" format="webp" />
        </div>
      </div>

      <div
        class="animate__animated"
        v-else-if="currentIndex === 2"
        :class="{
          animate__slideInRight: currentIndex === 2 && direction === 'next',
          animate__slideInLeft: currentIndex === 2 && direction === 'prev',
        }"
      >
        <div class="banner-block">
          <img src="../assets/images/image001.png" format="webp" />
        </div>
      </div>
      <div
        class="animate__animated"
        v-else-if="currentIndex === 3"
        :class="{
          animate__slideInRight: currentIndex === 3 && direction === 'next',
          animate__slideInLeft: currentIndex === 3 && direction === 'prev',
        }"
      >
        <div class="banner-block">
          <img
            src="../assets/images/Oikos_Banner_Kraska_1180x520.gif"
            format="webp"
          />
        </div>
      </div>

      <div
        class="animate__animated"
        v-else-if="currentIndex === 4"
        :class="{
          animate__slideInRight: currentIndex === 4 && direction === 'next',
          animate__slideInLeft: currentIndex === 4 && direction === 'prev',
        }"
      >
        <div class="banner-block">
          <img
            src="../assets/images/Oikos_Banner_Kraska_1180x520_Encanto.jpg"
            format="webp"
          />
        </div>
      </div>

      <div
        class="animate__animated"
        v-else-if="currentIndex === 5"
        :class="{
          animate__slideInRight: currentIndex === 5 && direction === 'next',
          animate__slideInLeft: currentIndex === 5 && direction === 'prev',
        }"
      >
        <div class="banner-block">
          <img
            src="../assets/images/Oikos_Banner_Kraska_1180x520_MultidecorSkin.jpg"
            format="webp"
          />
        </div>
      </div>

      <div
        class="animate__animated"
        v-else-if="currentIndex === 6"
        :class="{
          animate__slideInRight: currentIndex === 6 && direction === 'next',
          animate__slideInLeft: currentIndex === 6 && direction === 'prev',
        }"
      >
        <div class="banner-block">
          <img
            src="../assets/images/Oikos_Banner_Kraska_1180x520_Ottocento.jpg"
            format="webp"
          />
        </div>
      </div>

      <div class="controls">
        <img
          src="../assets/icons/arrow-right.svg"
          @click="prevSlide"
          alt="arrow"
        />
        <div class="controls-circle">
          <span
            @click="changeSlide(0)"
            :class="{
              'active-control': currentIndex === 0,
              'next-slide': direction === 'next',
              'prev-slide': direction === 'prev',
            }"
          ></span>
          <span
            @click="changeSlide(1)"
            :class="{
              'active-control': currentIndex === 1,
              'next-slide': direction === 'next',
              'prev-slide': direction === 'prev',
            }"
          ></span>
          <span
            @click="changeSlide(2)"
            :class="{
              'active-control': currentIndex === 2,
              'next-slide': direction === 'next',
              'prev-slide': direction === 'prev',
            }"
          ></span>
          <span
            @click="changeSlide(3)"
            :class="{
              'active-control': currentIndex === 3,
              'next-slide': direction === 'next',
              'prev-slide': direction === 'prev',
            }"
          ></span>
          <span
            @click="changeSlide(4)"
            :class="{
              'active-control': currentIndex === 4,
              'next-slide': direction === 'next',
              'prev-slide': direction === 'prev',
            }"
          ></span>
          <span
            @click="changeSlide(5)"
            :class="{
              'active-control': currentIndex === 5,
              'next-slide': direction === 'next',
              'prev-slide': direction === 'prev',
            }"
          ></span>
          <span
            @click="changeSlide(6)"
            :class="{
              'active-control': currentIndex === 6,
              'next-slide': direction === 'next',
              'prev-slide': direction === 'prev',
            }"
          ></span>
        </div>
        <img
          @click="nextSlide"
          src="../assets/icons/arrow-left.svg"
          alt="arrow-left"
        />
      </div>
    </div> -->
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
      console.log("response data in discount", response);
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
onMounted(() => {
  getDiscounts();
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

@media (max-width: 786px) {
  .banner-block {
    img {
      height:auto;
    }
  }

  .main-page-header{
    height:auto;
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
    margin-top: 5px;
  }
}
@media (max-width: 468px) {
  .main-page-header {
    flex-direction: column;
    gap: 28px;
  }
 
  .pink-button {
    font-size: 16px;
    padding: 8px 20px;
    margin: 1.3rem;
  }

  .large-image {
    display: none;
  }

  .small-image {
    display: block;
  }
}
</style>
