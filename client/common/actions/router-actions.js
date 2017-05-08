import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export default function navigate(path) {
	return function(dispatch, getState) {
		dispatch(push(path))
	}
}