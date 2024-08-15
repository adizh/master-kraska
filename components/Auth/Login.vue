<template>
  <div class="register-auth">
    <p class="register-auth-header">{{ $t("typeDataLogin") }}</p>
    <div class="register-auth-options">
      <InputMask
        id="basic"
        v-model="inputs.phone.value"
        mask="+999 999 99 99 99"
        placeholder="+996 777 66 55 44"
        @update:modelValue="handleValues('phone', 'number')"
      />

      <span class="err-input-msg" v-if="inputs.phone.error">{{
        inputs.phone.error
      }}</span>

      <div class="password-block-input">
        <input
          :type="isPasswordOpen ? 'text' : 'password'"
          class="basic-input col-12"
          :placeholder="$t('password')"
          v-model.trim="inputs.password.value"
          @input="handleValues('password', 'password')"
        />
        <span class="err-input-msg" v-if="inputs.password.error">{{
          inputs.password.error
        }}</span>
        <img
          src="../../assets/icons/black/ri-eye-open.svg"
          alt="open"
          v-if="isPasswordOpen"
          @click="togglePassword(false)"
          class="password-icon"
        />
        <img
          src="../../assets/icons/black/ri_eye-off-line.svg"
          alt="close"
          v-else
          @click="togglePassword(true)"
          class="password-icon"
        />
      </div>
      <span class="sm-blue-text" @click="isPasswordReset = true"
        >{{ $t("forgotPassword") }}?</span
      >

      <button @click="submitLogin" class="register-auth-btn">
        {{ $t("login") }}
      </button>
    </div>
  </div>

  <Dialog v-model:visible="isPasswordReset" modal :style="{ width: '600px' }">
    <AuthResetPassword />
  </Dialog>
</template>

<script setup lang="ts">
import { LoginInputs } from "@/types/Items";
import http from "@/composables/http";
const router = useRouter();
const isPasswordOpen = ref(false);
const isPasswordReset = ref(false);
const { t } = useI18n();
const togglePassword = (value: boolean) => {
  isPasswordOpen.value = value;
};
const emit = defineEmits<{
  closeLoginModal: [];
}>();
const inputs = ref<LoginInputs>({
  phone: { value: "", error: "" },
  password: { value: "", error: "" },
});

const handleValues = (fieldName: keyof LoginInputs, validationType: string) => {
  const value = inputs.value[fieldName].value;
  inputs.value[fieldName].error = "";
  if (validationType === "number") {
    if (value === "") {
      inputs.value[fieldName].error = t("requiredField");
    } else if (!value.startsWith("+996")) {
      inputs.value[fieldName].error = t("incorrectPhone");
    }
  } else if (validationType === "password") {
    inputs.value[fieldName].error =
      value?.length < 1 ? t("passwordRequire") : "";
  }
};

const submitLogin = async () => {
  const validationTypes: Record<keyof LoginInputs, string> = {
    phone: "number",
    password: "password",
  };
  for (const fieldName in inputs.value) {
    if (Object.prototype.hasOwnProperty.call(inputs.value, fieldName)) {
      const validationType = validationTypes[fieldName as keyof LoginInputs];
      handleValues(fieldName as keyof LoginInputs, validationType);
    }
  }

  const hasError = Object.values(inputs.value).some(
    (input) => input.error !== "",
  );
  const formattedNumber = inputs.value.phone?.value
    ?.replace(/\s+/g, "")
    .replace("+", "");

  console.log("formattedNumber", formattedNumber);

  if (!hasError) {
    try {
      const response = await http.post(`/api/v1/User/login`, null, {
        params: {
          phoneNumber: formattedNumber,
          password: inputs.value.password.value,
        },
      });
      if (response.status === 200) {
        emit("closeLoginModal");
        console.log("response login", response);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data?.accessToken);
        localStorage.setItem("refresh_Token", response.data?.refreshToken);
        localStorage.setItem("role", response.data.role);
        if (response.data.role === "Admin" || response.data.role === "SuperAdmin") {
          router.push("/admin");
        }
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      console.log("response submit login", response);
    } catch (err: any) {
      if (
        err?.response?.data?.code === 401 &&
        err?.response?.data?.message === "Invalid password"
      ) {
        inputs.value.password.error = t("incorrectPassword") || t("error");
      }
      if (err?.response?.data?.code === 404) {
        inputs.value.phone.error = t("userNotFound") || t("error");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
%active-btn {
  background: $light-blue;
  color: #33587d0f;
  border-color: #33587d0f;
}

.register-auth {
  &-header {
    margin-bottom: 30px;
  }

  margin-top: 30px;

  &-options {
    @include flex(column, center, initial);
  }
}

.sm-blue-text {
  @include textFormat(14px, 20px, 500, $blue-color);
  margin: 10px 0 30px 0;
  text-align: right;

  &:hover {
    cursor: pointer;
  }
}

:deep(input#basic.p-inputtext) {
  padding: 16px 13px;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 10px;
  margin-bottom: 5px !important;
}
</style>
