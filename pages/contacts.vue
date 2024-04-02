<template>
    <div>
        <div class="main-header-h1">Все магазины</div>
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
</style>