import React, { Component, PureComponent } from 'react';
import { WebView } from 'react-native-webview';
import { CustomSpinner, CustomContainer, CustomWiFiConnectionError } from '../components/CustomSnippets';

export class ProfileView extends Component {
  state = {
    spinnerVisible: true,
    webViewOpacity: 0,
  };

  showSpinner = async () => {
    console.log('Show Spinner');
    this.setState({ spinnerVisible: true, webViewOpacity: 1 });
  };

  hideSpinner() {
    console.log('Hide Spinner');

    this.setState({ spinnerVisible: false });
  }

  render({ sourceURL, navigationAction } = this.props) {
    const { webViewOpacity } = this.state;
    return (
      <>
        <CustomContainer title="Profile" navigationAction={navigationAction}>
          {/* {this.state.spinnerVisible ? <CustomSpinner /> : null} */}
          <WebView startInLoadingState renderLoading={() => <CustomSpinner visible />} source={{ uri: sourceURL }} />
        </CustomContainer>
      </>
    );
  }
}

export class ProfileViewLoader extends PureComponent {
  render({ navigationAction } = this.props) {
    return (
      <CustomContainer title="Profile" navigationAction={navigationAction}>
        <CustomSpinner visible />
      </CustomContainer>
    );
  }
}

export class NoInternetView extends PureComponent {
  render({ navigationAction } = this.props) {
    return (
      <CustomContainer title="Profile" navigationAction={navigationAction}>
        <CustomWiFiConnectionError />
      </CustomContainer>
    );
  }
}
