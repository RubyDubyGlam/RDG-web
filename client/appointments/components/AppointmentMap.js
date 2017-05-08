import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React from 'react'

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

export default function AppointmentMap(props) {

  const marker = {
    position: {
      lat: props.lat,
      lng: props.lng,
    },
  }

	return ( 
		<GettingStartedGoogleMap
		    containerElement={
		      <div style={{ height: 200 }} />
		    }
		    mapElement={
		      <div style={{ height: 200 }} />
		    }
		    onMapLoad={_.noop}
		    onMapClick={_.noop}
		    markers={[marker]}
		    onMarkerRightClick={_.noop}
        lat={props.lat}
        lng={props.lng}
  		/> 
  	)
}
