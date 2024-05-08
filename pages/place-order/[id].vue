<template>
    <section>
        <div class="main-header-h1">{{ $t('orderRegister') }}</div>
        <div class="orders grid">
            <div class="orders-first lg:col-8 md-col-12 col-12">
                <h3>{{ $t('waysOfOrder') }}</h3>
                <div class="buttons-sel">
                    <button class="gray-buttons-border pay-btn" @click="selMethod(1)"
                        :class="{ 'selected-btn': method === 1 }">{{ $t('takeFromStore') }}
                        <img src="../../assets/icons/carbon_checkmark-filled (1).svg" alt="carbon"
                            v-show="method === 1">
                    </button>
                    <button class="gray-buttons-border pay-btn" @click="selMethod(2)" :class="{ 'selected-btn': method === 2 }">
                        {{ $t('delivery') }}
                        <img src="../../assets/icons/carbon_checkmark-filled (1).svg" alt="carbon"
                            v-show="method === 2">
                    </button>
                </div>
                <div class="order-first-info">
                    <h5>{{ $t('rulesPickip') }}:</h5>
                    <ul>
                        <li>-{{ $t('rulesPickip1') }}</li>
                        <li>
                            -{{ $t('rulesPickip2') }}
                        </li>
                        <li>-
                            {{ $t('rulesPickip3') }}
                        </li>
                    </ul>
                </div>
                <div v-if="selectedOrderPlacement === 1">
                    <div class="magazine">
                        <h3>{{ $t('chooseStore') }}</h3>
                        <button class="gray-buttons-border mb-2" @click="isMagVisible = !isMagVisible">{{
            selectedMarket?.name
        }}</button>
                        <span v-if='pickupErr.store' class="err-input-msg">{{
            pickupErr.store }}</span>
                    </div>

                    <span v-if='pickupErr.payMethod' class="err-input-msg">{{ pickupErr.payMethod }}</span>
                    <div class="delivery-comments mt-3">
                        <h3>{{ $t('comments') }}</h3>
                        <input type="text" class="basic-input" :placeholder="$t('comments')"
                            v-model="orderStore.delForm.comment.value">
                    </div>
                </div>


                <div v-else-if="selectedOrderPlacement === 2">
                    <CartForm />
                </div>
            </div>


            <div class="cart-main-info-price lg:col-4 md:col-6 sm:col-12 col-12">
                <div class="cart-main-info-price-block">
                    <div class="first">
                        <span>{{ $t('all') }}: {{ currentOrder?.items?.length }} {{ $t('product') }}</span>
                        <span>{{ currentOrder?.total}} сом</span>
                    </div>
                    <div class="second">
                        <span>{{ $t('accountPiece') }}</span>
                        <span>0%</span>
                    </div>
                    <input class="basic-input" placeholder="Промокод" />
                    <div class="last">
                        <span>{{ $t('inTotal') }}</span>
                        <span>{{ currentOrder?.total}} сом</span>
                    </div>
                </div>
                <button class="margin-top-20 pink-button" @click="submitOrder">{{ $t('confirmOrder') }}</button>
            </div>
        </div>
        <div class="ordered-items margin-top-40  lg:col-8 md:col-12  col-12">
            <h2>{{ $t('productCap') }}</h2>
            
            <CartProductItem v-for="order in currentOrder?.items" :key="order?.id" :item="order" orderPlace="orderPlace">
                <template #count-buttons>
                    <span class="price text-center">{{ order?.price * order?.quantity }} сом</span>
                </template>
            </CartProductItem>
        </div>

   



    <Dialog v-model:visible="isMagVisible" modal :style="{ padding: '10px 20px' }" class="dialog-mag">
        <template #header>
            <h5 class="m-3">{{ $t('Выбрать магазин') }}</h5>
        </template>
        <template #closeicon :style="{ background: 'transparent', color: 'none' }">
            <div class="mt-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.9938 5L11.8529 10.1397L6.71322 5L5 6.71322L10.1397 11.8529L5 16.9926L6.71322 18.7058L11.8529 13.5661L16.9938 18.7058L18.707 16.9926L13.5673 11.8529L18.707 6.71322L16.9938 5Z"
                        fill="#222222" />
                </svg>

            </div>
        </template>
        <div class="maps-address-list mt-4">
            <AddressItem v-for="item   in  orderStore.getShops  " :key="item.name" :name="item?.name"
                :phone="item?.phoneNumber" :email="item?.email" :address="item?.address" :openHours="item?.openHours"
                @click="selectAddress(item)" />
        </div>
    </Dialog>


    <Dialog v-model:visible="isWarningOpen" modal header=" "
        :style="{ width: '30rem', padding: '20px 40px 50px 20px' }">
        <div class="warning-modal-exit">
            <h5 class="modal-header2">{{ $t('cancedlOrderWarn') }}?</h5>
            <p class="warning-text-modal">
                {{ $t('cancelOrderTextWarn') }}
            </p>
            <div class='flex flex-row justify-content-end gap-2 buttons'>
                <button class="modal-btns danger" @click="deleteOrder">{{ $t('logout') }}</button>
                <button class='modal-btns' @click="isWarningOpen = false">{{ $t('cancel') }}</button>
            </div>
        </div>
    </Dialog>


    <UIModal :showModal="isPaymentOpen" @closeModal="closePayModal">
        <CartPayMethod @choosePayMethod="choosePayMethod" />
        <PaymentMbank v-if="pickUpPay === 'MBank'" @closeModal="isPaymentOpen = false" />
        <PaymentMegaPay v-else-if="pickUpPay === 'MegaPay'" />
        <!-- <PaymentElcart v-else-if="pickUpPay === 'Элкарт'" /> -->
    </UIModal>

</section>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false
})

import { AddressList } from '~/types/Items';
import { Order, OrderItem, UserOrder } from '~/types/Order';
import { User } from '~/types/User';

const { t } = useI18n()


const cartStore = useCartStore()
const selectedOrderPlacement = ref(1);

const currentOrder=ref({} as OrderItem)

const pickupErr = ref({
    store: '',
    payMethod: ""
})
const authStore = useAuthStore()
const method = ref(1);
const selectedMarket = ref({ name: t('selectStore') } as AddressList);
const comment = ref('');

const isMbnankOpen = ref(false);
const isPaymentOpen = ref(false)

const isMagVisible = ref(false);
const payStore = usePayStore()
const isWarningOpen = ref(false)
const pickUpPay = ref('')
const orderStore = useOrderStore();

const closePayModal = () => {
    isWarningOpen.value = true
}
const choosePayMethod = (value: string) => {
    console.log('value',value)
    pickUpPay.value = value;

    if(value===t('cash')){
        sendOrderCash()
    }

}
const route = useRoute()

const sendOrderCash=async()=>{
    try{
        const body = {
                
                orderId: route.params?.id,
                "shopId": '',
                "name": orderStore.deliveryForm.name.value,
                "lastName": orderStore.deliveryForm.lastName.value,
                "address": orderStore.deliveryForm.address.value,
                "city": orderStore.deliveryForm.city.value,
                "phone": orderStore.deliveryForm.phone.value,
                "email": orderStore.deliveryForm.email.value,
                "comment": orderStore.deliveryForm.comment.value,
                "deliveryType": 1
            }
            const result = await orderStore.sendOrder(body, 1);
            console.log('send order deliver in cash',result)
            if(result?.data?.code===200){
                useNotif('success',t('orderSent'),t('success'));
                payStore.setExit(true)
                localStorage.removeItem('cart')
        return navigateTo('/')
            }
    }catch(err){
        console.log(err)
    }finally{
        isPaymentOpen.value=false;
      
    }
}



const getOrderId=async()=>{
    try{
const response = await http(`/api/v1/Order/get-order-id/${route?.params?.id}`);
console.log('response',response);
if(response.status===200){

    currentOrder.value={...response.data, items:response.data?.items?.map((item:UserOrder)=>{
             if(authStore.getSelectedLang==='kg'){
                    return {...item, productName:item?.productNameKg,productDescription:item?.productDescriptionKg.replace(
                  /<(\/?(p|br|h[1-5]|strong|img|a|div|span|li|ul|ol)( [^>]*)?)\/?>/g,
                  ""
                )
            }
                }else{
                    return {...item, productName:item?.productNameRu,productDescription:item?.productDescriptionRu?.replace(
                  /<(\/?(p|br|h[1-5]|strong|img|a|div|span|li|ul|ol)( [^>]*)?)\/?>/g,
                  ""
                )}

                }
    })}
}
    }catch(err){
        console.log(err)
    }
}

const deleteOrder = async () => {
    try {
        const response = await http.delete(`/api/v1/Order/delete-order?orderNumber=${cartStore.getCurrentOrder?.orderNumber}`);
        console.log('delete order response', response);
        if (response.status === 200) {


            useNotif('success', t('orderCancelled'), t('success'))
            isWarningOpen.value = false;
            isPaymentOpen.value = false;
            return navigateTo('/')
        }
    } catch (err) {
        console.log(err)
    }
}

const selMethod = (type: number) => {
    method.value = type;
    if (type === 1) {
        selectedOrderPlacement.value = 1
    } else if (type === 2) {
        selectedOrderPlacement.value = 2
    }
}



const selectAddress = (item: AddressList) => {
    selectedMarket.value = item;
    isMagVisible.value = false;
    pickupErr.value.store = ''
}
const resultPicUp = ref()


const submitOrder = async () => {
    const authStore = useAuthStore()
    if (method.value === 1) {
        if (selectedMarket?.value?.id) {
            const body = {
                orderId: route.params?.id,
                "shopId": selectedMarket?.value?.id,
                "name": authStore.getUser?.firstName,
                "lastName": authStore.getUser?.lastName,
                "address": authStore.getUser?.address,
                "city": '',
                "phone": authStore?.getUser?.phone,
                "email": authStore.getUser?.email,
                "comment": orderStore.delForm.comment?.value,
                "deliveryType": 0
            }

            resultPicUp.value = await orderStore.sendOrder(body, 0);

            if (resultPicUp.value.data.code === 200) {
                payStore.setExit(true)
                localStorage.removeItem('cart')
                return navigateTo('/')
            }
        }
        else {
            if (!selectedMarket?.value?.id) {
                pickupErr.value.store = t('selectStore')
            }
        }
    } else {
        for (const fieldName in orderStore.delForm) {
            if (orderStore.delForm.hasOwnProperty(fieldName)) {
                const field = orderStore.delForm[fieldName as keyof typeof orderStore.delForm];

                if ('type' in field) {
                    const validationType = field.type;
                    orderStore.handleValues(fieldName as keyof typeof orderStore.delForm, validationType);

                }
            }
        }
        const hasError = Object.values(orderStore.deliveryForm).some(input => input.error !== '');

        if (!hasError) {
            const body = {

                orderId: route.params?.id,

                "shopId": '',

                "name": orderStore.deliveryForm.name.value,

                "lastName": orderStore.deliveryForm.lastName.value,

                "address": orderStore.deliveryForm.address.value,

                "city": orderStore.deliveryForm.city.value,

                "phone": orderStore.deliveryForm.phone.value,

                "email": orderStore.deliveryForm.email.value,

                "comment": orderStore.deliveryForm.comment.value,
                "deliveryType": 1
            }
            const result = await orderStore.sendOrder(body, 1);
            console.log('result in submitOrder', result);
            if (result?.status === 200) {
                isPaymentOpen.value = true;

            }

        }

    }

}



onMounted(() => {
    const section = document.querySelector('.footer-section') as HTMLElement;
    section.style.display = 'none';
    orderStore.fetchOrderById(route.params?.id as string)
    authStore.fetchUser()
    orderStore?.fetchAllShops()
    getOrderId()

})


watch(() => authStore.getSelectedLang, () => {
    orderStore?.fetchAllShops()
});

onBeforeRouteLeave((to, from, next) => {
    if (!payStore.getExit) {
        const answer = window.confirm(
            "Вы уверены, что хотите выйти? Заказ будет отменен в случае выхода"
        );
        if (answer) {
            deleteOrder()
        } else {
            return false;
        }

        next()
    } else {
        next()
    }



});


</script>

<style scoped lang="scss">
.pay-btn{
    width: 35%;
}
.orders-first {
    padding: 40px;
    background: $main-white;
    border-radius: 20px;
    margin-top: 58px;

    &-info {
        h5 {
            margin-bottom: 10px !important;
        }

        li {
            @include footerSpan(20px, 14px);
            color: $main-black !important;
            font-weight: 400;
        }
    }
}


.buttons-sel {
    @include flex(row, start, center, 20px);
    margin: 20px 0;
}

.dialog-mag {
    width: 70%;
    padding: 64px 20px;
}

h3 {
    margin-bottom: 20px;
}

.magazine {
    @extend %border-bottoms;
    padding-bottom: 20px;
    margin-top: 20px;
}

.warning-modal-exit {
    p {
        @include textFormat(20px, 20px, 600, #000);
    }

    .danger {
        color: #EB5757;
    }

    .buttons {
        margin-top: 20px;
    }
}

.p-dialog .p-dialog-header .p-dialog-header-icon {
    background-color: none !important;
    outline: none !important;
    color: none;
}


:deep(.p-dialog-header) {
    @include flex(row, flex-end !important, center)
}

@media (max-width:1000px) {

    .main-header-h1 {
        font-size: 28px !important;
        line-height: 28px;
    }
}




@media (max-width:768px) {
    .buttons-sel {
        flex-direction: column;
        align-items: start;
    }
}

@media (max-width:576px){
    .pay-btn{
        width:60% !important
    }
}
@media (max-width:480px) {
    .dialog-mag {
        width: 100%;
    }
    .pay-btn{
        width:80% !important
    }
}
</style>