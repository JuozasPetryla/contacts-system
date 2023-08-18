<template>
  <div class="px-12 my-8 w-full grid">
    <h3 class="text-5xl font-light mb-10 px-2">Struktūra</h3>
    <div class="flex space-x-6 items-center">
      <BaseIconButton class="h-12 w-12" @click="openStructureChooseModal()">
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
      <p class="text-lg">Pridėti naują struktūrą</p>
    </div>
    <StructureTable class="overflow-y-auto h-96"></StructureTable>
    <BaseStructureModal>
      <template #header>
        <h2 v-if="structureModalMode === 'edit'" class="text-4xl font-normal">
          Redaguoti struktūrą:
        </h2>
        <h2 v-if="structureModalMode === 'create'" class="text-4xl font-normal">
          Kurti naują struktūrą:
        </h2>
      </template>
      <template #action>
        <span v-if="structureModalMode === 'edit'">REDAGUOTI</span>
        <span v-if="structureModalMode === 'create'">KURTI NAUJĄ</span>
      </template>
    </BaseStructureModal>
    <BaseStructureChooseModal>
      <template #header> Pasirinkite struktūrą </template>
    </BaseStructureChooseModal>
    <BaseInfoDialog>
      <template #header> {{ infoModalHeader }} </template>
      <template #content>
        {{ infoModalText }}
      </template>
      <template #actions>
        <div v-if="infoModalMode === 'delete'">
          <md-button @click="closeInfoModal" class="md-primary">NE</md-button>

          <md-button
            v-if="structureModalFormMode === 'division'"
            @click="
              closeInfoModal();
              deleteDivision(divisionDeleteInfo.id);
            "
            class="md-primary"
            >TAIP</md-button
          >
          <md-button
            v-if="structureModalFormMode === 'department'"
            @click="
              closeInfoModal();
              deleteDepartment(departmentDeleteInfo.id);
            "
            class="md-primary"
            >TAIP</md-button
          >
          <md-button
            v-if="structureModalFormMode === 'group'"
            @click="
              closeInfoModal();
              deleteGroup(groupDeleteInfo.id);
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
import StructureTable from "../components/structure/StructureTable.vue";
export default {
  components: {
    StructureTable,
  },
  methods: {
    ...mapActions([
      "openStructureModal",
      "openStructureChooseModal",
      "getStructureModalMode",
      "closeInfoModal",

      "deleteDivision",
      "deleteDepartment",
      "deleteGroup",
    ]),
  },
  computed: {
    ...mapGetters([
      "structureModalMode",
      "infoModalMode",
      "infoModalError",
      "divisionDeleteInfo",
      "departmentDeleteInfo",
      "groupDeleteInfo",
      "structureModalFormMode",
    ]),
    infoModalText() {
      if (this.infoModalMode === "error") {
        return this.infoModalError;
      }

      if (
        this.infoModalMode === "delete" &&
        this.structureModalFormMode === "division"
      ) {
        return `Padalinys: ${this.divisionDeleteInfo.name}`;
      }
      if (
        this.infoModalMode === "delete" &&
        this.structureModalFormMode === "department"
      ) {
        return `Skyrius: ${this.departmentDeleteInfo.name}`;
      }
      if (
        this.infoModalMode === "delete" &&
        this.structureModalFormMode === "group"
      ) {
        return `Grupė: ${this.groupDeleteInfo.name}`;
      }

      if (
        this.structureModalMode === "create" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "division"
      ) {
        return "Padalinys sėkmingai sukurtas";
      }
      if (
        this.structureModalMode === "edit" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "division"
      ) {
        return "Padalinys sėkmingai redaguotas";
      }
      if (
        this.structureModalMode === "delete" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "division"
      ) {
        return "Padalinys sėkmingai ištrintas";
      }

      if (
        this.structureModalMode === "create" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "department"
      ) {
        return "Skyrius sėkmingai sukurtas";
      }
      if (
        this.structureModalMode === "edit" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "department"
      ) {
        return "Skyrius sėkmingai redaguotas";
      }
      if (
        this.structureModalMode === "delete" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "department"
      ) {
        return "Skyrius sėkmingai ištrintas";
      }

      if (
        this.structureModalMode === "create" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "group"
      ) {
        return "Grupė sėkmingai sukurta";
      }
      if (
        this.structureModalMode === "edit" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "group"
      ) {
        return "Grupė sėkmingai redaguota";
      }
      if (
        this.structureModalMode === "delete" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "group"
      ) {
        return "Grupė sėkmingai ištrinta";
      }
    },

    infoModalHeader() {
      if (this.infoModalMode === "success") {
        return "Pavyko";
      }
      if (this.infoModalMode === "error") {
        return "Klaida";
      }
      if (
        this.infoModalMode === "delete" &&
        this.structureModalFormMode === "office"
      ) {
        return "Ar tikrai norite ištrinti ofisą?";
      }
      if (
        this.infoModalMode === "delete" &&
        this.structureModalFormMode === "division"
      ) {
        return "Ar tikrai norite ištrinti padalinį?";
      }
      if (
        this.infoModalMode === "delete" &&
        this.structureModalFormMode === "department"
      ) {
        return "Ar tikrai norite ištrinti skyrių?";
      }
      if (
        this.infoModalMode === "delete" &&
        this.structureModalFormMode === "group"
      ) {
        return "Ar tikrai norite ištrinti grupę?";
      }
    },
  },
};
</script>
  