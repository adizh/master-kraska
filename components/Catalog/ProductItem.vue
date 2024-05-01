<template>
    <div class="item-block" @click="router.push(`/product/${product?.id}`)" v-if="visibleMethod === 'vertical'">
        <div v-if="type === 'bookmark'" class="bookmark-icon-heart"
            @click.stop="emit('addItemToBookmarks', product?.id as string)">

            <img src="../../assets/icons/icon=heart fill.svg" alt="heart icon">

        </div>
        <slot name="edit-items"></slot>
        <img :src="product?.images[0]" format="webp"/>
        <span class="item-block-name">{{ productName(product?.name) }}</span>

        <span class="item-block-info">{{ productInfo }}</span>
        <button class="item-block-buy">{{ product?.price }} сом</button>
        
    </div>





    <div class="item-block horizontal" @click="router.push(`/product/${product?.id}`)" v-else>
        <div class='first-col'>
            <img :src="product?.images[0]" format="webp" />
            <div class="first-sub-col"> <span class="item-block-name">{{ productName(product?.name) }}</span>
                <span class="item-block-description">{{ productInfoHorizontal }}</span>


            </div>
        </div>

        <div class="last-col">
            <button class="item-block-buy">{{ product?.price }} сом</button>
            <UIBookmarks :product="product" />
        </div>



    </div>
</template>

<script setup lang="ts">
import { Product } from '@/types/Product'
const props = defineProps<{
    type?: string,
    product: Product,
    visibleMethod: string


}>()
const router = useRouter()
const productInfo = computed(() => {
    return props?.product?.shortDescription && props?.product?.shortDescription?.split(' ').length > 13 ? props?.product?.shortDescription.split(' ').slice(0, 13).join(' ') + '...' : props?.product?.shortDescription
})
const productInfoHorizontal = computed(() => {
    return props?.product?.shortDescription && props?.product?.shortDescription?.split(' ').length > 13 ? props?.product?.shortDescription.split(' ').slice(0, 13).join(' ') + '...' : props?.product?.shortDescription

})
const prodBrand = ref('')



const emit = defineEmits<{
    addItemToBookmarks: [string]

}>()

onMounted(async () => {
    if (props?.product) {
        prodBrand.value = await getBrandId(props?.product?.brandId)
    }
})



const productName = (name: string) => {
    return name && name?.split(' ').length > 5 ? name?.split(' ').slice(0, 5).join(' ') + '...' : name
}

</script>

<style scoped lang="scss">
.item-block {
    transition: .3s ease all;
    border-radius: 10px;
    @include flex(column, space-between, center);


}

.item-block-info {
    @include textFormat(14px, 20px, 600, $main-dark-grey);
    max-width: 95%;
    width: 100%;
    margin: 15px 0 2.6rem 0;
    height: 83px;

}


.item-block {
    width: 31%;
    padding: 20px 32px;
    overflow: hidden;


    img {
        width: 180px;
        height: 180px;
    }

    &-name {
        max-width: $product-item-width;
        text-align: center !important;
        font-size: 18px;
        font-weight: 600;
        color: $main-black;
        width: 100%;
        display: block;
        text-align: left;
        height: 60px;
        line-height: 20px;
        margin-top: 10px;


    }

    &-info {
        max-width: 100%;
        width: 100%;
        word-break: break-all !important;
    }

    &-buy {
        @extend %button-shared;
        font-weight: 600;
        font-size: 20px;
        width: $product-item-width
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

.item-block.horizontal {
    width: 100%;
    @include flex(row, space-between, start);

    .first-col {
        max-width: 65%;
        @include flex(row, space-between, start, 50px);
    }

    .first-sub-col {
        max-width: 80%;
    }

    .last-col {
        @include flex(column, start, start, 20px);
    }



    .item-block-info {
        margin-top: 16px;
    }

    .item-block-buy {
        width: 100%;
        button: 100%;
    }
}

.each-block-info-col {
    justify-content: start;
}



@media (max-width:1000px) {
    .item-block {
        width: 42%;
     
    }


}

@media (max-width:768px) {
    .item-block {
        width: 45%;
        padding: 10px;

        &-name {
            text-align: start !important;
            margin-bottom: 10px;
        }

        img {
            width: 140px;
            height: 140px
        }
    }

    .item-block-buy {
        padding: 13px 19px;
        font-size: 18px;
    }

    .item-block.horizontal .first-col {
        gap: 20px;
    }

    .item-block.horizontal {
        gap: 20px
    }

}

@media (max-width:576px) {
    .item-block {
        width: 100%;

        img {
            width: 120px;
            height: 120px
        }
    }

    .item-block.horizontal {
        flex-direction: column;
    }

    .item-block.horizontal .first-col {
        max-width: 100%;
    }

    .item-block.horizontal .last-col {
        @include flex(row, start, center);
        margin-top: 10px;

        width: 100%;

        button:first-child {
            width: 45%;
        }

        button:last-child {
            width: 50%
        }
    }
}
</style>