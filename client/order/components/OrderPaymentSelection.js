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

import Loader from '../../common/components/Loader'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    textAlign: 'center'
  },
};

import { withRouter } from 'react-router'

import moment from 'moment'

var product_list = {
  'blowout': {
    price: 5000,
    duration: 45,
    name: 'Blowout',
  },
  'blowout+braid': {
    price: 7500,
    duration: 50,
    name: 'Blowout & Braid',
  },
  'updo': {
    price: 8500,
    duration: 90,
    name: 'Up-do',
  },
  'makeup': {
    price: 6500,
    duration: 60,
    name: 'Makeup',
  },
  'makeup+lashstrip': {
    price: 8500,
    duration: 60,
    name: 'Makeup & Lash Strip',
  },
  'lashextensions': {
    price: 20000,
    duration: 120,
    name: 'Lash Extensions',
  },
  'lashfill': {
    price: 12500,
    duration: 120,
    name: 'Lash Fill',
  },
}

class OrderPaymentSelection extends Component {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			number: '',
			expr: '',
			cvc: '',
			zip: '',
			error: '',
			is_valid_card: false,
			is_loading: false
		}
		Stripe.setPublishableKey('pk_test_BTRrj2yjVesTnchX9JbiYJE3')
	}

	createToken = () => {
		this.setState({is_loading: true})
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
					error: response.error.message,
					is_loading: false,
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
		const product = this.props.match.params.service

		const appointment = this.props.form_data

		const display_time = (moment(appointment.date_time).format('hh:mm A'))
		const display_date = (moment(appointment.date_time).format('MMM Do'))

		let button_text = 'Next'

		if (!this.state.zip) {
			button_text = 'Invalid Zip'
		} 

		if (!this.state.cvc) {
			button_text = 'Invalid CVC'
		} 

		if (!this.state.expr) {
			button_text = 'Invalid Expiration'
		}

		if (!this.state.number) {
			button_text = 'Invalid Number'
		} 

		if (!this.state.name) {
			button_text = 'Invalid Name'
		}

		return (
			<div style={styles.root}>
					{ this.state.is_loading && <Loader /> }
				  	<div style={{display: 'flex', textAlign: 'center', width: '100%', marginBottom: 24, minHeight: 90, color: 'white', borderStyle: 'solid', borderColor: 'pink', borderWidth: 1 }}>
			  			<div style={{padding: 12, width: '50%', textAlign: 'left'}}>
				  			<p style={{fontSize: '1em'}}>{product_list[product].name}</p>
				  			<p style={{fontSize: '1em'}}>Price: ${product_list[product].price / 100}</p>
			  			</div>
			  			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
				  			<p style={{fontSize: '1em'}}>Duration: {product_list[product].duration} min</p>
				  			<p style={{fontSize: '1em'}}>{`${display_date} @ ${display_time || ''}`}</p>
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
			      		style={{minHeight: 80, width: '70%', margin: 5, padding: 16, width: '90%', borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
			    	/>
			    	<div style={{display: 'flex', width: '90%', minHeight: 80, margin: 5}} >
					    <TextField
				      		hintText="Card number"
				      		floatingLabelText="Card Number"
				      		onChange={e => this.setState({number: e.target.value})}
				      		inputStyle={{ color: 'white' }}
				      		floatingLabelStyle = {{ color: 'pink' }}
				      		underlineStyle={{ borderWidth: 0 }}
				      		style={{minHeight: 80, marginRight: 5, marginBottom: 5, marginTop: 5, padding: 16, width: '70%', minWidth: '70%', borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
				    	/>
					    <TextField
				      		hintText="MM/YY"
				      		floatingLabelText="MM/YY"
				      		value={this.state.expr}
				      		onChange={this.handleExprInput}
				      		inputStyle={{ color: 'white' }}
			      			floatingLabelStyle = {{ color: 'pink' }}
				      		underlineStyle={{ borderWidth: 0 }}
				      		style={{minHeight: 80, padding: 16, flexGrow: 1, marginTop: 5, borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
				    	/>
				    </div>
				    <div style={{display: 'flex', width: '90%', minHeight: 80, margin: 5, marginBottom: 26}} >
					    <TextField
				      		hintText="CVC"
				      		floatingLabelText="CVC"
				      		onChange={e => this.setState({cvc: e.target.value})}
				      		inputStyle={{ color: 'white' }}
			      			floatingLabelStyle = {{ color: 'pink' }}
				      		underlineStyle={{ borderWidth: 0 }}
				      		style={{minHeight: 80, padding: 16, flexGrow: 1, marginTop: 5, marginRight: 5, borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
				    	/>
					    <TextField
				      		hintText="Zip"
				      		floatingLabelText="Zip"
				      		onChange={e => this.setState({zip: e.target.value})}
					      	inputStyle={{ color: 'white' }}
			      			floatingLabelStyle = {{ color: 'pink' }}
				      		underlineStyle={{ borderWidth: 0 }}
				      		style={{minHeight: 80, marginBottom: 26, padding: 16, flexGrow: 1, marginTop: 5, borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
				    	/>
			    	</div>
				    <div style={{ minHeight: 60, bottom: 0, width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', flexGrow: 1}}>
				        <RaisedButton
				            primary={true}
				            label={button_text}
				            onTouchTap={this.createToken}
				            disabled={ !this.state.name || !this.state.number || !this.state.expr || !this.state.cvc || !this.state.zip }
				            labelStyle={{ color:'pink' }}
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

export default withRouter(OrderPaymentSelection)