<template>
  <form v-on:submit.prevent="onSubmit" id="login">
    <md-card>
      <md-card-content>
        <md-field>
          <label for="email">Email</label>
          <md-input type="email" id="email" v-model="email" />
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button type="submit" class="md-primary">Login</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    onSubmit() {
      console.log(this.email);

      this.$store.dispatch('addUser', { name: 'david', email: 'davicostadev@gmail.com' });

      this.$router.push('/');
    },
  },
};

</script>


<style>
  #login {
    margin: 16px;
  }
</style>
