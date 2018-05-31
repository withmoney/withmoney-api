<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Transaction from './services/transactions';

export default {
  name: 'App',
  data() {
    return {
      transactions: [],
    };
  },
  methods: {
    onSelectTransaction({ id, name }) {
      console.log('onSelectTransaction', id, name);
      this.$router.push(`/transaction/${id}`);
    },
  },
  created() {
    Transaction.getTransactions()
      .then(({ data }) => {
        this.transactions = data.data;
      });
  },
};
</script>

<style>
  .md-content {
    padding: 16px;
  }
</style>
