<template>
    <li class="margin-top-40 ">
        <div class="header">
            <span class="header-icon">{{ item?.fullName.slice(0, 1) }}</span>
            <div class="header-info">
                <span class="header-info-name">{{ item?.fullName }}</span>
                <div class="flex flex-row justify-content-between">
                    <div class='flex flex-row gap-4'>
                        <Rating :cancel="false" v-model="rating" />
                        <button v-if="type === 'profile'" class="look-all-btn"
                            @click="navigateTo(`/product/${item?.productId}`)"> {{ $t('goToCommnent') }}
                            <img src='../../assets/icons/icon=components-more.svg' />
                        </button>
                    </div>
                    <div class="header-info-icons flex flex-row gap-2" v-if="type === 'profile'">
                        <img src="../../assets/icons/icon=trash.svg" alt="trash" @click="isModal = !isModal">
                        <img src="../../assets/icons/tdesign_edit.svg" alt="edit" @click="isEditModal = !isEditModal">
                    </div>
                </div>
            </div>
        </div>

        <p class="info">
            {{ item?.ratingText }}
        </p>
        
    </li>

    <Dialog v-model:visible="isModal" modal header=" ">
        <template #header>
            <div class="p-modal-header">
            </div>
        </template>
        <template #closeicon>
            <span class="close-icon-modal">X</span>
        </template>
        <div class="modal-header">{{ $t('deleteCommentWarning') }}?</div>

        <div class="modal-btns">
            <button @click="isModal = false">{{ $t('cancel') }}</button>
            <button @click="confirmDelete">{{ $t('delete') }}</button>
        </div>
    </Dialog>

    <Dialog v-model:visible="isEditModal" modal header=" " :style="{ width: '400px' }">
        <ReviewsEditForm :item="item" />
    </Dialog>


</template>

<script setup lang="ts">
import { Review } from '~/types/Review';

const rating = ref(4);

const isModal = ref(false);
const isEditModal = ref(false);


const props = defineProps<{
    item: Review,
    type?: string
}>()


rating.value = props?.item?.rating

const confirmDelete = async () => {
    try {
        const response = await http.delete(`/api/v1/ProductReview/delete-review-by-id/${props?.item?.id}`);
        console.log('response delete', response);
        if (response.status === 200) {



            useNotif('success', 'Комментарий удален', 'Успешно')
            isModal.value = false
        }
    } catch (err) {
        console.log(err)
    }
}

</script>

<style scoped lang="scss">
.header {
    margin-bottom: 20px;
    @include flex(row, start, center, 23px);

    &-icon {
        display: block;
        background: #56CCF2;
        border-radius: 100%;
        padding: 12px 14px;
        @include textFormat(24px, 24px, 700, #fff)
    }

    &-info {
        width: 100%;

        &-name {
            margin-bottom: 10px;
            display: block;
        }
    }



}


.rating-color {
    color: #f2c94c;
}

:deep(.p-icon) {
    @extend %rating-icon;
    width: 24px !important;
    height: 24px !important;
}

:deep(.p-button.p-button-outlined:not(:disabled):active) {
    border: none
}

:deep(button.p-dialog-header-icon.p-dialog-header-close.p-link) {
    background: red !important;
    color: blue !important;
}

:deep(.p-dialog.p-component.p-ripple-disabled) {
    padding: 20px !important;
}

.close-icon-modal {
    background: none;
    border: none;
    outline: none;
    color: none !important;

    &:hover {
        background: none !important;
        border: none !important;
        color: none !important;
        border-radius: none !important;
    }
}

img:hover {
    cursor: pointer;
}
</style>