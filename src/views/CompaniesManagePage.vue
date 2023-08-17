<template>
  <div class="px-12 my-8 w-full grid">
    <h3 class="text-5xl font-light mb-10 px-2">Įmonės</h3>
    <div class="flex space-x-6 items-center">
      <BaseIconButton class="h-12 w-12">
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
      <p class="text-lg">Pridėti naują įmonę</p>
    </div>
    <p v-if="totalCompanies" class="my-4 px-2">
      Iš viso rasta: <strong>{{ totalCompaniesText }}</strong>
    </p>
    <p v-else class="my-4 px-2">
      <strong>Nerasta įmonių</strong>
    </p>
    <CompaniesTable></CompaniesTable>
    <BaseCompanyModal>
      <template #header>
        <h2 class="text-4xl font-normal">Redaguoti įmonę:</h2>
      </template>
    </BaseCompanyModal>
    <BaseInfoDialog>
      <template #header> Ar tikrai norite ištrinti įmonę? </template>
      <template #content> Įmonės pavadinimas: įmonės pavadinimas </template>
      <template #actions>
        <md-button class="md-primary">NE</md-button>
        <md-button class="md-primary">TAIP</md-button>
      </template>
    </BaseInfoDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CompaniesTable from "../components/companies/CompaniesTable.vue";
export default {
  components: {
    CompaniesTable,
  },

  computed: {
    ...mapGetters(["companies", "totalCompanies"]),
    totalCompaniesText() {
      if (this.totalCompanies === 1) {
        return this.totalCompanies + " įmonė";
      }
      if (this.totalCompanies < 10 && this.totalCompanies > 1) {
        return this.totalCompanies + " įmonės";
      }
      if (this.totalCompanies > 10) {
        return this.totalCompanies + " įmonių";
      }
    },
  },

  methods: {
    ...mapActions(["getCompanies"]),
  },
  created() {
    this.getCompanies();
  },
};
</script>
