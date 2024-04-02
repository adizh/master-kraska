<template>
    <section>
        <AboutInfo />
        <AboutContacts :address-list="addressList.slice(0, 2)" type="about-us">

            <template #look-all-btn>
                <button class="look-all-btn" @click="navigateTo('/contacts')">
                    <span>Смотреть все</span>
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

<style scoped></style>