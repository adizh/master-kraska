<template>
    <div class="prod-item-reviews">
        <div class="prod-item-reviews-create">
            <span>{{ $t('rateProduct') }}</span>
            <Rating v-model="inputs.ratingValue.value" :cancel="false" />
            <span class="err-input-msg">{{ inputs.ratingValue.error }}</span>

            <textarea type="text" class="basic-input" :placeholder="$t('text')" v-model="inputs.text.value"
                @input="handleInput('text', 'string')" />
            <span class="err-input-msg">{{ inputs.text.error }}</span>
            <button @click="createReview">{{ $t('saveReview') }}</button>
        </div>
    </div>

</template>

<script setup lang="ts">
import { Review } from '~/types/Review';
const authStore = useAuthStore()

const props = defineProps<{
    item: Review
}>()

const inputs = ref({
    text: { value: props?.item?.ratingText, error: '' },
    ratingValue: { value: props?.item?.rating, error: '' }
});
const {t}=useI18n()

const { handleValues } = useInputValidation();

const handleInput = (field: string, type: string) => {
    handleValues(inputs.value, field, type);
}

const createReview = async () => {
    const validationTypes: any = {
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

            }
            const response = await http.put(`/api/v1/ProductReview/update-review/${props?.item?.id}`, body);
            if (response.status === 200) {
                inputs.value.text.value = ''

                inputs.value.ratingValue.value = 0;
                useNotif('success',t('reviewAdded'), t('success'));
                
                
            }
            console.log('response update review', response)
        } catch (err) {
            console.log(err)
        }
    }
}

</script>

<style scoped lang='scss'>
.prod-item-reviews {
    margin-top: 20px;
    padding-bottom: 20px;
    @include flex(column, center, center, 20px);

    &-create {
        @include flex(column, start, start, 20px);

        button {
            @extend %button-shared;
            @include footerSpan(20px, 20px);
            padding: 12px 20px !important;
        }

        input {
            width: 100%;
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
    color: $slider-border-color !important;
    width: 26px;
    height: 30px;
}

.err-input-msg {
    margin-top: -10px;
}
</style>