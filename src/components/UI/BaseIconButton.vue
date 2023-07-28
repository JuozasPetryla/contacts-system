<template>
  <button
    @click="triggerClick"
    class="flex bg-light-blue rounded-3xl shadow-md shadow-slate-400 h-11 w-11 justify-center items-center hover:bg-dark-blue"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    triggerClick() {
      this.$emit("click");
    },
  },
};
</script>