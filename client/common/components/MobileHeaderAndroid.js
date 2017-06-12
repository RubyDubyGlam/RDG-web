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
const contactUsIcon = <FontIcon className="material-icons">email</FontIcon>;
const logoutIcon = <FontIcon className="material-icons">exit_to_app</FontIcon>;
const faqsIcon = <FontIcon className="material-icons">subject</FontIcon>;
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


    return (
      <div>
		  <AppBar
		    iconClassNameRight="muidocs-icon-navigation-expand-more"
		    onLeftIconButtonTouchTap={e => this.setState({open: true})}
		    style={{
          backgroundColor: 'black',
          backgroundImage: 'url("/assets/black-gradient.jpg")'
        }}
		  />
	        <Drawer
	          docked={false}
	          width={'80%'}
	          open={this.state.open}
	          onRequestChange={(open) => this.setState({open})}
            back
            containerStyle={{backgroundImage: 'url("/assets/black-gradient.jpg")', maxHeight: '100%'}}
	        >	
	        	<div style={{ width: '100%', height: '25%', display: 'flex', alignItems:'center', justifyContent: 'center', flexDirection: 'column'}}>
	        		<img src={'/assets/rbg-logo.png'} style={{borderRadius: '50%', width:'45%'}} />
	        	</div>
        		<MenuItem style={{borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 1, borderColor: 'gray', color: 'white', fontWeight: 100}} primaryText="Book" leftIcon={favoritesIcon} onTouchTap={() => this.navigate('/')}/>
        		<MenuItem style={{borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 1, borderColor: 'gray', color: 'white', fontWeight: 100}} primaryText="Appointments" leftIcon={nearbyIcon} onTouchTap={() => this.navigate('/appointment')}/>
        		<MenuItem style={{borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 1, borderColor: 'gray', color: 'white', fontWeight: 100}} primaryText="My Account" leftIcon={recentsIcon} onTouchTap={() => this.navigate('/account')} />
            <MenuItem style={{borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 1, borderColor: 'gray', color: 'white', fontWeight: 100}} primaryText="Contact Us" leftIcon={contactUsIcon} onTouchTap={() => this.navigate('/contact-us')} />
            <MenuItem style={{borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 1, borderColor: 'gray', color: 'white', fontWeight: 100}} primaryText="FAQS" leftIcon={faqsIcon} onTouchTap={() => this.navigate('/faqs')} />
            <MenuItem style={{borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 1, borderColor: 'gray', color: 'white', fontWeight: 100}} primaryText="Logout" leftIcon={logoutIcon} onTouchTap={this.props.logout} />
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