<template>
    <div class='cart-form margin-top-20'>

        <div class="cart-form-block">
            <h3>
                Имя и Фамилию
            </h3>

            <div class="flex flex-row gap-5">
                <input type="text" class="form-input w-14rem" placeholder="Имя">
                <input type="text" class="form-input w-14rem" placeholder="Фамилия">
            </div>
        </div>

        <div class="cart-form-block">
            <h3>
                Адрес
            </h3>

            <div class="flex flex-column gap-2">
                <input type="text" class="form-input w-30rem" placeholder="Номер дома и название улицы">
                <input type="text" class="form-input w-30rem" placeholder="Квартира, апартаменты, жилое помещение">
            </div>
        </div>

        <div class="cart-form-block">
            <h3>
                Город
            </h3>

            <div class="flex flex-column gap-2">
                <input type="text" class="form-input w-30rem">
            </div>
        </div>

        <div class="cart-form-block">
            <h3>
                Телефон
            </h3>

            <div class="flex flex-column gap-2">
                <input type="text" class="form-input w-30rem">
            </div>
        </div>

        <div class="cart-form-block">
            <h3>
                Email
            </h3>

            <div class="flex flex-column gap-2">
                <input type="text" class="form-input w-30rem">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.cart-form {
    &-block {
        @extend %border-bottoms;
        padding-bottom: 20px;
        margin-bottom: 20px;

        h3 {
            margin-bottom: 20px;
        }
    }
}
</style>