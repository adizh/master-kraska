<template>
  <div class="each-section">
    <ProductsPopular />

    <!-- <ProductsUseful />

    <ProductsRecommended /> -->

    <div class="koler">
      <h5 class="koler-header">{{ $t("tinting") }}</h5>
      <p class="koler-text">{{ $t("tintingInfo") }}</p>
      <button class="bg-white-btn" @click="navigateTo('/koler')">
        {{ $t("startProcedure") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.koler {
  background-image: url("/static/sofa.png");
  background-repeat: no-repeat;
  background-size: contain;
  height: 80vh;
  margin-top: 15px;
  background-position: center center;
  width: 100%;
  @include flex(column, center, start);
  padding-left: 3rem;

  &-header {
    color: $main-blue;
    line-height: 92px;
    font-size: 58px;
    font-family: "Avenir Next Bold";
  }

  &-text {
    color: white;
    max-width: 42%;
    width: 60%;
    font-size: 16px;
    font-weight: 500;
  }
}

@media (min-width:1400px){
  .koler{
    margin: -40px 0;
  }
}
@media (min-width: 786px) and (max-width: 992px) {
  .koler {
    padding: 1rem 20px 1rem 20px;
    background-size: cover;
    height: 100%;

    &-header {
      font-size: 48px !important;
      line-height: 65px !important;
    }

    &-text {
      max-width: 100%;
    }
  }
}

@media (min-width: 468px) and (max-width: 786px) {
  .koler {
    background-size: cover;
    height: 100%;
    padding: 40px 0 40px 10px;

    &-text {
      max-width: 70%;
      width: 100%;
    }

    &-header {
      font-size: 48px !important;
      line-height: 65px !important;
    }
  }
}

@media (min-width: 320px) and (max-width: 468px) {
  .koler {
    background-size: cover;
    height: 100%;
    padding: 40px 0 40px 10px;

    &-header {
      font-size: 28px !important;
      line-height: 38px !important;
    }

    &-text {
      max-width: 100%;
      width: 100%;
    }

    button {
      padding: 8px 18px;
      font-size: 14px;
    }
  }
}
</style>
