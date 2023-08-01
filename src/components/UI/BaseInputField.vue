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
        class="bg-inherit focus:outline-none w-72"
      />
      <div class="w-6">
        <slot name="image-right"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inputPlaceHolder", "inputId", "inputType"],
};
</script>