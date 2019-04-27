import React from 'react';
import { View, Text } from 'react-native';

import PropTypes from 'prop-types';
import { createBottomTabNavigator, createDrawerNavigator, DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { backgroundRed } from '../utils/colors';
import { signOut } from '../utils/psaApi';
import Home from './Home';
import Header from '../components/header';
import Profile from './Profile';
import Documents from './DocumentStackNav';
import { CustomSafeAreaView } from '../style/Text';
import { removeMemberDataAsync, removeMemberBarcodeAsync } from '../utils/storageApi';
import myTabBarComponent from '../components/myTabBarComponent';

const TabNav = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      // path: '/home',
      navigationOptions: {
        title: 'Home',
        tabBarLabel: 'Home',
      },
    },
    Profile: {
      screen: Profile,
      // path: '/profile',
      navigationOptions: {
        title: 'Profile',
        tabBarLabel: 'Profile',
      },
    },
    Documents: {
      screen: Documents,
      // path: '/documents',
      navigationOptions: {
        title: 'Documents',
        tabBarLabel: 'Documents',
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const getIconName = (route, f) => {
          const lookup = {
            Home: 'home',
            Profile: 'account',
            Documents: 'file',
          };
          const iconName = lookup[route];
          if (iconName) {
            const suffix = f ? '' : '-outline';
            return `${iconName}${suffix}`;
          }
        };
        const iconName = getIconName(routeName, focused);

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} type="material-community" color={tintColor} />;
        // return <Icons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: myTabBarComponent,
  },
);

const LogoutButton = props => (
  <CustomSafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} style={{ flex: 1 }}>
    {/* <DrawerItems {...props} /> */}
    <Header text="Pages" />
    <View style={{ flex: 1, backgroundColor: backgroundRed }}>
      <View
        style={{
          padding: 10,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Icon type="ionicon" name="md-log-out" size={32} color="#000" iconStyle={{ marginRight: 10 }} />
        <Text
          onPress={() => {
            props.navigation.dispatch(DrawerActions.closeDrawer());
            signOut().then(() => {
              removeMemberDataAsync();
              removeMemberBarcodeAsync();
            });
            props.navigation.navigate('Login');
          }}
        >
          Logout
        </Text>
      </View>
    </View>
  </CustomSafeAreaView>
);

LogoutButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

// TODO Better understanding of how to combine tabs
// at moment importing tabs and overriding with contentComponent
const DrawerNav = createDrawerNavigator(
  {
    Stack: {
      path: '/',
      screen: LogoutButton,
    },
    TabNav: {
      screen: TabNav,
      headerMode: 'none',
    },
  },
  {
    contentComponent: props => <LogoutButton {...props} />,
    initialRouteName: 'TabNav',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  },
);

export default DrawerNav;
