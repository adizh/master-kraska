<template>
  <div class="register-auth">
    <p class="register-auth-header">{{ $t("typeDataLogin") }}</p>
    <div class="register-auth-options">
      <input
        type="text"
        class="basic-input"
        :placeholder="$t('email')"
        v-model.trim="inputs.email.value"
        @input="handleValues('email', 'email')"
      />
      <span class="err-input-msg" v-if="inputs.email.error">{{
        inputs.email.error
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
  email: { value: "", error: "" },
  password: { value: "", error: "" },
});

const handleValues = (fieldName: keyof LoginInputs, validationType: string) => {
  const value = inputs.value[fieldName].value;
  inputs.value[fieldName].error = "";
  if (validationType === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      inputs.value[fieldName].error = t("incorrectEmail");
    }
  } else if (validationType === "password") {
    inputs.value[fieldName].error =
      value?.length < 1 ? t("passwordRequire") : "";
  }
};

const submitLogin = async () => {
  const validationTypes: Record<keyof LoginInputs, string> = {
    email: "email",
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
  if (!hasError) {
    try {
      const response = await http.post(`/api/v1/User/login`, null, {
        params: {
          email: inputs.value.email.value,
          password: inputs.value.password.value,
        },
      });
      if (response.status === 200) {
        emit("closeLoginModal");
        console.log("login the user", response.data);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);
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
        inputs.value.email.error = t("userNotFound") || t("error");
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
</style>
