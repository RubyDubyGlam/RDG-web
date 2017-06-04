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
			phone_number: props.user.phone_number || ''
		}
	}

	onSubmit = () => {
		const appointment = this.props.form_data

		this.setState({ is_loading: true })

		this.props.createOrder(
			appointment.address, 
			appointment.payment_token, 
			appointment.date_time, 
			appointment.products,
			this.state.phone_number,
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
    this.props.changePhoneNumber(phone_number).then(() => {
      this.setState({
        is_editing_phone_number: false
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


	render() {
		const appointment = this.props.form_data

		const {
			user
		} = this.props

		return (
			<div style={styles.root}>
				<div style={{
					position: 'absolute',
				    bottom: 60,
				    top: 70,
				    overflowY: 'scroll',
				    display: 'flex',
				    alignItems: 'center',
				    justifyContent: 'center',
				    flexDirection: 'column',
				    width: '100%',

				}}>
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
	        		<div style={{display: 'flex', flexDirection: 'column', marginBottom: 6}}>
				        <List>
	          			  <Subheader style={{color: 'white', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Services</Subheader>
				          <ListItem
				            primaryText="Change services"
				            style={{color: 'white'}}
				            secondaryText={<span style={{color: 'pink'}}>Blowout + braid</span>}
				          />
				        </List>
		        	</div>
	        		<div style={{display: 'flex', flexDirection: 'column', marginBottom: 6}}>
				        <List>
	          			  <Subheader style={{color: 'white', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Time</Subheader>
				          <ListItem
				            primaryText="Change time"
				            style={{color: 'white'}}
				            secondaryText={<span style={{color: 'pink'}}>{moment(appointment.date_time).format('MMMM Do, h:mm a')}</span>}
				          />
				        </List>
		        	</div>
	        		<div style={{display: 'flex', flexDirection: 'column', marginBottom: 6}}>
				        <List>
	          			  <Subheader style={{color: 'white', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Place</Subheader>
				          <ListItem
				            primaryText="Change place"
				            style={{color: 'white'}}
				            secondaryText={<span style={{color: 'pink'}}>{appointment.address}</span>}
				          />
				        </List>
		        	</div>
	        		<div style={{display: 'flex', flexDirection: 'column', marginBottom: 6}}>
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
				            leftCheckbox={<Checkbox onCheck={this.changeSubmitToggleSubscribe}/>}
				            primaryText="I agree to the terms of service"
				            style={{color: 'white'}}
				          />
				          <ListItem
				            leftCheckbox={<Checkbox onCheck={this.changeSubmitToggleSubscribe}/>}
				            primaryText="Save this address and contact information"
				            style={{color: 'white'}}
				          />
				        </List>
		        	</div>
		        </div>
				    <div style={{ minHeight: 60, bottom: 0, width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', flexGrow: 1}}>
			        <RaisedButton
			            primary={true}
			            label="Next"
			            onTouchTap={this.onSubmit}
			            labelStyle={{color: 'white', fontFamily: "'Great Vibes', cursive", color:'pink'}}
			            overlayStyle={{backgroundImage: 'url("/assets/black-gradient.jpg")'}}
			            style={{width: '100%', height: 60 }}
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

export default OrderConfirmComponent