import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'

import {
	Card, 
	CardActions, 
	CardHeader, 
	CardMedia, 
	CardTitle, 
	CardText
} from 'material-ui/Card'

import {
	Tabs, 
	Tab
} from 'material-ui/Tabs'

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

export default function OrderProductSelection(props) {
	return (	          
		<Step>
	        <StepLabel style={{color: 'pink'}}>Select a service</StepLabel>
	        <StepContent>
		        <Tabs>
				    <Tab label="Hair" >
		          		<CardExampleWithAvatar price={'75'} product="Hair" handleOpen={this.handleOpen} onClick={this.nextStep(1)}/>
				    </Tab>
				    <Tab label="Nails" >
		          		<CardExampleWithAvatar price={'25'} product="Nails" handleOpen={this.handleOpen} onClick={this.nextStep(1)}/>
				    </Tab>
				    <Tab label="Makeup" >
		          		<CardExampleWithAvatar price={'50'} product="Makeup" handleOpen={this.handleOpen} onClick={this.nextStep(1)}/>
				    </Tab>
				</Tabs>
	        </StepContent>
	    </Step>
	)
}