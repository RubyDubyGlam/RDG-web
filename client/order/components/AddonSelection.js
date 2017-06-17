import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

import navigate from '../../common/actions/router-actions'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import moment from 'moment'

import { connect } from 'react-redux'

const styles = {
	container: {
		height: '100vh',
		width: '100vw',
		padding: 0,
		margin: 0,
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
      swipeToSlide: true,
      afterChange: (from, to) => console.log(from, to),
      beforeChange: (from, to) => console.log()
    };
    return (
      <Slider {...settings}>
        <div >
        	<img src={'/assets/16.jpg'} style={{height: '100vw'}} />
        	<div style={{height: 120, width: '100%', backgroundColor: 'black', marginTop: -120, opacity: .9, color: 'white', textAlign: 'center', fontSize: 24, padding: 26}}>
        	</div>
			<div style={{display: 'flex', width: '100%'}} >
				<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
					<FloatingActionButton secondary={true} iconStyle={{ height: 100, width: 100 }} style={{ height: 100, width: 100, marginTop: -50 }} onTouchTap={() => this.props.selectService('thingy')}>
	      				<ContentAdd style={{ height: 50, width: 50}} />
	   				</FloatingActionButton>
	   				<div style={{display: 'flex', width: '100%', marginTop: -60}} >
						<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
							<p style={{fontWeight: 500, fontSize: 24}} >Prices</p>
							<p>console</p>
						</div>
						<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
							<p style={{fontWeight: 500, fontSize: 24}} >Durations</p>
							<p>console</p>
						</div>
						<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
							<p style={{fontWeight: 500, fontSize: 24}} >Add-ons</p>
							<p>console</p>
						</div>
					</div>
				</div>
			</div>
        </div>
        <div >
        	<img src={'/assets/13.jpg'} style={{height: '100vw'}} />
        	<div style={{height: 120, width: '100%', backgroundColor: 'black', marginTop: -120, opacity: .9, color: 'white', textAlign: 'center', fontSize: 24, padding: 26}}>
        	</div>
			<div style={{display: 'flex', width: '100%'}} >
				<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
					<FloatingActionButton secondary={true} iconStyle={{ height: 100, width: 100 }} style={{ height: 100, width: 100, marginTop: -50 }} onTouchTap={() => this.props.selectService('thingy')}>
	      				<ContentAdd style={{ height: 50, width: 50}} />
	   				</FloatingActionButton>
	   				<div style={{display: 'flex', width: '100%', marginTop: -60}} >
						<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
							<p style={{fontWeight: 500, fontSize: 24}} >Prices</p>
							<p>console</p>
						</div>
						<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
							<p style={{fontWeight: 500, fontSize: 24}} >Durations</p>
							<p>console</p>
						</div>
						<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
							<p style={{fontWeight: 500, fontSize: 24}} >Add-ons</p>
							<p>console</p>
						</div>
					</div>
				</div>
			</div>
        </div>
        <div >
        	<img src={'/assets/15.jpg'} style={{height: '100vw'}} />
        	<div style={{height: 120, width: '100%', backgroundColor: 'black', marginTop: -120, opacity: .9, color: 'white', textAlign: 'center', fontSize: 24, padding: 26}}>
        	</div>
			<div style={{display: 'flex', width: '100%'}} >
				<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
					<FloatingActionButton secondary={true} iconStyle={{ height: 100, width: 100 }} style={{ height: 100, width: 100, marginTop: -50 }} onTouchTap={() => this.props.selectService('thingy')}>
	      				<span> Add Service </span>
	   				</FloatingActionButton>
	   				<div style={{display: 'flex', width: '100%', marginTop: -60}} >
						<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
							<p style={{fontWeight: 500, fontSize: 24}} >Prices</p>
							<p>console</p>
						</div>
						<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
							<p style={{fontWeight: 500, fontSize: 24}} >Durations</p>
							<p>console</p>
						</div>
						<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
							<p style={{fontWeight: 500, fontSize: 24}} >Add-ons</p>
							<p>console</p>
						</div>
					</div>
				</div>
			</div>
        </div>
      </Slider>
    );
  }
}

class SimpleSliderTwo extends React.Component {
  render() {
    var settings = {
      infinite: true,
      speed: 500,
      slickGoTo: this.props.step
    };
    return (
      <Slider {...settings}>
        <div >

        </div>
        <div >
				<div style={{display: 'flex', width: '100%'}} >
					<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
						<p style={{fontWeight: 500, fontSize: 24}} >Prices</p>
						<p>console</p>
					</div>
					<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
						<p style={{fontWeight: 500, fontSize: 24}} >Durations</p>
						<p>console</p>
					</div>
					<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
						<p style={{fontWeight: 500, fontSize: 24}} >Add-ons</p>
						<p>console</p>
					</div>
				</div>
        </div>
        <div >
 				<div style={{display: 'flex', width: '100%'}} >
					<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
						<p style={{fontWeight: 500, fontSize: 24}} >Prices</p>
						<p>console</p>
					</div>
					<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
						<p style={{fontWeight: 500, fontSize: 24}} >Durations</p>
						<p>console</p>
					</div>
					<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
						<p style={{fontWeight: 500, fontSize: 24}} >Add-ons</p>
						<p>console</p>
					</div>
				</div>
        </div>
        <div >
				<div style={{display: 'flex', width: '100%'}} >
					<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
						<p style={{fontWeight: 500, fontSize: 24}} >Prices</p>
						<p>console</p>
					</div>
					<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
						<p style={{fontWeight: 500, fontSize: 24}} >Durations</p>
						<p>console</p>
					</div>
					<div style={{marginTop: 80, flexGrow: 1, maxWidth:'33.33%', textAlign: 'center'}}>
						<p style={{fontWeight: 500, fontSize: 24}} >Add-ons</p>
						<p>console</p>
					</div>
				</div>
        </div>
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
				<SimpleSlider changeSelection = {this.changeSelection} selectService={this.props.selectService}/>
				<div style={{marginTop: 30}}>
					<SimpleSliderTwo selection={this.state.selection} selectService={this.props.selectService}/>
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

export default OrderFlowComponent;