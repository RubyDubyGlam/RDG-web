import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React from 'react'

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
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

export default function AppointmentMap() {
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
		    markers={[]}
		    onMarkerRightClick={_.noop}
  		/> 
  	)
}
