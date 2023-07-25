<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head>Vardas Pavarde</md-table-head>
      <md-table-head>Pozicijos Pavadinimas</md-table-head>
      <md-table-head>Telefono numeris</md-table-head>
      <md-table-head>Elektroninis pastas</md-table-head>
      <md-table-head>Darbovietes adresas</md-table-head>
    </md-table-row>
    <md-table-row v-for="c in 8" :key="c">
      <md-table-cell>Vardas Pavarde</md-table-cell>
      <md-table-cell>Pozicijos Pavadinimas</md-table-cell>
      <md-table-cell>Telefono numeris</md-table-cell>
      <md-table-cell>Elektroninis pastas</md-table-cell>
      <md-table-cell>Darbovietes adresas</md-table-cell>
    </md-table-row>
  </md-table>
</template>
  
  <script>
export default {};
</script>
  