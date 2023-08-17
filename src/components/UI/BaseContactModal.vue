<template>
  <md-dialog
    :md-active="contactModalOpen"
    @md-clicked-outside="closeContactModal"
    class="h-fit w-mxa mx-auto my-auto"
  >
    <form @submit.prevent="formSubmit">
      <div class="flex px-20 pt-20 pb-36 items-start space-x-12">
        <div class="flex flex-col space-y-6">
          <header class="font-medium text-lg">
            <slot name="header"> </slot>
          </header>

          <BaseInputField
            :inputPlaceHolder="'Įvekite vardą...'"
            :inputId="'name'"
            :inputType="'text'"
            v-model="name"
            @blur="validateName"
            :class="{ invalid: !nameIsValid }"
            ><template #label>Vardas:</template>
            <template #image-right>
              <div class="w-6 bg-light-gray"></div>
            </template>
          </BaseInputField>
          <BaseInputField
            :inputPlaceHolder="'Įveskite pavardę...'"
            :inputId="'surname'"
            :inputType="'text'"
            v-model="surname"
            @blur="validateSurname"
            :class="{ invalid: !surnameIsValid }"
            ><template #label>Pavardė:</template>
            <template #image-right>
              <div class="w-6 bg-light-gray"></div>
            </template>
          </BaseInputField>
          <BaseInputField
            :inputPlaceHolder="'Įveskite poziciją...'"
            :inputId="'position'"
            :inputType="'text'"
            v-model="position"
            @blur="validatePosition"
            :class="{ invalid: !positionIsValid }"
            ><template #label>Pozicija:</template>
            <template #image-right>
              <div class="w-6 bg-light-gray"></div>
            </template>
          </BaseInputField>
          <h2 class="text-3xl">Kontaktinė informacija:</h2>
          <BaseInputField
            :inputPlaceHolder="'Įveskite el.paštą...'"
            :inputId="'email'"
            :inputType="'email'"
            v-model="email"
            @blur="validateEmail"
            :class="{ invalid: !emailIsValid }"
            ><template #label>Elektroninis paštas:</template>
            <template #image-left>
              <img src="../../assets/Mail.svg" alt="Mail icon" />
            </template>
          </BaseInputField>
          <BaseInputField
            :inputPlaceHolder="'Įveskite telefono numerį...'"
            :inputId="'phone'"
            :inputType="'tel'"
            v-model="phone"
            ><template #label>Telefono numeris</template>
            <template #image-left>
              <img src="../../assets/Call Squared.svg" alt="Mail icon" />
            </template>
          </BaseInputField>
        </div>
        <div class="space-y-6">
          <h2 class="text-3xl text-center">Įmonės detalės:</h2>
          <div>
            <label for="imone">Įmonė:</label>
            <md-field class="md-elevation-4">
              <label for="imone" class="pl-4">Pasirinkite įmonę...</label>
              <md-select name="imone" id="imone" v-model="selectedCompany">
                <md-option
                  v-for="company in companies"
                  :key="company.id"
                  :value="company.id"
                  >{{ company.name }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div>
            <label for="imone">Padalinys:</label>
            <md-field class="md-elevation-4">
              <label for="padalinys" class="pl-4"
                >Pasirinkite diviziją...</label
              >
              <md-select
                name="padalinys"
                id="padalinys"
                v-model="selectedDivision"
              >
                <md-option
                  v-for="division in divisions"
                  :key="division.id"
                  :value="division.id"
                  >{{ division.name }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div>
            <label for="imone">Skyrius:</label>
            <md-field class="md-elevation-4">
              <label for="skyrius" class="pl-4"
                >Pasirinkite departamentą...</label
              >
              <md-select
                name="skyrius"
                id="skyrius"
                v-model="selectedDepartment"
              >
                <md-option
                  v-for="department in departments"
                  :key="department.id"
                  :value="department.id"
                  >{{ department.name }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div>
            <label for="imone">Grupė:</label>
            <md-field class="md-elevation-4">
              <label for="grupe" class="pl-4">Pasirinkite grupę...</label>
              <md-select
                name="grupe"
                id="grupe"
                class="w-80"
                v-model="selectedGroup"
              >
                <md-option
                  v-for="group in groups"
                  :key="group.id"
                  :value="group.id"
                  >{{ group.name }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="pb-14">
            <label for="ofisas">Ofisas:</label>
            <md-field class="md-elevation-4">
              <label for="ofisas" class="pl-4">Pasirinkite ofisą...</label>
              <md-select
                name="ofisas"
                id="ofisas"
                class="w-80"
                v-model="selectedOffice"
              >
                <md-option
                  v-for="office in offices"
                  :key="office.id"
                  :value="office.id"
                  >{{ office.name }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <BaseButton class="mx-auto">ĮKELTI NUOTRAUKĄ</BaseButton>
        </div>
        <div class="self-end">
          <BaseButton type="submit">
            <slot name="action"></slot>
          </BaseButton>
        </div>
      </div>
    </form>
    <BaseIconButton @click="closeContactModal" class="absolute top-10 right-10">
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
      surname: "",
      position: "",
      phone: "",
      email: "",
      selectedCompany: "",
      selectedDivision: "",
      selectedDepartment: "",
      selectedGroup: "",
      selectedOffice: "",
      nameIsValid: true,
      surnameIsValid: true,
      emailIsValid: true,
      positionIsValid: true,
      companyIsValid: true,
      officeIsValid: true,
      divisionIsValid: true,
    };
  },
  computed: {
    ...mapGetters([
      "contactModalOpen",
      "companies",
      "divisions",
      "departments",
      "groups",
      "offices",
    ]),
  },
  methods: {
    ...mapActions([
      "closeContactModal",
      "getCompanies",
      "getDivisions",
      "getDepartments",
      "getGroups",
      "getOffices",
    ]),

    validateForm() {
      this.validateEmail();
      this.validateCompany();
      this.validateDivision();
      this.validateEmail();
      this.validateName();
      this.validateOffice();
      this.validatePosition();
      if (
        this.emailIsValid &&
        this.surnameIsValid &&
        this.companyIsValid &&
        this.officeIsValid &&
        this.divisionIsValid &&
        this.nameIsValid &&
        this.surnameIsValid
      ) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },
    validateName() {
      if (this.name) {
        this.nameIsValid = true;
      } else {
        this.nameIsValid = false;
      }
    },
    validateSurname() {
      if (this.surname) {
        this.surnameIsValid = true;
      } else {
        this.surnameIsValid = false;
      }
    },
    validatePosition() {
      if (this.position) {
        this.positionIsValid = true;
      } else {
        this.positionIsValid = false;
      }
    },
    validateCompany() {
      if (this.selectedCompany) {
        this.companyIsValid = true;
      } else {
        this.companyIsValid = false;
      }
    },
    validateOffice() {
      if (this.selectedOffice) {
        this.officeIsValid = true;
      } else {
        this.officeIsValid = false;
      }
    },
    validateDivision() {
      if (this.selectedDivision) {
        this.divisionIsValid = true;
      } else {
        this.divisionIsValid = false;
      }
    },
    validateEmail() {
      if (this.email.includes("@")) {
        this.emailIsValid = true;
      } else {
        this.emailIsValid = false;
      }
    },
    formSubmit() {
      if (!this.formIsValid) return;
    },
  },
  created() {
    this.getCompanies();
    this.getDivisions();
    this.getDepartments();
    this.getGroups();
    this.getOffices();
  },
};
</script>

<style scoped>
.invalid {
  border: 1px solid red;
  background: rgba(255, 0, 0, 0.301);
}
</style>