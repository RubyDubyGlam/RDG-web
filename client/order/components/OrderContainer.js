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
import HomeContainer from '../../home/components/HomeContainer'
import AddonSelection from './AddonSelection'

import ReactTransitions from 'react-transitions';

const styles = {
	container: {
		height: '100%',
		width: '100%',
		padding: 0,
		position: 'absolute',
		top: 0,
		margin: 0,
	}
}

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	console.log('wooo')
}

export default class OrderFlow extends Component {
	constructor(props) {
		super(props)

		console.log(props)
		this.state = {
			step: 0,
			date_time: '',
			products: {
				nails: false,
				hair: false,
				makeup: false
			},
			address: '',
			payment_token: '',
			phone_number: props.user.phone_number || '',
			services: [],
			addons: [],
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

	setPayment = (token_id, last_four) => {
		this.setState({
			payment_token: token_id,
			last_four: last_four
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

	selectService = (base_service) => {
		this.setState({step: 1, base_service})
	}

	selectServiceAndAddons = (services, addons) => {
		this.setState({services, addons, step: 2})
	}

	render() {

		const states = [
			<OrderDateTimePlaceSelection 
				user={this.props.user} 
				key='1' 
				form_data={this.state} 
				goForward={this.goForward} 
				goBack={this.goBack} 
				setDateTimeAddress={this.setDateTimeAddress} 
				setPayment={this.setPayment}
				setAddress={this.setAddress}
			/>,
			<OrderPaymentSelection key='3' form_data={this.state} goForward={this.goForward} goBack={this.goBack} setPayment={this.setPayment} />,
			<OrderConfirm key='4' form_data={this.state} goForward={this.goForward} goBack={this.goBack} />
		]

		return (
			<div style={styles.container}>
				{ this.state.step === 0 && <HomeContainer key='-1' selectService={this.selectServiceAndAddons} /> }
				{ this.state.step === 1 && <AddonSelection key='-2' base_service={this.state.base_service} selectService={this.selectServiceAndAddons} /> }
				{ this.state.step > 1 && (
					<ReactTransitions
					  transition="move-to-left-move-from-right"
					  width={ '100vw' }
					  height={ '100vh' }
					>
						{states[this.state.step - 2]}
					</ReactTransitions>
				) }
	        </div>
		)		
	}
}

