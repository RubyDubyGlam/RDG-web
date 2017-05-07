import React, { Component } from 'react'

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'

import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import { map } from 'lodash'

import moment from 'moment'
 
export default class OrderDateTimePlaceSelection extends Component {

	constructor(props) {
		super(props)
		this.state = {
			predictions: [],
			date: '',
			time: '',
			address: ''
		}

		this.autocompleteService = new google.maps.places.AutocompleteService()
		this.geocoder = new google.maps.Geocoder()
	}

  	handleLocationSelect = ({value}) => {
  		this.geocoder.geocode({ 'address': value.description}, (thingy) => {
  			this.setState({
  				address: thingy[0].formatted_address
  			})
  		})
  	}


	handleInput = (input) => {

  		if (!input) {
  			return
  		}

	    let request = {
	      input: input
	    };
	    
	    this.autocompleteService.getPlacePredictions(request, data => {
	    	const predictions = map(data, (prediction, index) => {
	    		return {
	    			text: prediction.description,
	    			value: prediction
	    		}
	    	})

	    	this.setState({ predictions })
	    })
  	}

  	handleSetTime = (event, time) => {
		const display_time = (moment(time).format('hh:mm A'))
		const time_iso = (moment(time).format('kk:mm'))
  		this.setState({display_time, time_iso})
  	}

  	handleSetDate = (event, date) => {
		const display_date = (moment(date).format('dddd MMM do'))
		const date_iso = (moment(date).format('YYYY-MM-DD'))
  		this.setState({display_date, date_iso})  		
  	}

  	handleSetAddress = (address) => {
  		this.setState({address}) 
  	}

  	handleNavigateNext = () => {
  		const {
  			date_iso,
  			time_iso,
  			address
  		} = this.state

  		console.log(this.state)

  		this.props.setDateTimeAddress(date_iso, time_iso, address)
 		this.props.navigateStep(2)()
  	}

	render() {
		return (
			<div>
	        	<DatePicker onChange={this.handleSetDate} hintText="Select a date" />
	        	<TimePicker onChange={this.handleSetTime} hintText="Select a time" />
	    		<AutoComplete
		          hintText="Select a place"
		          dataSource={this.state.predictions}
		          onUpdateInput={this.handleInput}
		          onNewRequest={this.handleLocationSelect}
	        	/>
	        	{ this.state.display_date ? <p>{`${this.state.display_date} - ${this.state.display_time} at ${this.state.address}`}</p> : null }
	        	<FlatButton
		            label="Back"
		            onTouchTap={this.props.navigateStep(0)}
		            style={{marginRight: 12}}
	         	/>
		        <RaisedButton
		            primary={true}
		            disabled= {!this.state.date && !this.state.time && !this.state.address}
		            label="Next"
		            onTouchTap={this.handleNavigateNext}
		        />
	        </div>
		)	
	}
}