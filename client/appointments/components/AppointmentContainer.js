// import React, { Component } from 'react'

// import RaisedButton from 'material-ui/RaisedButton'

import axios from 'axios'

// import Divider from 'material-ui/Divider';
// import {List, ListItem} from 'material-ui/List';
// import Paper from 'material-ui/Paper'

import { map } from 'lodash'

// import AppointmentCard from './AppointmentCard'

// const styles = {
// 	container: {
// 		height: '100%',
// 		width: '100%',
// 		padding: 0,
// 		margin: 0,
// 		display: 'flex',
// 		textAlign: 'center',
// 		justifyContent: 'center',
// 		textAlign: 'center'
// 	},
// }


// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
// 	console.log('wooo')
// }

// export default class AppointmentContainer extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			appointments: []
// 		}

// 		axios.get('/v1/appointments').then((response) => {
// 			this.setState({
// 				appointments: response.data
// 			})
// 		})
// 	}

// 	render() {
// 		return (
// 			<div style={styles.container}>
// 			    { 
// 			    	map(this.state.appointments, (appointment) => {
// 			    		return <AppointmentCard />
// 			    	})
// 			    }
// 	        </div>
// 		)		
// 	}
// }

				// { this.props.appointments ? (
				//     <RaisedButton
				//       style={{margin: 'auto'}}
				//       label="Book an appointment"
				//       labelPosition="before"
				//       containerElement="label"
				//       onClick={this.props.handleNavigation}
				//     />
		  //       ) : null }

import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

import CardExampleWithAvatar from './AppointmentCard'

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	console.log('wooo')
}

export default class AppointmentContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			appointments: [],
			view: 'meta'
		}

		axios.get('/v1/appointments').then((response) => {
			this.setState({
				appointments: response.data
			})
		})
	}

	render() {

		if (this.state.view === 'meta') {
			return (
				<div style={{width: '100%', overflowY: 'scroll'}}>
				<List>
				  <Subheader inset={true}>Appointments</Subheader>
				    { 
				    	map(this.state.appointments, (appointment) => {
						  return ( <ListItem
				    		leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
						    rightIcon={<ActionInfo />}
						    primaryText={appointment.address}
						    secondaryText={appointment.time}
						    onClick={() => this.setState({view: 'card'})}
						  /> )
				    	})
				    }
				</List>
				<Divider />
				<List>
				  <Subheader inset={true}>Previous Appointments</Subheader>
				</List>
				</div>
			)	
		} else {
			return <CardExampleWithAvatar appointment={this.state.appointments[3]}/>
		}
	}
}