import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React, { Component } from 'react'

import CarIcon from '../../../public/assets/car.svg'

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));
// Then, render it:

export default class AppointmentMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      location: null
    }
    navigator.geolocation.getCurrentPosition(this.markLocation)
  }

  markLocation = (position) => {
    this.setState({
      location: {
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude   
        },
        icon: '/assets/car.svg'
      }
    })
  }

  render() {

    const {
      props
    } = this

    const marker = {
      position: {
        lat: props.lat,
        lng: props.lng,
      },
    }

    const markers = [marker]

    if (this.state.location) {
      markers.push(this.state.location)
    }

    let agent = 'web'

    if( /iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
      agent = 'ios'
    }


    if( /Android/i.test(navigator.userAgent) ) {
      agent = 'android'
    }

  	return ( 
  		<GettingStartedGoogleMap
  		    containerElement={
  		      <div style={{ height: agent === 'web' ? 450 : '100vw' }} />
  		    }
  		    mapElement={
  		      <div style={{ height: agent === 'web' ? 450 : '100vw' }} />
  		    }
  		    onMapLoad={_.noop}
  		    onMapClick={_.noop}
  		    markers={markers}
  		    onMarkerRightClick={_.noop}
          lat={props.lat}
          lng={props.lng}
    		/> 
    	)
  }
}
