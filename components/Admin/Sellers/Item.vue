<template>
  <div class="seller-block">
    <div class="admin-icons">
      <div @click.stop="openEditForm">
        <img src="../../../assets/icons/tdesign_edit.svg" alt="edit" />
      </div>
      <div @click.stop="$emit('deleteSeller', props.seller)">
        <img src="../../../assets/icons/icon=trash.svg" alt="trash" />
      </div>
    </div>

    <div :class="{ 'seller-block-images': !isEdit }" class="seller-block-edit">
      <img :src="seller?.image" alt="seller" v-if="!isEdit" />
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
      <img :src="seller?.certificateImage" alt="seller" v-if="!isEdit" />
      <div v-else class="mt-3 mb-5">
        <label for="certificateImage">Обновить фото сертификата</label>
        <input
          type="file"
          id="certificateImage"
          @change="handleCertificateImageUpdate"
        />
        <span v-if="updateCertificateImage.loading">Загрузка...</span>
        <span
          class="err-input-msg"
          v-else-if="
            !updateCertificateImage.loading && updateCertificateImage.error
          "
          >{{ updateCertificateImage?.error }}</span
        >
      </div>
    </div>

    <p v-if="!isEdit">{{ seller?.name }}</p>
    <div v-else class="mb-4">
      <label for="name">ФИО</label>
      <input class="basic-input" type="text" v-model="localSeller.name" />
    </div>
    <p v-if="!isEdit">{{ seller?.descriptionKg }}</p>

    <div v-else class="mb-4">
      <label for="name">Описание (кырг)</label>
      <textarea
        class="basic-input"
        v-model="localSeller.descriptionKg"
      ></textarea>
    </div>
    <p v-if="!isEdit">{{ seller?.descriptionRu }}</p>
    <div v-else class="mb-4">
      <label for="name">Описание</label>
      <textarea
        class="basic-input"
        v-model="localSeller.descriptionRu"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="isActive">Активный</label>
      <input type="checkbox" id="isActive" v-model="localSeller.isActive" />
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
import { Seller } from "~/types/Brands";
import {
  handleCertificateImageUpdate,
  handleImageUpdate,
  updateImage,
  updateCertificateImage,
} from "@/helpers/admin/sellers";
const props = defineProps<{
  seller: Seller;
  currentSellers: Seller[];
}>();
const brandsStore = useBrandsStore();

const emit = defineEmits<{
  openEdit: [Seller];
  deleteSeller: [Seller];
}>();

const isEdit = ref(false);
const localSeller = ref({
  name: "",
  descriptionKg: "",
  descriptionRu: "",
  isActive: false,
});

const updateSeller = async (body: any) => {
  try {
    const response = await http.put(
      `/api/v1/Seller/update-seller/${props?.seller.id}`,
      body,
    );
    if (response.status === 200) {
      useNotif("success", "Отредактировано!", "Успешно");
    }
    isEdit.value = false;
    brandsStore.fetchAllSellers();
  } catch (err) {
    console.log(err);
    useNotif("error", "Произошла ошибка", "Ошибка");
  }
};

const editSeller = () => {
  if (
    localSeller.value.name?.length &&
    localSeller.value.descriptionRu?.length &&
    localSeller.value.descriptionKg?.length &&
    updateImage.value.value &&
    !updateImage.value.error?.length &&
    updateCertificateImage.value.value &&
    !updateCertificateImage.value.error?.length
  ) {
    const body = {
      name: localSeller.value.name,
      descriptionRu: localSeller.value.descriptionRu,
      descriptionKg: localSeller.value.descriptionKg,
      image: updateImage.value.value?.includes("https")
        ? null
        : updateImage.value.value,
      imageExtension: "png",
      certificateImage: updateCertificateImage.value.value?.includes("https")
        ? null
        : updateCertificateImage.value.value,
      certificateImageExtension: "png",
      isActive: localSeller.value.isActive,
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
    localSeller.value = { ...props.seller };
    updateImage.value.value = props.seller.image;
    updateCertificateImage.value.value = props.seller.certificateImage;
  }
};

onMounted(() => {
  localSeller.value = { ...props.seller };
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
        border-radius: 50%;
      }
      &:last-child {
        width: 40%;
      }
    }
  }
}
</style>
