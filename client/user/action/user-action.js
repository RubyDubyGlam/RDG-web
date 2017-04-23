import axios from 'axios'
import {
	loginApi,
	signupApi,
	meApi
} from '../service/user-api'

export function login(username, password) {
	return function(dispatch, getState) {
		loginApi(username, password).then((response) => {
			cookie.save('rdgcookie', response.data.access_token)
			axios.defaults.headers.common['Authorization'] = 'jwt ' + response.data.access_token
		})
	}
}

export function signup(username, password, first_name, last_name, phone_number) {
	return function(dispatch, getState) {
		signupApi(
			username, 
			password, 
			first_name, 
			last_name, 
			phone_number
		).then((response) => {
	    cookie.save('rdgcookie', response.data.access_token)
	  	axios.defaults.headers.common['Authorization'] = 'jwt ' + response.data.access_token
	  })
	}
}

export function me() {
	return function(dispatch, getState) {
		meApi().then((response) => {
			response
		})
	}
}