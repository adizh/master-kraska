<template>
    <div class="main">
        <header>
            <img src="../../assets/icons/mdi_password-outline.svg" alt="locked">
            <div class="main-header">Cброс пароля</div>
        </header>

        <div class="grid form" v-if="!isPasswordsOpen">
            <div class="col-12 each-field">
                <div class="steps"><span>1</span><label for="name">Введите адрес, который вы использовали при создании
                        этого
                        аккаунта</label></div>
                <input class='col-12 basic-input' type="text" id="name" placeholder="Введите свою почту"
                    v-model="inputs.email.value" @input="handleInput('email', 'email')">
                <span v-if="inputs.email.error" class="err-input-msg">{{ inputs.email.error }}</span>
            </div>
            <div class="send-email">
                <button @click="sendEmail">Отправить</button>
            </div>

            <div class="col-12" v-if="isOTPOpen">
                <div class="col-12 each-field">
                    <div class="steps"><span>2</span><label for="code">Введите код, который мы использовали при создании
                            этого аккаунта</label></div>
                    <InputOtp v-model="inputs.code.value" :length='6' @input="handleInput('code', 'string')"
                        id="code" />
                    <span v-if="inputs.code.error" class="err-input-msg">{{ inputs.code.error }}</span>
                </div>
                <div class="send-email code">
                    <button @click="sendCode">Отправить</button>
                </div>
            </div>
        </div>



        <div class="grid form" v-else>
            <div class="col-12 each-field">
                <label for="password">Новый пароль</label>
                <input class='col-12 basic-input' type="text" id="password" placeholder="Новый пароль"
                    v-model="inputs.password.value" @input="handleInput('password', 'password')">
                <span v-if="inputs.password.error" class="err-input-msg">{{ inputs.password.error }}</span>
            </div>

            <div class="col-12 each-field">
                <label for="passwordRepeat"> Повторите пароль</label>
                <input class='col-12 basic-input' type="text" id="passwordRepeat" placeholder="Повторите пароль"
                    v-model="inputs.passwordRepeat.value" @input="handleInput('passwordRepeat', 'passwordRepeat')">
                <span v-if="inputs.passwordRepeat.error" class="err-input-msg">{{ inputs.passwordRepeat.error }}</span>
            </div>
            <div class="change-password">
                <button @click="changePassword" class="register-auth-btn">Сбросить</button>
            </div>

        </div>
    </div>

</template>

<script setup lang="ts">


const inputs = ref({
    email: { value: '', error: '' },
    code: { value: '', error: '' },
    password: { value: '', error: '' },
    passwordRepeat: { value: '', error: '' },

})
const isOTPOpen = ref(false)
const isPasswordsOpen = ref(false)
const { handleValues } = useInputValidation()
const handleInput = (field: string, type: string) => {
    handleValues(inputs.value, field, type);
}

const sendEmail = async () => {
    handleValues(inputs.value, 'email', 'email');

    const hasError = Object.values(inputs.value).some(input => input.error !== '');
    if (!hasError) {
        try {
            const response = await http.get(`/api/v1/User/send-code/${inputs.value.email.value}`);
            console.log('response sendEmail', response)
            if (response.status === 200) {
                isOTPOpen.value = true
            }
        } catch (err: any) {
            console.log(err, 'error sending code')
            if (err?.response?.data?.code === 404) {
                inputs.value.email.error = 'Пользователь не найден' || 'Ошибка'
            }
        }
    }
}

const sendCode = async () => {
    handleValues(inputs.value, 'email', 'email');
    handleValues(inputs.value, 'code', 'string');
    const hasError = Object.values(inputs.value).some(input => input.error !== '');
    if (!hasError) {
        try {
            const body = {
                "email": inputs.value.email.value,
                "code": inputs.value.code.value
            }
            const response = await http.post(`/api/v1/User/verify-code`, body);
            console.log('response sendCode', response);
            if (response.data.code === 404) {
                inputs.value.code.error = 'Неправильный код'
            }
            if (response.data.code === 200) {
                isPasswordsOpen.value = true;
            }
        } catch (err: any) {
            console.log(err, 'error sending code')
            if (err?.response?.data?.code === 404) {
                inputs.value.email.error = 'Пользователь не найден' || 'Ошибка'
            }
        }
    }
}

const changePassword = async () => {
    const validationTypes: any = {
        code: 'string',
        email: 'email',
        password: 'password',
        passwordRepeat: 'passwordRepeat',
    };
    for (const fieldName in inputs.value) {
        if (Object.prototype.hasOwnProperty.call(inputs.value, fieldName)) {
            const validationType = validationTypes[fieldName];
            handleValues(inputs.value, fieldName, validationType);
        }
    }

    const hasError = Object.values(inputs.value).some(input => input.error !== '');

    if (!hasError) {
        try {
            const body = {
                "email": inputs.value.email.value,
                "newPassword": inputs.value.password.value,
                "confirmPassword": inputs.value.passwordRepeat.value
            }
            const response = await http.post('/api/v1/User/reset-password', body);
            console.log('response resetPassword', response);
            if (response.status === 200) {

                useNotif('success', "Пароль сброшен и обновлен!", 'Успех')
                setTimeout(() => {
                    window.location.reload()
                }, 800);


            }
        } catch (err) {
            console.log(err, 'Error changing the password')
        }
    }
}
</script>

<style lang="scss" scoped>
.main {
    padding: 40px;
}

header {
    @include flex(column, center, center);

    .main-header {
        @include textFormat(20px, 20px, 600, #000)
    }
}

.form {
    margin-top: 20px;

    input {
        margin-top: 10px;
    }
}


input {
    padding: 16px 18px;
}

.send-email {
    padding-right: 10px;
    margin-top: 20px;
    width: 100%;
    @include flex(row, center, center);

    button {
        font-size: 16px;
        @extend %button-shared;
        background: $main-blue;

    }
}

.send-email.code {
    button {
        background: #33587D1A;
        color: $main-blue;
    }



}

.steps {
    @include flex(row, center, center);

    span {
        @include textFormat(24px, 24px, 700, $main-black)
    }

    label {
        @include textFormat(14px, 20px, 500, $main-black)
    }
}

:deep(.p-inputotp) {
    margin-top: 10px !important;

    input {
        width: 70px !important;
        height: 68px !important;
    }
}

.change-password {
    width: 100%;
    text-align: center;

    button {
        width: 97%;

        @extend %button-shared;
        @include textFormat(20px, 32px, 500, #fff);
        margin-top: 46px;
    }
}
</style>