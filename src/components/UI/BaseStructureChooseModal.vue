<template>
  <md-dialog
    :md-active="structureChooseModalOpen"
    @md-clicked-outside="closeStructureChooseModal"
    class="flex flex-col py-24 w-full"
  >
    <div class="w-96 items-center justify-center">
      <header class="px-6 py-6 font-medium text-3xl">
        <slot name="header"></slot>
      </header>
      <div class="px-2 pb-12 flex items-center flex-col space-y-8">
        <BaseButton
          @click="
            closeStructureChooseModal();
            openModal();
            getModalMode('create');
            getModalType('structure');
            getStructureModalFormMode('division');
          "
          >Padalinys</BaseButton
        >
        <BaseButton
          @click="
            closeStructureChooseModal();
            openModal();
            getModalMode('create');
            getModalType('structure');
            getStructureModalFormMode('department');
          "
          >Skyrius</BaseButton
        >
        <BaseButton
          @click="
            closeStructureChooseModal();
            openModal();
            getModalMode('create');
            getModalType('structure');
            getStructureModalFormMode('group');
          "
          >Grupė</BaseButton
        >
      </div>
    </div>
    <BaseIconButton
      @click="closeStructureChooseModal"
      class="absolute top-5 right-5"
    >
      <img src="../../assets/Plus Math.svg" class="rotate-45" />
    </BaseIconButton>
  </md-dialog>
</template>
  
  <script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["structureChooseModalOpen"]),
  },
  methods: {
    ...mapActions([
      "closeStructureChooseModal",
      "openModal",
      "getModalMode",
      "getModalType",
      "getStructureModalFormMode",
    ]),
  },
};
</script>