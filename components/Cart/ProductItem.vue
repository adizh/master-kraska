<template>
    <div class="cart-main-info-prod" @click.stop="router.push(`/product/${item?.id}`)">
        <div class="cart-main-info-prod-items">
            <div class="cart-main-info-prod-img">
                <img :src="item?.images[0]" alt="product">
            </div>
            <div class="cart-main-info-middle">
                <h3>{{ item?.name }}</h3>
                <span class="item-block-description">{{ productInfoHorizontal }}</span>

            </div>
        </div>

        <div class="cart-main-info-count">
            <slot name="count-buttons"></slot>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ExtendedProduct } from '~/types/Product';
const router = useRouter()
const props = defineProps<{
    item: ExtendedProduct
}>()
const productInfoHorizontal = computed(() => {
    return props?.item?.shortDescription && props?.item?.shortDescription?.split(' ').length > 19 ? props?.item?.shortDescription.split(' ').slice(0, 19).join(' ') + '...' : props?.item?.shortDescription

})

</script>

<style scoped>
.cart-main-info-prod:hover {
    cursor: pointer;

}

@media (max-width:1000px) {
    .cart-main-info-prod-img {
        width: 50%;
    }

    .cart-main-info-prod h3 {
        font-size: 18px;
        line-height: 20px;
    }
}



@media (max-width:768px) {
    .cart-main-info-prod-img {
        width: 90%;
    }

    .cart-main-info-prod {
        flex-direction: column;
    }

    .cart-main-info-count {
        margin-top: 20px;
        flex-direction: column;
        align-items: center
    }

}
</style>