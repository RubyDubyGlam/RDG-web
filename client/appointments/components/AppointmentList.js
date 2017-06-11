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
	'blowout+updo': {
		price: 8500,
		duration: 90,
		name: 'Blowout & Up-do',
	},
	'makeup': {
		price: 6500,
		duration: 60,
		name: 'Makeup',
	},
	'makeup+lashstrip': {
		price: 8500,
		duration: 60,
		name: 'Makeup & Lash Strip',
	},
	'lashextensions': {
		price: 20000,
		duration: 120,
		name: 'Lash Extensions',
	},
	'lashextensions+fill': {
		price: 32500,
		duration: 120,
		name: 'Lash Extensions & Fill',
	},
}

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
						  			<p style={{fontSize: '1em'}}>{product_list[appointment.products].name}</p>
						  			<p style={{fontSize: '1em'}}>Price: ${product_list[appointment.products].price / 100}</p>
					  			</div>
					  			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
						  			<p style={{fontSize: '1em'}}>Duration: {product_list[appointment.products].duration} min</p>
						  			<p style={{fontSize: '1em'}}>{moment(appointment.time).format('MMMM Do, h:mm a')}</p>
					  			</div>
			  				</div>
					  )
			    	})
			    }
			    <Subheader style={{marginBottom: 12, fontFamily: "'Great Vibes', cursive", fontSize: 24, lineHeight: '32px', color: 'pink'}} inset={true}>My previous appointments</Subheader>
			    { 
			    	appointments['past'] && map(appointments['past'], (appointment) => {
					  return ( 
						  	<div 
						  		style={{display: 'flex', textAlign: 'center', width: '100%', marginBottom: 24, minHeight: 90, color: 'white', borderStyle: 'solid', borderColor: 'pink', borderWidth: 1 }}
						  		onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  	>
					  			<div style={{padding: 12, width: '50%', textAlign: 'left'}}>
						  			<p style={{fontSize: '1em'}}>{product_list[appointment.products].name}</p>
						  			<p style={{fontSize: '1em'}}>Price: ${product_list[appointment.products].price / 100}</p>
						  			<p style={{fontSize: '1em'}}>Gratuity: ${appointment.gratuity / 100}</p>
					  			</div>
					  			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
						  			<p style={{fontSize: '1em'}}>Duration: {product_list[appointment.products].duration} min</p>
						  			<p style={{fontSize: '1em'}}>{moment(appointment.time).format('MMMM Do, h:mm a')}</p>
						  			<p style={{fontSize: '1em'}}>Stylist: {appointment.stylist_full_name || 'Unassigned' }</p>
					  			</div>
			  				</div>
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