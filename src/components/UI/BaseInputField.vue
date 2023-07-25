<template>
  <div class="flex flex-col space-y-1 w-auto">
    <label :for="inputId">
      <slot name="label"></slot>
    </label>
    <div class="bg-light-gray flex w-fit space-x-4 p-3 rounded-sm">
      <img src="../../assets/Mail.svg" class="Mail icon" />
      <input
        :type="inputType"
        :id="inputId"
        :placeholder="inputPlaceHolder"
        class="bg-inherit focus:outline-none w-72"
      />
      <img src="../../assets/Trailing Icon.svg" class="Mail icon" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["inputPlaceHolder", "inputId", "inputType"],
};
</script>