<template>
  <div class="grid grid-cols-4 grid-rows-2 gap-y-4 gap-x-4 h-full">
    <ContactContainerExpanded
      v-for="contact in contacts"
      :key="contact.id"
      @click="getPostDetailId(contact.id)"
      :info="contact"
    >
      <template #account>
        <img :src="contact.photo" v-if="contact.photo" class="h-12 w-12" />
      </template>
      <template #name>{{ `${contact.name} ${contact.surname}` }}</template>
      <template #position>{{ contact.position }}</template>
      <template #contact-info>
        <p>Telefono nr: {{ contact.phone_number }}</p>
        <p>El. paštas: {{ contact.email }}</p>
        <p>
          Adresas:
          {{
            officesForDisplay.filter(
              (office) => office.id === contact.office_id
            )[0]?.name
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
    ...mapActions(["getContact", "getOfficesForDisplay"]),
    getPostDetailId(id) {
      this.getContact(id);
      this.$router.push(`/contact-detail/${id}`);
    },
  },
  computed: {
    ...mapGetters(["contacts", "officesForDisplay"]),
  },
  created() {
    this.getOfficesForDisplay();
  },
};
</script>
  
  