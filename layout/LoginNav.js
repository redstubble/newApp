import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import Login from '../layout/Login';
import AuthLoading from '../layout/AuthLoading';
import HomeNav from '../layout/HomeNav';

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
