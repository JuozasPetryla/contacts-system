<template>
  <md-card class="h-5/6 w-fit flex flex-col items-center py-10 px-36">
    <h2 class="text-5xl">Admin prisijungimas:</h2>
    <form
      @submit="
        validateForm();
        submitForm();
      "
      class="space-y-12 my-16 flex flex-col items-center"
    >
      <div>
        <BaseInputField
          :inputPlaceHolder="'Įveskite el. pašto adresą...'"
          :inputId="'email'"
          :inputType="'email'"
          @blur="validateEmail"
          @input="validateEmail"
          v-model="email"
        >
          <template #image-left>
            <img src="../../assets/Mail.svg" alt="Mail icon" />
          </template>
          <template #image-right>
            <div class="w-6 bg-light-gray"></div>
          </template>
          <template #label> Elektroninis paštas: </template>
        </BaseInputField>
        <p v-if="!emailIsValid" class="text-dark-red absolute text-xs">
          Įveskite tinkamą el.pašto adresą
        </p>
      </div>
      <div>
        <BaseInputField
          :inputPlaceHolder="'Įveskite slaptažodį...'"
          :inputId="'password'"
          :inputType="'password'"
          @blur="validatePassword"
          @input="validatePassword"
          v-model="password"
        >
          <template #label> Slaptažodis: </template>
          <template #image-right>
            <img src="../../assets/Trailing Icon.svg" class="Mail icon" />
          </template>
          <template #image-left>
            <img src="../../assets/Lock.svg" class="Mail icon" />
          </template>
        </BaseInputField>
        <p v-if="!passwordIsValid" class="text-dark-red absolute text-xs">
          Įveskite tinkamą slaptažodį
        </p>
      </div>
      <p>
        Pamiršote slaptažodį? <a class="no-underline">Pakeiskite slaptažodį</a>
      </p>
      <BaseButton type="submit">PRISIJUNGTI</BaseButton>
    </form>
  </md-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      emailIsValid: true,
      passwordIsValid: true,
      formIsValid: false,
    };
  },
  methods: {
    validateForm() {
      this.validateEmail();
      this.validatePassword();
      if (this.emailIsValid && this.passwordIsValid) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },
    validateEmail() {
      if (this.email.includes("@")) {
        this.emailIsValid = true;
      } else {
        this.emailIsValid = false;
      }
    },
    validatePassword() {
      if (this.password.length >= 7) {
        this.passwordIsValid = true;
      } else {
        this.passwordIsValid = false;
      }
    },
    submitForm() {
      if (!this.formIsValid) return;
      console.log(this.email);
      console.log(this.password);
    },
  },
};
</script>