<template>
    <form class='cart-form margin-top-20'>

        <div class="cart-form-block">
            <h3>
                {{ $t('FIO') }} </h3>

            <div class="flex flex-row gap-5 cart-inputs">
                <div class='flex flex-column gap-2'>
                    <input type="text" class="basic-input  lg:w-14rem w-12 md:w-14rem" :placeholder="$t('FirstName')" required
                        v-model="deliveryForm.name.value" @input="handleDeliveryForm('name', 'string')">
                    <span v-if='deliveryForm.name.error' class="err-input-msg">{{ deliveryForm.name.error }}</span>
                </div>

                <div class='flex flex-column gap-2'>
                    <input type="text" class="basic-input lg:w-14rem w-12 md:w-14rem" :placeholder="$t('LastName')" required
                        v-model="deliveryForm.lastName.value" @input="handleDeliveryForm('lastName', 'string')">

                    <span v-if='deliveryForm.lastName.error' class="err-input-msg">{{ deliveryForm.lastName.error
                        }}</span>
                </div>

            </div>
        </div>

        <div class="cart-form-block">
            <h3>
                {{ $t('address') }}
            </h3>
            <div class="flex flex-column gap-2">
                <input type="text" class="basic-input lg:w-30rem w-12 md:w-30rem" :placeholder="$t('addressPlaceholder')"
                    v-model="deliveryForm.address.value" required @input="handleDeliveryForm('address', 'string')">
                <span v-if='deliveryForm.address.error' class="err-input-msg">{{ deliveryForm.address.error }}</span>

                <!-- <input type="text" class="form-input w-30rem" placeholder="Квартира, апартаменты, жилое помещение"> -->
            </div>
        </div>

        <div class="cart-form-block">
            <h3>
                {{ $t('city') }}
            </h3>

            <div class="flex flex-column gap-2">
                <input type="text" class="basic-input lg:w-30rem w-12 md:w-30rem" required v-model="deliveryForm.city.value"
                    @input="handleDeliveryForm('city', 'string')">
                <span v-if='deliveryForm.city.error' class="err-input-msg">{{ deliveryForm.city.error }}</span>

            </div>
        </div>

        <div class="cart-form-block">
            <h3>
                {{ $t('phone') }}
            </h3>
            <div class="flex flex-column gap-2">
                <InputMask id="basic" mask="+999 999 99 99 99" placeholder="+996 700 55 55 55"
                    v-model="deliveryForm.phone.value" required
                    @update:modelValue="handleDeliveryForm('phone', 'string')" />
                <span v-if='deliveryForm.phone.error' class="err-input-msg">{{ deliveryForm.phone.error }}</span>
            </div>
        </div>

        <div class="cart-form-block">
            <h3>
                {{ $t('email') }}
            </h3>

            <div class="flex flex-column gap-2">
                <input type="email" class="basic-input lg:w-30rem w-12 md:w-30rem" required v-model="deliveryForm.email.value"
                    @input="handleDeliveryForm('email', 'email')">
                <span v-if='deliveryForm.email.error' class="err-input-msg">{{ deliveryForm.email.error }}</span>
            </div>
        </div>

        <div class="delivery-comments">
            <h3>{{ $t('comments') }}</h3>
            <input type="text" class="basic-input mt-4" :placeholder="$t('comments')"
                v-model="deliveryForm.comment.value">
        </div>
        <!-- <CartPayMethod @choosePayMethod="choosePayMethod" /> -->
    </form>


    <Dialog v-model:visible="isPayOpen" modal :style="{ width: '450px', padding: '30px 25px' }">
        <PaymentMbank v-if="selectedPayMethod === 'MBank'" @closeModal="isPayOpen = false" />
        <PaymentMegaPay v-else-if="selectedPayMethod === 'MegaPay'" />
        <PaymentElcart v-else-if="selectedPayMethod === 'Элкарт'" />
    </Dialog>

</template>

<script setup lang="ts">
const isPayOpen = ref(false);
const orderStore = useOrderStore();
const authStore = useAuthStore()
const { deliveryForm, delForm } = storeToRefs(orderStore)


const handleDeliveryForm = (field: keyof typeof orderStore.delForm, type: string) => {
    orderStore.handleValues(field, type)
}


const selectedPayMethod = ref("");

const choosePayMethod = (value: string) => {
    isPayOpen.value = true;
    selectedPayMethod.value = value;
}

onMounted(() => {
    if (authStore.getUser) {
        orderStore.setInitUser(authStore.getUser)
    }
})


</script>

<style scoped lang="scss">
.cart-form {
    &-block {
        @extend %border-bottoms;
        padding-bottom: 20px;
        margin-bottom: 20px;

        h3 {
            margin-bottom: 20px;
        }
    }
}


:deep(input#basic.p-inputtext) {
    padding: 16px 20px;
    border: 1px solid #dddddd;
    border-radius: 10px;
    margin-bottom: 5px !important;
    width: 68%;
}


@media (max-width:480px){
    .cart-form{
flex-direction: column !important;
    }

:deep(input#basic.p-inputtext) {
    width: 100%;
}
}
</style>