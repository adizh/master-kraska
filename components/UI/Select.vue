<template>
  <div class="ui-dropdown w-full">
    <div
      class="selected-option basic-input"
      @click="openDropdown(selectedValue)"
    >
      <span v-if="type === 'subdir'">{{ catalog?.nameRu }}: </span>
      <span>
        {{ selectedValue[label] }}
      </span>

      <span
        @click.stop.capture="deleteCategory"
        v-show="type === 'category' || type === 'subdir'"
        >X</span
      >
      <img
        class="arrow"
        :class="{ rotated: isDropdownOpen }"
        src="../../assets/icons/icon=components-closed-arrow.svg"
        alt="open-arrow"
      />
    </div>

    <Transition name="slide-fade">
      <div>
        <ul class="ui-options" v-if="isDropdownOpen">
          <input
            type="text"
            class="basic-input"
            v-model="searchCategory"
            @input="searchCategories"
          />
          <li
            v-for="(item, index) in props?.options"
            :key="item?.value"
            @click="emit('selectValue', item, selectedValue, index)"
          >
            <span v-if="type === 'subdir'"> {{ item?.category }}:</span>

            {{ item[label] }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { LanguageOptions } from "@/types/Items";
import { PropType } from "vue";
import { SubDirHelper } from "~/types/Catalog";
import { CategorySys } from "~/types/Category";
const searchCategory = ref("");
const catalogStore = useCatalogStore();
const filteredOptions = ref<any[]>([]);
const searchCategories = (event: any) => {
  emit("searchCategories", event?.target?.value);
};

const emit = defineEmits([
  "openDropdown",
  "selectValue",
  "deleteCategory",
  "searchCategories",
]);
const openDropdown = (selectedValue: CategorySys) => {
  emit("openDropdown", selectedValue);
};

const deleteCategory = () => {
  emit("deleteCategory", props.selectedValue, catalog.value?.nameRu);
};

const catalog = ref({} as SubDirHelper);
const fetchMainCatalog = async () => {
  catalog.value = await catalogStore.fetchCatalog(
    props?.selectedValue?.categoryId,
  );
};

const props = defineProps<{
  selectedValue: any;
  options: any[];
  isDropdownOpen: boolean;
  label: string;
  type?: string;
}>();

onMounted(() => {
  filteredOptions.value = props?.options;
  fetchMainCatalog();
});
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
  max-height: 200px;
  overflow-y: auto;
  @include textFormat(16px, 20px, 400, #000);
  input {
    width: 100%;
  }
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
