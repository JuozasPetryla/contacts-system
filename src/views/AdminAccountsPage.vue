<template>
  <div class="px-12 my-8 w-full grid">
    <h3 class="text-5xl font-light mb-10 px-2">Sukūrti admin paskyrą</h3>
    <div class="flex space-x-6 items-center">
      <BaseIconButton
        class="h-12 w-12"
        @click="
          getModalMode('create');
          getModalType('user');
          openModal();
        "
      >
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
      <p class="text-lg">Sukūrti naują administratorių</p>
    </div>
    <AdminsTable class="overflow-y-auto h-96 mb-24"></AdminsTable>
    <BaseModal> </BaseModal>
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
              getModalMode('delete');
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
      "modalMode",
      "userDeleteInfo",
      "infoModalError",
    ]),
    infoModalText() {
      if (this.infoModalMode === "error") {
        return this.infoModalError;
      }
      if (this.infoModalMode === "delete") {
        return `Vardas: ${this.userDeleteInfo.name}`;
      }
      if (this.modalMode === "create" && this.infoModalMode === "success") {
        return "Vartotojas sėkmingai sukurtas";
      }
      if (this.modalMode === "edit" && this.infoModalMode === "success") {
        return "Vartotojas sėkmingai redaguotas";
      }
      if (
        this.modalMode === "editPermissions" &&
        this.infoModalMode === "success"
      ) {
        return "Vartotojo leidimai sėkmingai redaguoti";
      }
      if (this.modalMode === "delete" && this.infoModalMode === "success") {
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
      "openModal",
      "getModalMode",
      "deleteUser",
      "getModalType",
    ]),
  },
  created() {
    this.getUsers();
  },
};
</script>
    