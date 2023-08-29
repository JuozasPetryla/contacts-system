<template>
  <div class="px-12 my-8 w-full grid">
    <h3 class="text-5xl font-light mb-10 px-2">Kontaktų sistema</h3>
    <div class="flex space-x-6">
      <TheSearchBar class="mb-4 mx-2"></TheSearchBar>
      <div class="flex">
        <BaseIconButton
          @click="showContactNumbers"
          class="h-12 w-16"
          :class="{ 'rounded-e-none': contactNumbers }"
        >
          <img src="../assets/FilterIcon.svg" />
        </BaseIconButton>

        <div v-if="contactNumbers" class="flex">
          <BaseIconButton
            @click="onGetContactsNumber(5)"
            class="h-12 w-16 font-medium text-lg text-white rounded-none"
          >
            5
          </BaseIconButton>
          <BaseIconButton
            @click="onGetContactsNumber(10)"
            class="h-12 w-16 font-medium text-lg text-white rounded-none"
          >
            10
          </BaseIconButton>
          <BaseIconButton
            @click="onGetContactsNumber(25)"
            class="h-12 w-16 font-medium text-lg text-white rounded-none"
          >
            25</BaseIconButton
          >
          <BaseIconButton
            @click="onGetContactsNumber(50)"
            class="h-12 w-16 font-medium text-lg text-white rounded-none"
          >
            50
          </BaseIconButton>
          <BaseIconButton
            @click="onGetContactsNumber(100)"
            class="h-12 w-16 font-medium text-lg text-white rounded-none"
          >
            100
          </BaseIconButton>
          <BaseIconButton
            @click="onGetContactsNumber('all')"
            class="h-12 w-16 font-medium text-lg text-white rounded-s-none"
          >
            All
          </BaseIconButton>
        </div>
      </div>
      <BaseIconButton class="h-12 w-16" @click="toggleMode">
        <img src="../assets/BulletList.svg" v-if="mode === 'grid'" />
        <img src="../assets/UserIcon.svg" v-if="mode === 'table'" />
      </BaseIconButton>
      <BaseIconButton
        v-if="checkUser && currentUserPermissions.edit_employees"
        class="h-12 w-12"
        @click="
          openModal();
          getModalType('contact');
          getModalMode('create');
        "
      >
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
    </div>
    <p class="mb-4 px-2" v-if="totalContacts">
      Iš viso rasta: <strong>{{ totalContactsText }}</strong>
    </p>
    <p class="mb-4 px-2" v-if="totalContacts">
      Puslapis: <strong>{{ page }}</strong>
    </p>
    <p v-else class="mb-4 px-2"><strong>Kontaktų nėra</strong></p>
    <TheFilters></TheFilters>
    <component class="pb-36" :is="currentContacts"></component>
    <ThePagination class="absolute bottom-5 left-1/3"></ThePagination>
    <BaseModal>
      <template #header>
        <h2 v-if="modalMode === 'edit'" class="text-4xl font-normal">
          Redaguoti kontaką:
        </h2>
        <h2 v-if="modalMode === 'create'" class="text-4xl font-normal">
          Kurti naują kontaką:
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
    <BaseDrop></BaseDrop>
  </div>
</template>
  
  <script>
import TheSearchBar from "../components/layout/TheSearchBar.vue";
import ThePagination from "../components/layout/ThePagination.vue";
import TheFilters from "../components/layout/TheFilters.vue";
import ContactsGridExpanded from "../components/contacts/ContactsGridExpanded.vue";
import ContactsGrid from "../components/contacts/ContactsGrid.vue";
import ContactsTable from "../components/contacts/ContactsTable.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      mode: "grid",
      contactNumbers: false,
    };
  },
  components: {
    TheSearchBar,
    ThePagination,
    ContactsGridExpanded,
    ContactsGrid,
    ContactsTable,
    TheFilters,
  },
  computed: {
    checkUser() {
      return localStorage.getItem("pocketbase_auth");
    },
    currentContacts() {
      if (this.mode === "table") {
        return ContactsTable;
      }
      if (this.mode === "grid" && localStorage.getItem("pocketbase_auth")) {
        return ContactsGridExpanded;
      }
      if (this.mode === "grid" && !localStorage.getItem("pocketbase_auth")) {
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
      if (this.totalContacts >= 10) {
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
      if (this.modalMode === "create" && this.infoModalMode === "success") {
        return "Kontaktas sėkmingai sukurtas";
      }
      if (this.modalMode === "edit" && this.infoModalMode === "success") {
        return "Kontaktas sėkmingai redaguotas";
      }
      if (this.modalMode === "delete" && this.infoModalMode === "success") {
        return "Kontaktas sėkmingai ištrintas";
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
      "modalMode",
      "infoModalError",
      "totalContacts",
      "modalOpen",
      "infoModalMode",
      "deleteInfo",
      "modalType",
      "page",
      "currentUserPermissions",
    ]),
  },
  methods: {
    onGetContactsNumber(num) {
      this.getContactsNumber(num);
    },
    showContactNumbers() {
      this.contactNumbers = !this.contactNumbers;
    },
    toggleMode() {
      this.mode === "grid" ? (this.mode = "table") : (this.mode = "grid");
    },
    ...mapActions([
      "getContacts",
      "openModal",
      "getModalMode",
      "getModalType",
      "closeInfoModal",
      "deleteContact",
      "getContactsNumber",
    ]),
  },
  created() {
    this.getContacts();
  },
};
</script>
  
