import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

import moment from 'moment'

import { connect } from 'react-redux'

import navigate from '../../common/actions/router-actions'

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
				<div style={{fontSize: 26, height: '10%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}} ><span>Click to select a service</span></div>
				<Paper zDepth={5} style={{ height: '33.33%', maxHeight: '33.33%', flexGrow: 1, order: 1, background: 'transparent', width: '100%', zIndex: 2 }} onClick={() => this.props.navigate('/lashes/lashextensions')}>
					<div style={{height: '100%', display: 'flex', alignItems: 'center'}} >
						<img src={'/assets/12.jpg'} height={'100%'} />
						<div style={{height: '100%', color: 'white', display: 'flex', padding: 16, flexDirection: 'column' }} >
							<span style={{fontFamily: "'Great Vibes', cursive", fontSize: 32, lineHeight: '32px'}}>Lash Extensions</span>
							<p style={{marginTop: 4}} >{'Price: $200'}</p>
							<p style={{marginTop: 4}} >{'Duration: 120mins'}</p>
						</div>
					</div>
				</Paper>
				<Paper zDepth={5} style={{ height: '33.33%', maxHeight: '33.33%', flexGrow: 1, order: 1, background: 'transparent', width: '100%', zIndex: 2 }} onClick={() => this.props.navigate('/lashes/lashfill')} >
					<div style={{height: '100%', display: 'flex', alignItems: 'center'}} >
						<img src={'/assets/10.jpg'} height={'100%'} />
						<div style={{height: '100%', color: 'white', display: 'flex', padding: 16, flexDirection: 'column' }} >
							<span style={{fontFamily: "'Great Vibes', cursive", fontSize: '1.5em' }}>{'Lash Fill'}</span>
							<p style={{marginTop: 4}} >{'Price: $125'}</p>
							<p style={{marginTop: 4}} >{'Duration: 120mins'}</p>
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