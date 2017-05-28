import React, { Component } from 'react'

import OrderContainer from '../../order/components/OrderContainer'
import AppointmentContainer from '../../appointments/components/AppointmentContainer'
import UserAccountContainer from '../../user/components/UserAccountContainer'
import LoginContainer from '../../user/components/LoginContainer'
import MobileFooterIphone from './MobileFooterIphone'
import MobileHeaderIphone from './MobileHeaderIphone'

import { me } from '../../user/action/user-action'
import { connect } from 'react-redux'

import { withRouter } from 'react-router'

import {
  Route,
  Switch
} from 'react-router-dom'

const styles = {
  container: {
    height: 'calc(100% - 56px)',
    width: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column'
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
    return (
		<div style={styles.container}>
      {
        this.props.user && <MobileHeaderIphone />
      }
      {
        this.props.user && (
          <Switch>
            <Route path='/order' render={() => <OrderContainer user={this.props.user}/>}  />
            <Route path='/appointment' render={() => <AppointmentContainer appointments={this.props.appointments} user={this.props.user} />} />
            <Route path='/account' component={UserAccountContainer} user={this.props.user} />
          </Switch>
        )
      }
			{ this.props.user ? <MobileFooterIphone view={this.state.view} handleNavigation={this.handleNavigation}/> : null }
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