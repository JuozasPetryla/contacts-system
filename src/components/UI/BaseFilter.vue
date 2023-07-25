<template>
  <div class="flex flex-col space-y-1">
    <label :for="selectId"> <slot name="filter-name"></slot></label>
    <select
      :id="selectId"
      :name="selectId"
      class="border-2 rounded-md h-10 w-fit bg-inherit px-3 text-gray-500 pr-36 focus:outline-none"
    >
      <option value="">
        <slot name="filter"></slot>
      </option>
    </select>
  </div>
</template>
  
  <script>
export default {
  props: ["selectId"],
};
</script>