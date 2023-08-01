<template>
  <div class="px-16 my-8 w-screen">
    <h3 class="text-5xl font-light mb-10 px-2">
      Detalesnė kontakto informacija:
    </h3>
    <div class="pl-6 flex items-center space-x-8">
      <img src="../assets/Test Account.svg" class="h-16 w-16" />
      <div>
        <h3 class="text-4xl font-normal">Vardas Pavardė</h3>
        <h4 class="text-2xl font-normal">Pozicija: pozicijos_pavadinimas</h4>
      </div>
    </div>
    <md-card class="flex px-10 py-14 mt-8 space-x-96">
      <div class="flex flex-col space-y-12">
        <h4 class="text-2xl">Kontaktinės detalės:</h4>
        <p class="text-xl">Elektroninis paštas <a>example@teltonika.lt</a></p>
        <p class="text-xl">Telefono numeris: <a>+00000000000</a></p>
      </div>
      <div class="flex flex-col space-y-12">
        <h4 class="text-2xl">Kompanijos detalės:</h4>
        <p class="text-xl">Kompanija: kompanijos_pavyzdys</p>
        <p class="text-xl">Būstinė: būstinės_pavyzdys</p>
        <p class="text-xl">Departamentas: <a>departamento_pavyzdys</a></p>
        <p class="text-xl">Divizija: <a>divizijos_pavyzdys</a></p>
        <p class="text-xl">Grupė: <a>grupės_pavyzdys</a></p>
      </div>
    </md-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>