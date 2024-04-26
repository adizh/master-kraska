<template>
    <h5 class="modal-header">{{ $t('confirmOrderText') }}?</h5>
    <div class='flex flex-row justify-content-end gap-2'>
        <button @click="$emit('confirm')" class='modal-btns'>{{ $t('confirm') }}</button>
        <button @click="$emit('cancel')" class='modal-btns blue'>{{ $t('cancel') }}</button>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    confirm: []
    cancel: []
}>()

</script>

<style scoped></style>