import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getRrcords () {
    return apiClient.get('/records')
  },
  getRecord (recordId) {
    return apiClient.get(`/records/${recordId}`)
  },
  postRecord (event) {
    return apiClient.post('/records', event)
  }
}
