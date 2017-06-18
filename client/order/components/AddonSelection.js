import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

import navigate from '../../common/actions/router-actions'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import moment from 'moment'

import { connect } from 'react-redux'

import { map, each } from 'lodash'

const styles = {
	container: {
		height: '100vh',
		width: '100vw',
		padding: 0,
		margin: 0,
	},
}

const addons_list = {
	'braid' : {
		name: 'Blowout & Braid',
		duration: [90],
		price: [8500],
		image: '/assets/15.jpg',
	},
	'lashstrip': {
		name: 'Makeup & Lashstrip',
		duration: [50],
		price: [9000],
		image: '/assets/13.jpg'	
	},
	'lashfill' : {
		name: 'Lash Fill',
		duration: [120],
		price: [12500],
		image: '/assets/12.jpg',
	},
}

var product_list = {
  'blowout': {
    price: [4500],
    duration: [60],
    name: 'Blowout',
    addons: [addons_list['braid']],
    image: '/assets/15.jpg',
  },
  'updo': {
    price: [8500],
    duration: [90],
    name: 'Up-do',
    addons: [],
    image: '/assets/13.jpg'
  },
  'makeup': {
    price: [6500],
    duration: [60],
    name: 'Makeup',
    addons: [addons_list['lashstrip']],
    image: '/assets/16.jpg'
  },
  'lashextensions': {
    price: [12500],
    duration: [120],
    name: 'Lash Extensions',
    image: '/assets/12.jpg',
    addons: [addons_list['lashfill']],
  },
}

import Slider from 'react-slick'

class SimpleSlider extends React.Component {

  computeAddons = (product_selection) => {
  	const base_product = product_list[product_selection]

  	const slides = [
  		<Slide 
  			price={base_product.price[0]} 
  			image={base_product.image}
  			duration={base_product.duration[0]}
  		/>
  	]

  	each( base_product.addons, (addon) => {
  		slides.push(
	 		<Slide 
	  			price={addon.price[0]} 
	  			image={addon.image}
	  			duration={addon.duration[0]}
	  		/>
  		)
  	})

  	return slides
  }


  render() {
    var settings = {
      dots: true,
      adaptiveHeight: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      afterChange: (from, to) => console.log(from, to),
      beforeChange: (from, to) => console.log()
    };

    const base_product = product_list[this.props.base_service]

    return (
      <Slider {...settings}>
		    <div style={{height: '95vh'}}>
		    	<img src={base_product.image} style={{height: '100vw'}} />
		        	<div style={{height: 50, width: '100%', backgroundColor: 'black', marginTop: -50, opacity: .9, color: 'white', textAlign: 'center', fontSize: 20, padding: 26}}>
		    	</div>
				<div style={{display: 'flex', width: '100%'}} >
					<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
						<div style={{display: 'flex', width: '100%'}} >
							<FloatingActionButton secondary={true} iconStyle={{ height: 100, width: 100 }} style={{ height: 100, width: 100, marginTop: -50 }} onTouchTap={() => this.props.selectService(this.props.base_service)}>
			      				<span> No Add-ons </span>
			   				</FloatingActionButton>
			   				<div style={{color: 'white', justifyContent: 'center', marginTop: -50, zIndex: 2400, display: 'flex', alignItems: 'center', height: 50, fontSize: 26, flexGrow: 1}}>
			   					{base_product.name}
			   				</div>
		   				</div>
		   				<div style={{display: 'flex', width: '100%', marginTop: -60}} >
							<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
								<p style={{fontWeight: 500, fontSize: 24}} >Price</p>
								<p>${base_product.price[0]}</p>
							</div>
							<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
								<p style={{fontWeight: 500, fontSize: 24}} >Duration</p>
								<p>{base_product.duration[0]} mins</p>
							</div>
						</div>
					</div>
				</div>
		    </div>
  		{
		  	map(base_product.addons, (addon, addon_name) => (
			    <div style={{height: '95vh'}}>
			    	<img src={addon.image} style={{height: '100vw'}} />
		        		<div style={{height: 50, width: '100%', backgroundColor: 'black', marginTop: -50, opacity: .9, color: 'white', textAlign: 'center', fontSize: 20, padding: 26}}>
			    	</div>
					<div style={{display: 'flex', width: '100%'}} >
						<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
							<div style={{display: 'flex', width: '100%'}} >
								<FloatingActionButton secondary={true} iconStyle={{ height: 100, width: 100 }} style={{ height: 100, width: 100, marginTop: -50 }} onTouchTap={() => this.props.selectService(this.props.base_service)}>
				      				<span> Add add-on </span>
				   				</FloatingActionButton>
				   				<div style={{color: 'white', justifyContent: 'center', marginTop: -50, zIndex: 2400, display: 'flex', alignItems: 'center', height: 50, fontSize: 26, flexGrow: 1}}>
				   					{addon.name}
				   				</div>
			   				</div>
			   				<div style={{display: 'flex', width: '100%', marginTop: -60}} >
								<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
									<p style={{fontWeight: 500, fontSize: 24}} >Price</p>
									<p>${addon.price[0] / 100}</p>
								</div>
								<div style={{marginTop: 80, flexGrow: 1, maxWidth:'50%', textAlign: 'center'}}>
									<p style={{fontWeight: 500, fontSize: 24}} >Duration</p>
									<p>{addon.duration[0]} mins</p>
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

	changeSelection = (selection) => {
		this.setState({selection})
	}

	render() {
		return (
			<div style={styles.container}>
				<SimpleSlider
					base_service={this.props.base_service}
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