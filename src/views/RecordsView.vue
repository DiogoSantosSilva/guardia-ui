<template>
  <div>
    <v-toolbar card prominent>
      <v-toolbar-title class="body-2 grey--text">Registros</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
  <v-timeline align="start">
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :dot-color="item.color"
      :icon="item.icon"
      fill-dot
    >
      <v-card>
        <v-card-title :class="['text-h6', `bg-${item.color}`]">
          Lorem Ipsum Dolor
        </v-card-title>
        <v-card-text class="bg-white text--primary">
          <p>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
            imperdiet nec ut, sed euismod convenire principes at. Est et nobis
            iisque percipit, an vim zril disputando voluptatibus, vix an
            salutandi sententiae.
          </p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          color: 'red-lighten-2',
          icon: 'mdi-star'
        },
        {
          color: 'purple-lighten-2',
          icon: 'mdi-book-variant'
        },
        {
          color: 'green-lighten-1',
          icon: 'mdi-airballoon'
        },
        {
          color: 'indigo-lighten-2',
          icon: 'mdi-layers-triple'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
