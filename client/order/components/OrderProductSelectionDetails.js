import React, { Component } from 'react'

export default class OrderProductSelectionDetails extends Component {
	render() {
	  const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onTouchTap={this.handleClose}
	      />,
	      <FlatButton
	        label="Submit"
	        primary={true}
	        keyboardFocused={true}
	        onTouchTap={this.handleClose}
	      />,
      ]
	  return (
	        <Dialog
	          title="Dialog With Actions"
	          actions={actions}
	          modal={false}
	          open={this.state.open}
	          onRequestClose={this.handleClose}
	        >
	          The actions in this window were passed in as an array of React objects.
	        </Dialog>
	  )
	}
}