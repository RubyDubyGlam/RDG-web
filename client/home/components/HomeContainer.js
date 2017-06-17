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
		overflowY: 'scroll',
		backgroundColor: 'white'
	},
}

import Slider from 'react-slick'

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true
    };
    return (
      <Slider {...settings}>
        <div style={{height: '100vw'}} >
        	<img src={'/assets/12.jpg'} height={'100%'} />
        	<div style={{height: 100}}></div>
        </div>
        <div style={{height: '100vw'}} >
        	<img src={'/assets/16.jpg'} height={'100%'} />
        </div>
        <div style={{height: '100vw'}} >
        	<img src={'/assets/13.jpg'} height={'100%'} />
        </div>
        <div style={{height: '100vw'}} >
        	<img src={'/assets/15.jpg'} height={'100%'} />
        </div>
      </Slider>
    );
  }
}

class OrderFlow extends Component {
	render() {
		return (
			<div style={styles.container}>
				<SimpleSlider />
	        </div>
		)		
	}
}

// 12, 16, 13, 15

const mapStateToProps = (state) => {
  return {}
}

let OrderFlowComponent = connect( mapStateToProps, {
	navigate
})(OrderFlow)

export default OrderFlowComponent;

















