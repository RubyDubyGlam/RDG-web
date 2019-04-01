import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

import navigate from '../../common/actions/router-actions'
import {
	assignStylist,
	appointmentStateChange
} from '../action/appointment-action'

import { connect } from 'react-redux'

import AppointmentActionsStylist from './AppointmentActionsStylist'

function AssignDrawer(props){
    return (
      <div>
        <Drawer style={{top: 65, height: 'calc(100% - 65px)'}} containerStyle={{top: 65, height: 'calc(100% - 65px)'}} docked={false} open={props.open} width={'50%'} onRequestChange={(open) => props.onRequestChange(open)}>
          <MenuItem onClick={props.onAssignStylistClick}>Assign stylist</MenuItem>
          <MenuItem onClick={props.onAssignToMe}>Assign to me</MenuItem>
        </Drawer>
      </div>
    )
}

function RemoveOrderDialog(props){
    const actions = [
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={props.handleDialogClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onTouchTap={props.handleCancelOrder}
      />,
    ]

    return (
        <Dialog
          title="Cancel order"
          actions={actions}
          modal={false}
          open={props.open}
          onRequestClose={props.handleDialogClose}
        >
          Are you sure you would like to cancel this order?
        </Dialog>
    )
}

class AppointmentActions extends Component {

	constructor(props) {
		super(props)
		this.state = {
			is_drawer_open: false,
			is_dialog_open: false
		}
	}

	navigateToAssignStylist = () => {
		const appointment_id = this.props.appointment._id
		this.props.navigate(`/appointment/${appointment_id}/assign`)
	}

	componentWillReceiveProps(nextProps) {
		console.log('NEW PROPS WOOR')
	}

	assignToMe = () => {
		const appointment_id = this.props.appointment._id

		this.props.assignStylist(
			appointment_id,
			this.props.user._id
		)

		this.setState({is_drawer_open: false})
	}

	handleDialogClose = () => {
		this.setState({
			is_dialog_open: false
		})
	}

	handleCancelOrder = () => {
		const appointment_id = this.props.appointment._id
		this.props.appointmentStateChange(appointment_id, 'cancel').then(() => {
			this.props.navigate(`/appointment/`)			
		})
	}

	render() {
		const appointment_id = this.props.appointment._id
		const roles = this.props.roles

		if (roles.admin) {
			return (
			  <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
			  	<div style={{display: 'flex', order: 1}}>
			        <RaisedButton primary style={{flexGrow: 1, paddingRight: 3}} label="Remove" onClick={() => this.setState({is_dialog_open: true})} />
			        <RaisedButton secondary style={{flexGrow: 1, paddingLeft: 3}} label="Assign" onClick={() => this.setState({is_drawer_open: true})} />
		        </div>
		        <div style={{display: 'flex', order: 2, marginTop: 12}}>
			        {this.props.user._id === this.props.appointment.stylist_id && <AppointmentActionsStylist appointment={this.props.appointment}/>}
		        </div>
		        <AssignDrawer 
		        	open={this.state.is_drawer_open}
		        	onAssignStylistClick={this.navigateToAssignStylist}
		        	onAssignToMe={this.assignToMe}
		        	onRequestChange={(is_drawer_open) => this.setState({is_drawer_open})}
		       	/>
		       	<RemoveOrderDialog handleCancelOrder={this.handleCancelOrder} open={this.state.is_dialog_open} handleDialogClose={this.handleDialogClose}/>
		      </div>
			)			
		}

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
    appointments: state.appointment.appointments,
    user: state.user.user
  }
}

let AppointmentActionsComponent = connect( mapStateToProps, {
  navigate,
  assignStylist, 
  appointmentStateChange
})(AppointmentActions)

export default AppointmentActionsComponent;