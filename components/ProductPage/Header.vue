<template>
    <div class="item-page-header">
        <div class="left">
            <!-- <NuxtImg src="/test-kraska.png" /> -->

            <img src="../../assets/images/test-kraska.png" alt="">
        </div>
        <div class="middle">
            <div class="middle-header">
                {{ product?.name }}
            </div>
            <div>
                <p class="each-block-info-col">Торговая марка:</p>
                <!-- <NuxtImg src="/brands/marshall.png" /> -->
                <img src="../../assets/images/test-kraska.png" alt="">
            </div>
            <div class="middle-review"><span class="each-block-info-col">Рейтинг</span>
                <div class='middle-rating'>
                    <span class="middle-review-number">5/5</span>
                    <Rating v-model="ratingValue" :cancel="false" />
                    <span class="middle-review-text">Отзывы</span>
                </div>

            </div>
            <div class="middle-volume">
                <span class="each-block-info-col">Объем</span>

                <div class="middle-volume-buttons">
                    <button>{{ product?.packing }} л</button>
                    <button>{{ product?.size }} л</button>
                </div>
            </div>


            <div class="middle-koler">
                <span class="each-block-info-col">База под колеровку</span>
                <button class="middle-koler-btn">А (белая, светлые тона)</button>
            </div>
            <div>
                <span class="each-block-info-col">
                    Расход
                </span>
                <p>1л=7-12КВ.М. 9л=63.00-108.00КВ.М.</p>
            </div>
            <div>
                <span class="each-block-info-col">Параметры</span>
                <div class="middle-parameters">
                    <button><span>Выбрать цвет</span>
                        <img src="../../assets/icons/mingcute_color-picker-fill.svg" />
                    </button>
                    <button @click="toggle"><span>Рассчитать</span>
                        <img src='../../assets/icons/ion_calculator-outline.svg' />
                    </button>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="header">
                <span>Цены</span>
                <UIBookmarks :product="product" />
                <!-- <button @click="toggleBoomark(product?.id)" v-if="!isProductBookmarked">
                    В избранное
                    <img src="../../assets/icons/icon=heart.svg" alt="heart" />
                </button>
                <button @click="toggleBoomark(product?.id)" v-else>
                    Убрать
                    <img src="../../assets/icons/icon=heart fill.svg" alt="heart icon">
                </button> -->
            </div>

            <div class="numbers">
                <p><span>шт</span>
                    <span class="numbers-price">{{ product?.price }} сом</span>
                </p>
                <p><span>л</span>500 сом</p>
                <p><span>м2</span>50 сом</p>
            </div>

            <div class="count">
                <span class="each-block-info-col">Количество</span>
                <button class="prod-count-buttons">
                    <span @click="decreaseCount">-</span>
                    <span>{{ countToBuy }}</span>
                    <span @click="increaseCount">+</span>
                </button>
            </div>

            <div class="count">
                <span class="each-block-info-col">Сумма</span>
                {{
                    product?.price * countToBuy }} сом
            </div>



            <div class="buy-btns"> <button @click="addToCart">Добавить в корзину</button>
                <button>Купить сразу</button>
            </div>
        </div>
    </div>


    <OverlayPanel ref="countOverlay" class="countOverlay" style="width: 38%">
        <div class="count-overlay">
            <span class="header">Рассчитать цену</span>
            <div class="count-overlay-inputs">
                <div class="count-overlay-inputs-block">
                    <span>Длина</span>
                    <input type="text" placeholder="0 м" v-model="length" />

                </div>
                <div class="count-overlay-inputs-block sign">x</div>
                <div class="count-overlay-inputs-block">
                    <span>Ширина</span>
                    <input type="text" placeholder="0 м" v-model="width" />

                </div>
                <div class="count-overlay-inputs-block sign">=</div>
                <div class="count-overlay-inputs-block">
                    <span>Площадь</span>
                    <input type="text" placeholder="0 м" v-model="sumHeight" disabled />
                </div>
            </div>

            <div class="count-overlay-res sizes">

                <span>Рекомендуемое количество краски:</span>
                <div class="btns">
                    <button>1 слой 0л</button>
                    <button>2 слоя 0 л</button>
                </div>
            </div>
            <div class="count-overlay-res">

                <span>Вам нужно:</span>
                <p>6 банок по 9л + 2 банки по 2.7л</p>
            </div>
            <div class="count-overlay-finish">
                <span>Итого</span>
                <span>5000сом</span>
            </div>
            <button>В корзину</button>
        </div>
    </OverlayPanel>
    <Toast />
</template>

<script setup lang="ts">
import Rating from 'primevue/rating';
import { Product } from '@/types/Product'
import Id from '~/pages/product/[id].vue';
const props = defineProps<{
    product: Product
}>()
const ratingValue = ref(5);
const countOverlay = ref();
const countToBuy = ref(1);
const totalPrice = ref(0)
const authStore = useAuthStore();
const productStore = useProductsSstore()
const store = useCartStore()
const toast = useToast()

const length = ref(0)
const width = ref(0)
const isProductBookmarked = ref(false)
const sumHeight = computed(() => length.value * width.value);

const toggle = (event: any) => {
    countOverlay.value.toggle(event);
}


ratingValue.value = props?.product?.rating

const decreaseCount = () => {
    if (countToBuy.value > 1) {
        countToBuy.value--;
        totalPrice.value = countToBuy.value * props.product.price
    }
}

const toggleBoomark = (id: string) => {
    isProductBookmarked.value = !isProductBookmarked.value;
    productStore.addToBookmarks(id)
}

const increaseCount = () => {
    countToBuy.value++;
    totalPrice.value = countToBuy.value * props.product.price
}

const addToCart = () => {
    const prodItem = { ...props.product, count: countToBuy.value, totalProdSum: totalPrice.value }
    store.addToCart(prodItem)
}




const { data: getBookmarkItem } = useApi('/api/v1/Bookmark/get-bookmarks', {
    method: 'get',
    query: {
        userId: authStore.getUserId,
        objectId: props?.product?.id
    }
}) as any;

onMounted(() => {
    productStore.getBookmarks(props?.product?.id);
    isProductBookmarked.value = productStore.getProductBookmarked
})
</script>

<style scoped lang="scss">
.count-overlay {
    @include flex(column, start, space-between);
    padding: 20px;


    .header {
        @include footerSpan(24px, 24px);
        color: $main-black !important;
        font-weight: 700;

    }

    &-inputs {
        @include flex(row, center, center, 2px);



        &-block {
            @include flex(column, start, start);
        }

        .sign {
            margin-top: 20px;
            width: 5% !important;
            margin-left: -4px;

        }

        span {
            @include footerSpan(20px, 14px);
            color: black !important;
            width: 95%;
            text-align: center;
        }

        input {
            width: 95%;
            padding: 10px 35px;
            border: 1px solid $slider-border-color;
        }

    }

    &-res {
        @extend %border-bottoms;
        padding-bottom: 20px;

        span {
            @extend %sm-span;
            color: $main-gray !important;
        }

        p {
            color: black;
        }

        ;

    }

    &-finish {
        @include flex(row, space-between, center);
        @include footerSpan(20px, 20px);
        color: $main-black !important;
        font-weight: 600;
    }

    button {
        @extend %button-shared;
        margin-top: 40px;
        font-size: 20px;
    }

}

:deep(.p-overlaypanel) {
    width: 300px;
}

.buy-btns {
    @include flex(column, start, auto)
}

.buy-btns button:first-child {
    @extend %button-shared;
    font-size: 18px;
}

.buy-btns button:last-child {
    @include items-button(6px 20px 6px 20px, $main-black, $main-white, 1px solid $main-white , 18px);

}

.right {
    width: 25%;
    padding: 20px;
    border: 1px solid $slider-border-color;
    border-radius: 10px;
    @include flex(column, start, space-between, 25px);

    .header {
        @include flex(row, space-between, center);

        span {
            font-weight: 700 !important;
            @include footerSpan(24px, 24px);
            color: $main-black;
        }

      



    }

    .numbers {
        @include flex(row, space-between, center);

        &-price {
            color: $main-blue !important;
        }

        p {
            @include flex(column, center, center, 2px);

            span {
                @extend %sm-span;
                margin: 2px 0;
            }
        }
    }
}

.count {
    @include flex(row, space-between, center);
}




.item-page-header {
    @include flex(row, space-between, start)
}

.left {
    width: 30%;

    img {
        width: 100%;
    }
}

.middle {
    @include flex(column, start, space-between, 22px);

    &-header {
        @include footerSpan(28px, 28px);
        color: $main-black;
        font-weight: 700;
        max-width: 350px;
    }

    &-rating {
        @include flex(row, start, center, 13px);
    }




}

.middle-review {
    &-number {
        @include footerSpan(20px, 20px);
        color: $main-black;
        font-weight: 600;
    }

    &-text {
        color: $blue-color;
    }

    :deep(.p-icon) {
        @extend %rating-icon;
    }
}

.middle-volume {
    &-buttons {
        button:first-child {
            @include items-button(8px 20px 8px 20px, white, $main-blue, none, 16px);
            margin-right: 10px
        }

        button:last-child {
            @include items-button(8px 20px 8px 20px, $main-black, white, 1px solid $slider-border-color , 16px)
        }
    }
}

.middle-koler {
    &-btn {
        @include items-button(8px 20px 8px 20px, white, $main-blue, none, 16px);
    }
}

.middle-parameters {
    @include flex(row, start, center);

    button {
        @include items-button(8px 20px 8px 20px, $main-black, $main-white, 1px solid $main-white , 16px);
        @include flex(row, start, center)
    }
}

.sizes {
    border: none;



    .btns {
        @include flex(row, start, center, 15px);
    }

    button {
        margin: 0;
        background: white;
        border: 1px solid $slider-border-color;
        @include textFormat(16px, 20x, 500, $main-black);
        width: 50%;

    }

}
</style>