<template>
  <md-card class="mt-16">
    <div class="flex justify-between bg-light-gray">
      <p class="text-base px-12">Pavadinimas</p>
      <p class="text-base px-48">Veiksmas</p>
    </div>
    <ul class="flex flex-col space-y-5 mt-10 mb-6 justify-center">
      <li
        v-for="office in officesForDisplay"
        :key="office.id"
        class="text-xl px-14 flex justify-between"
      >
        <h4>{{ office.name }}</h4>
        <div class="flex space-x-4">
          <BaseButton
            v-if="currentUserPermissions.edit_offices"
            class="rounded-full"
            @click="
              openModal();
              getModalMode('edit');
              getModalType('office');
              getOfficeEditInfo(office);
            "
            >Redaguoti</BaseButton
          >
          <BaseButton
            v-if="currentUserPermissions.delete_offices"
            class="w-36 rounded-full bg-light-red hover:bg-dark-red"
            @click="
              getOfficeDeleteInfo(office);
              openInfoModal();
              getInfoModalMode('delete');
              getModalType('office');
              getModalMode('delete');
            "
            >Ištrinti</BaseButton
          >
        </div>
      </li>
    </ul>
  </md-card>
</template>
    
    <script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions([
      "getOfficesForDisplay",
      "getOfficeEditInfo",
      "getOfficeDeleteInfo",
      "openModal",
      "getModalMode",
      "getModalType",
      "openInfoModal",
      "getInfoModalMode",
    ]),
  },
  computed: {
    ...mapGetters(["officesForDisplay", "currentUserPermissions"]),
  },
  created() {
    this.getOfficesForDisplay();
  },
};
</script>
    
    