import React, { Component } from 'react';
import Pdf from 'react-native-pdf';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { CustomContainer } from '../components/CustomSnippets';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  }
});

export default class Document extends Component {
  render({ navigation } = this.props) {
    console.log(this.props.navigation.getParam('link'));

    const pdfViewer =
      Platform.OS === 'ios' ? (
        <WebView
          source={{ uri: this.props.navigation.getParam('link') }} //'https://google.com'
          style={{ marginTop: 20 }}
        />
      ) : (
          <Pdf
            source={this.props.navigation.getParam('link')}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            style={styles.pdf} />
        );
    return (
      <CustomContainer
        title={this.props.navigation.getParam('name')}
        navigationAction={() => navigation.goBack()}
        icon="arrow-back"
      >
        {pdfViewer}
      </CustomContainer>
    );
  }
}
