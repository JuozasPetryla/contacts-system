<template>
  <md-card class="my-16">
    <div class="flex justify-between bg-light-gray sticky top-0">
      <p class="text-base px-12">Pavadinimas</p>
      <p class="text-base px-48">Veiksmas</p>
    </div>
    <h3 class="px-14 mt-10 text-3xl font-medium">Skyriai:</h3>
    <ul class="flex flex-col space-y-5 mt-6 mb-6 pb-6 justify-center">
      <li
        v-for="department in departmentsForDisplay"
        :key="department.id"
        class="text-xl px-14 flex justify-between"
      >
        <h4>{{ department.name }}</h4>
        <div class="flex space-x-4">
          <BaseButton
            v-if="currentUserPermissions.edit_structure"
            class="rounded-full"
            @click="
              getDepartmentEditInfo(department);
              openModal();
              getStructureModalFormMode('department');
              getModalMode('edit');
              getModalType('structure');
            "
            >Redaguoti</BaseButton
          >
          <BaseButton
            v-if="currentUserPermissions.delete_structure"
            class="w-36 rounded-full bg-light-red hover:bg-dark-red"
            @click="
              getDepartmentDeleteInfo(department);
              openInfoModal();
              getStructureModalFormMode('department');
              getModalMode('delete');
              getInfoModalMode('delete');
              getModalType('structure');
            "
            >Ištrinti</BaseButton
          >
        </div>
      </li>
    </ul>
  </md-card>
</template>
    
    <script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions([
      "getDepartmentEditInfo",
      "getStructureModalFormMode",
      "openModal",
      "getModalMode",
      "getModalType",
      "openInfoModal",
      "getInfoModalMode",
      "getDepartmentDeleteInfo",
      "getDepartmentsForDisplay",
    ]),
  },
  computed: {
    ...mapGetters(["departmentsForDisplay", "currentUserPermissions"]),
  },
  created() {
    this.getDepartmentsForDisplay();
  },
};
</script>
    
    