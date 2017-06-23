import React, { Component } from 'react'

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'

import navigate from '../../common/actions/router-actions'
import { createOrder } from '../action/order-action'

import { connect } from 'react-redux'

import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import Loader from '../../common/components/Loader'

import { changePhoneNumber, changeEmailAddress, toggleSubscribe } from '../../user/action/user-action'

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
  phone_number_style: {
    width: '100%',
    maxWidth: 'none',
  }
};

var coupon_codes = {
  'rdglam10': {
    price: 1000,
    name: 'rdglam10'
  }
}

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
    if(ev) {
		ev.preventDefault();
    }
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken().then(({token, err, error}) => {
      this.props.handleStripeToken(token, error)
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} ref={this.props.registerCardFormRef}>
        <CardElement 
        	onBlur={this.handleSubmit}
        	ref={this.props.registerCardRef}
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
        <InjectedCardElement registerCardFormRef={this.props.registerCardFormRef} registerCardRef={this.props.registerCardRef} handleStripeToken={this.props.handleStripeToken}/>
      </Elements>
    );
  }
}

class CardSection extends React.Component {
  render() {
    return (
	    <ElementsWrapper registerCardFormRef={this.props.registerCardFormRef} registerCardRef={this.props.registerCardRef} handleStripeToken={this.props.handleStripeToken} />
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

class TOSModal extends Component {
  render() {
    const {
      props
    } = this

    const actions = [
      <FlatButton
        label="I disagree"
        primary={true}
        onTouchTap={props.handleDialogClose}
      />,
      <FlatButton
        label="I agree"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => props.handleSubmit()}
        bodyStyle={{minHeight: 90 }}
      />,
    ]

    return (
      <Dialog
        modal={true}
        open={props.open}
        onRequestClose={props.handleDialogClose}
        contentStyle={{minWidth: '100%'}}
        title={'Terms of Service'}
        actions={actions}
      >	
      	<div style={{overflow: 'scroll', maxHeight: 364}}>
		<p>
			Acceptance of Contract Terms
		</p>
		<p>
			The following are terms of a legal agreement between you and Ruby Duby Glam and its subsidiries. By accessing, browsing and/or using this site ("Site"), you acknowledge that you have read, understood, and agree to be bound by these terms and to comply with all applicable laws and regulations, including U.S. export and re-export control laws and regulations. If you do not agree to these terms, do not use this Site. The material provided on this Site is protected by law, including, but not limited to, United States Copyright Law and international treaties. This Site is controlled and operated by Ruby Duby Glam from its offices. Those who choose to access this Site from other locations do so with their own initiative in mind and are responsible for compliance with applicable local laws.
		</p>

		<p>
			Copyright
		</p>
		<p>
			The copyright in all material provided on this site ("Site") is held by Ruby Duby Glam, or by the original creator of the material. Except as stated herein, none of the material may be copied, reproduced, distributed, republished, downloaded, displayed, posted or transmitted in any form. Permission is granted to display, copy, distribute and download the materials on this Site for personal or non-commercial use only, provided materials are left un-modified and that all copyright and other proprietary notices contained in the materials are retained. You also may not, without Ruby Duby Glam permission, "mirror" any material contained on this Site on any other server. Any unauthorized use of any material contained on this Site may violate copyright laws, trademark laws, the laws of privacy and publicity, and communications regulations and statutes.
		</p>	

		<p>Cookies</p>
		<p>
			"Cookies" implement a unique, random ID by storing small text files onto a user's computer hard drive via his/her browser. Cookies enable a web site to track user's website activities.
			For example, Ruby Duby Glam uses cookies on its home page to save users time- so they do not have to choose a country site each time they visit Ruby Duby Glam’s web site. Ruby Duby Glam also uses cookies on some download pages to speed up users' activities and won’t have to register more than once. These are just a few examples of how Ruby Duby Glam uses cookies. Ruby Duby Glam may use cookies in other areas on its web site now and in the future without notice. RubyDubyGlam.com cookies do not contain personally identifying information. Users are free to change their web browsers to prevent the acceptance of cookies.
		</p>
		
		<p>Personal Information</p>
		
		<p>
			When you submit personal information to RubyDubyGlam.com, you understand that you are agreeing to allow Ruby Duby Glam, its subsidiaries and its affiliates, access to, storage of and use of the data in any of the countries where Ruby Duby Glam, its subsidiaries and its affiliates do business, whether inside or outside of the United States.
			Ruby Duby Glam may use the personal information you submit for any purposes related to Ruby Duby Glam’s business including, but not limited to, generating statistical studies, conducting market research, improving products and services, sending surveys, and product upgrade and update notifications, new products, special offers, seminars or conventions and any other changes within RubyDubyGlam.com that may affect you.
		</p>
		
		<p>Privacy Policy</p>
		
		<p>
			At Ruby Duby Glam we respect your right to privacy and understand that, as a visitor to RubyDubyGlam.com, you prefer to control your own personal information and preferences. For this reason, we may ask you to register or to provide personal information and preferences when visiting specific areas of RubyDubyGlam.com, download free software, request information, or subscribe to the Ruby Duby Glam Newsletter.
		</p> 
		
		<p>
			We will guard any personal information you choose to share with us so as to ensure the provided content, services, and advertising on RubyDubyGlam.com are always tailored to your currently designated preferences.
			When you provide Ruby Duby Glam with your name (or alias), e-mail address, mailing address or telephone number, and do not 'opt out,' Ruby Duby Glam and its representatives or affiliates may use the provided information to alert you regarding product upgrades, special offers, updated information, classes, new services, and other Ruby Duby Glam information. Representatives and affiliates may include value-added resellers and authorized training partners. Beyond its representatives and affiliates, Ruby Duby Glam does not offer or allow the selling of any user-provided information to third parties.
			Ruby Duby Glam respects the rights users provide when opting to receive e-mail communications and enforces internal policies to preserve those rights. It is our objective to retain the long-term ability to continue communication with our users.
			If you do not want Ruby Duby Glam or Ruby Duby Glam representatives to contact you, you may "opt out" of this preference at any time, whether you're online or contacting Ruby Duby Glam directly. As part of your preference flexibility, you'll always have the option to opt back in and have Ruby Duby Glam contact you based on your previous or new preferences. For instructions, please see the section "Contact Us," below. If you choose not to register or provide personal information, you can still visit most Ruby Duby Glam websites; however, you will not have access to areas that require personal identification.
			If a user elects to use our “Tell a Friend” application for forwarding a Ruby Duby Glam e-mail or informing a friend about our website, we will ask for the friend in question’s name and e-mail address. Ruby Duby Glam will automatically send that friend the specified e-mail or website information. Ruby Duby Glam will not use relayed information to contact said friend in the future.
		</p>
		
		<p>
			Ruby Duby Glam membership and the use of log files (cookies)
		</p>
		<p>
			Ruby Duby Glam offers free membership to all RubyDubyGlam.com visitors. In order to establish membership, visitors are requested to provide both personal information and preferences. This information is stored and protected via user-established Member ID and Password.
			There is an additional "Remember Me" option. By choosing this selection, you are allowing Ruby Duby Glam to store your Member ID and password for quick access to certain areas of the website without having to sign in repetitively. The sign-in information is stored until you explicitly take action to sign out. It also allows you to return to any Ruby Duby Glam website on subsequent visits without having to re-enter that subsequent information. Ruby Duby Glam remembers you by placing a log file (cookie) which contains only enough information to identify you upon return visits. A "cookie" is a small line of text that is stored within your web browser for record-keeping purposes and helps Ruby Duby Glam provide you more effective service. Your browser has options to accept, reject, or provide you notices when cookies are sent.
			No information, other than that found in the Membership cookie, will be accessed by any Ruby Duby Glam system. Access to your membership information always requires use of both a Member ID and Password.
			Ruby Duby Glam also utilizes visitor log files (cookies) with our website. Once a user enters our site, a cookie follows them through their click stream path. Examples of information being collected by these cookies include the number of times a user came to our site(s), and the paths they took to get there.
			Ruby Duby Glam uses the data collected from website visitor cookies only in aggregate form and does not collect any personally identifiable information. Use of this information helps us better understand what exactly users are seeking and learning while on our website(s) and helps us better identify potential navigation issues.
		</p>
		
		<p>
			How Ruby Duby Glam will protect your personal information
			Ruby Duby Glam will always protect the personal information that you share with us. Ruby Duby Glam stores information internally in a controlled, secure environment. If, for example, you make a purchase online, we route all transactions through SSL (Secure Socket Layers) and process your credit card number only to secure a current payment. The SSL transaction does not retain your credit card number, subsequent to the transaction at hand, and will not use said number for marketing purposes.
			We occasionally hire other companies to provide limited services on our behalf, including: packaging, mailing and delivering purchases, answering customer questions about products or services, sending postal mail and processing event registration. We will only provide those companies the information they need to deliver a service, and they are prohibited from using that information for any other purpose.
			If Ruby Duby Glam requests general demographic information, this information is limited to reporting purposes only; members remain anonymous. Phone numbers, e-mail addresses, and postal addresses are never shared for demographic reports with outside entities.
      	</p>
      	</div>
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
			address_input: '',
			is_tos_modal_open: false,
			has_accepted_tos: false
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

	  		this.props.setDateTimeAddress(this.state.date, this.state.time)

		} else {
			this.setState({
				display_time: '',
				time: '',
				display_date: '',
				date: '',
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

  	registerCardRef = (ref) => {
  		if (ref) {
  			this.card_ref = ref._element
  		}
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
  		this.setState({
  			is_editing_address: false
  		})
  		this.handleLocationSelect()
  	}

  	shouldDisplaySubmitText = () => {
  		const order = this.props.form_data
  		const user = this.props.user

  		if (!order.date_time) {
	    	return (
		    	<div style={{flexDirection: 'column', height: '70vw', width: '100vw', top: 0, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
		    		<p style={{color: 'white', textAlign: 'center'}} >Let's get started!</p>
		    		<p style={{color: 'white', textAlign: 'center'}} >We'll need to reserve a time for your appointment. Click below to choose a time.</p>
						<FlatButton
					        label="Reserve a time"
					        primary={true}
					        onTouchTap={() => this.date_picker_ref.openDialog()}
					        style={{marginTop: 12, color: 'white', borderStyle: 'solid', borderRadius: 4, borderWidth: 1 }}
				      	/>
		    	</div> 
	    	) 			
  		}

  		if (!order.address) {
	    	return (
		    	<div style={{flexDirection: 'column', height: '70vw', width: '100vw', top: 0, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
		    		<p style={{color: 'white', textAlign: 'center'}} >RubyDubyGlam comes to you!</p>
		    		<p style={{color: 'white', textAlign: 'center'}} >As part of our service, we'll send a stylist to your home or preferred location. Click below to let us know here to meet you.</p>
						<FlatButton
					        label="Select a place"
					        primary={true}
					        onTouchTap={(e) => {
					        	e.preventDefault()
					        	this.setState({is_editing_address: true})
					        }}
					        style={{marginTop: 12, color: 'white', borderStyle: 'solid', borderRadius: 4, borderWidth: 1 }}
				      	/>
		    	</div> 
	    	) 			
  		}


  		if (!order.payment_token) {
	    	return (
		    	<div style={{flexDirection: 'column', height: '70vw', width: '100vw', top: 0, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
		    		<p style={{color: 'white', textAlign: 'center'}} >
		    			For your convenience, we accept payment from all major credit card processors.
		    			Your card won't be charged until after your appointment has ended.
		    		</p>
						<FlatButton
					        label="Enter payment information"
					        primary={true}
					        onTouchTap={(e) => {
							    const scroll_to = this.card_form_ref.offsetTop
				      			const target = this.card_ref
				      			setTimeout(() => {
				      				console.log(this.form_ref.offsetTop - scroll_to)
				      				this.form_ref.scrollTop = this.form_ref.offsetTop - scroll_to + 100
				      				target.focus()
				      			}, 0)		        	
					        }}
					        style={{marginTop: 12, color: 'white', borderStyle: 'solid', borderRadius: 4, borderWidth: 1 }}
				      	/>
		    	</div> 
	    	) 			
  		}

  		if (!user.phone_number) {
	    	return (
		    	<div style={{flexDirection: 'column', height: '70vw', width: '100vw', top: 0, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
		    		<p style={{color: 'white', textAlign: 'center'}} >We'll need your phone number</p>
		    		<p style={{color: 'white', textAlign: 'center'}} >
		    			As our services are location-based, we'll need your phone number to provide our stylists a way to contact 
		    			in case they get lost on their way.  If you have any questions,
		    			you can check out our <a> Terms of service </a>.
		    		</p>
						<FlatButton
					        label="Enter a phone number"
					        primary={true}
					        onTouchTap={ () => this.setState({is_editing_phone_number: true}) }
					        style={{marginTop: 12, color: 'white', borderStyle: 'solid', borderRadius: 4, borderWidth: 1 }}
				      	/>
		    	</div> 
	    	) 			
  		}

  		if (!user.email_address) {
	    	return (
		    	<div style={{flexDirection: 'column', height: '70vw', width: '100vw', top: 0, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
		    		<p style={{color: 'white', textAlign: 'center'}} >Let's get an email address on record</p>
		    		<p style={{color: 'white', textAlign: 'center'}} >
		    			We'll need your email address to send you a copy of your receipt once we've completed your services. If you have any questions,
		    			you can check out our <a> Terms of service </a>.
		    		</p>
						<FlatButton
					        label="Enter an email address"
					        primary={true}
					        onTouchTap={ () => this.setState({is_editing_email_address : true}) }
					        style={{marginTop: 12, color: 'white', borderStyle: 'solid', borderRadius: 4, borderWidth: 1 }}
				      	/>
		    	</div> 
	    	) 			
  		}

  		if (!this.state.has_accepted_tos) {
	    	return (
		    	<div style={{flexDirection: 'column', height: '70vw', width: '100vw', top: 0, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
		    		<p style={{color: 'white', textAlign: 'center'}} >We'll almost done!</p>
		    		<p style={{color: 'white', textAlign: 'center'}} >
		    			You'll need to agree to our terms and services before we can process your order. If you have any questions
		    			that aren't answered in our terms, you can email us at info@rubydubyglam.com
		    		</p>
						<FlatButton
					        label="Terms of Service"
					        primary={true}
					        onTouchTap={ () => this.setState({is_tos_modal_open : true}) }
					        style={{marginTop: 12, color: 'white', borderStyle: 'solid', borderRadius: 4, borderWidth: 1 }}
				      	/>
		    	</div> 
	    	) 			
  		}

  		return (
	    	<div onClick={this.onSubmit} style={{flexDirection: 'column', height: '70vw', width: '100vw', top: 0, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
	    		<p style={{color: 'white'}} >Your order is ready to be submitted!</p>
	    		<p style={{color: 'white'}} >Please review your order and click here to submit</p>
					<FlatButton
				        label="Book my appointment"
				        primary={true}
				        onTouchTap={this.onSubmit}
				        style={{marginTop: 12, color: 'white', borderStyle: 'solid', borderRadius: 4, borderWidth: 1 }}
			      	/>
	    	</div>
  		)
  	}

  	onSubmit = () => {
		const appointment = this.props.form_data

		this.setState({ is_loading: true })

		console.log(this.props.form_data.service_with_addons)

		this.props.createOrder(
			appointment.address, 
			appointment.payment_token, 
			appointment.date_time, 
			this.props.form_data.services,
			this.props.user.phone_number,
			this.props.user.email_address,
      this.state.coupon,
		).catch((response) => {
			this.setState({ is_loading: false })			
		}).then((response) => {
			this.props.navigate('/appointment')
		})
  	}

  	registerCardFormRef = (ref) => {
  		console.log(ref)
  		this.card_form_ref = ref
  	}

 	  handleChangePhoneNumberModalClose = () => {
	    this.setState({
	      is_editing_phone_number: false
	    })
	  }

	  handleChangeEmailAddressModalClose = () => {
	    this.setState({
	      is_editing_email_address: false
	    })
	  }

	  handleSubmitChangePhoneNumber = (phone_number) => {
	    this.props.changePhoneNumber(phone_number).then((data) => {
	      this.setState({
	        is_editing_phone_number: false,
	        phone_number: phone_number
	      })       
	    })   
	  }

	  changeSubmitEmailAddress = (email_address) => {
	    this.props.changeEmailAddress(email_address).then(() => {
	      this.setState({
	        is_editing_email_address: false
	      })       
	    })   
	  }

    handleCouponSubmit = (e) => {
      if (e) e.preventDefault()

      console.log(coupon_codes, this.state.coupon_code)

      if (coupon_codes[this.state.coupon_code]) {
        this.setState({
          coupon: coupon_codes[this.state.coupon_code],
          coupon_code: '',
          is_editing_coupon: false
        })
      } else {
        this.setState({
          error: 'Invalid coupon',
          coupon_code: ''
        })
      }
    }

	render() {
		const today = moment().startOf('day')
		
		const products = this.props.form_data.services
		const addons = this.props.form_data.addons


		return (
			<StripeProvider apiKey="pk_live_StmsYeM1MHShCtaqySy02iz4">
		    <div style={{height: '95vh', width: '100vw'}}>
		    	{ this.state.is_loading && <Loader /> }
		    	<TOSModal open={this.state.is_tos_modal_open} handleSubmit={() => this.setState({has_accepted_tos: true, is_tos_modal_open: false})} handleDialogClose={() => this.setState({is_tos_modal_open: false})}/>
		    	<img src={'/assets/hair-salon.jpg'} style={{height: '70vw'}} />
		    	<div style={{height: '70vw', width: '100vw', top: 0, opacity: 0.8, position: 'absolute', backgroundColor: 'black'}} />
		    	{this.shouldDisplaySubmitText()}
				<div ref={(ref) => this.form_ref = ref} style={{display: 'flex', width: '100%', overflow: 'scroll', position: 'absolute', bottom: 0, top: '70vw'}} >
					<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
		   				<div style={{display: 'flex', width: '100%'}} >
						  	<div style={{display: 'flex', width: '100%' }}>
							    <List style={{width: '100%'}}>
							     <SelectAddressModal possible_addresses={this.state.possible_addresses || ''} setAddress={this.setAddress} open={this.state.possible_addresses_open} />
							      <Subheader>Services and addons</Subheader>

							      {
							      	map(products, (product) => (
								      <ListItem
								        primaryText={product_list[product].name}
								        rightIcon={<span style={{marginRight: 16}}>${product_list[product].price / 100}</span>}
								      />
							      	))
							      }
                    <Subheader>Coupon Code</Subheader>
                    {
                      this.state.is_editing_coupon ? (
                        <ListItem
                        primaryText={
                          <form onSubmit={this.handleCouponSubmit}>
                            <TextField
                                floatingLabelText="Coupon code"
                                inputStyle={{ color: 'black', fontSize: '1em' }}
                                underlineStyle={{ borderWidth: 0 }}
                                autoFocus
                                onBlur={() => {
                                  this.handleCouponSubmit()
                                  this.setState({
                                    is_editing_coupon: false,
                                  })
                                }}
                                onChange={(e) => this.setState({coupon_code: e.target.value})}
                                onFocus={(e) => {
                                  const scroll_to = e.currentTarget.offsetTop
                                  const target = e.currentTarget
                                  setTimeout(() => {
                                    this.form_ref.scrollTop = this.form_ref.offsetTop - scroll_to - 70
                                    target.focus()
                                  }, 0)
                                }}
                            />
                          </form>
                        }
                      />
                      ) : (
                        <ListItem
                          onClick={() => this.setState({is_editing_coupon: true})}
                          primaryText={this.state.coupon ? <span style={{fontSize: 14}}>{this.state.coupon.name}</span> : 'Click here to enter coupon code'}
                          rightIcon={this.state.coupon ? <span style={{marginRight: 16, width: 40}}>- ${this.state.coupon.price / 100}</span> : null}
                        />
                      )
                    }

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
											      		onBlur={() => {
											      			this.handleAddressSubmit()
											      			this.setState({
											      				is_editing_address: false,
											      			})
											      		}}
											      		onChange={(e) => this.setState({address_input: e.target.value})}
											      		onFocus={(e) => {
											      			const scroll_to = e.currentTarget.offsetTop
											      			const target = e.currentTarget
											      			setTimeout(() => {
											      				this.form_ref.scrollTop = this.form_ref.offsetTop - scroll_to - 70
											      				target.focus()
											      			}, 0)
											      		}}
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
							        primaryText={this.props.form_data.last_four || <CardSection registerCardFormRef={this.registerCardFormRef} registerCardRef={this.registerCardRef} handleStripeToken={this.handleStripeToken} />}
							        rightIcon={this.props.form_data.payment_token ? <FontIcon color={green500} className="material-icons">done</FontIcon> : null}
							      />
							      <Subheader>Contact</Subheader>
							      <ListItem
							        secondaryText={"Phone number"}
							        primaryText={this.props.user.phone_number}
							        onClick={() => this.setState({is_editing_phone_number: true})}
							        rightIcon={this.props.user.phone_number ? <FontIcon color={green500} className="material-icons">done</FontIcon> : <FontIcon color={red500} className="material-icons">clear</FontIcon>}
							      />
							      <ListItem
							        secondaryText={"Email address"}
							        primaryText={this.props.user.email_address}
							        onClick={() => this.setState({is_editing_email_address: true})}
							        rightIcon={this.props.user.email_address ? <FontIcon color={green500} className="material-icons">done</FontIcon> : <FontIcon color={red500} className="material-icons">clear</FontIcon>}
							      />
							      <Subheader>Terms of Service</Subheader>
							      <ListItem
							        primaryText={this.state.has_accepted_tos ?  "You have accepted the terms of service" : "Please click here to read our terms of service"}
							        onClick={() => this.setState({is_tos_modal_open: true})}
							        rightIcon={this.state.has_accepted_tos ? <FontIcon color={green500} className="material-icons">done</FontIcon> : <FontIcon color={red500} className="material-icons">clear</FontIcon>}
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
		        <ChangePhoneNumberModal 
		          open={this.state.is_editing_phone_number}
		          handleDialogClose={this.handleChangePhoneNumberModalClose}
		          handleSubmit={this.handleSubmitChangePhoneNumber}
		        />
		        <ChangeEmailAddressModal 
		          open={this.state.is_editing_email_address}
		          handleDialogClose={this.handleChangeEmailAddressModalClose}
		          handleSubmit={this.changeSubmitEmailAddress}
		        />
		    </div>
		    
		    </StripeProvider>
		)
	}
}

const mapStateToProps = (state) => {
  return {
  	user: state.user.user
  }
}

let OrderDateTimePlaceSelectionComponent = connect(mapStateToProps, {
	navigate,
	createOrder,
	changePhoneNumber, 
	changeEmailAddress,
})(OrderDateTimePlaceSelection)

export default withRouter(OrderDateTimePlaceSelectionComponent)