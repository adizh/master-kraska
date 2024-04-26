<template>
    <form class='order-form' @submit.prevent="sendCheckPayment">
        <h3>MegaPay</h3>
        <div class="flex flex-column gap-2 mt-4">
            <span for="basic">{{ $t('phoneNumber') }}</span>
            <InputMask id="basic" mask="999999999999" placeholder="996700555555"
                v-model="payStore.getMega.megaPhone.value" @input="payStore.clearErrorMega('megaPhone')" />
            <span v-if='payStore.getMega.megaPhone.error' class="err-input-msg">{{ payStore.getMega.megaPhone.error
                }}</span>

            <label for="account">{{ $t('account') }}</label>

            <input type="text" :placeholder="$t('account')" id="account" v-model="payStore.getMega.megaAccount.value"
                class="basic-input">
            <span v-if='payStore.getMega.megaAccount.error' class="err-input-msg">{{ payStore.getMega.megaAccount.error
                }}</span>
        </div>
        <div class="btn"> <button class="bg-white-btn" type="submit">{{ $t('submitData') }}</button></div>
    </form>

    <div v-if="payStore.getMega.openConfirm">
        <div class="flex flex-column gap-2">
            <label for="user">{{ $t('user') }}</label>
            <InputMask id="basic" mask="999999999999" placeholder="996700555555" v-model="payStore.getMega.user.value"
                @input="payStore.clearErrorMega('user')" />
        </div>

        <span v-if='payStore.getMega.user.error' class="err-input-msg">{{ payStore.getMega.user.error
            }}</span>

        <div class="flex flex-column  mt-3">
            <InputOtp v-model="payStore.getMega.otp.value" :length='4' @input="payStore.clearErrorMega('otp')"
                class="mb-2" />
            <span v-if='payStore.getMega.otp.error' class="err-input-msg">{{ payStore.getMega.otp.error }}</span>
        </div>
        <div class="btn"> <button class="bg-white-btn" type="submit" @click='sendPayment'>{{ $t('submitData')
                }}</button></div>
    </div>


</template>

<script setup lang="ts">
const route = useRoute();
const emit = defineEmits(['closeModal'])
const payStore = usePayStore();
const cartStore = useCartStore();




const sendCheckPayment = () => {
  
    payStore.checkPayment({
        paymentType: 'mega',
        phone: payStore.getMega.megaPhone.value,
        account: payStore.megapay.megaAccount.value,
        amount: cartStore.getCurrentOrder?.total
    }, cartStore.getCurrentOrder?.orderNumber, 'megapay')
}

const sendPayment = async () => {
    const params = {
        "user": payStore.getMega.user.value,
        "account": payStore.getMega.megaAccount.value,
        "amount": cartStore.getCurrentOrder?.total,
        "pinCode": payStore.getMega.otp.value,

    }
    payStore.iniPaymentMegapay(params, cartStore.getCurrentOrder?.orderNumber)




}

</script>

<style scoped lang="scss">
:deep(input#basic.p-inputtext) {
    padding: 16px 20px;
    border: 1px solid #dddddd;
    border-radius: 10px;
    margin-bottom: 5px !important;
}

.basic-input {
    padding: 16px 20px !important;
    border: 1px solid #dddddd;
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



    input {
        width: 70px !important;
        height: 68px !important;
    }
}
</style>