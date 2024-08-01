<template>
  <div class="seller-block">
    <div class="admin-icons">
      <div @click="openEdit">
        <img src="../../../assets/icons/tdesign_edit.svg" alt="edit" />
      </div>
      <div @click="$emit('deleteSeller',props?.seller)">
        <img src="../../../assets/icons/icon=trash.svg" alt="trash" />
      </div>
    </div>
    <div class="seller-block-images">
      <img :src="seller?.image" alt="seller" />
      <img :src="seller?.certificateImage" alt="seller" />
    </div>
    <p v-if="!isEdit">{{ seller?.name }}</p>
    <input class="basic-input" v-else type="text" v-model="localSellerName" />
    <p v-if="!isEdit">{{ seller?.descriptionKg }}</p>
    <textarea
      class="basic-input"
      v-else
      v-model="localSellerDescriptionKg"
    ></textarea>
    <p v-if="!isEdit">{{ seller?.descriptionRu }}</p>
    <textarea
      class="basic-input"
      v-else
      v-model="localSellerDescriptionRu"
    ></textarea>
    <div>
      <label for="isActive">Активный</label>
      <input type="checkbox" id="isActive" v-model="isSellerActive" />
    </div>

    <button v-if="isEdit" class="bg-white-btn" @click="editSeller">
      Обновить
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { Seller } from "~/types/Brands";
import {
  isEdit,
  localSellerName,
  localSellerDescriptionKg,
  localSellerDescriptionRu,
  isSellerActive,
} from "@/helpers/admin/sellers";
const props = defineProps<{
  seller: Seller;
}>();

const emit = defineEmits<{
  openEdit: [Seller];
  deleteSeller: [Seller];
}>();

const editSeller = () => {
  const body = {
    name: localSellerName.value,
    descriptionRu: localSellerDescriptionRu.value,
    descriptionKg: localSellerDescriptionKg.value,
    image: "string",
    imageExtension: "png",
    certificateImage: "string",
    certificateImageExtension: "png",
    isActive: isSellerActive.value,
  };
  console.log("body", body);
};

onMounted(() => {
  localSellerName.value = props.seller.name;
  localSellerDescriptionKg.value = props.seller.descriptionKg;
  localSellerDescriptionRu.value = props.seller.descriptionRu;
  isSellerActive.value = props.seller.isActive;
});

const openEdit = () => {
  isEdit.value = !isEdit.value;
  if (isEdit.value) {
    localSellerName.value = props.seller.name;
    localSellerDescriptionKg.value = props.seller.descriptionKg;
    localSellerDescriptionRu.value = props.seller.descriptionRu;
    isSellerActive.value = props.seller.isActive;
  } else {
    emit("openEdit", {
      ...props.seller,
      name: localSellerName.value,
      descriptionKg: localSellerDescriptionKg.value,
      descriptionRu: localSellerDescriptionRu.value,
      isActive: isSellerActive.value,
    });
  }
};
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
.seller-block {
  padding: 10px 14px;
  border-radius: 10px;
  max-width: 70%;
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
