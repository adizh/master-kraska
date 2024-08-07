<template>
  <NuxtLayout name="admin">
    <div>
      <h1>Баннеры</h1>

      <button
        class="pink-button"
        @click="isCreateBannerOpen = !isCreateBannerOpen"
      >
        Создать баннер
      </button>
      <div class="sliders-section mt-4">
        <AdminBannersItem
          v-for="slider in newsStore.getAllSliders"
          :key="slider?.id"
          :slider="slider"
          @delete-slider="deleteSlider"
        />
      </div>
    </div>

    <UIModal
      :show-modal="isCreateBannerOpen"
      title="Создать баннер"
      @close-modal="isCreateBannerOpen = false"
    >
      <AdminBannersCreate @close-create-modal="isCreateBannerOpen = false" />
    </UIModal>

    <UIModal
      :show-modal="isDeleteSliderOpen"
      title="Удалить баннер"
      @close-modal="isDeleteSliderOpen = false"
    >
      <ConfirmPay
        title="Вы действительно хотите удалить этот баннер"
        @cancel="isDeleteSliderOpen = false"
        @confirm="confirmDeleteSlider"
      />
    </UIModal>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  isCreateBannerOpen,
  isDeleteSliderOpen
} from "@/helpers/admin/banners";
import { Slider } from "~/Slider";
const newsStore = useNewsStore();
const currentSlider = ref({} as Slider);
const deleteSlider = (slider: Slider) => {
  console.log("slider", slider);
  isDeleteSliderOpen.value = true;
  currentSlider.value = slider;
};

const confirmDeleteSlider = async () => {
  try {
    const response = await http.delete(
      `/api/v1/Slider/delete-slider-by-id/${currentSlider.value?.id}`
    );
    if (response.status === 200) {
      useNotif("success", "Баннер удален", "Успешно");
      isDeleteSliderOpen.value = false;
      newsStore.fetchSliders();
    }
  } catch (err) {
    console.log("err", err);
    useNotif("error", "Произошла ошибка", "Ошибка");
  }
};
onMounted(() => {
  newsStore.fetchSliders();
});
</script>

<style scoped></style>
