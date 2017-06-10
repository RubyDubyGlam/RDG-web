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
import { map, keyBy, groupBy, isArray, forEach } from 'lodash'

import navigate from '../../common/actions/router-actions'

import { connect } from 'react-redux'

import HairDryer from '../../../public/assets/technology.svg'
import Nails from '../../../public/assets/nail-polish.svg'
import Makeup from '../../../public/assets/lipstick.svg'

import moment from 'moment'

function AppointmentList(props) {

	let appointments = groupBy(props.appointments, (appointment) => {
		if (appointment.status === -1) {
			return 'canceled'
		} else if(appointment.status !== 5) {
			return 'future'
		} else {
			return 'past'			
		}
	})

	forEach(appointments, (appointment, index) => {
		if (!isArray(appointment)) {
			return appointments[index] = [appointment]
		}
	})

	function populateIcons(appointment) {
		return (
			<div style={{display: 'flex', width: 50}}></div>
		)
	}

	return (
		<div style={{width: '100%', overflowY: 'scroll'}}>
			<List>
			    <Subheader style={{marginBottom: 12, fontFamily: "'Great Vibes', cursive", fontSize: 24, lineHeight: '32px', color: 'pink'}} inset={true}>My future appointments</Subheader>
			    { 
			    	appointments['future'] && map(appointments['future'], (appointment) => {
					  return ( 
						  	<div 
						  		style={{display: 'flex', textAlign: 'center', width: '100%', marginBottom: 24, minHeight: 90, color: 'white', borderStyle: 'solid', borderColor: 'pink', borderWidth: 1 }}
						  		onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  	>
					  			<div style={{padding: 12, width: '50%', textAlign: 'left'}}>
						  			<p style={{fontSize: '1em'}}>Blowout</p>
						  			<p style={{fontSize: '1em'}}>Price: lots</p>
					  			</div>
					  			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
						  			<p style={{fontSize: '1em'}}>Duration: 60min</p>
						  			<p style={{fontSize: '1em'}}>{moment(appointment.time).format('MMMM Do, h:mm a')}</p>
					  			</div>
			  				</div>
					  )
			    	})
			    }
			    <Subheader style={{fontFamily: "'Great Vibes', cursive", fontSize: 24, lineHeight: '32px', color: 'pink'}} inset={true}>My completed appointments</Subheader>
			    { 
			    	appointments['past'] && map(appointments['past'], (appointment) => {
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
}, )(AppointmentList)



export default AppointmentListComponent;