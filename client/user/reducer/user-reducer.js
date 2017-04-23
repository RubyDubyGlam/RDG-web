import { 
	AUTH_USER,  
  UNAUTH_USER,
} from '../actions/action-enum';

const INITIAL_STATE = {
	user: null
}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case AUTH_USER:
      return { ...state, user: action.payload.user };
    case UNAUTH_USER:
      return { ...state, user: null };
  }
  return state;
}