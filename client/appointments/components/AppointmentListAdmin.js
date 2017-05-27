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
			<div style={{display: 'flex', width: 50}}>
				{ appointment.products.hair && <HairDryer style={{height: 20, }}/> }
				{ appointment.products.nails && <Nails style={{height: 20, }}/> }
				{ appointment.products.makeup && <Makeup style={{height: 20, }}/> }
			</div>
		)
	}

	return (
		<div style={{width: '100%', overflowY: 'scroll', display: 'flex', flexDirection: 'column'}}>
			<List>
				{appointments[0] && appointments[0].length && <Subheader>{`Unassigned appointments ( ${appointments[0] && appointments[0].length || 0} )`}</Subheader> }
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
				{appointments[0] && appointments[0].length && <Divider />}
			    {appointments[1] && appointments[1].length && <Subheader>{`Assigned appointments - pending ( ${appointments[1] && appointments[1].length || 0} )`}</Subheader> }
			    { 
			    	appointments[1] && map(appointments[1], (appointment) => {
					  return (
						  <ListItem
						    rightIcon={populateIcons(appointment)}
						    primaryText={moment(appointment.time).format('MMMM Do, h:mm a')}
						    onClick={() => props.navigate(`appointment/${appointment._id}`)}
						  />
					  )
			    	})
			    }
			    {appointments[1] && appointments[1].length && <Divider />}
			    {appointments[2] && appointments[2].length && <Subheader>{`Assigned appointments - accepted ( ${appointments[2] && appointments[2].length || 0} )`}</Subheader>}
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
				{appointments[2] && appointments[2].length && <Divider />}
			    {appointments[3] && appointments[3].length && <Subheader>{`Enroute appointments ( ${appointments[3] && appointments[3].length || 0} )`}</Subheader>}
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
				{appointments[3] && appointments[3].length && <Divider />}
			    {appointments[4] && appointments[4].length && <Subheader>{`In progress appointments ( ${appointments[4] && appointments[4].length || 0} )`}</Subheader>}
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
				{appointments[4] && appointments[4].length && <Divider />}
			    {appointments[5] && appointments[5].length && 
			    	<Subheader rightIcon={<HairDryer />}>
			    		{`Completed appointments ( ${appointments[5] && appointments[5].length || 0} )`}
			    	</Subheader>}
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