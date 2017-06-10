import axios from 'axios'

export function createOrder(address, payment_token, time, products, phone_number, email_address) {
	return axios.post('/v1/appointment/book', {
		address,
		payment_token,
		time,
		products,
		phone_number,
		email_address
	}).then((response) => {
		return response.data
	})	
}

