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
                        @click="chooseBrand(item)" :class="{ 'active': item?.name === selectedBrand?.name }">
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
                                        v-for="(item, index) in slicedColors" :key="item?.id" class="koler-colors-item"
                                        :style="{ backgroundColor: '#' + item?.rgb }"
                                        @click="nextColor(item, index + 1)"
                                        :class="{ 'selected-color': item?.id === selectedColor?.id }"></span>
                                </div>
                                <div class="second-slide" v-else-if="slideNumber === 2">second slider</div>
                                <div class="next">
                                </div>
                            </div>
                            <div class="bottom" v-if="slicedColors?.length && totalRows && itemsPerRow">
                                <div v-for="rowIndex in totalRows" :key="rowIndex" class="each-row">
                                    <div v-for="(item, index) in  getRowItems(rowIndex) " :key="item.id"
                                        class="bottom-item"
                                        :class="{ 'selected-color': isColorSync(index, item?.id, rowIndex) }"
                                        :style="{ background: '#' + item.rgb }"
                                        @click="selectColor(item, index + 1, rowIndex)"
                                        v-show="shouldShow(index, rowIndex)">
                                        <span> {{ item.code }}</span>
                                    </div>
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
const allTingings = ref<Tinting[]>([])
const startIndex = ref(0);

const selectedBrand = ref<Brands>({} as Brands);

const itemsPerRow = ref(10);
let windowWidth = ref(window?.innerWidth)


const totalRows = ref(6);




const getRowItems = (rowIndex: number) => {
    if (slicedColors?.value && itemsPerRow?.value) {
        const startIdx = (rowIndex - 1) * itemsPerRow?.value;
        const endIdx = Math.min(startIdx + itemsPerRow?.value, slicedColors?.value?.length);
        const results = slicedColors?.value?.slice(startIdx, endIdx);
        return results;
    } else {
        return []
    }

};

const nextColor = (item: any, index: number) => {
    selectedColor.value = item;
    startIndex.value = index;
};

const selectColor = (item: Tinting, itemIndex: number, rowIndex: number) => {
    selectedColor.value = item;
    let actual = itemIndex * rowIndex;
    if (rowIndex === 1) {
        actual = itemIndex
    } else {
        actual = (rowIndex * itemsPerRow.value) - itemsPerRow?.value + itemIndex
    }



    let incudedActual: any = []
    for (let i = 1; i < 2; i++) {
        const current = (i * itemsPerRow?.value) - itemsPerRow?.value + itemIndex;
        incudedActual.push(current - 1, current, current + 1)
    }


}


const shouldShow = (index: number, rowIndex: number) => {

    let actual = index * rowIndex;
    if (rowIndex === 1) {
        actual = index
    } else {
        actual = (rowIndex * itemsPerRow.value) - itemsPerRow?.value + index
    }


    let incudedActual: any = []
    for (let i = 1; i <= totalRows?.value; i++) {
        const current = (i * itemsPerRow?.value) - itemsPerRow?.value + index;
        incudedActual.push(current - 1, current, current + 1)
    }

    const final = incudedActual?.includes(startIndex?.value - 1) ? incudedActual : [];
    return final !== null && final && final?.includes(index)

    // return actual === startIndex?.value || prevActual === startIndex?.value || nextActual === startIndex?.value

}


const calculateLayout = async (width: number) => {
    if (width > 1300) {
        itemsPerRow.value = 10;
    } else if (width < 768) {
        itemsPerRow.value = 8;
    } else if (width < 576) {
        itemsPerRow.value = 6;
    } else if (width < 448) {
        itemsPerRow.value = 4;
    } else {
        itemsPerRow.value = 10;
    }

    totalRows.value = Math.ceil(slicedColors.value.length / itemsPerRow.value);
    console.log('totalRows', totalRows)
};


const isColorSync = (indx: number, id: string, rowIndex: number) => {
    const res = selectedColor?.value?.id === id;
    return res
}


const slicedColors = computed(() => {
    return currentBrandsColors?.value?.slice(0, Math.ceil(currentBrandsColors.value?.length / 2));
});
const resizeHandler = async () => {
    const newWindowWidth = window.innerWidth;
    if (newWindowWidth !== windowWidth?.value) {
        windowWidth.value = newWindowWidth;
        await calculateLayout(windowWidth?.value);

    }
};

onMounted(async () => {
    await fetchAllTintings();
    window.addEventListener('resize', resizeHandler);
    await resizeHandler()
    await calculateLayout(windowWidth.value)
    currentBrandsColors.value = allTingings.value?.filter((item: Tinting) => item?.brandId === selectedBrand?.value.id)
});

onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler);
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
    currentBrandsColors.value = allTingings.value?.filter((item: Tinting) => item?.brandId === selectedBrand?.value.id)
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





const chooseBrand = async (value: Brands) => {
    selectedBrand.value = value;
    currentBrandsColors.value = allTingings.value?.filter((item: Tinting) => item?.brandId === selectedBrand?.value.id);
    resizeHandler();
    await calculateLayout(windowWidth?.value)
}


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
        width: 100%;
    }

    &-item {
        width: auto;
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

    .each-row {
        display: flex;
    }

    .bottom {
        display: flex;
        margin-top: 20px;
        flex-direction: column;

        &-item {
            background: #AC5E97;
            padding: 23px;
            margin: 2px;
            border-radius: 4px;
            width: 170px;
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

@media (min-width:1300px) {
    .first-slide {

        width: 482px !important;
    }
}

@media (max-width:1300px) {
    .first-slide {
        width: 482px !important;
    }
}

@media (max-width:768px) {
    .first-slide {
        width: 402px !important;
    }
}

@media (max-width:576px) {
    .first-slide {
        width: 382px !important;
    }
}

@media (max-width:448px) {
    .first-slide {
        width: 302px !important;
    }
}

@media (max-width:320px) {
    .first-slide {
        width: 202px !important;
    }
}
</style>