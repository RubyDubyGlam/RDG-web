import axios from 'axios'

export function loginApi(username, password) {
  return axios.post('v1/auth', {
    username: username,
    password: password
  })
}

export function signupApi(username, password, first_name, last_name, phone_number) {
  return axios.post('v1/register', {
    email_address: username,
    password: password,
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number
  })
}

export function meApi() {
  axios.get('v1/me', {
    headers: { 'Authorization': 'jwt ' + cookie.load('rdgcookie') }
  })  
}