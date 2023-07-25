<template>
  <md-dialog :md-active.sync="show" class="flex flex-col p-24">
    <header class="px-6 pt-6 font-medium text-lg">
      <slot name="header"></slot>
    </header>
    <p class="p-6 text-gray-500">
      <slot name="content"></slot>
    </p>
    <div class="px-2 pb-2 flex justify-end">
      <slot name="actions"></slot>
    </div>
  </md-dialog>
</template>

<script>
export default {
  computed: {
    show() {
      return false;
    },
  },
};
</script>
