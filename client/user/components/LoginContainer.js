import React, { Component } from 'react'

import IconButton from 'material-ui/IconButton';

import RaisedButton from 'material-ui/RaisedButton';

import axios from 'axios'

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
    this.state = {}
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
        <div style={styles.container_redux}>
          <RaisedButton
            style={{marginTop: 36, width: '60%'}}
              label="Login with Facebook"
              labelPosition="before"
              containerElement="label"
              onClick={this.authFacebook}
            /><br />
          <RaisedButton
            style={{marginTop: 36, width: '60%'}}
              label="Login with Google"
              labelPosition="before"
              containerElement="label"
              onClick={this.authGoogle}
            /><br />
          <RaisedButton
            style={{marginTop: 36, width: '60%'}}
              label="Login with Twitter"
              labelPosition="before"
              containerElement="label"
              onClick={this.authInstagram}
            />
        </div>
      </div>
    )
  }
}
