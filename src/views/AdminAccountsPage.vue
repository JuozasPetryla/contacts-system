<template>
  <div class="px-12 my-8 w-full grid">
    <h3 class="text-5xl font-light mb-10 px-2">Sukūrti admin paskyrą</h3>
    <div class="flex space-x-6 items-center">
      <BaseIconButton
        class="h-12 w-12"
        @click="
          getUserModalMode('create');
          openUserModal();
        "
      >
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
      <p class="text-lg">Sukūrti naują administratorių</p>
    </div>
    <AdminsTable class="overflow-y-auto h-96 mb-24"></AdminsTable>
    <BaseAdminModal>
      <template #actions>
        <span v-if="userModalMode === 'create'">PRIDĖTI</span>
        <span v-if="userModalMode === 'editPermissions'">KEISTI LEIDIMUS</span>
        <span v-if="userModalMode === 'edit'">REDAGUOTI</span>
      </template>
    </BaseAdminModal>
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
              deleteUser(userDeleteInfo.id);
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
import { mapGetters, mapActions } from "vuex";
import AdminsTable from "../components/admins/AdminsTable.vue";
export default {
  components: {
    AdminsTable,
  },
  computed: {
    ...mapGetters([
      "infoModalMode",
      "companies",
      "totalUsers",
      "userModalMode",
      "userDeleteInfo",
    ]),
    totalUsersText() {
      if (this.totalUsers === 1) {
        return this.totalUsers + " įmonė";
      }
      if (this.totalUsers < 10 && this.totalUsers > 1) {
        return this.totalUsers + " įmonės";
      }
      if (this.totalUsers >= 10) {
        return this.totalUsers + " įmonių";
      }
    },
    infoModalText() {
      if (this.infoModalMode === "error") {
        return this.infoModalError;
      }
      if (this.infoModalMode === "delete") {
        return `Vardas: ${this.userDeleteInfo.name}`;
      }
      if (this.userModalMode === "create" && this.infoModalMode === "success") {
        return "Vartotojas sėkmingai sukurtas";
      }
      if (this.userModalMode === "edit" && this.infoModalMode === "success") {
        return "Vartotojas sėkmingai redaguotas";
      }
      if (this.userModalMode === "delete" && this.infoModalMode === "success") {
        return "Vartotojas sėkmingai ištrintas";
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
        return "Ar tikrai norite ištrinti vartotoją?";
      }
    },
  },

  methods: {
    ...mapActions([
      "closeInfoModal",
      "getUsers",
      "openUserModal",
      "getUserModalMode",
      "deleteUser",
    ]),
  },
  created() {
    this.getUsers();
  },
};
</script>
    