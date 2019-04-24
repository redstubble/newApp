import { Component } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default class ConnectionInfo extends Component {
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ status: isConnected });
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = isConnected => {
    this.setState({ status: isConnected });
    console.log(`is connected: ${this.state.status}`);
  };
}

// export default NetInfo.getConnectionInfo().then((connectionInfo) => {
//   console.log(
//     'Initial, type: ' +
//       connectionInfo.type +
//       ', effectiveType: ' +
//       connectionInfo.effectiveType,
//   );
// });

// function handleFirstConnectivityChange(connectionInfo) {
//   console.log(
//     'First change, type: ' +
//       connectionInfo.type +
//       ', effectiveType: ' +
//       connectionInfo.effectiveType,
//   );
//   NetInfo.removeEventListener(
//     'connectionChange',
//     handleFirstConnectivityChange,
//   );
// }
// NetInfo.addEventListener('connectionChange', handleFirstConnectivityChange);
