import axios from 'axios'
/*
  Reusable Axios instance:
  - baseURL points to the Django backend server (default localhost:8000)
  - attaches JWT token from localStorage
  - handles global errors and response logging using interceptors
*/
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if(token) config.headers.Authorization = `Bearer ${token}`
  console.log('[API Request]', config.method, config.url)
  return config
}, error => Promise.reject(error))

axiosInstance.interceptors.response.use(response => {
  console.log('[API Response]', response.status, response.config.url)
  return response
}, error => {
  // Global error handling: show friendly messages for common issues
  if(!error.response){
    alert('Network error: please check your internet or backend server.')
  } else if(error.response.status === 401){
    alert('Unauthorized: please login again.')
    localStorage.removeItem('token')
    window.location.href = '/login'
  } else {
    const msg = error.response.data?.detail || error.message
    alert('API Error: ' + msg)
  }
  return Promise.reject(error)
})

export default axiosInstance
