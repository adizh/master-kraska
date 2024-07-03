<template>
  <div>
    <NuxtLoadingIndicator color="#b30753" :throttle="0" />
    <NuxtLayout />
    <section class="main-section-site">
      <NuxtPage />
      <NuxtSnackbar />
    </section>
    <NuxtLayout name="footer" />
  </div>
</template>

<script setup lang="ts">
import "primevue/resources/themes/aura-light-green/theme.css";
useHead({
  title: "Master Kraska",
  meta: [{ name: "Master Kraska" }],
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
