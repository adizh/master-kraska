<template>
    <div class="catalog-options" :class="{ 'open': isCatalogOpen }" @mouseleave="closeCatalogOptions">
        <h5 class='each-section-header'>Каталог товаров</h5>
        <div class="options-list">
            <ul class="first-col">
                <li v-for="item in catalogOptions.slice(0, 9)" :key="item.id"
                    @click.stop="navigateTo(`/catalog/${item.id}`)">
                    {{ item.name }}

                </li>
            </ul>

            <ul class="second-col">
                <li v-for="item in catalogOptions.slice(9)" :key="item.id"
                    @click.stop="navigateTo(`/catalog/${item.id}`)">
                    {{ item.name }}

                </li>
            </ul>
        </div>
    </div>



</template>

<script setup lang="ts">
//import { catalogOptions } from '@/assets/js/catalogOptions';
import { CatalogItem } from '@/types/Catalog'
const { data: catalogOptions } = useApi<CatalogItem[]>('/api/v1/Category/get-all-categories') as any;

const props = defineProps<{

    isCatalogOpen: boolean
}>();
const router = useRouter()
const emit = defineEmits<{
    closeCatalog: [],
    goToCatalog: [CatalogItem]
}>();

const goToCatalog = (item: CatalogItem) => {
    // navigateTo(`/catalog/${item.id}`);
    //window.location.reload()
    emit('goToCatalog', item)
    // if (props.isCatalogOpen) {
    //     console.log('navifage to catallog')
    //     navigateTo(`/catalog/${item.id}`);
    //     //router.push(`/catalog/${item.id}`)
    // }

}

const closeCatalogOptions = () => {
    emit('closeCatalog');
};
</script>

<style scoped lang='scss'>
.each-section-header {
    font-size: 30px;
}

ul li {
    list-style: none;
    margin: 10px 0;

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
    @include openedOptionsHeader(100%, 20px 4rem, 6rem)
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