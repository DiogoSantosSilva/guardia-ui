<template>
    <v-container fluid class="background-col">
        <div class="card-container">
            <v-img class="mx-auto my-6" max-width="228"
            :src="require('@/assets/guardia-logo.png')"></v-img>
            <v-card class="mx-auto pa-6 pb-8" elevation="8" max-width="448" rounded="lg">
                <v-card-title class="text-h5">
                    Login
                </v-card-title>
                <v-form @submit.prevent="login">
                    <v-text-field v-model="email" label="E-mail" required></v-text-field>
                    <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'" name="input-10-1"
                        label="Password" @click:append="show1 = !show1"></v-text-field>
                    <v-btn block class="btn-color" size="large" type="submit" variant="elevated"
                        :disabled="email === '' || password === ''">
                        Login
                    </v-btn>
                    <v-alert class="mt-3" v-if="error"
                      variant="tonal"
                      closable
                      type="error"
                      close-label="Close Alert"
                      title="Error"
                    >
                      {{ error }}
                    </v-alert>

                </v-form>
                <v-card-text class="text-center">
                    <router-link class="text-blue text-decoration-none" to="/signup">Don't have an account? Signup.
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </router-link>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LoginView',

  data () {
    return {
      email: '',
      password: '',
      show1: false,
      show2: true,
      error: null
    }
  },
  methods: {
    async login () {
      await this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
          this.error = err.response.data.detail
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.btn-color {
  background: #70e1f5;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ffd194, #70e1f5);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ffd194, #70e1f5);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.background-col {
  background: #70e1f5;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ffd194, #70e1f5);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ffd194, #70e1f5);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  /* Altura total da tela */
}

.card-container {
  position: relative;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}</style>
