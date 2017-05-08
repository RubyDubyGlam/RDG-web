import ACTION_TYPES from '../action/user-action-enum';

const INITIAL_STATE = {
	user: null,
  stylists: {}
}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case ACTION_TYPES.AUTH_USER.value:
      return { ...state, user: action.payload.user };
    case ACTION_TYPES.RECEIVED_STYLISTS.value:
      return { ...state, stylists: action.payload.stylists };
  }
  return state;
}