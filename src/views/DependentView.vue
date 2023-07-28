<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-img :src="require('@/assets/baby.jpg')" height="300"></v-img>
          <v-card-title class="headline">{{ profileName }}</v-card-title>
          <v-card-text>
            <p>{{ occupation }}</p>
            <p>{{ aboutMe }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <VCalendar class="mt-4" :attributes="attributes" expanded />
  </v-container>
</template>

<script>
import { ref } from 'vue'

export default {
  data: () => ({
    profileName: 'John Doe',
    occupation: 'Web Developer',
    aboutMe:
      'I am a passionate web developer with experience in Vue.js and Vuetify. I love creating beautiful and interactive web applications.',
    attributes: ref([{
      highlight: true,
      dates: [
        new Date(2022, 10, 2),
        new Date(2022, 10, 7),
        new Date(2022, 10, 17),
        new Date(2022, 10, 23)
      ]
    }])
  }),
  computed: {
    eventsMap () {
      const map = {}
      this.events.forEach((e) => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  methods: {
    open (event) {
      alert(event.title)
    }
  }
}
</script>

<style lang="scss" scoped></style>
