<template>
    <div class="contacts margin-top-80">
        <h5 class='each-section-header'>{{ $t('contacts') }}</h5>
        <h5 class='each-section-header margin-top-40'>ФЛАГМАНСКИЙ МАГАЗИН</h5>

        <div class="contacts-header ">
            <div class="contacts-header-block">
                <div><img src="@/assets/icons/black/icon=components-location.svg" alt="location" /></div>
                <div><span>{{ $t('address') }}</span>
                    <p>пр.Чынгыза Айтматова, 93/1 лит А, г.Бишкек</p>
                </div>
            </div>

            <div class="contacts-header-block">
                <div>
                    <img src="@/assets/icons/black/icon=components-phone.svg" alt="phone">
                </div>
                <div><span>{{ $t('phoneNumber') }}</span>
                    <p>+996 550 910 148</p>
                </div>
            </div>
            <div class="contacts-header-block">

                <div>
                    <img src="@/assets/icons/black/icon=components-time.svg" alt="time">
                </div>
                <div>
                    <span>{{ $t('workingHours') }}</span>
                    <p>Пон - Суб с 9:00 до 18:00</p>
                </div>
            </div>
        </div>

        <div class="maps-address margin-top-80">
            <div class="section-header-links">
                <h5 class='each-section-header'>{{ $t('allOurMarkets') }}</h5>
                <slot name="look-all-btn"></slot>
            </div>

            <div class="maps-address-list" v-if="type === 'about-us'">
                <AddressItem v-for="item in orderStore?.getShops?.slice(0, 2)" :key="item.name" :name="item?.name"
                    :phone="item?.phoneNumber" :email="item.email" :openHours="item?.openHours"
                    :address="item?.address" />
            </div>
        </div>


        <div class="margin-top-40 margin-bottom-40" id="map">
            <LMap ref="map" :zoom="12" :center="[42.860131, 74.608273]" :geoJSON="geoJson" :style="{ zIndex: '1' }">
                <LTileLayer url=" https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                    layer-type="base" name="OpenStreetMap" />
                <LMarker v-for="item in computedShops" :key="item?.id" :lat-lng="[+item?.latitude, +item?.longitude]">

                    <LIcon ref="icon">
                        <img class="restaurant-icon" src='/static/location-mark-map.png' />
                    </LIcon>
                    <LTooltip :options="{ permanent: false, interactive: true }">{{ item?.name }}</LTooltip>
                </LMarker>
            </LMap>
        </div>


        <div class="maps-address-list" v-if="type === 'contacts'">
            <AddressItem v-for="item in orderStore?.getShops" :key="item.name" :name="item?.name"
                :phone="item?.phoneNumber" :email="item?.email" :address="item?.address" :openHours="item?.openHours" />
        </div>
    </div>

</template>

<script setup lang="ts">

import { AddressList } from '@/types/Items'
const orderStore = useOrderStore()
const props = defineProps<{
    addressList: AddressList[];
    type: string
}>()

const geoJson = ref({})
const computedShops = computed(() => {
    return props?.type === 'contacts' ? orderStore?.getShops : orderStore?.getShops?.slice(0, 2)
})

onMounted(async () => {
    await orderStore?.fetchAllShops();
    

})
</script>

<style scoped lang="scss">
.contacts-header {
    @extend %border-bottoms;
    padding-bottom: 54px;
    margin-top: 58px;
    @include flex(row, space-between, center);

    &-block {
        width: 30%;
        @include flex(row, start, start);

        div {
            &:first-child {
                background: $main-white;
                border-radius: 100%;
                padding: 17px;
            }

        }

        span {
            @include footerSpan(20px, 16px);
            color: $main-black !important;
            margin-bottom: 20px;
            display: block;
        }

        p {
            @include footerSpan(24px, 24px);
            color: $main-black !important;
            font-weight: 700;

        }
    }
}

.marker {
    position: relative;
    width: 20px;
    height: 20px;
    background: #ff0000;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    text-align: center;
    color: red;
    font-weight: bold;
    line-height: 20px;
}

#map {
    width: 100%;
    height: 300px;
}

.restaurant-icon {
    height: 30px;
    width: auto;
}

@media (max-width:992px) {
    .contacts-header {
        flex-direction: column;
        align-items: start;

        &-block {
            width: 100%;
        }
    }
}

@media (max-width:480px) {
    .each-section-header {
        font-size: 24px;
        line-height: 32px;
    }

    .contacts-header-block p {
        font-size: 16px;
        line-height: 24px;
    }

    .maps-address .each-section-header {

        font-size: 20px
    }
}
</style>