<template>
    <ClientOnly>
        <div class="item-page-header">
            <div class="left">
                <img :src="getProduct?.product?.images[0]" alt="product">
            </div>
            <div class="middle">
                <div class="middle-header">
                    {{ getProduct?.product?.name }}
                </div>
                <div>
                    <p class="each-block-info-col flex flex-column align-items-start gap-2"><span>
                            {{ $t('storeMark') }}
                        </span>

                        <img :src="productBrand?.logo" alt="brand" class="brand-logo">
                    </p>
                </div>
                <div class="middle-review"><span class="each-block-info-col">{{ $t('rating') }}</span>
                    <div class='middle-rating'>
                        <span class="middle-review-number">{{ getProduct?.product?.rating?.toFixed(2) }}</span>
                        <Rating v-model="ratingValue" :cancel="false" :value="ratingValue" disabled />

                        <a class="middle-review-text" href="#product-reviews">{{ $t('reviews') }}</a>
                    </div>

                </div>
                <div class="middle-volume">
                    <span class="each-block-info-col">{{ $t('volume') }}</span>

                    <div class="middle-volume-buttons" v-if="getProduct?.product?.variants">
                        <button v-for="(btn, index) in getProduct?.product?.variants" :key="btn?.id"
                            :class="{ 'active-btn': volumeBtn === btn?.size }"
                            @click='selectVolumeSize(btn?.size, index)'>
                            {{ btn?.size }}
                        </button>

                    </div>
                </div>


                <div class="middle-koler">
                    <span class="each-block-info-col">{{ $t('baseTinting') }}</span>
                    <button class="middle-koler-btn">А (белая, {{ $t('lightTinting') }})</button>
                </div>
                <div>
                    <span class="each-block-info-col">
                        {{ $t('consumption') }}
                    </span>
                    <p>1л=7-12КВ.М. 9л=63.00-108.00КВ.М.</p>
                </div>
                <div>
                    <span class="each-block-info-col">{{ $t('parameters') }}

                    </span>
                    <div class="middle-parameters">

                        <button @click="toggle"><span>{{ $t('count') }}</span>
                            <img src='../../assets/icons/ion_calculator-outline.svg' />
                        </button>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="header">
                    <span>{{ $t('Цены') }}</span>
                    <UIBookmarks :product="getProduct?.product" />

                </div>

                <div class="numbers">
                    <p><span>{{ $t('piece') }}</span>
                        <span class="numbers-price">{{ selectedProductPrice }} сом</span>
                    </p>
                    <p><span>л</span>500 сом</p>
                    <p><span>м2</span>50 сом</p>
                </div>

                <div class="count">
                    <span class="each-block-info-col">{{ $t('quantity') }}</span>
                    <button class="prod-count-buttons">
                        <span @click="decreaseCount">-</span>
                        <span>{{ countToBuy }}</span>
                        <span @click="increaseCount">+</span>
                    </button>
                </div>

                <div class="count">
                    <span class="each-block-info-col">{{ $t('sum') }}</span>
                    {{
                    selectedProductPrice * countToBuy }} сом
                </div>

                <div class="buy-btns"> <button @click="addToCart">
                        {{ isProductExistsInCart ? $t('addToCart') : $t('addedToCart') }}
                    </button>
                    <button @click.capture="buyNow">{{ $t('buyNow') }}</button>
                </div>

            </div>
        </div>
    </ClientOnly>




    <OverlayPanel ref="countOverlay" class="countOverlay">
        <div class="count-overlay">
            <span class="header">{{ $t('count') }}</span>
            <p class='count-overlay-info'>{{ $t('productCountInfo') }}</p>
            <button>{{ $t('toCart') }}</button>
        </div>
    </OverlayPanel>



    <Dialog v-model:visible="isProfileOpen" modal :style="{ width: '450px', padding: '10px 40px 40px 40px' }">
        <AuthModal @closeModal="isProfileOpen = false" />
    </Dialog>
    <Dialog v-model:visible="isConfirmOpen" modal :style="{ width: '550px', padding: '20px 40px 50px 20px' }"
        header=" ">
        <ConfirmPay @cancel="isConfirmOpen = false" @confirm="confirmCreatePay" />

    </Dialog>
</template>

<script setup lang="ts">
import Rating from 'primevue/rating';
import { Product } from '@/types/Product'
import { Brands } from '~/types/Brands';

const isConfirmOpen = ref(false)

const props = defineProps<{
    productId: string
}>()
const ratingValue = ref(0);
const countOverlay = ref();
const volumeBtn = ref('');
const countToBuy = ref(1);
const totalPrice = ref(0)
const authStore = useAuthStore();
const productStore = useProductsSstore()
const store = useCartStore()
const productBrand = ref({} as Brands)
const selectedProductPrice = ref(0)
const length = ref(0)
const width = ref(0)
const isProductBookmarked = ref(false)
const isProfileOpen = ref(false)
const { getProduct } = storeToRefs(productStore)
const sumHeight = computed(() => length.value * width.value);

const toggle = (event: any) => {
    countOverlay.value.toggle(event);
}


ratingValue.value = getProduct.value?.product?.rating


const selectVolumeSize = (value: string, index: number) => {
    calcLeastAmoint()
    volumeBtn.value = value;
    if (getProduct.value?.product?.variants) {
        selectedProductPrice.value = getProduct.value?.product?.variants[index].price
    }
}
const decreaseCount = () => {
    if (countToBuy.value > 1) {
        countToBuy.value--;
        totalPrice.value = countToBuy.value * selectedProductPrice.value
    }
}

const toggleBoomark = (id: string) => {
    isProductBookmarked.value = !isProductBookmarked.value;
    productStore.addToBookmarks(id)
}

const increaseCount = () => {
    countToBuy.value++;
    totalPrice.value = countToBuy.value * selectedProductPrice.value
}


const confirmCreatePay = async () => {
    const orderBody = {
        price: selectedProductPrice.value * countToBuy.value,
        quantity: countToBuy.value,
        productId: getProduct?.value?.product?.id,
        productName: getProduct?.value?.product?.name,
        customerId: authStore?.getUserId ? authStore.getUserId : ""
    }


    try {
        const response = await http.post(
            "/api/v1/Order/create-order",

            [orderBody]
        );
        if (response.data.code === 200) {
            return navigateTo(`/place-order/${response.data?.message?.id}`)
        }

        console.log('response confirmCreatePay', response)
    } catch (err) {
        console.log(err)
    }

}
const buyNow = () => {
    if (authStore.getUserId) {
        console.log('buy now');
        isConfirmOpen.value = true;
    } else {

        isProfileOpen.value = true
    }
}
const addToCart = () => {
    if (authStore.getUserId) {
        const prodItem = { ...getProduct.value?.product, count: countToBuy.value, totalProdSum: totalPrice.value, initPrice: selectedProductPrice.value }
        store.addToCart(prodItem)
    }

    else {


        isProfileOpen.value = true
    }

}




const { data: getBookmarkItem } = useApi('/api/v1/Bookmark/get-bookmarks', {
    method: 'get',
    query: {
        userId: authStore.getUserId,
        objectId: getProduct.value?.product?.id
    }
}) as any;


const isProductExistsInCart = computed(() => {
    const index = store.getAllCart?.findIndex((item) => item?.id === getProduct.value?.product?.id);
    return index !== -1 ? false : true
})

const leastSmallAmount = ref(0)
const calcLeastAmoint = async () => {
    const variants = await getProduct.value?.product.variants;
    if (!variants || variants?.length === 0 && variants == null) {
        return -1;
    } else {
        let smallestPrice = variants[0]?.price;
        let smallestPriceIndex = 0;
        for (let i = 1; i < variants?.length; i++) {
            const variantPrice = variants[i]?.price;
            if (variantPrice < smallestPrice) {
                smallestPrice = variantPrice;
                smallestPriceIndex = i;
            }
        }
        leastSmallAmount.value = smallestPriceIndex || 0
    }
}
onUnmounted(() => {
    leastSmallAmount.value = 0;
});



onMounted(async () => {
    productStore.fetchProductById(props?.productId)
    productStore.getBookmarks(getProduct.value?.product?.id);
    isProductBookmarked.value = productStore.getProductBookmarked;
    calcLeastAmoint()
    if (getProduct && getProduct?.value?.product?.brandId) {
        productBrand.value = await getBrandId(getProduct?.value?.product?.brandId);
    }

    if (getProduct.value?.product?.variants && leastSmallAmount?.value) {
        selectedProductPrice.value = getProduct.value?.product?.variants[leastSmallAmount.value]?.price;
        volumeBtn.value = getProduct.value?.product?.variants[leastSmallAmount.value]?.size;
    } else {
        selectedProductPrice.value = getProduct.value?.product?.price
    }

    totalPrice.value = countToBuy.value * selectedProductPrice.value
})

</script>

<style scoped lang="scss">
@import '../../assets/tabs.scss';


.count-overlay-info {
    max-width: 256px;
    width: 100%;
    @include textFormat(16px, 24px, 400, #000);
    margin-top: 40px
}

.brand-logo {
    width: 120px;
}

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
    width: 35%;
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
    width: 35%;

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
        max-width: 80%
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

        button.active-btn {
            @include items-button(8px 20px 8px 20px, white, $main-blue, none, 16px);
            margin-right: 10px
        }

        button {
            @include items-button(8px 20px 8px 20px, $main-black, white, 1px solid $slider-border-color , 16px);
            margin-right: 10px;
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

@media (max-width:1000px) {
    .item-page-header {
        flex-wrap: wrap;
        justify-content: start;
        gap: 60px
    }

    .right {
        width: 100%;

        .header,
        .numbers,
        .count {

            width: 50%;
        }
    }

    .middle {

        width: 60%;

        &-header {
            max-width: 100%;
        }
    }

    .buy-btns {
        width: 50%;
        flex-direction: row;
    }


}

@media (max-width:768px) {
    .middle {
        width: 50%;

        &-header {
            font-size: 24px;
            line-height: 24px;
        }
    }

    .left {
        width: 35%;
    }

    .right {

        .header,
        .numbers,
        .count,
        .buy-btns {

            width: 70%;
        }
    }
}

@media (max-width:480px) {
    .item-page-header {
        flex-direction: column;
    }

    .middle-header {
        font-size: 20px;
        line-height: 20px;
    }

    .left,
    .middle,
    .right {
        width: 100% !important;

        .header,
        .numbers,
        .count,
        .buy-btns {

            width: 100%;
        }

        .buy-btns {
            flex-direction: column;
        }
    }

    .tabs-select {
        div:last-child {
            display: none
        }
    }

    div:first-child::after {
        display: none;
    }
}
</style>