<template>
  <v-col  cols="2">
    <v-sheet rounded="lg">
      <v-list rounded="lg">
        <v-list-item v-for="menu in menus" :key="menu.nome" link :to="{ name: menu.rota }">
          {{ menu.nome }}
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        { nome: 'Dependentes', rota: 'dependents' },
        { nome: 'Registros', rota: 'records' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #000;
}
</style>
