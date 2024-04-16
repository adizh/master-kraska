<template>
    <section>
        <div class="header">
            <h1>
                {{ $t('payDelivery') }}
            </h1>
            <p>
                {{ $t('payInfo') }}
            </p>
        </div>
        <div class="delivery">
            <h1>{{ $t('deliverDate') }}</h1>


            <div class="delivery-info">
                <div>
                    <span class="delivery-info-header">{{ $t('payCondition') }}:</span>
                    <ul class="list">
                        <li>{{ $t('payCon1') }}</li>
                        <li>{{ $t('payCon2') }}</li>
                        <li>{{ $t('payCon3') }}</li>
                        <li>{{ $t('patCon4') }}</li>
                        <li>{{ $t('payCon5') }}</li>
                    </ul>
                </div>
            </div>


        </div>


        <div class="delivery-from">
            <h1 class="delivery-header-h1">{{ $t('pickUpCondition') }}</h1>
            <div><span class="delivery-info-header">
                    {{ $t('pickCon1') }}
                </span>

                <ol class="list">
                    <li>{{ $t('pickCon2') }}</li>
                    <li>{{ $t('pickCon3') }}</li>
                    <li>{{ $t('pickCon4') }}</li>
                    <li>
                        {{ $t('pickCon5') }}
                    </li>
                    <p class="delivery-from-warning">
                        {{ $t('pickCon6') }}
                    </p>
                </ol>


            </div>
        </div>


        <div class="delivery">
            <h1 class="delivery-header-h1 ">{{ $t('deliverRules') }}</h1>
            <div class="delivery-info">
                <ul class="list">
                    <li>
                        {{ $t('deliverRules1') }}
                    </li>
                    <li>
                        {{ $t('deliverRules2') }}
                    </li>
                    <li>
                        {{ $t('deliverRules3') }}
                    </li>
                    <li>
                        {{ $t('deliverRules4') }}
                    </li>
                    <li>
                        {{ $t('deliverRules5') }}
                    </li>
                    <li>{{ $t('deliverRules6') }}</li>
                    <li>
                        {{ $t('deliverRules7') }}
                    </li>
                </ul>

            </div>


        </div>


        <div class="delivery">
            <h1 class="delivery-header-h1 ">{{ $t('pay') }}</h1>


            <div class="delivery-info">
                <span class="delivery-info-header">{{ $t('typeOfPay') }}</span>
                <ul class="list">
                    <li>
                        {{ $t('cash') }}
                    </li>
                    <li>
                        {{ $t('bankPay') }}
                    </li>
                    <li>
                        {{ $t('noCashOrgan') }}
                    </li>
                    <li>
                        {{ $t('plasticCardPay') }}
                    </li>
                    <li>{{ $t('phycMbank') }}</li>
                    <li>
                        {{ $t('typeOfPay1') }}
                    </li>
                    <li class="danger">
                        {{ $t('attention') }}!
                    </li>
                    <li>
                        {{ $t('dangerText1') }}
                    </li>

                    <li>
                        {{ $t('dangerText2') }}
                    </li>

                    <li>
                        {{ $t('dangetText3') }}
                    </li>
                    <li>
                        {{ $t('dangerText4') }}
                    </li>
                </ul>

            </div>


        </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
%each-li {
    list-style: disc !important;
    color: $main-dark-grey;
    @include textFormat(16px, 20px, 400, $main-dark-grey);
    margin-bottom: 12px;

}

.main-section-site {
    margin: 0 !important
}

.delivery-header-h1 {
    margin-top: 60px;
    margin-bottom: 20px;
    max-width: 680px;
}

.delivery-info-header {
    @include textFormat(20px, 20px, 600, $main-black);
    margin-bottom: 20px;
    display: block;
}


.delivery-from {
    .delivery-info-header {
        max-width: 600px;
        padding-left: 20px;
    }

    li {
        @extend %each-li
    }

    .list {
        padding-left: 40px;
    }

    &-warning {
        @include textFormat(16px, 20px, 500, $blue-color)
    }
}

.delivery {
    &-info {
        margin-top: 40px;


    }

    .danger {
        color: #EB5757;
        font-weight: 600;
    }


    li {
        @extend %each-li
    }
}

.header {
    margin-bottom: 80px;
    background-image: url('/static/delivery.png');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    background-position: center center;
    width: 100%;
    @include flex(column, center, start);
    padding-left: 50px;

    h1 {
        margin: 20.9rem 0 50px 0;
        @include textFormat(74px !important, 101px, 600, #fff !important)
    }

    p {
        max-width: 625px;
        @include textFormat(20px !important, 27px, 500, #fff !important)
    }

}


.list {
    max-width: 600px;
    padding-left: 20px;
}

@media (min-width:768px) and (max-width:992px) {
    .header h1 {
        margin-top: 4rem;
        font-size: 60px !important
    }
}
</style>
