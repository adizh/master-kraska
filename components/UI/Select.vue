<template>
    <div class="ui-dropdown col-6">
      <div class="selected-option basic-input" @click="openDropdown(selectedValue)">
        <span>
          {{ selectedValue?.nameRu }}
        </span>


        <span @click.stop.capture="deleteCategory">X</span>
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
            <input type="text" class="basic-input" v-model="searchCategory" @input="searchCategories"/>
          <li
            v-for="item in props?.options"
            :key="item?.value"
            @click="emit('selectValue', item,selectedValue)"
          >
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
import { CategorySys } from "~/types/Category";
const searchCategory=ref('')
const filteredOptions = ref<any[]>([]);

const searchCategories =(event:any)=>{
emit('searchCategories',event?.target?.value)
}
  
  const emit = defineEmits(['openDropdown', 'selectValue','deleteCategory','searchCategories'])
  const openDropdown = (selectedValue:CategorySys) => {
    emit("openDropdown",selectedValue);
  };
  
  const deleteCategory =()=>{
    console.log('deleteCategory',props?.selectedValue)
    emit('deleteCategory',props.selectedValue)
  }
  const props = defineProps<{
    selectedValue: any;
    options: any[];
    isDropdownOpen: boolean;
    label:string
  }>();

  onMounted(()=>{
    filteredOptions.value = props?.options;
    console.log('filteredOptions',filteredOptions)
    console.log('props?.options;',props?.options)
  })
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
    max-height:200px;
    overflow-y: auto;
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
  