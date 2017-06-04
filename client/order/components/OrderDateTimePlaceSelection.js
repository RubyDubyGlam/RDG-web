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
import Snackbar from 'material-ui/Snackbar';

import { map } from 'lodash'

import moment from 'moment'

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
 
export default class OrderDateTimePlaceSelection extends Component {

	constructor(props) {
		super(props)
		const date_time = props.form_data.date_time

		this.state = {
			predictions: [],
			time: date_time ? (moment(date_time).format('kk:mm')) : '',
			display_time: date_time ? (moment(date_time).format('hh:mm A')) : '',
			date: date_time ? (moment(date_time).format('YYYY-MM-DD')) : '',
			display_date: date_time ? (moment(date_time).format('dddd MMM do')) : '',
			address: props.form_data.address,
			error: ''
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

  	handleSetTime = (event, raw_time) => {
		const beginningTime = moment('8:00am', 'h:mma');
		const endTime = moment('6:00pm', 'h:mma');
		const rawTime = moment(moment(raw_time).format('h:mma'), 'h:mma')

		const is_after_eight = rawTime.isAfter(beginningTime)
		const is_before_six = rawTime.isBefore(endTime)

		if (is_after_eight && is_before_six) {
			const display_time = (moment(raw_time).format('hh:mm A'))
			const time = (moment(raw_time).format('kk:mm'))
	  		this.setState({display_time, time, error: ''})			
		} else {
			this.setState({
				display_time: '',
				time: '',
				error: 'Please choose a time between 8am and 6pm'
			})
		}


  	}

  	handleSetDate = (event, raw_date) => {
		const display_date = (moment(raw_date).format('MMM Do'))
		const date = (moment(raw_date).format('YYYY-MM-DD'))
  		this.setState({display_date, date})  		
  	}

  	handleSetAddress = (address) => {
  		this.setState({address}) 
  	}

  	handleNavigateNext = () => {
  		const {
  			date,
  			time,
  			address
  		} = this.state

  		this.props.setDateTimeAddress(date, time, address)
 		this.props.goForward()
  	}

	render() {
		const today = moment().startOf('day')
		console.log(this.state)
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
					<Snackbar
			          open={this.state.error}
			          message={this.state.error ? this.state.error : null}
			          autoHideDuration={4000}
			          onRequestClose={this.closeSnackbar}
			          style={{width: '100%'}}
			        />
			        <div style={{marginTop: 50, display:'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: 1, borderColor: 'gray'}}>
			        	<span style={{color:'white', position: 'absolute'}}> {this.state.display_date || "Select Date"} </span>
			        	<DatePicker 
			        		onChange={this.handleSetDate} 
			        		hintText={"Select a date"} 
			        		style={{opacity: 0, height: 40}}
			        	    shouldDisableDate={(date) => moment(date).isBefore(today)}
			        	/>
		        	</div>
			        <div style={{marginTop: 24, marginBottom: 50, display:'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: 1, borderColor: 'gray'}}>
			        	<span style={{color:'white', position: 'absolute'}}> {this.state.display_time || "Select Time"} </span>
			        	<TimePicker 
			        		defaultTime={this.state.time || null} 
			        		onChange={this.handleSetTime} 
			        		hintText="Select a time" 
			        		style={{opacity: 0, height: 40}}
						/>
			        </div>
			        <div style={{marginTop: 12}}>
				        <p style={{color:'white', fontSize: 24, width:'100%', textAlign: 'left', margin: 0}}>Hours of operation</p>
			        	<p style={{color:'white', fontSize: 18, width:'100%', textAlign: 'left', marginBottom: 2}}>8am to 8pm</p>
				        <p style={{color:'white', width:'100%', textAlign: 'left'}}>
				        	If you desire appointments before our business hours or after we are 
				        	happy to assist you, but there will be a 50% additional cost to the services desired
				        </p>
				        <p style={{color:'white', fontSize: 24, width:'100%', textAlign: 'left', marginBottom: 3}}>Cancellation Policy</p>
				        <p style={{color:'white', width:'100%', textAlign: 'left'}}>
				        	We understand that the unexpected can happen. If you need to cancel 
				        	or reschedule your appointment, please do so by sending an email to 
				        	reservations@rubydubyglam.com. Cancellation within four (4) hours will be charged
				        	a 50% fee. Changes made less than four (4) hours will be charged the full fee.
				        </p>
			        </div>
				    <div style={{position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'center'}}>
				        <RaisedButton
				            primary={true}
				            disabled= {!this.state.date || !this.state.time}
				            label="Next"
				            onTouchTap={this.handleNavigateNext}
				            labelStyle={{color: 'white', fontFamily: "'Great Vibes', cursive", color:'pink'}}
				            overlayStyle={{backgroundImage: 'url("/assets/black-gradient.jpg")'}}
				            style={{width: '100%', height: 60 }}
				        />
			        </div>
	        </div>
		)	
	}
}