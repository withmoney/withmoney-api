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
    <md-snackbar :md-active.sync="showError">
      <span>{{error}}</span>
      <md-button class="md-primary" @click="showError = false" md-persistent>Retry</md-button>
    </md-snackbar>
  </form>
</template>

<script>
import Users from '../services/users';

export default {
  data() {
    return {
      email: 'asdasd@asdasd.asd',
      error: '',
      showError: false,
    };
  },
  methods: {
    async onSubmit() {
      if (this.email) {
        const { data } = await Users.getUsers({
          email: this.email,
        });
        if (data.length) {
          const [user] = data;
          window.localStorage.setItem('token', 'blahblabh');

          this.$store.dispatch('addUser', user);

          this.$router.push('/');
        } else {
          this.showError = true;
          this.error = 'Usuário não encontrado.';
        }
      }
    },
  },
};

</script>


<style>
  #login {
    margin: 16px;
  }
</style>
