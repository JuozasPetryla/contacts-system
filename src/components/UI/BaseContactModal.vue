<template>
  <md-dialog :md-active.sync="show" class="h-fit w-mxa mx-auto my-auto">
    <div class="flex px-20 pt-20 pb-36 items-start space-x-12">
      <div class="flex flex-col space-y-6">
        <header class="font-medium text-lg">
          <slot name="header"> </slot>
        </header>
        <BaseInputField
          :inputPlaceHolder="'Įvekite vardą...'"
          :inputId="'name'"
          :inputType="'text'"
          ><template #label>Vardas:</template>
          <template #image-right>
            <div class="w-6 bg-light-gray"></div>
          </template>
        </BaseInputField>
        <BaseInputField
          :inputPlaceHolder="'Įveskite pavardę...'"
          :inputId="'surname'"
          :inputType="'text'"
          ><template #label>Pavardė:</template>
          <template #image-right>
            <div class="w-6 bg-light-gray"></div>
          </template>
        </BaseInputField>
        <BaseInputField
          :inputPlaceHolder="'Įveskite poziciją...'"
          :inputId="'position'"
          :inputType="'text'"
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
          ><template #label>Elektroninis paštas:</template>
          <template #image-left>
            <img src="../../assets/Mail.svg" alt="Mail icon" />
          </template>
        </BaseInputField>
        <BaseInputField
          :inputPlaceHolder="'Įveskite telefono numerį...'"
          :inputId="'phone'"
          :inputType="'tel'"
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
            <md-select name="imone" id="imone">
              <md-option>Teltonika</md-option>
            </md-select>
          </md-field>
        </div>
        <div>
          <label for="imone">Padalinys:</label>
          <md-field class="md-elevation-4">
            <label for="padalinys" class="pl-4">Pasirinkite diviziją...</label>
            <md-select name="padalinys" id="padalinys">
              <md-option>Teltonika</md-option>
            </md-select>
          </md-field>
        </div>
        <div>
          <label for="imone">Skyrius:</label>
          <md-field class="md-elevation-4">
            <label for="skyrius" class="pl-4"
              >Pasirinkite departamentą...</label
            >
            <md-select name="skyrius" id="skyrius">
              <md-option>Teltonika</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="pb-14">
          <label for="imone">Grupė:</label>
          <md-field class="md-elevation-4">
            <label for="grupe" class="pl-4">Pasirinkite grupę...</label>
            <md-select name="grupe" id="grupe" class="w-80">
              <md-option>Teltonika</md-option>
            </md-select>
          </md-field>
        </div>
        <BaseButton class="mx-auto">ĮKELTI NUOTRAUKĄ</BaseButton>
      </div>
      <div class="self-end">
        <BaseButton>REDAGUOTI</BaseButton>
      </div>
    </div>
    <BaseIconButton class="absolute top-10 right-10">
      <img src="../../assets/Plus Math.svg" class="rotate-45" />
    </BaseIconButton>
  </md-dialog>
</template>
  
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>