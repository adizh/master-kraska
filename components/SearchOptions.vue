<template>
    <div class="search-options" :class="{
        'open': isSearchOpen
    }">
        <ul class='search-res-header'>
            <li>
                <img src="../assets/images/search-test.png" alt="img-product">
                <span class="prod-search-name">Краска для стен</span>
            </li>

            <li>
                <img src="../assets/images/search-test.png" alt="img-product">
                <span class="prod-search-name">Краска для стен</span>
            </li>
        </ul>
        <button class="look-all-btn">
            <span>Смотреть все</span>
            <img src='../assets/icons/icon=components-more.svg' />


        </button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    isSearchOpen: boolean
}>()


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
    @include flex(column, space-between, center, 15px);
}

.look-all-btn {
    width: 100%;
    margin-top: 20px;

}
</style>