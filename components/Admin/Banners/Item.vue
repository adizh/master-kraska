<template>
  <div class="seller-block">
    <div class="admin-icons">
      <div @click.stop="openEditForm">
        <img src="../../../assets/icons/tdesign_edit.svg" alt="edit" />
      </div>
      <div @click.stop="$emit('deleteSlider', props.slider)">
        <img src="../../../assets/icons/icon=trash.svg" alt="trash" />
      </div>
    </div>

    <div :class="{ 'seller-block-images': !isEdit }" class="seller-block-edit">
      <img :src="slider?.image" alt="seller" v-if="!isEdit" />
      <div v-else>
        <label for="image">Обновить фото</label>
        <input type="file" id="image" @change="handleImageUpdate" />
        <span v-if="updateImage.loading">Загрузка...</span>
        <span
          class="err-input-msg"
          v-else-if="!updateImage.loading && updateImage.error"
          >{{ updateImage?.error }}</span
        >
      </div>
    </div>

    <p v-if="!isEdit">{{ slider?.titleRu }}</p>

    <div v-else class="mb-4">
      <label for="name">Заголовок</label>
      <textarea class="basic-input" v-model="localSlider.titleRu"></textarea>
    </div>

    <p v-if="!isEdit">{{ slider?.titleKg }}</p>

    <div v-else class="mb-4">
      <label for="name">Заголовок (кырг)</label>
      <textarea class="basic-input" v-model="localSlider.titleKg"></textarea>
    </div>

    <p v-if="!isEdit">{{ slider?.descriptionKg }}</p>

    <div v-else class="mb-4">
      <label for="name">Описание (кырг)</label>
      <textarea
        class="basic-input"
        v-model="localSlider.descriptionKg"
      ></textarea>
    </div>
    <p v-if="!isEdit">{{ slider?.descriptionRu }}</p>
    <div v-else class="mb-4">
      <label for="name">Описание</label>
      <textarea
        class="basic-input"
        v-model="localSlider.descriptionRu"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="isActive">Активный</label>
      <input type="checkbox" id="isActive" v-model="localSlider.isActive" />
    </div>

    <button
      v-if="isEdit"
      class="bg-white-btn"
      type="button"
      @click="editSeller"
    >
      Обновить
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, onMounted } from "vue";
import { Seller } from "~/types/Brands";
import { handleImageUpdate, updateImage } from "@/helpers/admin/banners";
import { Slider } from "~/Slider";
const props = defineProps<{
  slider: Slider;
}>();
const newStore = useNewsStore();

const emit = defineEmits<{
  deleteSlider: [Slider];
}>();

const isEdit = ref(false);
const localSlider = ref({
  descriptionKg: "",
  descriptionRu: "",
  isActive: false,
  titleRu: "",
  titleKg: "",
});

const updateSeller = async (body: any) => {
  try {
    const response = await http.put(
      `/api/v1/Slider/update-slider/${props?.slider.id}`,
      body,
    );
    if (response.status === 200) {
      useNotif("success", "Отредактировано!", "Успешно");
    }
    isEdit.value = false;
    newStore.fetchSliders();
  } catch (err) {
    console.log(err);
    useNotif("error", "Произошла ошибка", "Ошибка");
  }
};

const editSeller = () => {
  if (
    updateImage.value.value &&
    !updateImage.value.error?.length &&
    !updateImage.value?.loading
  ) {
    const body = {
      descriptionRu: localSlider.value.descriptionRu,
      descriptionKg: localSlider.value.descriptionKg,
      image: updateImage.value.value?.includes("https")
        ? null
        : updateImage.value.value,
      imageExtension: "png",
      isActive: localSlider.value.isActive,
      titleRu: localSlider.value.titleRu,
      titleKg: localSlider.value.titleKg,
    };

    updateSeller(body);
  } else {
    useNotif(
      "error",
      "Убедитесь что нету ошибок и все поля заполнены",
      "Ошибка",
    );
  }
};

const openEditForm = () => {
  toggleEdit();
};

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
  if (isEdit.value) {
    localSlider.value = { ...props.slider };
    updateImage.value.value = props.slider.image;
  }
};

onMounted(() => {
  localSlider.value = { ...props.slider };
});
</script>

<style scoped lang="scss">
.admin-icons {
  justify-content: flex-end;
}
p {
  margin: 10px 0;
}
textarea,
input {
  display: block;
  margin: 10px 0;
  width: 100%;
}
.seller-block-edit {
  max-width: 70%;
}
.seller-block {
  padding: 10px 14px;
  border-radius: 10px;
  max-width: 70%;
  width: 100%;
  box-shadow: 0px 6px 18px 0px rgba(0, 0, 0, 0.1215686275);
  &-images {
    @include flex(row, start, start);

    width: 40%;
    img {
      &:first-child {
        width: 40%;
      }
      &:last-child {
        width: 40%;
      }
    }
  }
}
</style>
