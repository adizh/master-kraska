<template>
  <div class="each-section">
    <h5 class="each-section-header">{{ $t("outAdvantages") }}</h5>
    <div class="advan-block">
      <div class="left">
        <div
          class="left-item"
          v-for="item in advantagesOptions"
          :key="item.number"
        >
          <span class="left-item-number">{{ item.number }}</span>
          <div>
            <div class="left-item-text">{{ $t(item.header) }}</div>
            <p class="left-item-subtext">{{ $t(item.text) }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="right">
        <img src="/advantage-img 1.png" format="webp" />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { advantagesOptions } from "@/assets/js/advantages";
</script>

<style scoped lang="scss">
.advan-block {
  background: url(../assets/images/advan-block-bg.png);
  background-repeat: no-repeat;
  width: 100%;
  color: #222;
  padding: 80px 0 80px 2rem;
  border-radius: 20px;
background-position: center center;
  background-size: cover;
}


.left {
  @include flex(row, space-between, center);
  flex-wrap: wrap;
  width: 100%;
  margin: 0;

  &-item {
    width: 45%;
    @include flex(row, auto, center);

    &-number {
      color: $advan-text-color;
      font-size: 80px;
      font-weight: 800;
    }

    &-text {
      font-size: 24px;
      font-weight: 700;
      font-family: "Avenir Next Bold";
    }

    &-subtext {
      font-size: 16px;
      font-weight: 400;
    }
  }
}

@media (min-width: 320px) and (max-width: 768px) {
  .advan-block {
    align-items: end;
    padding: 20px 20px 13rem 10px;
    position: relative;
  }

  .left {
    flex-direction: column;
    align-items: start;
    margin: 20px 0;
    width: 100%;

    &-item {
      width: 100%;
      &-text {
        font-size: 16px;
        line-height: 24px;
      }
      &-subtext {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }

  .left-item-number {
    font-size: 48px;
    line-height: 65px;
  }
}

@media (max-width: 768px) {
  .advan-block {
    padding: 20px 20px 16rem 10px;
  }
}

@media (max-width: 480px) {
  .advan-block {
    padding: 20px 20px 13rem 10px;
  }
}
</style>
