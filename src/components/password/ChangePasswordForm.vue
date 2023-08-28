<template>
  <div class="flex mr-20 px-20 pt-20 pb-20 items-start space-x-12 pr-96">
    <form
      @submit.prevent="
        validateForm();
        formSubmit();
      "
      class="flex flex-col space-y-10"
    >
      <header>
        <h2 class="text-4xl font-normal">Keisti slaptažodį:</h2>
      </header>
      <BaseInputField
        :inputPlaceHolder="'Įveskite seną slaptažodį...'"
        :inputId="'senas-slaptažodis'"
        :inputType="inputType"
        v-model="oldPass"
        @blur="validateOldPass"
        @input="validateOldPass"
        class="relative mt-24"
        :class="{ invalid: !oldPassIsValid }"
        ><template #label>Senas slaptažodis:</template>
        <template #image-right>
          <img
            @click="changeInputType"
            src="../../assets/Trailing Icon.svg"
            class="Mail icon hover:cursor-pointer"
          />
        </template>
      </BaseInputField>
      <BaseInputField
        :inputPlaceHolder="'Įveskite naują slaptažodį...'"
        :inputId="'naujas-slaptažodis'"
        :inputType="inputType"
        v-model="newPass"
        @blur="validateNewPass"
        @input="validateNewPass"
        class="relative mt-24"
        :class="{ invalid: !newPassIsValid }"
        ><template #label>Naujas slaptažodis:</template>
        <template #image-right>
          <img
            @click="changeInputType"
            src="../../assets/Trailing Icon.svg"
            class="hover:cursor-pointer"
          />
        </template>
      </BaseInputField>
      <BaseInputField
        :inputPlaceHolder="'Įveskite naują slaptažodį dar kartą...'"
        :inputId="'naujas-slaptažodis-kartoti'"
        :inputType="inputType"
        v-model="newPassRepeat"
        @blur="validateNewPassRepeat"
        @input="validateNewPassRepeat"
        class="relative mt-24"
        :class="{ invalid: !newPassRepeatIsValid }"
        ><template #label>Pakartoti naują slaptažodį:</template>
        <template #image-right>
          <img
            @click="changeInputType"
            src="../../assets/Trailing Icon.svg"
            class="hover:cursor-pointer"
          />
        </template>
      </BaseInputField>
      <div class="absolute bottom-20 right-16">
        <BaseButton :type="'submit'"> KEISTI SLAPTAŽODĮ </BaseButton>
      </div>
    </form>
  </div>
</template>
  
  <script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      oldPass: "",
      oldPassIsValid: true,
      newPass: "",
      newPassIsValid: true,
      newPassRepeat: "",
      newPassRepeatIsValid: true,
      formIsValid: true,
      inputType: "password",
    };
  },
  computed: {
    ...mapGetters(["modalMode"]),
  },
  methods: {
    changeInputType() {
      if (this.inputType === "password") {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    },
    ...mapActions(["closeModal"]),
    validateOldPass() {
      if (this.oldPass) {
        this.oldPassIsValid = true;
      } else {
        this.oldPassIsValid = false;
      }
    },
    validateNewPass() {
      if (this.newPass) {
        this.newPassIsValid = true;
      } else {
        this.newPassIsValid = false;
      }
    },
    validateNewPassRepeat() {
      if (this.newPassRepeat && this.newPass === this.newPassRepeat) {
        this.newPassRepeatIsValid = true;
      } else {
        this.newPassRepeatIsValid = false;
      }
    },
    validateForm() {
      this.validateOldPass();
      this.validateNewPass();
      this.validateNewPassRepeat;
      if (
        this.oldPassIsValid &&
        this.newPassIsValid &&
        this.newPassRepeatIsValid
      ) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },
    formSubmit() {
      if (!this.formIsValid) return;
      this.oldPass = "";
      this.newPass = "";
      this.closeModal();
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