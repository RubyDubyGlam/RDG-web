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
						<div style={{height: '100%', color: 'white', display: 'flex', alignItems: 'center', padding: 16, flexDirection: 'column' }} >
							<span style={{fontFamily: "'Great Vibes', cursive", fontSize: 32, lineHeight: '32px'}}>Blowout</span>
							<p style={{marginTop: 4}} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec imperdiet lorem, vel consequat felis.</p>
						</div>
					</div>
				</Paper>
				<Paper zDepth={3} style={{ height: '33.33%', maxHeight: '33.33%', flexGrow: 1, order: 2, background: 'transparent', width: '100%', zIndex: 1, display: 'flex', justifyContent: 'flex-end' }} onClick={() => this.props.navigate('/makeup')}>
					<div style={{height: '100%', display: 'flex', justifyContent: 'flex-end' }} >
						<div style={{height: '100%', color: 'white', display: 'flex', alignItems: 'center', padding: 16, flexDirection: 'column' }} >
							<span style={{fontFamily: "'Great Vibes', cursive", fontSize: 32, lineHeight: '32px'}}>Makeup</span>
							<span style={{marginTop: 4}} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec imperdiet lorem, vel consequat felis.</span>
						</div>
						<img src={'/assets/05.jpg'} height={'100%'} />
					</div>
				</Paper>
				<Paper zDepth={1} style={{ height: '33.33%', maxHeight: '33.33%', flexGrow: 1, order: 3, background: 'transparent', width: '100%', zIndex: 0 }} onClick={() => this.props.navigate('/lashes')}>
					<div style={{height: '100%', display: 'flex', alignItems: 'center'}} >
						<img src={'/assets/06.jpg'} height={'100%'} />
						<div style={{height: '100%', color: 'white', display: 'flex', alignItems: 'center', padding: 16, flexDirection: 'column' }} >
							<span style={{fontFamily: "'Great Vibes', cursive", fontSize: 32, lineHeight: '32px'}}>Lashes</span>
							<span style={{marginTop: 4}} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec imperdiet lorem, vel consequat felis.</span>
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