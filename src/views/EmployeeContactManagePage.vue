<template>
  <div class="px-12 my-8 w-full grid overflow-x-hidden h-fit">
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
    <component :is="currentContacts"></component>
    <ThePagination class="absolute bottom-10 left-1/3"></ThePagination>
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
      <template #header> Ar tikrai norite ištrinti kontaktą? </template>
      <template #content>
        Vardas ir pavardė: varda_pavardė Pozicija: pozicijos_pavyzdys
      </template>
      <template #actions>
        <md-button class="md-primary">NE</md-button>
        <md-button class="md-primary">TAIP</md-button>
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
      if (this.totalContacts > 1) {
        return this.totalContacts + " kontaktų";
      }
    },
    ...mapGetters(["contactModalMode", "totalContacts", "contactModalOpen"]),
  },
  methods: {
    toggleMode() {
      this.mode === "grid" ? (this.mode = "table") : (this.mode = "grid");
    },
    ...mapActions(["getContacts", "openContactModal", "getContactModalMode"]),
  },
  created() {
    this.getContacts();
  },
};
</script>
  