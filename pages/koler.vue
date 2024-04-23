<template>
    <section v-if="allTingings?.length > 0">
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
                        @click="chooseBrand(item)" :class="{ 'active': item?.name === selectedBrand?.name }">
                        {{ item?.name }}
                    </p>
                </div>

                <div class="col-9 second-block">
                    <input type="text" name="search" id="searcg" placeholder="Введите код цвета" class="basic-input">
                    <div class="danger-text">
                        {{ $t('kolerWarning') }}
                    </div>

                    <div class="koler-part">
                        <div class="koler-colors">
                            <div class="bottom" v-if="currentBrandsColors?.length">
                                <div v-for="item in  currentBrandsColors?.slice(0, 27)" :key="item.id"
                                    class="bottom-item" :style="{ background: '#' + item.rgb }"
                                    @click="selectColor(item)"
                                    :class="{ 'selected-color': item?.id === selectedColor?.id }">
                                    <span> {{ item.code }}</span>
                                </div>

                            </div>


                            <UIPagination :total="10" :currentActive="currentPage" @changePage="changePage" />


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


    <section v-else>
        <ProgressSpinner />
    </section>
</template>

<script setup lang="ts">
import { Brands } from "~/types/Brands";
import { Tinting } from '@/types/Tinting'


const currentBrandsColors = ref<Tinting[]>([]);
const allTingings = ref<Tinting[]>([])

const currentPage = ref(1);
const changePage = (page: number) => {
    currentPage.value = page;
}

const selectedBrand = ref<Brands>({} as Brands);


const selectColor = (item: Tinting) => {
    selectedColor.value = item;
}




onMounted(async () => {
    await fetchAllTintings();
    currentBrandsColors.value = allTingings.value?.filter((item: Tinting) => item?.brandId === selectedBrand?.value.id);

    const alllitems = await http('api/v1/Category/get-all-top-categories');
    console.log('api/v1/Category/get-all-top-categories', alllitems)
});



const selectedColor = ref({} as Tinting)
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
    const idsNull = ['902dea30-e9a6-4d6c-accf-97d4590d9852', '8b9f00af-1ff0-400e-be67-3f4753c89970'];
    const filtered = ids.filter((item) => !idsNull.includes(item))
    const results = [];
    for (const id of filtered) {
        const data = await fetchBrandsId(id);
        if (data !== null) {
            results.push(data);
        }
    }

    filteredBrands.value = results.filter((item: Brands) => Boolean(item));
    selectedBrand.value = results[0];
    currentBrandsColors.value = allTingings.value?.filter((item: Tinting) => item?.brandId === selectedBrand?.value.id);

    return []
}


const fetchAllTintings = async () => {
    try {
        const response = await http('/api/v1/Tinting/get-all-tintings');
        if (response.status === 200) {
            allTingings.value = response.data;
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





const chooseBrand = (value: Brands) => {
    selectedBrand.value = value;
    currentBrandsColors.value = allTingings.value?.filter((item: Tinting) => item?.brandId === selectedBrand?.value.id);
}


</script>

<style scoped lang="scss">
:deep(.swiper-button-next,
    .swiper-button-prev),
:deep(.swiper-button-prev) {
    color: black !important;
    border: 1px solid $slider-border-color !important;
    padding: 10px;
    border-radius: 100%;
    width: 36px;
    height: 36px
}

:deep(#mySlider) {
    width: 500px !important;
}

.koler-part {
    @include flex(row, start, start)
}



.selected-color {
    border: 1px solid $main-black !important;
}




.koler-colors {
    width: 65%;

    .first-slide {
        @include flex(row, start, start, 2px);
        flex-wrap: wrap;
        width: 100%;
    }

    &-item {
        box-sizing: border-box;
        width: 39px;
        height: 40px;
        display: block;
        margin: 2px;

        &:hover {
            border: 1px solid $main-black;
            cursor: pointer;
        }
    }



    .each-row {
        display: flex;
    }

    .bottom {
        @include flex(row, start, center);
        margin-top: 20px;
        flex-wrap: wrap;
        margin-bottom: 42px;

        &-item {
            background: #AC5E97;
            padding: 23px;
            margin: 2px;
            border-radius: 4px;
            width: 30%;
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
    width: 100%;
    height: 540px;
}

.koler-change {
    position: relative;
    width: 45%;
}

#bg {
    position: absolute;
    height: 95% !important;
    width: 100%;
    top: 0;
    mix-blend-mode: hue;
    transform: translate3d(0, 0, 0);
    height: 540px;
    z-index: 1
}




@media (max-width:1000px) {

    .img {
        height: 440px !important;
    }

    .koler-section {
        padding: 0;
        border: none;
    }

    .koler-section-select-line {
        margin-right: 15px;
        word-wrap: break-word;
    }

    .col-9 {
        width: 80% !important;
    }

    .koler-colors .bottom-item {
        width: 45%;
        padding: 10px 20px;
    }
}

@media (max-width:768px) {
    .koler-part {
        flex-direction: column
    }

    .koler-change {
        width: 65%;
        margin-top: 30px;
    }

    .koler-colors {
        width: 100%;
    }

    .koler-colors .bottom-item {
        width: 30%;
    }


    .koler-section-select {
        flex-direction: column;
    }

    .koler-section-select-line {
        flex-direction: row;
        width: 100% !important;
        flex-wrap: wrap;
    }
}

@media (max-width:576px) {

    .second-block,
    .koler-change {
        width: 100% !important;
    }

    .koler-colors .bottom-item {
        width: 45%;
    }



}
</style>