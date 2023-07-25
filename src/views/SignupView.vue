<template>
  <v-container fluid class="background-col">
    <div class="card-container">
      <v-img
        class="mx-auto my-6"
        max-width="228"
        :src="require('@/assets/guardia-logo.png')"
      ></v-img>
      <v-card
        class="mx-auto pa-6 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <v-card-title class="text-h5"> Signup </v-card-title>
        <v-form @submit.prevent="register">
          <v-text-field v-model="username" label="Name" required></v-text-field>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, rules.passwordMatch]"
            :type="show1 ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            v-model="passwordConfirm"
            :append-icon="showConfirm1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, rules.passwordMatch]"
            :type="showConfirm1 ? 'text' : 'password'"
            name="passwordConfirm"
            label="Confirm password"
            hint="At least 8 characters"
            counter
            @click:append="showConfirm1 = !showConfirm1"
          ></v-text-field>
          <v-btn
            block
            class="btn-color"
            size="large"
            type="submit"
            variant="elevated"
            :disabled="!isFieldsValid"
          >
            Signup
          </v-btn>
          <v-alert
            class="mt-3"
            v-if="error"
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
          <router-link class="text-blue text-decoration-none" to="/login"
            >Already have an account? Login.
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
  name: 'SignupView',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      showConfirm1: false,
      showConfirm2: true,
      show1: false,
      show2: true,
      error: null,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (value) => value.length >= 8 || 'Min 8 characters',
        passwordMatch: (value) =>
          value === this.password || 'Password you entered dont match',
        emailMatch: () => 'The email and password you entered dont match'
      }
    }
  },
  computed: {
    isFieldsValid () {
      const password = this.password.trim()
      const passwordConfirm = this.passwordConfirm.trim()
      return (
        this.username.trim().length !== 0 &&
        password.length !== 0 &&
        this.email.trim().length !== 0 &&
        passwordConfirm.length !== 0 &&
        password === passwordConfirm
      )
    }
  },
  methods: {
    async register () {
      await this.$store
        .dispatch('register', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch((err) => {
          this.error = err.response.data.detail
        })
    }
  }
})
</script>

<style scoped>
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
}
</style>
