<template>
    <section>

        <div class="search-place">
            <div class="flex flex-row gap-4">
                <div class='input-block'>
                    <input type="text" class="main-header-input" v-model="productStore.filters.search"
                        @input="handleSearch" :placeholder="$t('whichProSearch')">
                    <img src="../assets/icons/icon=search.svg" alt="search" class="search-icon">
                </div>


                <div class="btn-block">
                    <button>Найти</button>
                </div>

            </div>

            <SearchOptions :isSearchOpen="isSearchOpen" @closeSearch="isSearchOpen = false" />
            <div class="overlay-header-options" v-show="isSearchOpen" :class="{ 'open': isSearchOpen }"></div>

        </div>
        <IndexMain />

        <Products />

        <Actions />
        <Advantages />
    </section>
</template>

<script setup lang="ts">
const productStore = useProductsSstore();
const isSearchOpen = ref(false);
const handleSearch = (event: any) => {
    isSearchOpen.value = event.target.value.trim().length > 0;
    productStore.filterProducts()
}
</script>

<style scoped lang="scss">
.search-place {
    position: relative;
    width: 100%;
    margin-bottom: 40px;

    button {
        box-shadow: 0px 0px 0px 0.5px #0000000D;
        box-shadow: 0px 0.5px 2.5px 0px #0000004D;
        padding: 16px 20px;
        border-radius: 8px;
        @include textFormat(16px, 20px, 500, $main-blue);
        outline: none;
        border: none;
        background: white;
        width: 100%;
    }

    .input-block {
        width: 75%;
        position: relative;

        .search-icon {
            position: absolute;
            top: 27%;
            left: 5px;
        }
    }

    .btn-block {
        width: 23%
    }

    input {
        padding: 16px 20px;
        border-radius: 8px;
        padding-left: 40px;
    }
}
</style>