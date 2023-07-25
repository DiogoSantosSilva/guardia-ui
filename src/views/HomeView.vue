<template>
    <navbar-component></navbar-component>
      <v-container>
        <v-row>
          <sidebar-component></sidebar-component>
          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
            <router-view/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import { authComputed } from '../store/helpers'
import NavbarComponent from '@/components/NavbarComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    NavbarComponent,
    SidebarComponent
  },
  computed: {
    ...authComputed
  }
})
</script>
