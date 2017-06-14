import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment'

import axios from 'axios'

import Subheader from 'material-ui/Subheader';

import navigate from '../../common/actions/router-actions'
import { createOrder } from '../action/order-action'

import { connect } from 'react-redux'

import Loader from '../../common/components/Loader'

import HairDryer from '../../../public/assets/technology.svg'
import Nails from '../../../public/assets/nail-polish.svg'
import Makeup from '../../../public/assets/lipstick.svg'

import Divider from 'material-ui/Divider';

import TextField from 'material-ui/TextField'

import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';

import { changePhoneNumber, changeEmailAddress, toggleSubscribe } from '../../user/action/user-action'

import { withRouter } from 'react-router'

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

class OrderConfirm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			is_loading: false,
			is_valid_phone_number: props.user.phone_number ? true : false,
			phone_number: props.user.phone_number || '',
			email_address: props.user.email_address || '', 
			has_agreed_to_tos: false
		}
	}

	onSubmit = () => {
		const appointment = this.props.form_data

		this.setState({ is_loading: true })

		this.props.createOrder(
			appointment.address, 
			appointment.payment_token, 
			appointment.date_time, 
			this.props.match.params.service,
			this.props.user.phone_number || this.state.phone_number,
			this.props.user.email_address || this.state.email_address,
		).catch((response) => {
			this.setState({ is_loading: false })			
		}).then((response) => {
			this.props.navigate('/appointment')
		})
	}

	populateIcons = (appointment) => {
		return (
			<div style={{display: 'flex', width: 50, marginBottom: 12}}>
				{ appointment.products.hair && <HairDryer style={{height: 20, }}/> }
				{ appointment.products.nails && <Nails style={{height: 20, }}/> }
				{ appointment.products.makeup && <Makeup style={{height: 20, }}/> }
			</div>
		)
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

   toggleTOS = (e, subscribed) => {
     this.setState({ has_agreed_to_tos: subscribed})  
   }	


	render() {
		const appointment = this.props.form_data
		const product = this.props.match.params.service

		const {
			user
		} = this.props

		let button_text = 'Book'

		if (!user.email_address) {
			button_text = 'Invalid Email'
		} else if (!user.phone_number) {
			button_text = 'Invalid Phone Number'
		} else if (!this.state.has_agreed_to_tos) {
			button_text = 'Agree to Terms'
		}

		return (
			<div style={styles.root}>
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
		        <List>
      			  <Subheader style={{color: 'white', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Services</Subheader>
		          <ListItem
		            primaryText="Services"
		            style={{color: 'white'}}
		            secondaryText={<span style={{color: 'pink'}}>{product_list[product].name}</span>}
		          />
		          <ListItem
		            primaryText="Price"
		            style={{color: 'white'}}
		            secondaryText={<span style={{color: 'pink'}}>${product_list[product].price / 100}</span>}
		          />
		          <ListItem
		            primaryText="Duration"
		            style={{color: 'white'}}
		            secondaryText={<span style={{color: 'pink'}}>{product_list[product].duration} min</span>}
		          />
		        </List>
		        <List>
      			  <Subheader style={{color: 'white', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Time & Place</Subheader>
		          <ListItem
		            primaryText="Time"
		            style={{color: 'white'}}
		            secondaryText={<span style={{color: 'pink'}}>{moment(appointment.date_time).format('MMMM Do, h:mm a')}</span>}
		          />
		          <ListItem
		            primaryText="Place"
		            style={{color: 'white'}}
		            secondaryText={<span style={{color: 'pink'}}>{appointment.address}</span>}
		          />
		        </List>
		        <List>
      			  <Subheader style={{color: 'white', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Contact Info</Subheader>
		          <ListItem
		            primaryText="Change my email address"
		            style={{color: 'white'}}
		            secondaryText={<span style={{color: 'pink'}}>{user.email_address}</span>}
		            onClick={e => this.setState({is_editing_email_address: true})}
		          />
		          <ListItem
		            primaryText="Change my phone number"
		            style={{color: 'white'}}
		            secondaryText={<span style={{color: 'pink'}}>{user.phone_number}</span>}
		            onClick={e => this.setState({is_editing_phone_number: true})}
		          />
		          <ListItem
		            leftCheckbox={<Checkbox iconStyle = {{ fill: 'pink' }} onCheck={this.toggleTOS}/>}
		            primaryText={<span style={{ color: 'white' }} >I agree to the terms of service</span>}
		          />
		        </List>
				  <div style={{ minHeight: 60, bottom: 0, width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', flexGrow: 1}}>
			        <RaisedButton
			            primary={true}
			            label={button_text}
			            onTouchTap={this.onSubmit}
			            labelStyle={{color:'pink'}}
			            overlayStyle={{backgroundImage: 'url("/assets/black-gradient.jpg")'}}
			            style={{width: '100%', height: 60 }}
			            disabled={!user.email_address || !user.phone_number || !this.state.has_agreed_to_tos}
			        />
		        </div>
		        { this.state.is_loading && <Loader /> }
		    </div>
		)
		
	}
}

const mapStateToProps = (state) => {
  return {
  	user: state.user.user
  }
}

let OrderConfirmComponent = connect(mapStateToProps, {
	navigate,
	createOrder,
	changePhoneNumber, 
	changeEmailAddress,
})(OrderConfirm)

export default withRouter(OrderConfirmComponent)