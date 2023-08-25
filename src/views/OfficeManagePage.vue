<template>
  <div class="px-12 my-8 w-full grid">
    <h3 class="text-5xl font-light mb-10 px-2">Ofisai</h3>
    <div class="flex space-x-6 items-center">
      <BaseIconButton
        class="h-12 w-12"
        @click="
          openModal();
          getModalMode('create');
          getModalType('office');
        "
      >
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
      <p class="text-lg">Pridėti naują ofisą</p>
    </div>
    <OfficesTable class="overflow-y-auto h-96 mb-24"></OfficesTable>
    <BaseModal>
      <template #header>
        <h2 v-if="modalMode === 'edit'" class="text-4xl font-normal">
          Redaguoti ofisą:
        </h2>
        <h2 v-if="modalMode === 'create'" class="text-4xl font-normal">
          Kurti naują ofisą:
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
              deleteOffice(officeDeleteInfo.id);
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
import OfficesTable from "../components/offices/OfficesTable.vue";
export default {
  components: {
    OfficesTable,
  },
  computed: {
    ...mapGetters([
      "infoModalMode",
      "offices",
      "modalMode",
      "officeDeleteInfo",
    ]),
    infoModalText() {
      if (this.infoModalMode === "error") {
        return this.infoModalError;
      }
      if (this.infoModalMode === "delete") {
        return `Pavadinimas: ${this.officeDeleteInfo.name}`;
      }
      if (this.modalMode === "create" && this.infoModalMode === "success") {
        return "Ofisas sėkmingai sukurtas";
      }
      if (this.modalMode === "edit" && this.infoModalMode === "success") {
        return "Ofisas sėkmingai redaguotas";
      }
      if (this.modalMode === "delete" && this.infoModalMode === "success") {
        return "Ofisas sėkmingai ištrintas";
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
        return "Ar tikrai norite ištrinti ofisą?";
      }
    },
  },

  methods: {
    ...mapActions([
      "closeInfoModal",
      "getOffices",
      "openModal",
      "getModalMode",
      "getModalType",
      "deleteOffice",
    ]),
  },
  created() {
    this.getOffices();
  },
};
</script>
    