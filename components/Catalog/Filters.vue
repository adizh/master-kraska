<template>
    <div class='filters'>
        <div class="price">
            <label for="price" class="filters-help">
                Цена
            </label>
            <div> <input type="text" placeholder="От" class="basic-input">
                <input type="text" placeholder="До" class="basic-input">
            </div>
        </div>

        <div class="filters-block">
            <span class="filters-help">
                Материал для рабочей поверхности
            </span>

            <div>
                <label :class="!value ? 'checkbox-container' : 'checked-input'">checkbox
                    <input type="checkbox" v-model="value">
                    <span class="checkmark"></span>
                </label>
                <!-- <input type="checkbox" class="basic-checkbox">
                <span>чёрный</span> -->
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
const value = ref(false)
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
    display: none;
}


.checkbox-container {
    display: inline-block;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
}

.checkbox-container::before {
    content: "";
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    position: absolute;
    left: 0;
    top: 0;
}

.checked-input::before {
    content: url('../../assets/icons/check-icon.svg');
    display: inline-block;
    width: 18px;
    height: 18px;
    position: absolute;
    left: 10px;

}

.checked-input input[type="checkbox"]:checked+.checkmark::before {
    content: url('../../assets/icons/check-icon.svg');
    /* Path to your checked image */
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    /* Adjust width and height according to your image size */
    height: 14px;
    border: none;
    /* Remove border when checked */
}






.filters {
    &-help {
        @include textFormat(20px, 20px, 600, #000);
        margin-bottom: 10px;
        max-width: 250px;
        width: 100%;
        display: block;
    }

    &-block {
        margin-top: 40px;
    }

}


.price {
    @include flex(column, center, start, 5px);

    input {
        width: 35%;

        &:first-child {
            margin-right: 10px
        }
    }
}
</style>