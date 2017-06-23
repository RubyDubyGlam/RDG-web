import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

import navigate from '../../common/actions/router-actions'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Slider from 'react-slick'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import moment from 'moment'

import { map } from 'lodash'

import { connect } from 'react-redux'

import GettingStartedGoogleMap from './AppointmentMap'

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { addTip } from '../action/appointment-action'

const styles = {
	container: {
		height: '100%',
		width: '100%',
		maxWidth: '100vw',
		padding: 0,
		margin: 0,
		position: 'absolute',
		top: 0,
	},
}

var product_list = {
  'blowout': {
    prices: [4500, 8500],
    durations: [60, 90],
    name: 'Blowout',
    addons: ['Braid'],
    image: '/assets/15.jpg',
  },
  'updo': {
    prices: [8500],
    durations: [90],
    name: 'Up-do',
    addons: [],
    image: '/assets/13.jpg'
  },
  'makeup': {
    prices: [6500, 9000],
    durations: [60],
    name: 'Makeup',
    addons: ['Lashstrip'],
    image: '/assets/16.jpg'
  },
  'lashextensions': {
    prices: [12500, 20000],
    durations: [120],
    name: 'Lash Extensions',
    image: '/assets/12.jpg',
    addons: [],
  },
}

class AddTipModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gratuity: 0,
    }
    console.log(props)
  }

  onChange = (e, value) => {
    if (value === 'custom') {
      return
    }

    this.setState({
      gratuity: (this.props.sub_total - this.props.discount) * value - (this.props.sub_total - this.props.discount)
    })
  }


  render() {
    const {
      props
    } = this

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={props.handleDialogClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => props.handleSubmitTip(this.props.appointment_id, this.state.gratuity)}
      />,
    ]

    return (
      <Dialog
        title={<div style={{fontSize: 32, textAlign: 'center'}}>Add Tip</div>}
        actions={actions}
        modal={false}
        open={props.open}
        onRequestClose={props.handleDialogClose}
        contentStyle={styles.container}
        bodyStyle={{  maxHeight: '100%', maxWidth: '100vw' }}
      >
        <RadioButtonGroup onChange={this.onChange} style={{marginTop: 24}} name="shipSpeed" labelPosition="left" defaultSelected="not_light">
          <RadioButton
            value={1.3}
            label="30%"
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={1.2}
            label="20%"
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={1.15}
            label="15%"
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={1.1}
            label="10%"
            style={{ marginBottom: 16 }}
          />
          <RadioButton
            value={1.00}
            label="0%"
            style={{ marginBottom: 16 }}
          />
        </RadioButtonGroup>
        <div style={{ textAlign: 'center', fontSize: 32, marginTop: 24 }} >Amount: ${((this.state.gratuity) / 100).toFixed(2)}</div>
      </Dialog>
    )
  }
}

class SimpleSlider extends React.Component {

  state = { is_tip_modal_open: false }

  handleAddTipModalClose = () => {
      this.setState({
        is_tip_modal_open: false
      })
    }

  handleSubmitTip = (appointment_id, gratuity) => {
  	console.log(gratuity)
    this.props.addTip(appointment_id, gratuity).then(() => {
      this.setState({
        is_tip_modal_open: false
      })       
    })   
  }

  render() {
    var settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      afterChange: (from, to) => console.log(from, to),
      beforeChange: (from, to) => console.log()
    };

    return (
      <Slider {...settings}>
      	{ 
      		map(this.props.appointments, (appointment, appointment_id) => (
		        <div>
		        	<GettingStartedGoogleMap 
			          lat={Number(appointment.latitude)}
			          lng={Number(appointment.longitude)}
			        />
			      	<AddTipModal 
			            open={this.state.is_tip_modal_open === appointment_id}
			            handleDialogClose={this.handleAddTipModalClose}
			            handleSubmitTip={this.handleSubmitTip}
			            sub_total={appointment.sub_total}
			            appointment_id={appointment._id}
          			/>
          			{
          				// <div style={{position: 'absolute', top: 0, height: '100vw', width: '100%', backgroundColor: 'black', opacity: 0.4, color: 'white', textAlign: 'center', fontSize: 20, padding: 26, zIndex: 2}}> 		        	</div>
          			}
					<div style={{display: 'flex', width: '100%'}} >
						<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width:'100%'}}>
							<div style={{display: 'flex', width: '100%'}} >
								{
									(appointment.gratuity === 0 && appointment.status !== 6) && (
										<FloatingActionButton onTouchTap={() => this.setState({is_tip_modal_open: appointment_id})} secondary={true} iconStyle={{ height: 100, width: 100 }} style={{ height: 100, width: 100, marginTop: -50,  zIndex: 3000 }} >
						      				<span> Add Tip </span>
						   				</FloatingActionButton>
									)
								}

			   				</div>
			   				<List>
					            <ListItem
					              primaryText="Services"
					              secondaryText={<span>{(map(appointment.products, (product) => product_list[product].name)).join(' , ')}</span>}
					            />
					            <ListItem
					              primaryText="Total"
					              secondaryText={
					                <div style={{maxHeight: 120, height: ''}}>
					                  <p>Services: ${(appointment.sub_total / 100).toFixed(2)}</p>
					                  { appointment.discount ? <p>Discount: - ${(appointment.discount / 100).toFixed(2)}</p> : null }
					                  <p>Gratuity: ${(appointment.gratuity / 100).toFixed(2)}</p>
					                  <p>Total: ${((appointment.sub_total + appointment.gratuity - (appointment.discount ? appointment.discount : 0)) / 100).toFixed(2)}</p>
					                </div>
					              }
					            />
					          </List>
					          <List>
					            <ListItem
					              secondaryText="Time"
					              primaryText={<span>{moment(appointment.date_time).format('MMMM Do, h:mm a')}</span>}
					            />
					          </List>
					          <List>
					            <ListItem
					              secondaryText="Address"
					              primaryText={<span>{appointment.address}</span>}
					            />
					          </List>
					          <List>
					            <ListItem
					              secondaryText="Email address"
					              primaryText={<span>{appointment.email_address}</span>}
					              onClick={e => this.setState({is_editing_email_address: true})}
					            />
					            <ListItem
					              secondaryText="Phone number"
					              primaryText={<span>{appointment.phone_number}</span>}
					              onClick={e => this.setState({is_editing_phone_number: true})}
					            />
					          </List>
						</div>
					</div>
		        </div>
      		)) 
      	}
      </Slider>
    );
  }
}

class OrderFlow extends Component {
	state = { selection: 0 }

	render() {
		return (
			<div style={styles.container} ref={ (ref) => this.reffer = ref }>
				<SimpleSlider  
					selectService={this.props.selectService}
					appointments={this.props.appointments}
					addTip={this.props.addTip}
				/>
	        </div>
		)		
	}
}

const mapStateToProps = (state) => {
  return {}
}

let OrderFlowComponent = connect( mapStateToProps, {
	navigate,
	addTip
})(OrderFlow)

export default OrderFlowComponent;