<template>
  <v-row justify="center">
    <v-dialog v-model="dialogVisible" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Dependente</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.full_name"
                    label="Nome completo"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-checkbox
                    v-model="form.has_access"
                    label="Tem acesso?"
                    @change="clearOptionalFields"
                  ></v-checkbox>
                </v-col>
              </v-row>

              <v-row v-if="form.has_access">
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.email"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.password"
                    label="Senha"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.age"
                    label="Idade"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.gender"
                    :items="genderOptions"
                    label="Gênero"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.height"
                    label="Altura (cm)"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.weight"
                    label="Peso (kg)"
                    type="number"
                    step="0.1"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="form.bio"
                    label="Informações gerais"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="closeDialog()"
                >
                  Close
                </v-btn>
                <v-btn color="blue-darken-1" type="submit" :disabled="!isFormValid"> Salvar </v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogVisible: false,
      form: {
        full_name: '',
        username: '',
        user_type: 1,
        has_access: false,
        email: '',
        password: '',
        age: null,
        gender: '',
        height: null,
        weight: null,
        bio: '',
        imageUrl: ''
      },
      showPassword: false,
      userTypeOptions: [1, 2, 3],
      genderOptions: ['M', 'F']
    }
  },
  watch: {
    dialog (newVal) {
      this.dialogVisible = newVal
    }
  },
  computed: {
    ...mapState(['user']),

    isFormValid () {
      // Check if all the required fields have valid values
      const requiredFields = [
        this.form.full_name,
        this.form.age,
        this.form.height,
        this.form.weight
      ]
      return requiredFields.every((field) => !!field)
    }

  },
  methods: {
    ...mapActions(['setDependent']),
    closeDialog () {
      this.dialogVisible = false
      this.$emit('update:dialog', false)
    },
    submitForm () {
      if (this.isFormValid) {
        this.form.username = this.form.full_name
        this.setDependent({ id: this.user.id, form: this.form }).then(() => {
          this.closeDialog()
        })
      }
    },
    clearOptionalFields () {
      if (!this.has_access) {
        this.email = ''
        this.password = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
