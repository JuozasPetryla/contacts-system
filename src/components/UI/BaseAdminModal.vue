<template>
  <md-dialog
    :md-active="userModalOpen"
    @md-clicked-outside="
      closeUserModal();
      setFormValid();
    "
    class="h-fit w-full mx-auto my-auto"
  >
    <form
      @submit.prevent="
        validateForm();
        formSubmit();
      "
      class="flex px-20 pt-20 pb-36 items-start space-x-12 pr-96"
    >
      <div
        class="mt-10 flex flex-col space-y-8"
        v-if="userModalMode === 'create' || userModalMode === 'edit'"
      >
        <h3 class="text-2xl text-start">Kontaktiniai duomenys:</h3>
        <BaseInputField
          :inputPlaceHolder="'Įvekite vardą...'"
          :inputId="'name'"
          :inputType="'text'"
          @blur="validateName"
          @input="validateName"
          class="relative"
          :class="{ invalid: !nameIsValid }"
          v-model="name"
          ><template #label>Vardas:</template>
          <template #image-right>
            <div class="w-6 bg-light-gray"></div>
          </template>
        </BaseInputField>
        <BaseInputField
          :inputPlaceHolder="'Įveskite el.paštą...'"
          :inputId="'email'"
          :inputType="'email'"
          @blur="validateEmail"
          @input="validateEmail"
          class="relative"
          :class="{ invalid: !emailIsValid }"
          v-model="email"
          ><template #label>Elektroninis paštas:</template>
          <template #image-left>
            <img src="../../assets/Mail.svg" alt="Mail icon" />
          </template>
        </BaseInputField>
        <BaseButton class="mx-auto">ĮKELTI NUOTRAUKĄ</BaseButton>
      </div>
      <div
        class="space-y-6 flex flex-col"
        v-if="userModalMode === 'create' || userModalMode === 'editPermissions'"
      >
        <h2 class="text-2xl text-center w-64">Administracinės teisės:</h2>
        <md-checkbox class="md-primary" v-model="edit_employees"
          >Redaguoti ir kurti kontaktus</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="delete_employees"
          >Trinti kontaktus</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="edit_companies"
          >Redaguoti ir kurti įmones</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="delete_companies"
          >Trinti įmones</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="edit_offices"
          >Redaguoti ir kurti ofisus</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="delete_offices"
          >Trinti ofisus</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="edit_structure"
          >Redaguoti ir kurti struktūras</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="delete_structure"
          >Trinti struktūras</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="read_permissions"
          >Skaityti admin paskyras</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="edit_permissions"
          >Redaguoti ir kurti administracines teises</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="delete_permissions"
          >Trinti admin paskyras</md-checkbox
        >
      </div>
      <div class="self-end">
        <BaseButton type="submit" class="absolute bottom-10 right-10">
          <slot name="actions"></slot>
        </BaseButton>
      </div>
    </form>
    <BaseIconButton
      class="absolute top-10 right-10"
      @click="
        closeUserModal();
        setFormValid();
      "
    >
      <img src="../../assets/Plus Math.svg" class="rotate-45" />
    </BaseIconButton>
  </md-dialog>
</template>
    
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      nameIsValid: true,
      email: "",
      emailIsValid: true,
      edit_employees: false,
      delete_employees: false,
      edit_offices: false,
      delete_offices: false,
      edit_structure: false,
      delete_structure: false,
      read_permissions: false,
      edit_permissions: false,
      delete_permissions: false,
      edit_companies: false,
      delete_companies: false,
      formIsValid: true,
    };
  },
  computed: {
    ...mapGetters(["userModalOpen", "userModalMode", "userEditInfo"]),
  },
  methods: {
    ...mapActions([
      "closeUserModal",
      "createUser",
      "editUser",
      "editUserPermissions",
    ]),
    validateName() {
      if (this.name) {
        this.nameIsValid = true;
      } else {
        this.nameIsValid = false;
      }
    },
    validateEmail() {
      if (this.email.includes("@")) {
        this.emailIsValid = true;
      } else {
        this.emailIsValid = false;
      }
    },
    validateForm() {
      this.validateName();
      this.validateEmail();
      if (this.nameIsValid && this.emailIsValid) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },
    generatePass() {
      let pass = "";
      let str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz0123456789@#$";

      for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random() * str.length + 1);

        pass += str.charAt(char);
      }

      return pass;
    },
    formSubmit() {
      if (this.userModalMode === "editPermissions") {
        this.editUserPermissions({
          id: this.userEditInfo.id,
          userPermissionsObj: {
            edit_employees: this.edit_employees,
            delete_employees: this.delete_employees,
            edit_offices: this.edit_offices,
            delete_offices: this.delete_offices,
            edit_structure: this.edit_structure,
            delete_structure: this.delete_structure,
            read_permissions: this.read_permissions,
            edit_permissions: this.edit_permissions,
            delete_permissions: this.delete_permissions,
            edit_companies: this.edit_companies,
            delete_companies: this.delete_companies,
          },
        });
      }
      if (!this.formIsValid) return;
      const password = this.generatePass();
      if (this.userModalMode === "create") {
        this.createUser({
          userPermissionsObj: {
            edit_employees: this.edit_employees,
            delete_employees: this.delete_employees,
            edit_offices: this.edit_offices,
            delete_offices: this.delete_offices,
            edit_structure: this.edit_structure,
            delete_structure: this.delete_structure,
            read_permissions: this.read_permissions,
            edit_permissions: this.edit_permissions,
            delete_permissions: this.delete_permissions,
            edit_companies: this.edit_companies,
            delete_companies: this.delete_companies,
          },
          userCreateObj: {
            name: this.name,
            email: this.email,
            emailVisibility: true,
            password: password,
            passwordConfirm: password,
          },
        });
      }
      if (this.userModalMode === "edit") {
        this.editUser({
          id: this.userEditInfo.id,
          name: this.name,
          email: this.email,
        });
      }

      this.name = "";
      this.email = "";
    },
    setFormValid() {
      this.formIsValid = true;
    },
  },
};
</script>
<style scoped>
.invalid::after {
  content: "";
  position: absolute;
  top: 32%;
  bottom: -1px;
  right: -1px;
  left: -1px;
  z-index: -1;
  border: 1px solid red;
}
</style>