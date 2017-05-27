import React, { Component } from 'react'

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'

import { Progress } from 'semantic-ui-react'

import moment from 'moment'

import WebOrderProductSelection from './WebOrderProductSelection'
import WebOrderDateTimePlaceSelection from './WebOrderDateTimePlaceSelection'
import WebOrderPaymentSelection from './WebOrderPaymentSelection'
import WebOrderConfirm from './WebOrderConfirm'

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
		overflowY: 'scroll'
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

	setDateTimeAddress = (date, time, address) => {
		const date_time = moment(date + ' ' + time)
		
		this.setState({date_time, address})
	}

	render() {
		return (
			<div style={styles.container}>
					<Progress style={{width: '100%', marginBottom: 20}} percent={this.state.step * 25} active />
					{ this.state.step === 1 ? <WebOrderProductSelection setProducts={this.setProducts} goForward={this.goForward} goBack={this.goBack} form_data={this.state} /> : null }

					{ this.state.step === 2 ? <WebOrderDateTimePlaceSelection form_data={this.state} goForward={this.goForward} goBack={this.goBack} setDateTimeAddress={this.setDateTimeAddress} /> : null }

					{ this.state.step === 3 ? <WebOrderPaymentSelection goForward={this.goForward} goBack={this.goBack} setPayment={this.setPayment} /> : null }

					{ this.state.step === 4 ? <WebOrderConfirm form_data={this.state} goForward={this.goForward} goBack={this.goBack} /> : null }

	        </div>
		)		
	}
}