import { keyBy } from 'lodash'

import ACTION_TYPES from './order-action-enum'

import {
	createOrder as createOrderApi,
} from '../service/order-api'

export function createOrder(address, payment_token, time, products, phone_number, email_address, coupon) {
	return function(dispatch, setState) {
		dispatch({
			type: ACTION_TYPES.APPOINTMENT_CREATING.value
		})

		return createOrderApi(address, payment_token, time, products, phone_number, email_address, coupon).then((appointment) => {
			dispatch({
				type: ACTION_TYPES.APPOINTMENT_CREATED.value,
				payload: {
					appointment: keyBy([appointment], '_id')
				}
			})
		})
	}
}