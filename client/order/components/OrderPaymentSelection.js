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
		    exp_year: this.state.expr.substring(3,5)
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

	handleExprInput = (e) => {
		let value = e.target.value

		if (value.length === 2 && this.state.expr.length !== 3) {
			const insert = "/";
			const position = 2;
			value = [value.slice(0, position), insert, value.slice(position)].join('');
		}

		this.setState({expr: value})
	}

	render() {
		return (
			<div style={styles.root}>
				  	<div style={{display: 'flex', textAlign: 'center', width: '100%', marginBottom: 24, height: 90, color: 'white', borderStyle: 'solid', borderColor: 'pink', borderWidth: 1 }}>
			  			<div style={{padding: 12, width: '50%', textAlign: 'left'}}>
				  			<p style={{fontSize: 15}}>Blowout</p>
				  			<p style={{fontSize: 16}}>Price: lots</p>
			  			</div>
			  			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
				  			<p style={{fontSize: 15}}>Duration: 60min</p>
				  			<p style={{fontSize: 16}}>{`${this.state.display_date} @ ${this.state.display_time || ''}`}</p>
			  			</div>
	  				</div>
				  	<div style={{textAlign: 'center', paddingLeft: '20%', paddingRight: '20%', marginBottom: 24}}>
			  			<p style={{fontSize: 42, color:'white', fontFamily: "'Great Vibes', cursive" }}> Payment </p>
	  				</div>
				    <TextField
			      		hintText="Name on card"
			      		floatingLabelText="Name on card"
			      		onChange={e => this.setState({name: e.target.value})}
			      		inputStyle={{ color: 'white' }}
			      		floatingLabelStyle = {{ color: 'pink' }}
			      		underlineStyle={{ borderWidth: 0 }}
			      		style={{width: '70%', margin: 5, padding: 16, width: '90%', borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
			    	/>
			    	<div style={{display: 'flex', width: '90%'}} >
					    <TextField
				      		hintText="Card number"
				      		floatingLabelText="Card Number"
				      		onChange={e => this.setState({number: e.target.value})}
				      		inputStyle={{ color: 'white' }}
				      		floatingLabelStyle = {{ color: 'pink' }}
				      		underlineStyle={{ borderWidth: 0 }}
				      		style={{marginRight: 5, marginBottom: 5, marginTop: 5, padding: 16, width: '70%', minWidth: '70%', borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
				    	/>
					    <TextField
				      		hintText="MM/YY"
				      		floatingLabelText="MM/YY"
				      		value={this.state.expr}
				      		onChange={this.handleExprInput}
				      		inputStyle={{ color: 'white' }}
			      			floatingLabelStyle = {{ color: 'pink' }}
				      		underlineStyle={{ borderWidth: 0 }}
				      		style={{padding: 16, flexGrow: 1, marginTop: 5, borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
				    	/>
				    </div>
				    <div style={{display: 'flex', width: '90%'}} >
					    <TextField
				      		hintText="CVC"
				      		floatingLabelText="CVC"
				      		onChange={e => this.setState({cvc: e.target.value})}
				      		inputStyle={{ color: 'white' }}
			      			floatingLabelStyle = {{ color: 'pink' }}
				      		underlineStyle={{ borderWidth: 0 }}
				      		style={{padding: 16, flexGrow: 1, marginTop: 5, marginRight: 5, borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
				    	/>
					    <TextField
				      		hintText="Zip"
				      		floatingLabelText="Zip"
				      		onChange={e => this.setState({zip: e.target.value})}
					      	inputStyle={{ color: 'white' }}
			      			floatingLabelStyle = {{ color: 'pink' }}
				      		underlineStyle={{ borderWidth: 0 }}
				      		style={{padding: 16, flexGrow: 1, marginTop: 5, borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
				    	/>
			    	</div>
				    <div style={{position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'center'}}>
				        <RaisedButton
				            primary={true}
				            label="Next"
				            onTouchTap={this.createToken}
				            disabled={ !this.state.name || !this.state.number || !this.state.expr || !this.state.cvc || !this.state.zip }
				            labelStyle={{color: 'white', fontFamily: "'Great Vibes', cursive", color:'pink'}}
				            overlayStyle={{backgroundImage: 'url("/assets/black-gradient.jpg")'}}
				            style={{width: '100%', height: 60 }}
				        />
			        </div>
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