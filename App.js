import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createSwitchNavigator } from 'react-navigation';
import Login from './layout/Login';
import AuthLoading from './layout/AuthLoading';
import HomeNav from './layout/HomeNav';
import rootReducer from './redux-reducers';

const customProps = {
  testNav: 'false',
};

const store = createStore(rootReducer);

const CheckAuth = createSwitchNavigator(
  {
    App: HomeNav,
    AuthLoading,
    Login,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

class App extends Component {
  state: {
    docsLoading: false,
  };

  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }
}

export default App;
