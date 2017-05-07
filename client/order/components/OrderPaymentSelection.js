import React, {Component} from 'react'

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

import Snackbar from 'material-ui/Snackbar';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

export default class OrderPaymentSelection extends Component {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			number: '',
			expr: '',
			cvc: '',
			zip: '',
			error: ''
		}
		Stripe.setPublishableKey('pk_test_BTRrj2yjVesTnchX9JbiYJE3')
	}

	createToken = () => {
	  	Stripe.card.createToken({
		    number: this.state.number,
		    cvc: this.state.cvc,
		    exp_month: this.state.expr.substring(0,2),
		    exp_year: this.state.expr.substring(2,4)
		}, (status, response) => {
			if (status === 200) {
				this.props.setPayment(response.id)
				this.props.navigateStep(3)()				
			} else {
				this.setState({
					error: response.error.message
				})
			}
		})
	}

	closeSnackbar = () => {
		this.setState({
			error: ''
		})
	}

	render() {
		return (
			<div>
			    <TextField
		      		hintText="Name on card"
		      		onChange={e => this.setState({name: e.target.value})}
		    	/>
			    <TextField
		      		hintText="Card number"
		      		onChange={e => this.setState({number: e.target.value})}
		    	/>
			    <TextField
		      		hintText="MM/YY"
		      		onChange={e => this.setState({expr: e.target.value})}
		    	/>
			    <TextField
		      		hintText="CVC"
		      		onChange={e => this.setState({cvc: e.target.value})}
		    	/>
			    <TextField
		      		hintText="Zip"
		      		onChange={e => this.setState({zip: e.target.value})}
		    	/>
	        	<FlatButton
		            label="Back"
		            onTouchTap={this.props.navigateStep(1)}
		            style={{marginRight: 12}}
	         	/>
		        <RaisedButton
		            primary={true}
		            label="Next"
		            onTouchTap={this.createToken}
		        />

		        <Snackbar
		          open={this.state.error}
		          message={this.state.error ? this.state.error : null}
		          autoHideDuration={4000}
		          onRequestClose={this.closeSnackbar}
		        />
	        </div>
		)
	}
}