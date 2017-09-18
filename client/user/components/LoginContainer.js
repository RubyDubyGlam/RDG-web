import React, { Component } from 'react'

import IconButton from 'material-ui/IconButton';

import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField'

import FlatButton from 'material-ui/FlatButton'

import axios from 'axios'

import { connect } from 'react-redux'

import Loader from '../../common/components/Loader'

import { Button, Icon } from 'semantic-ui-react'

import { login, register } from '../action/user-action'

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    padding: 0,
    margin: 0,
    position: 'absolute',
    backgroundColor: 'black',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: 'url("/assets/hair-salon-port.jpg")',
    backgroundAttachment: 'fixed',
  },
}

class LoginContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      is_loading: false,
      email_address: '',
      password: '',
      confirm_password: '',
      toggle: '',
      first_name: '',
      last_name: ''
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

  validateEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  isValidLogin = (is_submitting) => {
    if (!this.state.email_address) {
      if (is_submitting) {
        this.setState({ error: 'Email is required' })
      }
      return false
    }

    if (!this.validateEmail(this.state.email_address)) {
      if (is_submitting) {
        this.setState({ error: 'Email is invalid' })
      }
      return false
    }

    if (!this.state.password) {
      if (is_submitting) {
        this.setState({ error: 'Password is required' })
      }
      return false
    }
    return true
  }

  isValidRegister = (is_submitting) => {
    if (!this.state.email_address) {
      if (is_submitting) {
        this.setState({ error: 'Email is required' })
      }
      return false
    }

    if (!this.validateEmail(this.state.email_address)) {
      if (is_submitting) {
        this.setState({ error: 'Email is invalid' })
      }
      return false
    }

    if (!this.state.password) {
      if (is_submitting) {
        this.setState({ error: 'Password is required' })
      }
      return false
    }

    if (!this.state.confirm_password) {
      if (is_submitting) {
        this.setState({ error: 'Re-enter password' })
      }
      return false
    }

    if (this.state.confirm_password !== this.state.password) {
      if (is_submitting) {
        this.setState({ error: "Passwords don't match" })
      }
      return false
    }

    if (!this.state.first_name) {
      if (is_submitting) {
        this.setState({ error: "No first name" })
      }
      return false
    }

    if (!this.state.last_name) {
      if (is_submitting) {
        this.setState({ error: "No last name" })
      }
      return false
    }

    return true
  }

  toggleRegister = (toggle) => {
    this.setState({
      toggle,
      email_address: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: ''
    })
  }

  render() {

    return (
      <div style={styles.container}>
        { this.state.is_loading ? <Loader /> : null }
        <div style={{position: 'fixed', top: 0, bottom: 0, height: '100vh', width: '100vw', zIndex: 2, backgroundColor: 'black', opacity: .9}} />
        <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 0, height: '100vh', maxHeight: '100vh', minHeight: '100vh', overflow: 'scroll', width: '100vw', zIndex: 3, color: 'white'}}>
          <p style={{fontSize: 24}}>Welcome to RubyDubyGlam!</p>
          {
            this.state.toggle === '' && [
              <p onClick={() => this.setState({ toggle: 'login' })} style={{fontSize: 24, marginTop: 24}}>LOGIN</p>,
              <br />,
              <div style={{marginBottom: 24, alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                <div style={{marginRight: 8, height: 1, width: 20, borderBottom: '1px solid white'}}></div>
                <div style={{fontSize: 12}}>OR</div>
                <div style={{marginLeft: 8, height: 1, width: 20, borderBottom: '1px solid white'}}></div>
              </div>,
              <br />,
              <p onClick={() => this.setState({ toggle: 'register' })} style={{fontSize: 24}}>REGISTER</p>,
            ]
          }
          {
            this.state.toggle === 'login' && (
              <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TextField
                  floatingLabelText="Email address"
                  inputStyle={{color: 'white'}}
                  floatingLabelStyle={{color: 'white'}}
                  value={this.state.email_address}
                  errorText = { this.state.error === "Invalid user" && this.state.error }
                  onChange={(e) => this.setState({ email_address: e.target.value, error: '' })}
                /><br />
                <TextField
                  floatingLabelText="Password"
                  type="password"
                  inputStyle={{color: 'white'}}
                  floatingLabelStyle={{color: 'white'}}
                  value={this.state.password}
                  errorText = { this.state.error === "Invalid password" && this.state.error }
                  onChange={(e) => this.setState({ password: e.target.value, error: '' })}
                /><br />
                <p>
                  <span>Don't have an account?</span>
                  <span onClick={() => this.toggleRegister('register')} style={{textDecoration: 'underline', marginLeft: 6}}> REGISTER </span>
                </p>
                <FlatButton
                  label="Login"
                  primary={true}
                  disabled={!this.isValidLogin()}
                  onTouchTap={() => {
                    this.props.login(this.state.email_address, this.state.password)
                    .catch(error => this.setState({ error: error.response.data.message }) )
                  }}
                  style={{marginTop: 26, color: (!this.isValidLogin()) ? 'gray' : 'white', borderStyle: 'solid', borderRadius: 4, borderWidth: 1, width: '60vw', height: '10vh'}}
                /><br />
              </div>
            )
          }
          {
            this.state.toggle === 'register' && (
              <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <TextField
                  floatingLabelText="First name"
                  inputStyle={{color: 'white'}}
                  floatingLabelStyle={{color: 'white'}}
                  value={this.state.first_name}
                  onChange={(e) => this.setState({ first_name: e.target.value, error: '' })}
                  errorText = { this.state.error === "No first name" && this.state.error }
                /><br />
                <TextField
                  floatingLabelText="Last name"
                  inputStyle={{color: 'white'}}
                  floatingLabelStyle={{color: 'white'}}
                  value={this.state.last_name}
                  onChange={(e) => this.setState({ last_name: e.target.value, error: '' })}
                  errorText = { this.state.error === "No last name" && this.state.error }
                /><br />
                <TextField
                  floatingLabelText="Email address"
                  inputStyle={{color: 'white'}}
                  floatingLabelStyle={{color: 'white'}}
                  value={this.state.email_address}
                  onChange={(e) => this.setState({ email_address: e.target.value, error: '' })}
                  errorText = { this.state.error === "Email address taken" && this.state.error }
                /><br />
                <TextField
                  floatingLabelText="Password"
                  type="password"
                  inputStyle={{color: 'white'}}
                  floatingLabelStyle={{color: 'white'}}
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value, error: '' })}
                /><br />
                <TextField
                  floatingLabelText="Re-enter Password"
                  type="password"
                  inputStyle={{color: 'white'}}
                  floatingLabelStyle={{color: 'white'}}
                  value={this.state.confirm_password}
                  errorText={this.state.confirm_password && (this.state.password !== this.state.confirm_password) ? "Passwords don't match" : null }
                  onChange={(e) => this.setState({ confirm_password: e.target.value, error: '' })}
                /><br />
                <p>
                  <span>Already have an account?</span>
                  <span onClick={() => this.toggleRegister('login')} style={{textDecoration: 'underline', marginLeft: 6}}> LOGIN </span>
                </p>
                <FlatButton
                  label="Register"
                  primary={true}
                  disabled={!this.isValidRegister()}
                  onClick={() => {
                    this.props.register(this.state.email_address, this.state.password, this.state.first_name, this.state.last_name)
                    .catch(error => this.setState({ error: error.response.data.message }) )
                  }}
                  style={{marginTop: 26, color: (!this.isValidRegister()) ? 'gray' : 'white', borderStyle: 'solid', borderRadius: 4, borderWidth: 1, width: '60vw', height: '10%'}}
                /> 
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

let LoginComponentComponent = connect( mapStateToProps, {
  login,
  register,
})(LoginContainer)

export default LoginComponentComponent;
