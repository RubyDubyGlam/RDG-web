import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { withRouter } from 'react-router'


import navigate from '../../common/actions/router-actions'
import { 
	appointmentStateChange
} from '../action/appointment-action'

import { connect } from 'react-redux'

function AssignDrawer(props){
    return (
      <div>
        <Drawer open={props.open} width={'40%'} onRequestChange={(open) => props.handleDrawerChange(open)}>
          <MenuItem onClick={props.onAssignStylistClick}>Assign Stylist</MenuItem>
          <MenuItem onClick={props.onAssignStylistClick}>Assign to me</MenuItem>
        </Drawer>
      </div>
    )
}

class AppointmentActions extends Component {

	render() {
		const {
			_id, 
			status,
			latitude,
            longitude,
		} = this.props.appointment

		if (status === 2) {
			return (
			  <div style={{display: 'flex', width: '100%'}}>
			  	<RaisedButton primary style={{flexGrow: 1, width: '50%', paddingRight: 3}} label="Get Directions" onClick={() => {
			  		window.location.href = `http://maps.apple.com/?q=${latitude},${longitude}`
			  	}}/>
		        <RaisedButton secondary style={{flexGrow: 1, width: '50%', paddingLeft: 3}} label="On my way" onClick={() => this.props.appointmentStateChange(_id, 'enroute')}/>
		      </div>
			)			
		}

		if (status === 3) {
			return (
			  <div style={{display: 'flex', width: '100%'}}>
		        <RaisedButton secondary style={{flexGrow: 1}} label="Begin" onClick={() => this.props.appointmentStateChange(_id, 'begin')}/>
		      </div>
			)			
		}

		if (status === 4) {
			return (
			  <div style={{display: 'flex', width: '100%'}}>
		        <RaisedButton secondary style={{flexGrow: 1}} label="Done" onClick={() => this.props.appointmentStateChange(_id, 'complete')}/>
		      </div>
			)			
		}

		if (status === 5) {
			return null
		}

		return (
			<div style={{display: 'flex', width: '100%'}}>
		        <RaisedButton primary style={{flexGrow: 1, paddingRight: 3}} label="Decline" />
		        <RaisedButton secondary style={{flexGrow: 1, paddingLeft: 3}} label="Accept" onClick={() => this.props.appointmentStateChange(_id, 'accept')}/>
			</div>
		)


	}
}

const mapStateToProps = (state) => {
  return {}
}

let AppointmentActionsComponent = withRouter(connect( mapStateToProps, {
  navigate,
  appointmentStateChange
}, undefined, {pure: false})(AppointmentActions))



export default AppointmentActionsComponent;