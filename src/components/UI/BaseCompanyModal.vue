<template>
  <md-dialog
    :md-active="companyModalOpen"
    @md-clicked-outside="closeCompanyModal"
    class="h-fit mx-auto my-auto"
  >
    <div class="flex px-20 pt-20 pb-20 items-start space-x-12 pr-96">
      <form
        @submit.prevent="
          validateForm();
          formSubmit();
        "
        class="flex flex-col space-y-10"
      >
        <header class="font-medium text-lg">
          <slot name="header">
            <h2 class="text-4xl font-normal">Redaguoti įmonę:</h2>
          </slot>
        </header>
        <BaseInputField
          :inputPlaceHolder="'Įvekite įmonę...'"
          :inputId="'imonė'"
          :inputType="'text'"
          v-model="name"
          @blur="validateName"
          @input="validateName"
          class="relative"
          :class="{ invalid: !nameIsValid }"
          ><template #label>Įmonės pavadinimas:</template>
        </BaseInputField>
        <p v-if="!nameIsValid" class="absolute text-light-red top-2/4">
          Įveskite įmonės pavadinimą
        </p>
        <BaseButton type="submit">
          <slot name="actionName"></slot>
        </BaseButton>
      </form>
    </div>
    <BaseIconButton class="absolute top-10 right-10" @click="closeCompanyModal">
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
      formIsValid: true,
    };
  },
  computed: {
    ...mapGetters(["companyModalOpen", "companyModalMode", "companyEditInfo"]),
  },
  methods: {
    ...mapActions(["closeCompanyModal", "createCompany", "editCompany"]),
    validateName() {
      if (this.name) {
        this.nameIsValid = true;
      } else {
        this.nameIsValid = false;
      }
    },
    validateForm() {
      this.validateName();
      if (this.nameIsValid) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },
    formSubmit() {
      if (!this.formIsValid) return;
      if (this.companyModalMode === "create") {
        this.createCompany({
          name: this.name,
        });
      }
      if (this.companyModalMode === "edit") {
        this.editCompany({
          id: this.companyEditInfo.id,
          name: this.name,
        });
      }
      this.name = "";
    },
  },
  watch: {
    "$store.state.companiesActions.companyEditInfo": {
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