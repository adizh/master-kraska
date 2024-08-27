<template>
  <div class="info">
    <h1 class="main-header-h1">{{ $t("company") }}</h1>
    <h5 class="each-section-header">{{ $t("aboutUs") }}</h5>
    <p class="info-text">
      <br />
      {{ $t("aboutSubHeader") }}
    </p>

    <h4>{{ $t("welcomeHeader") }}!</h4>
    <div class="info-certif">
      <div class="info-certif-header">
        <h5 class="each-section-header">{{ $t("certificates") }}</h5>
        <button class="look-all-btn" @click="navigateTo('/certificates')">
          <span>{{ $t("lookAll") }}</span>
          <img src="../../assets/icons/icon=components-more.svg" />
        </button>
      </div>
      <certificates type="page" id="certificate" />
    </div>

    <div class="info-certif margin-top-80">
      <div class="info-certif-header">
        <h5 class="each-section-header">{{ $t("sellers") }}</h5>
        <button class="look-all-btn" @click="navigateTo('/sellers')">
          <span>{{ $t("lookAll") }}</span>
          <img src="../../assets/icons/icon=components-more.svg" />
        </button>
      </div>

      <div class="all-sellers-blocks">
        <ItemsSeller :items="4" type="component" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import certificates from "~/pages/certificates.vue";
</script>

<style scoped lang="scss">
h4 {
  @include footerSpan(20px, 20px);
  color: $main-pink;
  text-align: center;
  font-weight: 600;
  margin: 40px 0 80px 0;
}

.info {
  &-text {
    @extend %sm-span;
    font-size: 16px;
  }

  &-certif-header {
    @include flex(row, space-between, center);
  }
}

@media (max-width: 480px) {
  .info h4 {
    font-size: 16px;
  }

  .main-header-h1 {
    font-size: 24px !important;
  }

  .each-section-header {
    font-size: 20px;
  }

  .info-text {
    font-size: 14px;
  }
}
</style>
