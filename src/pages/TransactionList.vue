<template>
  <div>
    <md-toolbar>
      <h3 class="md-title">With Money</h3>
    </md-toolbar>
    <md-table>
      <md-table-row>
        <md-table-head>Nome</md-table-head>
        <md-table-head>Valor</md-table-head>
        <md-table-head>Pago?</md-table-head>
        <md-table-head>Data</md-table-head>
      </md-table-row>
      <md-table-row
        v-for="transaction in transactions"
        :key="transaction.id"
        @click="onSelectTransaction(transaction)"
      >
        <md-table-cell>{{transaction.name}}</md-table-cell>
        <md-table-cell>{{transaction.value}}</md-table-cell>
        <md-table-cell>{{transaction.transationDate}}</md-table-cell>
        <md-table-cell>{{transaction.isPaid ? 'Paid' : 'Not Paid'}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import Transaction from '../services/transactions';

export default {
  name: 'App',
  data() {
    return {
      transactions: [],
    };
  },
  methods: {
    onSelectTransaction({ id }) {
      this.$router.push(`/transaction/${id}`);
    },
  },
  async created() {
    const { data } = await Transaction.getTransactions();

    this.transactions = data;
  },
};
</script>

<style>
  .md-content {
    padding: 16px;
  }
</style>
