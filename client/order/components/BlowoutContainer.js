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
				<Paper zDepth={5} style={{ height: '33.33%', maxHeight: '33.33%', flexGrow: 1, order: 1, background: 'transparent', width: '100%', zIndex: 2 }} onClick={() => this.props.navigate('/blowout/blowout')}>
					<div style={{height: '100%', display: 'flex', alignItems: 'center'}} >
						<img src={'/assets/04-new.jpg'} height={'100%'} />
						<div style={{height: '100%', color: 'white', display: 'flex', padding: 16, flexDirection: 'column' }} >
							<span style={{fontFamily: "'Great Vibes', cursive", fontSize: 32, lineHeight: '32px'}}>Blowout</span>
							<p style={{marginTop: 4}} >{'Duration: 45mins'}</p>
							<p style={{marginTop: 4}} >{'Price: $50'}</p>
						</div>
					</div>
				</Paper>
				<Paper zDepth={5} style={{ height: '33.33%', maxHeight: '33.33%', flexGrow: 1, order: 1, background: 'transparent', width: '100%', zIndex: 2 }} onClick={() => this.props.navigate('/blowout/blowout+braid')}>
					<div style={{height: '100%', display: 'flex', alignItems: 'center'}} >
						<img src={'/assets/09.jpg'} height={'100%'} />
						<div style={{height: '100%', color: 'white', display: 'flex', padding: 16, flexDirection: 'column' }} >
							<span style={{fontFamily: "'Great Vibes', cursive", fontSize: 24, lineHeight: '32px'}}>{'Blowout + Braid'}</span>
							<p style={{marginTop: 4}} >{'Duration: 50mins'}</p>
							<p style={{marginTop: 4}} >{'Price: $75'}</p>
						</div>
					</div>
				</Paper>
				<Paper zDepth={5} style={{ height: '33.33%', maxHeight: '33.33%', flexGrow: 1, order: 1, background: 'transparent', width: '100%', zIndex: 2 }} onClick={() => this.props.navigate('/blowout/blowout+updo')}>
					<div style={{height: '100%', display: 'flex', alignItems: 'center'}} >
						<img src={'/assets/07.jpg'} height={'100%'} />
						<div style={{height: '100%', color: 'white', display: 'flex', padding: 16, flexDirection: 'column' }} >
							<span style={{fontFamily: "'Great Vibes', cursive", fontSize: 24, lineHeight: '32px'}}>{'Blowout + Up-do'}</span>
							<p style={{marginTop: 4}} >{'Duration: 90mins'}</p>
							<p style={{marginTop: 4}} >{'Price: $85'}</p>
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