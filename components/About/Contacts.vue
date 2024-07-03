<template>
  <div class="contacts margin-top-80">
    <h5 class="each-section-header">{{ $t("contacts") }}</h5>
    <h5 class="each-section-header margin-top-40">{{ mainShop?.name }}</h5>

    <div class="contacts-header">
      <div class="contacts-header-block">
        <div>
          <img
            src="@/assets/icons/black/icon=components-location.svg"
            alt="location"
          />
        </div>
        <div>
          <span>{{ $t("address") }}</span>
          <p>{{ mainShop?.address }}</p>
        </div>
      </div>

      <div class="contacts-header-block">
        <div>
          <img
            src="@/assets/icons/black/icon=components-phone.svg"
            alt="phone"
          />
        </div>
        <div>
          <span>{{ $t("phoneNumber") }}</span>
          <p>{{ mainShop?.phoneNumber }}</p>
        </div>
      </div>
      <div class="contacts-header-block">
        <div>
          <img src="@/assets/icons/black/icon=components-time.svg" alt="time" />
        </div>
        <div>
          <span>{{ $t("workingHours") }}</span>
          <p v-if="mainShop?.openHours">
            {{ formatHours(mainShop.openHours) }}
          </p>
        </div>
      </div>
    </div>

    <div class="contact-form" v-if="type === 'contacts'">
      <h5 class="each-section-header">{{ $t("contactUs") }}</h5>
      <form @submit.prevent="requestContact">
        <div class="contact-form-block">
          <div class="flex flex-column start gap-2">
            <input
              type="text"
              class="basic-input contact-form-input"
              :placeholder="$t('FirstName')"
              v-model="contactForm.name.value"
              @input="validate('name', 'string')"
            />
            <span v-if="contactForm.name.error" class="err-input-msg">{{
              contactForm.name.error
            }}</span>
          </div>
          <div class="flex flex-column start gap-2">
            <InputMask
              id="phone"
              mask="+999 999 99 99 99"
              placeholder="+996 777 66 55 44"
              v-model="contactForm.phone.value"
              @update:modelValue="validate('phone', 'string')"
              :class="{ 'err-contact-input': contactForm.phone.error }"
            />
            <span v-if="contactForm.phone.error" class="err-input-msg">{{
              contactForm.phone.error
            }}</span>
          </div>
        </div>

        <div class="contact-form-bottom">
          <input
            type="text"
            class="basic-input"
            :placeholder="$t('comments')"
            v-model="contactForm.comments.value"
          />
        </div>

        <div>
          <button type="submit" class="pink-button">
            {{ $t("submitData") }}
          </button>
        </div>
      </form>
    </div>

    <div class="maps-address margin-top-40">
      <div class="section-header-links">
        <h5 class="each-section-header">{{ $t("allOurMarkets") }}</h5>
        <slot name="look-all-btn"></slot>
      </div>

      <div class="maps-address-list" v-if="type === 'about-us'">
        <AddressItem
          v-for="item in orderStore?.getShops?.slice(0, 2)"
          :key="item.name"
          :name="item?.name"
          :phone="item?.phoneNumber"
          :email="item.email"
          :openHours="item?.openHours"
          :address="item?.address"
        />
      </div>
    </div>

    <div class="margin-top-40 margin-bottom-40" id="map">
      <LMap
        ref="map"
        :zoom="12"
        :center="[42.860131, 74.608273]"
        :geoJSON="geoJson"
        :style="{ zIndex: '1' }"
      >
        <LTileLayer
          url=" https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker
          v-for="item in computedShops"
          :key="item?.id"
          :lat-lng="[+item?.latitude, +item?.longitude]"
        >
          <LIcon ref="icon">
            <img class="restaurant-icon" src="/static/location-mark-map.png" />
          </LIcon>
          <LTooltip :options="{ permanent: false, interactive: true }">{{
            item?.name
          }}</LTooltip>
        </LMarker>
      </LMap>
    </div>

    <div class="maps-address-list" v-if="type === 'contacts'">
      <AddressItem
        v-for="item in orderStore?.getShops"
        :key="item.name"
        :name="item?.name"
        :phone="item?.phoneNumber"
        :email="item?.email"
        :address="item?.address"
        :openHours="item?.openHours"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AddressList } from "@/types/Items";
const orderStore = useOrderStore();
const authStore = useAuthStore();
const { handleValues } = useInputValidation();
const { t } = useI18n();
const props = defineProps<{
  type: string;
}>();
const contactForm = ref({
  name: { value: "", type: "string", error: "" },
  comments: { value: "", type: "", error: "" },
  phone: { value: "", type: "string", error: "" },
});
const validate = (field: string, type: string) => {
  handleValues(contactForm.value, field, type);
};

const geoJson = ref({});
const computedShops = computed(() => {
  return props?.type === "contacts"
    ? orderStore?.getShops
    : orderStore?.getShops?.slice(0, 2);
});

const sendContact = async () => {
  try {
    const body = {
      name: contactForm.value?.name?.value,
      phone: contactForm.value?.phone?.value,
      message: contactForm.value?.comments?.value,
    };
    const response = await http.post(
      "/api/v1/User/send-message-from-contact-form",
      body,
    );
    if (response.status === 200) {
      useNotif("success", t("requestSent"), t("success"));
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  } catch (err) {
    console.log(err);
  }
};

const requestContact = () => {
  for (const fieldName in contactForm.value) {
    if (Object.prototype.hasOwnProperty.call(contactForm.value, fieldName)) {
      const fieldType =
        contactForm.value[fieldName as keyof typeof contactForm.value]?.type;
      handleValues(contactForm.value, fieldName, fieldType);
    }
  }

  const hasError = Object.values(contactForm.value).some(
    (input) => input.error !== "",
  );

  if (!hasError) {
    sendContact();
  }
};
const mainShop = computed(() => {
  return orderStore?.getShops?.find((shop: AddressList) => {
    return shop.mainShop;
  });
});
onMounted(async () => {
  await orderStore?.fetchAllShops();
});
watch(
  () => authStore.getSelectedLang,
  () => {
    orderStore?.fetchAllShops();
  },
);
</script>

<style scoped lang="scss">
:deep(input#phone.p-inputtext) {
  padding: 18px 20px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  margin-bottom: 5px !important;
}

.contacts-header {
  @extend %border-bottoms;
  padding-bottom: 54px;
  margin-top: 58px;
  @include flex(row, space-between, center);

  &-block {
    width: 30%;
    @include flex(row, start, start);

    div {
      &:first-child {
        background: $main-white;
        border-radius: 100%;
        padding: 17px;
      }
    }

    span {
      @include footerSpan(20px, 16px);
      color: $main-black !important;
      margin-bottom: 20px;
      display: block;
    }

    p {
      @include footerSpan(24px, 24px);
      color: $main-black !important;
      font-weight: 700;

      font-family: "Avenir Next Medium";
    }
  }
}
.contact-form {
  div {
    :last-child {
      width: 50%;
    }
  }
  input {
    border-radius: 8px;
  }
  form {
    width: 100%;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 12px;
    .contact-form-block {
      div {
        width: 50%;
      }
      input {
        width: 100%;
      }
      @include flex(row, start, start);
    }
  }
}

.contact-form-bottom {
  margin-top: 24px;
  input {
    width: 100%;
  }
}

.marker {
  position: relative;
  width: 20px;
  height: 20px;
  background: #ff0000;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: red;
  font-weight: bold;
  line-height: 20px;
}

#map {
  width: 100%;
  height: 300px;
}

.restaurant-icon {
  height: 30px;
  width: auto;
}

@media (max-width: 992px) {
  .contacts-header {
    flex-direction: column;
    align-items: start;

    &-block {
      width: 100%;
    }
  }
}

@media (max-width: 480px) {
  .each-section-header {
    font-size: 24px;
    line-height: 32px;
  }

  .contacts-header-block p {
    font-size: 16px;
    line-height: 24px;
  }

  .maps-address .each-section-header {
    font-size: 20px;
  }
}
</style>
