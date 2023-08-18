<template>
  <md-card class="mt-16">
    <div class="flex justify-between bg-light-gray">
      <p class="text-base px-12">Pavadinimas</p>
      <p class="text-base px-48">Veiksmas</p>
    </div>
    <ul class="flex flex-col space-y-5 mt-10 mb-6 justify-center">
      <li
        v-for="office in offices"
        :key="office.id"
        class="text-xl px-14 flex justify-between"
      >
        <h4>{{ office.name }}</h4>
        <div class="flex space-x-4">
          <BaseButton
            class="rounded-full"
            @click="
              getOfficeEditInfo(office);
              openOfficeModal();
              getOfficeModalMode('edit');
            "
            >Redaguoti</BaseButton
          >
          <BaseButton
            class="w-36 rounded-full bg-light-red hover:bg-dark-red"
            @click="
              getOfficeDeleteInfo(office);
              openInfoModal();
              getInfoModalMode('delete');
              getOfficeModalMode('delete');
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
      "getOffices",
      "getOfficeEditInfo",
      "getOfficeDeleteInfo",
      "openOfficeModal",
      "getOfficeModalMode",
      "openInfoModal",
      "getInfoModalMode",
    ]),
  },
  computed: {
    ...mapGetters(["offices"]),
  },
  created() {
    this.getOffices();
  },
};
</script>
    
    