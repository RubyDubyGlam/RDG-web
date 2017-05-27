import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import FontIcon from 'material-ui/FontIcon';

import { logout } from '../../user/action/user-action'
console.log(logout)

function MobileHeaderIphone(props) {
	return (
		<div style={{height: 32, minimumHeight: 32, width: '100%', backgroundColor: 'black', color:'white', display:'flex', alignItems: 'center', justifyContent: 'flex-end'}} >
			{ !isEmpty(props.user) && <span style={{marginRight: 4}} onClick={props.logout}>Logout</span> }
			{'| '}
			<span style={{marginRight: 4}}>Need Help?</span>
		</div>
	)
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

let MobileLayoutIphoneComponent = connect( mapStateToProps, {
	logout: logout
})(MobileHeaderIphone)



export default MobileLayoutIphoneComponent;