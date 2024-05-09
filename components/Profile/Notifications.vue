<template>
  <div class="notif">
    <div class="notif-header">{{ $t("notifSettings") }}</div>
    <span class="notif-subheader">
      {{ $t("notifControl") }}
    </span>
    <ul class="notif-list">
      <li>
        <span>{{ $t("discountsAndNews") }}</span>
        <InputSwitch
          v-model="checked"
          @input="setUserStatus"
          :checked="checked"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const checked = ref(false);
const { t } = useI18n();
const authStore = useAuthStore();
let token: string;
if (process.client) {
  token = localStorage.getItem("token") as string;
}

const setUserStatus = async () => {
  console.log("checked", checked);
  try {
    const response = await http({
      method: "get",
      url: `/api/v1/User/set-notifications-allowance/${authStore?.getUserId}/${!checked.value}`,
    });
    console.log("response setUserStatus", response);
  } catch (err) {
    useNotif("error", t("errOccurred"), t("error"));
    console.log(err);
  }
};

onMounted(async () => {
  await authStore.fetchUser();
  checked.value = authStore.getUser?.isNotificationsAllowed;
});
</script>

<style scoped lang="scss">
:deep(.p-inputswitch.p-highlight .p-inputswitch-slider) {
  background: $blue-color;
}

.notif {
  &-header {
    @include textFormat(28px, 28px, 500, #000);
    margin-bottom: 18px;
  }

  &-subheader {
    @include textFormat(16px, 28px, 400, #000);
  }
}

ul {
  margin-top: 18px;
  border: 1px solid $slider-border-color;
  border-radius: 10px;
  padding: 16px 20px;

  li {
    padding-bottom: 14px;
    @include flex(row, space-between, center);

    &:not(:last-child) {
      @extend %border-bottoms;
      margin-bottom: 25px;
    }
  }
}
</style>
