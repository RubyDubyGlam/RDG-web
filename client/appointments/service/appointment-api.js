import axios from 'axios'

export function getAppointments(){
	return axios.get('/v1/appointment/appointments').then((response) => {
		return response.data
	})	
}

export function assignStylist(appointment_id, stylist_id){
	return axios.post('/v1/appointment/assign', {
		appointment_id,
		stylist_id
	}).then((response) => {
		return response.data
	})	
}

export function acceptAppointment(appointment_id, state){
	return axios.post(`/v1/appointment/${appointment_id}/${state}`).then((response) => {
		return response.data
	})	
}

