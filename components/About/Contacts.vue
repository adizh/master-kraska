<template>
    <div class="contacts margin-top-80">
        <h5 class='each-section-header'>Контакты</h5>
        <h5 class='each-section-header margin-top-40'>ФЛАГМАНСКИЙ МАГАЗИН</h5>

        <div class="contacts-header ">
            <div class="contacts-header-block">
                <div><img src="@/assets/icons/black/icon=components-location.svg" alt="location" /></div>
                <div><span>Адрес</span>
                    <p>пр.Чынгыза Айтматова, 93/1 лит А, г.Бишкек</p>
                </div>
            </div>

            <div class="contacts-header-block">
                <div>
                    <img src="@/assets/icons/black/icon=components-phone.svg" alt="phone">
                </div>
                <div><span>Номер телефона</span>
                    <p>+996 550 910 148</p>
                </div>
            </div>
            <div class="contacts-header-block">

                <div>
                    <img src="@/assets/icons/black/icon=components-time.svg" alt="time">
                </div>
                <div>
                    <span>Рабочие часы </span>
                    <p>Пон - Суб с 9:00 до 18:00</p>
                </div>
            </div>
        </div>

        <div class="maps-address margin-top-80">
            <div class="section-header-links">
                <h5 class='each-section-header'>Все наши магазины</h5>
               <slot name="look-all-btn"></slot>
            </div>

            <div class="maps-address-list" v-if="type === 'about-us'">
                <AddressItem v-for="item in addressList" :key="item.name" :name="item.name" :phone="item.phone"
                    :email="item.email" :location="item.location" :time="item.time" />
            </div>
        </div>

        <ClientOnly>
            <div class="margin-top-40 margin-bottom-40">
                <YandexMap :settings="{
                    location: {
                        center: [74.585016, 42.835826],
                        zoom: 16,
                    },
                }" width="100%" height="500px">
                    <yandex-map-default-scheme-layer />
                    <yandex-map-default-features-layer />
                    <template v-for="(coordinate, index) in markers" :key="index">
                        <yandex-map-marker :settings="coordinate">
                            <div class="marker" />
                        </yandex-map-marker>
                    </template>

                </YandexMap>
            </div>

        </ClientOnly>


        <div class="maps-address-list" v-if="type === 'contacts'">
            <AddressItem v-for="item in addressList" :key="item.name" :name="item.name" :phone="item.phone"
                :email="item.email" :location="item.location" :time="item.time" />
        </div>
    </div>

</template>

<script setup lang="ts">

import { AddressList } from '@/types/Items'
defineProps<{
    addressList: AddressList[];
    type: string
}>()

import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapMarker, YandexMapDefaultFeaturesLayer } from 'vue-yandex-maps';
const markers: any = [
    {
        coordinates: [74.585016, 42.835826],

    },
    {
        coordinates: [54.76778893634, 57.108481458691],

    },
]


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
</style>