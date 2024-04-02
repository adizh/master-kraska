<template>
    <div class="notif">
        <div class="notif-header">Настройки уведомления</div>
        <span class="notif-subheader">
            Контролируйте, как вы получаете обновления и оповещения от нашего сайта
        </span>
        <ul class="notif-list">
            <li><span>Статус заказов</span>

                <InputSwitch v-model="checked" />
            </li>

            <li>
                <span>Акции</span>
                <InputSwitch v-model="checked" />
            </li>
            <li>
                <span>Новости</span>
                <InputSwitch v-model="checked" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const checked = ref(false)
</script>

<style scoped lang="scss">
:deep(.p-inputswitch.p-highlight .p-inputswitch-slider) {
    background: $blue-color;
}

.notif {
    &-header {
        @include textFormat(28px, 28px, 500, #000);
        margin-bottom: 18px;
    }

    &-subheader {
        @include textFormat(16px, 28px, 400, #000);


    }
}

ul {
    margin-top: 18px;
    border: 1px solid $slider-border-color;
    border-radius: 10px;
    padding: 16px 20px;

    li {
        padding-bottom: 14px;
        @include flex(row, space-between, center);

        &:not(:last-child) {
            @extend %border-bottoms;
            margin-bottom: 25px;
        }
    }

}
</style>