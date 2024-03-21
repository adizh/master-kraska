<template>
    <div class="main-header">
        <div class="left">
            <NuxtImg src="/logo-master.png"></NuxtImg>
        </div>
        <div class="right">
            <ul class="top">
                <li class="phone">
                    <img src="../assets/icons/icon=phone loight.svg" alt="">
                    +996 509 910 148
                </li>
                <li><img src="../assets/icons/icon=cart.svg" alt="">Корзина</li>
                <li><img src="../assets/icons/icon=user.svg" alt="">Профиль</li>
            </ul>
            <ul class="bottom">
                <li class="catalog-li" @mouseover="toggleCatalog">Каталог
                    <img class="arrow" :class="{ 'rotated': isCatalogOpen }"
                        src="../assets/icons/icon=components-closed-arrow.svg" alt="open-arrow">
                </li>

                <li>Колеровка</li>
                <li>Оплата и доставка</li>
                <li>О нас</li>
                <li>Контакты</li>
                <li class="search-place"><input type="text" class="main-header-input" @input="handleSearch">
                    <img src="../assets/icons/icon=search.svg" alt="search" class="search-icon">

                    <SearchOptions :isSearchOpen="isSearchOpen" />
                    <div class="overlay-header-options" v-show="isSearchOpen" :class="{ 'open': isSearchOpen }"></div>

                </li>
            </ul>
        </div>
        <Catalog :isCatalogOpen="isCatalogOpen" @closeCatalog="closeCatalog" />
        <div class="overlay-header-options" v-show="isCatalogOpen" :class="{ 'open': isCatalogOpen }"></div>
    </div>



</template>

<script setup lang="ts">
const isCatalogOpen = ref(false);
const isSearchOpen = ref(false);
const toggleCatalog = () => {
    isCatalogOpen.value = true
}
const closeCatalog = () => {
    isCatalogOpen.value = false
}

const handleSearch = (event: any) => {
    isSearchOpen.value = event.target.value.trim().length > 0;
}


</script>

<style scoped lang="scss">
.main-header {
    @include flex(row, start, center, 4rem);
    padding: 20px 4.5rem;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.06);
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    z-index: 5;
    @extend %header-nav
}


.left {
    width: 15%
}

.right {
    width: 75%
}

.bottom {
    width: 100%;
    list-style: none;
    @include flex(row, space-between, center)
}

.top {
    @include flex(row, flex-end, start, 1.8rem);
    margin-bottom: 20px;
    list-style: none;

    img {
        display: inline-block;
        margin-right: 10px
    }

    li {
        display: flex;
        align-items: center;
    }
}

.phone {
    color: $blue-color;
}

.search-place {
    position: relative;
    width: 25%;
}

.search-icon {
    position: absolute;
    top: 5px;
    right: 5px;
}

.catalog-li {
    display: flex;
}

.arrow {
    transition: transform 0.3s ease;

}

.arrow.rotated {
    transform: rotate(180deg);
}

.catalog-li:hover {
    cursor: pointer;
}


.main-header-input:focus {
    border-color: $main-blue;
    outline: none;
    @extend %header-nav;
}
</style>