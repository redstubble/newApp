import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './layout/Login';
import AuthLoading from './layout/AuthLoading';
import HomeNav from './layout/HomeNav';
import rootReducer from './redux-reducers';

const store = createStore(rootReducer);

const RootStack = createSwitchNavigator({
  'App': {
    screen: HomeNav,
  },
  'AuthLoading': {
    screen: AuthLoading,
  },
  'Login': {
    screen: Login
  },
}, {
    initialRouteName: 'AuthLoading',
  });

const CheckAuth = createAppContainer(RootStack);

class App extends Component {
  state: {
    docsLoading: false,
  };

  render() {
    return (
      <Provider store={store}>
        <CheckAuth />
      </Provider>
    );
  }
}

export default App;
