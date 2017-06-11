import React, { Component } from 'react'

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'

import { Progress } from 'semantic-ui-react'

import moment from 'moment'

import OrderProductSelection from './OrderProductSelection'
import OrderDateTimePlaceSelection from './OrderDateTimePlaceSelection'
import OrderPaymentSelection from './OrderPaymentSelection'
import OrderConfirm from './OrderConfirm'
import AddressSelection from './AddressSelection'

import MobileFooterIphone from '../../common/components/MobileFooterIphone'

const styles = {
	container: {
		height: '100%',
		width: '100%',
		padding: 0,
		margin: 0,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		overflowY: 'scroll',
		backgroundImage: 'url("/assets/black-gradient.jpg")'
	},
}

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	console.log('wooo')
}

export default class OrderFlow extends Component {
	constructor(props) {
		super(props)

		console.log(props)
		this.state = {
			step: 1,
			date_time: '',
			products: {
				nails: false,
				hair: false,
				makeup: false
			},
			address: '',
			payment_token: '',
			phone_number: props.user.phone_number || '',
		}
	}

	goForward = () => {
		this.setState({step: this.state.step + 1})
	}

	goBack = (step) => {
		this.setState({step: this.state.step - 1})
	}

	setProducts = (products) => {
		this.setState({products})			
	}

	setPayment = (token_id) => {
		this.setState({
			payment_token: token_id
		})
	}

	setContact = (phone_number) => {
		this.setState({
			phone_number
		})
	}

	setDateTimeAddress = (date, time) => {
		const date_time = moment(date + ' ' + time)
		
		this.setState({date_time})
	}

	setAddress = (address) => {
		this.setState({address})
	}

	render() {
		return (
			<div style={styles.container}>
					{ this.state.step === 1 ? <OrderDateTimePlaceSelection form_data={this.state} goForward={this.goForward} goBack={this.goBack} setDateTimeAddress={this.setDateTimeAddress} /> : null }

					{ this.state.step === 2 ? <AddressSelection form_data={this.state} goForward={this.goForward} goBack={this.goBack} setAddress={this.setAddress} /> : null }

					{ this.state.step === 3 ? <OrderPaymentSelection form_data={this.state} goForward={this.goForward} goBack={this.goBack} setPayment={this.setPayment} /> : null }

					{ this.state.step === 4 ? <OrderConfirm form_data={this.state} goForward={this.goForward} goBack={this.goBack} /> : null }
	        </div>
		)		
	}
}
