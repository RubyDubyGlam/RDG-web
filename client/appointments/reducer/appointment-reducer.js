import ACTION_TYPES from '../action/appointment-action-enum';
import ORDER_ACTION_TYPES from '../../order/action/order-action-enum'
import { merge } from 'lodash'

const INITIAL_STATE = {
	appointments: {},
	is_editing: false
}

export default function (state = INITIAL_STATE, action) {
  console.log(action.type, 'firing') 
  switch(action.type) {
    case ACTION_TYPES.RECEIVED_APPOINTMENTS.value:
      return { ...state, appointments: action.payload.appointments };
    case ACTION_TYPES.ASSIGNING_STYLIST.value:
      return { ...state, is_editing: true };
    case ACTION_TYPES.STYLIST_ASSIGNED.value:
      console.log(action.payload.appointment)
      return { ...state, is_editing: false, appointments: merge(state.appointments, action.payload.appointment) };
    case ACTION_TYPES.APPOINTMENT_STATE_CHANGING.value:
      return { ...state, is_editing: true };
    case ACTION_TYPES.APPOINTMENT_STATE_CHANGED.value:
      return { ...state, is_editing: false, appointments: merge(state.appointments, action.payload.appointment) };
    case ORDER_ACTION_TYPES.APPOINTMENT_CREATED.value:
      return { ...state, is_editing: false, appointments: merge(state.appointments, action.payload.appointment) };
  }
  return state;
}