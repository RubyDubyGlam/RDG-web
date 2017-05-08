import axios from 'axios'

import {
	meApi,
	getStylists as getStylistsApi
} from '../service/user-api'

import ACTION_TYPES from './user-action-enum'

export function me() {
	return function(dispatch, getState) {
		meApi().then((response) => {
			dispatch({
				type: ACTION_TYPES.AUTH_USER.value,
				payload: {
					user: response
				}
			})
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