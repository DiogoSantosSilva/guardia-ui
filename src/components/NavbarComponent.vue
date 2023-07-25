<template>
<v-container>
<v-toolbar
    dark
    prominent
  >
    <v-toolbar-title>{{ nome }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="loggedIn" icon @click="logout()">
        <v-icon> mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
</v-container>
</template>

<script>
import { defineComponent } from 'vue'
import { authComputed } from '@/store/helpers'
export default defineComponent({
  name: 'NavbarComponent',
  data () {
    return {
      nome: 'GuardIA'
    }
  },
  computed: {
    ...authComputed
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
})
</script>

<style lang="scss" scoped></style>
