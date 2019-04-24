import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import Login from './Login';
import AuthLoading from './AuthLoading';
import HomeNav from './HomeNav';

export const Switch = createSwitchNavigator(
  {
    AuthLoading,
    App: <HomeNav />,
    Login: <Login />,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
