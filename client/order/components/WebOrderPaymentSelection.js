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
import Paper from 'material-ui/Paper'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', 
    overflowY: 'scroll',
    textAlign: 'center'
  },
};

export default class OrderPaymentSelection extends Component {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			number: '',
			expr: '',
			cvc: '',
			zip: '',
			error: '',
			is_valid_card: false
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
				this.props.goForward()				
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
			<div style={styles.root}>
			  	<div style={{textAlign: 'center', paddingLeft: '30%', paddingRight: '30%', marginBottom: 24}}>
		  			<p style={{fontSize: 15}}> Step 3 of 4 </p>
		  			<p style={{fontSize: 40}}> Where are we going to meet you? </p>
		  			<p style={{fontSize: 15}}> We'll try to autocomplete your address </p>
  				</div>
  				<div style={{display: 'flex'}}>
  					<div style={{display: 'flex', flexDirection:'column'}}>
					    <TextField
				      		hintText="Card number"
				      		floatingLabelText="Card Number"
				      		onChange={e => this.setState({number: e.target.value})}
				    	/>
			    		<TextField
				      		hintText="CVC"
				      		floatingLabelText="CVC"
				      		onChange={e => this.setState({cvc: e.target.value})}
				    	/>
					    <TextField
				      		hintText="MM/YY"
				      		floatingLabelText="MM/YY"
				      		onChange={e => this.setState({expr: e.target.value})}
				    	/>
			    	</div>
			    	<div style={{display: 'flex', flexDirection:'column', marginLeft: 20}}>
					    <TextField
				      		hintText="Name on card"
				      		floatingLabelText="Name on card"
				      		onChange={e => this.setState({name: e.target.value})}
				    	/>
					    <TextField
				      		hintText="Zip"
				      		floatingLabelText="Zip"
				      		onChange={e => this.setState({zip: e.target.value})}
				    	/>
			    	</div>
			    </div>
			    <Paper style={{width: '100%', height: 125, position: 'absolute', bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
		        	<FlatButton
			            label="Back"
			            onTouchTap={this.props.goBack}
			            style={{marginRight: 12}}
		         	/>
			        <RaisedButton
			            primary={true}
			            label="Next"
			            onTouchTap={this.createToken}
			            disabled={ !this.state.name || !this.state.number || !this.state.expr || !this.state.cvc || !this.state.zip }
			        />
		          </Paper>


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