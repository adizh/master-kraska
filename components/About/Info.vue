<template>
    <div class="info">
        <h1 class="main-header-h1">{{ $t('company') }}</h1>
        <h5 class='each-section-header'>{{ $t('aboutUs') }}</h5>
        <p class="info-text">
            {{ $t('aboutMainHeader') }}

            <br />
            {{ $t('aboutSubHeader') }}
            <button class="read-all-btn">
                {{ $t('Еще') }}</button>
        </p>

        <h4>{{ $t('welcomeHeader') }}!</h4>
        <div class="info-certif">
            <div class="info-certif-header">
                <h5 class='each-section-header'>{{ $t('certificates') }}</h5>
                <button class="look-all-btn" @click="navigateTo('/certificates')">
                    <span>{{ $t('lookAll') }}</span>
                    <img src='../../assets/icons/icon=components-more.svg' />
                </button>
            </div>
            <div class="info-certif-img">
                <img src="../../assets/images/certif/certificate1.png" />
                <img src="../../assets/images/certif/certificate2.png" />
                <img src="../../assets/images/certif/certificate3.png" />


            </div>
        </div>


        <div class="info-certif margin-top-80">
            <div class="info-certif-header">
                <h5 class='each-section-header'>{{ $t('sellers') }}</h5>
                <button class="look-all-btn" @click="navigateTo('/sellers')">
                    <span>{{ $t('lookAll') }}</span>
                    <img src='../../assets/icons/icon=components-more.svg' />

                </button>
            </div>
            <div class="info-certif-img">
                <img src="../../assets/images/seller1.png" alt="">
                <img src="../../assets/images/seller1.png" alt="">
                <img src="../../assets/images/seller1.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
h4 {
    @include footerSpan(20px, 20px);
    color: $main-pink;
    text-align: center;
    font-weight: 600;
    margin: 40px 0 120px 0;
}

.info {
    &-text {
        @extend %sm-span;
        font-size: 16px;
    }


    &-certif-header {
        @include flex(row, space-between, center)
    }
}
</style>