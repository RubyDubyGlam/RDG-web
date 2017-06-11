import React, { Component } from 'react'

import IconButton from 'material-ui/IconButton';

import RaisedButton from 'material-ui/RaisedButton';

import axios from 'axios'

import Loader from '../../common/components/Loader'

import { Button, Icon } from 'semantic-ui-react'

const styles = {
  container: {
    height: '100%',
    width: '100%',
    padding: 0,
    margin: 0,
    textAlign: 'center'
  },
  container_redux: {
    position: 'relative',
    top: '45%',
    transform: 'translateY(-50%)'
  }
}

export default class LoginContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      is_loading: false
    }
  }

  authFacebook = () => {
    window.location.href = '/v1/auth/facebook'
  }

  authGoogle = () => {
    window.location.href = '/v1/auth/google'    
  }

  authInstagram = () => {
    window.location.href = '/v1/auth/instagram'     
  }

  render() {

    return (
      <div style={styles.container}>
        { this.state.is_loading ? <Loader /> : null }
        <div style={styles.container_redux}>
          <p style={{fontSize: 36, fontFamily: "'Great Vibes', cursive", color: 'pink' }}>RubyDubyGlam</p>
          <p style={{fontSize: 16, color: 'white', margin: 0}}>Login with:</p>
          <Button onClick={this.authFacebook} color='facebook' style={{marginTop: 36, width: '60%'}}>
            <Icon name='facebook' /> Facebook
          </Button>
          <Button onClick={this.authGoogle} color='google plus' style={{marginTop: 36, width: '60%'}}>
            <Icon name='google plus' /> Google Plus
          </Button>
          <Button onClick={this.authInstagram} color='instagram' style={{marginTop: 36, width: '60%'}}>
            <Icon name='instagram' /> Instagram
          </Button>
        </div>
      </div>
    )
  }
}
