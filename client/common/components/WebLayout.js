import React, { Component } from 'react'

import WebOrderContainer from '../../order/components/WebOrderContainer'
import AppointmentContainer from '../../appointments/components/AppointmentContainer'
import UserAccountContainer from '../../user/components/UserAccountContainer'
import LoginContainer from '../../user/components/LoginContainer'
import MobileFooterIphone from './MobileFooterIphone'
import WebHeader from './WebHeader'

import { me } from '../../user/action/user-action'
import { connect } from 'react-redux'

import { withRouter } from 'react-router'

import {
  Route,
  Switch
} from 'react-router-dom'

const styles = {
  container: {
    height: '100%',
    width: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  bad_container: {
    height: '100%',
    width: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
}

class MobileLayoutIphone extends Component {

  constructor(props){
    super(props)

    this.state = {
      view: 1,
    }
  }

  handleNavigation = (view) => {
    return () => {
      this.setState({view})
    }
  }

  componentDidMount() {
    this.props.me()
  }

  render() {
    if (true) {
      return (
        <div style={styles.bad_container}>
          <p style={{fontSize: 46, textAlign: 'center'}} >Web view is not currently supported. Please access this application through a modern mobile smartphone.</p>
        </div>
      )
    }


    return (
		<div style={styles.container}>
			{ this.props.user ? <WebHeader /> : null }
      <div>
  			<Switch>
  				<Route path='/order' render={() => <WebOrderContainer user={this.props.user}/>}  />
  				<Route path='/appointment' render={() => <AppointmentContainer appointments={this.props.appointments} user={this.props.user} />} />
  				<Route path='/account' component={UserAccountContainer} user={this.props.user} />
  			</Switch>
      </div>
			{ !this.props.user ? <LoginContainer /> : null}
			<img style={{zIndex: -1, opacity: .05, position: 'fixed', margin: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} src={'/assets/rbg-logo.png'} width={'100%'} opacity={.5}/>
		</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    appointments: state.appointment.appointments
  }
}

let MobileLayoutIphoneComponent = withRouter(connect( mapStateToProps, {
	me: me
}, undefined, {pure:false})(MobileLayoutIphone))



export default MobileLayoutIphoneComponent;