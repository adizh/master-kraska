<template>
  <div>
    <AboutContacts class="contacts-section" type="contacts" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.contacts-section {
  margin-top: 40px !important;
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
