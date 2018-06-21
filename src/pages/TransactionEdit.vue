<template>
  <div>
    <md-toolbar>
      <router-link to="/">
        <md-button class="md-icon-button">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
      </router-link>
      <h3 class="md-title">Transaction: {{name}}</h3>
    </md-toolbar>
    <form>
      <md-card>
        <md-card-content>
          <md-field>
            <label for="">Name</label>
            <md-input  v-model="name" />
          </md-field>
          <md-field>
            <input type="text" id="value" v-model="value" class="md-input">
            <md-icon>attach_money</md-icon>
          </md-field>
          <md-datepicker v-model="transactionDate">
            <label>Transaction Day</label>
          </md-datepicker>
          <md-switch v-model="isPaid" class="md-primary">IsPaid?</md-switch>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import Transaction from '../services/transactions';

export default {
  data() {
    return {
      name: '',
      value: '',
      isPaid: false,
      transactionDate: '2018-05-30',
    };
  },
  async created() {
    const data = await Transaction.getTransaction(this.$route.params.id);

    this.name = data.name;
    this.value = data.value;
    this.isPaid = data.isPaid;
    this.transactionDate = data.transactionDate;
  },
};
</script>
