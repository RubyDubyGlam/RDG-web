import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { map, filter } from 'lodash'

import { connect } from 'react-redux'

import { getStylists } from '../../user/action/user-action'
import { assignStylist } from '../action/appointment-action'

import HairDryer from '../../../public/assets/technology.svg'
import Nails from '../../../public/assets/nail-polish.svg'
import Makeup from '../../../public/assets/lipstick.svg'

import Loader from '../../common/components/Loader'

import moment from 'moment'

import navigate from '../../common/actions/router-actions'

class AppointmentAssign extends Component {

	constructor(props) {
		super(props)
		this.state = {
			is_confirm_open: false,
			stylist: {},
			is_loading: false
		}

	}

	componentDidMount(props) {
		this.props.getStylists()
	}

	handleAssignClick = (stylist) => {
		return () => {
			this.setState({
				stylist,
				is_confirm_open: true
			})
		}
	}

	handleAssignCancel = () => {
		this.setState({
			stylist: {},
			is_confirm_open: false			
		})
	}

	handleAssignSubmit = () => {

		this.setState({
			is_loading: true
		})

		this.props.assignStylist(
			this.props.appointments[this.props.match.params.id]._id,
			this.state.stylist._id
		).then((response) => {
			this.props.navigate(`appointment/${this.props.match.params.id}`)
		})
	}

	populateIcons = (appointment) => {
		return (
			<div>
				{ appointment.products.hair && <HairDryer style={{height: 20, }}/> }
				{ appointment.products.nails && <Nails style={{height: 20, }}/> }
				{ appointment.products.makeup && <Makeup style={{height: 20, }}/> }
			</div>
		)
	}

	render() {
	    const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onTouchTap={this.handleClose}
	      />,
	      <FlatButton
	        label="Assign"
	        primary={true}
	        keyboardFocused={true}
	        onTouchTap={this.handleAssignSubmit}
	      />,
	    ];

	    const stylists = filter(this.props.stylists, (stylist) => {
	    	return stylist._id !== this.props.user._id
	    })

	    return (
	    	<List>
		    	{
		    		map(stylists, (stylist) => {
			    		return (
					      <ListItem
					        primaryText={`${stylist.first_name} ${stylist.last_name}`}
					        leftIcon={ stylist.permissions === 2 ? <ActionGrade color={pinkA200} /> : null }
					        rightAvatar={<Avatar src="images/chexee-128.jpg" />}
					        onClick={this.handleAssignClick(stylist)}
					      />
			    		)
		    		})
		    	}
		    	<div>
		    		{this.state.is_loading ? <Loader /> : null}
			        <Dialog
			          actions={actions}
			          modal={false}
			          open={this.state.is_confirm_open}
			          onRequestClose={this.handleAssignCancel}
			          contentStyle={{textAlign:'center', width: '100%'}}
			        >
				        <p style={{fontSize: 18}}>Assign {`${this.state.stylist.first_name} ${this.state.stylist.last_name}`} to</p>
				        <p style={{fontSize: 18}}>Address:</p>		        
				        <p>{`${this.props.appointments[this.props.match.params.id].address}`}</p>
				        <p style={{fontSize: 18}}>Time:</p>
				        <p>{`${moment(this.props.appointments[this.props.match.params.id].time).format('MMMM Do, h:mm a')}`}</p>
				        <p style={{fontSize: 18}}>Services:</p>
				        {this.populateIcons(this.props.appointments[this.props.match.params.id])}
			        </Dialog>
		      </div>
	    	</List>
	    )
	}
}

const mapStateToProps = (state) => {
  return {
  	stylists: state.user.stylists,
  	appointments: state.appointment.appointments,
  	user: state.user.user
  }
}

let AppointmentAssignComponent = connect( mapStateToProps, {
  getStylists,
  assignStylist, 
  navigate
})(AppointmentAssign)

export default AppointmentAssignComponent