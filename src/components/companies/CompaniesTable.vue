<template>
  <md-card class="mt-16">
    <div class="flex justify-between bg-light-gray">
      <p class="text-base px-12">Įmonės pavadinimas</p>
      <p class="text-base px-48">Veiksmas</p>
    </div>
    <ul class="flex flex-col space-y-5 mt-10 mb-6 justify-center">
      <li
        v-for="company in companies"
        :key="company.id"
        class="text-xl px-14 flex justify-between"
      >
        <h4>{{ company.name }}</h4>
        <div class="flex space-x-4">
          <BaseButton
            class="rounded-full"
            @click="
              getCompanyEditInfo(company);
              openCompanyModal();
              getCompanyModalMode('edit');
            "
            >Redaguoti</BaseButton
          >
          <BaseButton
            class="w-36 rounded-full bg-light-red hover:bg-dark-red"
            @click="getCompanyDeleteInfo(company)"
            >Ištrinti</BaseButton
          >
        </div>
      </li>
    </ul>
  </md-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions([
      "getCompanies",
      "getCompanyEditInfo",
      "getCompanyDeleteInfo",
      "openCompanyModal",
      "getCompanyModalMode",
    ]),
  },
  computed: {
    ...mapGetters(["companies"]),
  },
  created() {
    this.getCompanies();
  },
};
</script>

