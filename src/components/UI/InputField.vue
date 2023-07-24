<template>
  <div
    class="bg-light-gray flex w-fit space-x-4 p-3 rounded-sm hover:cursor-pointer"
  >
    <img src="../../assets/Search.svg" class="Mail icon" />
    <input
      type="search"
      :placeholder="inputPlaceHolder"
      class="bg-inherit focus:outline-none"
    />
  </div>
</template>

<script>
export default {
  props: ["inputPlaceHolder"],
};
</script>