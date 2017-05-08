import React from 'react';
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

const AppointmentCard = (props) => {
  console.log(props)
  return (
    <Card style={{width: '100%'}}>
      <CardHeader
        title="URL Avatar"
        subtitle="Subtitle"
        avatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
      />
      <CardMedia>
        <GettingStartedGoogleMap 
          lat={Number(props.appointments[props.match.params.id].latitude)}
          lng={Number(props.appointments[props.match.params.id].longitude)}
        />
      </CardMedia>
      <CardTitle title={moment(props.appointments[props.match.params.id].time).format('HH:MM')} subtitle={props.appointments[props.match.params.id].address} />
      <CardText>
      </CardText>
      <AppointmentActions permissions={props.user.permissions} appointment={props.appointments[props.match.params.id]} />
    </Card>
  )
};

const mapStateToProps = (state) => {
  return {
    appointments: state.appointment.appointments,
    user: state.user.user
  }
}

let AppointmentCardComponent = connect( mapStateToProps )(AppointmentCard)

export default AppointmentCardComponent