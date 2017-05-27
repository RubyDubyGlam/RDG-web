import React, { Component } from 'react';

import CardExampleWithAvatar from './AppointmentCard'
import AppointmentAssign from './AppointmentAssign'
import AppointmentList from './AppointmentList'
import AppointmentListStylist from './AppointmentListStylist'
import AppointmentListAdmin from './AppointmentListAdmin'

import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import { getAppointments } from '../action/appointment-action'

class AppointmentRoute extends Component {

	componentDidMount(props) {
		this.props.getAppointments()
	}

	componentWillReceiveProps(nextProps) {
		console.log('proppiiess', nextProps)
	}

	render() {
		if (this.props.user.roles.admin) return <AppointmentListAdmin />
		if (this.props.user.roles.stylist) return <AppointmentListStylist />
		return <AppointmentList />
	}
}

const mapStateToProps = (state) => {
  return {
  	appointments: state.appointment.appointments,
  	user: state.user.user
  }
}

let AppointmentRouteComponent = connect( mapStateToProps, {
  getAppointments: getAppointments
})(AppointmentRoute)

export default AppointmentRouteComponent