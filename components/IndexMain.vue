<template>
  <section class="carousel-slider">
    <div>
      <Galleria
        :value="newStore.getAllSliders"
        :numVisible="1"
        :showItemNavigators="true"
        :showThumbnails="false"
        :circular="true"
      >
        <template #previousitemicon>
          <img
            src="../assets/images/prev-btn.png"
            alt="prev"
            class="prev-btn"
          />
        </template>

        <template #nextitemicon>
          <img
            src="../assets/images/next-btn.png"
            alt="next"
            class="next-btn"
          />
        </template>
        <template #item="slotProps">
          <div class="slider-block">
            <img
              :src="slotProps.item.image"
              :alt="slotProps.item.image"
              class="slider-img"
            />
          </div>
        </template>
      </Galleria>
    </div>
  </section>
</template>

<script lang="ts" setup>
const newStore = useNewsStore();

onMounted(() => {
  newStore.fetchSliders();
});
</script>

<style scoped lang="scss">
.section {
  width: 100%;
}

.slider-img {
  width: 100%;
}

:deep(button.p-galleria-item-prev.p-galleria-item-nav.p-link),
:deep(button.p-galleria-item-next.p-galleria-item-nav.p-link) {
  background: #00000020 !important;
  width: 28px;
  height: 28px;
  padding: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s ease;
  &:hover {
    transition: 0.4s ease;
    cursor: pointer;
    background: #00000040 !important;
  }
  &:first-child {
    margin-left: 20px;
  }
  &:last-child {
    margin-right: 20px;
  }
}

.carousel-slider {
  position: absolute;
  top: 20px;
  overflow: hidden;
  left: 0;
  right: 0;
}

@media (max-width: 840px) {
  :deep(.p-galleria-item-nav) {
    top: 30%;
  }
}
</style>
