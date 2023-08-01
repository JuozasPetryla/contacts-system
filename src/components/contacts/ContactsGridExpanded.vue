<template>
  <div class="grid grid-cols-4 grid-rows-2 gap-y-4 gap-x-4 h-full">
    <ContactContainerExpanded v-for="contact in 8" :key="contact">
      <template #name></template>
      <template #position></template>
      <template #contact-info></template>
    </ContactContainerExpanded>
  </div>
</template>
  
  <script>
import ContactContainerExpanded from "./ContactContainerExpanded.vue";
export default {
  components: {
    ContactContainerExpanded,
  },
};
</script>
  
  