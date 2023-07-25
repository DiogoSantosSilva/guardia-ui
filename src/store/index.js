import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    dependentes: [
      { id: 1, username: 'Diogo Garcia', imageUrl: null, tipo: 'Dependente' },
      { id: 2, username: 'Bruna Garcia', imageUrl: '', tipo: 'Dependente' }
    ],
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
      state.dependentes.push(dependent)
    },
    REMOVE_DEPENDENT_DATA (state, dependentId) {
      state.dependentes = state.dependentes.filter(dependent => dependent.id !== dependentId)
    },
    EDIT_DEPENDENT_DATA (state, dependent) {
      state.dependentes.push(dependent)
    },
    SET_RECORDS_DATA (state) {
      console.log()
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
        console.log(response.data)
        commit('SET_USER_DATA', response.data)
      })
    },
    setDependent ({ commit }, payload) {
      // axios.get(`//localhost:8000/users/${resonsibleId}/dependents`).then((data) => {
      //   commit('SET_DEPENDENTS_DATA', data)
      // })
      console.log(payload.form, 'aqui')
      commit('SET_DEPENDENT_DATA', payload.form)
    },
    logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    },
    deleteDependent ({ commit }, dependentId) {
      commit('REMOVE_DEPENDENT_DATA', dependentId)
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
