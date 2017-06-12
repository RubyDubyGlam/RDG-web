import React, { Component } from 'react'

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

import { withRouter } from 'react-router'

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
		price: 9000,
		duration: 90,
		name: 'Up-do',
	},
	'makeup': {
		price: 6500,
		duration: 60,
		name: 'Makeup',
	},
	'makeup+lashstrip': {
		price: 9000,
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

class AppointmentList extends Component {

	componentWillReceiveProps(nextProps) {
		console.log('hirinf')
	}

	render() {
	const {
		props
	} = this

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
		<div style={{width: '100%', overflowY: 'scroll', display: 'flex', flexDirection: 'column'}}>
			<List>
				{appointments[0] && appointments[0].length && <Subheader style={{color: 'pink'}} >{`Unassigned appointments ( ${appointments[0] && appointments[0].length || 0} )`}</Subheader> }
			    { 
			    	appointments[0] && map(appointments[0], (appointment) => {
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
				{appointments[0] && appointments[0].length && <Divider />}
			    {appointments[1] && appointments[1].length && <Subheader style={{color: 'pink'}}>{`Assigned appointments - pending ( ${appointments[1] && appointments[1].length || 0} )`}</Subheader> }
			    { 
			    	appointments[1] && map(appointments[1], (appointment) => {
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
			    {appointments[1] && appointments[1].length && <Divider />}
			    {appointments[2] && appointments[2].length && <Subheader style={{color: 'pink'}}>{`Assigned appointments - accepted ( ${appointments[2] && appointments[2].length || 0} )`}</Subheader>}
			    { 
			    	appointments[2] && map(appointments[2], (appointment) => {
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
				{appointments[2] && appointments[2].length && <Divider />}
			    {appointments[3] && appointments[3].length && <Subheader style={{color: 'pink'}}>{`Enroute appointments ( ${appointments[3] && appointments[3].length || 0} )`}</Subheader>}
			    { 
			    	appointments[3] && map(appointments[3], (appointment) => {
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
				{appointments[3] && appointments[3].length && <Divider />}
			    {appointments[4] && appointments[4].length && <Subheader style={{color: 'pink'}}>{`In progress appointments ( ${appointments[4] && appointments[4].length || 0} )`}</Subheader>}
			    { 
			    	appointments[4] && map(appointments[4], (appointment) => {
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
				{appointments[4] && appointments[4].length && <Divider />}
			    {appointments[5] && appointments[5].length && 
			    	<Subheader style={{color: 'pink'}} rightIcon={<HairDryer />}>
			    		{`Completed appointments ( ${appointments[5] && appointments[5].length || 0} )`}
			    	</Subheader>}
			    { 
			    	appointments[5] && map(appointments[5], (appointment) => {
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
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    location: state.router.location.pathname,
    appointments: state.appointment.appointments,
    user: state.user.user
  }
}

let AppointmentListComponent = withRouter(connect( mapStateToProps, {
  navigate: navigate
}, undefined, {pure:false})(AppointmentList))



export default AppointmentListComponent;