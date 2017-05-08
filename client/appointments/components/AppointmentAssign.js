import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { map } from 'lodash'

import { connect } from 'react-redux'

import { getStylists } from '../../user/action/user-action'
import { assignStylist } from '../action/appointment-action'

class AppointmentAssign extends Component {

	constructor(props) {
		super(props)
		this.state = {
			is_confirm_open: false,
			stylist: {}
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
		this.props.assignStylist(
			this.props.appointments[this.props.match.params.id]._id,
			this.state.stylist._id
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

	    return (
	    	<List>
		    	{
		    		map(this.props.stylists, (stylist) => {
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
			        <Dialog
			          actions={actions}
			          modal={false}
			          open={this.state.is_confirm_open}
			          onRequestClose={this.handleAssignCancel}
			          contentStyle={{width: '100%'}}
			        >
				        <p>Assign {`${this.state.stylist.first_name} ${this.state.stylist.last_name}`} to:</p>
				        <br />				        
				        <p>{`${this.props.appointments[this.props.match.params.id].address}`}</p>
				        <p>{`${this.props.appointments[this.props.match.params.id].time}`}</p>
			        </Dialog>
		      </div>
	    	</List>
	    )
	}
}

const mapStateToProps = (state) => {
  return {
  	stylists: state.user.stylists,
  	appointments: state.appointment.appointments
  }
}

let AppointmentAssignComponent = connect( mapStateToProps, {
  getStylists,
  assignStylist
})(AppointmentAssign)

export default AppointmentAssignComponent