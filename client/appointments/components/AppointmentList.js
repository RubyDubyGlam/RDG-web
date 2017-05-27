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
			    <Subheader inset={true}>My future appointments</Subheader>
			    { 
			    	appointments['future'] && map(appointments['future'], (appointment) => {
					  return ( 
						  <ListItem
						    rightIcon={populateIcons(appointment)}
						    primaryText={moment(appointment.time).format('MMMM Do, h:mm a')}
						    onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  /> 
					  )
			    	})
			    }
			    <Subheader inset={true}>My completed appointments</Subheader>
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