<template>
    <div class="cart-main-info-prod" @click.stop="router.push(`/product/${item?.id}`)">
        <div class="cart-main-info-prod-items">
            <div class="cart-main-info-prod-img">
                <img src="../../assets/images/test-kraska.png" alt="">
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
</style>