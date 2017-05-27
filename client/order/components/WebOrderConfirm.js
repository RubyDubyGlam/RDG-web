import React, { Component } from 'react'

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

import navigate from '../../common/actions/router-actions'
import { createOrder } from '../action/order-action'

import { connect } from 'react-redux'

import Loader from '../../common/components/Loader'

import HairDryer from '../../../public/assets/technology.svg'
import Nails from '../../../public/assets/nail-polish.svg'
import Makeup from '../../../public/assets/lipstick.svg'

import Divider from 'material-ui/Divider';

import TextField from 'material-ui/TextField'

import Paper from 'material-ui/Paper'

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', 
    textAlign: 'center'
  },
  phone_number_style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', 
    textAlign: 'center'
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
			phone_number: props.user.phone_number || '',
			is_editing_phone_number: false,
			is_editing_email_address: false,
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
		).then((response) => {
			this.props.navigate('/appointment')
		}).catch((response) => {
			this.setState({ is_loading: false })			
		})
	}

	populateIcons = (appointment) => {
		return (
			<div style={{display: 'flex', width: 50}}>
				{ appointment.products.hair && <HairDryer style={{height: 20, }}/> }
				{ appointment.products.nails && <Nails style={{height: 20, }}/> }
				{ appointment.products.makeup && <Makeup style={{height: 20, }}/> }
			</div>
		)
	}

	handlePhoneNumberChange = e => {
		this.setState({
			phone_number: e.target.value,
			is_valid_phone_number: e.target.value.length === 11
		})
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

	render() {
		const appointment = this.props.form_data

		const {
			user
		} = this.props

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
			  	<div style={{textAlign: 'center', paddingLeft: '30%', paddingRight: '30%', marginBottom: 24}}>
		  			<p style={{fontSize: 15}}> Step 4 of 4 </p>
		  			<p style={{fontSize: 40}}> Is this correct? </p>
  				</div>
	        	<p style={{fontSize: 22}}>Order Summary </p>
	        	<div style={{display: 'flex', flexDirection: 'row'}}>
	        		<div style={{display: 'flex', flexDirection: 'column'}}>
		        		<p style={{fontSize: 18}}>Contact:</p>
				        <List>
				          <ListItem
				            primaryText="Change my phone number"
				            secondaryText={user.email_address}
				            onClick={e => this.setState({is_editing_email_address: true})}
				          />
				          <ListItem
				            primaryText="Change my phone number"
				            secondaryText={user.phone_number}
				            onClick={e => this.setState({is_editing_phone_number: true})}
				          />
				        </List>
		        	</div>
		        	<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', maxWidth: 215}}>
			        	<p style={{fontSize: 18}}>Time:</p>
			        	<p style={{fontSize: 14}}>{moment(appointment.date_time).format('MMMM Do, h:mm a')}</p>
			        	<Divider />
			        	<p style={{fontSize: 18}}>Place:</p>
			        	<p style={{fontSize: 14}}>{appointment.address}</p>
			        	<Divider />
			        	<p style={{fontSize: 18}}>Services:</p>
			        	{this.populateIcons(appointment)}
			        	<Divider />
		        	</div>
		        </div>
	        	<Paper style={{width: '100%', height: 125, position: 'absolute', bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
		        	<FlatButton
			            label="Back"
			            onTouchTap={this.props.goBack}
			            style={{marginRight: 12}}
		         	/>
			        <RaisedButton
			            primary={true}
			            label="Book"
			            onTouchTap={this.onSubmit}
			        />
		        </Paper>
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
	createOrder
})(OrderConfirm)

export default OrderConfirmComponent