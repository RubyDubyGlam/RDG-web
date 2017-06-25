import React from 'react';
import { Navigator, NativeModules } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

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

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <Image source={require('./assets/hair-salon-port.jpg')} />
          <Text>Open up App.js to start work on your app!</Text>
          <Text>Changes you make will automatically relowd.</Text>
          <Text>Shake your phone to open the menu.</Text>
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
