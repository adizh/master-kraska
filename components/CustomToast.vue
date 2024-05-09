<template>
  <div class="card flex justify-content-center">
    <Toast position="bottom-center" group="bc">
      <template #message="slotProps">
        <div class="flex flex-column align-items-start" style="flex: 1">
          <div class="flex align-items-center gap-2">
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              shape="circle"
            />
            <span class="font-bold text-900">Amy Elsner</span>
          </div>
          <div class="font-medium text-lg my-3 text-900">
            {{ slotProps.message.summary }}
          </div>
          <Button class="p-button-sm" label="Reply"></Button>
        </div>
      </template>
    </Toast>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();
const visible = ref(false);

const onClose = () => {
  visible.value = false;
};
</script>

<style scoped></style>
