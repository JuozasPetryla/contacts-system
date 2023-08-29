<template>
  <div class="px-12 my-8 w-full grid">
    <h3 class="text-5xl font-light mb-10 px-2">Struktūra</h3>
    <div
      class="flex space-x-6 items-center"
      v-if="currentUserPermissions.edit_structure"
    >
      <BaseIconButton
        class="h-12 w-12"
        @click="
          openModal();
          getModalMode('create');
          getModalType('structure');
        "
      >
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
      <p class="text-lg">Pridėti naują struktūrą</p>
    </div>
    <div class="px-2 mt-8 flex items-center space-x-8">
      <div @click="getStructureModalFormMode('division')">
        <router-link
          @click="getStructureModalFormMode('division')"
          to="/structure-manage/divisions"
          >Padalinys</router-link
        >
      </div>

      <div @click="getStructureModalFormMode('department')">
        <router-link to="/structure-manage/departments">Skyrius</router-link>
      </div>
      <div @click="getStructureModalFormMode('group')">
        <router-link
          @click="getStructureModalFormMode('group')"
          to="/structure-manage/groups"
          >Grupė</router-link
        >
      </div>
    </div>
    <router-view class="overflow-y-auto h-96"></router-view>
    <BaseModal>
      <template #header>
        <h2 v-if="modalMode === 'edit'" class="text-4xl font-normal">
          Redaguoti struktūrą:
        </h2>
        <h2 v-if="modalMode === 'create'" class="text-4xl font-normal">
          Kurti naują struktūrą:
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
export default {
  methods: {
    ...mapActions([
      "openModal",
      "openStructureChooseModal",
      "getModalMode",
      "closeInfoModal",
      "deleteDivision",
      "deleteDepartment",
      "deleteGroup",
      "getStructureModalFormMode",
      "getModalType",
    ]),
  },
  computed: {
    ...mapGetters([
      "modalMode",
      "infoModalMode",
      "infoModalError",
      "divisionDeleteInfo",
      "departmentDeleteInfo",
      "groupDeleteInfo",
      "currentUserPermissions",
      "structureModalFormMode",
    ]),
    infoModalText() {
      if (
        this.infoModalMode === "error" &&
        (this.structureModalFormMode === "division" ||
          this.structureModalFormMode === "department" ||
          this.structureModalFormMode === "group")
      ) {
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
        this.modalMode === "create" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "division"
      ) {
        return "Padalinys sėkmingai sukurtas";
      }
      if (
        this.modalMode === "edit" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "division"
      ) {
        return "Padalinys sėkmingai redaguotas";
      }
      if (
        this.modalMode === "delete" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "division"
      ) {
        return "Padalinys sėkmingai ištrintas";
      }

      if (
        this.modalMode === "create" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "department"
      ) {
        return "Skyrius sėkmingai sukurtas";
      }
      if (
        this.modalMode === "edit" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "department"
      ) {
        return "Skyrius sėkmingai redaguotas";
      }
      if (
        this.modalMode === "delete" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "department"
      ) {
        return "Skyrius sėkmingai ištrintas";
      }

      if (
        this.modalMode === "create" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "group"
      ) {
        return "Grupė sėkmingai sukurta";
      }
      if (
        this.modalMode === "edit" &&
        this.infoModalMode === "success" &&
        this.structureModalFormMode === "group"
      ) {
        return "Grupė sėkmingai redaguota";
      }
      if (
        this.modalMode === "delete" &&
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
  
<style scoped>
a {
  display: grid;
  place-items: center;
  color: white !important;
  background: #0054a6;
  width: 7rem;
  height: 3rem;
  font-size: 1.2rem;
  border-radius: 12px;
}

a:hover {
  text-decoration: none;
  background: #1f3f77;
}
</style>