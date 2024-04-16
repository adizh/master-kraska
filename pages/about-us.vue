<template>
    <section>
        <AboutInfo />
        <div class="main-header-h1">{{ $t('allOurMarkets') }}</div>
        <AboutContacts :address-list="addressList.slice(0, 2)" type="about-us">
            <template #look-all-btn>
                <button class="look-all-btn" @click="navigateTo('/contacts')">
                    <span>{{ $t('lookAll') }}</span>
                    <img src='../assets/icons/icon=components-more.svg' />
                </button>
            </template>
        </AboutContacts>
        <AboutNews />
    </section>
</template>

<script setup lang="ts">
import { addressList } from '@/assets/js/addressList'
</script>

<style scoped>
.main-header-h1 {
    margin-top: 80px;
}
</style>