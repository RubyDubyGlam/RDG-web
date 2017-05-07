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

import MobileFooterIphone from '../../common/components/MobileFooterIphone'

const styles = {
	container: {
		height: '100%',
		width: '100%',
		padding: 0,
		margin: 0,
		display: 'flex',
		flexDirection: 'column',
	},
}


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	console.log('wooo')
}

export default class OrderFlow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			step: 0,
			date: '',
			time: '',
			product: '',
			address: '',
			payment_token: ''
		}
	}

	navigateStep = (step) => {
		return () => {
			this.setState({step})
			console.log(this.state)
		}
	}

	setProduct = (product) => {
		return (event) => {
			this.setState({product})			
		}

	}

	setPayment = (token_id) => {
		this.setState({
			payment_token: token_id
		})
	}

	setDateTimeAddress = (date, time, address) => {
		this.setState({date, time, address})
	}

	render() {
		return (
			<div style={styles.container}>
					<Progress percent={60} active />
					{ this.state.step === 0 ? <OrderProductSelection navigateStep={this.navigateStep} /> : null }

					{ this.state.step === 1 ? <OrderDateTimePlaceSelection navigateStep={this.navigateStep} setDateTimeAddress={this.setDateTimeAddress} /> : null }

					{ this.state.step === 2 ? <OrderPaymentSelection navigateStep={this.navigateStep} setPayment={this.setPayment} /> : null }

					{ this.state.step === 3 ? <OrderConfirm form_data={this.state} navigateStep={this.navigateStep} /> : null }

	        </div>
		)		
	}
}
