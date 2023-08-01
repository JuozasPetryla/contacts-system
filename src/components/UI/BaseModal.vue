<template>
  <md-dialog :md-active.sync="show" class="flex flex-col p-24">
    <div>
      <header class="px-6 pt-6 font-medium text-lg">
        <slot name="header">
          <h2 class="text-5xl font-normal">Redaguoti kontaktą:</h2>
        </slot>
      </header>
      <BaseInputField
        :inputPlaceHolde="'Įvekite vardą...'"
        :inputId="'name'"
        :inputType="'text'"
        ><template #label>Vardas:</template>
      </BaseInputField>
      <BaseInputField
        :inputPlaceHolde="'Įveskite pavardę...'"
        :inputId="'surname'"
        :inputType="'text'"
        ><template #label>Pavardė:</template>
      </BaseInputField>
      <BaseInputField
        :inputPlaceHolde="'Įveskite poziciją...'"
        :inputId="'position'"
        :inputType="'text'"
        ><template #label>Pozicija:</template>
      </BaseInputField>
      <h2 class="text-3xl">Kontaktinė informacija:</h2>
      <BaseInputField
        :inputPlaceHolde="'Įveskite el.paštą...'"
        :inputId="'email'"
        :inputType="'email'"
        ><template #label>Elektroninis paštas:</template>
        <template #image-left>
          <img src="../../assets/Mail.svg" alt="Mail icon" />
        </template>
      </BaseInputField>
      <BaseInputField
        :inputPlaceHolde="'Įveskite telefono numerį...'"
        :inputId="'phone'"
        :inputType="'tel'"
        ><template #label>Telefono numeris</template>
        <template #image-left>
          <img src="../../assets/Call Squared.svg" alt="Mail icon" />
        </template>
      </BaseInputField>
    </div>
    <div>
      <h2 class="text-3xl">Įmonės detalės:</h2>
    </div>
  </md-dialog>
</template>
  
<script>
export default {
  computed: {
    show() {
      return true;
    },
  },
};
</script>