<template>
  <md-dialog
    :md-active="modalOpen"
    @md-clicked-outside="closeModal"
    class="h-fit w-mxa mx-auto my-auto"
  >
    <div class="relative">
      <header class="font-normal text-4xl absolute left-24 top-20">
        <slot name="header"></slot>
      </header>
      <component :is="formComponent"></component>
      <BaseIconButton @click="closeModal()" class="absolute top-10 right-10">
        <img src="../../assets/Plus Math.svg" class="rotate-45" />
      </BaseIconButton>
      <div
        class="absolute top-3/4 ml-[31rem]"
        v-if="
          (modalType === 'contact' || modalType === 'user') &&
          modalMode !== 'editPermissions'
        "
      >
        <BaseButton
          @click="openImageDrop"
          :class="{ userPhotos: modalType === 'user' }"
          >ĮKELTI NUOTRAUKĄ</BaseButton
        >
      </div>
    </div>
  </md-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ContactForm from "../contacts/ContactForm.vue";
import CompanyForm from "../companies/CompanyForm.vue";
import OfficeForm from "../offices/OfficeForm.vue";
import StructureForm from "../structure/StructureForm.vue";
import AdminForm from "../admins/AdminForm.vue";
import ChangePasswordForm from "../password/ChangePasswordForm.vue";
export default {
  components: {
    ContactForm,
    CompanyForm,
    OfficeForm,
    StructureForm,
    AdminForm,
    ChangePasswordForm,
  },
  methods: {
    ...mapActions(["closeModal", "openImageDrop"]),
  },
  computed: {
    ...mapGetters(["modalOpen", "modalType", "modalMode"]),
    formComponent() {
      if (this.modalType === "pass" && this.modalMode === "pass") {
        return ChangePasswordForm;
      }
      if (this.modalType === "contact") {
        return ContactForm;
      }
      if (this.modalType === "company") {
        return CompanyForm;
      }
      if (this.modalType === "office") {
        return OfficeForm;
      }
      if (this.modalType === "structure") {
        return StructureForm;
      }
      if (this.modalType === "user") {
        return AdminForm;
      }
    },
  },
};
</script>
    
<style scoped>
.userPhotos {
  position: absolute;
  top: 1rem;
  right: 6rem;
}
</style>