import React from 'react';
import { ActivityIndicator, StatusBar, View, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import { getMemberDataAsync } from '../utils/storageApi';

const splashGif = require('../assets/img/splash.png');

class AuthLoadingScreen extends React.Component {
  redirect = async () => {
    const member = await getMemberDataAsync();
    this.props.navigation.navigate(member ? 'App' : 'Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Image
          source={require('../assets/img/splash.png')}
          onLoad={() => this.redirect()}
          resizeMode="cover"
          resizeMethod="resize"
          style={{
            backgroundColor: '#B80000',
            width: '100%',
            height: '100%',
          }}
        />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuthLoadingScreen;
