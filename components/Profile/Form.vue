<template>
    <form @submit.prevent="editUser">
        <img :src="userLogo" alt="user profile">
        <input type="file" @change="uploadLogo($event)" accept="image/*">
        <div class="grid">
            <div class="col-6 each-field">
                <label for="name">Имя</label>
                <input class='form-input col-12' type="text" id="name" v-model="inputs.firstName.value"
                    @input="validate('firstName', 'string')">
                <span v-if="inputs.firstName.error" class="err-input-msg">{{ inputs.firstName.error }}</span>
            </div>
            <div class="col-6 each-field">
                <label for="surname">Фамилия</label>
                <input class='form-input col-12' type="text" id="surname" v-model="inputs.lastName.value"
                    @input="validate('lastName', 'string')">
                <span class="err-input-msg"> {{ inputs.lastName.error }}</span>
            </div>

            <div class="col-6 each-field"> <label for="phone">Телефон</label>



                <InputMask id="phone" v-model="inputs.phone.value" mask="+999 999 99 99 99"
                    placeholder="+996 777 66 55 44" @update:modelValue="validate('phone', 'string')" />
                <span class="err-input-msg" v-if="inputs.phone.error"> {{ inputs.phone.error
                    }}</span>
            </div>
            <div class="col-6 each-field"> <label for="email">Почта</label>
                <input class='form-input col-12' type="text" id="email" v-model="inputs.email.value"
                    @input="validate('email', 'email')">
                <span class="err-input-msg"> {{ inputs.email.error }}</span>

            </div>

            <div class="col-6 each-field">
                <label for="address"> Адрес доставки</label>
                <input class='form-input col-12' type="text" id="address" v-model="inputs.address.value"
                    @input="validate('address', 'string')">
                <span class="err-input-msg"> {{ inputs.address.error }}</span>
            </div>

            <div class="col-6 each-field">
                <label for="password"> Пароль</label>
                <button class="change-password-btn col-12" type="button"
                    @click="isPasswordChangOpen = !isPasswordChangOpen">Изменить
                    пароль</button>
            </div>
        </div>

        <div class="col-12 edit-btn">
            <button type="submit">
                Редактировать
            </button>
        </div>

    </form>
    <Toast />


    <Dialog v-model:visible="isPasswordChangOpen" modal :style="{ width: '600px' }">

        <AuthChangePassword />
    </Dialog>
</template>

<script setup lang="ts">
const store = useAuthStore();
const userLogo = ref('');
const isPasswordChangOpen = ref(false)
const inputs = ref({
    firstName: { value: '', error: '' },
    lastName: { value: '', error: '' },
    email: { value: '', error: '' },
    phone: { value: '', error: '' },
    address: { value: '', error: '' }
});
const toast = useToast()
onMounted(async () => {
    await store.fetchUser();
    inputs.value.firstName.value = store.getUser.firstName;
    inputs.value.lastName.value = store.getUser.lastName;
    inputs.value.email.value = store.getUser.email;
    inputs.value.phone.value = store.getUser.phone;
    inputs.value.address.value = store.getUser.address;
});



const { handleValues } = useInputValidation()

const validate = (field: string, type: string) => {
    handleValues(inputs.value, field, type);
}

const editUser = async () => {
    const validationTypes: any = {
        firstName: 'string',
        lastName: 'string',
        email: 'email',
        phone: 'string',
        address: 'string'
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
                "userId": store.getUserId,
                "firstName": inputs.value.firstName.value,
                "lastName": inputs.value.lastName.value,
                "address": inputs.value.address.value,
                "phoneNumber": inputs.value.phone.value,
                "image": ""
            }
            const response = await http.put('/api/v1/User/edit-user', body);
            if (response.status === 200) {
                toast.add({ severity: 'success', detail: 'Успешно редактировано!', summary: 'Успешно' })
            }
            console.log('response', response)
        } catch (err) {
            console.log(err)
        }
    }
}


const uploadLogo = (event: any) => {
    console.log('event', event)
    const file = event?.target?.files[0];
    const extension = file.name.split(".").pop();
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
        if (event.target?.result) {
            const base64 = event.target.result.toString();
            console.log('base64', base64)
            userLogo.value = base64;
            console.log('userLogo', userLogo)
            try {

                const body = {
                    "userId": store.getUserId,
                    "firstName": inputs.value.firstName.value,
                    "lastName": inputs.value.lastName.value,
                    "address": inputs.value.address.value,
                    "phoneNumber": inputs.value.phone.value,
                    "image": base64
                }
                const response = await http.put('/api/v1/User/edit-user', body);
                console.log("response in logo", response);
                if (response.status === 200) {

                }
                else {

                }
            } catch (error) {
                console.error("Failed to upload company logo:", error);

            }
        }
    }

    fileReader.readAsDataURL(file);

}



</script>

<style scoped lang="scss">
.change-password-btn {
    @extend %button-shared;
    background: #fff;
    border: 1px solid $slider-border-color;
    padding: 16px 18px;
    @include textFormat(16px, 20px, 500, $main-blue)
}

label {
    @include textFormat(16px, 20px, 500, $main-dark-grey)
}

.each-field {
    @include flex(column, start, start)
}

div {
    margin-bottom: 20px;
}

input {
    padding: 16px 18px;
}



.edit-btn {
    @include flex(flex, flex-end, center !important);

    button {
        @extend %button-shared;
        background: #fff;
        padding: 16px 18px;

        box-shadow: 0px 0.5px 2.5px 0px #0000004D;


        @include textFormat(20px, 20px, 600, $main-blue)
    }

}

img {
    width: 22%;
}

:deep(input#phone.p-inputtext) {
    padding: 15px 20px;
    width: 100%;
    border: 1px solid #dddddd;
    border-radius: 10px;
    margin-bottom: 5px !important;
}
</style>