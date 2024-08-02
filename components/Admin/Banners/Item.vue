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
    
      </div>
  

      <p v-if="!isEdit">{{ seller?.titleRu }}</p>
  
      <div v-else class="mb-4">
        <label for="name">Заголовок</label>
        <textarea
          class="basic-input"
          v-model="localSeller.titleRu"
        ></textarea>
      </div>

      <p v-if="!isEdit">{{ seller?.titleKg }}</p>
  
      <div v-else class="mb-4">
        <label for="name">Заголовок (кырг)</label>
        <textarea
          class="basic-input"
          v-model="localSeller.titleKg"
        ></textarea>
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
  import { ref, defineProps, defineEmits, computed, onMounted } from "vue";
  import { Seller } from "~/types/Brands";
  import {

    handleImageUpdate,
    updateImage,

  } from "@/helpers/admin/banners";
import { Slider } from "~/Slider";
  const props = defineProps<{
    seller: Slider;
    currentSellers: Slider[];
  }>();
const newStore=useNewsStore()
  
  const emit = defineEmits<{
    openEdit: [Slider];
    deleteSeller: [Slider];
  }>();
  
  const isEdit = ref(false);
  const localSeller = ref({
    descriptionKg: "",
    descriptionRu: "",
    isActive: false,
    titleRu:'',
    titleKg:''
  });
  
  const updateSeller = async (body: any) => {
    try {
      const response = await http.put(
        `/api/v1/Slider/update-slider/${props?.seller.id}`,
        body,
      );
      if (response.status === 200) {
        useNotif("success", "Отредактировано!", "Успешно");
      }
      isEdit.value = false;
      newStore.fetchSliders()

    } catch (err) {
      console.log(err);
      useNotif("error", "Произошла ошибка", "Ошибка");
    }
  };
  
  const editSeller = () => {
    if (
      updateImage.value.value &&
      !updateImage.value.error?.length  && !updateImage.value?.loading
    ) {
      const body = {
        descriptionRu: localSeller.value.descriptionRu,
        descriptionKg: localSeller.value.descriptionKg,
        image: updateImage.value.value?.includes("https")
          ? null
          : updateImage.value.value,
        imageExtension: "png",
        isActive: localSeller.value.isActive,
        titleRu:localSeller.value.titleRu,
        titleKg:localSeller.value.titleKg,
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
  