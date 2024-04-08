<template>

  <NuxtLayout></NuxtLayout>
  <section class="main-section-site">
    <NuxtPage />
  </section>
  <NuxtLayout name="footer"></NuxtLayout>

</template>


<script setup lang="ts">
import 'primevue/resources/themes/aura-light-green/theme.css';
</script>


<style lang="scss">
@import url(./assets/main.scss);
@import 'primeflex/primeflex.scss';



@media(min-width:1400px) {
  .main-section-site {
    padding: 3rem 10rem
  }
}
</style>