<template>
    <div class="prod-item-reviews">
        <h5 class='each-section-header'>Отзывы</h5>
        <span class="no-review" v-if="!itemReviews">Отзывов еще нет</span>

        <ul v-else>
            <ReviewsItem v-for="item in itemReviews" :key="item.id" :item="item" type="product" />
        </ul>

        <div class="prod-item-reviews-create">
            <span>Оцените товар</span>
            <Rating v-model="inputs.ratingValue.value" :cancel="false" />
            <span class="err-input-msg">{{ inputs.ratingValue.error }}</span>
            <input type="text" class="basic-input" placeholder="Название" v-model="inputs.title.value"
                @input="handleInput('title', 'string')" />
            <span class="err-input-msg">{{ inputs.title.error }}</span>
            <input type="text" class="basic-input" placeholder="Текст" v-model="inputs.text.value"
                @input="handleInput('text', 'string')" />
            <span class="err-input-msg">{{ inputs.text.error }}</span>
            <button @click="createReview">Оставить отзыв</button>
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
const itemReviews = ref<Review[]>([])

const inputs = ref({
    title: { value: '', error: '' },
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
            title: 'string',
            text: 'string',
            ratingValue: 'rating'
        };
        for (const fieldName in inputs.value) {
            if (Object.prototype.hasOwnProperty.call(inputs.value, fieldName)) {
                const validationType = validationTypes[fieldName];
                handleValues(inputs.value, fieldName, validationType);
                console.log('inputs.value', inputs.value, fieldName, validationType)
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
                    "title": inputs.value.title.value
                }
                const response = await http.post('/api/v1/ProductReview/create-review', body);
                if (response.status === 200) {
                    inputs.value.text.value = ''
                    inputs.value.title.value = ''
                    inputs.value.ratingValue.value = 0;

                    useNotif('success', 'Отзыв оставлен!','Успешно')
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
        const response = await http(`/api/v1/ProductReview/get-review-by-userId/${authStore.getUserId}`);
        console.log('response fetchReviewsByProd', response);
        if (response.status === 200) {
            itemReviews.value = response.data
        }
    } catch (err) {
        console.log(err)
    }
}
onMounted(() => {
    fetchReviewsByProd()
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

        input {
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
</style>