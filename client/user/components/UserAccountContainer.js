// import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// const styles = {
// 	container: {
// 		height: '100%',
// 		width: '100%',
// 		padding: 0,
// 		margin: 0,
// 		textAlign: 'center'
// 	},
// }


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	console.log('wooo')
}

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%', 
    overflowY: 'scroll'
  },
};

const ListExampleSettings = () => (
  <div style={styles.root}>
      <List>
        <Subheader>General</Subheader>
        <ListItem
          primaryText="Profile photo"
          secondaryText="Change your Google+ profile photo"
        />
        <ListItem
          primaryText="Show your status"
          secondaryText="Your status is visible to everyone you use with"
        />
      </List>
      <Divider />
      <List>
        <Subheader>Hangout Notifications</Subheader>
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Notifications"
          secondaryText="Allow notifications"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Sounds"
          secondaryText="Hangouts message"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Video sounds"
          secondaryText="Hangouts video call"
        />
      </List>
      <List>
        <ListItem
          primaryText="When calls and notifications arrive"
          secondaryText="Always interrupt"
        />
      </List>
      <Divider />
      <List>
        <Subheader>Priority Interruptions</Subheader>
        <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
        <ListItem primaryText="Calls" rightToggle={<Toggle />} />
        <ListItem primaryText="Messages" rightToggle={<Toggle />} />
      </List>
      <Divider />
      <List>
        <Subheader>Hangout Notifications</Subheader>
        <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
        <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
        <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
      </List>
  </div>
);

export default ListExampleSettings;

// export default class UserAccountContainer extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {}
// 	}

// 	render() {
// 		console.log(this.props)
// 		return (
// 			<div style={styles.container}>
// 				<div style={{margin: '25% auto'}} >
// 					<TextField 
// 				      floatingLabelText="Email address"
// 				      defaultValue={this.props.user.email_address}
// 				    /><br />
// 					<TextField
// 				      floatingLabelText="Phone number"
// 				    /><br />
// 				    <TextField
// 				      floatingLabelText="Facebook ID"
// 				      defaultValue={this.props.user.facebook_id}
// 				    /><br />
// 					<RaisedButton
// 					  style={{marginTop: 12}}
// 				      label="Save changes"
// 				      labelPosition="before"
// 				      containerElement="label"
// 				    /><br />
// 					<RaisedButton
// 					  style={{marginTop: 12}}
// 				      label="Become a stylist"
// 				      labelPosition="before"
// 				      containerElement="label"
// 				    /><br />
// 					<RaisedButton
// 					  style={{marginTop: 12}}
// 				      label="Delete account"
// 				      labelPosition="before"
// 				      containerElement="label"
// 				    />
// 			    </div>
// 	        </div>
// 		)		
// 	}
// }