<template>
    <section>
        <h1 class="main-header-h1">
            {{ $t('tinting') }}
        </h1>
        <div class="koler-section">
            <h1 class="main-header-h1">
                {{ $t('colorsMap') }}
            </h1>
            <div class="grid koler-section-select">
                <div class="col-2 koler-section-select-line">
                    <p v-for="item in filteredBrands" :key="item?.id" class="koler-section-select-names"
                        @click="chooseBrand(item?.name)" :class="{ 'active': item?.name === selectedBrand }">
                        {{ item?.name }}
                    </p>

                </div>

                <div class="col-9">

                    <input type="text" name="search" id="searcg" placeholder="Введите код цвета" class="basic-input">

                    <div class="danger-text">
                        {{ $t('kolerWarning') }}
                    </div>



                    <div class="koler-part">
                        <div class="koler-colors">
                            <div class="top">
                                <div class="prev">


                                </div>
                                <div class="first-slide" v-if="slideNumber === 1"> <span v-for="item in 72" :key="item"
                                        class="koler-colors-item"></span></div>
                                <div class="second-slide" v-else-if="slideNumber === 2">second slider</div>

                                <div class="next">

                                </div>
                            </div>

                            <div class="bottom">
                                <p v-for="item in 18" :key="item" class="bottom-item">

                                </p>

                            </div>
                        </div>
                        <div class="koler-change">
                            <img src="../assets/images/koler.png" alt="">
                            <div id="bg"></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Brands } from "~/types/Brands";
const brandsStore = useBrandsStore();

const slideNumber = ref(1)

const brandsNames = ['Marshall', 'Dulux',
    'Caparol',
    'Текс',
    'Tikkurila',
    'Fincolor',
    'Senideco',
    'Sirca',
    'Teknos',
    'Apollo Paint',
    'Elite',
    'MAXI+',
    'Monto',
    'ROYAL']

const filteredBrands = computed(() => {
    return brandsStore.getAllBrands.filter((item: Brands) => {
        return brandsNames.includes(item?.name)
    })
})
onMounted(() => {
    brandsStore.fetchAllBrands()
})

console.log('filteredBrands', filteredBrands)


const selectedBrand = ref('');
const chooseBrand = (value: string) => {
    selectedBrand.value = value;
}
</script>

<style scoped lang="scss">
.koler-part {
    @include flex(row, start, start)
}

.koler-colors {
    .first-slide {
        @include flex(row, start, start, 2px);
        flex-wrap: wrap;
    }

    &-item {
        width: 39px;
        height: 40px;
        background: #C992B1;
        display: block;
        margin: 2px;

        &:hover {
            border: 1px solid $main-black;
            cursor: pointer;
        }
    }

    .top {
        position: relative;
        padding: 10px 20px;

        .prev,
        .next {

            color: black !important;
            border: 1px solid $slider-border-color !important;
            padding: 10px;
            border-radius: 100%;
            width: 36px;
            height: 36px;
            top: 44%;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            @include flex(row, center, center);
            position: absolute;
            z-index: 3;
            background: white;

            &:hover {
                background: $main-blue;
                cursor: pointer;
            }
        }

        .prev {
            left: 0;
            background-image: url(../assets/icons/arrow-right.svg);

            &:hover {
                background-image: url(../assets/icons/white-arrow-right.svg);
            }
        }

        .next {
            right: 20px;
            background-image: url(../assets/icons/arrow-left.svg);

            &:hover {
                background-image: url(../assets/icons/arrow-left-white.svg);
            }
        }
    }

    .bottom {
        @include flex(row, start, start, 2px);
        flex-wrap: wrap;
        margin-top: 20px;

        &-item {
            width: 168px;
            background: #AC5E97;
            display: block;
            padding: 23px 34px;
            margin: 2px;
            border-radius: 4px;
            border: 1px solid transparent;

            &:hover {
                border: 1px solid $main-black;
                cursor: pointer;
            }
        }
    }
}

.koler-section {
    border: 1px solid $slider-border-color;
    border-radius: 10px;
    padding: 40px;
    margin-top: 40px;

    input {
        border-color: $input-border-color;
        width: 100%;

        &::placeholder {
            color: $main-dark-grey
        }
    }

    .danger-text {
        @include textFormat(16px, 20px, 500, #EB5757);
        margin: 20px 0 40px 0;



    }

    &-select {
        margin-top: 40px;

        &-names {
            @include textFormat(20px, 32px, 500, $main-black);

            &:hover {
                color: $main-blue;
                cursor: pointer;
            }

            &.active {
                color: $main-blue;
            }

        }

        &-line {
            @include flex(column, start, space-between, 20px);
            border-right: 1px solid $slider-border-color;
            padding-right: 20px;
            margin-right: 60px;
        }
    }
}

body {
    overflow: hidden;


}

img {
    position: relative;
    z-index: 2;
    width: 411px;
    height: 540px;
}

.koler-change {
    position: relative;
}

#bg {
    position: absolute;
    height: 100vh;
    width: 411px;
    background: yellow;
    top: 0;
    mix-blend-mode: hue;
    transform: translate3d(0, 0, 0);
    height: 540px;
    z-index: 1
}
</style>