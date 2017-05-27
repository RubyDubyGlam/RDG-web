import axios from 'axios'

export function createOrder(address, payment_token, time, products, phone_number) {
	return axios.post('/v1/appointment/book', {
		address,
		payment_token,
		time,
		products,
		phone_number
	}).then((response) => {
		return response.data
	})	
}

