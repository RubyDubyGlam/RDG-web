import React from 'react';
import { Navigator, NativeModules } from 'react-native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { COLOR, ThemeProvider, Toolbar, Drawer } from 'react-native-material-ui';
import Carousel from 'react-native-snap-carousel'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200
  },
});

const addons_list = {
	'braid' : {
		name: 'Blowout & Braid',
		duration: [90],
		price: [8500],
		image: '/assets/15.jpg',
	},
	'lashstrip': {
		name: 'Makeup & Lashstrip',
		duration: [50],
		price: [9000],
		image: '/assets/13.jpg'	
	},
	'lashfill' : {
		name: 'Lash Fill',
		duration: [120],
		price: [12500],
		image: '/assets/12.jpg',
	},
}

var product_list = {
  'blowout': {
    price: [4500],
    duration: [60],
    name: 'Blowout',
    addons: [addons_list['braid']],
    image: '/assets/15.jpg',
  },
  'updo': {
    price: [8500],
    duration: [90],
    name: 'Up-do',
    addons: [],
    image: '/assets/13.jpg'
  },
  'makeup': {
    price: [6500],
    duration: [60],
    name: 'Makeup',
    addons: [addons_list['lashstrip']],
    image: '/assets/16.jpg'
  },
  'lashextensions': {
    price: [20000],
    duration: [120],
    name: 'Lash Extensions',
    image: '/assets/12.jpg',
    addons: [addons_list['lashfill']],
  },
}

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <Carousel
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            slideStyle={{ width: viewportWidth }}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          >
            <View style={{ height: viewportHeight, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text>Text 1</Text>
            </View>
            <View style={{ height: viewportHeight, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text>Text 2</Text>
            </View>
            <View style={{ height: viewportHeight, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text>Text 3</Text>
            </View>
          </Carousel>
        </View>
      </ThemeProvider>
    );
  }
}
