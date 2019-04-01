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
    position: 'absolute'
  },
};

class FAQSContainer extends Component {
  render() {

    const { 
      user
    } = this.props

   return ( 
      <div style={styles.root}>
        <div style={{width: '100%', height: '60px', backgroundColor: 'black', marginBottom: '2em'}} />
		    <p style={{ fontSize: 12, textAlign: 'center', marginBottom: 40, fontSize: '.8em' }} >Please send us an email at info@rubydubyglam.com</p>
      </div>
    )
  }
}

export default FAQSContainer;