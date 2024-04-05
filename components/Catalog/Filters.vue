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
                    </p>
                    <p v-if="getRemainingItemCount(item) > 0" class="open-block" @click="setOpenBlock(item?.id)">
                        {{ opensIncludes(item.id) ? 'Свернуть' : 'Еще' }} {{ getRemainingItemCount(item) }}
                        <img class="arrow" :class="{ 'rotated': opensIncludes(item.id) }"
                            src="../../assets/icons/arrow-down-blue.svg" alt="open-arrow">
                    </p>



                </div>

            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { AllCatalog } from '@/types/Catalog'
const value = ref(false);
const catalogStore = useCatalogStore();
const route = useRoute()
const id = route.params?.id
const allSubCatalogs = ref<any>([]);

const getItems = async (id: string) => {
    allSubCatalogs.value = await catalogStore.fetchSubCatalogs(id)
}
onMounted(() => {
    catalogStore.fetchAllCatalogs();
})


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
    return item?.subdirectory ? item.subdirectory.slice(0, 5) : [];
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