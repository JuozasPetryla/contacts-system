<template>
  <md-dialog
    :md-active="contactModalOpen"
    @md-clicked-outside="closeContactModal"
    class="h-fit w-mxa mx-auto my-auto"
  >
    <form
      @submit.prevent="
        validateForm();
        formSubmit();
      "
    >
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
            class="relative"
            @blur="validateName"
            @input="validateName"
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
            class="relative"
            @blur="validateSurname"
            @input="validateSurname"
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
            class="relative"
            @blur="validatePosition"
            @input="validatePosition"
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
            class="relative"
            @blur="validateEmail"
            @input="validateEmail"
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
              <md-select
                name="imone"
                id="imone"
                class="pl-4"
                v-model="selectedCompany"
                :class="{ invalidSelect: !companyIsValid }"
                @md-selected="validateCompany"
                @blur="validateCompany"
              >
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
                class="pl-4"
                v-model="selectedDivision"
                :class="{ invalidSelect: !divisionIsValid }"
                @md-selected="validateDivision"
                @blur="validateDivision"
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
                class="pl-4"
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
                class="w-80 pl-4"
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
                class="w-80 pl-4"
                v-model="selectedOffice"
                :class="{ invalidSelect: !officeIsValid }"
                @md-selected="validateOffice"
                @blur="validateOffice"              >
                <md-option
                  v-for="office in offices"
                  :key="office.id"
                  :value="office.id"
                  >{{ office.name }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="relative">
            <p
              v-if="!formIsValid"
              class="text-light-red text-lg absolute -top-14 left-10"
            >
              Užpildykite reikiamus laukus
            </p>
            <BaseButton class="mx-auto">ĮKELTI NUOTRAUKĄ</BaseButton>
          </div>
        </div>
        <div class="self-end">
          <BaseButton :type="'submit'">
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
      formIsValid: true,
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
      "contactModalMode",
      "editInfo",
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
      "createContact",
      "editContact",
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
      if (this.contactModalMode === "create") {
        this.createContact({
          name: this.name,
          surname: this.surname,
          email: this.email,
          phone_number: this.phone,
          position: this.position,
          company_id: this.selectedCompany,
          office_id: this.selectedOffice,
          division_id: this.selectedDivision,
          department_id: this.selectedDepartment,
          group_id: this.selectedGroup,
        });
      }
      if (this.contactModalMode === "edit") {
        this.editContact({
          id: this.editInfo.id,
          name: this.name,
          surname: this.surname,
          email: this.email,
          phone_number: this.phone ? this.phone : this.editInfo.phone_number,
          position: this.position,
          company_id: this.selectedCompany,
          office_id: this.selectedOffice,
          division_id: this.selectedDivision,
          department_id: this.selectedDepartment
            ? this.selectedDepartment
            : this.editInfo.department_id,
          group_id: this.selectedGroup
            ? this.selectedGroup
            : this.editInfo.group_id,
        });
      }
      this.name = "";
      this.surname = "";
      this.position = "";
      this.phone = "";
      this.email = "";
      this.selectedCompany = "";
      this.selectedDivision = "";
      this.selectedDepartment = "";
      this.selectedGroup = "";
      this.selectedOffice = "";
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

.invalidSelect::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: -1px;
  left: -1px;
  z-index: -1;
  border: 1px solid red;
}
</style>