<template>
  <div class="px-12 my-8 w-full grid overflow-hidden h-screen">
    <h3 class="text-5xl font-light mb-10 px-2">Kontaktų sistema</h3>
    <div class="flex space-x-6">
      <TheSearchBar class="mb-4 mx-2"></TheSearchBar>
      <BaseIconButton class="h-12 w-16">
        <img src="../assets/FilterIcon.svg" />
      </BaseIconButton>
      <BaseIconButton class="h-12 w-16" @click="toggleMode">
        <img src="../assets/BulletList.svg" v-if="mode === 'grid'" />
        <img src="../assets/UserIcon.svg" v-if="mode === 'table'" />
      </BaseIconButton>
      <BaseIconButton
        class="h-12 w-12"
        @click="
          openContactModal();
          getContactModalMode('create');
        "
      >
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
    </div>
    <p class="mb-4 px-2" v-if="totalContacts">
      Iš viso rasta: <strong>{{ totalContactsText }}</strong>
    </p>
    <p v-else class="mb-4 px-2"><strong>Kontaktų nėra</strong></p>
    <TheFilters></TheFilters>
    <component class="pb-36" :is="currentContacts"></component>
    <ThePagination class="absolute bottom-5 left-1/3"></ThePagination>
    <BaseContactModal v-if="contactModalOpen">
      <template #header>
        <h2
          v-if="contactModalMode === 'edit'"
          class="text-4xl font-normal text-center"
        >
          Redaguoti kontaktą:
        </h2>
        <h2
          v-if="contactModalMode === 'create'"
          class="text-4xl font-normal text-center"
        >
          Kurti kontaktą:
        </h2>
      </template>
      <template #action>
        <span v-if="contactModalMode === 'edit'">REDAGUOTI</span>
        <span v-if="contactModalMode === 'create'">KURTI NAUJĄ</span>
      </template>
    </BaseContactModal>
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
              deleteContact(deleteInfo.id);
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
import TheSearchBar from "../components/layout/TheSearchBar.vue";
import ThePagination from "../components/layout/ThePagination.vue";
import TheFilters from "../components/layout/TheFilters.vue";
import ContactsGridExpanded from "../components/contacts/ContactsGridExpanded.vue";
import ContactsTable from "../components/contacts/ContactsTable.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      mode: "grid",
    };
  },
  components: {
    TheSearchBar,
    ThePagination,
    ContactsGridExpanded,
    ContactsTable,
    TheFilters,
  },
  computed: {
    currentContacts() {
      if (this.mode === "table") {
        return ContactsTable;
      }
      if (this.mode === "grid") {
        return ContactsGridExpanded;
      }
    },
    totalContactsText() {
      if (this.totalContacts === 1) {
        return this.totalContacts + " kontaktas";
      }
      if (this.totalContacts < 10 && this.totalContacts > 1) {
        return this.totalContacts + " kontaktai";
      }
      if (this.totalContacts > 10) {
        return this.totalContacts + " kontaktų";
      }
    },
    infoModalText() {
      if (this.infoModalMode === "error") {
        return this.infoModalError;
      }
      if (this.infoModalMode === "delete") {
        return `Vardas ir pavardė: ${this.deleteInfo.name} ${this.deleteInfo.surname} Pozicija: ${this.deleteInfo.position}`;
      }
      if (
        this.contactModalMode === "create" &&
        this.infoModalMode === "success"
      ) {
        return "Kontaktas sėkmingai sukurtas";
      }
      if (
        this.contactModalMode === "edit" &&
        this.infoModalMode === "success"
      ) {
        return "Kontaktas sėkmingai redaguotas";
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
        return "Ar tikrai norite ištrinti kontaktą?";
      }
    },
    ...mapGetters([
      "contactModalMode",
      "infoModalError",
      "totalContacts",
      "contactModalOpen",
      "infoModalMode",
      "deleteInfo",
    ]),
  },
  methods: {
    toggleMode() {
      this.mode === "grid" ? (this.mode = "table") : (this.mode = "grid");
    },
    ...mapActions([
      "getContacts",
      "openContactModal",
      "getContactModalMode",
      "closeInfoModal",
      "deleteContact",
    ]),
  },
  created() {
    this.getContacts();
  },
};
</script>
  