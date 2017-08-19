import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';

import GettingStartedGoogleMap from './AppointmentMap'

import moment from 'moment'

import { connect } from 'react-redux'

import navigate from '../../common/actions/router-actions'

import AppointmentActions from './AppointmentActions'
import AppointmentActionsAdmin from './AppointmentActionsAdmin'
import AppointmentActionsStylist from './AppointmentActionsStylist'

import HairDryer from '../../../public/assets/technology.svg'
import Nails from '../../../public/assets/nail-polish.svg'
import Makeup from '../../../public/assets/lipstick.svg'

import { withRouter } from 'react-router'

import { addTip } from '../action/appointment-action'

import { map } from 'lodash'

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
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundImage: 'url("/assets/black-gradient.jpg")'
  },
};

class AddTipModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gratuity: 0,
    }
  }

  onChange = (e, value) => {
    if (value === 'custom') {
      console.log('kekeke')
      return
    }

    this.setState({
      gratuity: product_list[this.props.product].price * value - product_list[this.props.product].price
    })
  }


  render() {
    const {
      props
    } = this

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={props.handleDialogClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => props.handleSubmitTip(this.state.gratuity)}
      />,
    ]

    return (
      <Dialog
        title={<div style={{color: 'pink', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Add Tip</div>}
        actions={actions}
        modal={false}
        open={props.open}
        onRequestClose={props.handleDialogClose}
        contentStyle={styles.container}
        bodyStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', maxHeight: '100%' }}
        titleStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
        actionsContainerStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
      >
        <RadioButtonGroup onChange={this.onChange} style={{marginTop: 24}} name="shipSpeed" labelPosition="left" defaultSelected="not_light">
          <RadioButton
            value={1.3}
            label="30%"
            style={{ marginBottom: 16 }}
            labelStyle = {{ color: 'white' }}
            iconStyle = {{ fill: 'pink' }}
            inputStyle = {{ color: 'pink' }}
          />
          <RadioButton
            value={1.2}
            label="20%"
            style={{ marginBottom: 16 }}
            labelStyle = {{ color: 'white' }}
            iconStyle = {{ fill: 'pink' }}
            inputStyle = {{ color: 'pink' }}
          />
          <RadioButton
            value={1.15}
            label="15%"
            style={{ marginBottom: 16 }}
            labelStyle = {{ color: 'white' }}
            iconStyle = {{ fill: 'pink' }}
            inputStyle = {{ color: 'pink' }}
          />
          <RadioButton
            value={1.1}
            label="10%"
            style={{ marginBottom: 16 }}
            labelStyle = {{ color: 'white' }}
            iconStyle = {{ fill: 'pink' }}
            inputStyle = {{ color: 'pink' }}
          />
          <RadioButton
            value={1.00}
            label="0%"
            style={{ marginBottom: 16 }}
            labelStyle = {{ color: 'white' }}
            iconStyle = {{ fill: 'pink' }}
            inputStyle = {{ color: 'pink' }}
          />
        </RadioButtonGroup>
        <div style={{ textAlign: 'center', fontSize: 32, color: 'white', marginTop: 24 }} >Amount: ${((this.state.gratuity) / 100).toFixed(2)}</div>
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
        title={<div style={{color: 'pink', fontFamily: "'Great Vibes', cursive", fontSize: 32, textAlign: 'center'}}>Cancel Reservation</div>}
        actions={actions}
        modal={false}
        open={props.open}
        onRequestClose={props.handleDialogClose}
        contentStyle={styles.container}
        bodyStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', maxHeight: '100%' }}
        titleStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
        actionsContainerStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
      >
        <p style={{color: 'white'}} >Please send us an email at reservations@rubydubyglam.com to cancel </p>
      </Dialog>
    )
  }
}

class AppointmentCard extends Component {

  state = { is_tip_modal_open: false }

  populateIcons = (appointment) => {
    return (
      <div style={{display: 'flex', width: 50, marginLeft: 12}}>
        { appointment.products.hair && <HairDryer style={{height: 20, }}/> }
        { appointment.products.nails && <Nails style={{height: 20, }}/> }
        { appointment.products.makeup && <Makeup style={{height: 20, }}/> }
      </div>
    )
  }

  handleAddTipModalClose = () => {
      this.setState({
        is_tip_modal_open: false
      })
    }

  handleSubmitTip = (gratuity) => {


    this.props.addTip(this.props.match.params.id, gratuity).then(() => {
      this.setState({
        is_tip_modal_open: false
      })       
    })   
  }

  render() {

    const {
      props
    } = this

    let actions

    if (props.user.roles.admin && props.appointments[props.match.params.id].status !== -1 && props.appointments[props.match.params.id].status !== 5) {
      actions =  <AppointmentActionsAdmin roles={props.user.roles} appointment={props.appointments[props.match.params.id]} />
    } else if (props.user.roles.stylist) {
      actions =  <AppointmentActionsStylist roles={props.user.roles} appointment={props.appointments[props.match.params.id]} />
    } else {
      actions =  <AppointmentActions roles={props.user.roles} appointment={props.appointments[props.match.params.id]} />    
    }

    const appointment = props.appointments[props.match.params.id]

    if (!appointment) {
      this.props.navigate('/appointment')
      return null
    }

    if (!props.user.roles.admin && !props.user.roles.stylist) {
      return (
        <div style={styles.root}>
          <AddTipModal 
            open={this.state.is_tip_modal_open}
            handleDialogClose={this.handleAddTipModalClose}
            handleSubmitTip={this.handleSubmitTip}
          />
          <CancelModal open={this.state.cancel_modal_open} handleDialogClose={() => this.setState({cancel_modal_open: false})}/>
          <List>
            <ListItem
              primaryText="Services"
              style={{color: 'white'}}
              secondaryText={<span style={{color: 'pink'}}>{appointment.products.join(' , ')}</span>}
            />
            <ListItem
              primaryText="Total"
              style={{color: 'white'}}
              secondaryText={
                <div style={{color: 'pink', maxHeight: 85, height: ''}}>
                  <p>Services: ${(appointment.sub_total / 100).toFixed(2)}</p>
                  <p>Gratuity: ${(appointment.gratuity / 100).toFixed(2)}</p>
                  <p>Total: ${((appointment.sub_total + appointment.gratuity) / 100).toFixed(2)}</p>
                </div>
              }
            />
          </List>
          <List>
            <ListItem
              primaryText="Time"
              style={{color: 'white'}}
              secondaryText={<span style={{color: 'pink'}}>{moment(appointment.date_time).format('MMMM Do, h:mm a')}</span>}
            />
          </List>
          <List>
            <ListItem
              primaryText="Address"
              style={{color: 'white'}}
              secondaryText={<span style={{color: 'pink'}}>{appointment.address}</span>}
            />
          </List>
          <List>
            <ListItem
              primaryText="Email address"
              style={{color: 'white'}}
              secondaryText={<span style={{color: 'pink'}}>{appointment.email_address}</span>}
              onClick={e => this.setState({is_editing_email_address: true})}
            />
            <ListItem
              primaryText="Phone number"
              style={{color: 'white'}}
              secondaryText={<span style={{color: 'pink'}}>{appointment.phone_number}</span>}
              onClick={e => this.setState({is_editing_phone_number: true})}
            />
          </List>
          {
            appointment.status === 4 && (
              <RaisedButton 
                secondary 
                style={{width: '60%'}} 
                label="Add Tip" 
                onClick={() => this.setState({is_tip_modal_open: true})} 
              />
            )
          }
          <RaisedButton 
            secondary 
            style={{width: '60%', marginTop: 12, marginBottom: 12}} 
            label="Cancel Order" 
            onClick={() => this.setState({cancel_modal_open: true})} 
          />
        </div>
      )
    }

    return (
      <Card style={{width: '100%', flexGrow: 1}}>
        <CardMedia>
          <GettingStartedGoogleMap 
            lat={Number(appointment.latitude)}
            lng={Number(appointment.longitude)}
          />
        </CardMedia>
        <CardTitle title={moment(appointment.time).format('MMMM Do, h:mm a')} subtitle={appointment.address} />
        <CardText style={{paddingTop: 0}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        Services: {
          map(appointment.products, product => `product_list[product].name, `) 
        }
        </div>
        {props.user.roles.admin &&
          <div style={{marginTop: 12}}>
            Stylist: {appointment.stylist_full_name || 'Unassigned'}
          </div>
        }
        </CardText>
        <CardActions>
        { actions }
        </CardActions>
      </Card>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    appointments: state.appointment.appointments,
    user: state.user.user
  }
}

let AppointmentCardComponent = withRouter(connect( mapStateToProps, {addTip, navigate} ,undefined,{pure: false} )(AppointmentCard))

export default AppointmentCardComponent