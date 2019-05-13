import React from 'react';
import { DrawerActions } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import { getMemberDataAsync } from '../utils/storageApi';
import { PROFILEPAGE } from '../utils/environment';
import { NoInternetView, ProfileView, ProfileViewLoader } from './Profile_view';

class Profile extends React.Component {
  state = {
    memberRequestCompleted: false,
    isConnected: 0,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.connectionLogic);
    NetInfo.isConnected.fetch().done(isConnected => {
      this.connectionLogic(isConnected);
    });
    this.populateMemberData();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.connectionLogic);
  }

  connectionLogic = isConnected => {
    this.setState({ isConnected: isConnected ? 1 : -1 });
  };

  populateMemberData = async () => {
    const member = await getMemberDataAsync();
    if (!member.valid) console.error('Member Data Invalid Error');
    this.setState({
      member,
      memberRequestCompleted: true,
    });
  };

  nav = nav => () => nav.dispatch(DrawerActions.openDrawer()); // Closure

  profileUrl = () => `${PROFILEPAGE}?api=1&u=${this.state.member.id}&p=${this.state.member.token}`;

  render({ navigation } = this.props) {
    const { isConnected, memberRequestCompleted } = this.state;
    if (isConnected === 0 || !memberRequestCompleted) {
      return <ProfileViewLoader navigationAction={this.nav(navigation)} />;
    }
    if (isConnected === 1) {
      return <ProfileView sourceURL={this.profileUrl()} navigationAction={this.nav(navigation)} />;
    }
    return <NoInternetView />;
  }
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
