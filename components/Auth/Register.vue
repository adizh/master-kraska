<template>
    <div class="register-auth">
        <p class="register-auth-header">Выберите спопоб создания аккаунта</p>

        <div class="register-auth-options">
            <button @click="emit('selectRegister', 1)">Электронная почта</button>
            <button>Google</button>
            <button>Facebook</button>

        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    selectRegister: [number]
}>()
</script>

<style lang="scss" scoped>
%active-btn {
    background: #33587d10;
    color: #33587d;

}

.register-auth {
    &-header {
        margin-bottom: 30px;
    }

    margin-top: 30px;

    &-options {
        @include flex(column, center, initial);

        button {
            border: 1px solid $slider-border-color;
            background: #fff;
            padding: 5px 0;
            @include textFormat(14px, 32px, 500, $main-black);
            border-radius: 10px;

            &:hover {
                @extend %active-btn;
            }
        }
    }
}
</style>