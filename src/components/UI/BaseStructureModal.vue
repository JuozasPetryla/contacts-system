<template>
  <md-dialog
    :md-active="structureModalOpen"
    @md-clicked-outside="closeStructureModal"
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
              <label for="padalinys" class="pl-4"
                >Pasirinkite diviziją...</label
              >
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
              class="text-light-red text-lg absolute top-12 left-8"
            >
              Užpildykite reikiamus laukus
            </p>
          </div>
        </div>
        <div class="self-end">
          <BaseButton :type="'submit'">
            <slot name="action"></slot>
          </BaseButton>
        </div>
      </div>
    </form>

    <BaseIconButton
      @click="
        closeStructureModal();
        setFormIsValid();
      "
      class="absolute top-10 right-10"
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
      "structureModalOpen",

      "divisionsForDisplay",
      "departmentsForDisplay",
      "groupsForDisplay",
      "officesForDisplay",
      "structureModalMode",
      "divisionEditInfo",
      "departmentEditInfo",
      "groupEditInfo",
      "structureModalFormMode",
    ]),
  },
  methods: {
    ...mapActions([
      "closeStructureModal",
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
    ]),
    setFormIsValid() {
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
        this.structureModalMode === "create"
      ) {
        this.createDivision({
          divisionCreateObj: {
            name: this.division,
          },
          office_id: this.selectedOffice,
        });
        this.division = "";
      }
      if (
        this.structureModalFormMode === "division" &&
        this.structureModalMode === "edit"
      ) {
        this.editDivision({
          divisionEditObj: {
            id: this.divisionEditInfo.id,
            name: this.division,
          },
          office_id: this.selectedOffice,
        });
        this.division = "";
      }

      if (
        this.structureModalFormMode === "department" &&
        this.structureModalMode === "create"
      ) {
        this.createDepartment({
          departmentCreateObj: {
            name: this.department,
          },
          division_id: this.selectedDivision,
        });
        this.department = "";
      }
      if (
        this.structureModalFormMode === "department" &&
        this.structureModalMode === "edit"
      ) {
        this.editDepartment({
          departmentEditObj: {
            id: this.departmentEditInfo.id,
            name: this.department,
          },
          division_id: this.selectedDivision,
        });
        this.department = "";
      }

      if (
        this.structureModalFormMode === "group" &&
        this.structureModalMode === "create"
      ) {
        this.createGroup({
          groupCreateObj: {
            name: this.group,
          },
          department_id: this.selectedDepartment,
        });
        this.group = "";
      }
      if (
        this.structureModalFormMode === "group" &&
        this.structureModalMode === "edit"
      ) {
        this.editGroup({
          groupEditObj: {
            id: this.groupEditInfo.id,
            name: this.group,
          },
          department_id: this.selectedDepartment,
        });
        this.group = "";
      }
    },
  },
  created() {
    this.getCompanies();
    this.getDivisionsForDisplay();
    this.getDepartmentsForDisplay();
    this.getGroupsForDisplay();
    this.getOfficesForDisplay();
  },
  updated() {
    if (
      this.structureModalFormMode === "division" &&
      this.structureModalMode === "edit"
    ) {
      this.division = this.divisionEditInfo.name;
    }
    if (
      this.structureModalFormMode === "department" &&
      this.structureModalMode === "edit"
    ) {
      this.department = this.departmentEditInfo.name;
    }
    if (
      this.structureModalFormMode === "group" &&
      this.structureModalMode === "edit"
    ) {
      this.group = this.groupEditInfo.name;
    }
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