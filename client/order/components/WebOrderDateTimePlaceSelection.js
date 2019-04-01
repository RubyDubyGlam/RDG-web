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

import Paper from 'material-ui/Paper'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', 
    overflowY: 'scroll',
    textAlign: 'center',
	backgroundImage: 'url("/assets/black-gradient.jpg")'
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
			address: props.form_data.address
		}

		this.autocompleteService = new window.google.maps.places.AutocompleteService()
		this.geocoder = new window.google.maps.Geocoder()
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
		const display_time = (moment(raw_time).format('hh:mm A'))
		const time = (moment(raw_time).format('kk:mm'))
  		this.setState({display_time, time})
  	}

  	handleSetDate = (event, raw_date) => {
		const display_date = (moment(raw_date).format('dddd MMM DD'))
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
		return (
			<div style={styles.root}>
			  	<div style={{textAlign: 'center', paddingLeft: '30%', paddingRight: '30%', marginBottom: 24}}>
		  			<p style={{fontSize: 15}}> Step 2 of 4 </p>
		  			<p style={{fontSize: 40}}> Where are we going to meet you? </p>
		  			<p style={{fontSize: 15}}> We'll try to autocomplete your address </p>
  				</div>
	        	<DatePicker 
	        		onChange={this.handleSetDate} 
	        		hintText="Select a date" 
	        		style={{marginBottom: 20}}
	        	    shouldDisableDate={(date) => moment(date).isBefore(today)}
	        	/>
	        	<TimePicker onChange={this.handleSetTime} hintText="Select a time" style={{marginBottom: 20}}/>
	    		<AutoComplete
		          hintText="Select a place"
		          dataSource={this.state.predictions}
		          onUpdateInput={this.handleInput}
		          onNewRequest={this.handleLocationSelect}
		          style={{marginBottom: 20}}
	        	/>
	        	{ this.state.display_date && 
	        		<p style={{width: '80%' }}>
	        			{`${this.state.display_date} - ${this.state.display_time || ''}`}
	        		</p> 
	        	}
	        	<p style={{fontSize: 18 }}>at</p> 
	        	{ this.state.address && 
	        		<p style={{width: '80%' }}>
	        			{`${this.state.address}`}
	        		</p>
	        	}
  					<Paper style={{width: '100%', height: 125, position: 'absolute', bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
			        	<FlatButton
				            label="Back"
				            onTouchTap={this.props.goBack}
				            style={{marginRight: 12}}
			         	/>
				        <RaisedButton
				            primary={true}
				            disabled= {!this.state.date && !this.state.time && !this.state.address}
				            label="Next"
				            onTouchTap={this.handleNavigateNext}
				        />
		          	</Paper>
	        </div>
		)	
	}
}