<template>
  <div class="flex flex-col space-y-1">
    <label :for="selectId"> <slot name="filter-name"></slot></label>
    <slot name="filter"></slot>
  </div>
</template>
  
  <script>
export default {
  props: ["selectId"],

};
</script>