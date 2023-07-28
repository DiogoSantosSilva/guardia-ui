import { createStore } from 'vuex'
import axios from 'axios'
import RecordService from '@/services/RecordService'

export default createStore({
  state: {
    user: null,
    selectedDependent: null,
    dependents: null,
    records: []
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
    SET_DEPENDENTS_DATA (state, dependents) {
      state.dependents = dependents
    },
    SET_NEW_DEPENDENT_DATA (state, dependent) {
      state.dependents.push(dependent)
    },
    REMOVE_DEPENDENT_DATA (state, dependentId) {
      state.dependents = state.dependents.filter(dependent => dependent.id !== dependentId)
      state.selectedDependent = null
    },
    EDIT_DEPENDENT_DATA (state, dependent) {
      state.dependents.push(dependent)
    },
    SET_RECORD_DATA (state, record) {
      state.records.push(record)
    },
    SET_RECORDS_DATA (state, records) {
      state.records = records
    },
    REMOVE_RECORD_DATA (state, recordId) {
      state.records = state.records.filter(record => record.id !== recordId)
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
        commit('SET_NEW_DEPENDENT_DATA', response.data)
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
        commit('SET_DEPENDENTS_DATA', response.data.dependents)
      })
    },
    editDependent ({ commit }, dependent) {
      console.log()
    },
    createRecord ({ commit }, record) {
      RecordService.postRecord(record).then(
        response => {
          commit('SET_RECORD_DATA', response.data)
        }
      )
    },
    getRecords ({ commit }, userId) {
      axios.get(`//localhost:8000/users/${this.state.user.id}`).then((response) => {
        const idList = response.data.dependents.map(item => item.id)
        RecordService.getRecords(idList).then(
          response => {
            console.log(response.data)
            commit('SET_RECORDS_DATA', response.data)
          }
        )
      })
    },
    deleteRecord ({ commit }, recordId) {
      RecordService.deleteRecord(recordId).then(() => {
        commit('REMOVE_RECORD_DATA', recordId)
      })
    },
    editRecord ({ commit }, record) {
      console.log()
    }
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    },
    dependents (state) {
      return state.dependents
    },
    records (state) {
      return state.records
    }
  }
})
