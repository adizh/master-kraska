<template>


    <form class='order-form' @submit.prevent="sendCheckPayment">
        <h3>MBank</h3>
        <div class="flex flex-column gap-2 mt-4">
            <span for="basic">Номер телефона</span>
            <InputMask id="basic" mask="+999 999 99 99 99" placeholder="+996 777 66 55 44" v-model="mbankPhone" />
        </div>
        <div class="btn"> <button class="bg-white-btn" type="submit">Отправить</button></div>
    </form>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string
const mbankPhone = ref('');
const payStore = usePayStore();
const sendCheckPayment = () => {
    payStore.checkPayment({
        paymentType: 'mbank',
        phone: '996772140014'
    }, id)
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

    .btn {
        @include flex(flex, flex-end, center);
        width: 100%;

        button {
            box-shadow: 0px 0.5px 2.5px 0px #0000004d;
        }
    }

}
</style>