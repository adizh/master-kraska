<template>
    <section class="footer-section">
        <div class="top">
            <div class="first">
              
                <NuxtImg src="/white-logo.png" />
      
                <img src="../assets/images/white-logo.png" alt="">
                <button class="callback-btn">Обратный звонок</button>
            </div>
            <div class="second">
                <span><a href="">Новости</a></span>
                <span><a href="">Наши магазины</a></span>
                <span><a href="">Контакты</a></span>
                <span><a href="">Колеровка</a></span>
            </div>
            <div class="third">
                <span><a href="">Подбор по параметрам</a></span>
                <span><a href="">Бренды</a></span>
                <span><a href="">Сертификаты</a></span>
                <span><a href="">О нас</a></span>
            </div>
            <div class="fourth">
                <span><a href="">Выездной консультант</a></span>
                <span><a href="">Карта постоянного покупателя</a></span>
                <span><a href="">Оплата и доставка</a></span>
                <span><a href="">Эксперты</a></span>
            </div>
        </div>
        <div class="middle">

            <span>
                <img src="../assets/icons/icon=location.svg" alt="location">
                пр.Чынгыз Айтматова, 93/1 лит А</span>

            <span>
                <img src="../assets/icons/icon=phone.svg" alt="phone">
                +996 550 910 148</span>

            <span>
                <img src="../assets/icons/icon=mail.svg" alt="email">
                sales-mk@masterkraska.kg</span>

            <span>
                <img src="../assets/icons/icon=time.svg" alt="time">
                c 9:00 до 18:00 Понедельник-суббота
            </span>
        </div>
        <div class="bottom">

            <span>Мастер Краска 2012г</span>
            <span>Политика конфиденциальности</span>
        </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.footer-section {
    background: $advan-bg;
    width: 100%;
    padding: 3.3rem 30px 30px 3.1rem;
}

.callback-btn {
    @extend %button-shared;
    background: white;
    box-shadow: 0px 0px 0px 0.5px #0000000D 0px 0.5px 2.5px 0px #0000004D;
    color: $main-black;
    font-weight: 600;
    font-size: 17px;
    display: block;
    margin-top: 30px
}

.top {
    @include flex(row, space-between, center);

    img {
        width: 100%
    }
}


.second,
.third,
.fourth {
    @include flex(column, space-between, start, 20px)
}

span a {

    @include footerSpan(24px, 16px)
}

.middle {
    @include flex(row, space-between, start);
    margin: 6.4rem 0 20px 0;
    padding-bottom: 30px;
    border-bottom: 1px solid $footer-border-color
}

.middle span {
    @include footerSpan(20px, 13px);
    @include flex(row, space-between, center)
}

.bottom {
    margin-top: 15px;
    @include footerSpan(20px, 13px);
    color: $footer-bottom-color;
    @include flex(row, start, center, 15px)
}
</style>