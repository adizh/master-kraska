<template>
    <div class='filters'>
        <div class="price">
            <label for="price" class="filters-help">
                {{ $t('price') }}
            </label>
            <div> <input type="text" :placeholder="$t('from')" class="basic-input"
                    v-model="productsStore.filters.minPrice" @input="handlePrices">
                <input type="text" :placeholder="$t('to')" class="basic-input" v-model="productsStore.filters.maxPrice"
                    @input="handlePrices">
            </div>
        </div>
        <div class="brands">
            <label for="price" class="filters-help">
                {{ $t('brands') }}
            </label>
            <div>
                <p v-if="brandsStore.getAllBrands" v-for="(brand, index) in computedBrands" :key="brand?.id"
                    class="each-sub-item">
                    <label class="custom-checkbox">
                        <input type="checkbox" :id="`${brand?.id}`" :value="brand.id"
                            @input="updateBrandsInputs(brand, $event)" :checked="brand?.id === queryBrand?.id" />
                        <p><span>{{ brand?.name }}</span></p>

                    </label>
                </p>
                <p class="open-block" v-if="getRemainingBrands">
                    <span @click="openBrands" v-if="!isBrandOpen"> {{ $t('more') }} {{ getRemainingBrands }}
                    </span>
                    <span @click="isBrandOpen = false" v-else> {{ $t('closeBlock') }}
                    </span>
                    <img class="arrow" :class="{ 'rotated': isBrandOpen }" src="../../assets/icons/arrow-down-blue.svg"
                        alt="open-arrow">
                </p>
            </div>
        </div>
        <div class="filters-block">
            <div v-for="item in catalogStore.getAllCatalogs" :key="item?.id" class="each-filter-block"
                :class="{ 'each-filter-block open': opensIncludes(item.id) }">
                <h4 class="filters-block-header">{{ item?.name }}</h4>
                <p v-if="!helpersRadio?.includes(item?.nameRu) && item?.subdirectory?.length"
                    v-for="(sub, index) in getSlicedSubdirectories(item)" :key="index" class="each-sub-item">
                    <label class="custom-checkbox">
                        <input type="checkbox" :id="`${item.id}-${index}`" :value="sub.id"
                            :checked="isChecked(item.id, sub.id)"
                            @change="updateCheckboxState(item.id, sub.id, $event)" />
                        <p><span>{{ sub?.name }}</span></p>
                    </label>
                </p>

                <p v-else-if="selectedBoolValues[item?.id] || helpersRadio?.includes(item?.nameRu)">
                <div class="custom-radio">
                    <input type="radio" :id="'radio_' + item.id + '_true'" :value="true"
                        v-model="selectedBoolValues[item.id].value" @change="handleInputChange()">
                    <label :for="'radio_' + item?.id + '_true'">
                        <span class="radio-icon"></span>
                        {{ $t('yes') }}
                    </label>
                </div>
                <div class="custom-radio mt-2">
                    <input type="radio" :id="'radio_' + item.id + '_false'" :value="false"
                        v-model="selectedBoolValues[item.id].value" @change="handleInputChange()">
                    <label :for="'radio_' + item?.id + '_false'">
                        <span class="radio-icon"></span>
                        {{ $t('no') }}
                    </label>
                </div>


                </p>
                <p v-if="getRemainingItemCount(item) > 0" class="open-block" @click="setOpenBlock(item?.id)">
                    {{ opensIncludes(item.id) ? $t('closeBlock') : $t('more') }} <span v-if="!opensIncludes(item.id)">{{
                    getRemainingItemCount(item) }}</span>
                    <img class="arrow" :class="{ 'rotated': opensIncludes(item.id) }"
                        src="../../assets/icons/arrow-down-blue.svg" alt="open-arrow">
                </p>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { AllCatalog, CatalogCheckbox } from '@/types/Catalog'
import { Brands } from '~/types/Brands';
type BoolValues = {
    value: boolean,
    id: string;
    name: string;
}

interface BoolCatalog {
    id: string;
    name: string;
}

const route = useRoute()
const productsStore = useProductsSstore()
const catalogStore = useCatalogStore();
const authStore = useAuthStore();
const checkboxStates = ref<{ [key: string]: CatalogCheckbox }>({});
const selectedBoolValues: Ref<Record<string, BoolValues>> = ref({});
const openedBlockFilters = ref<string[]>([]);
const brandsStore = useBrandsStore();
const queryBrand = route?.query
const isBrandOpen = ref(false)

const helpersRadio = ['Без запаха', 'Моющееся покрытие', 'Атмосферостойкое покрытие', 'Износостойкое покрытие', 'Одобрено Ассоциацией Качества Краски', 'Быстросохнущая', 'Грязе и водоотталкивающее покрытие']

const radiosCatalogs = computed(() => {
    return catalogStore.getAllCatalogs.filter((item) => helpersRadio.includes(item?.nameRu))
})
const getRemainingBrands = computed(() => {
    return brandsStore.getAllBrands?.length - 5
})

const openBrands = () => {
    isBrandOpen.value = true
}

const computedBrands = computed(() => {
    return !isBrandOpen.value ? brandsStore.getAllBrands.slice(0, 5) : brandsStore.getAllBrands
})

const initializeCheckboxStates = async () => {
    await catalogStore.getAllCatalogs.map(item => {
        checkboxStates.value[item.id] = {
            name: item.name,
            id: item.id,
            values: item.subdirectory.map(sub => ({ id: sub.id, value: false, name: sub?.name }))
        };
    });
    console.log('initializeCheckboxStates checkboxStates', checkboxStates)

};


const handlePrices = () => {
    setTimeout(() => {
        productsStore.filterProducts()
    }, 600)

}


const isChecked = (itemId: string, subId: string) => {
    return checkboxStates?.value[itemId]?.values?.find((val: { id: string }) => val.id === subId)?.value || false;
};



const initBools = async () => {
    return await radiosCatalogs.value.map((item: BoolCatalog) => {
        selectedBoolValues.value[item.id] = {
            name: item.name,
            id: item.id,
            value: false
        };
    });

}



const updateBrandsInputs = (brand: Brands, event: any) => {
    console.log(brand);
    console.log(event.target.checked);

    const brandIndex = productsStore.filters.brandId.indexOf(brand?.id);

    if (event.target.checked === true) {

        if (brandIndex === -1) {
            productsStore.filters.brandId.push(brand?.id);
        }
    } else {

        if (brandIndex !== -1) {
            productsStore.filters.brandId.splice(brandIndex, 1);
        }
    }

    productsStore.filterProducts()
};

const handleInputChange = () => {
    const allBoolValues = {
        'Быстросохнущая': 'fastDrying',
        'Одобрено Ассоциацией Качества Краски': 'approvedByThePaintQualityAssociation',
        'Без запаха': 'withoutSmell',
        'Моющееся покрытие': 'washableCoating',
        'Атмосферостойкое покрытие': 'weatherResistantCoating',
        'Износостойкое покрытие': 'wearResistantCoating',
        'Грязе и водооталкивающее покрытие': 'dirtAndWaterRepellentCoating'
    }

    let query: { [key: string]: boolean } = {};
    Object.values(selectedBoolValues.value).map((item) => {
        query[allBoolValues[item?.name as keyof typeof allBoolValues]] = item?.value
    })


    productsStore.setBoolParams(query);
    productsStore.filterProducts()

}


const updateCheckboxState = (itemId: string, subId: string, event: any) => {
    const checked = event.target.checked;
    const subIndex = checkboxStates?.value[itemId]?.values?.findIndex((val: { id: string }) => val.id === subId);
    if (checkboxStates.value[itemId]?.values) {
        checkboxStates.value[itemId].values[subIndex].value = checked;
    }

    const valuesArray = Object.values(checkboxStates.value);


    const filteredValues = valuesArray.flatMap(item => item.values?.filter((sub: { value: boolean }) => sub.value === true));
    if (!filteredValues?.length) {
        productsStore.setSubDirectories(null);
    }

    console.log('checkboxStates', checkboxStates)
    productsStore.setSubDirectories(filteredValues)
    console.log('filteredValues', filteredValues)
    productsStore.filterProducts()
};


const opensIncludes = (id: string) => {
    return openedBlockFilters.value.includes(id)
}

const setOpenBlock = (id: string) => {
    if (openedBlockFilters.value.includes(id)) {
        openedBlockFilters.value = openedBlockFilters.value.filter((itemId: string) => itemId !== id)
    } else {
        openedBlockFilters.value.push(id)
    }

}

const getSlicedSubdirectories = (item: AllCatalog) => {
    if (item?.subdirectory && opensIncludes(item?.id)) {
        return item.subdirectory;
    } else {
        return item.subdirectory.slice(0, 5)
    }

}

const getRemainingItemCount = (item: AllCatalog) => {
    return item?.subdirectory ? Math.max(item.subdirectory.length - 5, 0) : 0;
}




onMounted(async () => {
    await catalogStore.fetchAllCatalogs();
    await initializeCheckboxStates();
    brandsStore.fetchAllBrands()
    initBools()
    if (queryBrand && queryBrand?.id) {
        isBrandOpen.value = true
        productsStore?.filters.brandId.push(queryBrand?.id as string);
        productsStore.filterProducts()
    }

})


watch(() => authStore.getSelectedLang, async (newVal, oldVal) => {
    await catalogStore.fetchAllCatalogs();
    initializeCheckboxStates();
});


</script>

<style lang="scss" scoped>
.open-block {
    @include textFormat(16px, 20px, 500, $blue-color);
    @include flex(row, start, center, 4px);
    margin-top: 12px;
}




.each-sub-item {
    margin: 7px 0;
}

.filters {
    .basic-input {
        padding: 9px;
    }

    &-help {
        @include textFormat(20px, 20px, 600, #000);
        margin-bottom: 10px;
        max-width: 250px;
        width: 100%;
        display: block;
    }

    .each-filter-block {
        margin-top: 40px;
    }

    .each-filter-block.open {
        border: 1px solid $slider-border-color;
        padding: 12px 10px;
        max-height: 217px;
        height: 100%;
        scrollbar-gutter: stable;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #222;
            border-radius: 5px;
        }

        &::-webkit-scrollbar-track {
            background: #D9D9D9;
            border-radius: 10px;

        }


    }



    &-block {
        margin-top: 40px;

        &-header {
            @include textFormat(20px, 20px, 600, #000);
            margin: 0 0 22px 0;
        }
    }

}

.brands {
    margin-top: 40px;
}

.price {
    @include flex(column, center, start, 5px);

    input {
        width: 35%;

        &:first-child {
            margin-right: 10px
        }
    }
}


.custom-radio input[type="radio"] {
    display: none;
    /* Hide the default radio button */
}

.custom-radio label {
    position: relative;
    cursor: pointer;
    padding-left: 25px;
    /* Space for the custom icon */
    margin-right: 15px;
    font-size: 16px;
}

.custom-radio .radio-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    /* Circle color */
    border: 2px solid #000;
    /* Circle border color */
}

.custom-radio input[type="radio"]:checked+label .radio-icon::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #000;
    /* Custom icon color */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>