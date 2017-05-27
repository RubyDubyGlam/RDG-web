import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import FontIcon from 'material-ui/FontIcon';

import { logout } from '../../user/action/user-action'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import navigate from '../actions/router-actions'

import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">account_box</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">book</FontIcon>;
const nearbyIcon = <IconLocationOn />;

class MobileHeaderAndroid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleClose = () => this.setState({open: false});

  navigate = (path) => {
  	this.setState({open: false})
  	this.props.navigate(path)
  }

  render() {
  	const {
  		props
  	} = this

  	let picture_url = props.user.profile_picture
  	const parsed_picture = picture_url.split('sz=')
  	parsed_picture[1] = 'sz=200'
  	picture_url = parsed_picture.join('')


    return (
      <div>
		  <AppBar
		    iconClassNameRight="muidocs-icon-navigation-expand-more"
		    onLeftIconButtonTouchTap={e => this.setState({open: true})}
		    style={{backgroundColor: 'black'}}
		  />
	        <Drawer
	          docked={false}
	          width={'80%'}
	          open={this.state.open}
	          onRequestChange={(open) => this.setState({open})}
	        >	
	        	<div style={{backgroundColor: 'black', width: '100%', height: '35%', display: 'flex', alignItems:'center', justifyContent: 'center', flexDirection: 'column'}}>
	        		<img src={picture_url} style={{borderRadius: '50%', width:'45%'}} />
	        		<p style={{color: 'white', fontSize: 16, marginTop: 26}}>Hello, {props.user.first_name + ' ' + props.user.last_name}</p>
	        	</div>
        		<MenuItem primaryText="Book" rightIcon={favoritesIcon} onTouchTap={() => this.navigate('/order')}/>
        		<MenuItem primaryText="Appointments" rightIcon={nearbyIcon} onTouchTap={() => this.navigate('/appointment')}/>
        		<MenuItem primaryText="My Account" rightIcon={recentsIcon} onTouchTap={() => this.navigate('/account')} />
	        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

let MobileHeaderAndroidComponent = connect( mapStateToProps, {
	logout,
	navigate
})(MobileHeaderAndroid)

export default MobileHeaderAndroidComponent;