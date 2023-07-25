<template>
  <div class="grid grid-cols-4 grid-rows-2 gap-y-4 gap-x-4">
    <ContactContainer v-for="contact in 8" :key="contact">
      <template #name></template>
      <template #position></template>
      <template #contact-info></template>
    </ContactContainer>
  </div>
</template>

<script>
import ContactContainer from "./ContactContainer.vue";
export default {
  components: {
    ContactContainer,
  },
};
</script>

