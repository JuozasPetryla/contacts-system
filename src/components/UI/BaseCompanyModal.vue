<template>
  <md-dialog :md-active.sync="show" class="h-fit mx-auto my-auto">
    <div class="flex px-20 pt-20 pb-20 items-start space-x-12 pr-96">
      <div class="flex flex-col space-y-10">
        <header class="font-medium text-lg">
          <slot name="header">
            <h2 class="text-4xl font-normal">Redaguoti įmonę:</h2>
          </slot>
        </header>
        <BaseInputField
          :inputPlaceHolder="'Įvekite įmonę...'"
          :inputId="'imonė'"
          :inputType="'text'"
          ><template #label>Įmonės pavadinimas:</template>
        </BaseInputField>
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