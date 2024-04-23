<template>
    <div class="backdrop" :class="{ 'show': isCatalogOpen }"></div>
    <div class="catalog-options" :class="{ 'open': isCatalogOpen }" @mouseleave="closeCatalogOptions">
        <h5 class='each-section-header'>{{ $t('productsCatalog') }}</h5>
        <div class="options-list">
            <ul class="first-col">
                <li v-for="item in getAllCategories?.slice(0, Math.ceil(getAllCategories?.length / 2))"
                    :key="item?.category?.id" @click.stop="navigateTo(`/catalog/${item?.category?.id}`)">
                    {{ formatName(item?.category?.name) }}
                </li>
            </ul>

            <ul class="second-col">
                <li v-for="item in getAllCategories?.slice(getAllCategories?.length / 2)" :key="item?.category?.id"
                    @click.stop="navigateTo(`/catalog/${item?.category?.id}`)">
                    {{ formatName(item?.category?.name) }}
                </li>
            </ul>
        </div>
    </div>

</template>

<script setup lang="ts">

import { Category } from '@/types/Category'
const authStore = useAuthStore();
const catalogStore = useCatalogStore()

const { getAllCategories } = storeToRefs(catalogStore)


const formatName = (name: string) => {
    return name?.slice(0, 1).toUpperCase() + name?.slice(1).toLowerCase()
}

const props = defineProps<{

    isCatalogOpen: boolean;

}>();

const emit = defineEmits<{
    closeCatalog: [],
}>();



const closeCatalogOptions = () => {

    emit('closeCatalog');

};


onMounted(() => {
    catalogStore.fetchAllCategories();
})

console.log('getAllCategories IN A COMPONSNE', catalogStore.getAllCategories)


watch(() => authStore.getSelectedLang, () => {
    catalogStore.fetchAllCategories();
});

</script>

<style scoped lang='scss'>
.each-section-header {
    font-size: 30px;
}

ul li {
    list-style: none;
    margin: 10px 0;
}

.backdrop {
    position: fixed;
    top: 7rem;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    display: none;
    pointer-events: none;
}

.backdrop.show {
    display: block;
}

li {
    @include footerSpan(32px, 18px);
    color: $main-black;

    &:hover {
        cursor: pointer;
        color: $main-blue
    }
}

.catalog-options {
    @include openedOptionsHeader(100%, 20px 4rem, 4rem)
}

.catalog-options.open {
    opacity: 1;
    visibility: visible;
    transition: .3s ease all;
}

.options-list {
    @include flex(row, space-between, start)
}
</style>