<template>
    <div class="profile-section-header">
        <TabView v-if="selectedReg === 0">
            <TabPanel header="Регистрация">
                <AuthEmailRegister @closeModal="emit('closeModal')" />
            </TabPanel>
            <TabPanel header="Войти">
                <AuthLogin @closeLoginModal="emit('closeModal')" />
            </TabPanel>
        </TabView>

        <div v-else-if='selectedReg === 1'>

            <AuthEmailRegister @closeModal="emit('closeModal')" />
        </div>
    </div>
</template>

<script setup lang="ts">
const selectedReg = ref(0);
const selectRegister = (tab: number) => {
    selectedReg.value = tab;
}
const emit = defineEmits(['closeModal'])
</script>

<style scoped>
.profile-section-header {
    margin-top: 20px;
}
</style>