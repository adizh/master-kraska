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
                    <p v-for="(sub, index) in getSlicedSubdirectories(item)" :key="index">
                        {{ sub?.name }}

                        <input type="checkbox" :id="`${item.id}-${index}`" :value="sub.id"
                            :checked="isChecked(item.id, sub.id)"
                            @change="updateCheckboxState(item.id, sub.id, $event)" />

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
import { AllCatalog, SubCatalog } from '@/types/Catalog'
import Catalog from '../Catalog.vue';
const value = ref(false);
const catalogStore = useCatalogStore();
const route = useRoute()
const id = route.params?.id
const allSubCatalogs = ref<any>([]);
const checkboxStates = ref<any>({})
const initializeCheckboxStates = () => {
    catalogStore.getAllCatalogs.map(item => {
        checkboxStates.value[item.id] = {
            name: item.name,
            id: item.id,
            values: item.subdirectory.map(sub => ({ id: sub.id, value: false }))
        };
    });
};

const getCheckboxValue = computed(() => (itemId: string, subId: string) => {
    return checkboxStates.value[itemId]?.values.find((val: SubCatalog) => val.id === subId)?.value || false;
});


const isChecked = (itemId: string, subId: string) => {
    return checkboxStates.value[itemId]?.values?.find((val: SubCatalog) => val.id === subId)?.value || false;
};

const updateCheckboxState = (itemId: string, subId: string, event: any) => {
    const checked = event.target.checked;

    const subIndex = checkboxStates?.value[itemId]?.values?.findIndex((val: AllCatalog) => val.id === subId);
    checkboxStates.value[itemId].values[subIndex].value = checked;


    console.log('updateCheckboxState checked', checked)
    console.log('updateCheckboxState checkboxStates', checkboxStates)
};


onMounted(() => {
    catalogStore.fetchAllCatalogs();
    initializeCheckboxStates();

})


console.log('checkboxStates', checkboxStates)




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


</script>

<style lang="scss" scoped>
.open-block {
    @include textFormat(16px, 20px, 500, $blue-color);
    @include flex(row, start, center, 4px);
    margin-top: 12px;
}

.custom-checkbox {
    span {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}

.custom-checkbox input[type='checkbox'] {
    display: none;
}

.custom-checkbox span::before {
    content: '';
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: 2px solid #000;
    display: block;
    width: 18px;
    height: 18px;
}

.custom-checkbox input[type='checkbox']:checked+span::before {
    display: flex;
    justify-content: center;
    align-items: center;
    content: url('../../assets/icons/check-icon-vector.svg');
    width: 18px;
    height: 18px;
    position: relative;
    left: 0px;
    background: black;
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
</style>