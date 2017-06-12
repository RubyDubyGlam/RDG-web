import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

import navigate from '../../common/actions/router-actions'

import moment from 'moment'

import { connect } from 'react-redux'

const styles = {
	container: {
		height: '100%',
		width: '100%',
		padding: 0,
		margin: 0,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		overflowY: 'scroll',
		backgroundImage: 'url("/assets/black-gradient.jpg")'
	},
}

class OrderFlow extends Component {
	render() {
		return (
			<div style={styles.container}>
				<Paper zDepth={5} style={{ height: '33.33%', maxHeight: '33.33%', flexGrow: 1, order: 1, background: 'transparent', width: '100%', zIndex: 2 }} onClick={() => this.props.navigate('/blowout')}>
					<div style={{height: '100%', display: 'flex', alignItems: 'center'}} >
						<img src={'/assets/04-new.jpg'} height={'100%'} />
						<div style={{height: '100%', color: 'white', display: 'flex', padding: 16, flexDirection: 'column' }} >
							<span style={{fontFamily: "'Great Vibes', cursive", fontSize: '2em', marginBottom: 6, marginTop: 6 }}>Blowout</span>
							<p style={{marginTop: 4, fontSize: '.8em'}} >Add-ons: Braid, Up-do</p>
							<p style={{marginTop: 4, fontSize: '.8em'}} >Prices: $50 - $85</p>
							<p style={{marginTop: 4, fontSize: '.8em'}} >Durations: 45-90 mins </p>
						</div>
					</div>
				</Paper>
				<Paper zDepth={3} style={{ height: '33.33%', maxHeight: '33.33%', flexGrow: 1, order: 2, background: 'transparent', width: '100%', zIndex: 1, display: 'flex', justifyContent: 'flex-end' }} onClick={() => this.props.navigate('/makeup')}>
					<div style={{height: '100%', display: 'flex', justifyContent: 'flex-end' }} >
						<div style={{height: '100%', color: 'white', display: 'flex', padding: 16, flexDirection: 'column', flexGrow: 1 }} >
							<span style={{fontFamily: "'Great Vibes', cursive", fontSize: '2em', marginBottom: 6, marginTop: 6 }}>Makeup</span>
							<p style={{marginTop: 4, fontSize: '.8em'}} >Add-ons: Lash Strip</p>
							<p style={{marginTop: 4, fontSize: '.8em'}} >Prices: $65 - $90</p>
							<p style={{marginTop: 4, fontSize: '.8em'}} >Durations: 60 mins </p>
						</div>
						<img src={'/assets/05.jpg'} height={'100%'} />
					</div>
				</Paper>
				<Paper zDepth={1} style={{ height: '33.33%', maxHeight: '33.33%', flexGrow: 1, order: 3, background: 'transparent', width: '100%', zIndex: 0 }} onClick={() => this.props.navigate('/lashes')}>
					<div style={{height: '100%', display: 'flex', alignItems: 'center'}} >
						<img src={'/assets/06.jpg'} height={'100%'} />
						<div style={{height: '100%', color: 'white', display: 'flex', padding: 16, flexDirection: 'column' }} >
							<span style={{fontFamily: "'Great Vibes', cursive", fontSize: '2em', marginBottom: 6, marginTop: 6 }}>Lash Extensions</span>
							<p style={{marginTop: 4, fontSize: '.8em'}} >Add-ons: Lash Fill</p>
							<p style={{marginTop: 4, fontSize: '.8em'}} >Prices: $200 - $325</p>
							<p style={{marginTop: 4, fontSize: '.8em'}} >Durations: 120 mins </p>
						</div>
					</div>
				</Paper>
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

export default OrderFlowComponent;