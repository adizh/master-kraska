<template>
    <div class="register-auth">
        <p class="register-auth-header">Введите данные чтобы войти в аккаунт</p>
        <div class="register-auth-options">
            <input type="text" class="form-input" placeholder="Email" v-model.trim="inputs.email.value"
                @input="handleValues('email', 'email')">
            <span class="err-input-msg " v-if="inputs.email.error">{{ inputs.email.error }}</span>
            <div class="password-block-input">
                <input :type="isPasswordOpen ? 'text' : 'password'" class="form-input col-12" placeholder="Пароль"
                    v-model.trim="inputs.password.value" @input="handleValues('password', 'password')">
                <span class="err-input-msg " v-if="inputs.password.error">{{ inputs.password.error }}</span>
                <img src="../../assets/icons/black/ri-eye-open.svg" alt="open" v-if="isPasswordOpen"
                    @click="togglePassword(false)" class="password-icon">
                <img src="../../assets/icons/black/ri_eye-off-line.svg" alt="close" v-else @click="togglePassword(true)"
                    class="password-icon">
            </div>
            <span class="sm-blue-text" @click="isPasswordReset = true">Забыли пароль?</span>

         
            <button @click="submitLogin">Войти</button>

        </div>
    </div>


    <Dialog v-model:visible="isPasswordReset" modal :style="{ width: '600px' }">

        <AuthResetPassword />
    </Dialog>
</template>

<script setup lang="ts">
import { LoginInputs } from '@/types/Items'
import http from '@/composables/http'

const isPasswordOpen = ref(false);
const isPasswordReset = ref(false);

const togglePassword = (value: boolean) => {
    isPasswordOpen.value = value
}
const emit = defineEmits<{
    closeLoginModal: []

}>()
const inputs = ref<LoginInputs>({
    email: { value: '', error: '' },
    password: { value: '', error: '' },

})

const handleValues = (fieldName: keyof LoginInputs, validationType: string) => {
    const value = inputs.value[fieldName].value;
    inputs.value[fieldName].error = '';
    if (validationType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            inputs.value[fieldName].error = 'Неправильный формат почты';
        }
    }
    else if (validationType === 'password') {
        inputs.value[fieldName].error = value?.length < 1 ? 'Пароль должен быть больше 8 символов' : ''
    }
};


const submitLogin = async () => {
    const validationTypes: Record<keyof LoginInputs, string> = {
        email: 'email',
        password: 'password',

    };
    for (const fieldName in inputs.value) {
        if (Object.prototype.hasOwnProperty.call(inputs.value, fieldName)) {
            const validationType = validationTypes[fieldName as keyof LoginInputs];
            handleValues(fieldName as keyof LoginInputs, validationType);
        }
    }


    const hasError = Object.values(inputs.value).some(input => input.error !== '');
    if (!hasError) {
        try {
            const response = await http.post(`/api/v1/User/login`, null,
                {
                    params: {
                        email: inputs.value.email.value,
                        password: inputs.value.password.value
                    }
                }
            )
            if (response.status === 200) {
                emit('closeLoginModal');
                localStorage.setItem('userId', response.data.message.id);
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
            console.log('response submit login', response);
        } catch (err: any) {
            if (err?.response?.data?.code === 401) {
                inputs.value.password.error = err?.response?.data?.message || 'Произошла ошибка'
            }
            if (err?.response?.data?.code === 404) {
                inputs.value.email.error = err?.response?.data?.message || 'Произошла ошибка'
            }
            console.log('wjat is an error', err)
        }
    }


}           
</script>


<style lang="scss" scoped>
%active-btn {
    background: $light-blue;
    color: #33587D0F;
    border-color: #33587D0F
}

.register-auth {
    &-header {
        margin-bottom: 30px;
    }

    margin-top: 30px;

    &-options {
        @include flex(column, center, initial);

        input {
            font-size: 14px;
            padding: 13px 16px;

            &::placeholder {
                font-size: 14px;
            }
        }

        button {
            @extend %button-shared;
            @include textFormat(14px, 32px, 500, #fff);
            border-radius: 10px;

        }
    }
}

.sm-blue-text {
    @include textFormat(14px, 20px, 500, $blue-color);
    margin: 10px 0 30px 0;
    text-align: right;

    &:hover {
        cursor: pointer;
    }
}
</style>
