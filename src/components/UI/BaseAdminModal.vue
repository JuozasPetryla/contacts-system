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
        class="flex flex-col space-y-8 mb-12"
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
        <div class="relative">
          <BaseInputField
            v-if="userModalMode === 'create'"
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
          <p
            v-if="emailInUseWarn && !emailIsValid"
            class="text-light-red absolute top-100"
          >
            El. pašto adresas jau yra naudojamas
          </p>
        </div>
      </div>
      <div
        class="space-y-6 flex flex-col"
        v-if="userModalMode === 'create' || userModalMode === 'editPermissions'"
      >
        <h2 class="text-2xl text-center w-64">Administracinės teisės:</h2>
        <md-checkbox class="md-primary" v-model="permissionsObj.edit_employees"
          >Redaguoti ir kurti kontaktus</md-checkbox
        >
        <md-checkbox
          class="md-primary"
          v-model="permissionsObj.delete_employees"
          >Trinti kontaktus</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="permissionsObj.edit_companies"
          >Redaguoti ir kurti įmones</md-checkbox
        >
        <md-checkbox
          class="md-primary"
          v-model="permissionsObj.delete_companies"
          >Trinti įmones</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="permissionsObj.edit_offices"
          >Redaguoti ir kurti ofisus</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="permissionsObj.delete_offices"
          >Trinti ofisus</md-checkbox
        >
        <md-checkbox class="md-primary" v-model="permissionsObj.edit_structure"
          >Redaguoti ir kurti struktūras</md-checkbox
        >
        <md-checkbox
          class="md-primary"
          v-model="permissionsObj.delete_structure"
          >Trinti struktūras</md-checkbox
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
    <div
      class="absolute top-3/4 ml-[7rem]"
      v-if="userModalMode === 'create' || userModalMode === 'edit'"
    >
      <BaseButton @click="openImageDrop">ĮKELTI NUOTRAUKĄ</BaseButton>
      <p v-if="file" class="mt-6">{{ file.name }}</p>
    </div>
  </md-dialog>
</template>
    
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "",
      nameIsValid: true,
      email: "",
      emailIsValid: true,
      formIsValid: true,
      emailInUseWarn: "",
    };
  },
  computed: {
    ...mapGetters([
      "userPermissions",
      "userModalOpen",
      "userModalMode",
      "userEditInfo",
      "file",
      "users",
    ]),
    permissionsObj: {
      get() {
        return this.userPermissions;
      },
      set(newValue) {
        this.setUserPermissions(newValue);
      },
    },
  },
  methods: {
    ...mapMutations(["setUserPermissions"]),
    ...mapActions([
      "closeUserModal",
      "createUser",
      "editUser",
      "editUserPermissions",
      "openImageDrop",
    ]),
    validateName() {
      if (this.name) {
        this.nameIsValid = true;
      } else {
        this.nameIsValid = false;
      }
    },
    validateEmail() {
      const emailInUse = this.users.find((user) => {
        return user.email === this.email;
      });
      if ((this.email.includes("@") && !emailInUse) || !this.email) {
        this.emailIsValid = true;
      } else if (emailInUse) {
        this.emailInUseWarn = "Email is already in use";
        this.emailIsValid = false;
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
        this.editUserPermissions(this.userPermissions);
      }
      if (!this.formIsValid) return;
      const password = this.generatePass();
      console.log(password);
      if (this.userModalMode === "create") {
        this.createUser({
          userPermissionsObj: this.userPermissions,
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
          emailVisibility: true,
          permissions_id: this.userEditInfo.permissions_id,
        });
      }

      this.name = "";
      this.email = "";
    },
    setFormValid() {
      this.formIsValid = true;
    },
  },
  watch: {
    "$store.state.userActions.userEditInfo": {
      deep: true,
      handler(value) {
        this.name = value.name;
      },
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