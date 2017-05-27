import { 
	getAppointments as getAppointmentsApi,
	assignStylist as assignStylistApi,
	acceptAppointment as acceptAppointmentApi
} from '../service/appointment-api'

import { keyBy } from 'lodash'

import ACTION_TYPES from './appointment-action-enum'

export function getAppointments() {
	return function(dispatch) {
		return getAppointmentsApi().then((response) => {
			dispatch({
				type: ACTION_TYPES.RECEIVED_APPOINTMENTS.value,
				payload: {
					appointments: keyBy(response, '_id')
				}
			})
		})
	}
}

export function assignStylist(appointment_id, stylist_id) {
	return function(dispatch) {
		dispatch({
			type: ACTION_TYPES.ASSIGNING_STYLIST.value
		})

		return assignStylistApi(appointment_id, stylist_id).then((response) => {
			dispatch({
				type: ACTION_TYPES.STYLIST_ASSIGNED.value,
				payload: {
					appointment: keyBy([response], '_id')
				}
			})
		})
	}
}

export function appointmentStateChange(appointment_id, state) {
	return function(dispatch) {
		dispatch({
			type: ACTION_TYPES.APPOINTMENT_STATE_CHANGING.value
		})

		return acceptAppointmentApi(appointment_id, state).then((response) => {
			dispatch({
				type: ACTION_TYPES.APPOINTMENT_STATE_CHANGED.value,
				payload: {
					appointment: keyBy([response], '_id')
				}
			})
		})
	}
}