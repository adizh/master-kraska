<template>
    <div class="item-block" @click="router.push(`/product/${product?.id}`)" @mouseover="itemHover" @mouseleave="itemHoverLeave">
        <div v-if="type === 'bookmark'" class="bookmark-icon-heart "
            @click.stop="emit('addItemToBookmarks', product?.id as string)">
            <img src="../../assets/icons/icon=heart fill.svg" alt="heart icon">
        </div>
        <slot name="edit-items"></slot>

        
            <img src="../../assets/icons/icon=heart.svg" alt="heart" v-if="!isProductBookmarked" @click.stop="toggleBoomark" class="bookmark-item"/>
            <img src="../../assets/icons/icon=heart fill.svg" alt="heart icon" v-else @click.stop="toggleBoomark" class="bookmark-item">
     
        <img :src="product?.images[0]" alt="product" class="prod-img">

        <span class="item-block-name">{{product?.name }}</span>

   <div class="product-infomation">
    <span>{{ $t('consumption') }}: {{ product?.consumption }}</span>
    <span>{{ $t('dryingTime') }}: {{ product?.dryingTime }}</span>
    <span>{{ $t('volume') }}: {{ product?.size }}</span>
   </div>

        <button class="pink-button prod-price" @click.stop="addCart">{{ !isItemHovered ? product?.price +'сом': isItemHovered && isProductExistsInCart ? $t('toCart') : $t('addedToCart')  }}</button>
        <div class="item-add-btns">
            <button @click.stop="removeCount">-</button>
            <span>{{ countToBuy }}</span>
                <button @click.stop="increaseCount">+</button>
           </div>

    </div>
</template>

<script setup lang="ts">
import { ExtendedProduct, Product } from '@/types/Product'
const props = defineProps<{
    type?: string,
    product: Product,

}>()
const {t}=useI18n()
const cartStore=useCartStore()
const productsStore=useProductsSstore()
const prodBrand = ref('')
const countToBuy=ref(1)
const isProductExistsInCart = computed(() => {
    const index = cartStore.getAllCart?.findIndex((item) => item?.id === props?.product?.id);
    return index !== -1 ? false : true
})
const isItemHovered=ref(false)

const itemHover=()=>{

    console.log('itemHover')
    isItemHovered.value=true
}
const itemHoverLeave=()=>{
    isItemHovered.value=false
}

const totalPrice=ref()
if(props?.product?.price){
    totalPrice.value=countToBuy.value * props?.product?.price
}

const removeCount =()=>{
    if(countToBuy.value>1){
        countToBuy.value=countToBuy.value-1
        if(props?.product?.price){
            totalPrice.value=countToBuy.value * props?.product?.price
        }

        if(isProductExistsInCart.value){
        
      
    }else{
        if(props.product?.price){
            const updatedItem = { ...props?.product, count: countToBuy.value, totalProdSum: totalPrice.value, initPrice: +props?.product?.price }
    if(updatedItem){
        cartStore.updateCartItem(updatedItem)
        useNotif('success',t('successEdited'),t('success'))
    }
        }
    }

        
    }

    
}
const toggleBoomark = () => {
    isProductBookmarked.value = !isProductBookmarked.value;
    productsStore.addToBookmarks(props?.product?.id)
}
const increaseCount =()=>{
    countToBuy.value=countToBuy.value+1;
        if(props?.product?.price){
            totalPrice.value=countToBuy.value * props?.product?.price
        }
    if(isProductExistsInCart.value){
      
    }else{
        if(props.product?.price){
            const updatedItem = { ...props?.product, count: countToBuy.value, totalProdSum: totalPrice.value, initPrice: +props?.product?.price }
    if(updatedItem){
        cartStore.updateCartItem(updatedItem)
        useNotif('success',t('successEdited'),t('success'))
    }
        }
    }
   
}
const addCart=()=>{
    
if(props.product?.price && isItemHovered.value){
    const prodItem = { ...props?.product, count: countToBuy.value, totalProdSum: totalPrice.value, initPrice: props?.product?.price }
   if(props?.product){
cartStore.addToCart(prodItem)
   }
}
}



const router = useRouter()
const emit = defineEmits<{
    addItemToBookmarks: [string]

}>()

const isProductBookmarked=ref(false)

const prodCart=computed(()=>{
    return cartStore?.getAllCart?.find((item:ExtendedProduct)=>item?.id===props?.product?.id)
})


if(prodCart.value && prodCart.value!==null){
    countToBuy.value=prodCart?.value?.count
}
onMounted(async () => {
    prodBrand.value = await getBrandId(props?.product?.brandId as string)
    await productsStore.getBookmarks(props?.product?.id);

    isProductBookmarked.value=productsStore?.getProductBookmarked
});

</script>

<style scoped lang="scss">
@keyframes slideFromBottomToTop {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }


  @keyframes slideFromTopToBottom {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
.item-add{
   opacity: 0;
   visibility: hidden;
    display: none;
    transition: .5s;
  }

  .bookmark-item{
    width: 20px;
    height:20px;
    position: absolute;
    right:10px;
    top:10px;
    opacity: 0;
    visibility: hidden;
  }



.item-block {
    transition: .5s ease all;
    border-radius: 10px;
    @include flex(column,start, start);
    position:relative;

    &:hover{
        .bookmark-item{
            opacity: 1;
            visibility: visible;
        }
        .item-add{
            @include flex(column,center,center);
            opacity: 1;
            visibility: visible;
        }
        .item-add-btns{
            opacity: 1;
            visibility: visible;
    }
    }

}
.item-add-btns{
    opacity: 0;
    visibility: hidden;
@include flex(row,center,center,20px);
width: 100%;
color:$main-black;
button{
    background: none;
    outline: none;
    border:none;
    font-size: 20px;
    line-height: 32px;

    
}
}
.item-block {
    width: 28%;
    padding: 20px 32px;
    overflow: hidden;
    height: 480px;
  

    .prod-img {
        width: 120px;
        height: 120px;
    }

    &-name {
        font-size: 16px;
        font-weight: 600;
        color: $main-black;
        -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale;
        width: 100%;
        display: block;
        word-wrap:break-word;
        max-height: 60px;
        height: 100%;
        line-height: 20px;
        margin-bottom: 10px;

    }

    &-info {
        max-width: $product-item-width;
        width: $product-item-width;
        -webkit-font-smoothing: antialiased; 
        -moz-osx-font-smoothing: grayscale;
    }

    &-buy {
        width: $product-item-width; 
         -webkit-font-smoothing: antialiased; 
        -moz-osx-font-smoothing: grayscale;
       
        
    }
}


.each-block-info-col {
    @include flex(row, space-between, center);
}

.item-block:hover {
    cursor: pointer;
    box-shadow: 0px 6px 18px 0px #0000001F;
    transition: .3s ease all;
}
</style>