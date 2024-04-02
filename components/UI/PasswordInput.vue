<template>
    <div class="each-field password-block">
        <!-- <label for="password">Пароль</label> -->

        <input class='form-input col-12' :type="isPasswordOpen ? 'type' : 'password'" id="password"
            :value="passwordPropV" @input="updateModelValue">
        <img src="../../assets/icons/black/ri-eye-open.svg" alt="open" v-if="isPasswordOpen"
            @click="togglePassword(false)" class="password-icon">
        <img src="../../assets/icons/black/ri_eye-off-line.svg" alt="close" v-else @click="togglePassword(true)"
            class="password-icon">
        </input>

    </div>
</template>

<script setup lang="ts">
const isPasswordOpen = ref(false);

const props = defineProps<{
    passwordPropV?: string
}>()


const emit = defineEmits();

const updateModelValue = (event: any) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};
const togglePassword = (value: boolean) => {
    isPasswordOpen.value = value;
}
</script>

<style scoped lang="scss">
.password-block {
    position: relative;
}

.password-icon {
    position: absolute;
    width: 20px;
    right: 20px;
    top: 17px;
}
</style>