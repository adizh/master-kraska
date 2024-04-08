<template>
    <div class='filters'>
        <div class="price">
            <label for="price" class="filters-help">
                Цена
            </label>
            <div> <input type="text" placeholder="От" class="basic-input">
                <input type="text" placeholder="До" class="basic-input">
            </div>
        </div>

        <div class="filters-block">

            <div>
                <div v-for="item in catalogStore.getAllCatalogs" :key="item?.id">
                    <h4 class="filters-block-header">{{ item?.name }}</h4>
                    <p v-if="item?.subdirectory?.length" v-for="(sub, index) in getSlicedSubdirectories(item)"
                        :key="index" class="each-sub-item">
                        <label class="custom-checkbox">
                            <input type="checkbox" :id="`${item.id}-${index}`" :value="sub.id"
                                :checked="isChecked(item.id, sub.id)"
                                @change="updateCheckboxState(item.id, sub.id, $event)" />
                            <p><span>{{ sub?.name }}</span></p>
                        </label>
                    </p>

                    <p v-else-if="!item?.subdirectory?.length && selectedBoolValues[item?.id]">
                    <div class="custom-radio">
                        <input type="radio" :id="'radio_' + item.id + '_true'" :value="true"
                            v-model="selectedBoolValues[item.id].value" @change="handleInputChange(item.id)">
                        <label :for="'radio_' + item?.id + '_true'">
                            <span class="radio-icon"></span>
                            Да
                        </label>
                    </div>
                    <div class="custom-radio mt-2">
                        <input type="radio" :id="'radio_' + item.id + '_false'" :value="false"
                            v-model="selectedBoolValues[item.id].value" @change="handleInputChange(item.id)">
                        <label :for="'radio_' + item?.id + '_false'">
                            <span class="radio-icon"></span>
                            Нет
                        </label>
                    </div>
                    <!-- <input type="radio" :id="'radio_' + item.id + '_true'" :value="true"
                            v-model="selectedBoolValues[item.id].value" @change="handleInputChange(item.id)">
                        <label :for="'radio_' + item?.id + '_true'">Да</label>
                        <input type="radio" :id="'radio_' + item.id + '_false'" :value="false"
                            v-model="selectedBoolValues[item.id].value" @change="handleInputChange(item.id)">
                        <label :for="'radio_' + item?.id + '_false'">Нет</label> -->

                    </p>

                    <p v-if="getRemainingItemCount(item) > 0" class="open-block" @click="setOpenBlock(item?.id)">
                        {{ opensIncludes(item.id) ? 'Свернуть' : 'Еще' }} <span v-if="!opensIncludes(item.id)">{{
                    getRemainingItemCount(item) }}</span>
                        <img class="arrow" :class="{ 'rotated': opensIncludes(item.id) }"
                            src="../../assets/icons/arrow-down-blue.svg" alt="open-arrow">
                    </p>


                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { AllCatalog, CatalogCheckbox, CatalogItem, SubCatalog } from '@/types/Catalog'
import Catalog from '../Catalog.vue';
const value = ref(false);
const productsStore = useProductsSstore()
const catalogStore = useCatalogStore();
const route = useRoute()
const id = route.params?.id;

const selectedItemBool = ref('')
const allSubCatalogs = ref<any>([]);
const checkboxStates = ref<{ [key: string]: CatalogCheckbox }>({});
const initializeCheckboxStates = async () => {
    return await catalogStore.getAllCatalogs.map(item => {
        return checkboxStates.value[item.id] = {
            name: item.name,
            id: item.id,
            values: item.subdirectory.map(sub => ({ id: sub.id, value: false }))
        };
    });
};





const getCheckboxValue = computed(() => (itemId: string, subId: string) => {
    return checkboxStates.value[itemId]?.values.find((val: { id: string }) => val.id === subId)?.value || false;
});


const isChecked = (itemId: string, subId: string) => {
    return checkboxStates?.value[itemId]?.values?.find((val: { id: string }) => val.id === subId)?.value || false;
};



interface BoolCatalog {
    id: string;
    name: string;
}



interface BoolCatalogWithValues extends BoolCatalog {
    value: boolean
}

type BoolValues = {
    value: boolean,
    id: string;
    name: string;
}
const selectedBoolValues: Ref<Record<string, BoolValues>> = ref({});

const boolCatalogs = computed(() => {
    return catalogStore.getAllCatalogs.filter((item) => !item?.subdirectory?.length)
})

const initBools = async () => {
    return await boolCatalogs.value.map((item: BoolCatalog) => {
        selectedBoolValues.value[item.id] = {
            name: item.name,
            id: item.id,
            value: false
        };
    });

}
console.log('selectedBoolValues', selectedBoolValues)

const handleInputChange = (id: string) => {
    const allBoolValues = {
        fastDrying: 'БЫСТРОСОХНУЩАЯ',
        approvedByThePaintQualityAssociation: 'ОДОБРЕНО АССОЦИАЦИЕЙ КАЧЕСТВА КРАСКИ',
        withoutSmell: 'БЕЗ ЗАПАХА',
        washableCoating: 'МОЮЩЕЕСЯ ПОКРЫТИЕ',
        weatherResistantCoating: 'АТМОСФЕРОСТОЙКОЕ ПОКРЫТИЕ',
        wearResistantCoating: 'ИЗНОСОСТОЙКОЕ ПОКРЫТИЕ',
        dirtAndWaterRepellentCoating: 'ГРЯЗЕ И ВОДООТТАЛКИВАЮЩЕЕ ПОКРЫТИЕ'

    }
    //  [{ name: "ОДОБРЕНО АССОЦИАЦИЕЙ КАЧЕСТВА КРАСКИ" },
    // { name: "БЫСТРОСОХНУЩАЯ", id: "2d0c8c8c-a456-4fbb-9b8d-6174b4e44709", value: false },
    // { name: "АТМОСФЕРОСТОЙКОЕ ПОКРЫТИЕ", id: "5dba6512-f0de-4265-a66b-3ccaa1a5a203", value: false },
    // { name: "МОЮЩЕЕСЯ ПОКРЫТИЕ", id: "27aa1137-c685-45bb-a7f7-ca8d323d7a63", value: true },
    // { name: "ГРЯЗЕ И ВОДООТТАЛКИВАЮЩЕЕ ПОКРЫТИЕ", id: "441dd4d7-55a0-4937-9e2d-c29c1594e8ef", value: false },
    // { name: "БЕЗ ЗАПАХА", id: "6852bea6-56c4-4ba5-8c36-e5b41d532dc1", value: false },
    // { name: "ИЗНОСОСТОЙКОЕ ПОКРЫТИЕ", id: "a3103539-913b-4dc8-a87c-66b16aad4078", value: false }]

    const query: { [key: string]: boolean } = {};
    for (const key in allBoolValues) {
        if (allBoolValues.hasOwnProperty(key)) {
            const value = allBoolValues[key as keyof typeof allBoolValues]
            const boolObject = Object.values(selectedBoolValues?.value)?.find((obj: BoolValues) => obj?.name === value);
            if (boolObject && boolObject?.value !== undefined) {
                query[key] = boolObject?.value;
            }

        }
    }


    productsStore.setBoolParams(query);
    productsStore.filterProducts()



};




const updateCheckboxState = (itemId: string, subId: string, event: any) => {
    const checked = event.target.checked;
    const subIndex = checkboxStates?.value[itemId]?.values?.findIndex((val: { id: string }) => val.id === subId);
    if (checkboxStates.value[itemId]?.values) {
        checkboxStates.value[itemId].values[subIndex].value = checked;
    }

    const valuesArray = Object.values(checkboxStates.value);
    console.log('valuesArray', valuesArray)

    const filteredValues = valuesArray.flatMap(item => item?.values?.filter((sub: { value: boolean }) => sub.value));
    if (!filteredValues?.length) {
        productsStore.setSubDirectories(null);
    }


    console.log('updateCheckboxState checkboxStates', checkboxStates);
    console.log('filteredValues', filteredValues)
    filteredValues.map((item: { id: string, value: boolean }) => {
        productsStore.setSubDirectories(item);

    })
    productsStore.filterProducts()



};



const openedBlockFilters = ref<string[]>([]);
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
    // return item?.subdirectory ? item.subdirectory.slice(0, 5) : [];
}
const getRemainingItemCount = (item: AllCatalog) => {
    return item?.subdirectory ? Math.max(item.subdirectory.length - 5, 0) : 0;
}
onMounted(async () => {
    await catalogStore.fetchAllCatalogs();
    await initializeCheckboxStates();
    initBools()

})


console.log('checkboxStates', checkboxStates)

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

    &-block {
        margin-top: 40px;

        &-header {
            @include textFormat(20px, 20px, 600, #000);
            margin: 40px 0 22px 0;
        }
    }

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
    display: none; /* Hide the default radio button */
}

.custom-radio label {
    position: relative;
    cursor: pointer;
    padding-left: 25px; /* Space for the custom icon */
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
    background-color: #fff; /* Circle color */
    border: 2px solid #000; /* Circle border color */
}

.custom-radio input[type="radio"]:checked + label .radio-icon::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #000; /* Custom icon color */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>