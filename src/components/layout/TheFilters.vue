<template>
  <div
    class="flex mb-4 px-2 space-x-0 flex-col align-start md:flex-row md:space-x-4"
  >
    <BaseFilter :selectId="'company'">
      <template #filter-name>Įmonė</template>
      <template #filter>
        <select
          id="company"
          name="company"
          v-model="selectedCompany"
          @change="getCompanyFilterId(selectedCompany)"
          class="border-2 rounded-md h-10 w-72 2xl:w-64 xl:w-56 lg:w-44 md:w-32 sm:w-96 sm:w-48 bg-inherit px-3 text-gray-500 focus:outline-none"
        >
          <option value="">Filtruoti įmones...</option>
          <option
            v-for="company in companies"
            :key="company.id"
            :value="company.id"
          >
            {{ company.name }}
          </option>
        </select>
      </template>
    </BaseFilter>
    <BaseFilter :selectId="'ofisas'">
      <template #filter-name>Ofisas</template>
      <template #filter
        ><select
          id="office"
          name="office"
          class="border-2 rounded-md h-10 w-72 2xl:w-64 xl:w-56 lg:w-44 md:w-32 sm:w-96 sm:w-28 bg-inherit px-3 text-gray-500 focus:outline-none"
          v-model="selectedOffice"
          @change="getOfficeFilterId(selectedOffice)"
        >
          <option value="">Filtruoti adresus...</option>
          <option v-for="office in offices" :key="office.id" :value="office.id">
            {{ office.name }}
          </option>
        </select>
      </template>
    </BaseFilter>
    <BaseFilter :selectId="'division'">
      <template #filter-name>Padalinys</template>
      <template #filter
        ><select
          id="division"
          name="division"
          class="border-2 rounded-md h-10 w-72 2xl:w-64 xl:w-56 lg:w-44 md:w-32 sm:w-96 sm:w-28 bg-inherit px-3 text-gray-500 focus:outline-none"
          v-model="selectedDivision"
          @change="getDivisionFilterId(selectedDivision)"
        >
          <option value="">Filtruoti divizijas...</option>
          <option
            v-for="division in divisions"
            :key="division.id"
            :value="division.id"
          >
            {{ division.name }}
          </option>
        </select>
      </template>
    </BaseFilter>
    <BaseFilter :selectId="'skyrius'">
      <template #filter-name>Skyrius</template>
      <template #filter
        ><select
          id="department"
          name="department"
          class="border-2 rounded-md h-10 w-72 2xl:w-64 xl:w-56 lg:w-44 md:w-32 sm:w-96 sm:w-28 bg-inherit px-3 text-gray-500 focus:outline-none"
          v-model="selectedDepartment"
          @change="getDepartmentFilterId(selectedDepartment)"
        >
          <option value="">Filtruoti skyrius...</option>
          <option
            v-for="department in departments"
            :key="department.id"
            :value="department.id"
          >
            {{ department.name }}
          </option>
        </select>
      </template>
    </BaseFilter>
    <BaseFilter :selectId="'grupe'">
      <template #filter-name>Grupė</template>
      <template #filter
        ><select
          id="group"
          name="group"
          class="border-2 rounded-md h-10 w-72 2xl:w-64 xl:w-56 lg:w-44 md:w-32 sm:w-96 sm:w-28 bg-inherit px-3 text-gray-500 focus:outline-none"
          v-model="selectedGroup"
          @change="getGroupFilterId(selectedGroup)"
        >
          <option value="">Filtruoti grupes...</option>
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.name }}
          </option>
        </select>
      </template>
    </BaseFilter>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedCompany: "",
      selectedDepartment: "",
      selectedDivision: "",
      selectedGroup: "",
      selectedOffice: "",
    };
  },
  computed: {
    ...mapGetters([
      "companies",
      "divisions",
      "departments",
      "groups",
      "offices",
      "officeFilterId",
    ]),
  },
  methods: {
    ...mapActions([
      "getCompanies",
      "getCompanyFilterId",
      "getDivisionFilterId",
      "getDepartmentFilterId",
      "getGroupFilterId",
      "getOfficeFilterId",
      "getContacts",
    ]),
    resetFilters() {
      this.selectedCompany = "";
      this.selectedOffice = "";
      this.selectedDivision = "";
      this.selectedDepartment = "";
      this.selectedGroup = "";
    },
  },
  watch: {
    "$store.state.contacts.filter": {
      deep: true,
      handler(value) {
        if (value === "") {
          this.resetFilters();
        }
      },
    },
    "$store.state.offices.officeFilterId": {
      deep: true,
      handler(value) {
        if (!value) {
          this.selectedOffice = "";
          this.selectedDivision = "";
          this.selectedDepartment = "";
          this.selectedGroup = "";
        }
      },
    },
    "$store.state.divisions.divisionFilterId": {
      deep: true,
      handler(value) {
        if (!value) {
          this.selectedDivision = "";
          this.selectedDepartment = "";
          this.selectedGroup = "";
        }
      },
    },
    "$store.state.departments.departmentFilterId": {
      deep: true,
      handler(value) {
        if (!value) {
          this.selectedDepartment = "";
          this.selectedGroup = "";
        }
      },
    },
    "$store.state.groups.groupFilterId": {
      deep: true,
      handler(value) {
        if (!value) {
          this.selectedGroup = "";
        }
      },
    },
  },
  created() {
    this.getCompanies();
  },
};
</script>
