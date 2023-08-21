<template>
  <div class="px-16 my-8 w-screen">
    <h3 class="text-5xl font-light mb-10 px-2">
      Detalesnė kontakto informacija:
    </h3>
    <div class="pl-6 flex items-center space-x-8">
      <img src="../assets/Test Account.svg" class="h-16 w-16" />
      <div>
        <h3 class="text-4xl font-normal">
          {{ `${contact.name} ${contact.surname}` }}
        </h3>
        <h4 class="text-2xl font-normal">Pozicija: {{ contact.position }}</h4>
      </div>
    </div>
    <md-card class="flex px-10 py-14 mt-8 space-x-96">
      <div class="flex flex-col space-y-12">
        <h4 class="text-2xl">Kontaktinės detalės:</h4>
        <p class="text-xl">
          Elektroninis paštas <a>{{ contact.email }}</a>
        </p>
        <p class="text-xl">
          Telefono numeris: <a>{{ contact.phone_number }}</a>
        </p>
      </div>
      <div class="flex flex-col space-y-12">
        <h4 class="text-2xl">Kompanijos detalės:</h4>
        <p class="text-xl">
          Kompanija:
          {{
            companies.filter((company) => company.id === contact.company_id)[0]
              ?.name
          }}
        </p>
        <p class="text-xl">
          Būstinė:
          {{
            offices.filter((office) => office.id === contact.office_id)[0]?.name
          }}
        </p>
        <p class="text-xl">
          Departamentas:
          <a>{{
            departments.filter(
              (department) => department.id === contact.department_id
            )[0]?.name
          }}</a>
        </p>
        <p class="text-xl">
          Divizija:
          <a>{{
            divisions.filter(
              (division) => division.id === contact.division_id
            )[0]?.name
          }}</a>
        </p>
        <p class="text-xl">
          Grupė:
          <a>{{
            groups.filter((group) => group.id === contact.group_id)[0]?.name
          }}</a>
        </p>
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "contact",
      "divisions",
      "offices",
      "groups",
      "departments",
      "companies",
    ]),
  },
  methods: {
    ...mapActions([
      "getContact",
      "getCompanies",
      "getOffices",
      "getDivisions",
      "getDepartments",
      "getGroups",
    ]),
  },
  created() {
    this.getContact(this.$route.params.id);
    this.getCompanies();
    this.getOffices();
    this.getDivisions();
    this.getDepartments();
    this.getGroups();
  },
};
</script>

<style>
</style>