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
		
		const product = product_list[this.props.form_data.service_with_addons]

		if (!product) {
			return null
		}

		return (
		    <div style={{height: '95vh', width: '100vw'}}>
		    	<img src={'/assets/hair-salon.jpg'} style={{height: '80vw'}} />
		    	<div style={{height: '80vw', width: '100vw', top: 0, opacity: 0.8, position: 'absolute', backgroundColor: 'black'}} />
				<div style={{display: 'flex', width: '100%', overflow: 'scroll', position: 'absolute', bottom: 0, top: '80vw'}} >
					<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
		   				<div style={{display: 'flex', width: '100%'}} >
						  	<div style={{display: 'flex', width: '100%' }}>
							    <List style={{width: '100%'}}>
							      <Subheader>Services and addons</Subheader>
							      <ListItem
							        primaryText="Brendan Lim"
							        rightIcon={<span>$400</span>}
							      />
							      <Subheader>Address</Subheader>
							      <ListItem
							        primaryText="Eric Hoffman"
							        rightIcon={<FontIcon className="material-icons">clear</FontIcon>}
							      />
							      <Subheader>Time</Subheader>
							      <ListItem
							        secondaryText="Time"
							        onClick={() => this.date_picker_ref.openDialog()}
							        primaryText={(this.state.time && this.state.date) ? `${this.state.display_date} @ ${this.state.display_time}` : 'Click to reservation a time'}
							        rightIcon={(this.state.time && this.state.date) ? <FontIcon color={green500} className="material-icons">done</FontIcon> : <FontIcon color={red500} className="material-icons">clear</FontIcon>}
							      />
							      <Subheader>Payment</Subheader>
							      <ListItem
							      	secondaryText="Card number"
							        primaryText={this.props.form_data.payment_token || 'Click to add payment method'}
							        rightIcon={this.props.form_data.payment_token ? <FontIcon color={green500} className="material-icons">done</FontIcon> : <FontIcon color={red500} className="material-icons">clear</FontIcon>}
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