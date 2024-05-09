<template>
  <div class="margin-top-20">
    <h3>Элкарт</h3>
  </div>
</template>

<script setup lang="ts">
const payStore = usePayStore();
onMounted(() => {
  payStore.initPaymentElcart();
});
</script>

<style scoped></style>
