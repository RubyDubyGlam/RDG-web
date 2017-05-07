import React, { Component } from 'react'

import {
  Step,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

import {
	Card, 
	CardActions, 
	CardHeader, 
	CardMedia, 
	CardTitle, 
	CardText
} from 'material-ui/Card';

import {
	Tabs, 
	Tab
} from 'material-ui/Tabs';

import Dialog from 'material-ui/Dialog';

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const CardExampleWithAvatar = (props) => (
  <Card >
    <CardMedia
      overlay={<CardTitle title={props.product} subtitle={props.price} />}
    >
      <img src="/assets/05.jpg" />
    </CardMedia>
    <CardActions>
      <FlatButton label="Details" onClick={props.handleOpen} />
      <FlatButton primary label="Select" onClick={props.onClick}/>
    </CardActions>
  </Card>
);

export default class OrderProductSelection extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open_details: false
		}
	}

	handleOpen = () => {
		this.setState({
			open_details: !this.state.open_details
		})
	}

	render() {
		return (
	        <Tabs>
			    <Tab label="Hair" >
	          		<CardExampleWithAvatar price={'75'} product="Hair" handleOpen={this.handleOpen} onClick={this.props.navigateStep(1)}/>
			    </Tab>
			    <Tab label="Nails" >
	          		<CardExampleWithAvatar price={'25'} product="Nails" handleOpen={this.handleOpen} onClick={this.props.navigateStep(1)}/>
			    </Tab>
			    <Tab label="Makeup" >
	          		<CardExampleWithAvatar price={'50'} product="Makeup" handleOpen={this.handleOpen} onClick={this.props.navigateStep(1)}/>
			    </Tab>
			</Tabs>
		)
	}
}