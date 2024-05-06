<template>

    <div class="carousel-slider">
        <div class="slider-wrapper">
            <div class="main-page-header animate__animated" v-if="currentIndex === 0" :class="{
                'animate__slideInRight': currentIndex === 0 && direction === 'next',
                'animate__slideInLeft': currentIndex === 0 && direction === 'prev'
            }">
                <div class="left">
                    <h1>Мастер Краска</h1>
                    <div class="sub-header">{{ $t('officialRepres') }}
                    </div>
                    <button class="pink-button" @click="navigateTo('/parameters')">
                        {{ $t('searchByParams') }}</button>
                </div>
                <div class="right">
                    <img src="/main-page.png"  class="large-image" format="webp"/>
                    <img src="/vertical-main.png" format="webp" class="small-image"/>
                </div>
            </div>

            <div class="animate__animated"  v-else-if="currentIndex === 1" :class="{
                'animate__slideInRight': currentIndex === 1 && direction === 'next',
                'animate__slideInLeft': currentIndex === 1 && direction === 'prev'
            }" >
                <div class="banner-block">
                    <img src='../assets/images/1180x520.png' format="webp"/>
                </div>
            </div>

            <div class="animate__animated"  v-else-if="currentIndex === 2" :class="{
                'animate__slideInRight': currentIndex === 2 && direction === 'next',
                'animate__slideInLeft': currentIndex === 2 && direction === 'prev'
            }" >
                
                <div class="banner-block">
                    <img src="../assets/images/image001.png" format="webp"/>
                </div>
            </div>
            <div class="animate__animated"  v-else-if="currentIndex === 3" :class="{
                'animate__slideInRight': currentIndex === 3 && direction === 'next',
                'animate__slideInLeft': currentIndex === 3 && direction === 'prev'
            }" >
                
                <div class="banner-block">
                    <img src="../assets/images/Oikos_Banner_Kraska_1180x520.gif" format="webp"/>
                </div>
            </div>

            <div class="animate__animated"  v-else-if="currentIndex === 4" :class="{
                'animate__slideInRight': currentIndex === 4 && direction === 'next',
                'animate__slideInLeft': currentIndex === 4 && direction === 'prev'
            }" >
                
                <div class="banner-block">
                    <img src="../assets/images/Oikos_Banner_Kraska_1180x520_Encanto.jpg" format="webp"/>
                </div>
            </div>

            <div class="animate__animated"  v-else-if="currentIndex === 5" :class="{
                'animate__slideInRight': currentIndex ===5 && direction === 'next',
                'animate__slideInLeft': currentIndex === 5 && direction === 'prev'
            }" >
                
                <div class="banner-block">
                    <img src="../assets/images/Oikos_Banner_Kraska_1180x520_MultidecorSkin.jpg" format="webp"/>
                </div>
            </div>


            <div class="animate__animated"  v-else-if="currentIndex === 6" :class="{
                'animate__slideInRight': currentIndex === 6 && direction === 'next',
                'animate__slideInLeft': currentIndex === 6 && direction === 'prev'
            }" >
                
                <div class="banner-block">
                    <img src="../assets/images/Oikos_Banner_Kraska_1180x520_Ottocento.jpg" format="webp"/>
                </div>
            </div>

          

            <div class="controls">
                <img src="../assets/icons/arrow-right.svg" @click="prevSlide"  alt="arrow"/>
                <div class="controls-circle">
                    <span @click="changeSlide(0)"
                        :class="{ 'active-control': currentIndex === 0, 'next-slide': direction === 'next', 'prev-slide': direction === 'prev' }"></span>
                    <span @click="changeSlide(1)"
                        :class="{ 'active-control': currentIndex === 1, 'next-slide': direction === 'next', 'prev-slide': direction === 'prev' }"></span>
                    <span @click="changeSlide(2)"
                        :class="{ 'active-control': currentIndex === 2, 'next-slide': direction === 'next', 'prev-slide': direction === 'prev' }"></span>
                        <span @click="changeSlide(3)"
                        :class="{ 'active-control': currentIndex === 3, 'next-slide': direction === 'next', 'prev-slide': direction === 'prev' }"></span>
                        <span @click="changeSlide(4)"
                        :class="{ 'active-control': currentIndex === 4, 'next-slide': direction === 'next', 'prev-slide': direction === 'prev' }"></span>
                        <span @click="changeSlide(5)"
                        :class="{ 'active-control': currentIndex === 5, 'next-slide': direction === 'next', 'prev-slide': direction === 'prev' }"></span>
                        <span @click="changeSlide(6)"
                        :class="{ 'active-control': currentIndex === 6, 'next-slide': direction === 'next', 'prev-slide': direction === 'prev' }"></span>
                       
             
             
                    </div>
                <img @click="nextSlide" src="../assets/icons/arrow-left.svg"  alt='arrow-left'/>
            </div>
        </div>
    </div>



</template>

<script lang="ts" setup>

import {Discount} from '@/types/Discout'
const discounts = ref([] as Discount[]);
const discountsFirst = ref({} as Discount);
const discountsSecond = ref({} as Discount);

const isLoading=ref(false)
const authStore=useAuthStore()

const getDiscounts=async()=>{
    isLoading.value=true
    try{
const response= await http('/api/v1/Banner/get-all-banners');
if(response.status===200){
    console.log('response data in discount',response)
    discounts.value=response.data.map((item:Discount)=>{
        if(authStore?.getSelectedLang==='kg'){
            return {...item, title:item?.titleKg,buttonText:item?.buttonTextKg,description:item?.descriptionKg}
        }else{
            return {...item, title:item?.titleRu,buttonText:item?.buttonTextRu,description:item?.descriptionRu}
        }

    })
    discountsFirst.value=discounts.value[0]
    discountsSecond.value=discounts.value[1]
}
    }catch(err){
        console.log(err)
    }finally{
        isLoading.value=false
    }
}
onMounted(()=>{
    getDiscounts()
})
import 'animate.css';
const currentIndex = ref(0)
const direction = ref('');
const nextSlide = () => {

    if (currentIndex.value < 6) {
        currentIndex.value++
        direction.value = 'next';
        console.log('is it sliding???')
    }
}

const changeSlide = (index: number) => {
    direction.value = currentIndex.value < index ? 'next' : 'prev';
    currentIndex.value = index;
};
const prevSlide = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--; direction.value = 'prev';
    }
}


</script>


<style scoped lang="scss">
.banner-block{
    img{
        width: 100%;
    }
}
.slider-wrapper {
    background: $main-white;
    border-radius: 10px;
    position: relative;

    .controls {
        position: absolute;
        @include flex(row, center, center);
        bottom: 27px;
        right: 40px;

        img:hover {
            cursor: pointer;
        }

        &-circle {
            span {
                display: inline-block;
                background: $slider-border-color;
                border-radius: 100%;
                width: 10px;
                height: 10px;
                margin-right: 10px;

                &:hover {
                    cursor: pointer;
                }

            }
        }
    }
}

.slider-wrapper .controls-circle span.active-control {
    background: $blue-color
    
}

.main-page-header {

margin-bottom: 80px;
    padding: 4.5rem 0 4.5rem 50px;
    @include flex(row, space-between, center);
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
    line-height:38px;
}





:deep(.swiper-button-next) {
    top: 97% !important;
    position: absolute;
    color: #000;
    right: 5.9rem !important;
}

:deep(.swiper-button-prev) {
    top: 97% !important;
    position: absolute;
    left: 83.8%;

    color: #000;
}

:deep(.swiper-pagination, .swiper-pagination-custom, .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal) {
    display: flex !important;
    width: 90% !important;
    justify-content: flex-end !important
}

:deep(.swiper-slide) {
    @include flex(row, space-between, center !important)
}

.small-image {
    display: none;
}


@media (max-width:786px) {
    .sub-header {
        font-size: 18px;
        max-width: 340px;
    }

    h1 {
        font-size: 48px;

    }

    .main-page-header {
        padding: 40px 20px;
    }

    .pink-button {
        font-size: 18px;
        padding: 10px 20px;
    }

}

@media (max-width:468px) {
    .main-page-header {
        flex-direction: column;
        gap: 28px
    }

    h1 {
        font-size: 36px !important;
    }

    .sub-header {
        font-size: 16px;
        max-width: 440px;
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