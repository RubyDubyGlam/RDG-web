import axios from 'axios'

import {
	meApi,
	getStylists as getStylistsApi,
	logout as logoutApi,
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

export function logout() {
	return function(dispatch, getState) {
		logoutApi().then((response) => {
			window.location.href = '/'
		})
	}
}

export function getStylists() {
	return function(dispatch, getState) {
		getStylistsApi().then((response) => {
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