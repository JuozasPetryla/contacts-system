<template>
  <md-dialog
    :md-active="officeModalOpen"
    @md-clicked-outside="closeOfficeModal"
    class="h-fit w-mxa mx-auto my-auto"
  >
    <form
      @submit.prevent="
        validateForm();
        formSubmit();
        setFormIsValid();
      "
    >
      <div class="flex px-20 pt-20 pb-36 items-start space-x-12">
        <div class="flex flex-col space-y-6">
          <header class="font-medium text-lg">
            <slot name="header"> </slot>
          </header>

          <BaseInputField
            :inputPlaceHolder="'Įvekite adresą...'"
            :inputId="'address'"
            :inputType="'text'"
            v-model="address"
            class="relative"
            @blur="validateAdress"
            @input="validateAdress"
            :class="{ invalid: !addressIsValid }"
            ><template #label>Adresas:</template>
            <template #image-right>
              <div class="w-6 bg-light-gray"></div>
            </template>
          </BaseInputField>
          <BaseInputField
            :inputPlaceHolder="'Įveskite miestą...'"
            :inputId="'city'"
            :inputType="'text'"
            v-model="city"
            class="relative"
            @blur="validateCity"
            @input="validateCity"
            :class="{ invalid: !cityIsValid }"
            ><template #label>Miestas:</template>
            <template #image-right>
              <div class="w-6 bg-light-gray"></div>
            </template>
          </BaseInputField>
          <BaseInputField
            :inputPlaceHolder="'Įveskite šalį...'"
            :inputId="'country'"
            :inputType="'text'"
            v-model="country"
            class="relative"
            @blur="validateCountry"
            @input="validateCountry"
            :class="{ invalid: !countryIsValid }"
            ><template #label>Šalis:</template>
            <template #image-right>
              <div class="w-6 bg-light-gray"></div>
            </template>
          </BaseInputField>
        </div>
        <div class="space-y-6 pt-16">
          <div>
            <label for="imone">Įmonė:</label>
            <md-field class="md-elevation-4">
              <label for="imone" class="pl-4">Pasirinkite įmonę...</label>
              <md-select
                name="imone"
                id="imone"
                class="pl-4"
                v-model="selectedCompany"
                :class="{ invalidSelect: !selectedCompanyIsValid }"
                @md-selected="validateSelectedCompany"
                @blur="validateSelectedCompany"
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
        closeOfficeModal();
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
      address: "",
      city: "",
      country: "",
      selectedCompany: "",
      addressIsValid: true,
      cityIsValid: true,
      countryIsValid: true,
      selectedCompanyIsValid: true,
      formIsValid: true,
    };
  },
  computed: {
    ...mapGetters([
      "officeModalOpen",
      "companies",
      "officeModalMode",
      "officeEditInfo",
    ]),
  },
  methods: {
    ...mapActions([
      "closeOfficeModal",
      "getCompanies",
      "createOffice",
      "editOffice",
    ]),
    setFormIsValid() {
      this.formIsValid = true;
      this.addressIsValid = true;
      this.cityIsValid = true;
      this.countryIsValid = true;
      this.selectedCompanyIsValid = true;
    },
    validateForm() {
      this.validateAdress();
      this.validateCity();
      this.validateCountry();
      this.validateSelectedCompany();
      if (
        this.addressIsValid &&
        this.cityIsValid &&
        this.countryIsValid &&
        this.selectedCompanyIsValid
      ) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },

    validateAdress() {
      if (
        /\d/.test(this.address) &&
        /[a-zA-Z]/g.test(this.address) &&
        this.address.length >= 5
      ) {
        this.addressIsValid = true;
      } else {
        this.addressIsValid = false;
      }
    },
    validateCity() {
      if (
        /\d/.test(this.city) === false &&
        this.city.length >= 3 &&
        isNaN(this.city)
      ) {
        this.cityIsValid = true;
      } else {
        this.cityIsValid = false;
      }
    },
    validateCountry() {
      if (
        /\d/.test(this.country) === false &&
        this.country.length >= 3 &&
        isNaN(this.country)
      ) {
        this.countryIsValid = true;
      } else {
        this.countryIsValid = false;
      }
    },

    validateSelectedCompany() {
      if (this.selectedCompany) {
        this.selectedCompanyIsValid = true;
      } else {
        this.selectedCompanyIsValid = false;
      }
    },

    formSubmit() {
      if (!this.formIsValid) return;

      if (this.officeModalMode === "create") {
        this.createOffice({
          officeCreateObj: {
            name: `${this.address}, ${this.city}, ${this.country}`,
            street: this.address.match(/\D/g).join(""),
            street_number: this.address.match(/\d+/)[0],
            city: this.city,
            country: this.country,
          },
          company_id: this.selectedCompany,
        });
      }
      if (this.officeModalMode === "edit") {
        this.editOffice({
          officeEditObj: {
            id: this.officeEditInfo.id,
            name: `${this.address}, ${this.city}, ${this.country}`,
            street: this.address.match(/\D/g).join(""),
            street_number: this.address.match(/\d+/)[0],
            city: this.city,
            country: this.country,
          },
          company_id: this.selectedCompany,
        });
      }
      this.address = "";
      this.city = "";
      this.country = "";
      this.selectedCompany = "";
    },
  },
  created() {
    this.getCompanies();
  },
  watch: {
    "$store.state.officesActions.officeEditInfo": {
      deep: true,
      handler(value) {
        this.address = value.street + value.street_number;
        this.city = value.city;
        this.country = value.country;
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