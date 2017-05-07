import React, { Component } from 'react'
import { Button, Input, Menu, Divider, Grid, Segment, Container, Card, Icon, Image, Step } from 'semantic-ui-react'

import Stepone from './Stepone'
import Steptwo from './Steptwo'
import Stepthree from './Stepthree'

export default class MenuExampleSecondary extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		step: 1
  	}
  }


  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleNextStep = (e) => {
  	this.setState({
  		step: this.state.step + 1
  	})
  }

  secureToken = (token) => {
  	this.setState({
  		token: token,
  		step: this.state.step + 1
  	})
  }

  render() {

    const steps = [
	  { active: this.state.step === 1, completed: this.state.step > 1, title: 'Service', description: 'Choose your service' },
	  { active: this.state.step === 2, completed: this.state.step > 2, title: 'Location', description: 'Enter location information' },
	  { active: this.state.step === 3, completed: this.state.step > 3, title: 'Payment', description: 'Enter payment information' },
	  { active: this.state.step === 4, completed: this.state.step > 4, title: 'Confirm Order', description: 'Verify order details' },
	]



    return (
    	<div style={{top: 0, right: 0, left: 0, bottom: 0, width: '100vw', height: '100vh'}}>
	      <Menu secondary stackable inverted style={{backgroundColor: 'black', height: 30, top:0}}>
	        <Menu.Menu position='right'>
	          <Menu.Item inverted name='my account' onClick={this.handleItemClick} />
	          <Menu.Item inverted name='logout' onClick={this.handleItemClick} />
	        </Menu.Menu>
	      </Menu>
	      {
	      // <Menu secondary inverted style={{backgroundColor: '#383838', height: 30, top:30, paddingRight: 50, paddingLeft: 50}} widths={12}>
	      //     <Menu.Item inverted name='how it works' onClick={this.handleItemClick} />
	      //     <Menu.Item inverted name='services' onClick={this.handleItemClick} />
	      //     <Menu.Item inverted name='packages' onClick={this.handleItemClick} />
	      //     <Menu.Item inverted name='book now' onClick={this.handleItemClick} />
	      // </Menu>
	  		}
		  <Grid column={1} container style={{width: '100%'}} textAlign='center' verticalAlign='middle'>
			<Grid.Column verticalAlign='middle'>
				<Grid.Row centered>
					<Step.Group ordered items={steps} />
				</Grid.Row>
				{
					this.state.step === 1 ? <Stepone /> : null
				}
				{
					this.state.step === 2 ? <Steptwo /> : null
				}
				{
					this.state.step === 3 ? <Stepthree handleNextStep={this.handleNextStep}/> : null
				}
	      		<Grid.Row style={{marginTop: 15}}>
					<Button onClick={this.handleNextStep} style={{ width: 290, height: 50}}> Next </Button>
				</Grid.Row>
 			</Grid.Column>
		  </Grid>
      	</div>
    )
  }
}
