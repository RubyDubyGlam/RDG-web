import ACTION_TYPES from '../action/appointment-action-enum';
import { merge } from 'lodash'

const INITIAL_STATE = {
	appointments: {},
	is_editing: false
}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case ACTION_TYPES.RECEIVED_APPOINTMENTS.value:
      return { ...state, appointments: action.payload.appointments };
    case ACTION_TYPES.ASSIGNING_STYLIST.value:
      return { ...state, is_editing: true };
    case ACTION_TYPES.STYLIST_ASSIGNED.value:
      return { ...state, is_editing: false, appointments: merge(state.appointments, action.payload.appointment) };
    case ACTION_TYPES.ACCEPTING_APPOINTMENT.value:
      return { ...state, is_editing: true };
    case ACTION_TYPES.APPOINTMENT_ACCEPTED.value:
      return { ...state, is_editing: false, appointments: merge(state.appointments, action.payload.appointment) };
  }
  return state;
}