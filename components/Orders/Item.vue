<template>
    <div >
        <div class="item" v-for="order in userOrders" :key="order?.id">
            <span class="item-date">11/12/24</span>
            <div class="item-info grid">
                <div class="col-6">
                    <span>{{ $t('productCap') }}</span>
                    <p>{{ formatName(order?.productName) }}</p>

                </div>
                <div class="col-2">
                    <span>{{ $t('quantity') }}</span>
                    <p>{{ order?.quantity }}</p>
                </div>
                <div class="col-2">
                    <span>{{ $t('sum') }}</span>
                    <p>{{ order?.price * order?.quantity }} сом</p>
                </div>
                <div class="col-2 more-info" @click="() => toggleCatalog(order?.id)">
                    {{ $t('moreInfo') }}
                    <img class="arrow" :class="{ 'rotated': isCatalogOpen === order?.id }"
                        src="../../assets/icons/icon=components-arrow-blue.svg" alt="open-arrow">
                </div>
            </div>


            <div class="expanded-section" v-show="isCatalogOpen"
                :class="{ 'slide-enter': isCatalogOpen === order?.id, 'slide-leave-to': isCatalogOpen !== order?.id }">
                <div class="item-info grid">
                    <div class="col-6 flex flex-row gap-1 align-items-center">
                        <img src="../../assets/images/test-kraska.png" alt="">
                        <div class="expanded-section-info"><span>{{ order?.productName }}</span>
                            <span>{{ $t('diluent') }}: вода</span>
                            <span>{{ $t('noSmell') }}: да</span>

                        </div>
                    </div>
                    <div class="col-2">
                        <p>{{ order?.quantity }} {{ $t('piece') }}</p>
                    </div>
                    <div class="col-2">
                        <p>{{ order?.price * order?.quantity }} сом</p>
                    </div>
                    <div class="col-2">
                        <button class="bg-white-btn">
                            {{ $t('orderAgain') }}
                        </button>
                    </div>
                </div>
            </div>


        </div>
    </div>


    <!-- <NoContent v-else :title="$t('noHistoryOrder')">
        <template #icon>
            <img src="../../assets/icons/black/icon=components -time-notfill.svg" alt="">
        </template>
    </NoContent> -->

    <Dialog v-model:visible="isConfirmOpen" modal :style="{ width: '550px', padding: '20px 40px 50px 20px' }"
        header=" ">
        <h5 class="modal-header">{{ $t('confirmOrderText') }}?</h5>

        <div class='flex flex-row justify-content-end gap-2'>
            <button class='modal-btns'>{{ $t('confirm') }}</button>
            <button @click="isConfirmOpen = false" class='modal-btns blue'>{{ $t('cancel') }}</button>
        </div>
    </Dialog>
</template>

<script setup lang="ts">

import { OrderItem, UserOrder } from '~/types/Order';

const isConfirmOpen = ref(false)
const isCatalogOpen = ref('');
const userOrders = ref<UserOrder[]>([])
const authStore = useAuthStore()

const toggleCatalog = (id: string) => {
    if (isCatalogOpen.value === id) {
        isCatalogOpen.value = ''
    } else {
        isCatalogOpen.value = id
    }

}


console.log('userOrders', userOrders)

const getOrderByUser = async () => {
    try {
        const response = await http(`/api/v1/Order/get-orders-by-user-id/${authStore.getUserId}`);

        if (response.status === 200) {
            const filtered = response.data.filter((item: OrderItem) => item?.isPaid);
            userOrders.value = filtered.map((item: OrderItem) => item?.items).flat()
        }

    } catch (err) {
        console.log(err)
    }
}

onMounted(() => {
    authStore.fetchUser()
    getOrderByUser()
})

</script>

<style scoped lang="scss">
.more-info {
    @include textFormat(16px, 20px, 500, #33587D);
    @include flex(row, center, center, 2px);
    transition: transform 0.5s ease;
}

.item {
    margin-bottom: 40px;

    &-date {
        margin-bottom: 15px;
        display: block;
        @include textFormat(20px, 20px, 600, #222);
    }

    p {
        @include textFormat(20px, 20px, 500, #000);
        margin-top: 4px;
    }

    &-info {
        background: $main-white;
        padding: 20px;

        span {
            @extend %sm-span;
            font-size: 20px;
            line-height: 32px;
            margin: 0 !important;
        }
    }
}

.more-info:hover {
    cursor: pointer;
}

@keyframes slideFromUpToBottoms {
    0% {
        opacity: 0;
        transform: translateY(-10%);

    }

    100% {
        opacity: 1;
        transform: translateY(0);

    }
}


@keyframes slideFromBottomToUp {

    0% {
        opacity: 1;
        transform: translateY(0);

    }

    100% {
        opacity: 0;

        transform: translateY(-10%);

    }


}

.expanded-section.slide-enter {
    animation: slideFromUpToBottoms 0.6s ease forwards;

    display: block;
}

.expanded-section.slide-leave-to {
    animation: slideFromBottomToUp .3s ease forwards !important;
    display: none !important;

}



.expanded-section {
    opacity: 0;
    transition: opacity 0.5s ease;
    display: none;
    transition: .5s ease all;
    border-top: 1px solid $slider-border-color;
    padding-top: 7px;

    .prod-img {
        width: 25%;
    }

    span:first-child {
        @include textFormat(28px, 28px, 500, $main-black);
    }

    span:nth-child(2),
    span:last-child {
        margin-top: 10px !important;
        display: block;
        @include textFormat(16px, 24px, 400, $footer-bottom-color);
    }

    button {
        box-shadow: 0px 0px 0px 0.5px #0000000D;

    }


}
</style>
