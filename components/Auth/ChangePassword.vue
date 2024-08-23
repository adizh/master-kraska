<template>
  <div class="main">
    <header>
      <img src="../../assets/icons/mdi_password-outline.svg" alt="locked" />
      <div class="main-header">{{ $t("changePassword") }}</div>
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
          :placeholder="$t('phoneNumber')"
          @update:modelValue="handleInput('phone', 'number')"
        />

        <!-- <input
          class="col-12 basic-input"
          type="text"
          id="name"
          :placeholder="$t('typeEmail')"
          v-model="inputs.email.value"
          @input="handleInput('email', 'email')"
        /> -->

        <span v-if="inputs.phone.error" class="err-input-msg">{{
          inputs.phone.error
        }}</span>
      </div>
      <div class="send-email">
        <button @click="sendEmail" class="bg-white-btn">
          {{ $t("submitData") }}
        </button>
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
          <button @click="sendCode" class="bg-white-btn">
            {{ $t("submitData") }}
          </button>
        </div>
      </div>
    </div>

    <div class="grid form" v-else>
      <div class="col-12 each-field password-block-input">
        <label for="password">{{ $t("oldPassword") }}</label>
        <input
          class="col-12 basic-input"
          :type="isOldPasswordOpen ? 'text' : 'password'"
          id="password"
          :placeholder="$t('oldPassword')"
          v-model="inputs.oldPassword.value"
          @input="handleInput('oldPassword', 'string')"
        />
        <img
          src="../../assets/icons/black/ri-eye-open.svg"
          alt="open"
          v-if="isOldPasswordOpen"
          @click="isOldPasswordOpen = false"
          class="password-icon"
        />
        <img
          src="../../assets/icons/black/ri_eye-off-line.svg"
          alt="close"
          v-else
          @click="isOldPasswordOpen = true"
          class="password-icon"
        />
        <span v-if="inputs.oldPassword.error" class="err-input-msg">{{
          inputs.oldPassword.error
        }}</span>
      </div>
      <div class="col-12 each-field password-block-input">
        <label for="password">{{ $t("newPassword") }}</label>
        <input
          class="col-12 basic-input"
          :type="isPasswordOpen ? 'text' : 'password'"
          id="password"
          :placeholder="$t('newPassword')"
          v-model="inputs.password.value"
          @input="handleInput('password', 'password')"
        />
        <img
          src="../../assets/icons/black/ri-eye-open.svg"
          alt="open"
          v-if="isPasswordOpen"
          @click="isPasswordOpen = false"
          class="password-icon"
        />
        <img
          src="../../assets/icons/black/ri_eye-off-line.svg"
          alt="close"
          v-else
          @click="isPasswordOpen = true"
          class="password-icon"
        />
        <span v-if="inputs.password.error" class="err-input-msg">{{
          inputs.password.error
        }}</span>
      </div>

      <div class="col-12 each-field password-block-input">
        <label for="passwordRepeat"> {{ $t("repeatPassword") }}</label>
        <input
          class="col-12 basic-input"
          :type="isNewPasswordOpen ? 'text' : 'password'"
          id="passwordRepeat"
          :placeholder="$t('repeatPassword')"
          v-model="inputs.passwordRepeat.value"
          @input="handleInput('passwordRepeat', 'passwordRepeat')"
        />

        <img
          src="../../assets/icons/black/ri-eye-open.svg"
          alt="open"
          v-if="isNewPasswordOpen"
          @click="isNewPasswordOpen = false"
          class="password-icon"
        />
        <img
          src="../../assets/icons/black/ri_eye-off-line.svg"
          alt="close"
          v-else
          @click="isNewPasswordOpen = true"
          class="password-icon"
        />
        <span v-if="inputs.passwordRepeat.error" class="err-input-msg">{{
          inputs.passwordRepeat.error
        }}</span>
      </div>
      <div class="change-password">
        <button @click="changePassword" class="register-auth-btn">
          {{ !responseLoading ? $t("change") : $t("loading") }}
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
  oldPassword: { value: "", error: "" },
});

const isOldPasswordOpen = ref(false);
const isPasswordOpen = ref(false);
const isNewPasswordOpen = ref(false);
const { t } = useI18n();
const responseLoading = ref(false);
const isOTPOpen = ref(false);
const isPasswordsOpen = ref(false);
const authStore = useAuthStore();

const { handleValues } = useInputValidation();

const handleInput = (field: string, type: string) => {
  handleValues(inputs.value, field, type);
};

const sendEmail = async () => {
  handleValues(inputs.value, "phone", "number");
  const hasError = Object.values(inputs.value).some(
    (input) => input.error !== "",
  );
  if (!hasError) {
    try {
      const response = await http.get(
        `/api/v1/User/send-code/${formatPhone(inputs.value?.phone?.value)}`,
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
    oldPassword: "string",
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
        oldPassword: inputs.value.oldPassword.value,
        newPassword: inputs.value.password.value,
        confirmPassword: inputs.value.passwordRepeat.value,
      };
      const response = await http.post("/api/v1/User/change-password", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 401) {
        responseLoading.value = true;
        authStore.refreshToken();
      }
      console.log("response changePassword", response);
      if (response.status === 200) {
        responseLoading.value = false;
        useNotif("success", t("passwordUpdated"), t("success"));
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    } catch (err: any) {
      if (
        err?.response?.data?.code === 400 &&
        err?.response?.data?.message === "Old password is incorrect"
      ) {
        inputs.value.oldPassword.error = t("oldErroPassword");
      }
      console.log(err, "Error changing the password");
      if (err.response.status == 401) {
        authStore.refreshToken();
      }
    } finally {
      responseLoading.value = false;
    }
  }
};
</script>

<style lang="scss" scoped>
:deep(input#basic.p-inputtext) {
  padding: 16px 13px;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 10px;
  margin-bottom: 5px !important;
}

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

.send-email {
  padding-right: 10px;
  margin-top: 20px;
  width: 100%;
  @include flex(row, center, center);

  button {
    box-shadow: 0px 0px 0px 0.5px #0000000d;

    box-shadow: 0px 0.5px 2.5px 0px #0000004d;
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
    margin-top: 46px;
  }
}

.password-block-input .password-icon {
  top: 60px;
}
</style>
