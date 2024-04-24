<template>
    <div class="maps-address-list-block">
        <h3>{{ name }}</h3>
        <div class="bottom-list">
            <p>
                <img src="../../assets/icons/black/icon=components-location.svg" alt="location">
                <span>{{ location }}</span>
            </p>
            <p>
            <div class="bottom-list-phones"> <span class="phone flex flex-row align-items-center gap-1"
                    v-for="number in phone" :key="number"><img src="../../assets/icons/black/icon=components-phone.svg"
                        alt="phone">{{ number
                    }}</span></div>
            </p>
            <p>
                <img src="../../assets/icons/black/icon=components-time.svg" alt="time">
                <span>
                    {{ time }}
                </span>
            </p>
            <p>
                <img src="../../assets/icons/black/icon=components-email.svg" alt="email">
                <span> {{ email }}</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string
    location: string;
    time: string;
    email: string
    phone: string
}>()



</script>

<style scoped lang='scss'>
.bottom-list-phones {
    @include flex(column, center, center, 4px);

}

.maps-address-list {


    &-block {
        border: 1px solid $slider-border-color;
        border-radius: 10px;
        padding: 40px;
        margin-bottom: 20px;

        img {
            width: 24px;
            height: 24px
        }

    }
}

.bottom-list {
    flex-wrap: wrap;
    @include flex(row, space-between, center);
    margin-top: 20px;

    p {
        @include flex(row, space-between, center);
    }
}

@media (max-width:480px) {
    .maps-address-list-block h3 {
        font-size: 18px !important;
    }
}
</style>