import React from 'react'

import CircularProgress from 'material-ui/CircularProgress';

export default function Loader() {
	return (
        <div 
        	style={{
	        	backgroundColor: 'black', 
	        	opacity: .9,
	        	position: 'fixed',
	        	top: 0,
	        	bottom: 0,
	        	right: 0,
	        	left: 0,
	        	display: 'flex',
	        	alignItems: 'center',
	        	justifyContent: 'center',
	        	zIndex: 1400
	        }}>
		        <CircularProgress size={120} thickness={12} />
		</div>
	)
}