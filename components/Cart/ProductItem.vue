<template>
    <div class="cart-main-info-prod">
        <div class="cart-main-info-prod-items">
            <div class="cart-main-info-prod-img">
                <img :src="item?.images[0]" alt="product" v-if="item?.images?.length">
                <img :src="item?.image" alt="product" v-else-if="item?.image">
            </div>
            <div class="cart-main-info-middle">
                <h3 v-if="item?.name">{{ item?.name }}</h3>
                <h3 v-else-if="item?.productName">{{ item?.productName }}</h3>

                <span class="item-block-description" v-if="item?.shortDescription"> {{ productInfoHorizontal }}</span>
                <span class="item-block-description" v-if="item?.productDescription"> {{ productDescrHorizontal }}</span>

                

            </div>
        </div>

        <div class="cart-main-info-count">
           <slot name="count-buttons"></slot>
            <span class="price" v-if="orderPlace!=='orderPlace'">{{ item?.totalProdSum }} сом</span>

            <button class="prod-count-buttons" v-if="orderPlace!=='orderPlace'">
                <span @click="$emit('decreaseCount',item)">-</span>
                <span>{{ store.getTotalItemCount(item?.count) }}</span>
                <span @click="$emit('increaseCount',item)">+</span>
            </button>
            <img src="../../assets/icons/icon=trash.svg" alt="delete" class='delete-icon'
                @click="confirmDelete" v-if="orderPlace!=='orderPlace'">

        </div>
    </div>

</template>

<script setup lang="ts">
import { ExtendedProduct } from '~/types/Product';
const router = useRouter()
const store=useCartStore()
const selectedProd=ref({} as ExtendedProduct)
const props = defineProps<{
    item: ExtendedProduct,
    orderPlace?:string
}>()
const emit = defineEmits<{
  removeFromCart: [value: ExtendedProduct]
  increaseCount: [value: ExtendedProduct]
  decreaseCount: [value: ExtendedProduct] 
  confirmDelete: [value:ExtendedProduct] 
}>()



const productInfoHorizontal = computed(() => {
    return props?.item?.shortDescription && props?.item?.shortDescription?.split(' ').length > 19 ? props?.item?.shortDescription.split(' ').slice(0, 19).join(' ') + '...' : props?.item?.shortDescription

})


const productDescrHorizontal= computed(() => {
    return props?.item?.productDescription && props?.item?.productDescription?.split(' ').length > 19 ? props?.item?.productDescription.split(' ').slice(0, 19).join(' ') + '...' : props?.item?.productDescription

})
const confirmDelete=()=>{
   // selectedProd.value=props?.item;
    if(props?.item){
        emit('confirmDelete',props?.item)
    }

}


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

        width: 80%;
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