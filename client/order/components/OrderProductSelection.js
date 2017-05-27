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

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

import Dialog from 'material-ui/Dialog';

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import HairDryer from '../../../public/assets/technology.svg'
import Nails from '../../../public/assets/nail-polish.svg'
import Makeup from '../../../public/assets/lipstick.svg'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', 
    overflowY: 'scroll'
  },
};

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
			nails: props.form_data.products.nails,
			hair: props.form_data.products.hair,
			makeup: props.form_data.products.makeup,
		}
	}

	onHandleChange = (product, selection) => {
		console.log(this.state)
		const old_state = this.state
		old_state[product] = selection
		this.setState(old_state)
	}

	onSubmit = () => {
		this.props.setProducts(this.state)
		this.props.goForward()
	}

	render() {
		return (
  		<div style={styles.root}>
			<div style={{textAlign: 'center', paddingLeft: '20%', paddingRight: '20%', marginBottom: 24}}>
	  			<p style={{fontSize: 15}}> Step 1 of 4 </p>
	  			<p style={{fontSize: 16}}> Which services would you like to book? </p>
  			</div>
	      <List>
	        <ListItem
	          leftCheckbox={
	          	<Checkbox 
	          		onCheck={(e, selection) => this.onHandleChange('nails', selection)}
	          		checked={this.state.nails}
	          	/>
	          }
	          primaryText="Nails"
	          secondaryText="Set price here"
	          rightIcon={<Nails style={{fill: 'white'}}/>}
	        />
	        <ListItem
	          leftCheckbox={<Checkbox checked={this.state.hair} onCheck={(e, selection) => this.onHandleChange('hair', selection)} />}
	          primaryText="Hair"
	          secondaryText="Set price here"
	          rightIcon={<HairDryer style={{fill: 'white'}}/>}
	        />
	        <ListItem
	          leftCheckbox={<Checkbox checked={this.state.makeup} onCheck={(e, selection) => this.onHandleChange('makeup', selection)} />}
	          primaryText="Makeup"
	          secondaryText="Set price here"
	          rightIcon={<Makeup style={{fill: 'white'}}/>}
	        />
	      </List>
	      <div style={{position: 'absolute', bottom: 70, width: '100%', display: 'flex', justifyContent: 'center'}}>
	        	<FlatButton
		            label="Back"
		            onTouchTap={this.props.goBack}
		            style={{marginRight: 12}}
	         	/>
		        <RaisedButton
		            primary={true}
		            label="Next"
		            onTouchTap={this.onSubmit}
		            disabled={!this.state.nails && !this.state.makeup && !this.state.hair}
		        />
          </div>
	   	</div>
		)
	}
}