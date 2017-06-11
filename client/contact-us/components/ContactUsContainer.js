import React, { Component } from 'react';

const styles = {
  root: {
    height: '100%',
    width: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
    backgroundImage: 'url("/assets/black-gradient.jpg")',
    color: 'white',
    padding: '10%'
  },
};

class FAQSContainer extends Component {
  render() {

    const { 
      user
    } = this.props

   return ( 
      <div style={styles.root}>
		<p style={{ fontSize: 12, textAlign: 'center', marginBottom: 40, fontSize: '.8em' }} >Please send us an email at info@rubydubyglam.com</p>
      </div>
    )
  }
}

export default FAQSContainer;