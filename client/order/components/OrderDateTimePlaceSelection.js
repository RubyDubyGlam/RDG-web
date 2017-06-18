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
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import Loader from '../../common/components/Loader'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { map } from 'lodash'

import moment from 'moment'

import { withRouter } from 'react-router'

import FontIcon from 'material-ui/FontIcon';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import {blue500, red500, green500} from 'material-ui/styles/colors';

import Dialog from 'material-ui/Dialog';

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

class ChangePhoneNumberModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: ''
    }
  }


  render() {
    const {
      props
    } = this

    const actions = [
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={props.handleDialogClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => props.handleSubmit(this.state.phone_number)}
      />,
    ]

    return (
      <Dialog
        title="New phone number"
        actions={actions}
        modal={false}
        open={props.open}
        onRequestClose={props.handleDialogClose}
        contentStyle={styles.phone_number_style}
        bodyStyle={{minHeight: 90 }}
      >
        <TextField
          hintText="Phone number"
          floatingLabelText="Phone number"
          onChange={e => this.setState({phone_number: e.target.value})}
        />
      </Dialog>
    )
  }
}

class ChangeEmailAddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_address: ''
    }
  }


  render() {
    const {
      props
    } = this

    const actions = [
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={props.handleDialogClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => props.handleSubmit(this.state.email_address)}
        bodyStyle={{minHeight: 90 }}
      />,
    ]

    return (
      <Dialog
        title="New email address"
        actions={actions}
        modal={false}
        open={props.open}
        onRequestClose={props.handleDialogClose}
        contentStyle={styles.phone_number_style}
      >
        <TextField
          hintText="Email Address"
          floatingLabelText="Email Address"
          onChange={e => this.setState({email_address: e.target.value})}
        />
      </Dialog>
    )
  }
}

import {CardElement} from 'react-stripe-elements';
import {StripeProvider} from 'react-stripe-elements';
import {Elements} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';

class ElementsCard extends React.Component {
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken().then(({token, err, error}) => {
      console.log('Received Stripe token:', token, error);
      this.props.handleStripeToken(token, error)
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement 
        	style = {
        		{
        			base: {fontSize: '14px', maxWidth: '80vw'},
           			invalid: { color: 'red'}
           		}
           	} 
        />
      </form>
    );
  }
}

const InjectedCardElement = injectStripe(ElementsCard);

class ElementsWrapper extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCardElement handleStripeToken={this.props.handleStripeToken}/>
      </Elements>
    );
  }
}

class CardSection extends React.Component {
  render() {
    return (
	    <ElementsWrapper handleStripeToken={this.props.handleStripeToken} />
    );
  }
};

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
        contentStyle={{minWidth: '100%'}}
      >
        <List>
		  <Subheader style={{fontSize: 32, textAlign: 'center'}}>Select an Address</Subheader>
		  <Subheader style={{color: 'black', fontSize: 16, textAlign: 'center'}}>Click on your address to select it</Subheader>
		  {
		  	map(props.possible_addresses, (address) => {
		  		return (
		          <ListItem
		            primaryText={<span style={{color: 'black', fontSize: 12, textAlign: 'center'}}>{address.formatted_address}</span>}
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
 
class OrderDateTimePlaceSelection extends Component {

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
			error: '',
			is_entering_stripe: false,
			address_input: ''
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

  	componentDidMount = () => {
  		window.scrollTo(0, document.body.scrollHeight);
  	}

	setAddress = (address) => {
		this.props.setAddress(address)
		this.setState({
			possible_addresses_open: false,
			is_editing_address: false,
			address_input: ''
		})
	}

   	handleLocationSelect = () => {
  		this.setState({
  			is_loading: true
  		})
  
  		const address = this.state.address_input

  		this.geocoder.geocode({ address }, (possible_addresses) => {


  			if (possible_addresses.length) {
  				this.setState({ 
  					possible_addresses,
  					possible_addresses_open: true,
  					is_loading: false
  				})
  			} else {
  				this.setState({ is_loading: false })
  			}
  		})
  	}

  	handleSetTime = (event, raw_time) => {
  		let beginningTime
  		let endTime
  		let invalidTime

  		if (this.state.date) {
  			if(parseInt(moment(this.state.date).format('e')) > 4 ) {
				beginningTime = moment('8:00am', 'h:mma');
				endTime = moment('7:00pm', 'h:mma');
				invalidTime = 'Please choose a time between 8am and 7pm'
  			} else {
				beginningTime = moment('9:00am', 'h:mma');
				endTime = moment('5:00pm', 'h:mma'); 
				invalidTime = 'Please choose a time between 9am and 5pm'				
  			}
  		}

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
				error: invalidTime
			})
		}
  	}

  	handleSetDate = (event, raw_date) => {
		const display_date = (moment(raw_date).format('MMM Do'))
		const date = (moment(raw_date).format('YYYY-MM-DD'))
  		this.setState({display_date, date})
  		this.time_picker_ref.openDialog()	
  	}

  	handleSetAddress = (address) => {
  		this.setState({address})
  	}

  	handleStripeToken = (token, error) => {
  		if (error) {
  			return this.setState({error: error.message})
  		}

  		this.props.setPayment(token.id, token.card.last4)
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

  	handleAddressSubmit = (e) => {
  		e.preventDefault(),
  		this.handleLocationSelect()
  	}

	render() {
		const today = moment().startOf('day')
		
		const product = product_list[this.props.form_data.service_with_addons]

		if (!product) {
			return null
		}

		return (
			<StripeProvider apiKey="pk_live_StmsYeM1MHShCtaqySy02iz4">
		    <div style={{height: '95vh', width: '100vw'}}>
		    	{ this.state.is_loading && <Loader /> }
		    	<img src={'/assets/hair-salon.jpg'} style={{height: '70vw'}} />
		    	<div style={{height: '70vw', width: '100vw', top: 0, opacity: 0.8, position: 'absolute', backgroundColor: 'black'}} />
				<div style={{display: 'flex', width: '100%', overflow: 'scroll', position: 'absolute', bottom: 0, top: '70vw'}} >
					<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
		   				<div style={{display: 'flex', width: '100%'}} >
						  	<div style={{display: 'flex', width: '100%' }}>
							    <List style={{width: '100%'}}>
							    	<SelectAddressModal possible_addresses={this.state.possible_addresses || ''} setAddress={this.setAddress} open={this.state.possible_addresses_open} />
							      <Subheader>Services and addons</Subheader>
							      <ListItem
							        primaryText={product.name}
							        rightIcon={<span style={{marginRight: 12}}>${product.price / 100}</span>}
							      />
							      <Subheader>Reservation Address</Subheader>
							      {
							      	this.state.is_editing_address ? (
							      		<ListItem
										    primaryText={
										    	<form onSubmit={this.handleAddressSubmit}>
											    	<TextField
											      		floatingLabelText="Address line 1"
											      		inputStyle={{ color: 'black', fontSize: '1em' }}
											      		underlineStyle={{ borderWidth: 0 }}
											      		autoFocus
											      		onChange={(e) => this.setState({address_input: e.target.value})}
										    		/>
									    		</form>
									    	}
									    />
							      	) : (
									      <ListItem
									        onClick={() => this.setState({is_editing_address: true})}
									        primaryText={this.props.form_data.address ? <span style={{fontSize: 14}} >{this.props.form_data.address}</span> : 'Click here to enter address'}
									        rightIcon={this.props.form_data.address ? <FontIcon color={green500} className="material-icons">done</FontIcon> : <FontIcon color={red500} className="material-icons">clear</FontIcon>}
									      />
							      	)
							      }
							      <Subheader>Reservation Time</Subheader>
							      <ListItem
							        onClick={() => this.date_picker_ref.openDialog()}
							        primaryText={(this.state.time && this.state.date) ? `${this.state.display_date} @ ${this.state.display_time}` : 'Click to reservation a time'}
							        rightIcon={(this.state.time && this.state.date) ? <FontIcon color={green500} className="material-icons">done</FontIcon> : <FontIcon color={red500} className="material-icons">clear</FontIcon>}
							      />
							      <Subheader>Payment</Subheader>
								      <ListItem
								      	secondaryText={this.props.form_data.last_four ? "Card Number" : null}
								      	onClick={() => this.setState({is_entering_stripe: true})}
								        primaryText={this.props.form_data.last_four || <CardSection handleStripeToken={this.handleStripeToken} />}
								        rightIcon={this.props.form_data.payment_token ? <FontIcon color={green500} className="material-icons">done</FontIcon> : null}
								      />
							      <Subheader>Contact</Subheader>
							      <ListItem
							        secondaryText={"Phone number"}
							        primaryText={this.props.user.phone_number}
							        rightIcon={this.props.user.phone_number ? <FontIcon color={green500} className="material-icons">done</FontIcon> : <FontIcon color={red500} className="material-icons">clear</FontIcon>}
							      />
							      <ListItem
							        secondaryText={"Email address"}
							        primaryText={this.props.user.email_address}
							        rightIcon={this.props.user.email_address ? <FontIcon color={green500} className="material-icons">done</FontIcon> : <FontIcon color={red500} className="material-icons">clear</FontIcon>}
							      />
							      <Subheader>Terms of Service</Subheader>
							      <ListItem
							        primaryText={"Please click here to read our terms of service"}
							        rightIcon={this.state.has_read_tos ? <FontIcon color={green500} className="material-icons">done</FontIcon> : <FontIcon color={red500} className="material-icons">clear</FontIcon>}
							      />
							    </List>
			  				</div>
						</div>
					</div>
				</div>
	        	<DatePicker 
	        		onChange={this.handleSetDate} 
	        		hintText={"Select a date"} 
	        		style={{opacity: 0, display: 'fixed', visibility: 'hidden'}}
	        	    shouldDisableDate={(date) => moment(date).isBefore(today)}
	        	    ref={(ref) => this.date_picker_ref = ref}
	        	/>
	        	<TimePicker 
	        		defaultTime={this.state.time || null} 
	        		onChange={this.handleSetTime} 
	        		hintText="Select a time" 
	        		style={{opacity: 0, display: 'fixed', visibility: 'hidden'}}
	        	    ref={(ref) => this.time_picker_ref = ref}
				/>
				<Snackbar
		          open={this.state.error}
		          message={this.state.error ? this.state.error : null}
		          autoHideDuration={4000}
		          onRequestClose={this.closeSnackbar}
		          style={{width: '100%'}}
		        />
		    </div>
		    
		    </StripeProvider>
		)

						// <FloatingActionButton secondary={true} iconStyle={{ height: 100, width: 100 }} style={{ height: 100, width: 100, marginTop: -50 }} onTouchTap={() => this.date_picker_ref.openDialog()}>
	     //  					<span> Add time </span>
	   		// 			</FloatingActionButton>

		// return (
		// 	<div style={styles.root}>
		// 	  	<div style={{display: 'flex', textAlign: 'center', width: '100%', marginBottom: 24, minHeight: 90, color: 'black', borderStyle: 'solid', borderColor: 'pink', borderWidth: 1 }}>
		//   			<div style={{padding: 12, width: '50%', textAlign: 'left'}}>
			// 	  			<p style={{fontSize: '1em'}}>{product_list[product].name}</p>
			// 	  			<p style={{fontSize: '1em'}}>Price: ${product_list[product].price / 100}</p>
		//   			</div>
		//   			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
			// 	  			<p style={{fontSize: '1em'}}>Duration: {product_list[product].duration} min</p>
			// 	  			<p style={{fontSize: '1em'}}>{`${this.state.display_date} @ ${this.state.display_time || ''}`}</p>
		//   			</div>
  // 				</div>
		// 		<Snackbar
		//           open={this.state.error}
		//           message={this.state.error ? this.state.error : null}
		//           autoHideDuration={4000}
		//           onRequestClose={this.closeSnackbar}
		//           style={{width: '100%'}}
		//         />
		//         <div style={{minHeight: 80, marginTop: 50, justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: 1, borderColor: 'gray'}}>
		//         	<div style={{color:'black', height: 0, marginTop: 30, fontSize: 26}}> {this.state.display_date || "Select Date"} </div>
		//         	<DatePicker 
		//         		onChange={this.handleSetDate} 
		//         		hintText={"Select a date"} 
		//         		style={{opacity: 0, height: 80}}
		//         	    shouldDisableDate={(date) => moment(date).isBefore(today)}
		//         	/>
	 //        		</div>
		//         <div style={{minHeight: 80, marginTop: 24, marginBottom: 50, justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: 1, borderColor: 'gray'}}>
		//         	<div style={{color:'black', height: 0, marginTop: 30, fontSize: 26}}> {this.state.display_time || "Select Time"} </div>
		//         	<TimePicker 
		//         		defaultTime={this.state.time || null} 
		//         		onChange={this.handleSetTime} 
		//         		hintText="Select a time" 
		//         		style={{opacity: 0, height: 80}}
		// 			/>
		//         </div>
		//         <div style={{marginTop: 12, padding: 12}}>
		// 	        <p style={{color:'black', fontSize: 24, width:'100%', textAlign: 'left', margin: 0}}>Hours of operation</p>
		//         	<p style={{color:'black', fontSize: 18, width:'100%', textAlign: 'left', marginBottom: 2}}>Monday - Thursday 9am to 5pm</p>
		// 		    <p style={{color:'black', fontSize: 18, width:'100%', textAlign: 'left', marginBottom: 2}}>Friday - Sunday 8am to 7pm</p>
		// 	        <p style={{color:'black', width:'100%', textAlign: 'left'}}>
		// 	        	If you desire appointments before our business hours or after we are 
		// 	        	happy to assist you, but there will be a 50% additional cost to the services desired.
		// 	        	Please contact us at reservations@rubydubyglam.com to schedule.
		// 	        </p>
		// 	        <p style={{color:'black', fontSize: 24, width:'100%', textAlign: 'left', marginBottom: 3}}>Cancellation Policy</p>
		// 	        <p style={{color:'black', width:'100%', textAlign: 'left'}}>
		// 	        	We understand that the unexpected can happen. If you need to cancel 
		// 	        	or reschedule your appointment, please do so by sending an email to 
		// 	        	reservations@rubydubyglam.com. Cancellation within four (4) hours will be charged
		// 	        	a 50% fee. Changes made less than four (4) hours will be charged the full fee.
		// 	        </p>
		//         </div>
		// 	    <div style={{ minHeight: 60, bottom: 0, width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', flexGrow: 1}}>
		// 	        <RaisedButton
		// 	            primary={true}
		// 	            disabled= {!this.state.date || !this.state.time}
		// 	            label={!this.state.date || !this.state.time ? 'Select a date and time' : "Next" }
		// 	            onTouchTap={this.handleNavigateNext}
		// 	            labelStyle={{ color:'pink'}}
		// 	            overlayStyle={{backgroundImage: 'url("/assets/black-gradient.jpg")'}}
		// 	            style={{width: '100%', height: 60 }}
		// 	        />
		//         </div>
	 //        </div>
		// )	
	}
}

export default withRouter(OrderDateTimePlaceSelection)