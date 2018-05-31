<template>
  <div id="app">
    <md-toolbar>
      <h3 class="md-title">With Money</h3>
    </md-toolbar>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Nome</md-table-head>
        <md-table-head>Valor</md-table-head>
        <md-table-head>Pago?</md-table-head>
        <md-table-head>Data</md-table-head>
      </md-table-row>
    </md-table>
    <md-content>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit minus doloremque, animi culpa dolores explicabo vel voluptatum. Iure sed rem, veritatis maiores adipisci quam tempore? Magni perferendis ab fugiat tempora?
    </md-content>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {

}
  .md-content {
    padding: 16px;
  }
</style>
