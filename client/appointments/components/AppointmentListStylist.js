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
  'updo': {
    price: 8500,
    duration: 90,
    name: 'Up-do',
  },
  'makeup': {
    price: 7500,
    duration: 60,
    name: 'Makeup',
  },
  'makeup+lashstrip': {
    price: 10000,
    duration: 60,
    name: 'Makeup & Lash Strip',
  },
  'lashextensions': {
    price: 20000,
    duration: 120,
    name: 'Lash Extensions',
  },
  'lashfill': {
    price: 12500,
    duration: 120,
    name: 'Lash Fill',
  },
}

function AppointmentList(props) {

	let appointments = groupBy(props.appointments, 'status')
	
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
			    {appointments[1] && appointments[1].length && <Subheader style={{color: 'black'}} >{`Pending Assigned Appointments ( ${appointments[1] && appointments[1].length || 0} )`}</Subheader> }
			    { 
			    	appointments[1] && map(appointments[1], (appointment) => {
					  return (
					  	  <div>
					  	  <Divider />
							<div 
						  		style={{display: 'flex', textAlign: 'center', width: '100%', marginBottom: 24, minHeight: 90, color: 'black', borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}
						  		onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  	>
					  			<div style={{padding: 12, width: '50%', textAlign: 'left'}}>
						  			<p style={{fontSize: '1em'}}>{map(appointment.products, (product) => product_list[product].name).toString()}</p>
						  			<p style={{fontSize: '1em'}}>Gratuity: ${appointment.gratuity / 100}</p>
					  			</div>
					  			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
						  			<p style={{fontSize: '1em'}}>{moment(appointment.time).format('MMMM Do, h:mm a')}</p>
					  			</div>
			  				</div>
						  <Divider />
						  </div>
					  )
			    	})
			    }
			    {appointments[2] && appointments[2].length && <Subheader style={{color: 'black'}} >{`Accepted Appointments ( ${appointments[2] && appointments[2].length || 0} )`}</Subheader> }
			    { 
			    	appointments[2] && map(appointments[2], (appointment) => {
					  return ( 
						  	<div 
						  		style={{display: 'flex', textAlign: 'center', width: '100%', marginBottom: 24, minHeight: 90, color: 'black', borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}
						  		onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  	>
					  			<div style={{padding: 12, width: '50%', textAlign: 'left'}}>
						  			<p style={{fontSize: '1em'}}>{map(appointment.products, (product) => product_list[product].name).toString()}</p>
						  			<p style={{fontSize: '1em'}}>Gratuity: ${appointment.gratuity / 100}</p>
					  			</div>
					  			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
						  			<p style={{fontSize: '1em'}}>{moment(appointment.time).format('MMMM Do, h:mm a')}</p>
					  			</div>
			  				</div>
					  )
			    	})
			    }
			    {appointments[3] && appointments[3].length && <Subheader style={{color: 'black'}} >{`In-Progress Appointments ( ${appointments[3] && appointments[3].length || 0} )`}</Subheader> }
			    { 
			    	appointments[3] && map(appointments[3], (appointment) => {
					  return ( 
						  	<div 
						  		style={{display: 'flex', textAlign: 'center', width: '100%', marginBottom: 24, minHeight: 90, color: 'black', borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}
						  		onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  	>
					  			<div style={{padding: 12, width: '50%', textAlign: 'left'}}>
						  			<p style={{fontSize: '1em'}}>{map(appointment.products, (product) => product_list[product].name).toString()}</p>
						  			<p style={{fontSize: '1em'}}>Gratuity: ${appointment.gratuity / 100}</p>
					  			</div>
					  			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
						  			<p style={{fontSize: '1em'}}>{moment(appointment.time).format('MMMM Do, h:mm a')}</p>
					  			</div>
			  				</div>
					  )
			    	})
			    }
			    { 
			    	appointments[4] && map(appointments[4], (appointment) => {
					  return ( 
						  	<div 
						  		style={{display: 'flex', textAlign: 'center', width: '100%', marginBottom: 24, minHeight: 90, color: 'black', borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}
						  		onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  	>
					  			<div style={{padding: 12, width: '50%', textAlign: 'left'}}>
						  			<p style={{fontSize: '1em'}}>{map(appointment.products, (product) => product_list[product].name).toString()}</p>
						  			<p style={{fontSize: '1em'}}>Gratuity: ${appointment.gratuity / 100}</p>
					  			</div>
					  			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
						  			<p style={{fontSize: '1em'}}>{moment(appointment.time).format('MMMM Do, h:mm a')}</p>
					  			</div>
			  				</div>
					  )
			    	})
			    }
			    {appointments[5] && appointments[5].length && <Subheader style={{color: 'black'}} >{`My Pending Appointments ( ${appointments[5] && appointments[5].length || 0} )`}</Subheader> }
			    { 
			    	appointments[5] && map(appointments[5], (appointment) => {
					  return ( 
						  	<div 
						  		style={{display: 'flex', textAlign: 'center', width: '100%', marginBottom: 24, minHeight: 90, color: 'black', borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}
						  		onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  	>
					  			<div style={{padding: 12, width: '50%', textAlign: 'left'}}>
						  			<p style={{fontSize: '1em'}}>{map(appointment.products, (product) => product_list[product].name).toString()}</p>
						  			<p style={{fontSize: '1em'}}>Gratuity: ${appointment.gratuity / 100}</p>
					  			</div>
					  			<div style={{padding: 12, width: '50%', textAlign: 'right'}}>
						  			<p style={{fontSize: '1em'}}>{moment(appointment.time).format('MMMM Do, h:mm a')}</p>
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
})(AppointmentList)



export default AppointmentListComponent;