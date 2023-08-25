<template>
  <div class="flex mr-20 px-20 pt-20 pb-20 items-start space-x-12 pr-96">
    <form
      @submit.prevent="
        validateForm();
        formSubmit();
      "
      class="flex flex-col space-y-10"
    >
      <BaseInputField
        :inputPlaceHolder="'Įveskite įmonę...'"
        :inputId="'imonė'"
        :inputType="'text'"
        v-model="name"
        @blur="validateName"
        @input="validateName"
        class="relative mt-24"
        :class="{ invalid: !nameIsValid }"
        ><template #label>Įmonės pavadinimas:</template>
      </BaseInputField>
      <p v-if="!nameIsValid" class="absolute text-light-red top-52">
        Įveskite įmonės pavadinimą
      </p>
      <div class="absolute bottom-20 right-16">
        <BaseButton :type="'submit'">
          {{ modalMode === "edit" ? "REDAGUOTI" : "KURTI NAUJĄ" }}
        </BaseButton>
      </div>
    </form>
  </div>
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
    ...mapGetters(["modalMode", "companyEditInfo"]),
  },
  methods: {
    ...mapActions(["createCompany", "editCompany", "closeModal"]),
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
      if (this.modalMode === "create") {
        this.createCompany({
          name: this.name,
        });
      }
      if (this.modalMode === "edit") {
        console.log(this.companyEditInfo);
        this.editCompany({
          id: this.companyEditInfo.id,
          name: this.name,
        });
      }
      this.name = "";
      this.closeModal();
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