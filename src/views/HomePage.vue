<template>
  <div class="px-16 my-8 w-screen grid">
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
    </div>
    <p class="mb-4 px-2" v-if="totalContacts">
      Iš viso rasta: <strong>{{ totalContactsText }}</strong>
    </p>
    <p v-else class="mb-4 px-2"><strong>Kontaktų nėra</strong></p>
    <TheFilters></TheFilters>
    <component :is="currentContacts"></component>
    <ThePagination class="absolute bottom-10 left-1/3"></ThePagination>
  </div>
</template>

<script>
import TheSearchBar from "../components/layout/TheSearchBar.vue";
import ThePagination from "../components/layout/ThePagination.vue";
import TheFilters from "../components/layout/TheFilters.vue";
import ContactsGrid from "../components/contacts/ContactsGrid.vue";
import ContactsTable from "../components/contacts/ContactsTable.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      mode: "grid",
    };
  },
  components: {
    TheSearchBar,
    ThePagination,
    ContactsGrid,
    ContactsTable,
    TheFilters,
  },
  computed: {
    currentContacts() {
      if (this.mode === "table") {
        return ContactsTable;
      }
      if (this.mode === "grid") {
        return ContactsGrid;
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
    ...mapGetters(["totalContacts"]),
  },
  methods: {
    toggleMode() {
      this.mode === "grid" ? (this.mode = "table") : (this.mode = "grid");
    },
    ...mapActions(["getContacts"]),
  },
  created() {
    this.getContacts();
  },
};
</script>

