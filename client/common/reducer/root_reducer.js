import { combineReducers } from 'redux'
import user from '../../user/reducer/user-reducer'
import appointment from '../../appointments/reducer/appointment-reducer'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export default combineReducers({
  user,
  appointment,
  router: routerReducer
})