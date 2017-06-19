import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

import navigate from '../../common/actions/router-actions'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Slider from 'react-slick'

import moment from 'moment'

import { map, forEach, values } from 'lodash'

import { connect } from 'react-redux'

import FontIcon from 'material-ui/FontIcon';

import {blue500, red500, green500} from 'material-ui/styles/colors';

const styles = {
	container: {
		height: '100%',
		width: '100%',
		padding: 0,
		margin: 0,
	},
}

var product_list = {
  'blowout': {
    prices: [4500],
    durations: [60],
    name: 'Blowout',
    addons: {
    	'braid' : {
	    	prices: [2500],
	    	durations: [30],
	    	name: 'Braid',
    	}
    },
    image: '/assets/15.jpg',
  },
  'updo': {
    prices: [8500],
    durations: [90],
    name: 'Up-do',
    image: '/assets/13.jpg'
  },
  'makeup': {
    prices: [6500, 9000],
    durations: [60],
    name: 'Makeup',
    image: '/assets/16.jpg'
  },
  'lashextensions': {
    prices: [12500, 20000],
    durations: [120],
    name: 'Lash Extensions',
    image: '/assets/12.jpg',
  },
}

class SimpleSlider extends React.Component {

  state = {
  	services: {},
  	addons: {}
  }

  onSubtotalChange = () => {
  	let subtotal = 0

  	forEach(product_list, (service, service_name) => {
  		if (this.state.services[service_name]) {
  			subtotal += service.prices[0]
  		}

  		forEach(service.addons, (addon, addon_name) => {
	  		if (this.state.addons[addon_name]) {
	  			subtotal += addon.prices[0]
	  		} 			
  		})
  	})

  	this.props.handleSubtotalChange(subtotal)
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      afterChange: (from, to) => console.log(from, to),
      beforeChange: (from, to) => console.log()
    };
    return (
      <Slider {...settings}>
      	{ 
      		map(product_list, (product, product_name) => {


		        return (
		        	<div style={{height: '90vh'}}>
			        	<img src={product.image} style={{height: '100vw'}} />
			        	<div style={{height: this.state.services[product_name] ? '100vw' : 50, width: '100%', backgroundColor: 'black', marginTop: this.state.services[product_name] ? '-100vw' : -50, opacity: .8, color: 'white', textAlign: 'center', fontSize: 20, padding: 26, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
							{ this.state.services[product_name] && <FontIcon style={{fontSize: 160, color: 'pink'}} className="material-icons">check_circle</FontIcon> }
			        	</div>
						<div style={{display: 'flex', width: '100%'}} >
							<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width:'100%'}}>
								<div style={{display: 'flex', width: '100%'}} >
									<FloatingActionButton secondary={true} iconStyle={{ height: 100, width: 100 }} style={{ height: 100, width: 100, marginTop: -50 }} onTouchTap={
										() => {
											const services = this.state.services
											const addons = this.state.addons

											services[product_name] = !services[product_name]

											if (!services[product_name] && product.addons) {
												forEach(product.addons, (addon, addon_name) => {
													addons[addon_name] = false
												})
											}

											this.setState({services}, this.onSubtotalChange)

										}}
									>
					      				<span> { !this.state.services[product_name] ? 'Add Service' : 'Remove'} </span>
					   				</FloatingActionButton>
					   				<div style={{flexDirection: 'column', color: 'white', justifyContent: 'center', marginTop: -50, zIndex: 2400, display: 'flex', alignItems: 'center', height: 100, fontSize: 26, flexGrow: 1}}>
						   				<div style={{color: 'white', justifyContent: 'center', zIndex: 2400, display: 'flex', alignItems: 'center', height: 50, fontSize: 26 }}>
						   					{product.name}
						   				</div>
						   				<div style={{color: 'black', justifyContent: 'center', zIndex: 2400, display: 'flex', alignItems: 'center', height: 50, fontSize: 26 }}>
						   					Duration: {product.durations[0]} mins
						   				</div>
					   				</div>
				   				</div>
				   				{
				   					!this.state.services[product_name] && product.addons && (
						   				<div style={{display: 'flex', width: '100%', marginTop: -60}} >
											<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
												<p style={{fontWeight: 500, fontSize: 24}} >Price</p>
												<p>${product.prices[0] / 100}</p>
											</div>
											<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
												<p style={{fontWeight: 500, fontSize: 24}} >Duration</p>
												<p>{product.durations[0]} mins</p>
											</div>
											<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
												<p style={{fontWeight: 500, fontSize: 24}} >Add-ons</p>
												<p>{map(product.addons, (addon) => addon.name)}</p>
											</div>
										</div>
									)
				   				}
				   				{
				   					!product.addons && (
						   				<div style={{display: 'flex', width: '100%', marginTop: -60}} >
											<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
												<p style={{fontWeight: 500, fontSize: 24}} >Price</p>
												<p>${product.prices[0] / 100}</p>
											</div>
											<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
												<p style={{fontWeight: 500, fontSize: 24}} >Duration</p>
												<p>{product.durations[0]} mins</p>
											</div>
											<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
												<p style={{fontWeight: 500, fontSize: 24}} >Add-ons</p>
												<p>None</p>
											</div>
										</div>
									)
				   				}
				   				{
				   					this.state.services[product_name] && product.addons && (
						   				<div style={{display: 'flex', width: '100%', marginTop: -60}} >
						 					<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
						 						<p style={{fontWeight: 500, fontSize: 20}} >Add-on</p>
						 						{
						 							map(product.addons, (addon) => {
						 								return (
						 									<p>{addon.name}</p>
						 								)
						 							})
						 						}
											</div>
											<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
												<p style={{fontWeight: 500, fontSize: 20}} >Price</p>
									 			{
						 							map(product.addons, (addon) => {
						 								return (
						 									<p>${addon.prices / 100}</p>
						 								)
						 							})
						 						}
											</div>
											<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
												<p style={{fontWeight: 500, fontSize: 20}} >Add/Remove</p>
												{
						 							map(product.addons, (addon, addon_name) => {
						 								return (
						 									<p onTouchTap={() => {
																const addons = this.state.addons

																addons[addon_name] = !addons[addon_name]

																this.setState({addons}, this.onSubtotalChange)

															}} >
																{ this.state.addons[addon_name] ? <FontIcon style={{marginTop: -3}} color={green500} className="material-icons">check</FontIcon> : <FontIcon style={{marginTop: -3}} className="material-icons">add</FontIcon> }
															</p>
						 								)
						 							})
						 						}
											</div>
										</div>

				   					)
				   				}
							</div>
						</div>
			        </div>
		        )
      		}) 
      	}
      </Slider>
    );
  }
}

class OrderFlow extends Component {
	state = { selection: 0, subtotal: 0 }

	handleSubtotalChange = (subtotal) => {
		this.setState({ subtotal })
	}

	render() {
		return (
			<div style={styles.container} ref={ (ref) => this.reffer = ref }>
				<SimpleSlider  
					selectService={this.props.selectService}
					handleSubtotalChange={this.handleSubtotalChange}
				/>
				<div style={{position: 'absolute', bottom: 0, width: '100%', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50}} >Subtotal: ${this.state.subtotal / 100}</div>
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
