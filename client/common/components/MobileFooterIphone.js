import React from 'react'

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">account_box</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">book</FontIcon>;
const nearbyIcon = <IconLocationOn />;

import navigate from '../actions/router-actions'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom';

function MobileFooterIphone(props) {
  
  function findIndex(props) {
    switch(props.location) {
      case '/account':
        return 0
      case '/appointment':
        return 1
      case '/order':
        return 2
    }
  }

	return (
    <BottomNavigation style={{position: 'fixed', bottom: 0}} selectedIndex={findIndex(props)}>
      <BottomNavigationItem
        label="My Account"
        icon={recentsIcon}
        onTouchTap={() => props.navigate('/account')}
      />
      <BottomNavigationItem
        label="Appointments"
        icon={nearbyIcon}
        onTouchTap={() => props.navigate('/appointment')}
      />
      <BottomNavigationItem
        label="Book"
        icon={favoritesIcon}
        onTouchTap={() => props.navigate('/order')}
      />
    </BottomNavigation>
	)
}

const mapStateToProps = (state) => {
  return {
    location: state.router.location.pathname
  }
}

let MobileFooterIphoneComponent = connect( mapStateToProps, {
  navigate: navigate
})(MobileFooterIphone)



export default MobileFooterIphoneComponent;