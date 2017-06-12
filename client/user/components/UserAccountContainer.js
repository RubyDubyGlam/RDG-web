import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import { connect } from 'react-redux'

import { changePhoneNumber, changeEmailAddress, toggleSubscribe } from '../action/user-action'

import { withRouter } from 'react-router'

const styles = {
  root: {
    height: '100%',
    width: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
    backgroundImage: 'url("/assets/black-gradient.jpg")',
    color: 'white'
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
        bodyStyle={{minHeight: 90 }}
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


class CancelModal extends Component {
  render() {
    const {
      props
    } = this

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={props.handleDialogClose}
      />
    ]

    return (
      <Dialog
        title={<div style={{color: 'pink', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Delete Account</div>}
        actions={actions}
        modal={false}
        open={props.open}
        onRequestClose={props.handleDialogClose}
        contentStyle={{minWidth: '100%'}}
        bodyStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', maxHeight: '100%' }}
        titleStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
        actionsContainerStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
      >
        <p style={{color: 'white'}} >Please send us an email at info@rubydubyglam.com to delete your account </p>
      </Dialog>
    )
  }
}


class ListExampleSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_editing_phone_number: false,
      is_editing_email_address: false,
      error: '',
      delete_account_modal: false
    }
  }

  handleChangePhoneNumberModalClose = () => {
    this.setState({
      is_editing_phone_number: false,
      error: ''
    })
  }

  handleChangeEmailAddressModalClose = () => {
    this.setState({
      is_editing_email_address: false,
      error: ''
    })
  }

  handleSubmitChangePhoneNumber = (phone_number) => {
    this.props.changePhoneNumber(phone_number).then(() => {
      this.setState({
        is_editing_phone_number: false,
        error: ''
      })      
    }).catch((error) => {
      this.setState({error: 'Invalid phone_number'})
    })     
  }

  changeSubmitEmailAddress = (email_address) => {
    this.props.changeEmailAddress(email_address).then(() => {
      this.setState({
        is_editing_email_address: false,
        error: ''
      })       
    }).catch((error) => {
      this.setState({error: 'Invalid email address'})
    })   
  }

  changeSubmitToggleSubscribe = (e, subscribed) => {
    this.props.toggleSubscribe(subscribed)  
  }

  closeSnackbar = () => {
    this.setState({
      error: ''
    })
  }

  render() {

    const { 
      user
    } = this.props

    console.log(user)

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
        <CancelModal open={this.state.delete_account_modal} handleDialogClose={() => this.setState({delete_account_modal: false})}/>
        <List>
          <Subheader style={{color: 'white', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Contact</Subheader>
          <ListItem
            primaryText="Change my phone number"
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
            leftCheckbox={<Checkbox checked={user.subscribed} onCheck={this.changeSubmitToggleSubscribe}/>}
            primaryText="Subscribed"
            style={{color: 'white'}}
            secondaryText={<span style={{color: 'pink'}}>Subscribed to offers</span>}
          />
        </List>
        <List>
          <ListItem>
            <RaisedButton expand secondary label="Delete my account" onClick={() => this.setState({delete_account_modal: true})}/>
          </ListItem>
        </List>
          <Snackbar
            open={this.state.error}
            message={this.state.error ? this.state.error : null}
            autoHideDuration={4000}
            onRequestClose={this.closeSnackbar}
          />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user.user
  }
}

let ListExampleSettingsComponent = connect( mapStateToProps, {
  changePhoneNumber,
  changeEmailAddress,
  toggleSubscribe
})(ListExampleSettings)

ListExampleSettingsComponent = withRouter(ListExampleSettingsComponent)

export default ListExampleSettingsComponent;