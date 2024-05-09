<script setup lang="ts"></script>

<template>
  <div class="news margin-top-80">
    <div class="section-header-links">
      <h5 class="each-section-header">{{ $t("news") }}</h5>
      <button class="look-all-btn" @click="navigateTo('/news')">
        <span>{{ $t("lookAll") }}</span>
        <img src="../../assets/icons/icon=components-more.svg" />
      </button>
    </div>
    <div class="news-list">
      <NewsItem />
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (max-width: 480px) {
  .each-section-header {
    font-size: 20px;
  }
}
</style>
