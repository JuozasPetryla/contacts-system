

<template>
  <div class="flex flex-col space-y-1 w-auto">
    <label :for="inputId">
      <slot name="label"></slot>
    </label>
    <div class="bg-light-gray flex w-fit space-x-4 p-3 rounded-sm">
      <slot name="image-left"> </slot>

      <input
        :type="inputType"
        :id="inputId"
        :placeholder="inputPlaceHolder"
        @blur="$emit('blur')"
        @input="$emit('input', $event.target.value)"
        @change="$emit('change', $event.target.value)"
        :value="value"
        class="bg-inherit focus:outline-none w-72"
      />
      <slot name="image-right"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inputPlaceHolder", "inputId", "inputType", "value"],
};
</script>