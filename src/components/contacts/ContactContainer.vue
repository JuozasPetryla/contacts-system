<template>
  <md-card class="w-full">
    <div class="flex space-x-4 items-center p-8">
      <img src="../../assets/Test Account.svg" alt="Blank account icon" />
      <div>
        <h3 class="font-medium"><slot name="name">Vardas ir pavarde</slot></h3>
        <p><slot name="position">Pozicija: pozicija</slot></p>
      </div>
    </div>
    <div class="flex flex-col space-y-2 pl-8 pb-8">
      <slot name="contact-info">
        <p>Telefono nr: +000000000000</p>
        <p>El. paštas: example@gmail.com</p>
        <p>Adresas: Saltoniskiu g. 2, Vilnius</p>
      </slot>
    </div>
  </md-card>
</template>

<script>
export default {};
</script>
