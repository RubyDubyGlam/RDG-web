import React, { Component } from 'react';

import AppointmentCard from './AppointmentCard'
import AppointmentAssign from './AppointmentAssign'
import AppointmentList from './AppointmentList'
import AppointmentListStylist from './AppointmentListStylist'
import AppointmentListAdmin from './AppointmentListAdmin'
import AppointmentRouter from './AppointmentRouter'

import { Switch, Route } from 'react-router-dom'

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	console.log('wooo')
}

export default class AppointmentContainer extends Component {

	render() {
		return (
			<Switch>
				<Route path='/appointment/:id/assign' component={AppointmentAssign} />
				<Route path='/appointment/:id' render={() => <AppointmentCard appointments={this.props.appointments} />} />
				<Route path='/appointment' component={AppointmentRouter} />
			</Switch>
		)
	}
}


