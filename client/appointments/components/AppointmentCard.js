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

import AppointmentActions from './AppointmentActions'
import AppointmentActionsAdmin from './AppointmentActionsAdmin'
import AppointmentActionsStylist from './AppointmentActionsStylist'

import HairDryer from '../../../public/assets/technology.svg'
import Nails from '../../../public/assets/nail-polish.svg'
import Makeup from '../../../public/assets/lipstick.svg'

import { withRouter } from 'react-router'

import { addTip } from '../action/appointment-action'

var sku_list = {
  'blowout+braid': {
    amount: 6000
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
      gratuity: sku_list[this.props.product].amount * value - sku_list[this.props.product].amount
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
            value={1.05}
            label="5%"
            style={{ marginBottom: 16 }}
            labelStyle = {{ color: 'white' }}
            iconStyle = {{ fill: 'pink' }}
            inputStyle = {{ color: 'pink' }}
          />
          <RadioButton
            value="custom"
            label="Custom"
            style={{ marginBottom: 16 }}
            labelStyle = {{ color: 'white' }}
            iconStyle = {{ fill: 'pink' }}
            inputStyle = {{ color: 'pink' }}
          />
        </RadioButtonGroup>
        <div style={{ textAlign: 'center', fontSize: 32, color: 'white', marginTop: 24 }} >Amount: ${((sku_list[this.props.product].amount + this.state.gratuity) / 100).toFixed(2)}</div>
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

    if (!props.user.roles.admin && !props.user.roles.stylist) {
      return (
        <div style={styles.root}>
          <AddTipModal 
            open={this.state.is_tip_modal_open}
            handleDialogClose={this.handleAddTipModalClose}
            handleSubmitTip={this.handleSubmitTip}
            product={appointment.products}
          />
          <List>
            <ListItem
              primaryText="Services"
              style={{color: 'white'}}
              secondaryText={<span style={{color: 'pink'}}>Blowout + braid</span>}
            />
            <ListItem
              primaryText="Total"
              style={{color: 'white'}}
              secondaryText={
                <div style={{color: 'pink', maxHeight: 85, height: ''}}>
                  <p>Services: ${(sku_list[appointment.products].amount / 100).toFixed(2)}</p>
                  <p>Gratuity: ${(appointment.gratuity / 100).toFixed(2)}</p>
                  <p>Total: ${((sku_list[appointment.products].amount + appointment.gratuity) / 100).toFixed(2)}</p>
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
          <RaisedButton 
            secondary 
            style={{width: '60%'}} 
            label="Add Tip" 
            onClick={() => this.setState({is_tip_modal_open: true})} 
          />
          <RaisedButton 
            secondary 
            style={{width: '60%', marginTop: 12}} 
            label="Cancel" 
            onClick={() => this.setState({is_drawer_open: true})} 
          />
        </div>
      )
    }

    return (
      <Card style={{width: '100%', flexGrow: 1}}>
        <CardMedia>
          <GettingStartedGoogleMap 
            lat={Number(props.appointments[props.match.params.id].latitude)}
            lng={Number(props.appointments[props.match.params.id].longitude)}
          />
        </CardMedia>
        <CardTitle title={moment(props.appointments[props.match.params.id].time).format('MMMM Do, h:mm a')} subtitle={props.appointments[props.match.params.id].address} />
        <CardText style={{paddingTop: 0}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        Services: {this.populateIcons(props.appointments[props.match.params.id])}
        </div>
        {props.user.roles.admin &&
          <div style={{marginTop: 12}}>
            Stylist: {props.appointments[props.match.params.id].stylist_full_name || 'None'}
          </div>
        }
        </CardText>
        <CardActions style={{width: '100%', display: 'flex', position: 'absolute', bottom: 56}}>
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

let AppointmentCardComponent = withRouter(connect( mapStateToProps, {addTip} ,undefined,{pure: false} )(AppointmentCard))

export default AppointmentCardComponent