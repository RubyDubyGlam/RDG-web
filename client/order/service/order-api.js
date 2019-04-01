import axios from 'axios'

export function createOrder(address, payment_token, time, products, phone_number, email_address, coupon) {
	return axios.post('/v1/appointment/book', {
		address,
		payment_token,
		time,
		products,
		phone_number,
		email_address,
		discount: coupon
	}).then((response) => {
		return response.data
	})	
}

