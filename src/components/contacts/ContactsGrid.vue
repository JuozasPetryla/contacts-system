<template>
  <div class="grid grid-cols-4 grid-rows-2 gap-y-4 gap-x-4 h-full">
    <ContactContainer v-for="contact in contacts" :key="contact.id">
      <template #name>{{ `${contact.name} ${contact.surname}` }}</template>
      <template #position>{{ contact.position }}</template>
      <template #contact-info>
        <p>Telefono nr: {{ contact.phone_number }}</p>
        <p>El. paštas: {{ contact.email }}</p>
        <p>Adresas: {{ contact.office_id }}</p>
      </template>
    </ContactContainer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ContactContainer from "./ContactContainer.vue";
export default {
  components: {
    ContactContainer,
  },
  computed: {
    ...mapGetters(["contacts"]),
  },
};
</script>

