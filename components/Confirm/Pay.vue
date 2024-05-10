<template>
  <div>
    <h5 class="modal-header">{{ title }}?</h5>
    <div class="flex flex-row justify-content-end gap-2">
      <button @click="$emit('confirm')" class="modal-btns">
        {{ $t("confirm") }}
      </button>
      <button @click="$emit('cancel')" class="modal-btns blue">
        {{ $t("cancel") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const props = defineProps<{
  title: string;
}>();
</script>

<style scoped></style>
