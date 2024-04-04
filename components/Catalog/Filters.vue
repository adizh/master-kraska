<template>
    <div class='filters'>
       
        <div class="price">
            <label for="price" class="filters-help">
                Цена
            </label>
            <div> <input type="text" placeholder="От" class="basic-input">
                <input type="text" placeholder="До" class="basic-input">
            </div>
        </div>

        <div class="filters-block">
           

            <div>


                <!-- <p v-for="item in productStore.getAllCatalogs" :key="item?.id">{{ item?.name }}</p> -->
                <!-- <label class="custom-checkbox" v-for="item in productStore.getAllCatalogs"  :key="item?.id">
                    <input type="checkbox" v-model='value'>
                    <span>{{ item?.name }}</span>
                </label> -->
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
const value = ref(false);
const catalogStore = useCatalogStore();
const route = useRoute()
const id = route.params?.id
const { data: category } = await useApi(`/api/v1/Category/get-category/${id}`) as any;

onMounted(() => {
    catalogStore.fetchAllCatalogs()
})


</script>

<style lang="scss" scoped>
.custom-checkbox {
    span {
        display: flex;
        align-items: center;
        gap: 10px;
    }


}

.custom-checkbox input[type='checkbox'] {
    display: none;
}

.custom-checkbox span::before {
    content: '';
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: 2px solid #000;
    display: block;
    width: 18px;
    height: 18px;

}




.custom-checkbox input[type='checkbox']:checked+span::before {
    display: flex;
    justify-content: center;
    align-items: center;

    content: url('../../assets/icons/check-icon-vector.svg');
    width: 18px;
    height: 18px;
    position: relative;
    left: 0px;
    background: black;
}






.filters {
    .basic-input {
        padding: 9px;
    }

    &-help {
        @include textFormat(20px, 20px, 600, #000);
        margin-bottom: 10px;
        max-width: 250px;
        width: 100%;
        display: block;
    }

    &-block {
        margin-top: 40px;
    }

}


.price {
    @include flex(column, center, start, 5px);

    input {
        width: 35%;

        &:first-child {
            margin-right: 10px
        }
    }
}
</style>