<template>
    <div class="catalog-options" :class="{ 'open': isCatalogOpen }" @mouseleave="closeCatalogOptions">
        <h5 class='each-section-header'>Каталог товаров</h5>
        <div class="options-list">
            <ul class="first-col">
                <li v-for="item in catalogOptions.slice(0, 9)" :key="item"><a href="">
                        {{ item }}
                    </a></li>
            </ul>

            <ul class="second-col">
                <li v-for="item in catalogOptions.slice(9)" :key="item"><a href="">
                        {{ item }}
                    </a></li>
            </ul>
        </div>
    </div>



</template>

<script setup lang="ts">
import { catalogOptions } from '@/assets/js/catalogOptions';

const props = defineProps<{
    isCatalogOpen: boolean
}>();

const emit = defineEmits<{
    closeCatalog: []
}>();

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

li a {
    @include footerSpan(32px, 18px);
    color: $main-black;
}

li a:hover {
    cursor: pointer;
    color: $main-blue
}

.catalog-options {
    @include openedOptionsHeader(100%, 20px 4rem,6rem)
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