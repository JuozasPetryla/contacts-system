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
        <p class="text-xl">Kompanija: {{ contact.company_id }}</p>
        <p class="text-xl">Būstinė: {{ contact.department_id }}</p>
        <p class="text-xl">
          Departamentas: <a>{{ contact.division_id }}</a>
        </p>
        <p class="text-xl">
          Divizija: <a>{{ contact.office_id }}</a>
        </p>
        <p class="text-xl">
          Grupė: <a>{{ contact.group_id }}</a>
        </p>
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["contact"]),
  },
  methods: {
    ...mapActions(["getContact"]),
  },
  created() {
    this.getContact(this.$route.params.id);
  },
};
</script>

<style>
</style>