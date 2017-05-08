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

function AssignDrawer(props){
    return (
      <div>
        <Drawer open={props.open}>
          <MenuItem onClick={props.onAssignStylistClick}>Assign Stylist</MenuItem>
          <MenuItem onClick={props.onAssignStylistClick}>Assign to me</MenuItem>
        </Drawer>
      </div>
    )
}

class AppointmentActions extends Component {

	constructor(props) {
		super(props)
		this.state = {
			is_drawer_open: false
		}
	}

	navigateToAssignStylist = () => {
		const appointment_id = this.props.appointment._id
		this.props.navigate(`/appointment/${appointment_id}/assign`)
	}

	render() {
		const appointment_id = this.props.appointment._id

		switch(this.props.permissions) {
			case 2:
				return (
				  <CardActions style={{position: 'absolute', bottom: 56, width: '100%', display: 'flex'}}>
			        <RaisedButton primary style={{flexGrow: 1}} label="Cancel" />
			        <RaisedButton secondary style={{flexGrow: 1}} label="Assign" onClick={() => this.setState({is_drawer_open: true})} />
			        <AssignDrawer 
			        	open={this.state.is_drawer_open}
			        	onAssignStylistClick = {this.navigateToAssignStylist}
			       	/>
			      </CardActions>
				)	

			case 1:
				return (
				  <CardActions style={{position: 'absolute', bottom: 56, width: '100%', display: 'flex'}}>
			        <RaisedButton primary style={{flexGrow: 1}} label="Decline" />
			        <RaisedButton secondary style={{flexGrow: 1}} label="Accept" onClick={() => this.props.acceptAppointment(appointment_id)}/>
			      </CardActions>
				)

			case 0:
				return (
				  <CardActions style={{position: 'absolute', bottom: 56, width: '100%', display: 'flex'}}>
			        <RaisedButton primary style={{flexGrow: 1}} label="Cancel" />
			        <RaisedButton secondary style={{flexGrow: 1}} label="Modify" />
			      </CardActions>
				)	
		}
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