<template>
  <button
    :type="type"
    @click="triggerClick"
    class="flex bg-light-blue text-white font-medium tracking-widest rounded-md shadow-md shadow-slate-400 h-11 w-20 text-xs lg:text-lg lg:w-72 justify-center items-center hover:bg-dark-blue"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["type"],
  methods: {
    triggerClick() {
      this.$emit("click");
    },
  },
};
</script>
