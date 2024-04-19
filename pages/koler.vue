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
                        @click="chooseBrand(item?.name)" :class="{ 'active': item?.name === selectedBrand?.name }">
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
                                <div class="first-slide" v-if="slideNumber === 1"> <span
                                        v-for="(item, index) in currentBrandsColors.slice(0, 66)" :key="item?.id"
                                        class="koler-colors-item" :style="{ backgroundColor: '#' + item?.rgb }"
                                        @click="nextColor(item, index)"
                                        :class="{ 'selected-color': item?.id === selectedColor?.id }"></span>
                                </div>
                                <div class="second-slide" v-else-if="slideNumber === 2">second slider</div>
                                <div class="next">
                                </div>
                            </div>

                            <div class="bottom">
                                <div v-for="(item, index) in firstRow" :key="item.id" class="bottom-item"
                                    :class="{ 'selected-color': isColorSync(index, item?.id) }"
                                    :style="{ background: '#' + item.rgb, display: index >= startIndex && index < startIndex + 3 ? 'block' : 'none' }"
                                    @click="selectColor(item)">
                                    {{ item.code }}
                                </div>
                            </div>

                            <div class="bottom">
                                <div v-for="(item, index) in secondRow" :key="item.id" class="bottom-item"
                                    :class="{ 'selected-color': isColorSync(index, item?.id) }"
                                    :style="{ background: '#' + item.rgb, display: index + 10 >= startIndexSecondBlock && index + 10 < startIndexSecondBlock + 3 ? 'block' : 'none' }"
                                    @click="selectColor(item)">
                                    {{ item.code }}
                                </div>
                            </div>
                        </div>

                        <div class="koler-change">
                            <img src="../assets/images/koler.png" alt="">
                            <div id="bg" :style="{ background: '#' + selectedColor?.rgb || 'white' }"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Brands } from "~/types/Brands";
import { Tinting } from '@/types/Tinting'
const slideNumber = ref(1);
const currentBrandsColors = ref<Tinting[]>([]);
const bottomContainer = ref<HTMLElement | null>(null);
const allTingings = ref<Tinting[]>([])
const startIndex = ref(0);
const startIndexSecondBlock = ref(10);
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

const selectedColor = ref({} as Tinting)
const visibleItems = ref(3)

const firstRow = computed(() => allTingings.value.slice(0, 10));
const secondRow = computed(() => allTingings.value.slice(10, 20));
const selectColor = (item: Tinting) => {
    selectedColor.value = item;
}

const startIndexForSecondRow = computed(() => {
    return startIndex.value >= 10 ? startIndex.value - 10 : 0;
});

const isColorSync = (indx: number, id: string) => {
    console.log('wjat is indx in second', indx)
    const res = selectedColor?.value?.id === id;

    return res
}
const nextColor = (item: Tinting, index: number) => {

    selectedColor.value = item;

    if (index >= 10) {
        //   startIndexSecondBlock.value = 10 + (Math.floor((index - 10) / 3) * 3);
        startIndexSecondBlock.value = 10 + Math.floor((index - 10) / 3) * 3;
        console.log('what is startIndexSecondBlock', startIndexSecondBlock)
    } else {
        startIndex.value = Math.floor(index / 3) * 3;
    }

    console.log('what is index nextcolor', index)
}

const filteredBrands = ref<Brands[]>([]);

const fetchBrandsId = async (id: string) => {
    try {
        const response = await http(`/api/v1/Brand/get-brand/${id}`);
        if (response.status === 200) {
            return response.data
        }
    } catch (err) {
        console.log(err)
    }
}


const fetchAllData = async (ids: string[]) => {
    const results = [];
    for (const id of ids) {
        const data = await fetchBrandsId(id);
        if (data !== null) {
            results.push(data);
        }
    }
    console.log('what is results', results);
    filteredBrands.value = results.filter((item: Brands) => Boolean(item));
    selectedBrand.value = results[0];

    return results;
}


const fetchAllTintings = async () => {
    try {
        const response = await http('/api/v1/Tinting/get-all-tintings');
        if (response.status === 200) {
            allTingings.value = response.data;
            //currentBrandsColors.value = response.data.filter((item: Tinting) => item?.brandId === selectedBrand.value?.id)

            const uniqueIds = response.data.reduce((ids: any, obj: Tinting) => {
                if (!ids.includes(obj?.brandId)) {
                    ids.push(obj?.brandId);
                }
                return ids;
            }, []);

            await fetchAllData(uniqueIds)
        }
    } catch (err) {
        console.log(err)
    }
}
const remainingItems = computed(() => {
    const startIndex = currentPage.value * itemsPerPage;
    return currentBrandsColors.value.slice(startIndex + itemsPerPage);
});
const currentPage = ref(0);

const itemsPerRow = 3;
const itemsPerPage = 18;






const selectedBrand = ref<Brands>({} as Brands);
const chooseBrand = (value: string) => {
    //selectedBrand.value?.name = value;
}


onMounted(async () => {
    await fetchAllTintings();
    currentBrandsColors.value = allTingings.value?.filter((item: Tinting) => item?.brandId === selectedBrand?.value.id)
    console.log('currentBrandsColors', currentBrandsColors)
})
</script>

<style scoped lang="scss">
.koler-part {
    @include flex(row, start, start)
}



.selected-color {
    border: 1px solid $main-black !important;
}


.koler-colors {
    .first-slide {
        @include flex(row, start, start, 2px);
        flex-wrap: wrap;
    }

    &-item {
        width: 39px;
        height: 40px;
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


    .bottom-item:nth-child(n + 11) {
        width: 170px;
    }

    .bottom {
        display: flex;
        margin-top: 20px;

        &-item {
            background: #AC5E97;
            padding: 23px;
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

    top: 0;
    mix-blend-mode: hue;
    transform: translate3d(0, 0, 0);
    height: 540px;
    z-index: 1
}
</style>