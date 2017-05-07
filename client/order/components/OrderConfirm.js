import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment'

import axios from 'axios'

export default class OrderConfirm extends Component {

	onSubmit = () => {
		const appointment = this.props.form_data

		const date_time = moment(appointment.date + ' ' + appointment.time)

		axios.post('/v1/appointment/book', {
			address: appointment.address,
			payment_token: appointment.payment_token,
			time: date_time.unix(),
		})
	}

	render() {
		return (
			<div>
	        	<Paper style={{height: 200, width: '100%', textAlign:'center', padding: 3 }} zDepth={1}>
	        		Order Summary
	        		<p>The man has a face</p>
	        	</Paper>
	        	<FlatButton
		            label="Back"
		            onTouchTap={this.props.navigateStep(2)}
		            style={{marginRight: 12}}
	         	/>
		        <RaisedButton
		            primary={true}
		            label="Book"
		            onTouchTap={this.onSubmit}
		        />
		    </div>
		)
		
	}
}