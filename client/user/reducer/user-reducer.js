import ACTION_TYPES from '../action/user-action-enum';

const INITIAL_STATE = {
	user: null,
  is_editing: false,
  stylists: {}
}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case ACTION_TYPES.AUTH_USER.value:
      return { ...state, user: action.payload.user };
    case ACTION_TYPES.DEAUTH_USER.value:
      return INITIAL_STATE;
    case ACTION_TYPES.RECEIVED_STYLISTS.value:
      return { ...state, stylists: action.payload.stylists };
    case ACTION_TYPES.USER_INFO_CHANGING.value:
      return {...state, is_editing: true}
    case ACTION_TYPES.USER_INFO_CHANGED.value:
      return { ...state, user: action.payload.user };
  }
  return state;
}