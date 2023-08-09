<template>
  <div class="px-12 my-8 w-full grid">
    <h3 class="text-5xl font-light mb-10 px-2">Sukūrti admin paskyrą</h3>
    <div class="flex space-x-6 items-center">
      <BaseIconButton class="h-12 w-12">
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
      <p class="text-lg">Sukūrti naują administratorių</p>
    </div>
    <AdminsTable></AdminsTable>
    <BaseAdminModal>

    </BaseAdminModal>
    <BaseInfoDialog>
      <template #header> Ar tikrai norite ištrinti administratorių? </template>
      <template #content> Vardas pavardė: Vardas pavardė </template>
      <template #actions>
        <md-button class="md-primary">NE</md-button>
        <md-button class="md-primary">TAIP</md-button>
      </template>
    </BaseInfoDialog>
  </div>
</template>
    
    <script>
import AdminsTable from "../components/admins/AdminsTable.vue";
export default {
  components: {
    AdminsTable,
  },
};
</script>
    