<template>
    <div class="search-options" :class="{
        'open': isSearchOpen
    }">
        <ul class='search-res-header'>
            <li v-for="item in productStore.getFilteredProducts?.slice(0, 3)" :key="item?.id"
                @click="goToProd(item?.id)">
                <img src="../assets/images/search-test.png" alt="img-product">
                <span class="prod-search-name">{{ searchName(item?.name) }}</span>
            </li>


        </ul>
        <button class="look-all-btn" v-if="productStore.getFilteredProducts?.length">
            <span>Смотреть все</span>
            <img src='../assets/icons/icon=components-more.svg' />

        </button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    isSearchOpen: boolean
}>()


const emit = defineEmits(['closeSearch'])
const goToProd = (id: string) => {
    navigateTo(`/product/${id}`);
    emit('closeSearch')
}

const productStore = useProductsSstore();
const searchName = (name: string) => {
    if (name.length > 10) {
        return name.slice(0, 10) + '...'
    } else {
        return name
    }
}


</script>

<style scoped lang='scss'>
.search-options {
    @include openedOptionsHeader(100%, 20px, 3.3rem);
    border: 1px solid $slider-border-color;
    border-radius: 10px;
}

.open {
    opacity: 1;
    visibility: visible;
    transition: 0.3s ease all;
}

.search-res-header li {
    @include flex(row, space-between, center);
    margin: 5px 0;
}

.search-res-header {
    @include flex(column, space-between, start, 15px);
}

.look-all-btn {
    width: 100%;
    margin-top: 20px;
}

li:hover {
    cursor: pointer;
}
</style>