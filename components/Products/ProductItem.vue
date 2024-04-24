<template>
    <div class="item-block" @click="router.push(`/product/${product?.id}`)">
        <div v-if="type === 'bookmark'" class="bookmark-icon-heart "
            @click.stop="emit('addItemToBookmarks', product?.id as string)">
            <img src="../../assets/icons/icon=heart fill.svg" alt="heart icon">
        </div>
        <slot name="edit-items"></slot>
        <img :src="product?.images[0]" alt="product">



        <span class="item-block-name">{{ productName }}</span>
        <span class="item-block-description">{{ productInfo }} </span>


        <button class="pink-button">{{ product?.price }} сом</button>

    </div>
</template>

<script setup lang="ts">
import { Product } from '@/types/Product'
const props = defineProps<{
    type?: string,
    product?: Product,

}>()
const prodBrand = ref('')



const router = useRouter()
const emit = defineEmits<{
    addItemToBookmarks: [string]

}>()

console.log('props?.product?.name ', props?.product)
const productName = computed(() => {
    return props?.product?.name && props?.product?.name?.split(' ').length > 9 ? props?.product?.name.split(' ').slice(0, 9).join(' ') + '...' : props?.product?.name
})
const productInfo = computed(() => {
    return props?.product?.shortDescription && props?.product?.shortDescription?.split(' ').length > 13 ? props?.product?.shortDescription.split(' ').slice(0, 13).join(' ') + '...' : props?.product?.shortDescription
})

onMounted(async () => {
    prodBrand.value = await getBrandId(props?.product?.brandId as string)
})
</script>

<style scoped lang="scss">
.item-block {
    transition: .3s ease all;
    border-radius: 10px;
    @include flex(column, space-between, center);

}

.item-block {
    width: 28%;
    padding: 20px 32px;
    overflow: hidden;
    max-height: 510px;
    height: 510px;


    img {
        width: 180px;
        height: 180px;
    }

    &-name {

        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: $main-black;
        width: 100%;
        display: block;
        text-align: left;
        margin-bottom: 15px;

        max-height: 60px;
        height: 100%;



        line-height: 20px;

    }

    &-info {
        max-width: $product-item-width;
        width: $product-item-width;

    }

    &-buy {

        width: $product-item-width
    }
}

.each-block-info-col {
    @include flex(row, space-between, center);
}

.item-block:hover {
    cursor: pointer;
    box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.12);
    transition: .3s ease all;
}
</style>