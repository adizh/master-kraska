<template>
  <NuxtLoadingIndicator color="#b30753" :throttle="0" />
  <NuxtLayout/>
    <section v-if="!preloader" class="main-section-site">
      <NuxtPage />
      <NuxtSnackbar />
    </section>
    <Preloader v-else />
    <NuxtLayout name="footer" />

  <ScrollToTop />
</template>

<script setup>
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";
const preloader = ref(true);
if (process.client) {
  preloader.value = false;
  (function (w, d, u) {
    const s = d?.createElement("script");
    s.async = true;
    s.src = u + "?" + ((Date.now() / 60000) | 0);
    const h = d?.getElementsByTagName("script")[0];
    h.parentNode.insertBefore(s, h);
  })(
    window,
    document,
    "https://cdn-ru.bitrix24.ru/b27013162/crm/site_button/loader_2_gi1nb6.js"
  );
}

function adjustMainSeaction () {
  const mainSection = document.querySelector(".main-section-site");
  const mainHeader = document.querySelector(".main-header");

  if (mainHeader && mainSection) {
    const headerHeight = mainHeader.offsetHeight + 24;
    mainSection.style.marginTop = `${headerHeight}px`;
  }
}

onBeforeUnmount(() => {
  window.removeEventListener("resize", adjustMainSeaction);
});

onMounted(async () => {
  adjustMainSeaction();
  window.addEventListener("resize", adjustMainSeaction);
});

useHead({
  title: "MasterKraska",
  meta: [{ name: "Master Kraska" }]
});

const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});

nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>

<style lang="scss">
@import url(./assets/main.scss);
@import "primeflex/primeflex.scss";

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

@media (min-width: 1400px) {
  .main-section-site {
    padding: 3rem 10rem;
  }
}
</style>
