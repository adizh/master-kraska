<template>
  <div class="magazine">
    <h3>{{ $t("typeOfPayMethod") }}</h3>
    <div class="flex flex-row flex-wrap gap-4">
      <button
        v-for="payOption in payOptions"
        :key="payOption"
        class="gray-buttons-border"
        @click="selPayMethod(payOption)"
        :class="{ 'selected-btn': payMethod === payOption }"
      >
        {{ payOption }}
        <img
          src="../../assets/icons/carbon_checkmark-filled (1).svg"
          alt="carbon"
          v-show="payMethod === payOption"
        />
      </button>
    </div>
    <button class="pink-button" @click="emits('choosePayMethod', payMethod)">
      {{ $t("confirmPay") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { PaymentTypes } from "@/types/Items";
const payMethod = ref<string>("");
const orderStore = useOrderStore();
const { t } = useI18n();
const payOptions: string[] = [
  t("cash"),
  "MBank",
  "MegaPay",
  // 'Элкарт'
];
const emits = defineEmits<{
  choosePayMethod: [value: string];
}>();

const selPayMethod = (type: string) => {
  payMethod.value = type;
};
</script>

<style scoped lang="scss">
h3 {
  margin-bottom: 20px;
}

.err-input-msg {
  margin-top: -15px;
}
</style>
