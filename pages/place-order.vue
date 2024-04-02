<template>
    <section>
        <div class="main-header-h1">Оформление</div>
        <div class="orders grid">
            <div class="col-8 orders-first">
                <h3>Способ получения заказа</h3>
                <div class="buttons-sel">
                    <button class="order-btn" @click="selectWay(1)">Забрать из магазина
                        <img src="../assets/icons/carbon_checkmark-filled (1).svg" alt="">
                    </button>
                    <button class="order-btn" @click="selectWay(2)">Доставка</button>
                </div>
                <div class="order-first-info">
                    <h5>Условия самовывоза:</h5>
                    <ul>
                        <li>-Если товар в наличии в магазине, то вы можете забрать его сегодня, бесплатно</li>
                        <li>
                            -Если товар есть на Центральном складе, то мы привезём его в нужный магазин в течение
                            2–3 дней; в этом случае необходима 100% предоплата.
                        </li>
                        <li>-Если товар не поддерживается на остатке, то необходима 100% предоплата и мы привезём
                            его для вас в течение 7–10 рабочих дней</li>
                    </ul>
                </div>
                <div v-if="selectedOrderPlacement === 1">
                    <div class="magazine">
                        <h3>Выберите магазин откуда заберёте</h3>
                        <button class="order-btn" @click="isMagVisible = !isMagVisible">Выбрать магазин</button>
                    </div>

                    <div class="magazine">
                        <h3>Способ оплаты</h3>
                        <div class="flex flex-row flex-wrap gap-4">
                            <button class="order-btn">Банковской картой</button>
                            <button class="order-btn">Наличными</button>
                        </div>

                    </div>
                </div>


                <div v-else-if="selectedOrderPlacement === 2">
                    <CartForm />
                </div>


                <div class="comments">
                    <h3>Коментарии</h3>
                    <input type="text" class="basic-input" placeholder="Коментарии">
                </div>
            </div>


            <div class="cart-main-info-price col-3 ml-4">

                <div class="cart-main-info-price-block">
                    <div class="first">
                        <span>Всего: {{ cartStore.numberOfProds }} товар</span>
                        <span>{{ cartStore.totalOfTotalSum }} сом</span>
                    </div>
                    <div class="second">
                        <span>Скидка</span>
                        <span>0%</span>
                    </div>
                    <input class="basic-input" placeholder="Промокод" />
                    <div class="last">
                        <span>Итого</span>
                        <span>{{ cartStore.totalOfTotalSum }} сом</span>
                    </div>
                </div>
                <button class="margin-top-20">Подтвердить заказ</button>
            </div>


        </div>


        <div class="ordered-items margin-top-40 col-8">
            <h2>Товар</h2>
            <CartProductItem v-for="item in cartStore.getAllCart" :key="item.id" :item="item">
                <template #count-buttons>
                    <span class="price">{{ item.totalProdSum }} сом</span>
                </template>
            </CartProductItem>
        </div>

    </section>



    <Dialog v-model:visible="isMagVisible" modal :style="{ width: '65rem', padding: '10px 20px' }" class="dialog-mag">
        <template #header>
            <h5 class="m-3">Выбрать магазин</h5>
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
            <AddressItem v-for="  item   in   addressList  " :key="item.name" :name="item.name" :phone="item.phone"
                :email="item.email" :location="item.location" :time="item.time" />
        </div>
    </Dialog>

</template>

<script setup lang="ts">
const isMagVisible = ref(false);
import { addressList } from '@/assets/js/addressList';
const cartStore = useCartStore()
const selectedOrderPlacement = ref(1);
const selectWay = (type: number) => {
    if (type === 1) {
        selectedOrderPlacement.value = 1
    } else if (type === 2) {
        selectedOrderPlacement.value = 2
    }
}
</script>

<style scoped lang="scss">
.orders-first {
    padding: 40px;
    background: $main-white;
    border-radius: 20px;
    margin-top: 40px;

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
    padding: 64px 20px;
}

.order-btn {
    @extend %button-shared;
    @include flex(row, center, center);
    background: white;
    border: 1px solid $slider-border-color;
    border-radius: 10px;
    padding: 16px 20px;
    @include footerSpan(20px, 16px);
    color: $main-black !important;
    font-weight: 400;
}


h3 {
    margin-bottom: 20px;
}

.magazine {
    @extend %border-bottoms;
    padding-bottom: 20px;
    margin-top: 20px;
}

.comments {
    margin-top: 20px;

    input {
        width: 100%;
        border-color: $slider-border-color;


        &::placeholder {
            color: $slider-border-color !important;
        }
    }

}

.p-dialog .p-dialog-header .p-dialog-header-icon {
    background-color: none !important;
    outline: none !important;
    color: none;
}
</style>