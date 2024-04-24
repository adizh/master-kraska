<template>
    <div class="backdrop" :class="{ 'show': isCatalogOpen }"></div>
    <div class="catalog-options" :class="{ 'open': isCatalogOpen }" @mouseleave="closeCatalogOptions">
        <h5 class='each-section-header'>{{ $t('productsCatalog') }}</h5>
        <div class="options-list">
            <ul class="first-col">
                <li v-for="item in getAllCategories" :key="item?.category?.id"
                    @click.stop="selectCategory(item, $event)"
                    :class="{ 'active': activeCategory.category?.id === item?.category?.id }">
                    <span> {{ formatName(item?.category?.name) }}</span>

                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0913 11.5L9 6.44422L10.4544 5L17 11.5L10.4544 18L9 16.5558L14.0913 11.5Z"
                            fill="#DDDDDD" />
                    </svg>

                </li>
            </ul>

            <ul class="second-col" v-if="subCategories?.length > 0">
                <li v-for=" item in subCategories[0]?.subcategories" :key="item?.id">
                    <span> {{ formatName(item?.nameRu) }}</span>



                </li>
            </ul>


            <div class="second-col" v-else>
                {{ $t("noData") }}
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

import { Category } from '@/types/Category'
const authStore = useAuthStore();
const catalogStore = useCatalogStore()
const router = useRouter()
const { getAllCategories } = storeToRefs(catalogStore)
const activeCategory = ref({} as Category)
const subCategories = ref([] as Category[])
const formatName = (name: string) => {
    return name?.slice(0, 1).toUpperCase() + name?.slice(1).toLowerCase()
}

const props = defineProps<{
    isCatalogOpen: boolean;
}>();

const emit = defineEmits<{
    closeCatalog: [],
}>();

const fromtTop = ref('60px')

const selectCategory = (item: Category, event: any) => {
    const rect = event.target.getBoundingClientRect();
    console.log('rect', rect)


    fromtTop.value = (Math.floor(rect.top) - 70).toString()


    console.log('fromTop value', fromtTop)

    activeCategory.value = item;
    getSubs()
    //  console.log('subCategories', subCategories)
}

const getSubs = async () => {
    subCategories.value = await getAllCategories?.value.filter((item: Category) => {
        return item?.category?.id === activeCategory.value?.category?.id
    })
}


const closeCatalogOptions = () => {
    emit('closeCatalog');
};


onMounted(() => {
    catalogStore.fetchAllCategories();
})

console.log('getAllCategories IN A COMPONSNE', catalogStore.getAllCategories)


watch(() => authStore.getSelectedLang, () => {
    catalogStore.fetchAllCategories();
});

</script>

<style scoped lang='scss'>
.each-section-header {
    font-size: 30px;
}

.second-col {
    padding-left: 40px;

}

.first-col {
    border-right: 1px solid $slider-border-color;
    padding-right: 20px;
}

ul li {
    list-style: none;
    margin: 10px 0;
    word-break: break-all;
    @include flex(row, space-between, center)
}

.backdrop {
    position: fixed;
    top: 7rem;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    display: none;
    pointer-events: none;
}

.backdrop.show {
    display: block;
}


.active {
    cursor: pointer;
    background: #F5F5F5;
}

li {
    @include footerSpan(32px, 18px);
    color: $main-black;
    padding: 6px 10px 4px 10px;
    border-radius: 4px;

    &:hover {
        cursor: pointer;
        background: #F5F5F5;
    }
}

.catalog-options {
    @include openedOptionsHeader(100%, 20px 4rem, 4rem);

}

.catalog-options.open {
    opacity: 1;
    visibility: visible;
    transition: .3s ease all;
    height: 100vh;
    overflow-y: scroll;
    padding-bottom: 4rem;

}

.options-list {
    @include flex(row, start, start);
}
</style>