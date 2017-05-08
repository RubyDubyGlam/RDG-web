import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { pink900, pink200 } from 'material-ui/styles/colors';

import thunk from 'redux-thunk'

injectTapEventPlugin();

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

darkBaseTheme.palette.primary1Color = pink900
darkBaseTheme.palette.secondary1Color = pink200

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { createStore, applyMiddleware } from 'redux'
import reducer from './common/reducer/root_reducer'
import { Provider } from 'react-redux'

import MobileLayoutIphone from './common/components/MobileLayoutIphone'

import history from './common/service/history-service'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

const router = routerMiddleware(history)

console.log(router)

const store = createStore(reducer, applyMiddleware(thunk, router))

import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Route path="/" component={MobileLayoutIphone} />
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    )
  }
}



export default App;




