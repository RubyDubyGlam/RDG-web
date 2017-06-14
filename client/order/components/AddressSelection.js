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
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';

import Subheader from 'material-ui/Subheader';

import { map } from 'lodash'

import { withRouter } from 'react-router'

import moment from 'moment'

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
    price: 9000,
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

class SelectAddressModal extends Component {
  render() {
    const {
      props
    } = this

    return (
      <Dialog
        modal={true}
        open={props.open}
        onRequestClose={props.handleDialogClose}
        bodyStyle={{ backgroundColor: 'rgba(0,0,0,0.9)'}}
        titleStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
        actionsContainerStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
        contentStyle={{minWidth: '100%'}}
      >
        <List>
		  <Subheader style={{color: 'pink', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Select an Address</Subheader>
		  <Subheader style={{color: 'white', fontSize: 16, textAlign: 'center'}}>Click on your address to select it</Subheader>
		  {
		  	map(props.possible_addresses, (address) => {
		  		return (
		          <ListItem
		            primaryText={<span style={{color: 'white', fontSize: 12, textAlign: 'center'}}>{address.formatted_address}</span>}
		            style={{textAlign: 'center'}}
		            onClick={e => props.setAddress(address.formatted_address)}
		          />
		  		)
		    })
		  }
        </List>
      </Dialog>
    )
  }
}

class OrderPaymentSelection extends Component {

	constructor(props) {
		super(props)
		const date_time = props.form_data.date_time

		this.state = {
			addressone: '',
			addresstwo: '',
			city: '',
			state: '',
			zip: '',
			error: '',
			possible_addresses: [],
			possible_addresses_open: false,
			is_loading: false,
		}

		this.autocompleteService = new google.maps.places.AutocompleteService()
		this.geocoder = new google.maps.Geocoder()
	}

	setAddress = (address) => {
		this.props.setAddress(address)
		this.props.goForward()
	}

  	handleLocationSelect = () => {
  		this.setState({
  			is_loading: true
  		})
  		const address = this.state.addressone + ' , ' + this.state.city + ' , ' + this.state.state + ' ' + this.state.zip

  		this.geocoder.geocode({ address }, (possible_addresses) => {


  			if (possible_addresses.length) {
  				this.setState({ 
  					possible_addresses,
  					possible_addresses_open: true,
  					is_loading: false
  				})
  			} else {
  				console.log(possible_addresses)
  				this.setState({ is_loading: false })
  			}
  		})
  	}


	closeSnackbar = () => {
		this.setState({
			error: ''
		})
	}

	render() {
		const product = this.props.match.params.service

		const appointment = this.props.form_data

		const display_time = (moment(appointment.date_time).format('hh:mm A'))
		const display_date = (moment(appointment.date_time).format('MMM Do'))

		let button_text = 'Find Address'

		if (!this.state.zip) {
			button_text = 'Invalid Zipcode'
		}

		if (!this.state.state) {
			button_text = 'Invalid State'
		} 

		if (!this.state.city) {
			button_text = 'Invalid Zipcode'
		}

		if (!this.state.addressone) {
			button_text = 'Invalid Address'
		} 

		return (
			<div style={styles.root}>
				<SelectAddressModal possible_addresses={this.state.possible_addresses} setAddress={this.setAddress} open={this.state.possible_addresses_open} />
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
			  			<p style={{fontSize: 42, color:'white', fontFamily: "'Great Vibes', cursive" }}> Address </p>
	  				</div>
				    <TextField
			      		floatingLabelText="Address line 1"
			      		onChange={e => this.setState({addressone: e.target.value})}
			      		inputStyle={{ color: 'white', fontSize: '1em' }}
			      		floatingLabelStyle = {{ color: 'pink', fontSize: '1em' }}
			      		underlineStyle={{ borderWidth: 0 }}
			      		style={{fontSize: '1em', margin: 5, padding: 16, width: '90%', borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
			    	/>
				    <TextField
			      		floatingLabelText="Address line 2"
			      		onChange={e => this.setState({addresstwo: e.target.value})}
			      		inputStyle={{ color: 'white', fontSize: '1em' }}
			      		floatingLabelStyle = {{ color: 'pink', fontSize: '1em' }}
				      	underlineStyle={{ borderWidth: 0 }}
			      		style={{fontSize: '1em', margin: 5, padding: 16, width: '90%', borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
			    	/>
			    	<div style={{display: 'flex', width: '90%', minHeight: 80, marginBottom: 24}} >
					    <TextField
			      		floatingLabelText="City"
			      		onChange={e => this.setState({city: e.target.value})}
			      		inputStyle={{ color: 'white', fontSize: '1em' }}
			      		floatingLabelStyle = {{ color: 'pink', fontSize: '1em' }}
				      		underlineStyle={{ borderWidth: 0 }}
				      		style={{fontSize: '1em', padding: 16, flexGrow: 1, marginTop: 5, marginRight: 5, borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
				    	/>
					    <TextField

				      		floatingLabelText="State"
				      		value={this.state.state}
				      		onChange={e => this.setState({state: e.target.value})}
			      		inputStyle={{ color: 'white', fontSize: '1em' }}
			      		floatingLabelStyle = {{ color: 'pink', fontSize: '1em' }}
				      		underlineStyle={{ borderWidth: 0 }}
				      		style={{fontSize: '1em', padding: 6, width: '30%', marginTop: 5, marginRight: 5, borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
				    	/>
					    <TextField

				      		floatingLabelText="Zip"
				      		onChange={e => this.setState({zip: e.target.value})}
			      		inputStyle={{ color: 'white', fontSize: '1em' }}
			      		floatingLabelStyle = {{ color: 'pink', fontSize: '1em' }}
				      		underlineStyle={{ borderWidth: 0 }}
					      	style={{fontSize: '1em', padding: 16, width: '35%', marginTop: 5, borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
				    	/>
			    	</div>
				    <div style={{ minHeight: 60, bottom: 0, width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', flexGrow: 1}}>
				        <RaisedButton
				            primary={true}
				            disabled= {!this.state.zip || !this.state.state || !this.state.addressone || !this.state.city}
				            label={button_text}
				            onTouchTap={this.handleLocationSelect}
				            labelStyle={{color:'pink'}}
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
		        { this.state.is_loading && <Loader /> }
	        </div>
		)
	}
}

export default withRouter(OrderPaymentSelection)