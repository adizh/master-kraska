<template>
    <section>
        <div class="header-help">
            <h1> {{ authStore.getSelectedLang === 'ru' ? category?.nameRu : category?.nameKg }}</h1>
            <div class="header-help-icons">
                <input type="text" :placeholder="$t('searchPaint')" class="main-header-input" v-model="productName"
                    @input="handleSearch">
                <div>
                    <img src="../../assets/icons/ep_menu.svg" alt="ep menu" @click="visibleMethod = 'vertical'">
                    <img src="../../assets/icons/f7_menu.svg" alt="menu" @click="visibleMethod = 'horizontal'">
                </div>
            </div>
        </div>
        <div class="grid align-items-start">
            <CatalogFilters class="col-3" />
            <CatalogResults class="col-9" :visibleMethod="visibleMethod" />
        </div>
    </section>
</template>

<script setup lang="ts">
type visibleMethod = 'vertical' | 'horizontal'
const visibleMethod = ref<visibleMethod>('vertical');

const route = useRoute();
const id = route.params.id;
const authStore = useAuthStore();
const { data: category } = useApi(`/api/v1/Category/get-category/${id}`, {

}) as any;




const productStore = useProductsSstore()

const productName = defineModel('');
const handleSearch = (event: any) => {
    productStore.filterProducts(event.target.value)
    console.log(event)

}
onMounted(() => {
    productStore.setCategoryId(id as string);
    productStore.filterProducts()
})


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
}
</style>