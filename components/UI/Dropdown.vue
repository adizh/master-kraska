<template>
  <div class="ui-dropdown col-6">
    <div class="selected-option basic-input" @click="openDropdown">
      <span>
        {{ selectedValue?.name }}
      </span>
      <img
        class="arrow"
        :class="{ rotated: isDropdownOpen }"
        src="../../assets/icons/icon=components-closed-arrow.svg"
        alt="open-arrow"
      />
    </div>

    <Transition name="slide-fade">
      <ul class="ui-options" v-if="isDropdownOpen">
        <li
          v-for="item in options"
          :key="item?.value"
          @click="emit('selectValue', item)"
        >
          {{ item?.name }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { LanguageOptions } from "@/types/Items";

const emit = defineEmits<{
  toggleDropdownUI: [];
  selectValue: [LanguageOptions];
}>();

const openDropdown = () => {
  emit("toggleDropdownUI");
};

const props = defineProps<{
  selectedValue: LanguageOptions;
  options: LanguageOptions[];
  isDropdownOpen: boolean;
  label:string
}>();
</script>

<style scoped lang="scss">
.selected-option {
  @include flex(row, space-between, center);

  &:hover {
    cursor: pointer;
  }
}

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

.ui-dropdown {
  width: 100%;
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

@keyframes slideFromTop {
  from {
    transform: translateY(-5%);
    opacity: 0;
  }

  to {
    transform: translateY(1%);
    opacity: 1;
  }
}

@keyframes slideFromBottomToTop {
  from {
    transform: translateY(5%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
