<template>
    <div class="item">
        <span class="item-date">11/12/24</span>
        <div class="item-info grid">
            <div class="col-6">
                <span>Товар</span>
                <p>Финниколор Оазис краска для потолков…</p>
            </div>
            <div class="col-2">
                <span>Кол-во</span>
                <p>24шт</p>
            </div>
            <div class="col-2">
                <span>Сумма</span>
                <p>2000сом</p>
            </div>
            <div class="col-2 more-info" @click="toggleCatalog">
                Подробнее
                <img class="arrow" :class="{ 'rotated': isCatalogOpen }"
                    src="../../assets/icons/icon=components-arrow-blue.svg" alt="open-arrow">
            </div>
        </div>


        <div class="expanded-section" v-show="isCatalogOpen"
            :class="{ 'slide-enter': isCatalogOpen, 'slide-leave-to': !isCatalogOpen }">
            <div class="item-info grid">
                <div class="col-6 flex flex-row gap-1 align-items-center">
                    <!-- <NuxtImg src="/test-kraska.png" alt="kraska" class="prod-img" /> -->

                    <img src="../../assets/images/test-kraska.png" alt="">

                    <div class="expanded-section-info"><span>Финниколор Оазис краска для потолков</span>
                        <span>Разбавитель: вода</span>
                        <span>Без запаха: да</span>

                    </div>
                </div>
                <div class="col-2">
                    <p>12шт</p>
                </div>
                <div class="col-2">
                    <p>2000сом</p>
                </div>
                <div class="col-2">
                    <button>
                        Заказать снова
                    </button>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
const isCatalogOpen = ref(false);
const toggleCatalog = () => {
    isCatalogOpen.value = !isCatalogOpen.value;
}
</script>

<style scoped lang="scss">
.more-info {
    @include textFormat(16px, 20px, 500, #33587D);
    @include flex(row, center, center, 2px);
    transition: transform 0.5s ease;
}

.item {
    margin-bottom: 40px;

    &-date {
        margin-bottom: 15px;
        display: block;
        @include textFormat(20px, 20px, 600, #222);
    }

    p {
        @include textFormat(20px, 20px, 500, #000);
        margin-top: 4px;
    }

    &-info {
        background: $main-white;
        padding: 20px;

        span {
            @extend %sm-span;
            font-size: 20px;
            line-height: 32px;
            margin: 0 !important;
        }
    }
}

.more-info:hover {
    cursor: pointer;
}

@keyframes slideFromUpToBottoms {
    0% {
        opacity: 0;
        transform: translateY(-10%);

    }

    100% {
        opacity: 1;
        transform: translateY(0);

    }
}


@keyframes slideFromBottomToUp {

    0% {
        opacity: 1;
        transform: translateY(0);

    }

    100% {
        opacity: 0;

        transform: translateY(-10%);

    }


}

.expanded-section.slide-enter {
    animation: slideFromUpToBottoms 0.6s ease forwards;
}

.expanded-section.slide-leave-to {
    animation: slideFromBottomToUp .3s ease forwards !important;
    display: block !important;
}



.expanded-section {
    opacity: 0;
    transition: .5s ease all;
    border-top: 1px solid $slider-border-color;
    padding-top: 7px;

    .prod-img {
        width: 25%;
    }

    span:first-child {
        @include textFormat(28px, 28px, 500, $main-black);
    }

    span:nth-child(2),
    span:last-child {
        margin-top: 10px !important;
        display: block;
        @include textFormat(16px, 24px, 400, $footer-bottom-color);
    }

    button {
        box-shadow: 0px 0px 0px 0.5px #0000000D;
        @extend %button-shared;
        background: white;
        @include textFormat(20px, 20px, 600, $main-blue);
        padding: 12px 18px;
    }


}
</style>
