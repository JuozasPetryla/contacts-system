<template>
  <div class="px-12 my-8 w-full grid">
    <h3 class="text-5xl font-light mb-10 px-2">Įmonės</h3>
    <div class="flex space-x-6 items-center">
      <BaseIconButton
        class="h-12 w-12"
        @click="
          openModal();
          getModalMode('create');
          getModalType('company');
        "
      >
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
    <CompaniesTable class="overflow-y-auto h-96 mb-24"></CompaniesTable>
    <BaseModal>
      <template #header>
        <h2 v-if="modalMode === 'edit'" class="text-4xl font-normal">
          Redaguoti įmonę:
        </h2>
        <h2 v-if="modalMode === 'create'" class="text-4xl font-normal">
          Kurti naują įmonę:
        </h2>
      </template>
    </BaseModal>
    <BaseInfoDialog>
      <template #header> {{ infoModalHeader }} </template>
      <template #content>
        {{ infoModalText }}
      </template>
      <template #actions>
        <div v-if="infoModalMode === 'delete'">
          <md-button @click="closeInfoModal" class="md-primary">NE</md-button>
          <md-button
            @click="
              closeInfoModal();
              deleteCompany(companyDeleteInfo.id);
            "
            class="md-primary"
            >TAIP</md-button
          >
        </div>
        <md-button v-else @click="closeInfoModal" class="md-primary"
          >UŽDARYTI</md-button
        >
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
    ...mapGetters([
      "infoModalMode",
      "companies",
      "totalCompanies",
      "modalMode",
      "companyDeleteInfo",
    ]),
    totalCompaniesText() {
      if (this.totalCompanies === 1) {
        return this.totalCompanies + " įmonė";
      }
      if (this.totalCompanies < 10 && this.totalCompanies > 1) {
        return this.totalCompanies + " įmonės";
      }
      if (this.totalCompanies >= 10) {
        return this.totalCompanies + " įmonių";
      }
    },
    infoModalText() {
      if (this.infoModalMode === "error") {
        return this.infoModalError;
      }
      if (this.infoModalMode === "delete") {
        return `Pavadinimas: ${this.companyDeleteInfo.name}`;
      }
      if (
        this.companyModalMode === "create" &&
        this.infoModalMode === "success"
      ) {
        return "Įmonė sėkmingai sukurta";
      }
      if (
        this.companyModalMode === "edit" &&
        this.infoModalMode === "success"
      ) {
        return "Įmonė sėkmingai redaguota";
      }
      if (
        this.companyModalMode === "delete" &&
        this.infoModalMode === "success"
      ) {
        return "Įmonė sėkmingai ištrinta";
      }
    },

    infoModalHeader() {
      if (this.infoModalMode === "success") {
        return "Pavyko";
      }
      if (this.infoModalMode === "error") {
        return "Klaida";
      }
      if (this.infoModalMode === "delete") {
        return "Ar tikrai norite ištrinti įmonę?";
      }
    },
  },

  methods: {
    ...mapActions([
      "closeInfoModal",
      "getCompanies",
      "openModal",
      "getModalMode",
      "getModalType",
      "deleteCompany",
    ]),
  },
  created() {
    this.getCompanies();
  },
};
</script>
