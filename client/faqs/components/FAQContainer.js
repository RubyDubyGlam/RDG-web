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
		<p style={{ color: 'pink', fontSize: '.9em' }} >How long is a blow out appointment?</p>

		<p style={{ fontSize: 12, textAlign: 'center', marginBottom: 40, fontSize: '.8em' }} >Hair appointments usually take about an hour. </p>

		<p style={{ color: 'pink', fontSize: '.9em' }}>How long is a make up appointment?</p>

		<p style={{ fontSize: 12, textAlign: 'center', marginBottom: 40, fontSize: '.8em' }} >Make up appointments are about an hour. </p>

		<p style={{ color: 'pink', fontSize: '.9em' }}>How long is an updo appointment?</p>

		<p style={{ fontSize: 12, textAlign: 'center', marginBottom: 40, fontSize: '.8em' }} >Updos can take up to an hour to an hour and a half.</p>

		<p style={{ color: 'pink', fontSize: '.9em' }}>How long is an eye extension appointment</p>

		<p style={{ fontSize: 12, textAlign: 'center', marginBottom: 40, fontSize: '.8em' }} >Full sets are an hour and a half to two hours. Fills are about an hour. </p>

		<p style={{ color: 'pink', fontSize: '.9em' }}>How should I prepare for my appointment?</p>

		<p style={{ fontSize: 12, textAlign: 'center' }} >For blowouts please wash hair within the hour of the stylists arrival. For updos, No need to shampoo hair. For make up, please have clean and moisturizer face.</p> 

		<p style={{ fontSize: 12, textAlign: 'center', marginBottom: 40, fontSize: '.8em' }} >The assigned stylist will send you a message an hour prior to your appointment letting you know that they are in route.</p>

		<p style={{ color: 'pink', fontSize: '.9em' }}>Do I need any products?</p>

		<p style={{ fontSize: 12, textAlign: 'center', marginBottom: 40, fontSize: '.8em' }} >No all products are provided by the stylist. </p>
      </div>
    )
  }
}

export default FAQSContainer;