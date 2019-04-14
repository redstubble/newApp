import React, { Component, PureComponent } from 'react';
import { WebView } from 'react-native';
import {
  CustomSpinner,
  CustomContainer,
  CustomWiFiConnectionError,
} from '../components/CustomSnippets';

export class ProfileView extends Component {
  state = {
    spinnerVisible: true,
    webViewOpacity: 0,
  };
  showSpinner = async () => {
    console.log('Show Spinner');
    await new Promise((resolve) => setTimeout(resolve, 8000));
    this.setState({ spinnerVisible: true, webViewOpacity: 1 });
  };

  hideSpinner() {
    console.log('Hide Spinner');

    this.setState({ spinnerVisible: false });
  }

  render({ sourceURL, navigationAction } = this.props) {
    return (
      <CustomContainer title="Profile" navigationAction={navigationAction}>
        {this.state.spinnerVisible ? <CustomSpinner /> : null}
        <WebView
          style={{
            opacity: this.state.webViewOpacity,
          }}
          source={{ uri: sourceURL }}
          onLoadStart={() => this.showSpinner()}
          onLoadEnd={() => this.hideSpinner()}
        />
      </CustomContainer>
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
