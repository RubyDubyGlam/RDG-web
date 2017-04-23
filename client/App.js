import React, { Component } from 'react'
import cookie from 'react-cookie'
import Login from './user/component/Login';
import Main from './main/component/Main'

import axios from 'axios'

class App extends Component {

  constructor(props){
    super(props)

    const has_cookie = cookie.load('rdgcookie')

    this.state = {
      logged_in: false,
      has_cookie: !!has_cookie
    }

    if (has_cookie) {
      axios.get('v1/me', {
        headers: { 'Authorization': 'jwt ' + cookie.load('rdgcookie') }
      }).then((response) => {
        if (response.data.id) {
          this.setState({
            logged_in: true
          })
        }
      })
    }

  }

  render() {
    if (!this.state.logged_in) {
      return <Main />
    } else {
      return <div>logged in</div>
    }
  }
}

export default App;
