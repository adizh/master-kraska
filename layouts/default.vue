<template>
    <div class="main-header">
        <div class="left" @click="backHome">
            <img src="../assets/images/logo-master.png" alt="logo" class="logo-img">
        </div>

        <ul class="bottom">
            <div class="overlay" v-if="isBurgerMenuOpen" @click="closeBurgerMenu"></div>
            <div class="bottom-part" :class="{ 'open-bottom-part': isBurgerMenuOpen }">
                <li class="catalog-li" @mouseover="toggleCatalog" @mouseleave="closeCatalog">{{

            $t('catalog') }}
                    <img class="arrow" :class="{ 'rotated': isCatalogOpen }"
                        src="../assets/icons/icon=components-closed-arrow.svg" alt="open-arrow">
                    <Catalog :isCatalogOpen="isCatalogOpen" @closeCatalog="closeCatalog" />

                </li>
                <li @click="navigateTo('/koler')">{{ $t('tinting') }}</li>
                <li @click="navigateTo('/pay-deliver')">{{ $t('payDelivery') }}</li>
                <li>
                    <NuxtLink to="/about-us">{{ $t('aboutUs') }}</NuxtLink>
                </li>
                <li @click="navigateTo('/contacts')">{{ $t('contacts') }}</li>
            </div>
            <div class='top-part'>
                <li class="phone">
                    <img src="../assets/icons/icon=phone loight.svg" alt="">
                    +996 509 910 148
                </li>
                <li @click="navigateTo('/cart')" class='cart-li'>
                    <img src="../assets/icons/icon=cart.svg" alt="cart">
                    <span v-if="screenSize === 'large'">{{ $t('cart') }}</span>
                    <span class="cart-li-num">{{ cartStore?.getAllCart?.length }}</span>
                </li>


                <li @click="toggleProfile"><img src="../assets/icons/icon=user.svg" alt="">
                    <span v-if="screenSize === 'large'">{{ $t('profile') }}</span>
                </li>

                <li class="burger-menu" v-if="!isBurgerMenuOpen" @click="openBurger">
                    <span></span>
                    <span></span>
                    <span></span>
                </li>

                <li v-else @click="isBurgerMenuOpen = false">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.9938 5L11.8529 10.1397L6.71322 5L5 6.71322L10.1397 11.8529L5 16.9926L6.71322 18.7058L11.8529 13.5661L16.9938 18.7058L18.707 16.9926L13.5673 11.8529L18.707 6.71322L16.9938 5Z"
                            fill="#222222" />
                    </svg>
                </li>
            </div>
        </ul>

    </div>


    <Dialog v-model:visible="isProfileOpen" modal :style="{ width: '450px', padding: '10px 40px 40px 40px' }">
        <AuthModal @closeModal="isProfileOpen = false" />
    </Dialog>

</template>

<script setup lang="ts">

import { CatalogItem } from '~/types/Catalog';
const isBurgerMenuOpen = ref(false)
const isCatalogOpen = ref(false);
const isProfileOpen = ref();
const authStore = useAuthStore();

const cartStore = useCartStore()


const closeBurgerMenu = () => {
    isBurgerMenuOpen.value = false
}
const openBurger = () => {
    isBurgerMenuOpen.value = true;
    if (isBurgerMenuOpen.value) {
        document.body.classList.add('dimmed-body');
    } else {
        document.body.classList.remove('dimmed-body');
    }
}

const toggleCatalog = () => {
    isCatalogOpen.value = true
}
const closeCatalog = () => {
    isCatalogOpen.value = false
}

const screenWidth = ref(window?.innerWidth);


const updateScreenWidth = () => {
    screenWidth.value = window?.innerWidth;
};


onMounted(() => {
    window.addEventListener('resize', updateScreenWidth);
});


onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
});


const screenSize = computed(() => {
    if (screenWidth.value >= 768) {
        return 'large';
    }
});


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
@import '../assets/tabs.scss';

.logo-img {
    width: 100%;
}

.cart-li {
    position: relative;

    &-num {
        position: absolute;
        top: -15px;
        right: -23px;
        display: inline-block;
        background: #EB5757;
        border-radius: 100%;
        padding: 12px;
        width: 16px;
        height: 16px;
        color: white;
        @include flex(row, center, center)
    }
}



.main-header {
    @include flex(row, start, center, 4rem);
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

.overlay {
    position: fixed;
    top: 8rem;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    z-index: 9
}

.top-part {
    width: 45%;
    @include flex(row, space-between, center)
}

.bottom-part {
    width: 61%;
    @include flex(row, space-between, center)
}

.left {
    width: 10%
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
    @include flex(row, start, center, 2rem);

    li {
        transition: .2s ease;
        color: $main-black;
        @include flex(row, start, center);

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
        transition: .2s ease;

        &:hover {
            color: $main-pink !important;
            cursor: pointer;
            transition: .2s ease;
        }
    }

    &-header-links {
        @include flex(row, start, center, 0px)
    }
}

.catalog-li {
    display: flex;
    height: 50px;
}

.catalog-li:hover {
    cursor: pointer;
}

.main-header-input:focus {
    border-color: $main-blue;
    outline: none;
    @extend %header-nav;
}

.bottom li.burger-menu {
    @include flex(column, center, center, 4px !important);
    display: none;

    span {
        display: inline-block;
        width: 18px;
        height: 2px;
        background: $main-black
    }
}




@media (max-width:1000px) {
    .burger-menu {
        display: flex !important
    }

    .bottom {
        justify-content: flex-end;
    }

    .top-part {
        width: 100%;
        justify-content: flex-end;
        gap: 20px
    }

    .bottom-part {
        display: none;
        position: absolute;
        bottom: -65px;
        background: white;
        padding: 20px;
        width: 100%;
        left: 0;
        right: 0;
        justify-content: start;
        gap: 30px
    }

    .catalog-options {
        top: 4rem
    }

    .open-bottom-part {
        display: flex;
    }
}

@media(max-width:786px) {

    .left {
        width: 25%;
    }

    .top {
        justify-content: flex-end;
        gap: 40px
    }


}

@media(max-width:576px) {
    .phone {
        display: none !important;
    }

    .left {
        width: 55%;
    }

    .bottom-part {
        top: 4.6rem !important;
        position: absolute;
        background: white;
        padding: 20px;
        width: 100%;
        left: 0;
        right: 0;
        justify-content: start;
        gap: 30px;
        flex-direction: column;
        height: 350px
    }

    .overlay {
        top: 23rem;

    }



}

@media (min-width:320px) and (max-width:468px) {
    .main-header {
        gap: 40px;
        flex-direction: column;
        align-items: center;
    }

    .top-part {
        justify-content: space-between;
    }


}
</style>