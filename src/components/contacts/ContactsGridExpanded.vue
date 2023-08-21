<template>
  <div class="grid grid-cols-4 grid-rows-2 gap-y-4 gap-x-4 h-full">
    <ContactContainerExpanded
      v-for="contact in contacts"
      :key="contact.id"
      @click="getPostDetailId(contact.id)"
      :info="contact"
    >
      <template #name>{{ `${contact.name} ${contact.surname}` }}</template>
      <template #position>{{ contact.position }}</template>
      <template #contact-info>
        <p>Telefono nr: {{ contact.phone_number }}</p>
        <p>El. paštas: {{ contact.email }}</p>
        <p>
          Adresas:
          {{
            offices.filter((office) => office.id === contact.office_id)[0]?.name
          }}
        </p>
      </template>
    </ContactContainerExpanded>
  </div>
</template>
  
  <script>
import ContactContainerExpanded from "./ContactContainerExpanded.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ContactContainerExpanded,
  },
  methods: {
    ...mapActions(["getContact"]),
    getPostDetailId(id) {
      this.getContact(id);
      this.$router.push(`/contact-detail/${id}`);
    },
  },
  computed: {
    ...mapGetters(["contacts", "offices"]),
  },
  created() {},
};
</script>
  
  