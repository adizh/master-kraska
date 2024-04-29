<template>
    <section v-if="store.getAllCart?.length">
        <div class="main-header-h1">{{ $t('cart') }}</div>
        <div class="cart-main grid" >
            <div class="cart-main-info lg:col-8 md:col-12 sm:col-12">
                <CartProductItem v-for="cartItem in store.getAllCart" :key="cartItem.id" :item="cartItem">
                </CartProductItem>
            </div>

            <div class="cart-main-info-price lg:col-4 md:col-6 sm:col-12 col-12">
                <button class="pink-button" @click='isConfirmOpen = true'>{{ $t('goToRegister') }}</button>
                <div class="cart-main-info-price-block">
                    <div class="first">
                        <span>{{ $t('all') }}: {{ store.numberOfProds }}  {{ $t('product') }}</span>
                        <span>{{ store.totalOfTotalSum }} сом</span>
                    </div>
                    <div class="second">
                        <span>{{ $t('accountPiece') }}</span>
                        <span>0%</span>
                    </div>
                    <input class="basic-input" placeholder="Промокод" disabled />
                    <div class="last">

                        <span>{{ $t('inTotal') }}</span>
                        <span>{{ store.totalOfTotalSum }} сом</span>

                    </div>

                </div>

                <button class="bg-white-btn" @click="store.saveNewCart">{{ $t('saveChanges') }}</button>
            </div>
        </div>


        <ProductsPopular />

   
    </section>
<section v-else>
    <NoContent :title="$t('noCart')">
        <template #icon>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M31.1667 31.1667C30.1942 31.1667 29.2616 31.553 28.5739 32.2406C27.8863 32.9282 27.5 33.8609 27.5 34.8333C27.5 35.8058 27.8863 36.7384 28.5739 37.4261C29.2616 38.1137 30.1942 38.5 31.1667 38.5C32.1391 38.5 33.0718 38.1137 33.7594 37.4261C34.447 36.7384 34.8333 35.8058 34.8333 34.8333C34.8333 33.8609 34.447 32.9282 33.7594 32.2406C33.0718 31.553 32.1391 31.1667 31.1667 31.1667ZM31.1667 31.1667H17.039C16.1938 31.1667 15.7703 31.1667 15.422 31.0163C15.1151 30.8839 14.8501 30.6703 14.6557 30.3985C14.4357 30.0923 14.3495 29.6835 14.1772 28.8768L9.66167 7.81917C9.48567 6.99233 9.39583 6.578 9.17583 6.27C8.98103 5.9973 8.71541 5.78303 8.40767 5.65033C8.06117 5.5 7.6395 5.5 6.79617 5.5H5.5M11 11H34.6005C35.9242 11 36.5842 11 37.0297 11.275C37.4188 11.5168 37.7033 11.8955 37.8272 12.3365C37.9683 12.8388 37.7868 13.475 37.4202 14.7455L34.881 23.5455C34.661 24.3063 34.551 24.6858 34.331 24.9682C34.1338 25.2174 33.8755 25.4113 33.5812 25.531C33.2512 25.6667 32.8552 25.6667 32.0687 25.6667H14.1717M14.6667 38.5C13.6942 38.5 12.7616 38.1137 12.0739 37.4261C11.3863 36.7384 11 35.8058 11 34.8333C11 33.8609 11.3863 32.9282 12.0739 32.2406C12.7616 31.553 13.6942 31.1667 14.6667 31.1667C15.6391 31.1667 16.5718 31.553 17.2594 32.2406C17.947 32.9282 18.3333 33.8609 18.3333 34.8333C18.3333 35.8058 17.947 36.7384 17.2594 37.4261C16.5718 38.1137 15.6391 38.5 14.6667 38.5Z"
                    stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </template>
    </NoContent>
</section>


    <Dialog v-model:visible="isConfirmOpen" modal :style="{ width: '550px', padding: '20px 40px 50px 20px' }"
        header=" ">
        <ConfirmPay @confirm="createOrder" @cancel="isConfirmOpen = false"  :title="$t('confirmOrderText')"/>
    </Dialog>


   
</template>

<script setup lang="ts">
const store = useCartStore();

const orderStore = useOrderStore()

const isConfirmOpen = ref(false)







const createOrder = () => {
    orderStore.createOrder()
}





</script>

<style scoped lang="scss">
.cart-main {

    &-info-middle {
        font-weight: 400;
    }


}

.each-block-info-col {
    margin: 10px 0 !important;
}

.prod-count-buttons {
    span {
        font-weight: 600;
    }
}


@media (min-width:1300px) {
    section {
        max-width: 1300px;
        margin: 0 auto;
    }
}
.cart-main-info{
    margin-top: 40px;
  
}


@media (max-width:1000px) {
    .cart-main.grid {
        flex-direction: column;
    }

    .cart-main-info-price {
        border: 1px solid $slider-border-color;
        border-radius: 10px;
    }
}
</style>