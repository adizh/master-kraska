<template>
    <form class='order-form' @submit.prevent="sendCheckPayment">
        <h3>MBank</h3>
        <div class="flex flex-column gap-2 mt-4">
            <span for="basic">{{ $t('phoneNumber') }}</span>
            <InputMask id="basic" mask="999999999999" placeholder="996700555555"
                v-model="payStore.getMbank.mbankPhone.value" @input="payStore.clearError('mbankPhone')" />
            <span v-if='payStore.getMbank.mbankPhone.error' class="err-input-msg">{{ payStore.getMbank.mbankPhone.error
                }}</span>
        </div>
        <div class="btn"> <button class="bg-white-btn" type="submit">{{ $t('submitData') }}</button></div>
    </form>

    <div v-if="payStore.getMbank?.openConfirm">
        <InputOtp v-model="payStore.getMbank.otp.value" :length='4' id="code" @input="payStore.clearError('otp')" />
        <span v-if='payStore.getMbank.otp.error' class="err-input-msg">{{ payStore.getMbank.otp.error }}</span>
        <div class="btn"> <button class="bg-white-btn" type="submit" @click='sendOtp'>{{ $t('submitData') }}</button>
        </div>
    </div>


</template>

<script setup lang="ts">
const route = useRoute();
const emit = defineEmits(['closeModal'])
const payStore = usePayStore();
const cartStore = useCartStore();

const {t}=useI18n()


//996772140014
const sendCheckPayment = () => {
    console.log(' phone: payStore.getMbank.mbankPhone.value,', payStore.getMbank.mbankPhone.value,)
    payStore.checkPayment({
        paymentType: 'mbank',
        phone: payStore.getMbank.mbankPhone.value,

    }, cartStore.getCurrentOrder?.orderNumber, 'mbank')
}

const sendOtp = async () => {

    const response = await payStore.confirmMbank();
    console.log('response from the apin setntop', response)
    if (response === 'Платеж в обработке...') {



        useNotif('success', payStore.getMbank.status, t('success'))
        setTimeout(() => {
            return navigateTo('/cart')
        }, 1000)
    }



    if (payStore.getMbank.statusCode === '201') {
        emit('closeModal');
        payStore.setExit(true);
        localStorage.removeItem('cart')

    }
}

</script>

<style scoped lang="scss">
:deep(input#basic.p-inputtext) {
    padding: 16px 20px;
    border: 1px solid #dddddd;
    border-radius: 10px;
    margin-bottom: 5px !important;
}

.order-form {
    margin-top: 20px;

    h3 {
        margin: 20px 0;

    }



}

.bg-white-btn {
    box-shadow: 0px 0.5px 2.5px 0px #0000004d;
}

.btn {
    @include flex(flex, flex-end, center);
    width: 100%;
}

:deep(.p-inputotp) {
    margin-top: 10px !important;
    @include flex(flex, center, center);


    input {
        width: 70px !important;
        height: 68px !important;
    }
}
</style>