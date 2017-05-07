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

const CardExampleWithAvatar = (props) => (
  <Card style={{width: '100%'}}>
    <CardHeader
      title="URL Avatar"
      subtitle="Subtitle"
      avatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
    />
    <CardMedia>
      <GettingStartedGoogleMap />
    </CardMedia>
    <CardTitle title={moment(props.appointment.time).format('HH:MM')} subtitle={props.appointment.address} />
    <CardText>
    </CardText>
    <CardActions style={{position: 'absolute', bottom: 56, width: '100%', display: 'flex'}}>
      <RaisedButton primary style={{flexGrow: 1}} label="Decline" />
      <RaisedButton secondary style={{flexGrow: 1}} label="Accept" />
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;