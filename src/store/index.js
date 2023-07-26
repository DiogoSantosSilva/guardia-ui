import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    selectedDependent: null,
    dependents: null,
    record: null
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common.Autorization = `Bearer ${userData.access_token}`
    },
    CLEAR_USER_DATA (state) {
      state.user = null
      localStorage.removeItem('user')
      axios.defaults.headers.common.Autorization = null
      location.reload()
    },
    SET_DEPENDENT_DATA (state, dependent) {
      if (state.dependents) {
        state.dependents.push(dependent)
      } else {
        state.dependents = dependent
      }
    },
    REMOVE_DEPENDENT_DATA (state, dependentId) {
      state.dependents = state.dependents.filter(dependent => dependent.id !== dependentId)
      state.selectedDependent = null
    },
    EDIT_DEPENDENT_DATA (state, dependent) {
      state.dependents.push(dependent)
    },
    SET_RECORDS_DATA (state) {
      console.log()
    },
    SET_SELECTED_USER (state, dependent) {
      state.selectedDependent = dependent
    }
  },
  actions: {
    async register ({ commit }, credentials) {
      await axios.post('//localhost:8000/signup', credentials).then((response) => {
        commit('SET_USER_DATA', response.data)
      })
    },
    async login ({ commit }, credentials) {
      await axios.post('//localhost:8000/login', credentials).then((response) => {
        commit('SET_USER_DATA', response.data)
      })
    },
    setDependent ({ commit }, dependent) {
      axios.post(`//localhost:8000/users/${this.state.user.id}/dependents`, dependent).then((response) => {
        console.log(response.data)
        commit('SET_DEPENDENT_DATA', response.data)
      })
    },
    logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    },
    deleteDependent ({ commit }, dependentId) {
      axios.delete(`//localhost:8000/users/${this.state.user.id}/dependents/${dependentId}`).then(() => {
        commit('REMOVE_DEPENDENT_DATA', dependentId)
      })
    },
    selectedDependentUser ({ commit }, dependent) {
      commit('SET_SELECTED_USER', dependent)
    },
    setUserDependent ({ commit }) {
      axios.get(`//localhost:8000/users/${this.state.user.id}`).then((response) => {
        commit('SET_DEPENDENT_DATA', response.data.dependents)
      })
    },
    editDependent ({ commit }, dependent) {
      console.log()
    },
    createRecord ({ commit }, dependent) {
      console.log()
    },
    deleteRecord ({ commit }, dependent) {
      console.log()
    },
    editRecord ({ commit }, dependent) {
      console.log()
    }
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    }
  }
})
