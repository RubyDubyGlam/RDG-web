import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


import navigate from '../../common/actions/router-actions'
import { 
	acceptAppointment
} from '../action/appointment-action'

import { connect } from 'react-redux'

class AppointmentActions extends Component {

	render() {
		return (
		  <div>
	        <RaisedButton primary style={{flexGrow: 1, paddingRight: 3}} label="Cancel" />
	        <RaisedButton secondary style={{flexGrow: 1, paddingLeft: 3}} label="Modify" />
	       </div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointment.appointments
  }
}

let AppointmentActionsComponent = connect( mapStateToProps, {
  navigate,
  acceptAppointment
})(AppointmentActions)



export default AppointmentActionsComponent;