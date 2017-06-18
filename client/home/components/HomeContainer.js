import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

import navigate from '../../common/actions/router-actions'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Slider from 'react-slick'

import moment from 'moment'

import { map } from 'lodash'

import { connect } from 'react-redux'

const styles = {
	container: {
		height: '100vh',
		width: '100vw',
		padding: 0,
		margin: 0,
	},
}

var product_list = {
  'blowout': {
    prices: [4500, 8500],
    durations: [60, 90],
    name: 'Blowout',
    addons: ['Braid'],
    image: '/assets/15.jpg',
  },
  'updo': {
    prices: [8500],
    durations: [90],
    name: 'Up-do',
    addons: [],
    image: '/assets/13.jpg'
  },
  'makeup': {
    prices: [6500, 9000],
    durations: [60],
    name: 'Makeup',
    addons: ['Lashstrip'],
    image: '/assets/16.jpg'
  },
  'lashextensions': {
    prices: [12500, 20000],
    durations: [120],
    name: 'Lash Extensions',
    image: '/assets/12.jpg',
    addons: [],
  },
}

class SimpleSlider extends React.Component {
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
      		map(product_list, (product, product_name) => (
		        <div style={{height: '95vh'}}>
		        	<img src={product.image} style={{height: '100vw'}} />
		        	<div style={{height: 50, width: '100%', backgroundColor: 'black', marginTop: -50, opacity: .9, color: 'white', textAlign: 'center', fontSize: 20, padding: 26}}>
		        	</div>
					<div style={{display: 'flex', width: '100%'}} >
						<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width:'100%'}}>
							<div style={{display: 'flex', width: '100%'}} >
								<FloatingActionButton secondary={true} iconStyle={{ height: 100, width: 100 }} style={{ height: 100, width: 100, marginTop: -50 }} onTouchTap={
									() => {
										this.props.selectService(product_name)
									}}
								>
				      				<span> Add Service </span>
				   				</FloatingActionButton>
				   				<div style={{color: 'white', justifyContent: 'center', marginTop: -50, zIndex: 2400, display: 'flex', alignItems: 'center', height: 50, fontSize: 26, flexGrow: 1}}>
				   					{product.name}
				   				</div>
			   				</div>
			   				<div style={{display: 'flex', width: '100%', marginTop: -60}} >
								<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
									<p style={{fontWeight: 500, fontSize: 20}} >Price</p>
									{ product.prices.length > 1 ? <p>{`$${product.prices[0] / 100 } - $${product.prices[product.prices.length - 1] / 100}`}</p> : <p>{`$${product.prices[0] / 100}`}</p> }
								</div>
								<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
									<p style={{fontWeight: 500, fontSize: 20}} >Duration</p>
									{ product.durations.length > 1 ? <p>{`${product.durations[0]} - ${product.durations[product.durations.length - 1]} mins`}</p> : <p>{`${product.durations[0]} mins`}</p> }
								</div>
								<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
									<p style={{fontWeight: 500, fontSize: 20}} >Add-on</p>
									{ product.addons.length ? <p>{product.addons[0]}</p> : <p>None</p> }
								</div>
							</div>
						</div>
					</div>
		        </div>
      		)) 
      	}
      </Slider>
    );
  }
}

class OrderFlow extends Component {
	state = { selection: 0 }

	render() {
		return (
			<div style={styles.container}>
				<SimpleSlider  
					selectService={this.props.selectService}
				/>
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
