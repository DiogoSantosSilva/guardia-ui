<template>
  <div>
    <v-toolbar class="mb-4" card prominent>
      <v-toolbar-title class="body-2 grey--text">Dependentes</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="dialogVisible()">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <dialog-user-component v-model:dialog="openDialog"></dialog-user-component>
    <v-row class="mt-4">
      <v-col
        v-for="(dependente, index) in dependentes"
        :key="index"
        class="d-flex child-flex"
        cols="3"
      >
        <v-card>
          <v-img @click="showInfo(dependente)"
            :src="
              dependente.imageUrl
                ? dependente.imageUrl
                : require('@/assets/baby.jpg')
            "
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="150px"
            width="300px"
            cover
          >
          <v-card-title class="text-white">
            {{ dependente.username }}
          </v-card-title>
          </v-img>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-note-plus"></v-btn>
              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-account-edit"></v-btn>
              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-delete" @click="deleteDependent(dependente.id)"></v-btn>
            </v-card-actions>
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey-lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-container v-if="selectedDependent" class="px-0">
      <v-card color="#f2f2f2">
        <v-card-title class="text-h5">
          {{ selectedDependent.username }}
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="3">
              <span
                ><b>Idade</b>: {{ selectedDependent?.age || "Sem Informação" }}
              </span>
            </v-col>
            <v-col cols="3">
              <span
                ><b>Sexo</b>:
                {{ selectedDependent?.age || "Sem Informação" }}</span
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <span
                ><b>Altura</b>:
                {{ selectedDependent.height || "Sem Informação" }}</span
              >
            </v-col>
            <v-col cols="3">
              <span
                ><b>Peso</b>:
                {{ selectedDependent?.weight || "Sem Informação" }}</span
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <b>Informações adicionais:</b>
              <br />
              <span> {{ selectedDependent?.bio || "Sem Informação" }}</span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DialogUserComponent from '@/components/DialogUserComponent.vue'
export default {
  name: 'DependentsView',
  components: {
    DialogUserComponent
  },
  data () {
    return {
      selectedDependent: null,
      openDialog: false
    }
  },
  computed: mapState(['user', 'dependentes']),
  methods: {
    ...mapActions(['deleteDependent']),
    showInfo (dependente) {
      this.selectedDependent = dependente
    },
    dialogVisible () {
      this.openDialog = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
