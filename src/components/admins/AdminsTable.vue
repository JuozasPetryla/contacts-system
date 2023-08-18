<template>
  <md-card class="mt-16">
    <div class="flex justify-between bg-light-gray">
      <p class="text-base pl-12">Vardas</p>
      <p class="text-base">El. paštas</p>
      <p class="text-base px-48">Veiksmas</p>
    </div>
    <ul class="flex flex-col space-y-5 mt-10 mb-6 justify-center">
      <li
        v-for="user in users"
        :key="user.id"
        class="text-xl px-14 flex justify-between space-x-36"
      >
        <div class="flex justify-between w-full">
          <h4>{{ user.name }}</h4>
          <h4 class="">{{ user.email }}</h4>
        </div>
        <div class="flex space-x-4 pl-12">
          <BaseButton
            class="rounded-full"
            @click="
              openUserModal();
              getUserModalMode('editPermissions');

              getUserEditInfo(user);
            "
            >Keisti leidimus</BaseButton
          >
          <BaseButton
            class="rounded-full"
            @click="
              openUserModal();
              getUserModalMode('edit');
              getUserEditInfo(user);
            "
            >Modifikuoti</BaseButton
          >
          <BaseButton
            class="rounded-full w-24 bg-light-red hover:bg-dark-red"
            @click="
              openInfoModal();
              getInfoModalMode('delete');
              getUserModalMode('editPermissions');
              getUserDeleteInfo(user);
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
      "getUsers",
      "getUserModalMode",
      "getUserEditInfo",
      "getUserDeleteInfo",
      "openInfoModal",
      "getInfoModalMode",
      "openUserModal",
    ]),
  },
  computed: {
    ...mapGetters(["users"]),
  },
  created() {
    this.getUsers();
    this.getUserPermissions()
  },
};
</script>
  
  