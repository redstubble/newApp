import React from 'react';
import Pdf from 'react-native-pdf';
import { View, Platform, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { CustomContainer } from '../components/CustomSnippets';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default class Agreement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: null,
      link: null,
    };
    this.didBlurSubscription = null;
    this.willFocusSubscription = null;
  }

  componentDidMount() {
    const { navigation } = this.props;
    const link = navigation.getParam('link');
    this.setState({
      link,
    });

    const didBlurSubscription = navigation.addListener('didBlur', () => {
      this.setState({
        uri: null,
      });
    });

    const willFocusSubscription = navigation.addListener('willFocus', () => {
      this.setState((prevState, props) => ({
        uri: prevState.link,
      }));
    });
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
    this.willFocusSubscription.remove();
  }

  render({ navigation } = this.props) {
    const { uri } = this.state;
    const name = navigation.getParam('name');
    const source = { uri, cache: false };

    const pdfViewer = (
      <View style={styles.container}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      </View>
    );
    return (
      <CustomContainer title={name} navigationAction={() => navigation.goBack()} icon="arrow-back">
        {pdfViewer}
      </CustomContainer>
    );
  }
}
