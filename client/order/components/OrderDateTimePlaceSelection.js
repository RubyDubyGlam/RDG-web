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
		const display_date = (moment(raw_date).format('dddd MMM do'))
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
				<div style={{
					position: 'absolute',
				    bottom: 125,
				    top: 70,
				    overflowY: 'scroll'
				}}>
				  	<div style={{textAlign: 'center', paddingLeft: '30%', paddingRight: '30%', marginBottom: 24}}>
			  			<p style={{fontSize: 15}}> Step 2 of 4 </p>
			  			<p style={{fontSize: 16}}> Where are we going to meet you? </p>
	  				</div>
					<Snackbar
			          open={this.state.error}
			          message={this.state.error ? this.state.error : null}
			          autoHideDuration={4000}
			          onRequestClose={this.closeSnackbar}
			          style={{width: '100%'}}
			        />
		        	<DatePicker 
		        		onChange={this.handleSetDate} 
		        		hintText="Select a date" 
		        		style={{marginBottom: 20}}
		        	    shouldDisableDate={(date) => moment(date).isBefore(today)}
		        	/>
		        	<TimePicker defaultTime={this.state.time || null} onChange={this.handleSetTime} hintText="Select a time" style={{marginBottom: 20}}/>
		    		<AutoComplete
			          hintText="Select a place"
			          dataSource={this.state.predictions}
			          onUpdateInput={this.handleInput}
			          onNewRequest={this.handleLocationSelect}
			          style={{marginBottom: 20}}
		        	/>
		        	<div>
			        	{ this.state.display_date && 
			        		<p>
			        			{`${this.state.display_date} - ${this.state.display_time || ''}`}
			        		</p> 
			        	}
			        	<p style={{fontSize: 18 }}>at</p> 
			        	{ this.state.address && 
			        		<p>
			        			{`${this.state.address}`}
			        		</p>
			        	}
		        	</div>
	        	</div>
			    <div style={{position: 'absolute', bottom: 70, width: '100%', display: 'flex', justifyContent: 'center'}}>
		        	<FlatButton
			            label="Back"
			            onTouchTap={this.props.goBack}
			            style={{marginRight: 12}}
		         	/>
			        <RaisedButton
			            primary={true}
			            disabled= {!this.state.date || !this.state.time || !this.state.address}
			            label="Next"
			            onTouchTap={this.handleNavigateNext}
			        />
		        </div>
	        </div>
		)	
	}
}