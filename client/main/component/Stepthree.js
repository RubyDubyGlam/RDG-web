import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout';
import { Grid } from 'semantic-ui-react'

export default class TakeMoney extends React.Component {
  onToken = (token) => {
  	console.log(token)
  	this.props.handleNextStep(token)
  }

  // ...

  render() {
    return (
      // ...
      <Grid.Row>
      	  <Grid.Column>
	      <StripeCheckout
	        token={this.onToken}
	        stripeKey="pk_test_BTRrj2yjVesTnchX9JbiYJE3"
	      />
	      </Grid.Column>
      </Grid.Row>
    )
  }
}