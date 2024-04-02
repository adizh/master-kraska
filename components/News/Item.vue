<template>
    <div class="news-list-block">
        <div class="image"></div>
        <div class="info">
            <h2 class='each-section-header'>Блинчики</h2>
            <p>Умение готовить домашние тонкие блинчики никогда не будет лишним: они могут стать отличной
                палочкой-выручалочкой в самых различных ситуациях. Самое простое, что приходит в голову, — это
                завтрак. Готовятся блинчики довольно быстро, что очень важно утром, а любят их все. Помимо этого
                очевидного варианта, есть и другие. Блины можно начинить мясом или творогом, свернуть трубочками
                и подрумянить со всех сторон. Сытный ужин готов! А еще из домашних тонких блинчиков можно
                приготовить своеобразные роллы — с наполнителем по вашему вкусу. Дайте волю кулинарной фантазии!
            </p>
        </div>
    </div>

</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.news-list-block {
    @include flex(row, start, start, 40px);
    margin-bottom: 40px;

    .image {
        width: 380px;
        height: 380px;
        background: $slider-border-color;
        border-radius: 10px;
    }

    .info {
        width: 70%;

        h2 {
            margin: 0 0 40px 0 !important
        }

        p {
            @include footerSpan(24px, 16px);
            color: $main-black !important;
        }
    }
}
</style>