<template>
  <form @submit.prevent="editUser">
    <label for="fileInput">
      <img
        :src="inputs.image.value"
        alt="user profile"
        v-if="inputs.image.value"
      />
      <img
        src="../../assets/images/no-logo.png"
        alt="user profile"
        v-else
        class="no-logo"
      />
    </label>

    <input
      type="file"
      @change="uploadLogo($event)"
      accept="image/*"
      id="fileInput"
      class="select-input"
    />
    <div class="grid">
      <div class="col-6 each-field">
        <label for="name">{{ $t("FirstName") }}</label>
        <input
          class="basic-input col-12"
          type="text"
          id="name"
          v-model="inputs.firstName.value"
          @input="validate('firstName', 'string')"
        />
        <span v-if="inputs.firstName.error" class="err-input-msg">{{
          inputs.firstName.error
        }}</span>
      </div>
      <div class="col-6 each-field">
        <label for="surname">{{ $t("LastName") }}</label>
        <input
          class="basic-input col-12"
          type="text"
          id="surname"
          v-model="inputs.lastName.value"
          @input="validate('lastName', 'string')"
        />
        <span class="err-input-msg"> {{ inputs.lastName.error }}</span>
      </div>

      <div class="col-6 each-field">
        <label for="phone">{{ $t("phone") }}</label>
        <InputMask
          id="phone"
          v-model="inputs.phone.value"
          mask="+999 999 99 99 99"
          placeholder="+996 777 66 55 44"
          @update:modelValue="validate('phone', 'string')"
        />
        <span class="err-input-msg" v-if="inputs.phone.error">
          {{ inputs.phone.error }}</span
        >
      </div>
      <div class="col-6 each-field">
        <label for="email">{{ $t("email") }}</label>
        <input
          class="basic-input col-12"
          type="text"
          id="email"
          v-model="inputs.email.value"
          @input="validate('email', 'email')"
        />
        <span class="err-input-msg"> {{ inputs.email.error }}</span>
      </div>

      <div class="col-6 each-field">
        <label for="address">{{ $t("deliverAddress") }}</label>
        <input
          class="basic-input col-12"
          type="text"
          id="address"
          v-model="inputs.address.value"
          @input="handleAddress($event)"
        />

        <Transition name="slide-fade">
          <ul
            class="ui-options lg:w-30rem w-12 md:w-30rem"
            v-if="isAddressOpen"
          >
            <li
              v-for="item in suggestedAddress"
              :key="item?.value"
              @click="selectAddress(item)"
            >
              {{ item?.title?.text }}

              <span v-show="item?.subtitle?.text"
                >, {{ item?.subtitle?.text }}</span
              >
            </li>
          </ul>
        </Transition>
        <span class="err-input-msg"> {{ inputs.address.error }}</span>
      </div>

      <div class="col-6 each-field">
        <label for="password">{{ $t("password") }}</label>
        <button
          class="change-password-btn col-12"
          type="button"
          @click="isPasswordChangOpen = !isPasswordChangOpen"
        >
          {{ $t("changePassword") }}
        </button>
      </div>
      <div class="col-6 each-field">
        <label for="password">{{ $t("language") }}</label>
        <UIDropdown
          :isDropdownOpen="isUIDropdownOpen"
          :selectedValue="initLan"
          :options="lanOptions"
          @toggleDropdownUI="toggleDropdownUI"
          @selectValue="selectLanguage"
          label="name"
        />
      </div>
    </div>

    <div class="col-12 edit-btn">
      <button type="submit" class="bg-white-btn">
        {{ $t("edit") }}
      </button>
    </div>
  </form>
  <Toast />

  <Dialog
    v-model:visible="isPasswordChangOpen"
    modal
    :style="{ width: '600px' }"
    header=" "
  >
    <AuthChangePassword />
  </Dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import { useI18n } from "vue-i18n";
const isAddressOpen = ref(false);
const config = useRuntimeConfig();
const { locale, setLocale } = useI18n();
import { LanguageOptions } from "@/types/Items";
const suggestedAddress = ref([] as any);
const store = useAuthStore();
const userLogo = ref("");
const initLan = ref({
  name: store.getSelectedLang === "ru" ? "Русский" : "Кыргызча",
  value: store.getSelectedLang,
});
const isUIDropdownOpen = ref(false);
const lanOptions = [
  { name: "Русский", value: "ru" },
  { name: "Кыргызча", value: "kg" },
];

const toggleDropdownUI = () => {
  isUIDropdownOpen.value = !isUIDropdownOpen.value;
};
const isPasswordChangOpen = ref(false);
const inputs = ref({
  firstName: { value: "", error: "" },
  lastName: { value: "", error: "" },
  email: { value: "", error: "" },
  phone: { value: "", error: "" },
  address: { value: "", error: "" },
  image: { value: "", error: "" },
});

const selectLanguage = (item: LanguageOptions) => {
  initLan.value = item;
  isUIDropdownOpen.value = false;
  store.setLang(item?.value);
  setLocale(item?.value);
  localStorage.setItem("selectedLanguage", item?.value);
  window.location.reload();
};

onMounted(async () => {
  await store.fetchUser();
  inputs.value.firstName.value = store.getUser.firstName;
  inputs.value.lastName.value = store.getUser.lastName;
  inputs.value.email.value = store.getUser.email;
  inputs.value.phone.value = store.getUser.phone;
  inputs.value.address.value = store.getUser.address;
  inputs.value.image.value = store.getUser.image;

  console.log("getUser", store.getUser);
});
const { t } = useI18n();
const { handleValues } = useInputValidation();

const validate = (field: string, type: string) => {
  handleValues(inputs.value, field, type);
};

const selectAddress = (item: any) => {
  const address = item?.subtitle?.text
    ? item?.title?.text + ", " + item?.subtitle?.text
    : item?.title?.text;
  console.log(address);

  inputs.value.address.value = address;
  isAddressOpen.value = false;
};

const handleAddress = async (event: any) => {
  const value = event.target?.value;
  if (value) {
    isAddressOpen.value = true;
  } else {
    isAddressOpen.value = false;
  }

  await fetchRes(value);
};

const fetchRes = async (value: string) => {
  const response = await axios(
    `https://suggest-maps.yandex.ru/v1/suggest?apikey=${config?.public?.YANDEX_API}&text=${value}`,
  );
  if (response.status === 200) {
    console.log("address response", response);
    suggestedAddress.value = response.data.results;
  }
};
const editUser = async () => {
  const validationTypes: any = {
    firstName: "string",
    lastName: "string",
    email: "email",
    phone: "string",
    address: "string",
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
        userId: store.getUserId,
        firstName: inputs.value.firstName.value,
        lastName: inputs.value.lastName.value,
        address: inputs.value.address.value,
        phoneNumber: inputs.value.phone.value,
        image: inputs.value.image.value,
      };
      const response = await http.put("/api/v1/User/edit-user", body);
      if (response.status === 200) {
        useNotif("success", t("successEdited"), t("success"));
      }
      console.log("response", response);
    } catch (err) {
      console.log(err);
    }
  }
};

const uploadLogo = (event: any) => {
  const file = event?.target?.files[0];
  const fileReader = new FileReader();
  fileReader.onload = async (event) => {
    if (event.target?.result) {
      const base64 = event.target.result.toString();
      inputs.value.image.value = base64;
    }
  };
  fileReader.readAsDataURL(file);
};
</script>

<style scoped lang="scss">
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
.change-password-btn {
  @extend %button-shared;
  background: #fff;
  border: 1px solid $slider-border-color;
  padding: 16px 18px;
  @include textFormat(16px, 20px, 500, $main-blue);
}

label {
  @include textFormat(16px, 20px, 500, $main-dark-grey);
}

.each-field {
  @include flex(column, start, start);
}

div {
  margin-bottom: 20px;
}

.no-logo {
  border-radius: 100%;
  border: 1px solid #dddddd;
}

.edit-btn {
  @include flex(flex, flex-end, center !important);

  button {
    box-shadow: 0px 0px 0px 0.5px #0000000d;
    box-shadow: 0px 0.5px 2.5px 0px #0000004d;
  }
}

img {
  width: 180px;
  height: 180px;
  border-radius: 50%;

  object-fit: contain;

  &:hover {
    cursor: pointer;
  }
}

.select-input {
  display: none;
}

:deep(input#phone.p-inputtext) {
  padding: 16px 20px;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 10px;
  margin-bottom: 5px !important;
}

@media (max-width: 576px) {
  .each-field {
    width: 100% !important;
  }
}
</style>
