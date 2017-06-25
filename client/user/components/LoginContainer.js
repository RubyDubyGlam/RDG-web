import React, { Component } from 'react'

import IconButton from 'material-ui/IconButton';

import RaisedButton from 'material-ui/RaisedButton';

import axios from 'axios'

import Loader from '../../common/components/Loader'

import { Button, Icon } from 'semantic-ui-react'

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    padding: 0,
    margin: 0,
    position: 'absolute',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundImage: 'url("/assets/hair-salon-port.jpg")'
  },
}

export default class LoginContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      is_loading: false
    }
  }

  authFacebook = () => {
    this.setState({
      is_loading: true
    })
    window.location.href = '/v1/auth/facebook'
  }

  authGoogle = () => {
    this.setState({
      is_loading: true
    })
    window.location.href = '/v1/auth/google'    
  }

  authInstagram = () => {
    window.location.href = '/v1/auth/instagram'     
  }

  render() {

    return (
      <div style={styles.container}>
        { this.state.is_loading ? <Loader /> : null }
        <div style={{position: 'absolute', top: 0, bottom: 0, height: '100vh', width: '100vw', zIndex: 2, backgroundColor: 'black', opacity: .9}} />
        <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 0, height: '100vh', width: '100vw', zIndex: 3, color: 'white'}}>
          <p style={{fontSize: 24}}>Welcome to RubyDubyGlam!</p>
          <p style={{fontSize: 16, color: 'white', margin: 0}}>Login with:</p>
          <Button onClick={this.authFacebook} color='facebook' style={{marginTop: 36, width: '60%'}}>
            <Icon name='facebook' /> Facebook
          </Button>
          <Button onClick={this.authGoogle} color='google plus' style={{marginTop: 36, width: '60%'}}>
            <Icon name='google plus' /> Google Plus
          </Button>
        </div>
      </div>
    )
  }
}
