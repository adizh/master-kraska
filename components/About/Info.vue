<template>
    <div class="info">
        <h1 class="main-header-h1">Компания</h1>
        <h5 class='each-section-header'>О нас</h5>
        <p class="info-text">ОсОО «Мастер Краска» — мультибрендовая сеть специализированных магазинов с колор-студиями
            по продаже лакокрасочных материалов, декоративных покрытий, сопутствующих товаров и услуг по подбору цвета и
            тонированию в сегменте розничной и оптовой торговли.

            <br />
            В 2002 году образовался бренд «Мастер Краска». Долгая и кропотливая работа команды единомышленников,
            доверительные отношения с клиентами и производителями, стабильность, мастерство и желание каждый день
            совершенствоваться— вот что является залогом успеха компании. Компания «Мастер Краска» являясь официальный
            представитель таких мировых брендов лакокрасочной продукции, как Tikk..
            <button class="read-all-btn">
                Еще</button>
        </p>

        <h4>ДОБРО ПОЖАЛОВАТЬ В «МАСТЕР КРАСКУ»!</h4>
        <div class="info-certif">
            <div class="info-certif-header">
                <h5 class='each-section-header'>Сертификаты</h5>
                <button class="look-all-btn" @click="navigateTo('/certificates')">
                    <span>Смотреть все</span>
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
                <h5 class='each-section-header'>Продавцы</h5>
                <button class="look-all-btn" @click="navigateTo('/sellers')">
                    <span>Смотреть все</span>
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