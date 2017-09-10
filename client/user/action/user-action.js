import axios from 'axios'

import {
	meApi,
	getStylists as getStylistsApi,
	logout as logoutApi,
	login as loginApi,
	register as registerApi,
	changePassword as changePasswordApi,
	changePhoneNumber as changePhoneNumberApi,
	changeEmailAddress as changeEmailAddressApi,
	subscribe as subscribeApi,
	unsubscribe as unsubscribeApi,
} from '../service/user-api'

import ACTION_TYPES from './user-action-enum'

export function me() {
	return function(dispatch, getState) {
		return meApi().then((response) => {
			dispatch({
				type: ACTION_TYPES.AUTH_USER.value,
				payload: {
					user: response
				}
			})
		})
	}
}

export function login(email_address, password) {
	return function(dispatch, getState) {
		return loginApi(email_address, password).then((response) => {
			window.location.href = '/'
		})
	}
}

export function register(email_address, password) {
	return function(dispatch, getState) {
		return registerApi(email_address, password).then((response) => {
			window.location.href = '/'
		})
	}
}

export function logout() {
	return function(dispatch, getState) {
		return logoutApi().then((response) => {
			window.location.href = '/'
		})
	}
}

export function getStylists() {
	return function(dispatch, getState) {
		return getStylistsApi().then((response) => {
			dispatch({
				type: ACTION_TYPES.RECEIVED_STYLISTS.value,
				payload: {
					stylists: response
				}
			})
		})
	}
}

export function changePhoneNumber(phone_number) {
	return function(dispatch, setState) {
		dispatch({
			type: ACTION_TYPES.USER_INFO_CHANGING.value
		})
		return changePhoneNumberApi(phone_number).then((user) => {
			dispatch({
				type: ACTION_TYPES.USER_INFO_CHANGED.value,
				payload: {
					user: user
				}
			})
		})
	}
}

export function changePassword(password) {
	return function(dispatch, setState) {
		dispatch({
			type: ACTION_TYPES.USER_INFO_CHANGING.value
		})
		return changePasswordApi(password).then((user) => {
			dispatch({
				type: ACTION_TYPES.USER_INFO_CHANGED.value,
				payload: {
					user: user
				}
			})
		})
	}
}

export function changeEmailAddress(phone_number) {
	return function(dispatch, setState) {
		dispatch({
			type: ACTION_TYPES.USER_INFO_CHANGING.value
		})
		return changeEmailAddressApi(phone_number).then((user) => {
			dispatch({
				type: ACTION_TYPES.USER_INFO_CHANGED.value,
				payload: {
					user: user
				}
			})
		})
	}
}

export function toggleSubscribe(subscribed) {
	return function(dispatch, setState) {
		dispatch({
			type: ACTION_TYPES.USER_INFO_CHANGING.value
		})
		if (!subscribed) {
			return unsubscribeApi().then((user) => {
				dispatch({
					type: ACTION_TYPES.USER_INFO_CHANGED.value,
					payload: {
						user: user
					}
				})
			})			
		}
		
		return subscribeApi().then((user) => {
			dispatch({
				type: ACTION_TYPES.USER_INFO_CHANGED.value,
				payload: {
					user: user
				}
			})
		})	
	}	
}