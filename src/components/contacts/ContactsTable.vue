<template>
  <md-table md-card class="h-full">
    <md-table-row>
      <md-table-head>Vardas Pavarde</md-table-head>
      <md-table-head>Pozicijos Pavadinimas</md-table-head>
      <md-table-head>Telefono numeris</md-table-head>
      <md-table-head>Elektroninis pastas</md-table-head>
      <md-table-head>Darbovietes adresas</md-table-head>
    </md-table-row>
    <md-table-row v-for="contact in contacts" :key="contact.id">
      <md-table-cell>{{ `${contact.name} ${contact.surname}` }}</md-table-cell>
      <md-table-cell>{{ contact.position }}</md-table-cell>
      <md-table-cell>{{ contact.phone_number }}</md-table-cell>
      <md-table-cell>{{ contact.email }}</md-table-cell>
      <md-table-cell>{{ contact.office_id }}</md-table-cell>
    </md-table-row>
  </md-table>
</template>
  
  <script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["contacts"]),
  },
};
</script>
  