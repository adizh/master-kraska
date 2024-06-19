<template>
  <div>
    <transition name="modal-fade" mode="in-out">
      <div
        v-if="showModal"
        class="modal-container"
        :style="modalContainerStyle"
      >
        <div class="modal-content" :style="modalStyle">
          <span class="close" @click="closeModal">&times;</span>

          <a href="#">{{ title }}</a>

          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Define props and emits
const props = defineProps<{
  showModal: Boolean;
  title?: String;
  specialStyle?: Boolean;
  modalStyle?: Object;
  modalContainerStyle?: Object;
}>();

const emit = defineEmits(["closeModal"]);

// Define data
const data = ref({
  // Define any data properties here if needed
});

// Define methods
const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  z-index: 5;

  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  height: 100%;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
}

.modal-content {
  position: relative;
  width: 50%;
  background-color: white;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-height: 85vh;
  overflow-y: auto;
  padding: 40px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.popup-tabs-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: block;
  height: 62px;
  background: #f8f8f8;
  border-radius: 4px;
  border-bottom: 1px solid #e0e0e0;
}

.popup-tabs-nav li:first-child a {
  border-radius: 0 !important;
  background: white !important;
  color: #193d7a;
  font-weight: 800;
}

.special-style {
  background-color: none;
  height: 200px;
  position: relative;
  z-index: 999999;
}

.close {
  font-size: 35px;
  color: black;
  right: 20px;
  top: 2px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 786px) {
  .modal-content {
    width: 70% !important;
  }
}

@media (max-width: 567px) {
  .modal-content {
    width: 95% !important;
  }

  .sign-in-form {
    z-index: 1 !important;
  }

  .close {
    z-index: 1000;
  }
}
</style>
