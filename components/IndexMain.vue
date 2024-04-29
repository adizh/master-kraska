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
                    <img src="../assets/images/main-page.png" alt="large" class="large-image">
                    <img src="../assets/images/vertical-main.png" alt="small" class="small-image">
                </div>
            </div>

            <div class="main-page-header animate__animated" v-else-if="currentIndex === 1" :class="{
                'animate__slideInRight': currentIndex === 1 && direction === 'next',
                'animate__slideInLeft': currentIndex === 1 && direction === 'prev'
            }">
                <div class="left">
                    <h1>Мастер Краска 1</h1>
                    <div class="sub-header">{{ $t('officialRepres') }}
                    </div>
                    <button class="pink-button">
                        {{ $t('searchByParams') }}</button>
                </div>
                <div class="right">

                    <img src="../assets/images/main-page.png" alt="">
                </div>
            </div>

            <div class="main-page-header animate__animated" v-else-if="currentIndex === 2" :class="{
                'animate__slideInRight': currentIndex === 2 && direction === 'next',
                'animate__slideInLeft': currentIndex === 2 && direction === 'prev'
            }">
                <div class="left">
                    <h1>Мастер Краска 2</h1>
                    <div class="sub-header">{{ $t('officialRepres') }}
                    </div>
                    <button class="pink-button">
                        {{ $t('searchByParams') }}</button>
                </div>
                <div class="right">

                    <img src="../assets/images/main-page.png" alt="">
                </div>
            </div>


            <div class="controls">
                <img src="../assets/icons/arrow-right.svg" @click="prevSlide" />
                <div class="controls-circle">
                    <span @click="changeSlide(0)"
                        :class="{ 'active-control': currentIndex === 0, 'next-slide': direction === 'next', 'prev-slide': direction === 'prev' }"></span>
                    <span @click="changeSlide(1)"
                        :class="{ 'active-control': currentIndex === 1, 'next-slide': direction === 'next', 'prev-slide': direction === 'prev' }"></span>
                    <span @click="changeSlide(2)"
                        :class="{ 'active-control': currentIndex === 2, 'next-slide': direction === 'next', 'prev-slide': direction === 'prev' }"></span>
                </div>
                <img @click="nextSlide" src="../assets/icons/arrow-left.svg" />
            </div>
        </div>
    </div>



</template>

<script lang="ts" setup>
import 'animate.css';
const currentIndex = ref(0)
const direction = ref('');
const nextSlide = () => {
    if (currentIndex.value < 2) {
        currentIndex.value++
        direction.value = 'next';
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