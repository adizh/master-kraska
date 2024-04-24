<template>
    <div>
        <AboutContacts class="contacts-section" :address-list="addressList" type="contacts" />
    </div>
</template>

<script setup lang="ts">
import { addressList } from '@/assets/js/addressList'
</script>

<style scoped lang='scss'>
.contacts-section {
    margin-top: 40px !important;
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