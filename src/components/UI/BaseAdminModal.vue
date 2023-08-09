<template>
  <md-dialog :md-active.sync="show" class="h-fit w-full mx-auto my-auto">
    <div class="flex px-20 pt-20 pb-36 items-start space-x-12 pr-96">
      <div class="mt-10 flex flex-col space-y-8">
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
          :inputPlaceHolder="'Įveskite el.paštą...'"
          :inputId="'email'"
          :inputType="'email'"
          ><template #label>Elektroninis paštas:</template>
          <template #image-left>
            <img src="../../assets/Mail.svg" alt="Mail icon" />
          </template>
        </BaseInputField>
        <BaseButton class="mx-auto">ĮKELTI NUOTRAUKĄ</BaseButton>
      </div>
      <div class="space-y-6 flex flex-col">
        <h2 class="text-3xl text-center">Administracinės teisės:</h2>
        <md-checkbox>Redaguoti ir kurti kontaktus</md-checkbox>
        <md-checkbox>Trinti kontaktus</md-checkbox>
        <md-checkbox>Redaguoti ir kurti įmones</md-checkbox>
        <md-checkbox>Trinti įmones</md-checkbox>
        <md-checkbox>Redaguoti ir kurti ofisus</md-checkbox>
        <md-checkbox>Trinti ofisus</md-checkbox>
        <md-checkbox>Redaguoti ir kurti struktūras</md-checkbox>
        <md-checkbox>Trinti struktūras</md-checkbox>
        <md-checkbox>Skaityti admin paskyras</md-checkbox>
        <md-checkbox>Redaguoti ir kurti administracines teises</md-checkbox>
        <md-checkbox>Trinti admin paskyras</md-checkbox>
      </div>
      <div class="self-end">
        <BaseButton class="absolute bottom-10 right-10">PRIDĖTI</BaseButton>
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