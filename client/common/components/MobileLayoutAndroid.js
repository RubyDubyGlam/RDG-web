import React, { Component } from 'react'

import OrderContainer from '../../order/components/OrderContainer'
import AppointmentContainer from '../../appointments/components/AppointmentContainer'
import UserAccountContainer from '../../user/components/UserAccountContainer'
import LoginContainer from '../../user/components/LoginContainer'
import MobileHeaderAndroid from './MobileHeaderAndroid'
import HomeContainer from '../../home/components/HomeContainer'
import MakeupContainer from '../../order/components/MakeupContainer'
import LashesContainer from '../../order/components/LashesContainer'
import BlowoutContainer from '../../order/components/BlowoutContainer'
import UpdoContainer from '../../order/components/UpdoContainer'
import FAQSContainer from '../../faqs/components/FAQContainer'
import InitOrderContainer from '../../order/components/InitOrderContainer'

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
    console.log(this.props.user)
    return (
    <div style={styles.container}>
      {
        this.props.user && <MobileHeaderAndroid />
      }
      {
        this.props.user && (
          <Switch>
            <Route path='/faqs' render={() => <FAQSContainer user={this.props.user}/>}  />
            <Route path='/book' render={() => <OrderContainer user={this.props.user}/>} />
            <Route path='/updo/:service' render={() => <OrderContainer user={this.props.user}/>} /> 
            <Route path='/updo/' render={() => <UpdoContainer user={this.props.user}/>} /> 
            <Route path='/appointment' render={() => <AppointmentContainer appointments={this.props.appointments} user={this.props.user} />} />
            <Route path='/account' component={UserAccountContainer} user={this.props.user} />
            <Route path='/blowout/:service' render={() => <OrderContainer user={this.props.user}/>} />           
            <Route path='/blowout' render={() => <BlowoutContainer user={this.props.user}/>}  />
            <Route path='/makeup/:service' render={() => <OrderContainer user={this.props.user}/>} /> 
            <Route path='/makeup' render={() => <MakeupContainer user={this.props.user}/>}  />
            <Route path='/lashes/:service' render={() => <OrderContainer user={this.props.user}/>} /> 
            <Route path='/lashes' render={() => <LashesContainer user={this.props.user}/>}  />
            <Route path='/' render={() => <InitOrderContainer user={this.props.user}/>}  />
          </Switch>
        )
      }
      { !this.props.user ? <LoginContainer /> : null}
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