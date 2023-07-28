import axios from 'axios'

// servico de exemplo
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getRecords (userIds) {
    const queryParams = new URLSearchParams()
    userIds.forEach(id => queryParams.append('user_ids', id))
    return apiClient.get('/records?' + queryParams.toString())
  },
  getRecord (recordId) {
    return apiClient.get(`/records/${recordId}`)
  },
  postRecord (record) {
    return apiClient.post('/records', record)
  },
  deleteRecord (recordId) {
    return apiClient.delete(`/records/${recordId}`)
  }
}
