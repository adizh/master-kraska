<template>
    <div class="prod-item-reviews" id="product-reviews">
        <h5 class='each-section-header'>{{ $t('reviews') }}</h5>
        <span class="no-review" v-if="!itemReviews">{{ $t('noReviews') }}</span>

        <ul v-else>
            <ReviewsItem v-for="item in itemReviews" :key="item.id" :item="item" type="product" />
        </ul>

        <div class="prod-item-reviews-create">
            <span>{{ $t('rateProduct') }}</span>
            <Rating v-model="inputs.ratingValue.value" :cancel="false" />
            <span class="err-input-msg">{{ inputs.ratingValue.error }}</span>

            <textarea type="text" class="basic-input" :placeholder="$t('text')" v-model="inputs.text.value"
                @input="handleInput('text', 'string')" />
            <span class="err-input-msg">{{ inputs.text.error }}</span>
            <button @click="createReview">{{ $t('leaveReview') }}</button>
        </div>
    </div>


    <Dialog v-model:visible="isProfileOpen" modal :style="{ width: '450px', padding: '10px 40px 40px 40px' }">
        <AuthModal @closeModal="isProfileOpen = false" />
    </Dialog>
</template>

<script setup lang="ts">
import { ExtendedProduct } from '~/types/Product';
import { Review } from '~/types/Review';


const authStore = useAuthStore()
const isProfileOpen = ref(false)
const props = defineProps<{
    item: ExtendedProduct
}>();

const route = useRoute()
const itemReviews = ref<Review[]>([])
const { t } = useI18n()
const inputs = ref({

    text: { value: '', error: '' },
    ratingValue: { value: 0, error: '' }
});

const { handleValues } = useInputValidation()
const handleInput = (field: string, type: string) => {
    handleValues(inputs.value, field, type);
}
const createReview = async () => {
    if (authStore.getUserId) {
        const validationTypes: any = {

            text: 'string',
            ratingValue: 'rating'
        };
        for (const fieldName in inputs.value) {
            if (Object.prototype.hasOwnProperty.call(inputs.value, fieldName)) {
                const validationType = validationTypes[fieldName];
                handleValues(inputs.value, fieldName, validationType);

            }
        }

        const hasError = Object.values(inputs.value).some(input => input.error !== '');
        if (!hasError) {
            try {
                const body = {
                    "productId": props?.item?.id,
                    "userId": authStore.getUserId,
                    "rating": inputs.value.ratingValue.value,
                    "ratingText": inputs.value.text.value,
                    "title": ''
                }
                const response = await http.post('/api/v1/ProductReview/create-review', body);
                if (response.status === 200) {
                    inputs.value.text.value = ''

                    inputs.value.ratingValue.value = 0;

                    useNotif('success', t('reviewAdded'), t('success'))
                }
                console.log('response create review', response)
            } catch (err) {
                console.log(err)
            }
        }
    }
    else {
        isProfileOpen.value = true
    }

    fetchReviewsByProd()
}


const fetchReviewsByProd = async () => {

    try {
        const response = await http(`/api/v1/ProductReview/get-reviews-by-productId/${props?.item?.id}`);
        console.log('response fetchReviewsByProd', response);
        if (response.status === 200) {
            itemReviews.value = response.data
        }
    } catch (err) {
        console.log(err)
    }
}
onMounted(async () => {
    await fetchReviewsByProd()
})

</script>

<style scoped lang='scss'>
@import '../../assets/tabs.scss';

.prod-item-reviews {
    margin-top: 80px;

    &-create {
        @include flex(column, start, start);
        margin-top: 50px;

        button {
            @extend %button-shared;
            @include footerSpan(20px, 20px);
            margin-top: 20px;
            padding: 12px 20px !important;
        }

        textarea {
            width: 50%;
        }
    }
}

h5 {
    @extend %border-bottoms;
    padding-bottom: 20px;
}

.no-review {
    @extend %sm-span;
    font-size: 16px;
    margin-bottom: 2rem;
}

:deep(.p-icon) {
    @extend %rating-icon;
    width: 26px;
    height: 30px;
}

.err-input-msg {
    margin-top: -10px;
}

@media (max-width:768px) {
    .basic-input {
        width: 70% !important;
    }
}

@media (max-width:480px) {
    .basic-input {
        width: 100% !important;
    }
}
</style>