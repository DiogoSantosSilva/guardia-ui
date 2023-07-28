<template>
  <v-row justify="center">
    <v-dialog v-model="dialogVisible" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Registro</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="formData.titulo"
                    label="Título"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.mensagem"
                    label="Mensagem"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.topico"
                    label="Tópico"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.tag"
                    label="Tag"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="formData.tipo_registro"
                    :items="tiposDeRegistro"
                    label="Tipo de Registro"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.data"
                    label="Data"
                    v-mask="'##/##/####'"
                    placeholder="dd/mm/yyyy"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="closeDialog()"
                  >Close</v-btn
                >
                <v-btn
                  type="submit"
                  :disabled="!isFormValid"
                  color="blue-darken-1"
                  variant="text"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
      required: true
    },
    user: {
      required: true
    }
  },
  data () {
    return {
      dialogVisible: false,
      formData: {
        user_id: '',
        titulo: '',
        mensagem: '',
        topico: '',
        tag: '',
        tipo_registro: '',
        data: ''
      },
      tiposDeRegistro: ['Consulta Médica', 'Diversão', 'Tarefas', 'Outros']
    }
  },
  watch: {
    dialog (newVal) {
      this.dialogVisible = newVal
    }
  },
  methods: {
    closeDialog () {
      this.dialogVisible = false
      this.$emit('update:dialog', false)
    },
    submitForm () {
      if (this.isFormValid) {
        this.formData.user_id = this.selectedUserId
        this.$store.dispatch('createRecord', this.formData).then(() => {
          this.closeDialog()
          this.formData = {
            user_id: '',
            titulo: '',
            mensagem: '',
            topico: '',
            tag: '',
            tipo_registro: ''
          }
        })
      }
    }
  },
  computed: {
    isFormValid () {
      // Check if all the required fields have valid values
      const requiredFields = [
        this.formData.titulo,
        this.formData.mensagem,
        this.formData.topico,
        this.formData.tag,
        this.formData.tipo_registro
      ]
      return requiredFields.every((field) => !!field)
    },
    selectedUserId () {
      return this.user.id
    }
  }
}
</script>

<style lang="scss" scoped></style>
