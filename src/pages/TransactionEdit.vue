<template>
  <div>
    <md-toolbar>
      <h3 class="md-title">Transaction</h3>
    </md-toolbar>
    <form>
      <md-card>
        <md-card-content>
          <md-field>
            <label for="">Name</label>
            <md-input />
          </md-field>
          <md-field>
            <input type="text" id="value" class="md-input">
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
export default {
  data() {
    return {
      isPaid: false,
      transactionDate: '2018-05-30',
    };
  },
  created() {
    console.log(this.$route.params.id);
  },
};
</script>
