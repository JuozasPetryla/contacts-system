<template>
  <form
    @submit.prevent="
      validateForm();
      formSubmit();
    "
  >
    <div class="flex px-20 pt-20 pb-36 items-start space-x-12">
      <div class="flex flex-col space-y-6 mt-10 mr-20">
        <header class="font-medium text-lg">
          <slot name="header"> </slot>
        </header>
        <BaseInputField
          v-if="structureModalFormMode === 'division'"
          :inputPlaceHolder="'Įveskite padalinį...'"
          :inputId="'division'"
          :inputType="'text'"
          v-model="division"
          class="relative"
          @blur="validateDivision"
          @input="validateDivision"
          :class="{ invalid: !divisionIsValid }"
          ><template #label>Padalinys:</template>
          <template #image-right>
            <div class="w-6 bg-light-gray"></div>
          </template>
        </BaseInputField>
        <BaseInputField
          v-if="structureModalFormMode === 'department'"
          :inputPlaceHolder="'Įveskite skyrių...'"
          :inputId="'department'"
          :inputType="'text'"
          v-model="department"
          class="relative"
          @blur="validateDepartment"
          @input="validateDepartment"
          :class="{ invalid: !departmentIsValid }"
          ><template #label>Skyrius:</template>
          <template #image-right>
            <div class="w-6 bg-light-gray"></div>
          </template>
        </BaseInputField>
        <BaseInputField
          v-if="structureModalFormMode === 'group'"
          :inputPlaceHolder="'Įveskite grupę...'"
          :inputId="'group'"
          :inputType="'text'"
          v-model="group"
          class="relative"
          @blur="validateGroup"
          @input="validateGroup"
          :class="{ invalid: !groupIsValid }"
          ><template #label>Grupė:</template>
          <template #image-right>
            <div class="w-6 bg-light-gray"></div>
          </template>
        </BaseInputField>
      </div>
      <div class="space-y-6 pt-16">
        <div v-if="structureModalFormMode === 'division'">
          <label for="ofisas">Ofisas:</label>
          <md-field class="md-elevation-4">
            <label for="ofisas" class="pl-4">Pasirinkite ofisą...</label>
            <md-select
              name="ofisas"
              id="ofisas"
              class="pl-4"
              v-model="selectedOffice"
              :class="{ invalidSelect: !selectedOfficeIsValid }"
              @md-selected="validateSelectedOffice"
              @blur="validateSelectedOffice"
            >
              <md-option
                v-for="office in officesForDisplay"
                :key="office.id"
                :value="office.id"
                >{{ office.name }}</md-option
              >
            </md-select>
          </md-field>
        </div>
        <div v-if="structureModalFormMode === 'department'">
          <label for="imone">Padalinys:</label>
          <md-field class="md-elevation-4">
            <label for="padalinys" class="pl-4">Pasirinkite diviziją...</label>
            <md-select
              name="padalinys"
              id="padalinys"
              class="pl-4"
              v-model="selectedDivision"
              :class="{ invalidSelect: !selectedDivisionIsValid }"
              @md-selected="validateSelectedDivision"
              @blur="validateSelectedDivision"
            >
              <md-option
                v-for="division in divisionsForDisplay"
                :key="division.id"
                :value="division.id"
                >{{ division.name }}</md-option
              >
            </md-select>
          </md-field>
        </div>
        <div v-if="structureModalFormMode === 'group'">
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
              :class="{ invalidSelect: !selectedDepartmentIsValid }"
              @md-selected="validateSelectedDepartment"
              @blur="validateSelectedDepartment"
            >
              <md-option
                v-for="department in departmentsForDisplay"
                :key="department.id"
                :value="department.id"
                >{{ department.name }}</md-option
              >
            </md-select>
          </md-field>
        </div>

        <div class="relative">
          <p
            v-if="!formIsValid"
            class="text-light-red text-md absolute top-0 left-8"
          >
            Užpildykite reikiamus laukus
          </p>
        </div>
      </div>
      <div class="absolute bottom-16 right-16">
        <BaseButton :type="'submit'">
          {{ modalMode === "edit" ? "REDAGUOTI" : "KURTI NAUJĄ" }}
        </BaseButton>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      division: "",
      department: "",
      group: "",
      selectedCompany: "",
      selectedOffice: "",
      selectedDivision: "",
      selectedDepartment: "",
      divisionIsValid: true,
      departmentIsValid: true,
      groupIsValid: true,
      selectedOfficeIsValid: true,
      selectedDivisionIsValid: true,
      selectedDepartmentIsValid: true,
      formIsValid: true,
    };
  },
  computed: {
    ...mapGetters([
      "modalOpen",
      "divisionsForDisplay",
      "departmentsForDisplay",
      "groupsForDisplay",
      "officesForDisplay",
      "modalMode",
      "divisionEditInfo",
      "departmentEditInfo",
      "groupEditInfo",
      "structureModalFormMode",
    ]),
  },
  methods: {
    ...mapActions([
      "getCompanies",
      "getDivisionsForDisplay",
      "getDepartmentsForDisplay",
      "getGroupsForDisplay",
      "getOfficesForDisplay",
      "createDivision",
      "editDivision",
      "createDepartment",
      "editDepartment",
      "createGroup",
      "editGroup",
      "closeModal",
    ]),
    setFormIsValid() {
      this.divisionIsValid = true;
      this.departmentIsValid = true;
      this.groupIsValid = true;
      this.selectedOfficeIsValid = true;
      this.selectedDivisionIsValid = true;
      this.selectedDepartmentIsValid = true;
      this.formIsValid = true;
    },
    validateForm() {
      if (this.structureModalFormMode === "division") {
        this.validateDivision();
        this.validateSelectedOffice();
        if (this.divisionIsValid && this.selectedOfficeIsValid) {
          this.formIsValid = true;
        } else {
          this.formIsValid = false;
        }
      }
      if (this.structureModalFormMode === "department") {
        this.validateDepartment();
        this.validateSelectedDivision();
        if (this.departmentIsValid && this.selectedDivisionIsValid) {
          this.formIsValid = true;
        } else {
          this.formIsValid = false;
        }
      }
      if (this.structureModalFormMode === "group") {
        this.validateGroup();
        this.validateSelectedDepartment();
        if (this.groupIsValid && this.selectedDepartmentIsValid) {
          this.formIsValid = true;
        } else {
          this.formIsValid = false;
        }
      }
    },

    validateDivision() {
      if (this.division) {
        this.divisionIsValid = true;
      } else {
        this.divisionIsValid = false;
      }
    },
    validateDepartment() {
      if (this.department) {
        this.departmentIsValid = true;
      } else {
        this.departmentIsValid = false;
      }
    },
    validateGroup() {
      if (this.group) {
        this.groupIsValid = true;
      } else {
        this.groupIsValid = false;
      }
    },
    validateSelectedCompany() {
      if (this.selectedCompany) {
        this.selectedCompanyIsValid = true;
      } else {
        this.selectedCompanyIsValid = false;
      }
    },
    validateSelectedOffice() {
      if (this.selectedOffice) {
        this.selectedOfficeIsValid = true;
      } else {
        this.selectedOfficeIsValid = false;
      }
    },
    validateSelectedDivision() {
      if (this.selectedDivision) {
        this.selectedDivisionIsValid = true;
      } else {
        this.selectedDivisionIsValid = false;
      }
    },
    validateSelectedDepartment() {
      if (this.selectedDepartment) {
        this.selectedDepartmentIsValid = true;
      } else {
        this.selectedDepartmentIsValid = false;
      }
    },

    formSubmit() {
      if (!this.formIsValid) return;

      if (
        this.structureModalFormMode === "division" &&
        this.modalMode === "create"
      ) {
        this.createDivision({
          divisionCreateObj: {
            name: this.division,
          },
          office_id: this.selectedOffice,
        });
        this.division = "";
        this.selectedOffice = "";
      }
      if (
        this.structureModalFormMode === "division" &&
        this.modalMode === "edit"
      ) {
        this.editDivision({
          divisionEditObj: {
            id: this.divisionEditInfo.id,
            name: this.division,
          },
          office_id: this.selectedOffice,
        });
        this.division = "";
        this.selectedOffice = "";
      }

      if (
        this.structureModalFormMode === "department" &&
        this.modalMode === "create"
      ) {
        this.createDepartment({
          departmentCreateObj: {
            name: this.department,
          },
          division_id: this.selectedDivision,
        });
        this.department = "";
        this.selectedDivision = "";
      }
      if (
        this.structureModalFormMode === "department" &&
        this.modalMode === "edit"
      ) {
        this.editDepartment({
          departmentEditObj: {
            id: this.departmentEditInfo.id,
            name: this.department,
          },
          division_id: this.selectedDivision,
        });
        this.department = "";
        this.selectedDivision = "";
      }

      if (
        this.structureModalFormMode === "group" &&
        this.modalMode === "create"
      ) {
        this.createGroup({
          groupCreateObj: {
            name: this.group,
          },
          department_id: this.selectedDepartment,
        });
        this.group = "";
        this.selectedDepartment = "";
      }
      if (
        this.structureModalFormMode === "group" &&
        this.modalMode === "edit"
      ) {
        this.editGroup({
          groupEditObj: {
            id: this.groupEditInfo.id,
            name: this.group,
          },
          department_id: this.selectedDepartment,
        });
        this.group = "";
        this.selectedDepartment = "";
      }
      this.closeModal();
    },
  },
  created() {
    this.getCompanies();
    this.getDivisionsForDisplay();
    this.getDepartmentsForDisplay();
    this.getGroupsForDisplay();
    this.getOfficesForDisplay();
  },
  watch: {
    "$store.state.divisionsActions.divisionEditInfo": {
      deep: true,
      handler(value) {
        this.division = value.name;
        this.selectedOffice = this.divisionEditInfo.office_id;
      },
    },
    "$store.state.departmentsActions.departmentEditInfo": {
      deep: true,
      handler(value) {
        this.department = value.name;
        this.selectedDivision = this.departmentEditInfo.division_id;
      },
    },
    "$store.state.groupsActions.groupEditInfo": {
      deep: true,
      handler(value) {
        this.group = value.name;
        this.selectedDepartment = this.groupEditInfo.department_id;
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