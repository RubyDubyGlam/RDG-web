import React from 'react'

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">account_box</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">book</FontIcon>;
const nearbyIcon = <IconLocationOn />;

export default function MobileFooterIphone(props) {
	return (
        <BottomNavigation style={{position: 'fixed', bottom: 0}} selectedIndex={props.view}>
          <BottomNavigationItem
            label="My Account"
            icon={recentsIcon}

            onTouchTap={props.handleNavigation(0)}
          />
          <BottomNavigationItem
            label="Appointments"
            icon={nearbyIcon}
            onTouchTap={props.handleNavigation(1)}
          />
          <BottomNavigationItem
            label="Book"
            icon={favoritesIcon}
            onTouchTap={props.handleNavigation(2)}
          />
        </BottomNavigation>
	)
}