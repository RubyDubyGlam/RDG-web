import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]


import {
  login,
  signup,
  me
} from '../action/user-action'

class FormExampleFieldControl extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      password_verify: "",
      login: true
    }
  }

  handleInput = (field) => {
    return (event) => {
      const state_change = {}
      state_change[field] = event.target.value
      this.setState(state_change)
    }
  }

  handleSubmit = () => {

    if (this.state.login) {
      login(this.state.username, this.state.password)()
    } else {

    }
  }

  render() {
    const { value } = this.state

    return (
      <div>
        <section id="logo" className="light_section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <a className="navbar-brand" href="./">
                  RUBY
                </a>
                <a className="navbar-brand" href="./">
                  DUBY
                </a>
                <a className="navbar-brand" href="./">
                  GLAM
                </a>
                <span>At Your Service</span>
              </div>
            </div>
          </div>
        </section>
        <header id="header" className="darkgrey_section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 mainmenu_wrap">
                <div className="main-menu-icon visible-xs">
                  <span />
                  <span />
                  <span />
                </div>
                <nav>
                  <ul id="mainmenu" className="menu nav sf-menu responsive-menu superfish">
                    <li className="active">
                      <a href="./">Home</a>
                    </li>
                    <li className>
                      <a href="#info">About</a>
                    </li>
                    <li className="dropdown">
                      <a href="#folio">Folio</a>
                      <ul className="dropdown-menu">
                        <li className>
                          <a href="./gallery.html">Folio 4 columns</a>
                        </li>
                        <li className>
                          <a href="./gallery3.html">Folio 3 columns</a>
                        </li>
                        <li className>
                          <a href="./gallery5.html">Folio 5 columns</a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a href="#belowcontent">Blog</a>
                      <ul className="dropdown-menu">
                        <li className>
                          <a href="blog.html">blog</a>
                        </li>
                        <li className>
                          <a href="./blog-single.html">Blog Post</a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a href="./animations.html">Features</a>
                      <ul className="dropdown-menu">
                        <li className>
                          <a href="./icons.html">Icons</a>
                        </li>
                        <li className>
                          <a href="./animations.html">Animations</a>
                        </li>
                        <li className>
                          <a href="./404.html">404</a>
                        </li>
                      </ul>
                    </li>
                    <li className>
                      <a href="#contact">Contact</a>
                    </li>
                    <li className>
                      <a href="login.html">Login/Register</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="panel panel-login">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-6">
                      <a href="#" className="active" id="login-form-link">Login</a>
                    </div>
                    <div className="col-xs-6">
                      <a href="#" id="register-form-link">Register</a>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div id="login-form" style={{display: 'block'}}>
                        <div className="form-group">
                          <input type="text" name="username" id="username" tabIndex={1} className="form-control" placeholder="Username" onChange={this.handleInput('username')} defaultValue />
                        </div>
                        <div className="form-group">
                          <input type="password" name="password" id="password" tabIndex={2} className="form-control" placeholder="Password" onChange={this.handleInput('password')} />
                        </div>
                        <div className="form-group text-center">
                          <input type="checkbox" tabIndex={3} className name="remember" id="remember" />
                          <label htmlFor="remember"> Remember Me</label>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-sm-6 col-sm-offset-3">
                              <input type="button" name="login-submit" id="login-submit" tabIndex={4} className="form-control btn btn-login" defaultValue="Log In" onClick={this.handleSubmit }/>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="text-center">
                                <a href="http://phpoll.com/recover" tabIndex={5} className="forgot-password">Forgot Password?</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form id="register-form" action="http://phpoll.com/register/process" method="post" role="form" style={{display: 'none'}}>
                        <div className="form-group">
                          <input type="text" name="username" id="username" tabIndex={1} className="form-control" placeholder="Username" defaultValue />
                        </div>
                        <div className="form-group">
                          <input type="email" name="email" id="email" tabIndex={1} className="form-control" placeholder="Email Address" defaultValue />
                        </div>
                        <div className="form-group">
                          <input type="password" name="password" id="password" tabIndex={2} className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                          <input type="password" name="confirm-password" id="confirm-password" tabIndex={2} className="form-control" placeholder="Confirm Password" />
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-sm-6 col-sm-offset-3">
                              <input type="submit" name="register-submit" id="register-submit" tabIndex={4} className="form-control btn btn-register" defaultValue="Register Now" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer id="footer" className="grey_section">
          <div className="container">
            <div className="row">
              <div className="col-sm-3 block widget_text">
                <h3>Text Widget</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, dolorem, eaque fugit odit obcaecati temporibus est dolor consequatur totam nam facilis soluta maiores eius iste veritatis. Ratione quidem exercitationem quisquam.</p>
              </div>
              <div className="block col-sm-3">
                <div className="block widget_news">
                  <h3>Popular Posts</h3>
                  <ul>
                    <li className="item">
                      <span className="news_introimg">
                        <a href="#">
                          <img alt src="example/recent_post1.jpg" />
                        </a>
                      </span>
                      <div className="news_right">
                        <h5>
                          <a href="#">At vero eos et accusam et justo duo dolores.</a>
                        </h5>
                        <span className="news-date">June 24, 2014</span>
                      </div>
                    </li>
                    <li className="item">
                      <span className="news_introimg">
                        <a href="#">
                          <img alt src="example/recent_post2.jpg" />
                        </a>
                      </span>
                      <div className="news_right">
                        <h5>
                          <a href="#">Sanctus sea sed takimata ut voluptua.</a>
                        </h5>
                        <span className="news-date">June 14, 2014</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="block widget_nav_menu col-sm-3">
                <h3>Links</h3>
                <ul className>
                  <li><a href="home.html">Home</a></li>
                  <li><a href="gallery.html">Gallery</a></li>
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="contact.html">Contuct Us</a></li>
                </ul>
              </div>
              <div className="block col-sm-3">
                <h3>Flickr Widget</h3>
                <ul id="flickr" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
    // return (
    //   <Form>
    //     <Form.Group widths='equal'>
    //       <Form.Field control={Input} label='First name' placeholder='First name' />
    //       <Form.Field control={Input} label='Last name' placeholder='Last name' />
    //       <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' />
    //     </Form.Group>
    //     <Form.Group inline>
    //       <label>Quantity</label>
    //       <Form.Field control={Radio} label='One' value='1' checked={value === '1'} onChange={this.handleChange} />
    //       <Form.Field control={Radio} label='Two' value='2' checked={value === '2'} onChange={this.handleChange} />
    //       <Form.Field control={Radio} label='Three' value='3' checked={value === '3'} onChange={this.handleChange} />
    //     </Form.Group>
    //     <Form.Field control={TextArea} label='About' placeholder='Tell us more about you...' />
    //     <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' />
    //     <Form.Field control={Button}>Submit</Form.Field>
    //   </Form>
    // )
  }
}

export default FormExampleFieldControl


// import React, { Component } from 'react'
// import cookie from 'react-cookie'

// import axios from 'axios'


// class App extends Component {

//   constructor(props){
//     super(props)
//     this.state = {
//       username: "",
//       password: "",
//       password_verify: "",
//       login: true
//     }
//   }

//   handleInput = (field) => {
//     return (event) => {
//       const state_change = {}
//       state_change[field] = event.target.value
//       this.setState(state_change)
//     }
//   }

//   handleSubmit = () => {

//     if (this.state.login) {
//       login()
//     } else {

//     }
//   }

//   toggleLogin = () => {
//     this.setState({
//       login: !this.state.login,
//       username: "",
//       password: "",
//       password_verify: ""      
//     })
//   }

//   render() {
//     return (
//       <div className="grid">
//         <div className="form__field">
//           <label htmlFor="login__username"><svg className="icon"></svg><span className="hidden">Username</span></label>
//           <input id="login__username" onChange={this.handleInput('username')} type="text" name="username" className="form__input" placeholder="Username" required />
//         </div>

//         <div className="form__field">
//           <label htmlFor="login__password"><svg className="icon"></svg><span className="hidden">Password</span></label>
//           <input id="login__password" onChange={this.handleInput('password')} type="password" name="password" className="form__input" placeholder="Password" required />
//         </div>

//         <div className="form__field">
//           <label htmlFor="login__password__verify"><svg className="icon"></svg><span className="hidden">Verify Password</span></label>
//           <input id="login__password__verify" onChange={this.handleInput('password_verify')} type="password" name="password" className="form__input" placeholder="Verify Password" required />
//         </div>

//         <div className="form__field">
//           <label htmlFor="login__password__firstname"><svg className="icon"></svg><span className="hidden">first_name</span></label>
//           <input id="login__password__firstname" onChange={this.handleInput('first_name')} type="text" name="password" className="form__input" placeholder="first_name" required />
//         </div>

//         <div className="form__field">
//           <label htmlFor="login__password__lastname"><svg className="icon"></svg><span className="hidden">last_name</span></label>
//           <input id="login__password__lastname" onChange={this.handleInput('last_name')} type="text" name="password" className="form__input" placeholder="last_name" required />
//         </div>

//         <div className="form__field">
//           <label htmlFor="login__password__phonenumber"><svg className="icon"></svg><span className="hidden">phone_number</span></label>
//           <input id="login__password__phonenumber" onChange={this.handleInput('phone_number')} type="text" name="password" className="form__input" placeholder="phone_number" required />
//         </div>

//         <div className="form__field">
//           <button type="submit" defaultValue="Sign In" onClick={this.handleSubmit}>Sign In</button>
//         </div>
//         <p className="text--center">Not a member? <a onClick={this.toggleLogin}>Sign up now</a> <svg className="icon"></svg></p>
//       </div>
//     )
//   }
// }

// export default App;