<template>
    <section>
        <h1 class="margin-bottom-40 ">Подбор по параметрам</h1>

        <div class="params-first blocks">

            <div class="params-header">
                <span>1</span>
                <p>Для каких работ вам необходима краска</p>
            </div>

            <div class='flex flex-row gap-4'>
                <button v-for="item in work?.subdirectory" :key="item?.id" class="gray-buttons-border"
                    :class="{ 'selected-btn': typeOfWork === item.id }" @click="selectTypeOfWork(item?.id)">
                    {{ item?.name }}

                    <img src="../assets/icons/carbon_checkmark-filled (1).svg" alt="carbon"
                        v-if="typeOfWork === item.id">



                </button>
            </div>

        </div>


        <div class="params-second blocks">

            <div class="params-header">
                <span>2</span>
                <p>Что вы будете окрашивать</p>
            </div>

            <div class="params-inputs-checkbox">
                <span class="params-subinfo">Материал для рабочей поверхности</span>


                <div>
                    <!-- <label class="custom-checkbox" v-for="(item, index) in material.subdirectory" :key="item?.id">
                        <input type="checkbox" :id="`${item.id}-${index}`" :value="item?.id"
                            :checked="isChecked(sub.id)" @change="updateCheckboxState(sub.id, $event)" />

                        <p><span>{{ item?.name }}</span></p>
                    </label> -->
                </div>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { AllCatalog, CatalogItem, SubCatalog } from '~/types/Catalog';
const typeOfWork = ref('')
const typeOfMaterial = ref<AllCatalog[]>([]);
const typeOfLkm = ref<AllCatalog[]>([]);
const typeOfPrice = ref<AllCatalog[]>([]);
const { data: work } = useApi(`/api/v1/Helpers/get-catalog/d12f4dfb-6f54-4a37-9cd3-1d6d5423e084`) as any;
const { data: material } = useApi(`/api/v1/Helpers/get-catalog/5ff5e6eb-884b-4e64-ae7b-d99bede77b9b`) as any;

console.log('material', material)
const selectTypeOfWork = (id: string) => {
    typeOfWork.value = id;
}

const checkboxStates=ref<any>({})

// const isChecked = (itemId: string, subId: string) => {
//     return checkboxStates?.value[itemId]?.values?.find((val: SubCatalog) => val.id === subId)?.value || false;
// };

// const updateCheckboxState = ( subId: string, event: any) => {
//     const checked = event.target.checked;

//     const subIndex = checkboxStates?.value[itemId]?.values?.findIndex((val: AllCatalog) => val.id === subId);
//     if (checkboxStates.value[itemId]?.values) {
//         checkboxStates.value[itemId].values[subIndex].value = checked;
//     }



//     console.log('updateCheckboxState checked', checked)
//     console.log('updateCheckboxState checkboxStates', checkboxStates)
// };


</script>

<style scoped lang="scss">
.blocks {
    margin-bottom: 90px;
}

.params {
    &-header {
        @include flex(row, start, baseline, 20px);

        span {
            @include textFormat(54px, 73px, 600, $main-pink)
        }

        p {
            @include textFormat(28px, 28px, 700, $main-black);
            margin-bottom: 41px;
        }
    }
}

.gray-buttons-border {
    @include flex(row, center, center, 7px)
}

.selected-btn {
    border: 2px solid $main-black;
}

.params-subinfo {
    @include textFormat(20px, 20px, 600, $main-black)
}
</style>