<template>
    <section>
        <h1 class="margin-bottom-40 ">Подбор по параметрам</h1>
        <div class="params-first blocks" v-for="(item, index) in firstBlock" :key="item?.id">
            <div class="params-header">
                <span>{{ index + 1 }}</span>
                <p>Для каких работ вам необходима краска</p>
            </div>

            <div class='flex flex-row gap-4'>

                <button v-for="btn in item?.subdirectory" :key="btn?.id" class="gray-buttons-border"
                    :class="{ 'selected-btn': typeOfWork === btn.id }"
                    @click="updateCheckboxState(item?.id, btn?.id, 'select-btn')">
                    {{ btn?.name }}
                    <img src="../assets/icons/carbon_checkmark-filled (1).svg" alt="carbon"
                        v-if="typeOfWork === btn.id">
                </button>
            </div>

        </div>


        <div class="params-first blocks second">
            <div class="params-header">
                <span>2</span>
                <p>Для каких работ вам необходима краска</p>
            </div>

            <div v-for="item in secondBlock" :key="item?.id" class="mb-5">
                <h4 class="filters-block-header">{{ item?.name }}</h4>
                <div class="all-inputs">
                    <p v-if="item?.subdirectory?.length" v-for="(sub, index) in getSlicedSubdirectories(item)"
                        :key="index" class="each-sub-item">
                        <label class="black-checkbox"> <input type="checkbox" :id="`${item.id}-${index}`"
                                :value="sub.id" :checked="isChecked(item.id, sub.id)"
                                @change="updateCheckboxState(item.id, sub.id, $event)" />
                            <span class="black-checkbox-span">{{ sub?.name }}</span>
                        </label>

                    </p>
                </div>
                <p v-if="getRemainingItemCount(item) > 0" class="open-block" @click="setOpenBlock(item?.id)">
                    {{ opensIncludes(item.id) ? 'Свернуть' : 'Еще' }} <span v-if="!opensIncludes(item.id)">{{
            getRemainingItemCount(item) }}</span>
                    <img class="arrow" :class="{ 'rotated': opensIncludes(item.id) }"
                        src="../assets/icons/arrow-down-blue.svg" alt="open-arrow">
                </p>
            </div>

        </div>


        <div class="params-first blocks third">
            <div class="params-header">
                <span>3</span>
                <p>Какое покрытие вы хотите получить в результате</p>
            </div>

            <div v-for="item in thirdBlock" :key="item?.id" class="mb-5">
                <h4 class="filters-block-header">{{ item?.name }}</h4>
                <div class="all-inputs">
                    <p v-if="item?.subdirectory?.length" v-for="(sub, index) in getSlicedSubdirectories(item)"
                        :key="index" class="each-sub-item">
                        <label class="black-checkbox"> <input type="checkbox" :id="`${item.id}-${index}`"
                                :value="sub.id" :checked="isChecked(item.id, sub.id)"
                                @change="updateCheckboxState(item.id, sub.id, $event)" />
                            <span class="black-checkbox-span">{{ sub?.name }}</span>
                        </label>
                    </p>
                </div>

                <p v-if="getRemainingItemCount(item) > 0" class="open-block" @click="setOpenBlock(item?.id)">
                    {{ opensIncludes(item.id) ? 'Свернуть' : 'Еще' }} <span v-if="!opensIncludes(item.id)">{{
            getRemainingItemCount(item) }}</span>
                    <img class="arrow" :class="{ 'rotated': opensIncludes(item.id) }"
                        src="../assets/icons/arrow-down-blue.svg" alt="open-arrow">
                </p>
            </div>

        </div>

        <div class="params-first blocks fourth">
            <div class="params-header">
                <span>4</span>
                <p>Оцените бюджет на покупку</p>
            </div>

            <div class="buttons-price">
                <input type="text" placeholder="От" class="basic-input" v-model="minPrice">
                <input type="text" placeholder="До" class="basic-input" v-model="maxPrice">
            </div>
            <button class="bg-white-btn" @click="filterProductParams">Применить</button>
        </div>


        <div class="params-results" v-if="showResults">
            <h3>
                Краски по вашему запросу
            </h3>

            <div class="params-result-prod" v-if="productsStore.getFilteredProducts?.length">
                <ProductsProductItem v-for="product in productsStore.getFilteredProducts" :key="product?.id"
                    :product="product" />
            </div>

            <div v-else>Нет данных</div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { AllCatalog, CatalogItem, SubCatalog, CatalogCheckbox } from '~/types/Catalog';
const showResults = ref(false)
const catalogStore = useCatalogStore();
const productsStore = useProductsSstore();
const minPrice = ref(0)
const maxPrice = ref(0)
const typeOfWork = ref('')
const selectTypeOfWork = (item: SubCatalog) => {
    //  typeOfWork.value = [item]
    console.log('firstBlock', firstBlock);
    productsStore.setTypeOfWork(typeOfWork.value)

}
const items = [
    {
        id: "d12f4dfb-6f54-4a37-9cd3-1d6d5423e084",
        name: "ТИП РАБОТ"
    },
    {
        id: "c8409cbf-4b89-492d-bbb6-fce1813815d3",
        name: "ТИП ЛКМ"
    },
    {
        id: "5ff5e6eb-884b-4e64-ae7b-d99bede77b9b",
        name: "МАТЕРИАЛ РАБОЧЕЙ ПОВЕРХНОСТИ"
    },
    {
        id: "d637e138-5784-4d3d-bb91-77a7a185469e",
        name: "ТИП ОБЪЕКТА"
    },
    {
        id: "4b5d79cb-b7fd-4646-8dc2-6fafd0d3fd3e",
        name: "РАЗБАВИТЕЛЬ"
    }
]

const filteredCatalogs = computed(() => {
    return catalogStore.getAllCatalogs.filter((item: AllCatalog) => {
        return items.filter((obj) => obj.name === item?.name)
    })

})

const firstBlock = computed(() => {
    return filteredCatalogs.value.filter((item: AllCatalog) => {
        return item?.name === 'ТИП РАБОТ'
    })
})

const secondOptions = [
    'МАТЕРИАЛ РАБОЧЕЙ ПОВЕРХНОСТИ', 'ТИП ОБЪЕКТА', 'РАЗБАВИТЕЛЬ'
]
const secondBlock = computed(() => {
    return filteredCatalogs.value.filter((item) => {
        return secondOptions?.includes(item?.name)
    })
})

const thirdBlock = computed(() => {
    return filteredCatalogs.value.filter((item) => item?.name === 'ТИП ЛКМ')
})


const setOpenBlock = (id: string) => {
    if (openedBlockFilters.value?.includes(id)) {
        openedBlockFilters.value = openedBlockFilters.value.filter((itemId: string) => itemId !== id)
    } else {
        openedBlockFilters.value.push(id)
    }

}
const isChecked = (itemId: string, subId: string) => {
    return checkboxStates?.value[itemId]?.values?.find((val: { id: string }) => val.id === subId)?.value || false;
};
const initializeCheckboxStates = async () => {
    return await catalogStore.getAllCatalogs.map(item => {
        return checkboxStates.value[item.id] = {
            name: item.name,
            id: item.id,
            values: item.subdirectory.map(sub => ({ id: sub.id, value: false, name: sub?.name }))
        };
    });
};


onMounted(async () => {
    await catalogStore.fetchAllCatalogs()
    await initializeCheckboxStates()

})

const openedBlockFilters = ref<string[]>([]);

const updateCheckboxState = (itemId: string, subId: string, event: any) => {
    const subIndex = checkboxStates?.value[itemId]?.values?.findIndex((val: { id: string }) => val.id === subId);

    if (event === 'select-btn' && subIndex !== -1) {
        if (checkboxStates.value[itemId]?.values) {
            checkboxStates.value[itemId].values[subIndex].value = true;
            checkboxStates.value[itemId].values.forEach((val: { id: string, value: boolean }) => {
                if (val.id !== subId) {
                    val.value = false;
                }
            });
            // Set the typeOfWork to the id of the clicked button
            typeOfWork.value = subId;
        }
    }


    else {
        const checked = event.target.checked;

        if (checkboxStates.value[itemId]?.values) {
            checkboxStates.value[itemId].values[subIndex].value = checked;
        }
    }


    console.log('checkboxStates', checkboxStates)
    const valuesArray = Object.values(checkboxStates.value);


    const filteredValues = valuesArray.flatMap(item => item.values?.filter((sub: { value: boolean }) => sub.value === true));
    if (!filteredValues?.length) {
        productsStore.setSubDirectories(null);
    }


    productsStore.setSubDirectories(filteredValues)


    console.log('filteredValues', filteredValues)


};
const opensIncludes = (id: string) => {
    return openedBlockFilters?.value?.includes(id)
}

const getRemainingItemCount = (item: AllCatalog) => {
    return item?.subdirectory ? Math.max(item.subdirectory.length - 5, 0) : 0;
}
const getSlicedSubdirectories = (item: AllCatalog) => {
    if (item?.subdirectory && opensIncludes(item?.id)) {
        return item.subdirectory;
    } else {
        return item.subdirectory.slice(0, 5)
    }
    // return item?.subdirectory ? item.subdirectory.slice(0, 5) : [];
}
const checkboxStates = ref<{ [key: string]: CatalogCheckbox }>({});


const filterProductParams = () => {
    if (minPrice?.value >= 0 && maxPrice.value > 0) {
        productsStore.setPrices(minPrice.value, maxPrice.value)
    }

    showResults.value = true
    setTimeout(() => {
        productsStore.filterProducts()
    }, 500)
}

</script>

<style scoped lang="scss">
.black-checkbox input[type="checkbox"] {
    display: none;
}

.black-checkbox-span {
    position: relative;
    display: inline-block;
    /* Ensure proper rendering of the pseudo-element */
}

.black-checkbox-span::before {
    content: "";
    position: absolute;
    width: 100%;
    max-width: 18px;
    height: 18px;
    border: 1px solid black;
    left: -30px;


}

.black-checkbox input[type="checkbox"]:checked+.black-checkbox-span::before {
    display: flex;
    align-items: center;
    justify-content: center;
    content: url("../assets/icons/check-icon-vector.svg");
    width: 18px;
    height: 18px;


    background: black;
}



.params-result-prod {
    @include flex(flex, start, start);

}

.params-results {
    h3 {
        margin-bottom: 40px;
    }
}

.buttons-price {
    @include flex(flex, start, start, 60px);
}

.blocks {
    margin-bottom: 90px;
}

.all-inputs {
    padding: 10px 2rem;
    margin-top: 34px;
    @include flex(row, start, start, 20px);
    flex-wrap: wrap;

    .each-sub-item {
        margin: 7px 15px;
        width: 15%;
    }
}

.params {
    &-header {
        @include flex(row, start, baseline, 20px);

        span {
            @include textFormat(54px, 73px, 600, $main-pink)
        }

        p {
            @include textFormat(28px, 28px, 700, $main-black);
            margin-bottom: 41px;
        }
    }
}







.params-subinfo {
    @include textFormat(20px, 20px, 600, $main-black)
}


.open-block {
    @include textFormat(16px, 20px, 500, $blue-color);
    @include flex(row, start, center, 4px);
    margin-top: 12px;
}






.bg-white-btn {
    box-shadow: 0px 0px 0px 0.5px #0000000D;
    box-shadow: 0px 0.5px 2.5px 0px #0000004D;
    margin-top: 40px;
}
</style>