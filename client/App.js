import React, { Component } from 'react'
import cookie from 'react-cookie'
import Main from './main/component/Main'
import OrderContainer from './order/components/OrderContainer'
import AppointmentContainer from './appointments/components/AppointmentContainer'
import UserAccountContainer from './user/components/UserAccountContainer'
import LoginContainer from './user/components/LoginContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { pink900, pink200 } from 'material-ui/styles/colors';

import MobileFooterIphone from './common/components/MobileFooterIphone'
import MobileHeaderIphone from './common/components/MobileHeaderIphone'

injectTapEventPlugin();

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

darkBaseTheme.palette.primary1Color = pink900
darkBaseTheme.palette.secondary1Color = pink200

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import axios from 'axios'

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

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      view: 1,
      is_logged_in: false,
      user: {}
    }

    axios.get('/v1/me').then((response) => {
      if (response.data && response.data._id) {
        this.setState({
          is_logged_in: true,
          user: response.data
        })
      }
    })
  }

  handleNavigation = (view) => {
    return () => {
      this.setState({view})
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div style={styles.container}>
          <MobileHeaderIphone />
          { this.state.view === 2 && this.state.is_logged_in ? <OrderContainer /> : null }
          { this.state.view === 1 && this.state.is_logged_in ? <AppointmentContainer handleNavigation={this.handleNavigation(2)}/> : null }
          { this.state.view === 0 && this.state.is_logged_in ? <UserAccountContainer user={this.state.user}/> : null }
          { this.state.is_logged_in ? <MobileFooterIphone view={this.state.view} handleNavigation={this.handleNavigation}/> : null }
          { !this.state.is_logged_in ? <LoginContainer /> : null}
          <img style={{zIndex: -1, opacity: .02, position: 'fixed', margin: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} src={'/assets/rbg-logo.png'} width={'100%'} opacity={.5}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;




