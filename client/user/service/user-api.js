import axios from 'axios'

export function meApi() {
  return axios.get('/v1/me').then((response) => {
    return response.data
  })  
}

export function getUser() {
  return axios.get('/v1/user').then((response) => {
    return response.data
  })  
}

export function getStylists() {
  return axios.get('/v1/stylists').then((response) => {
    return response.data
  })  
}