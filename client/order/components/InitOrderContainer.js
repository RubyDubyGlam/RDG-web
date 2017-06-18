import React, { Component } from 'react'

import navigate from '../../common/actions/router-actions'
import Slider from 'react-slick'

import moment from 'moment'

import { map } from 'lodash'

import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'

import {
	withRouter
} from 'react-router-dom'

const styles = {
	container: {
		height: '100vh',
		width: '100vw',
		padding: 0,
		margin: 0,
		position: 'absolute',
	    backgroundPosition: 'center',
	    backgroundRepeat: 'no-repeat',
	    backgroundSize: 'cover',
	    backgroundImage: 'url("/assets/hair-salon-port.jpg")'
	},
}

class OrderFlow extends Component {

	onClick = (e) => {

      if(document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if(document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if(document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if(document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    
      this.props.navigate('/book')
	}

	state = { selection: 0 }

	render() {
		return (
			<div style={styles.container}>
				<div style={{position: 'absolute', top: 0, bottom: 0, height: '100vh', width: '100vw', zIndex: 2, backgroundColor: 'black', opacity: .9}}>
				</div>
				<div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 0, height: '100vh', width: '100vw', zIndex: 3, color: 'white'}}>
					<p style={{transition: 'fadein'}}>Welcome to RubyDubyGlam</p>
					<p style={{transition: 'fadein'}}>The premier app for in-home styling services</p>
					    <FlatButton
					        label="Let's get started"
					        primary={true}
					        onTouchTap={this.onClick}
					        style={{marginTop: 26, color: 'white', borderStyle: 'solid', borderRadius: 4, borderWidth: 1, width: '60vw', height: '10vh'}}
				      	/>
				</div>
	        </div>
		)		
	}
}

const mapStateToProps = (state) => {
  return {}
}

let OrderFlowComponent = connect( mapStateToProps, {
	navigate
})(OrderFlow)

export default withRouter(OrderFlowComponent);