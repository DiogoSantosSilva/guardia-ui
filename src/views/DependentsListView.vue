<template>
  <div>
    <v-toolbar class="mb-4" card prominent>
      <v-toolbar-title class="body-2 grey--text">Dependentes</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="dialogUserVisible()">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <dialog-user-component v-model:dialog="openDialog"></dialog-user-component>
    <dialog-record-component
      v-model:dialog="openRecordDialog"
      :user="selectUser"
    ></dialog-record-component>
    <v-row class="mt-4">
      <v-col
        v-for="(dependent, index) in dependents"
        :key="index"
        class="d-flex child-flex"
        cols="3"
      >
        <v-card>
          <v-img
            @click="selectedDependentUser(dependent)"
            :src="
              dependent.imageUrl
                ? dependent.imageUrl
                : require('@/assets/baby.jpg')
            "
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="150px"
            width="300px"
            cover
          >
            <v-card-title class="text-white">
              {{ dependent.username }}
            </v-card-title>
          </v-img>
          <v-card-actions>
            <span><b>Idade</b>: {{ dependent.profile.age }}</span>
            <v-spacer></v-spacer>
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  size="small"
                  color="surface-variant"
                  variant="text"
                  icon="mdi-note-plus"
                  @click="dialogRecordVisible(dependent)"
                ></v-btn>
              </template>
              <span>Criacao rapida de registro</span>
            </v-tooltip>
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  size="small"
                  color="surface-variant"
                  variant="text"
                  icon="mdi-eye"
                  :to="{ name: 'dependent', params: { id: dependent?.id } }"
                ></v-btn>
              </template>
              <span>Visualizar dependente</span>
            </v-tooltip>
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  size="small"
                  color="surface-variant"
                  variant="text"
                  icon="mdi-delete"
                  @click="deleteDependent(dependent.id)"
                ></v-btn>
              </template>
              <span>Deletar dependente</span>
            </v-tooltip>
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

    <v-expand-transition>
      <v-container v-if="selectedDependent" class="px-0">
        <v-card color="#f2f2f2" v-show="extend">
          <v-card-title class="text-h5">
            {{ selectedDependent.username }}
          </v-card-title>
          <v-card-text class="mt-4">
            <v-row>
              <v-col cols="3">
                <span
                  ><b>Idade</b>:
                  {{ selectedDependent?.profile?.age || "Sem Informação" }}
                </span>
              </v-col>
              <v-col cols="3">
                <span
                  ><b>Sexo</b>:
                  {{
                    selectedDependent?.profile?.age || "Sem Informação"
                  }}</span
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <span
                  ><b>Altura</b>:
                  {{
                    selectedDependent?.profile?.height || "Sem Informação"
                  }}</span
                >
              </v-col>
              <v-col cols="3">
                <span
                  ><b>Peso</b>:
                  {{
                    selectedDependent?.profile?.weight || "Sem Informação"
                  }}</span
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <b>Informações adicionais:</b>
                <br />
                <span>
                  {{
                    selectedDependent?.profile?.bio || "Sem Informação"
                  }}</span
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-expand-transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import DialogUserComponent from '@/components/DialogUserComponent.vue'
import DialogRecordComponent from '@/components/DialogRecordComponent.vue'

export default {
  name: 'DependentsView',
  components: {
    DialogUserComponent,
    DialogRecordComponent
  },
  data () {
    return {
      openDialog: false,
      openRecordDialog: false,
      selectUser: null
    }
  },
  computed: {
    ...mapState(['user', 'selectedDependent']),
    ...mapGetters(['dependents']),
    extend () {
      return this.selectedDependent !== null
    }
  },
  methods: {
    ...mapActions(['deleteDependent', 'selectedDependentUser']),
    dialogUserVisible () {
      this.openDialog = true
    },
    dialogRecordVisible (dependent) {
      this.openRecordDialog = true
      this.selectUser = dependent
    }
  },
  beforeCreate () {
    this.$store.dispatch('setUserDependent')
  }
}
</script>

<style lang="scss" scoped></style>
