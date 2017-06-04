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

class SelectAddressModal extends Component {
  render() {
    const {
      props
    } = this

    return (
      <Dialog
        modal={false}
        open={props.open}
        onRequestClose={props.handleDialogClose}
      >
        <List>
		  <Subheader style={{color: 'black', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Possible Addresses</Subheader>
		  {
		  	map(props.possible_addresses, (address) => {
		  		return (
		          <ListItem
		            primaryText={address.formatted_address}
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

export default class OrderPaymentSelection extends Component {

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
  			console.log(possible_addresses)

  			if (possible_addresses.length) {
  				this.setState({ 
  					possible_addresses,
  					possible_addresses_open: true
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
		return (
			<div style={styles.root}>
				<SelectAddressModal possible_addresses={this.state.possible_addresses} setAddress={this.setAddress} open={this.state.possible_addresses_open} />
				  	<div style={{display: 'flex', textAlign: 'center', width: '100%', marginBottom: 24, minHeight: 90, color: 'white', borderStyle: 'solid', borderColor: 'pink', borderWidth: 1 }}>
			  			<div style={{padding: 12, width: '50%', textAlign: 'left'}}>
				  			<p style={{fontSize: '1em'}}>Blowout</p>
				  			<p style={{fontSize: '1em'}}>Price: lots</p>
			  			</div>
			  			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
				  			<p style={{fontSize: '1em'}}>Duration: 60min</p>
				  			<p style={{fontSize: '1em'}}>{`${this.state.display_date} @ ${this.state.display_time || ''}`}</p>
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
			    	<div style={{display: 'flex', width: '90%', minHeight: 80}} >
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
				      		style={{fontSize: '1em', padding: 6, width: '20%', marginTop: 5, marginRight: 5, borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
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
				    <TextField

			      		floatingLabelText="Additional Directions"
			      		onChange={e => this.setState({addresstwo: e.target.value})}
			      		inputStyle={{ color: 'white', fontSize: '1em' }}
			      		floatingLabelStyle = {{ color: 'pink', fontSize: '1em' }}
				      	underlineStyle={{ borderWidth: 0 }}
			      		style={{fontSize: '1em',  margin: 5, padding: 16, width: '90%', borderStyle: 'solid', borderWidth: 1, borderColor: 'gray' }}
			    	/>
				    <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
				        <RaisedButton
				            primary={true}
				            // disabled= {!this.state.date || !this.state.time}
				            label="Next"
				            onTouchTap={this.handleLocationSelect}
				            labelStyle={{color: 'white', fontFamily: "'Great Vibes', cursive", color:'pink'}}
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