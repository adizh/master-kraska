<template>
    <section>
        <div class="header-help">
            <h1> {{ category?.name }}</h1>

            <div class="header-help-icons">
                <input type="text" placeholder="Поиск краски" class="basic-input">
                <div>
                    <img src="../../assets/icons/ep_menu.svg" alt="ep menu" @click="visibleMethod = 'vertical'">
                    <img src="../../assets/icons/f7_menu.svg" alt="menu" @click="visibleMethod = 'horizontal'">
                </div>
            </div>
        </div>
        <div class="grid">
            <CatalogFilters class="col-3" />
            <CatalogResults class="col-8" :visibleMethod="visibleMethod" />
        </div>
    </section>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

const { data: category } = useApi(`/api/v1/Category/get-category/${id}`) as any;

type visibleMethod = 'vertical' | 'horizontal'

const visibleMethod = ref<visibleMethod>('vertical')

</script>

<style scoped lang='scss'>
.header-help {
    margin-bottom: 40px;
    @include flex(row, space-between, baseline, 20px);

    &-icons {
        @include flex(row, space-between, center);
        width: 35%;



        img:first-child {
            margin-right: 10px;
        }
    }

    .basic-input {
        padding: 8px;
        width: 77%;
    }

}
</style>