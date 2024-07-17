<template>
  <form @submit.prevent="submitRegister">
    <p class="register-auth-header margin-bottom-40 margin-top-30">
      {{ $t("email") }}
    </p>
    <div class="grid">
      <div class="col-12 flex flex-column col-password">
        <input
          type="text"
          class="basic-input col-12 password"
          :placeholder="$t('FirstName')"
          v-model="inputs.name.value"
          @input="handleValues('name', 'string')"
        />
        <span class="err-input-msg"> {{ inputs.name.error }}</span>
      </div>
      <div class="col-12 flex flex-column col-password">
        <input
          type="text"
          class="basic-input col-12 password"
          :placeholder="$t('LastName')"
          v-model="inputs.surname.value"
          @input="handleValues('surname', 'string')"
        />
        <span class="err-input-msg"> {{ inputs.surname.error }}</span>
      </div>

      <div class="col-12 flex flex-column col-password">
        <input
          type="email"
          class="basic-input col-12 password"
          :placeholder="$t('email')"
          v-model="inputs.email.value"
          @input="handleValues('email', 'email')"
        />
        <span class="err-input-msg"> {{ inputs.email.error }}</span>
      </div>

      <div class="col-12 flex flex-column col-password">
        <InputMask
          id="basic"
          v-model="inputs.phone.value"
          mask="+999 999 99 99 99"
          placeholder="+996 777 66 55 44"
          @update:modelValue="handleValues('phone', 'number')"
        />
        <span class="err-input-msg"> {{ inputs.phone.error }}</span>
      </div>

      <div class="col-12 flex flex-column col-password password-block-input">
        <input
          :type="isPasswordOpen ? 'text' : 'password'"
          v-model="inputs.password.value"
          class="basic-input col-12 password"
          :placeholder="$t('choosePassword')"
          @input="handleValues('password', 'password')"
        />
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
        <span class="err-input-msg">{{ inputs.password.error }}</span>
      </div>
      <div class="col-12 flex flex-column col-password password-block-input">
        <input
          :type="isPasswordRepeatOpen ? 'text' : 'password'"
          v-model="inputs.passwordRepeat.value"
          class="basic-input col-12 password"
          :placeholder="$t('repeatPassword')"
          @input="handleValues('passwordRepeat', 'passwordRepeat')"
        />
        <img
          src="../../assets/icons/black/ri-eye-open.svg"
          alt="open"
          v-if="isPasswordRepeatOpen"
          @click="togglePasswordRepeat(false)"
          class="password-icon"
        />
        <img
          src="../../assets/icons/black/ri_eye-off-line.svg"
          alt="close"
          v-else
          @click="togglePasswordRepeat(true)"
          class="password-icon"
        />
        <span class="err-input-msg"> {{ inputs.passwordRepeat.error }}</span>
      </div>

      <button class="col-12 register-auth-btn" type="submit">
        {{ $t("register") }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const { t } = useI18n();
import { Inputs } from "@/types/Items";
import http from "@/composables/http";
const isPasswordOpen = ref(false);
const isPasswordRepeatOpen = ref(false);

const inputs = ref<Inputs>({
  name: { value: "", error: "" },
  surname: { value: "", error: "" },
  email: { value: "", error: "" },
  password: { value: "", error: "" },
  passwordRepeat: { value: "", error: "" },
  phone: { value: "", error: "" },
});

const emit = defineEmits<{
  closeModal: [];
}>();

const togglePassword = (value: boolean) => {
  isPasswordOpen.value = value;
};
const togglePasswordRepeat = (value: boolean) => {
  isPasswordRepeatOpen.value = value;
};
const handleValues = (fieldName: keyof Inputs, validationType: string) => {
  const value = inputs.value[fieldName].value;
  inputs.value[fieldName].error = "";
  if (validationType === "string") {
    if (typeof value !== "string" || value.trim() === "") {
      inputs.value[fieldName].error = t("requiredField");
    }
  } else if (validationType === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      inputs.value[fieldName].error = t("incorrectEmail");
    }
  } else if (validationType === "number") {
    if (value === "") {
      inputs.value[fieldName].error = t("requiredField");
    } else if (!value.startsWith("+996")) {
      inputs.value[fieldName].error = t("incorrectPhone");
    }
  } else if (validationType === "password") {
    inputs.value[fieldName].error =
      value?.length < 8 ? t("passwordRequire") : "";
  } else if (validationType === "passwordRepeat") {
    inputs.value[fieldName].error =
      value !== inputs.value.password.value
        ? t("passwordSync")
        : !value
          ? t("requiredField")
          : "";
  }
};

const submitRegister = async () => {
  const validationTypes: Record<keyof Inputs, string> = {
    name: "string",
    surname: "string",
    email: "email",
    phone: "string",
    password: "password",
    passwordRepeat: "passwordRepeat",
  };

  for (const fieldName in inputs.value) {
    if (Object.prototype.hasOwnProperty.call(inputs.value, fieldName)) {
      const validationType = validationTypes[fieldName as keyof Inputs];
      handleValues(fieldName as keyof Inputs, validationType);
    }
  }

  const hasError = Object.values(inputs.value).some(
    (input) => input.error !== "",
  );
  if (!hasError) {
    try {
      const body = {
        firstName: inputs.value.name.value,
        lastName: inputs.value.surname.value,
        password: inputs.value.password.value,
        email: inputs.value.email.value,
        phoneNumber: inputs.value.phone.value,
      };
      const response = await http.post("/api/v1/User/registration", body);
      if (response.status === 200) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data?.tokens?.access_Token);
        localStorage.setItem("refresh_Token", response.data?.tokens?.refresh_Token);
console.log('response registration',response)
        useNotif("success", t("successRegister"), t("registration"));
        setTimeout(() => {
          emit("closeModal");
        }, 1000);
        window.location.reload();
      }

      console.log("response", response);
    } catch (err: any) {
      console.log("errr", err);

      if (err.status === 400 || err.response.data.includes("email")) {
        inputs.value.email.error = t("emailError");
      }
    }
  } else {
    console.log("still some errroe");
  }
};
</script>

<style scoped lang="scss">
form {
  margin: 10px;
}

input:not(.password) {
  margin-bottom: 20px;

  &::placeholder {
    @include textFormat(14px, 20px, 400, $main-gray);
  }
}

.first {
  padding: 0 4px 0 0;
}

.password {
  &::placeholder {
    @include textFormat(14px, 20px, 400, $main-gray);
  }

  margin-bottom: 5px;
}

.col-password {
  margin: 0 !important;
  padding: 0 !important;
}

:deep(input#basic.p-inputtext) {
  padding: 9px 13px;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 10px;
  margin-bottom: 5px !important;
}
</style>
