<template>
  <button
    v-if="showScrollButton"
    ref="scrollTopButton"
    @click="handleScroll"
    class="scroll-btn"
  >
    <span class="pi pi-arrow-circle-up"></span>
  </button>
</template>

<script setup lang="ts">
const showScrollButton = ref(false);

const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

const smoothScroll = (to: number, duration: number) => {
  const start = window.scrollY;
  const change = to - start;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed / duration) * change + start;
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      window.scrollTo(0, to);
    }
  };

  requestAnimationFrame(animateScroll);
};

const handleScroll = () => {
  smoothScroll(0, 850);
};

const checkScroll = () => {
  showScrollButton.value = window.scrollY > 300;
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style scoped lang="scss">
.scroll-btn {
  position: fixed;
  bottom: 30px;
  z-index: 2;
  padding: 12px;
  right: 30px;
  outline: none;
  border: none;
  border-radius: 7px;
  @extend %blue-bnt-hover;
  span {
    font-size: 22px;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
