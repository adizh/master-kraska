<template>
  <form class="cart-form margin-top-20">
    <div class="cart-form-block">
      <h3>
        {{ $t("FIO") }}
      </h3>

      <div class="flex flex-row gap-5 cart-inputs">
        <div class="flex flex-column gap-2">
          <input
            type="text"
            class="basic-input lg:w-14rem w-12 md:w-14rem"
            :placeholder="$t('FirstName')"
            required
            v-model="deliveryForm.name.value"
            @input="handleDeliveryForm('name', 'string')"
          />
          <span v-if="deliveryForm.name.error" class="err-input-msg">{{
            $t(deliveryForm.name.error)
          }}</span>
        </div>

        <div class="flex flex-column gap-2">
          <input
            type="text"
            class="basic-input lg:w-14rem w-12 md:w-14rem"
            :placeholder="$t('LastName')"
            required
            v-model="deliveryForm.lastName.value"
            @input="handleDeliveryForm('lastName', 'string')"
          />

          <span v-if="deliveryForm.lastName.error" class="err-input-msg">{{
            $t(deliveryForm.lastName.error)
          }}</span>
        </div>
      </div>
    </div>

    <div class="cart-form-block">
      <h3>
        {{ $t("address") }}
      </h3>
      <div class="flex flex-column gap-2">
        <input
          type="text"
          class="basic-input lg:w-30rem w-12 md:w-30rem"
          :placeholder="$t('addressPlaceholder')"
          v-model="deliveryForm.address.value"
          required
          @input='handleAddress'
        />
        <span v-if="deliveryForm.address.error" class="err-input-msg">{{
          $t(deliveryForm.address.error)
        }}</span>
      </div>

      <Transition name="slide-fade">
        <ul class="ui-options lg:w-30rem w-12 md:w-30rem" v-if="isDropdownOpen">
          <li
            v-for="item in suggestedAddress"
            :key="item?.value"
            @click="selectAddress(item)"

          >
            {{ item?.title?.text }},
          
            <span>{{ item?.subtitle?.text }}</span>
          </li>
        </ul>
      </Transition>
 <!-- <div v-if="suggestedAddress?.length">  {{ suggestedAddress?.map((item:any)=>item?.title?.text) }}</div> -->
    </div>

    <div class="cart-form-block">
      <h3>
        {{ $t("city") }}
      </h3>

      <div class="flex flex-column gap-2">
        <input
          type="text"
          class="basic-input lg:w-30rem w-12 md:w-30rem"
          required
          v-model="deliveryForm.city.value"
          @input="handleDeliveryForm('city', 'string')"
        />
        <span v-if="deliveryForm.city.error" class="err-input-msg">{{
          $t(deliveryForm.city.error)
        }}</span>
      </div>
    </div>

    <div class="cart-form-block">
      <h3>
        {{ $t("phone") }}
      </h3>
      <div class="flex flex-column gap-2">
        <InputMask
          id="basic"
          mask="+999 999 99 99 99"
          placeholder="+996 700 55 55 55"
          v-model="deliveryForm.phone.value"
          required
          @update:modelValue="handleDeliveryForm('phone', 'string')"
        />
        <span v-if="deliveryForm.phone.error" class="err-input-msg">{{
          $t(deliveryForm.phone.error)
        }}</span>
      </div>
    </div>

    <div class="cart-form-block">
      <h3>
        {{ $t("email") }}
      </h3>

      <div class="flex flex-column gap-2">
        <input
          type="email"
          class="basic-input lg:w-30rem w-12 md:w-30rem"
          required
          v-model="deliveryForm.email.value"
          @input="handleDeliveryForm('email', 'email')"
        />
        <span v-if="deliveryForm.email.error" class="err-input-msg">{{
          $t(deliveryForm.email.error)
        }}</span>
      </div>
    </div>

    <div class="delivery-comments">
      <h3>{{ $t("comments") }}</h3>
      <input
        type="text"
        class="basic-input mt-4"
        :placeholder="$t('comments')"
        v-model="deliveryForm.comment.value"
      />
    </div>
  </form>

  <Dialog
    v-model:visible="isPayOpen"
    modal
    :style="{ width: '450px', padding: '30px 25px' }"
  >
    <PaymentMbank
      v-if="selectedPayMethod === 'MBank'"
      @closeModal="isPayOpen = false"
    />
    <PaymentMegaPay v-else-if="selectedPayMethod === 'MegaPay'" />
    <PaymentElcart v-else-if="selectedPayMethod === 'Элкарт'" />
  </Dialog>
</template>

<script setup lang="ts">
import axios from 'axios'
const isPayOpen = ref(false);
const isDropdownOpen = ref(false);
const orderStore = useOrderStore();
const authStore = useAuthStore();
const { deliveryForm } = storeToRefs(orderStore);

const handleDeliveryForm = (
  field: keyof typeof orderStore.delForm,
  type: string,
) => {
  orderStore.handleValues(field, type);
};
const config = useRuntimeConfig();
console.log('config',config)
const suggestedAddress=ref([] as any)
const fetchRes=async(value:string)=>{
  const response =await axios(`https://suggest-maps.yandex.ru/v1/suggest?apikey=${config?.public?.YANDEX_API}&text=${value}`);
  if(response.status===200){
    suggestedAddress.value=response.data.results
  }

}
const selectedPayMethod = ref("");

const handleAddress =async(event:any)=>{
  const value = event.target?.value;
  await fetchRes(value);
  if(value?.length){
    isDropdownOpen.value=true
    orderStore.delForm.address.error=''
  }else{
    isDropdownOpen.value=false;
    orderStore.delForm.address.error='requiredField'
  }


}

const selectAddress =(item:any)=>{
  const address =item?.title?.text + ', ' +item?.subtitle?.text
orderStore?.setOrderAddress(address);
isDropdownOpen.value=false;
orderStore?.setOrderCity(item?.subtitle?.text)
orderStore.delForm.city.error=''
}
const choosePayMethod = (value: string) => {
  isPayOpen.value = true;
  selectedPayMethod.value = value;
};

onMounted(() => {
  if (authStore.getUser) {
    orderStore.setInitUser(authStore.getUser);
  }
});
</script>

<style scoped lang="scss">
.cart-form {
  &-block {
    @extend %border-bottoms;
    padding-bottom: 20px;
    margin-bottom: 20px;

    h3 {
      margin-bottom: 20px;
    }
  }
}

:deep(input#basic.p-inputtext) {
  padding: 16px 20px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  margin-bottom: 5px !important;
  width: 68%;
}

.ui-options {
  border: 1px solid $slider-border-color;
  border-radius: 8px;
  padding: 6px;
  @include textFormat(16px, 20px, 400, #000);

  li {
    padding: 16px;
    border-radius: 10px;
    transition: 0.3s ease all;

    &:hover {
      background: $main-white;
      cursor: pointer;
      transition: 0.3s ease all;
    }
  }
}

.open-options {
  visibility: visible;
  opacity: 1;
  animation: slideFromTop 0.5s forwards;
}



.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-5%);
  opacity: 0;
}


@media (max-width: 480px) {
  .cart-form {
    flex-direction: column !important;
  }

  :deep(input#basic.p-inputtext) {
    width: 100%;
  }
}
</style>
