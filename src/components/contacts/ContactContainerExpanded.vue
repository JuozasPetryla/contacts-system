<template>
  <div @click="$emit('click')">
    <md-card class="w-11/12 hover-card">
      <div class="flex space-x-4 items-center px-2 py-8">
        <img src="../../assets/Test Account.svg" alt="Blank account icon" />
        <div>
          <h3 class="font-medium">
            <slot name="name">Vardas ir pavarde</slot>
          </h3>
          <p><slot name="position">Pozicija: pozicija</slot></p>
        </div>
      </div>
      <div class="flex flex-col space-y-2 pl-4 pb-6">
        <slot name="contact-info">
          <p>Telefono nr: +000000000000</p>
          <p>El. paštas: example@gmail.com</p>
          <p>Adresas: Saltoniskiu g. 2, Vilnius</p>
        </slot>
      </div>
      <div class="flex space-x-4 pl-4 pb-8">
        <BaseIconButton
          v-if="currentUserPermissions.edit_employees"
          @click="
            openContactModal();
            getContactModalMode('edit');
            getEditInfo(info);
          "
        >
          <img
            class="md-icon md-size-1x"
            src="../../assets/Pencil Drawing.svg"
          />
        </BaseIconButton>
        <BaseIconButton
          v-if="currentUserPermissions.delete_employees"
          class="bg-light-red hover:bg-dark-red"
          @click="
            getInfoModalMode('delete');
            openInfoModal();
            getContactModalMode('delete');
            getDeleteInfo(info);
          "
        >
          <img class="md-icon md-size-1x" src="../../assets/Trash Can.svg" />
        </BaseIconButton>
      </div>
    </md-card>
  </div>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  methods: {
    ...mapActions([
      "openContactModal",
      "getInfoModalMode",
      "openInfoModal",
      "getContactModalMode",
      "getDeleteInfo",
      "getEditInfo",
    ]),
  },
  computed: {
    ...mapGetters(["currentUserPermissions"]),
  },
};
</script>


<style scoped>
.hover-card {
  transition: all 0.3s ease;
}

.hover-card:hover,
.hover-card:active {
  transform: translateY(-1%);
  cursor: pointer;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);
}
</style>
