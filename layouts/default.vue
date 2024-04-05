<template>
    <div class="main-header">
        <div class="left" @click="backHome">
            <!-- <NuxtImg src="/logo-master.png"></NuxtImg> -->
            <img src="../assets/images/logo-master.png" alt="" class="logo-img">
        </div>
        <div class="right">
            <ul class="top">
                <li class="phone">
                    <img src="../assets/icons/icon=phone loight.svg" alt="">
                    +996 509 910 148
                </li>
                <li @click="navigateTo('/cart')">
                    <img src="../assets/icons/icon=cart.svg" alt="">Корзина
                </li>
                <li @click="toggleProfile"><img src="../assets/icons/icon=user.svg" alt="">Профиль</li>
            </ul>
            <ul class="bottom">
                <li class="catalog-li" @mouseover="toggleCatalog">Каталог
                    <img class="arrow" :class="{ 'rotated': isCatalogOpen }"
                        src="../assets/icons/icon=components-closed-arrow.svg" alt="open-arrow">
                </li>

                <li @click="isKolerOpen = !isKolerOpen">Колеровка</li>
                <li @click="navigateTo('/pay-deliver')">Оплата и доставка</li>
                <li>
                    <NuxtLink to="/about-us">О нас</NuxtLink>
                </li>
                <li @click="navigateTo('/contacts')">Контакты</li>


                <li class="search-place"><input type="text" class="main-header-input"
                        v-model="productStore.filters.search" @input="handleSearch">
                    <img src="../assets/icons/icon=search.svg" alt="search" class="search-icon">

                    <SearchOptions :isSearchOpen="isSearchOpen" @closeSearch="isSearchOpen = false" />
                    <div class="overlay-header-options" v-show="isSearchOpen" :class="{ 'open': isSearchOpen }"></div>

                </li>
            </ul>
        </div>
        <Catalog :isCatalogOpen="isCatalogOpen" @closeCatalog="closeCatalog" @goToCatalog="goToCatalog" />

        <div class="overlay-header-options" v-show="isCatalogOpen" :class="{ 'open': isCatalogOpen }"></div>

    </div>

    <Dialog v-model:visible="isProfileOpen" modal :style="{ width: '450px', padding: '10px 40px 40px 40px' }">
        <div class="profile-section-header">

            <TabView v-if="selectedReg === 0">
                <TabPanel header="Регистрация">
                    <AuthEmailRegister @closeModal="isProfileOpen = false" />
                    <!-- <AuthRegister @selectRegister="selectRegister" /> -->
                </TabPanel>
                <TabPanel header="Войти">
                    <AuthLogin @closeLoginModal="isProfileOpen = false" />
                </TabPanel>
            </TabView>

            <div v-else-if='selectedReg === 1'>

                <AuthEmailRegister @closeModal="isProfileOpen = false" />
            </div>
        </div>
    </Dialog>


    <Dialog v-model:visible="isKolerOpen" modal :style="{ width: '650px', padding: '10px 40px 40px 40px' }">

        <Koler />
    </Dialog>


    <!-- <Toast /> -->
</template>

<script setup lang="ts">
import { CatalogItem } from '~/types/Catalog';
const isKolerOpen = ref(false)
const toast = useToast()
const isCatalogOpen = ref(false);
const isSearchOpen = ref(false);
const isProfileOpen = ref();
const authStore = useAuthStore();
const selectedReg = ref(0);
const productStore = useProductsSstore()
const selectRegister = (tab: number) => {
    selectedReg.value = tab;
}
console.log('authStore email', authStore.getUserId)

const toggleCatalog = () => {
    isCatalogOpen.value = true
}
const closeCatalog = () => {
    isCatalogOpen.value = false
}

const handleSearch = (event: any) => {
    isSearchOpen.value = event.target.value.trim().length > 0;
    productStore.filterProducts()
}

const goToCatalog = (item: CatalogItem) => {
    navigateTo(`/catalog/${item.id}`);
}

const backHome = () => {
    return navigateTo('/')
}


const toggleProfile = () => {
    if (authStore.getUserId && authStore.getUserId?.length > 0) {
        return navigateTo('/profile')
    } else {
        isProfileOpen.value = !isProfileOpen.value
    }
}

const closeProfileOpen = () => {
    isProfileOpen.value = false
}
provide('closeProfileOpen', closeProfileOpen)


</script>

<style scoped lang="scss">
.logo-img {
    width: 100%;
}

.main-header {
    @include flex(row, start, end, 4rem);
    padding: 20px 2.5rem;
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

.left:hover {
    cursor: pointer;
}

.right {
    width: 85%
}

.bottom {
    width: 100%;
    list-style: none;
    @include flex(row, space-between, center);

    li {
        transition: .2s ease;
        color: $main-black;

        &:hover {
            color: $main-pink !important;
            cursor: pointer;
            transition: .2s ease;
        }
    }
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

    &-header-links {
        @include flex(row, start, center, 0px)
    }
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



.catalog-li:hover {
    cursor: pointer;
}

.profile-section-header {
    margin-top: 20px;
}

.main-header-input:focus {
    border-color: $main-blue;
    outline: none;
    @extend %header-nav;
}

:deep(ul.p-tabview-nav) {
    @include flex(row, space-around, center !important)
}



:deep(.p-tabview .p-tabview-ink-bar) {
    background-color: $main-pink;
    height: 3px;
    color: $main-black;
}

:deep(.p-tabview .p-tabview-nav) {
    padding-bottom: 15px !important;
}

:deep(.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link) {
    color: $main-black;
}

:deep(.p-tabview .p-tabview-nav li .p-tabview-nav-link) {
    border: none;

    @include textFormat(16px, 16px, 500, $main-dark-grey)
}

:deep(.p-tabview .p-tabview-panels) {
    color: $main-black
}
</style>