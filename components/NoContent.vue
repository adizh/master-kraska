<template>
    <section>
        <div class="no-content ">
            <span>
                <slot name="icon"></slot>
            </span>
            <h1 class="main-header-h1">{{ title }}</h1>

        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    title?: string;
    iconSource?: string

}>()
</script>

<style scoped lang="scss">
.no-content {
    height: 60vh;
    @include flex(column, center, center, 40px);

    span {
        background: $main-white;
        padding: 24px;
        border-radius: 100%
    }
}
</style>