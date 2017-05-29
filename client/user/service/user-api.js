import axios from 'axios'

export function meApi() {
  return axios.get('/v1/user/me').then((response) => {
    return response.data
  })  
}

export function logout() {
  return axios.get('/v1/auth/logout').then((response) => {
    return response.data
  })  
}

export function getUser(user_id) {
  return axios.get(`/v1/user/${user_id}`).then((response) => {
    return response.data
  })  
}

export function getStylists() {
  return axios.get('/v1/user/stylists').then((response) => {
    return response.data
  })  
}

export function changePhoneNumber(phone_number) {
  return axios.post('/v1/user/change-phone-number', {
    phone_number
  }).then((response) => {
    return response.data
  })
}

export function changeEmailAddress(email_address) {
  return axios.post('/v1/user/change-email-address', {
    email_address
  }).then((response) => {
    return response.data
  })
}

export function subscribe() {
  return axios.post('/v1/user/subscribe').then((response) => {
    return response.data
  })  
}

export function unsubscribe() {
  return axios.post('/v1/user/unsubscribe').then((response) => {
    return response.data
  })  
}
