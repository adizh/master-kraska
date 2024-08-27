<template>
  <div class="main-header">
    <div class="left" @click.prevent="gotToPage('/')">
      <img src="/logo-master.png" class="logo-img" alt="logo">
    </div>

    <ul class="bottom">
      <div v-if="isBurgerMenuOpen" class="overlay" @click="closeBurgerMenu" />
      <ul class="bottom-part" :class="{ 'open-bottom-part': isBurgerMenuOpen }">
        <li
          class="catalog-li"
          @mouseover="toggleCatalog"
          @mouseleave="closeCatalog"
        >
          {{ $t("catalog") }}
          <img
            class="arrow"
            :class="{ rotated: isCatalogOpen }"
            src="../assets/icons/icon=components-closed-arrow.svg"
            alt="open-arrow"
          >
          <Catalog
            :is-catalog-open="isCatalogOpen"
            @close-catalog="closeCatalog"
          />
        </li>

        <li
          class="catalog-li-small"
          @mouseover="toggleCatalog"
          @click.stop="clickToggleCatalog"
        >
          {{ $t("catalog") }}
          <img
            class="arrow"
            :class="{ rotated: isCatalogOpen }"
            src="../assets/icons/icon=components-closed-arrow.svg"
            alt="open-arrow"
          >
          <Catalog
            :is-catalog-open="isCatalogOpen"
            @close-catalog="closeCatalog"
          />
        </li>

        <li @click="gotToPage('/koler')">
          {{ $t("tinting") }}
        </li>
        <li @click="gotToPage('/pay-deliver')">
          {{ $t("payDelivery") }}
        </li>
        <li @click="gotToPage('/about-us')">
          {{ $t("aboutUs") }}
        </li>
        <li @click="gotToPage('/contacts')">
          {{ $t("contacts") }}
        </li>
        <li class="language">
          <img src="../assets/icons/globe.svg" alt="globe">
          <UIDropdown
            :is-dropdown-open="isUIDropdownOpen"
            :selected-value="initLan"
            :options="lanOptions"
            label="name"
            @toggle-dropdown-u-i="toggleDropdownUI"
            @select-value="selectLanguage"
          />
        </li>
      </ul>
      <ul class="top-part">
        <li class="language">
          <img src="../assets/icons/globe.svg" alt="globe">
          <UIDropdown
            :is-dropdown-open="isUIDropdownOpen"
            :selected-value="initLan"
            :options="lanOptions"
            label="name"
            @toggle-dropdown-u-i="toggleDropdownUI"
            @select-value="selectLanguage"
          />
        </li>
        <li
          v-if="
            authStore?.getRole === 'Admin' ||
              authStore?.getRole === 'SuperAdmin'
          "
        >
          <NuxtLink to="/admin">
            Админ
          </NuxtLink>
        </li>

        <div class="cart-block">
          <li class="cart-li" @click="gotToPage('/cart')">
            <img src="../assets/icons/icon=cart.svg" alt="cart">

            <span class="cart-li-num">{{ cartStore?.getAllCart?.length }}</span>
          </li>
          <li @click="toggleProfile">
            <img src="../assets/icons/icon=user.svg" alt="">
            <span v-if="screenSize === 'large'">{{ $t("profile") }}</span>
          </li>
        </div>
        <li v-if="!isBurgerMenuOpen" class="burger-menu" @click="openBurger">
          <span />
          <span />
          <span />
        </li>
        <li v-else class="close-burger" @click="isBurgerMenuOpen = false">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.9938 5L11.8529 10.1397L6.71322 5L5 6.71322L10.1397 11.8529L5 16.9926L6.71322 18.7058L11.8529 13.5661L16.9938 18.7058L18.707 16.9926L13.5673 11.8529L18.707 6.71322L16.9938 5Z"
              fill="#222222"
            />
          </svg>
        </li>
      </ul>
    </ul>

    <Dialog
      v-model:visible="isProfileOpen"
      modal
      :style="{ width: '450px', padding: '10px 40px 40px 40px' }"
    >
      <AuthModal @close-modal="isProfileOpen = false" />
    </Dialog>
  </div>

</template>

<script setup lang="ts">
import { LanguageOptions } from "@/types/Items";
const isBurgerMenuOpen = ref(false);
const isCatalogOpen = ref(false);
const isProfileOpen = ref();
const authStore = useAuthStore();
const store = useAuthStore();

const cartStore = useCartStore();

const { setLocale } = useI18n();

const initLan = ref({
  name:
    store.getSelectedLang === "ru"
      ? "Ru"
      : store.getSelectedLang === "kg"
        ? "Kg"
        : "...",
  value: store.getSelectedLang
});

const isUIDropdownOpen = ref(false);
const lanOptions = [
  { name: "Русский", value: "ru" },
  { name: "Кыргызча", value: "kg" }
];

const toggleDropdownUI = () => {
  isUIDropdownOpen.value = !isUIDropdownOpen.value;
};
const selectLanguage = (item: LanguageOptions) => {
  initLan.value = item;
  isUIDropdownOpen.value = false;
  store.setLang(item?.value);
  setLocale(item?.value);
  localStorage.setItem("selectedLanguage", item?.value);
  window.location.reload();
};

const closeBurgerMenu = () => {
  isBurgerMenuOpen.value = false;
};
const openBurger = () => {
  isBurgerMenuOpen.value = true;
  if (isBurgerMenuOpen.value) {
    document.body.classList.add("dimmed-body");
  } else {
    document.body.classList.remove("dimmed-body");
  }
};

const toggleCatalog = () => {
  isCatalogOpen.value = true;
};
const clickToggleCatalog = () => {
  if (isCatalogOpen.value) {
    isCatalogOpen.value = false;
  } else {
    isCatalogOpen.value = true;
  }
};
const route = useRoute();

const closeCatalog = () => {
  isCatalogOpen.value = false;
  closeBurgerMenu();
};

const screenWidth = ref(window?.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window?.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenWidth);
});

const gotToPage = async (link: string) => {
  if (route.fullPath.includes("/admin")) {
    await navigateTo(link);
    window.location.reload();
    closeBurgerMenu();
  } else {
    navigateTo(link);
    closeBurgerMenu();
  }
};

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenWidth);
});

const screenSize = computed(() => {
  if (screenWidth.value >= 868) {
    return "large";
  }
});

const toggleProfile = () => {
  if (authStore.getUserId && authStore.getUserId?.length > 0) {
    return gotToPage("/profile");
  } else {
    isProfileOpen.value = !isProfileOpen.value;
  }
};

const closeProfileOpen = () => {
  isProfileOpen.value = false;
};

provide("closeProfileOpen", closeProfileOpen);
</script>

<style scoped lang="scss">
@import "../assets/tabs.scss";

.cart-block {
  @include flex(row, space-between, start);
  width: 40%;
}
.logo-img {
  width: 100%;
}
a {
  color: $main-black;
  &:hover {
    color: $main-pink;
  }
}
.catalog-li-small {
  display: none !important;
}

.cart-li {
  position: relative;
  &-num {
    position: absolute;
    top: -15px;
    right: -18px;
    display: inline-block;
    background: #eb5757;
    border-radius: 100%;
    padding: 12px;
    width: 16px;
    height: 16px;
    color: white;
    @include flex(row, center, center);
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
  @extend %header-nav;
}

.language {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 8px 20px;
  border: 1px solid #dddddd;
}

.ui-dropdown {
  padding: 0;
  width: fit-content;
}

.overlay {
  position: fixed;
  top: 8rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  z-index: 9;
}

.top-part {
  width: 45%;
  @include flex(row, space-between, center);
}

.bottom-part {
  width: 75%;
  @include flex(row, space-between, center);
}
.bottom-part .language {
  display: none;
}

.left {
  width: 10%;
}

.left:hover {
  cursor: pointer;
}

.right {
  width: 85%;
}

.bottom {
  width: 100%;
  list-style: none;
  @include flex(row, start, center, 2rem);

  li {
    transition: 0.2s ease;
    color: $main-black;
    @include flex(row, start, center);

    &:hover {
      color: $main-pink !important;
      cursor: pointer;
      transition: 0.2s ease;
    }
  }
}

.top {
  @include flex(row, flex-end, start, 1.8rem);
  margin-bottom: 20px;
  list-style: none;

  img {
    display: inline-block;
    margin-right: 10px;
  }

  li {
    display: flex;
    align-items: center;
    transition: 0.2s ease;

    &:hover {
      color: $main-pink !important;
      cursor: pointer;
      transition: 0.2s ease;
    }
  }

  &-header-links {
    @include flex(row, start, center, 0px);
  }
}

.catalog-li {
  display: flex;
  height: 50px;
  gap: 3px !important;
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
    background: $main-black;
  }
}

@media (min-width: 1400px) {
  .bottom {
    gap: 6rem;
  }
}

@media (max-width: 1100px) {
  .close-burger {
    position: relative;
  }
  .burger-menu {
    display: flex !important;
  }

  .cart-block {
    width: 19%;
  }

  .bottom {
    justify-content: flex-end;
  }

  .top-part {
    width: 100%;
    justify-content: flex-end;
    gap: 20px;
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
    gap: 30px;
  }

  .catalog-options {
    top: 4rem;
  }

  .open-bottom-part {
    display: flex;
  }
  .cart-li {
    &-num {
      right: -17px;
    }
  }
}

@media (max-width: 786px) {
  .left {
    width: 25%;
  }

  .top {
    justify-content: flex-end;
    gap: 40px;
  }
}

@media (max-width: 576px) {
  .top-part .language {
    display: none;
  }
  .catalog-li-small {
    display: flex !important;
    align-items: center;
    gap: 3px !important;
  }

  .catalog-li {
    display: none !important;
  }

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
    height: 350px;
  }
  .bottom-part .language {
    display: flex;
  }

  .overlay {
    top: 25rem;
  }
  .top-part {
    gap: 40px;
  }
  .cart-block {
    gap: 20px;
  }
  .cart-li {
    &-num {
      right: -15px;
    }
  }
}

@media (min-width: 320px) and (max-width: 468px) {
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
