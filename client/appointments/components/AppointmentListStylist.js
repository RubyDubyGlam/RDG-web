import React from 'react'

import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import { map, groupBy, isArray, forEach } from 'lodash'

import navigate from '../../common/actions/router-actions'

import { connect } from 'react-redux'

import HairDryer from '../../../public/assets/technology.svg'
import Nails from '../../../public/assets/nail-polish.svg'
import Makeup from '../../../public/assets/lipstick.svg'

import moment from 'moment'

function AppointmentList(props) {

	let appointments = groupBy(props.appointments, 'status')
	
	forEach(appointments, (appointment, index) => {
		if (!isArray(appointment)) {
			return appointments[index] = [appointment]
		}
	})

	function populateIcons(appointment) {
		return (
			<div style={{display: 'flex', width: 50}}>
				{ appointment.products.hair && <HairDryer style={{height: 20, }}/> }
				{ appointment.products.nails && <Nails style={{height: 20, }}/> }
				{ appointment.products.makeup && <Makeup style={{height: 20, }}/> }
			</div>
		)
	}

	return (
		<div style={{width: '100%', overflowY: 'scroll'}}>
			<List>
			    { props.user.roles.admin && <Subheader inset={true}>Unassigned appointments</Subheader> }
			    { 
			    	appointments[0] && map(appointments[0], (appointment) => {
					  return ( 
						  <ListItem
						    rightIcon={populateIcons(appointment)}
						    primaryText={moment(appointment.time).format('MMMM Do, h:mm a')}
						    onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  /> 
					  )
			    	})
			    }
			    <Subheader inset={true}>Assigned appointments - pending</Subheader>
			    { 
			    	appointments[1] && map(appointments[1], (appointment) => {
					  return (
					  	  <div>
					  	  <Divider />
						  <ListItem
						    rightIcon={populateIcons(appointment)}
						    primaryText={moment(appointment.time).format('MMMM Do, h:mm a')}
						    onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  /> 
						  <Divider />
						  </div>
					  )
			    	})
			    }
			    <Subheader inset={true}>Assigned appointments - accepted</Subheader>
			    { 
			    	appointments[2] && map(appointments[2], (appointment) => {
					  return ( 
						  <ListItem
						    rightIcon={populateIcons(appointment)}
						    primaryText={moment(appointment.time).format('MMMM Do, h:mm a')}
						    onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  /> 
					  )
			    	})
			    }
			    <Subheader inset={true}>In-progress appointments</Subheader>
			    { 
			    	appointments[3] && map(appointments[3], (appointment) => {
					  return ( 
						  <ListItem
						    rightIcon={populateIcons(appointment)}
						    primaryText={moment(appointment.time).format('MMMM Do, h:mm a')}
						    onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  /> 
					  )
			    	})
			    }
			    { 
			    	appointments[4] && map(appointments[4], (appointment) => {
					  return ( 
						  <ListItem
						    rightIcon={populateIcons(appointment)}
						    primaryText={moment(appointment.time).format('MMMM Do, h:mm a')}
						    onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  /> 
					  )
			    	})
			    }
			    <Subheader inset={true}>Completed appointments</Subheader>
			    { 
			    	appointments[5] && map(appointments[5], (appointment) => {
					  return ( 
						  <ListItem
						    rightIcon={populateIcons(appointment)}
						    primaryText={moment(appointment.time).format('MMMM Do, h:mm a')}
						    onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  /> 
					  )
			    	})
			    }
			</List>
		</div>
	)
}

const mapStateToProps = (state) => {
  return {
    location: state.router.location.pathname,
    appointments: state.appointment.appointments,
    user: state.user.user
  }
}

let AppointmentListComponent = connect( mapStateToProps, {
  navigate: navigate
})(AppointmentList)



export default AppointmentListComponent;