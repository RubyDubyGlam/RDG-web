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
import InitOrderContainer from '../../order/components/InitOrderContainer'

import AppointmentUserCard from './AppointmentUserCard'

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

function AppointmentList(props) {

	console.log(props, 'peeerrps')

	let appointments = groupBy(props.appointments, (appointment) => {
		if (appointment.status === -1) {
			return 'canceled'
		} else if(appointment.status !== 6) {
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

	if (!appointments.future || !appointments.future.length) {
		return <InitOrderContainer />
	} else {
		let tense = props.match.params.tense

		if (!tense) {
			tense = 'future'
		}

		if (tense === 'past' && !appointments.past) {
			return <InitOrderContainer />
		}

		return <AppointmentUserCard appointments={tense === 'future' ? appointments.future : appointments.past}/>
	}
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