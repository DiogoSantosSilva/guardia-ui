<template>
  <div>
    <v-toolbar card prominent>
      <v-toolbar-title class="body-2 grey--text">Registros</v-toolbar-title>
    </v-toolbar>
  </div>
  <v-timeline align="start">
    <v-timeline-item
      v-for="(item, i) in novoRecords"
      :key="i"
      :dot-color="item.color"
      :icon="item.icon"
      fill-dot
    >
      <v-card v-if="item.fl_active">
        <v-card-title :class="['text-h6', `bg-${item.color}`]">
          {{ item.titulo }}
        </v-card-title>
        <v-card-text class="bg-white text--primary">
          <p>
            {{ item.mensagem }}
          </p>
        </v-card-text>
        <v-card-actions>
        <v-btn @click="deleteRecord(item.id)">
          Delete
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['records']),
    novoRecords () {
      return this.records.map(record => {
        let color
        let icon
        if (record.tipo_registro === 'Consulta Médica') {
          color = 'indigo-lighten-2'
          icon = 'mdi-doctor'
        } else if (record.tipo_registro === 'Diversão') {
          color = 'green-lighten-1'
          icon = 'mdi-emoticon-happy'
        } else if (record.tipo_registro === 'Tarefas') {
          color = 'red-lighten-2'
          icon = 'mdi-hammer-screwdriver'
        } else {
          color = 'purple-lighten-2'
          icon = 'mdi-help'
        }
        return { ...record, icon, color }
      })
    }
  },
  methods: {
    ...mapActions(['deleteRecord'])
  },
  beforeCreate () {
    this.$store.dispatch('getRecords')
  }
}
</script>

<style lang="scss" scoped></style>
