import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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

class AppointmentCard extends Component {

  componentWillReceiveProps(nextProps) {
    console.log('WILL RECIEIVE PROPS')
  }

  populateIcons = (appointment) => {
    return (
      <div style={{display: 'flex', width: 50, marginLeft: 12}}>
        { appointment.products.hair && <HairDryer style={{height: 20, }}/> }
        { appointment.products.nails && <Nails style={{height: 20, }}/> }
        { appointment.products.makeup && <Makeup style={{height: 20, }}/> }
      </div>
    )
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

let AppointmentCardComponent = withRouter(connect( mapStateToProps,undefined,undefined,{pure: false} )(AppointmentCard))

export default AppointmentCardComponent