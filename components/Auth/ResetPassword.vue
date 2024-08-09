<template>
  <div class="main">
    <header>
      <img src="../../assets/icons/mdi_password-outline.svg" alt="locked" />
      <div class="main-header">{{ $t("resetPassword") }}</div>
    </header>

    <div class="grid form" v-if="!isPasswordsOpen">
      <div class="col-12 each-field">
        <div class="steps">
          <span>1</span
          ><label for="name">
            {{ $t("registerEmilPass") }}
          </label>
        </div>
        <InputMask
          id="basic"
          v-model="inputs.phone.value"
          mask="+999 999 99 99 99"
          placeholder="+996 777 66 55 44"
          @update:modelValue="handleInput('phone', 'number')"
        />

        <span v-if="inputs.phone.error" class="err-input-msg">{{
          inputs.phone.error
        }}</span>
      </div>
      <div class="send-email">
        <button @click="sendEmail">{{ $t("submitData") }}</button>
      </div>

      <div class="col-12" v-if="isOTPOpen">
        <div class="col-12 each-field">
          <div class="steps">
            <span>2</span
            ><label for="code"> {{ $t("emailOtpRegister") }} </label>
          </div>
          <InputOtp
            v-model="inputs.code.value"
            :length="6"
            @input="handleInput('code', 'string')"
            id="code"
          />
          <span v-if="inputs.code.error" class="err-input-msg">{{
            inputs.code.error
          }}</span>
        </div>
        <div class="send-email code">
          <button @click="sendCode">{{ $t("submitData") }}</button>
        </div>
      </div>
    </div>

    <div class="grid form" v-else>
      <div class="col-12 each-field password-block-input">
        <label for="password">{{ $t("newPassword") }}</label>
        <input
          class="col-12 basic-input"
          :type="passwordsVisibility ? 'text' : 'password'"
          id="password"
          :placeholder="$t('newPassword')"
          v-model="inputs.password.value"
          @input="handleInput('password', 'password')"
        />
        <img
          src="../../assets/icons/black/ri-eye-open.svg"
          alt="open"
          v-if="passwordsVisibility"
          @click="passwordsVisibility = false"
          class="password-icon"
        />
        <img
          src="../../assets/icons/black/ri_eye-off-line.svg"
          alt="close"
          v-else
          @click="passwordsVisibility = true"
          class="password-icon"
        />
        <span v-if="inputs.password.error" class="err-input-msg">{{
          inputs.password.error
        }}</span>
      </div>
      <div class="col-12 each-field password-block-input">
        <label for="passwordRepeat">{{ $t("repeatPassword") }}</label>
        <input
          class="col-12 basic-input"
          :type="NewPasswordsVisibility ? 'text' : 'password'"
          id="passwordRepeat"
          :placeholder="$t('repeatPassword')"
          v-model="inputs.passwordRepeat.value"
          @input="handleInput('passwordRepeat', 'passwordRepeat')"
        />

        <img
          src="../../assets/icons/black/ri-eye-open.svg"
          alt="open"
          v-if="NewPasswordsVisibility"
          @click="NewPasswordsVisibility = false"
          class="password-icon"
        />
        <img
          src="../../assets/icons/black/ri_eye-off-line.svg"
          alt="close"
          v-else
          @click="NewPasswordsVisibility = true"
          class="password-icon"
        />
        <span v-if="inputs.passwordRepeat.error" class="err-input-msg">{{
          inputs.passwordRepeat.error
        }}</span>
      </div>
      <div class="change-password">
        <button @click="changePassword" class="register-auth-btn">
          {{ $t("reset") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const inputs = ref({
  phone: { value: "", error: "" },
  code: { value: "", error: "" },
  password: { value: "", error: "" },
  passwordRepeat: { value: "", error: "" },
});

const isOTPOpen = ref(false);
const isPasswordsOpen = ref(false);
const { handleValues } = useInputValidation();

const handleInput = (field: string, type: string) => {
  handleValues(inputs.value, field, type);
};
const passwordsVisibility = ref(false);
const NewPasswordsVisibility = ref(false);
const { t } = useI18n();
const authStore = useAuthStore();
const sendEmail = async () => {
  handleValues(inputs.value, "phone", "number");
  const hasError = Object.values(inputs.value).some(
    (input) => input.error !== "",
  );
  if (!hasError) {
    try {
      const response = await http.get(
        `/api/v1/User/send-code/${formatPhone(inputs.value.phone.value)}`,
      );
      console.log("response sendEmail", response);
      if (response.status === 200) {
        isOTPOpen.value = true;
      }
    } catch (err: any) {
      console.log(err, "error sending code");
      if (err?.response?.data?.code === 404) {
        inputs.value.phone.error = t("userNotFound") || t("error");
      }
    }
  }
};

const sendCode = async () => {
  handleValues(inputs.value, "phone", "number");
  handleValues(inputs.value, "code", "string");
  const hasError = Object.values(inputs.value).some(
    (input) => input.error !== "",
  );
  if (!hasError) {
    try {
      const body = {
        phone: formatPhone(inputs.value.phone.value),
        code: inputs.value.code.value,
      };
      const response = await http.post(`/api/v1/User/verify-code`, body);
      console.log("response sendCode", response);
      if (response.data.code === 404) {
        inputs.value.code.error = t("wrongCode");
      }
      if (response.data.code === 200) {
        isPasswordsOpen.value = true;
      }
    } catch (err: any) {
      console.log(err, "error sending code");
      if (err?.response?.data?.code === 404) {
        inputs.value.phone.error = t("userNotFound") || t("error");
      }
    }
  }
};

const changePassword = async () => {
  const tokenLocal = localStorage.getItem("token");
  let token = tokenLocal && tokenLocal !== undefined ? tokenLocal : null;
  const validationTypes: any = {
    code: "string",
    phone: "number",
    password: "password",
    passwordRepeat: "passwordRepeat",
  };
  for (const fieldName in inputs.value) {
    if (Object.prototype.hasOwnProperty.call(inputs.value, fieldName)) {
      const validationType = validationTypes[fieldName];
      handleValues(inputs.value, fieldName, validationType);
    }
  }

  const hasError = Object.values(inputs.value).some(
    (input) => input.error !== "",
  );

  if (!hasError) {
    try {
      const body = {
        phone: formatPhone(inputs.value.phone.value),
        newPassword: inputs.value.password.value,
        confirmPassword: inputs.value.passwordRepeat.value,
      };
      const response = await http.post("/api/v1/User/reset-password", body);
      console.log("response resetPassword", response);

      if (response.status === 401) {
        authStore.refreshToken();
      }
      if (response.status === 200) {
        useNotif("success", t("passwordReset"), t("success"));
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    } catch (err) {
      authStore.refreshToken();
      console.log(err, "Error changing the password");
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  padding: 40px;
}

header {
  @include flex(column, center, center);

  .main-header {
    @include textFormat(20px, 20px, 600, #000);
  }
}

.form {
  margin-top: 20px;

  input {
    margin-top: 10px;
  }
}

input {
  padding: 16px 18px;
}

.send-email {
  padding-right: 10px;
  margin-top: 20px;
  width: 100%;
  @include flex(row, center, center);

  button {
    font-size: 16px;
    @extend %button-shared;
    background: $main-blue;
  }
}

.send-email.code {
  button {
    background: #33587d1a;
    color: $main-blue;
  }
}

.steps {
  @include flex(row, center, center);

  span {
    @include textFormat(24px, 24px, 700, $main-black);
  }

  label {
    @include textFormat(14px, 20px, 500, $main-black);
  }
}

:deep(.p-inputotp) {
  margin-top: 10px !important;

  input {
    width: 70px !important;
    height: 68px !important;
  }
}

.change-password {
  width: 100%;
  text-align: center;

  button {
    width: 97%;

    @extend %button-shared;
    @include textFormat(20px, 32px, 500, #fff);
    margin-top: 46px;
  }
}

.password-block-input .password-icon {
  top: 60px;
}
</style>
