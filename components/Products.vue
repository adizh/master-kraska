<template>
  <div class="each-section">
    <ProductsPopular />

    <div class="parameters-block grid">
      <div class="parameters-block-info sm:col-12 lg:col-10">
        <div class="parameters-block-heading">
          <p>{{ $t("quickFindProduct") }}</p>
          <span>{{ $t("quiclFindProductText") }}</span>
        </div>

        <button class="pink-button" @click="navigateTo('/parameters')">
          {{ $t("searchByParams") }}
        </button>
      </div>

      <div class="parameters-block-img sm-col-3 lg:col-2">
        <img
          src="/params.png"
          alt="params-info"
          class="hidden md:block md:w-8 lg:block lg:w-10"
        />
      </div>
    </div>

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
.parameters-block {
  background: #f5f5f5;
  padding: 36px 40px 36px 40px;
  border-radius: 20px;
  margin: 60px 0 40px 0;
  &-heading {
    margin-bottom: 24px;
    p {
      color: #33587d;
      font-size: 32px;
      line-height: 36px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    span {
      font-size: 16px;
      line-height: 24px;
      font-weight: 500;
    }
  }
}
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

@media (min-width: 1400px) {
  .koler {
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

  .parameters-block-heading p {
    font-size: 28px;
    line-height: 30px;
  }
}

@media (min-width: 468px) and (max-width: 786px) {
  .parameters-block-heading p {
    font-size: 23px;
    line-height: 25px;
  }
  .parameters-block-heading span {
    font-size: 16px;
    line-height: 20px;
  }
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
  .parameters-block-heading p {
    font-size: 22px;
    line-height: 23px;
  }
  .parameters-block-heading span {
    font-size: 13px;
    line-height: 16px;
  }
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
