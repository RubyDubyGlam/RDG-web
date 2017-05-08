import React, { Component } from 'react';

import CardExampleWithAvatar from './AppointmentCard'
import AppointmentAssign from './AppointmentAssign'
import AppointmentList from './AppointmentList'

import { Switch, Route } from 'react-router-dom'

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	console.log('wooo')
}

import { connect } from 'react-redux'

import { getAppointments } from '../action/appointment-action'

class AppointmentContainer extends Component {

	componentDidMount(props) {
		console.log(props)
		this.props.getAppointments()
	}

	render() {
		return (
			<Switch>
				<Route path='/appointment/:id/assign' component={AppointmentAssign} />
				<Route path='/appointment/:id' component={CardExampleWithAvatar} />
				<Route path='/appointment' render={() => <AppointmentList appointments={this.props.appointments}/>} />
			</Switch>
		)
	}
}

const mapStateToProps = (state) => {
  return {
  	appointments: state.appointment.appointments
  }
}

let AppointmentContainerComponent = connect( mapStateToProps, {
  getAppointments: getAppointments
})(AppointmentContainer)

export default AppointmentContainerComponent


