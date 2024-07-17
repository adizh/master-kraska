<template>
  <div class="maps-address-list-block">
    <h3>{{ name }}</h3>
    <div class="bottom-list">
      <p>
        <img
          src="../../assets/icons/black/icon=components-location.svg"
          alt="location"
        />
        <span>{{ address }}</span>
      </p>
      <div>
        <div class="bottom-list-phones">
          <span
            class="phone flex flex-row align-items-center gap-1"
            v-for="number in formattedPhone"
            :key="number"
            ><img
              src="../../assets/icons/black/icon=components-phone.svg"
              alt="phone"
            />
            <a :href="`tel:${number}`">{{ number }}</a></span
          >
        </div>
      </div>
      <p>
        <img
          src="../../assets/icons/black/icon=components-time.svg"
          alt="time"
        />
        <span>
          {{ formatHours(openHours) }}
        </span>
      </p>
      <p>
        <img
          src="../../assets/icons/black/icon=components-email.svg"
          alt="email"
        />
        <span> {{ email }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  address: string;
  openHours: string;
  email: string;
  phone: string;
}>();

const formattedPhone = computed(() => {
  return props?.phone?.split("+").filter((item) => item !== "");
});
</script>

<style scoped lang="scss">
.bottom-list-phones {
  @include flex(column, center, center, 4px);
}

.maps-address-list {
  h3 {
    font-family: "Avenir Next Medium";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  &-block {
    border: 1px solid $slider-border-color;
    border-radius: 10px;
    padding: 40px;
    margin-bottom: 20px;

    img {
      width: 24px;
      height: 24px;
    }
  }
}

.bottom-list {
  flex-wrap: wrap;
  @include flex(row, space-between, center);
  margin-top: 20px;

  p {
    width: 23%;
    @include flex(row, start, center);
    &:first-child {
      width: 26%;
    }
    &:nth-child(2) {
      width: 20%;
    }
    &:nth-child(3) {
      width: 28%;
    }
    &:nth-child(4) {
      width: 20%;
    }
  }
}

@media (max-width: 992px) {
  .bottom-list {
    p {
      width: 45% !important;
    }
  }
  .maps-address-list-block h3 {
    font-size: 24px !important;
  }
}
@media (max-width: 576px) {
  .bottom-list {
    flex-direction: column;
    align-items: start;
    p {
      width: 100% !important;
    }
  }
  .maps-address-list-block h3 {
    font-size: 20px !important;
  }
}

@media (max-width: 480px) {
  .maps-address-list-block h3 {
    font-size: 18px !important;
  }
}
</style>
