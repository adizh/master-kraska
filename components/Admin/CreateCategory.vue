<template>
  <UIModal
    :show-modal="openCreateCategoryModal"
    title="Добавить категорию"
    @close-modal="$emit('closeModal')"
  >
    <form
      class="mt-4 flex flex-column align-items-center"
      @submit.prevent="createCategory"
    >
      <div class="form-block">
        <label for="category">Категория</label>
        <input
          type="text"
          placeholder="Добавить категорию"
          v-model="category"
          class="basic-input"
          required
          id="category"
        />
      </div>

      <div class="mt-5 form-block">
        <label for="categoryKg">Категория (кырг)</label>
        <input
          type="text"
          placeholder="Добавить категорию"
          v-model="categoryKg"
          class="basic-input"
          required
          id="categoryKg"
        />
      </div>

      <button type="submit" class="pink-button">Добавить</button>
    </form>
  </UIModal>
</template>

<script setup lang="ts">
const emit = defineEmits(["closeModal"]);
const props = defineProps({
  openCreateCategoryModal: {
    type: Boolean,
  },
});
const category = ref("");
const categoryKg = ref("");
const createCategory = async () => {
  try {
    const response = await http.post("/api/v1/Category/create-category", {
      nameRu: category?.value,
      nameKg: categoryKg?.value,
      parentId:null
    });

    console.log("response", response);
    if (response.status == 200) {
      useNotif("success", "Категория создана!", "Успешно");
      setTimeout(() => {
        emit("closeModal");
      }, 600);

      category.value = "";
      categoryKg.value = "";
    }
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/dropdown.scss";

form {
  input {
    width: 100%;
    margin-top: 7px;
  }
}

.form-block {
  width: 100%;
}
</style>
