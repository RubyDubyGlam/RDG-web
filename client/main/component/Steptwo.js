import React, { Component } from 'react';
import { Form, Input, Button, Grid, Segment, Search, Dropdown, TextArea } from 'semantic-ui-react'

import GoogleMapReact from 'google-map-react';

import Geosuggest from 'react-geosuggest';

import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import PlacesAutocomplete from 'react-places-autocomplete'
import { times } from 'lodash'
import moment from 'moment'

const friendOptions = [
  {
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: '/assets/images/avatar/small/jenny.jpg' },
  }
]

class SimpleForm extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			address: '',
			lat: null,
			long: null,
			date: null,
			date_time: null
		}

	    let date_day = moment().startOf('day')

	    const date_options = [{
    		text: date_day.format('MMM DD'),
    		value: moment.utc(date_day),
    		key: 0
	    }]

	    times(29, (index) => {
	    	date_day = date_day.add(1, 'day')

	    	date_options.push({
	    		text: date_day.format('MMM DD'),
	    		value: moment.utc(date_day),
	    		key: index + 1
	    	})
	    })

	    this.date_options = date_options
	}

	onChange = (address) => {
		this.setState({address})
	}

	onSelect = (address) => {
		geocodeByAddress(address, (err, latLng) => {
			this.setState({
				lat: latLng.lat,
				long: latLng.long,
				address: address
			})
		})
	}

	onSelectDate = (event, option) => {
		this.setState({
			date: option.value
		})
	    
	    let date_time = moment(option.value).startOf('day')

	    const time_options = [{
    		text: date_time.format('LT'),
    		value: date_time,
    		key: 0
	    }]

	    times(95, (index) => {

	    	date_time = date_time.add(15, 'minute')
	    	time_options.push({
	    		text: date_time.format('LT'),
	    		value: moment.utc(date_time),
	    		key: index + 1
	    	})
	    })

	    this.time_options = time_options
	}

	onSelectTime = (event, option) => {
		this.setState({
			date_time: option.value
		})
	}


	render() {

	    const inputProps = {
	      value: this.state.address,
	      onChange: this.onChange,
	    }

		this.onChange = (address) => this.setState({ address })

		return (
			<Grid.Row columns={1} style={{marginTop: 40}}>
				<Grid columns={2} style={{height: '50vh'}} verticalAlign='middle' stackable>
					<Grid.Row centered>
						<Grid.Column width={6}>
							<Segment style={{height: '45vh', maxHeight: '50vh'}}>
								<Form>
								<p>Address</p>
								<PlacesAutocomplete inputProps={inputProps} onSelect={this.onSelect}/>
								<p>Additional Directions</p>
								<TextArea style={{height: 28}} />
								<Grid style={{marginTop: 8}} columns={2}>
									<Grid.Row centered>
										<Grid.Column>
											<Dropdown onChange={this.onSelectDate} placeholder='Select Date' fluid selection options={this.date_options}/>
										</Grid.Column>
										<Grid.Column>
											<Dropdown onChange={this.onSelectTime} disabled={!this.state.date} placeholder='Select Friend' fluid selection options={this.time_options || []}/>
										</Grid.Column>
									</Grid.Row>
								</Grid>
								</Form>
							</Segment>
						</Grid.Column>
						<Grid.Column width={5} stretched>
							<Segment raised style={{height: '45vh', maxHeight: '50vh'}}>
								<p style={{fontSize: 24}}>Order Summary</p>
								<p>Location: {this.state.address}</p>
								<p>Time: {this.state.date_time ? this.state.date_time.format('MMMM Do YYYY, h:mm a') : null}</p>
			  				</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Grid.Row>
		)
	}
}

export default SimpleForm