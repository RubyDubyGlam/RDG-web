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

import Paper from 'material-ui/Paper'

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

import Dialog from 'material-ui/Dialog';

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import HairDryer from '../../svg/technology.svg'
import Nails from '../../svg/nail-polish.svg'
import Makeup from '../../svg/lipstick.svg'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', 
    overflowY: 'scroll'
  },
  card: {
  	border: '2px solid #FF1493',
  	outline: 'none',
    borderColor: '#FF1493',
    boxShadow: '0 0 10px #FF1493',
    margin: '0 15px 0 15px'
  }
};

const CardExampleWithAvatar = (props) => (
  <Card style={styles.card}>
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
			nails: props.form_data.products.nails || true,
			hair: props.form_data.products.hair,
			makeup: props.form_data.products.makeup,
		}
	}

	onHandleChange = (product, selection) => {
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
	  			<p style={{fontSize: 40}}> Which services would you like to book? </p>
	  			<p style={{fontSize: 15}}> Each appointment begins with a personalized consultation to create your desired look. </p>
  			</div>
  			<div style={{maxHeight: '40%', display: 'flex', flexDirection: 'row', paddingLeft: '10%', paddingRight: '10%'}}>
  				<CardExampleWithAvatar product={'product'} price={'$50'}/>
  				<CardExampleWithAvatar product={'product'} price={'$50'}/>
  				<CardExampleWithAvatar product={'product'} price={'$50'}/>
  			</div>
  			<Paper style={{width: '100%', height: 125, position: 'absolute', bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
  				<p>2 services selected - 50$ </p>
		        <RaisedButton
		            primary={true}
		            label="Next"
		            onTouchTap={this.onSubmit}
		            style={{width: 370}}
		            disabled={!this.state.nails && !this.state.makeup && !this.state.hair}
		        />
  			</Paper>
	   	</div>
		)
	}
}