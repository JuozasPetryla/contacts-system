<template>
  <md-table
    md-card
    class="xl:h-96 lg:h-72 overflow-y-scroll remove-pb lg:w-full"
  >
    <md-table-row>
      <md-table-head>Vardas Pavarde</md-table-head>
      <md-table-head>Pozicijos Pavadinimas</md-table-head>
      <md-table-head>Telefono numeris</md-table-head>
      <md-table-head>Elektroninis pastas</md-table-head>
      <md-table-head>Darbovietes adresas</md-table-head>
    </md-table-row>
    <md-table-row
      v-for="contact in contacts"
      :key="contact.id"
      @click="getPostDetailId(contact.id)"
      class="hover:cursor-pointer"
    >
      <md-table-cell>{{ `${contact.name} ${contact.surname}` }}</md-table-cell>
      <md-table-cell>{{ contact.position }}</md-table-cell>
      <md-table-cell>{{ contact.phone_number }}</md-table-cell>
      <md-table-cell>{{ contact.email }}</md-table-cell>
      <md-table-cell>{{
        officesForDisplay.filter((office) => office.id === contact.office_id)[0]
          ?.name
      }}</md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["contacts", "officesForDisplay"]),
  },
  methods: {
    ...mapActions(["getContact", "getOfficesForDisplay"]),
    getPostDetailId(id) {
      this.getContact(id);
      this.$router.push(`/contact-detail/${id}`);
    },
  },
};
</script>

<style scoped>
.remove-pb {
  padding-bottom: 1rem !important;
}
</style>
