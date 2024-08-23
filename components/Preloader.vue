<template>
  <div v-if="isLoading" class="preloader">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(() => {
  const nuxtApp = useNuxtApp();

  nuxtApp.hook('page:start', () => {
    isLoading.value = true;
  });

  nuxtApp.hook('page:finish', () => {
    isLoading.value = false;
  });
});
</script>

<style lang="scss" scoped>
.preloader {
  width: 100%;
  height: 100%;
  min-height: 800px;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 6px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
